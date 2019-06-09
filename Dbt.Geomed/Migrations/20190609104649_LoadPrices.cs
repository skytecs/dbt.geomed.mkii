using Microsoft.EntityFrameworkCore.Migrations;

namespace Dbt.Geomed.Migrations
{
    public partial class LoadPrices : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(
@"
insert into ""Prices""(""CompanyId"", ""ServiceId"", ""Amount"", ""IsNhi"") values
(1, 1, 100, false),
    (1, 2, 500, false),
    (1, 3, 150, false),
    (1, 4, 160, false),
    (1, 5, 700, false),
    (1, 6, 230, false),
    (1, 7, 10, false),
    (1, 8, 120, true),
    (1, 9, 420, false),

    (4, 1, 130, false),
    (4, 2, 70, false),
    (4, 3, 120, false),
    (4, 4, 60, true),
    (4, 5, 950, false),
    (4, 6, 2030, false),
    (4, 7, 170, true),
    (4, 8, 15, false),
    (4, 9, 20, false),

    (2, 1, 120, false),
    (2, 2, 480, false),
    (2, 3, 350, false),
    (2, 4, 160, true),
    (2, 5, 500, false),
    (2, 6, 230, false),
    (2, 7, 15, false),
    (2, 8, 330, true),
    (2, 9, 25, false),

    (3, 1, 1400, false),
    (3, 2, 200, false),
    (3, 3, 750, true),
    (3, 4, 120, false),
    (3, 5, 100, true),
    (3, 6, 30, true),
    (3, 7, 210, false),
    (3, 8, 10, false),
    (3, 9, 40, false)"
);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
