using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace api.Migrations
{
    /// <inheritdoc />
    public partial class avatarURL : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PostAuthors_AspNetUsers_AppUserID",
                table: "PostAuthors");

            migrationBuilder.DropForeignKey(
                name: "FK_PostAuthors_Post_PostID",
                table: "PostAuthors");

            migrationBuilder.DropPrimaryKey(
                name: "PK_PostAuthors",
                table: "PostAuthors");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "5cf61124-4b93-4ca1-8400-d9bc09c8107e");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "7a86b66f-bd28-4ca3-b4d8-9b861abc612f");

            migrationBuilder.RenameTable(
                name: "PostAuthors",
                newName: "PostAuthor");

            migrationBuilder.RenameIndex(
                name: "IX_PostAuthors_AppUserID",
                table: "PostAuthor",
                newName: "IX_PostAuthor_AppUserID");

            migrationBuilder.AddColumn<string>(
                name: "AvatarUrl",
                table: "AspNetUsers",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_PostAuthor",
                table: "PostAuthor",
                columns: new[] { "PostID", "AppUserID" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "4a8f6f09-e1b2-43e8-8935-f31ec0581875", null, "AppUser", "APPUSER" },
                    { "93d232f2-16cc-4096-80ea-ea29651bd9b7", null, "Admin", "ADMIN" }
                });

            migrationBuilder.AddForeignKey(
                name: "FK_PostAuthor_AspNetUsers_AppUserID",
                table: "PostAuthor",
                column: "AppUserID",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_PostAuthor_Post_PostID",
                table: "PostAuthor",
                column: "PostID",
                principalTable: "Post",
                principalColumn: "PostID",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PostAuthor_AspNetUsers_AppUserID",
                table: "PostAuthor");

            migrationBuilder.DropForeignKey(
                name: "FK_PostAuthor_Post_PostID",
                table: "PostAuthor");

            migrationBuilder.DropPrimaryKey(
                name: "PK_PostAuthor",
                table: "PostAuthor");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "4a8f6f09-e1b2-43e8-8935-f31ec0581875");

            migrationBuilder.DeleteData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "93d232f2-16cc-4096-80ea-ea29651bd9b7");

            migrationBuilder.DropColumn(
                name: "AvatarUrl",
                table: "AspNetUsers");

            migrationBuilder.RenameTable(
                name: "PostAuthor",
                newName: "PostAuthors");

            migrationBuilder.RenameIndex(
                name: "IX_PostAuthor_AppUserID",
                table: "PostAuthors",
                newName: "IX_PostAuthors_AppUserID");

            migrationBuilder.AddPrimaryKey(
                name: "PK_PostAuthors",
                table: "PostAuthors",
                columns: new[] { "PostID", "AppUserID" });

            migrationBuilder.InsertData(
                table: "AspNetRoles",
                columns: new[] { "Id", "ConcurrencyStamp", "Name", "NormalizedName" },
                values: new object[,]
                {
                    { "5cf61124-4b93-4ca1-8400-d9bc09c8107e", null, "Admin", "ADMIN" },
                    { "7a86b66f-bd28-4ca3-b4d8-9b861abc612f", null, "AppUser", "APPUSER" }
                });

            migrationBuilder.AddForeignKey(
                name: "FK_PostAuthors_AspNetUsers_AppUserID",
                table: "PostAuthors",
                column: "AppUserID",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_PostAuthors_Post_PostID",
                table: "PostAuthors",
                column: "PostID",
                principalTable: "Post",
                principalColumn: "PostID",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
