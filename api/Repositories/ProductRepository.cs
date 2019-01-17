using System;
using DataAccess;
using DataContracts;
using DataEntities.Entities;
using Microsoft.EntityFrameworkCore;
using Repositories.Base;

namespace Repositories
{
    public class ProductRepository : GenericRepositoryBase<ProductEntity>, IProductRepository
    {
        public ProductRepository(DatabaseContext context) : base(context)
        {
        }
        
        public override void Edit(ProductEntity entity)
        {
            UpdateAudit(entity);
            base.Edit(entity);
        }
        
        public override ProductEntity Add(ProductEntity entity)
        {
            UpdateAudit(entity);
            return base.Add(entity);
        }

        private void UpdateAudit(ProductEntity entity)
        {
            entity.LastUpdated = DateTime.UtcNow;
        }
    }
}