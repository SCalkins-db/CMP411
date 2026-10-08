
using ClosedXML.Excel;
using CitadelPaintCatalog.Models;
using Microsoft.EntityFrameworkCore;

namespace CitadelPaintCatalog.Data
{
    // Loads paint records from the Excel workbook
    public static class PaintDataSeeder
    {
        public static async Task SeedAsync(
            PaintContext context,
            string filePath)
        {
            // Skip importing if paints are already loaded
            if (await context.Paints.AnyAsync())
                return;

            // Check that the Excel file exists
            if (!File.Exists(filePath))
                throw new FileNotFoundException(
                    "Paint workbook not found.", filePath);

            // Open the workbook and select the first worksheet
            using var workbook = new XLWorkbook(filePath);
            var worksheet = workbook.Worksheet(1);

            var paints = new List<Paint>();

            // Skip the first row containing column headings
            foreach (var row in worksheet.RowsUsed().Skip(1))
            {
                string name = row.Cell(2).GetString().Trim();

                // Skip rows without a paint name
                if (string.IsNullOrWhiteSpace(name))
                    continue;

                // Skip rows without a valid paint ID
                if (!long.TryParse(
                    row.Cell(1).GetString(), out long id))
                    continue;

                // Read paint information from the Excel columns
                paints.Add(new Paint
                {
                    Id = id,
                    Name = name,
                    Value = row.Cell(3).GetString().Trim(),
                    Type = row.Cell(4).GetString().Trim(),
                    Layer = row.Cell(5).GetString().Trim(),
                    Shade = row.Cell(6).GetString().Trim(),
                    Highlight = row.Cell(7).GetString().Trim(),
                    Url = row.Cell(8).GetString().Trim()
                });
            }

            // Save the imported paints to the database
            context.Paints.AddRange(paints);
            await context.SaveChangesAsync();

            // Display the number of imported paints
            Console.WriteLine(
                $"Loaded {paints.Count} Citadel Air paints.");
        }
    }
}
