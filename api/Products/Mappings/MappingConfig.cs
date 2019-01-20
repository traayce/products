using System;
using System.Collections;
using System.IO;
using Api.Models.Product;
using AutoMapper;
using ServiceContracts.Models.Product;

namespace Api.Mappings
{
    public class MappingConfig : Profile  
    {  
        public MappingConfig()  
        {  
            CreateMap<ProductViewModel, ProductDomainModel>();
            CreateMap<ProductDomainModel, ProductViewModel>();
            CreateMap<ProductViewModel, ProductViewModel2>()
                .ForMember(x => x.Photo, c => c.Ignore());
            CreateMap<ProductViewModel2, ProductViewModel>()
                .ForMember(x => x.Photo, c => c.Ignore());
        }  
    }  
}