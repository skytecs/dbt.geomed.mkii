using Microsoft.EntityFrameworkCore.Migrations;

namespace Dbt.Geomed.Migrations
{
    public partial class SetCategoryInServices : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Services_Category_CategoryId",
                table: "Services");

            migrationBuilder.AlterColumn<long>(
                name: "CategoryId",
                table: "Services",
                nullable: true,
                oldClrType: typeof(long));

            migrationBuilder.AddForeignKey(
                name: "FK_Services_Category_CategoryId",
                table: "Services",
                column: "CategoryId",
                principalTable: "Category",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.Sql(
"UPDATE \"Services\" s SET \"CategoryId\" = (select cat.\"Id\" from \"Category\" cat where cat.\"Code\" = s.\"Part\");" 
);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Services_Category_CategoryId",
                table: "Services");

            migrationBuilder.AlterColumn<long>(
                name: "CategoryId",
                table: "Services",
                nullable: false,
                oldClrType: typeof(long),
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Services_Category_CategoryId",
                table: "Services",
                column: "CategoryId",
                principalTable: "Category",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
