using System.Collections.Generic;
using System.IO;
using Api.Models.Product;
using AutoMapper;
using ServiceContracts;
using ServiceContracts.Models.Product;

namespace Api.Services
{
    public interface IProductApplicationService
    {
        ProductViewModel Create(ProductViewModel model);
        ProductViewModel Edit(int id, ProductViewModel model);
        IEnumerable<ProductViewModel> GetAll(string name);
        ProductViewModel Delete(int id);
        ProductViewModel GetById(int id);
        bool IsCodeValid(string code, int id = 0);
        ProductViewModel ConvertModel(ProductViewModel2 model);
    }
    
    public class ProductApplicationService : IProductApplicationService
    {
        private readonly IProductService _productService;
        private readonly IMapper _mapper;  

        public ProductApplicationService(
            IProductService _productService,
            IMapper _mapper)
        {
            this._productService = _productService;
            this._mapper = _mapper;
        }
        
           public IEnumerable<ProductViewModel> GetAll(string name) 
        {
            var result = _productService.GetAll<ProductViewModel>(name);
            return result;
        }

        public ProductViewModel Create(ProductViewModel model)
        {
            var result = _productService.Create(_mapper.Map<ProductDomainModel>(model));
            return _mapper.Map(result, model);
        }

        public bool IsCodeValid(string code, int id = 0)
        {
            return _productService.IsCodeValid(code, id);
        }
        
        public ProductViewModel GetById(int id)
        {
            var result = _productService.GetById(id);
            return _mapper.Map<ProductViewModel>(result);
        }
        
        public ProductViewModel Delete(int id) 
        {
            var result = _productService.Delete(id);
            return _mapper.Map<ProductViewModel>(result);
        }
        
        public ProductViewModel Edit(int id, ProductViewModel model)
        {
            var result = _productService.Edit(id, _mapper.Map<ProductDomainModel>(model));
            return _mapper.Map(result, model);
        }

        public ProductViewModel ConvertModel(ProductViewModel2 model)
        {
           var newModel = _mapper.Map<ProductViewModel>(model);
           if (model.Photo?.Length > 0)
           {
               byte[] fileBytes;
               using (var ms = new MemoryStream())
               {
                   model.Photo.CopyTo(ms);
                   fileBytes = ms.ToArray();
               }

               newModel.Photo = fileBytes;
           }

           return newModel;
        }
    }
}