using System;

namespace DataContracts.Base
{
    public interface IGenericCommands<TEntity>
    {
        TEntity GetById(int id);

        TEntity Add(TEntity entity);

        TEntity Delete(TEntity entity);

        void Edit(TEntity entity);

    }
}