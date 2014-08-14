using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;
using Entidades;

namespace Repositorio
{
    public class PolesportivoContext : DbContext
    {
        public PolesportivoContext(string connectionString)
            : base(connectionString)
        {
            _atletas = Atletas;
            _dados = Dados;
            _eventos = Eventos;
            _eventosmodalidade = EventoModalidade;
            _modalidades = Modalidades;
        }

        private IDbSet<Atleta> _atletas;
        public IDbSet<Atleta> Atletas
        {
            get { return _atletas ?? (_atletas = DbSet<Atleta>()); }
        }

        private IDbSet<Dados> _dados;
        public IDbSet<Dados> Dados
        {
            get { return _dados ?? (_dados = DbSet<Dados>()); }
        }

        private IDbSet<Evento> _eventos;
        public IDbSet<Evento> Eventos
        {
            get { return _eventos ?? (_eventos = DbSet<Evento>()); }
        }

        private IDbSet<EventoModalidade> _eventosmodalidade;
        public IDbSet<EventoModalidade> EventoModalidade
        {
            get { return _eventosmodalidade ?? (_eventosmodalidade = DbSet<EventoModalidade>()); }
        }

        private IDbSet<Modalidade> _modalidades;
        public IDbSet<Modalidade> Modalidades
        {
            get { return _modalidades ?? (_modalidades = DbSet<Modalidade>()); }
        }

        /// <summary>
        /// Returns a DbSet for the specified type, this allows CRUD operations to be performed for 
        /// the given entity in the context.  
        /// </summary>
        public virtual IDbSet<T> DbSet<T>() where T : class
        {
            return Set<T>();
        }

        /// <summary>
        /// Saves all changes made in this context to the underlying database. 
        /// </summary>
        public virtual void Commit()
        {
            base.SaveChanges();
        }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();
            base.OnModelCreating(modelBuilder);
            //Database.SetInitializer(new DropCreateDatabaseAlways<PolesportivoContext>());
            Database.SetInitializer(new Initialiser());
        }
    }

    internal class Initialiser : CreateDatabaseIfNotExists<PolesportivoContext>
    {
        protected override void Seed(PolesportivoContext context)
        {

        }
    }
}
