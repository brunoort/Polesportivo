using System;
using System.Collections.Generic;
using System.Linq.Expressions;

namespace Repositorio.Interfaces
{
    /// <summary>
    /// Defines the methods that are required for a Repository
    /// </summary>
    public interface IRepositorio<T> where T : class
    {
        bool Create(T entity);
        bool Update(T entity);
        T Read(int id);
        IEnumerable<T> Read();
        IEnumerable<T> Read(Expression<Func<T, bool>> predicate);
        bool Delete(T entity);
    }
}
