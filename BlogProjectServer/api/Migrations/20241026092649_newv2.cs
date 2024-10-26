using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class newv2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "510b1a30-5b1e-4f7f-a75b-27b0d182e040");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "dc7ad1aa-6d93-43ff-a5fe-d015c08755b0");

            migrationBuilder.AddColumn<string>(
                name: "Status",
                table: "Post",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "avatarURL",
                table: "Comment",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "fullName",
                table: "Comment",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "5b4b0ce6-beb3-4cbf-a921-a8826f219a31", null, "Admin", "ADMIN" },
                    { "9ff44a75-c13b-4237-a863-b7f1b61254d5", null, "AppUser", "APPUSER" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "5b4b0ce6-beb3-4cbf-a921-a8826f219a31");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "9ff44a75-c13b-4237-a863-b7f1b61254d5");

            migrationBuilder.DropColumn(
                name: "Status",
                table: "Post");

            migrationBuilder.DropColumn(
                name: "avatarURL",
                table: "Comment");

            migrationBuilder.DropColumn(
                name: "fullName",
                table: "Comment");

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "510b1a30-5b1e-4f7f-a75b-27b0d182e040", null, "AppUser", "APPUSER" },
                    { "dc7ad1aa-6d93-43ff-a5fe-d015c08755b0", null, "Admin", "ADMIN" }
                });
        }
    }
}
