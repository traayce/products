﻿using System;
using System.Collections.Generic;
using System.Linq;
using DataAccess;
using DataContracts.Base;
using DataEntities.Base;
using Microsoft.EntityFrameworkCore;

namespace Repositories.Base
{
    public abstract class GenericRepositoryBase<TEntity> : IGenericCommands<TEntity> where TEntity : class, IEntity
    {
        protected DbContext DbContext;
        protected readonly DbSet<TEntity> Dbset;

        protected GenericRepositoryBase(DatabaseContext dbContext)
        {
            DbContext = dbContext;
            Dbset = dbContext.Set<TEntity>();
        }
        
        public virtual TEntity GetById(int id)
        {
            return Dbset.Find(id);
        }

        public virtual TEntity Add(TEntity entity)
        { 
            return Dbset.Add(entity).Entity;
        }

        public virtual TEntity Delete(TEntity entity)
        {
            return Dbset.Remove(entity).Entity;
        }

        public virtual void Edit(TEntity entity)
        {
            DbContext.Entry(entity).State = EntityState.Modified;
        }

        public virtual IList<TEntity> GetAll()
        {
            return Dbset.ToList();
        }
    }
}