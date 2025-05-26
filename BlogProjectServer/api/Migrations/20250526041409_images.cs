using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class images : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "5b4b0ce6-beb3-4cbf-a921-a8826f219a31");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "9ff44a75-c13b-4237-a863-b7f1b61254d5");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "70a424c7-71a3-47c8-b00a-4b65b2977dc9", null, "AppUser", "APPUSER" },
                    { "fdffd4dd-add8-4e99-b728-5169a32b5a94", null, "Admin", "ADMIN" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "70a424c7-71a3-47c8-b00a-4b65b2977dc9");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "fdffd4dd-add8-4e99-b728-5169a32b5a94");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "5b4b0ce6-beb3-4cbf-a921-a8826f219a31", null, "Admin", "ADMIN" },
                    { "9ff44a75-c13b-4237-a863-b7f1b61254d5", null, "AppUser", "APPUSER" }
                });
        }
    }
}
