using System;
using System.Collections.Generic;
using System.Linq;
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

        public ProductService(
            IProductRepository productRepository,
            IUnitOfWork unitOfWork)
        {
            this.productRepository = productRepository;
            this.unitOfWork = unitOfWork;
        }

        public IList<T> GetAll<T>() where T : IProductDomainModel, new()
        {
            var list = productRepository.GetAll().Select(x => new T
            {
                Id = x.Id,
                Price = x.Price,
                Code = x.Code,
                Name = x.Name,
                LastUpdated = x.LastUpdated,
                Photo = x.Photo
            }).ToList();

            return list;
        }

        public T Create<T>(T model) where T : IProductDomainModel
        {
            var entity = productRepository.Add(new ProductEntity()
            {
                Code = model.Code,
                Price = model.Price,
                Name = model.Name,
                Photo = model.Photo
            });
            unitOfWork.CommitChanges();
            model.Id = entity.Id;
            return model;
        }
        
        public T Update<T>(T model) where T : IProductDomainModel, new()
        {
            var entity = productRepository.Add(new ProductEntity()
            {
                Code = model.Code,
                Price = model.Price,
                Name = model.Name,
                Photo = model.Photo
            });
            unitOfWork.CommitChanges();
            model.Id = entity.Id;
            return model;
        }
    }
}