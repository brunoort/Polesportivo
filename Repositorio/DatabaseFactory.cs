﻿using System;
using Repositorio.Interfaces;

namespace Repositorio
{
    /// <summary>
    /// The DatabaseFactory class is the proxy manager for all connections and transactions with the database.
    /// </summary>
    /// <remarks>
    /// This class is responsible for the actual connection to the database. It holds the reference to the actual 
    /// database connection string from Web.Config.
    /// </remarks>
    public class DatabaseFactory : Disposable, IDatabaseFactory
    {
        private PolesportivoContext _db;

        /// <summary>
        /// Returns the active database object context instance or creates a new instance if one doesn't exist 
        /// already.
        /// </summary>
        public PolesportivoContext Get()
        {
            const string connectionString = "Server=(localdb)\\v11.0;Integrated Security=true;Database=Polesportivo;Trusted_Connection=True;";
            return _db ?? (_db = new PolesportivoContext(connectionString));
        }

        protected override void DisposeCore()
        {
            if (_db != null)
                _db.Dispose();
        }
    }

    /// <summary>
    /// The Disposable class is a managed disposable resource that can be explicitly called within other classes.
    /// </summary>
    public class Disposable : IDisposable
    {
        private bool _isDisposed;

        ~Disposable()
        {
            Dispose(false);
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
        private void Dispose(bool disposing)
        {
            if (!_isDisposed && disposing)
            {
                DisposeCore();
            }

            _isDisposed = true;
        }

        protected virtual void DisposeCore()
        {
        }
    }

}
