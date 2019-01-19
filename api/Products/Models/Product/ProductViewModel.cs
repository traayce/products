using System;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Http;
using ServiceContracts.Models.Product;

namespace Api.Models.Product
{
    public class ProductViewModel : IProductDomainModel
    {
        public int Id { get; set; }
        [StringLength(100), Required]
        public string Code { get; set; }
        [StringLength(100), Required]
        public string Name { get; set; }
        public byte[] Photo { get; set; }
        [Required]
        [Range(0, double.MaxValue, ErrorMessage = "Price must be 0-[MAX_DOUBLE]")]
        public double Price { get; set; }
        public DateTime LastUpdated { get; set; }
    }
    
    public class ProductViewModel2
    {
        public int Id { get; set; }
        [StringLength(100), Required]
        public string Code { get; set; }
        [StringLength(100), Required]
        public string Name { get; set; }
        public IFormFile Photo { get; set; }
        [Required]
        [Range(0, double.MaxValue, ErrorMessage = "Price must be 0-[MAX_DOUBLE]")]
        public double Price { get; set; }
        public DateTime LastUpdated { get; set; }
    }
}