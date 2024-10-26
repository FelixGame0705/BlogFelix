using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class dropIDPostAuthor : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "4a8f6f09-e1b2-43e8-8935-f31ec0581875");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "93d232f2-16cc-4096-80ea-ea29651bd9b7");

            migrationBuilder.DropColumn(
                name: "PostAuthorID",
                table: "PostAuthor");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "510b1a30-5b1e-4f7f-a75b-27b0d182e040", null, "AppUser", "APPUSER" },
                    { "dc7ad1aa-6d93-43ff-a5fe-d015c08755b0", null, "Admin", "ADMIN" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "510b1a30-5b1e-4f7f-a75b-27b0d182e040");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "dc7ad1aa-6d93-43ff-a5fe-d015c08755b0");

            migrationBuilder.AddColumn<int>(
                name: "PostAuthorID",
                table: "PostAuthor",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "4a8f6f09-e1b2-43e8-8935-f31ec0581875", null, "AppUser", "APPUSER" },
                    { "93d232f2-16cc-4096-80ea-ea29651bd9b7", null, "Admin", "ADMIN" }
                });
        }
    }
}
