using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Data.Migrations
{
    /// <inheritdoc />
    public partial class ExtendedUserEntity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "AppUserId",
                table: "Links",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Links_AppUserId",
                table: "Links",
                column: "AppUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Links_Users_AppUserId",
                table: "Links",
                column: "AppUserId",
                principalTable: "Users",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Links_Users_AppUserId",
                table: "Links");

            migrationBuilder.DropIndex(
                name: "IX_Links_AppUserId",
                table: "Links");

            migrationBuilder.DropColumn(
                name: "AppUserId",
                table: "Links");
        }
    }
}
