﻿using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using DataContracts;
using DataContracts.Base;
using DataEntities.Entities;
using ServiceContracts;
using ServiceContracts.Models.Product;

namespace Services
{
    public class ProductService : IProductService
    {
        private readonly IProductRepository productRepository;
        private readonly IUnitOfWork unitOfWork;
        private readonly IMapper _mapper;  

        public ProductService(
            IProductRepository productRepository,
            IUnitOfWork unitOfWork,
            IMapper _mapper)
        {
            this.productRepository = productRepository;
            this.unitOfWork = unitOfWork;
            this._mapper = _mapper;
        }

        public IEnumerable<T> GetAll<T>() where T : class, IProductDomainModel, new()
        {
            var list = productRepository.GetAll().Select(x => 
                new T
            {
                Id = x.Id,
                Price = x.Price,
                Code = x.Code,
                Name = x.Name,
                LastUpdated = x.LastUpdated,
                Photo = x.Photo
            });

            return list;
        }

        public ProductDomainModel Create(ProductDomainModel model)
        {
            var entity = _mapper.Map<ProductEntity>(model);
            entity = productRepository.Add(entity);
            unitOfWork.CommitChanges();

            return _mapper.Map(entity, model);
        }
        

        public ProductDomainModel GetById(int id)
        {
            var entity = productRepository.GetById(id);
            if (entity == null) return null;

            return _mapper.Map<ProductDomainModel>(entity);
        }
        
        public ProductDomainModel Delete(int id)
        {
            var entity = productRepository.GetById(id);
            if (entity == null) return null;
            
            productRepository.Delete(entity);
            unitOfWork.CommitChanges();
            return _mapper.Map<ProductDomainModel>(entity);
        }
        
        public ProductDomainModel Edit(int id, ProductDomainModel model)
        {
            var entity = productRepository.GetById(id);
            if (entity == null) return null;
            
            _mapper.Map(model, entity);
            productRepository.Edit(entity);
            unitOfWork.CommitChanges();
            return _mapper.Map(entity, model);
        }
    }
}