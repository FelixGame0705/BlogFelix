using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class images3 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "00276e91-ba4d-4865-a847-fd645194f74c");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "8219c7cf-466b-4477-9c9b-850623e8ea31");

            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "Images",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "8361bc11-7563-4e4d-aabb-47b06a24f398", null, "Admin", "ADMIN" },
                    { "eb151062-d736-40a0-9230-11daa54889b8", null, "AppUser", "APPUSER" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "8361bc11-7563-4e4d-aabb-47b06a24f398");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "eb151062-d736-40a0-9230-11daa54889b8");

            migrationBuilder.DropColumn(
                name: "Name",
                table: "Images");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "00276e91-ba4d-4865-a847-fd645194f74c", null, "Admin", "ADMIN" },
                    { "8219c7cf-466b-4477-9c9b-850623e8ea31", null, "AppUser", "APPUSER" }
                });
        }
    }
}
