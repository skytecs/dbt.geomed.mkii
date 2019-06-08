using Microsoft.EntityFrameworkCore.Migrations;

namespace Dbt.Geomed.Migrations
{
    public partial class AddCompayCoordinates : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<double>(
                name: "Lat",
                table: "Companies",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AddColumn<double>(
                name: "Lng",
                table: "Companies",
                nullable: false,
                defaultValue: 0.0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Lat",
                table: "Companies");

            migrationBuilder.DropColumn(
                name: "Lng",
                table: "Companies");
        }
    }
}
