using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Linq.Expressions;
using Repositorio.Interfaces;

namespace Repositorio.Repositories
{
    /// <summary>
    /// Encapsulates the available database interactions on behalf of a Repository type.
    /// </summary>
    /// <typeparam name="T">Any type of class available in the Opendesk.Models namespace.
    /// </typeparam>
    /// <remarks>
    /// The RepositoryBase type exposes the following members.
    /// </remarks>
    public class RepositorioBase<T> : IRepositorio<T> where T : class
    {
        private PolesportivoContext _db;
        private readonly IDbSet<T> _dbset;

        /// <summary>
        /// Holds a reference to the DatabaseFactory class used to manage connections to the database.
        /// </summary>
        protected IDatabaseFactory DatabaseFactory { get; private set; }

        /// <summary>
        /// Contains a reference to the <see cref="System.Data.Entity.DbContext"/> instance used by the repository.
        /// </summary>
        protected PolesportivoContext SmaContext
        {
            get
            {
                return _db ?? (_db = DatabaseFactory.Get());
            }
        }

        /// <summary>
        /// Initialises a new instance of the RepositoryBase class.
        /// </summary>
        public RepositorioBase()
        {
            DatabaseFactory = new DatabaseFactory();
            _dbset = SmaContext.Set<T>();
        }

        /// <summary>
        /// Adds a new entity instance to the database on behalf of the parent type.
        /// </summary>
        /// <param name="entity">Any valid database object</param>
        public virtual bool Create(T entity)
        {
            _dbset.Add(entity);
            _db.Commit();

            return true;
        }

        /// <summary>
        /// Returns a specific instance of an entity from the database on behalf of the parent type.
        /// </summary>
        /// <param name="id">The integer value of the entity's primary key</param>
        /// <returns>A database object (of type T)</returns>
        public virtual T Read(int id)
        {
            return _dbset.Find(id);
        }

        /// <summary>
        /// Returns an IEnumerable collection of all objects found in the database of type T
        /// </summary>
        /// <returns>A collection of type IEnumerable</returns>
        public virtual IEnumerable<T> Read()
        {
            return _dbset.ToList();
        }

        /// <summary>
        /// Updates an existing entity instance in the database on behalf of the parent type.
        /// </summary>
        /// <param name="entity">Any valid database object</param>
        public bool Update(T entity)
        {
            _dbset.Attach(entity);
            _db.Entry(entity).State = EntityState.Modified;
            _db.Commit();

            return true;
        }

        /// <summary>
        /// Deletes an existing instance of an entity from the database on behalf of the parent type.
        /// </summary>
        /// <param name="entity">Any valid database object</param>
        public virtual bool Delete(T entity)
        {
            _dbset.Remove(entity);
            _db.Commit();

            return true;
        }

        public IEnumerable<T> Read(Expression<System.Func<T, bool>> predicate)
        {
            return _dbset.Where(predicate).ToList();
        }
    }
}
