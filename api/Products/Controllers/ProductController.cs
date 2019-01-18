using System.Collections.Generic;
using Api.Models.Product;
using Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private const string DoesntExist = "Product with such ID doesn't exist"; 
        private readonly IProductApplicationService _productApplicationService;
        public ProductController(IProductApplicationService _productApplicationService)
        {
            this._productApplicationService = _productApplicationService;
        }
        
        [HttpGet]
        public ActionResult<IEnumerable<ProductViewModel>> Get()
        {
            return Ok(_productApplicationService.GetAll());
        }

        [HttpGet("{id}")]
        public ActionResult<string> Get(int id)
        {
            var model = _productApplicationService.GetById(id);
            if (model == null) return BadRequest(DoesntExist);
            return Ok(model);
        }

        [HttpPost]
        public IActionResult Post([FromBody] ProductViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Invalid model format");
            }

            _productApplicationService.Create(model);
            return Ok(model);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] ProductViewModel model)
        {
            model = _productApplicationService.Edit(id, model);
            if (model == null) return BadRequest(DoesntExist);
            return Ok(model);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var model = _productApplicationService.Delete(id);
            if (model == null) return BadRequest(DoesntExist);
            return Ok(model);
        }
    }
}
