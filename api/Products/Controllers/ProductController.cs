using System.Collections.Generic;
using Api.Models.Product;
using Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [ApiVersion("1.0", Deprecated = true)]
    [ApiVersion("1.1")]
    [Route("api/[controller]/v{version:apiVersion}")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private const string DoesntExist = "Product with such ID doesn't exist";
        private const string UniqueCode = "Code must be unique";
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

        [HttpPost, MapToApiVersion("1.0")]
        public IActionResult Post([FromBody] ProductViewModel model)
        {
            //TODO: move validations to commands
            if (!ModelState.IsValid)
            {
                return BadRequest("Invalid model format");
            }

            if (!_productApplicationService.IsCodeValid(model.Code, model.Id))
                return BadRequest(UniqueCode);

            _productApplicationService.Create(model);
            return Ok(model);
        }
        
        [HttpPost, MapToApiVersion("1.1")]
        public IActionResult PostV1([FromForm]ProductViewModel2 model)
        {
            //TODO: move validations to commands
            if (!ModelState.IsValid)
            {
                return BadRequest("Invalid model format");
            }
           
            if (!_productApplicationService.IsCodeValid(model.Code, model.Id))
                return BadRequest(UniqueCode);
            
            var newModel = _productApplicationService.ConvertModel(model);

            _productApplicationService.Create(newModel);
            return Ok(newModel);
        }
        
        [HttpPut("{id}"), MapToApiVersion("1.0")]
        public IActionResult Put(int id, [FromBody] ProductViewModel model)
        {
            //TODO: move validations to commands
            if (!ModelState.IsValid)
            {
                return BadRequest("Invalid model format");
            }
            
            if (!_productApplicationService.IsCodeValid(model.Code, id))
                return BadRequest(UniqueCode);
            model = _productApplicationService.Edit(id, model);
            if (model == null) return BadRequest(DoesntExist);
            return Ok(model);
        }
        
        [HttpPut("{id}"), MapToApiVersion("1.1")]
        public IActionResult PutV2(int id, [FromForm] ProductViewModel2 model)
        {
            //TODO: move validations to commands
            if (!ModelState.IsValid)
            {
                return BadRequest("Invalid model format");
            }
            
            if (!_productApplicationService.IsCodeValid(model.Code, id))
                return BadRequest(UniqueCode);
            var newModel = _productApplicationService.ConvertModel(model);
            newModel = _productApplicationService.Edit(id, newModel);
            if (newModel == null) return BadRequest(DoesntExist);
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
