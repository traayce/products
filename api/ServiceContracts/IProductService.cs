using System.Collections.Generic;
using ServiceContracts.Models.Product;

namespace ServiceContracts
{
    public interface IProductService
    {
        IList<T> GetAll<T>() where T : IProductDomainModel, new();
        T Create<T>(T model) where T : IProductDomainModel;
    }
}