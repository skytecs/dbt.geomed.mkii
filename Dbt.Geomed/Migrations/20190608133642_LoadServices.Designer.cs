﻿// <auto-generated />
using Dbt.Geomed.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace Dbt.Geomed.Migrations
{
    [DbContext(typeof(DataContext))]
    [Migration("20190608133642_LoadServices")]
    partial class LoadServices
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.SerialColumn)
                .HasAnnotation("ProductVersion", "2.2.4-servicing-10062")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            modelBuilder.Entity("Dbt.Geomed.Models.Company", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Address");

                    b.Property<double>("Lat");

                    b.Property<double>("Lng");

                    b.Property<string>("Name");

                    b.HasKey("Id");

                    b.ToTable("Companies");
                });

            modelBuilder.Entity("Dbt.Geomed.Models.Service", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Group");

                    b.Property<string>("Name");

                    b.Property<string>("Part");

                    b.Property<string>("ServiceClass");

                    b.Property<string>("Subgroup");

                    b.Property<string>("Subpart");

                    b.HasKey("Id");

                    b.ToTable("Services");
                });

            modelBuilder.Entity("Dbt.Geomed.Models.User", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Firstname");

                    b.Property<string>("Lastname");

                    b.Property<string>("Middlename");

                    b.HasKey("Id");

                    b.ToTable("Users");
                });
#pragma warning restore 612, 618
        }
    }
}
