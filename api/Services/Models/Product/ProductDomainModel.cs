using System;
using ServiceContracts.Models.Product;

namespace Services.Models.Product
{   
    public class ProductDomainModel : IProductDomainModel
    {
        public int Id { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public byte[] Photo { get; set; }
        public double Price { get; set; }
        public DateTime LastUpdated { get; set; }
    }
}