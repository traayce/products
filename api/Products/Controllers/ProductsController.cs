using System.Collections.Generic;
using Api.Models.Product;
using Microsoft.AspNetCore.Mvc;
using Services;

namespace Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly IProductService _productService;
        public ProductsController(IProductService _productService)
        {
            this._productService = _productService;
        }
        
        [HttpGet]
        public ActionResult<IEnumerable<ProductViewModel>> Get()
        {
            return Ok(_productService.GetAll<ProductViewModel>());
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public ActionResult<string> Get(int id)
        {
            return "value";
        }

        [HttpPost]
        public IActionResult Post([FromBody] ProductViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Invalid model format");
            }

            _productService.Create(model);
            return Ok(model);
        }

        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
