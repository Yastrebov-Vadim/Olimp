﻿//------------------------------------------------------------------------------
// <auto-generated>
//     Этот код создан по шаблону.
//
//     Изменения, вносимые в этот файл вручную, могут привести к непредвиденной работе приложения.
//     Изменения, вносимые в этот файл вручную, будут перезаписаны при повторном создании кода.
// </auto-generated>
//------------------------------------------------------------------------------

namespace OlympusPortal.DateModel
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Infrastructure;
    
    public partial class OlimpEntities : DbContext
    {
        public OlimpEntities()
            : base("name=OlimpEntities")
        {
        }
    
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            throw new UnintentionalCodeFirstException();
        }
    
        public virtual DbSet<news> news { get; set; }
        public virtual DbSet<email_code> email_code { get; set; }
        public virtual DbSet<command> commands { get; set; }
        public virtual DbSet<player> players { get; set; }
    }
}
