using Microsoft.EntityFrameworkCore.Migrations;

namespace Dbt.Geomed.Migrations
{
    public partial class AddsNhi : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsNhi",
                table: "Prices",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsNhi",
                table: "Prices");
        }
    }
}
