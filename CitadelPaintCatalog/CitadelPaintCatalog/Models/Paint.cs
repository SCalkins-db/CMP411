
namespace CitadelPaintCatalog.Models
{
    // Defines the information stored for each paint
    public class Paint
    {
        // Unique paint ID
        public long Id { get; set; }

        // Paint name
        public string Name { get; set; } = string.Empty;

        // Hex color value
        public string? Value { get; set; }

        // Paint category
        public string? Type { get; set; }

        // Related layer paint
        public string? Layer { get; set; }

        // Related shade paint
        public string? Shade { get; set; }

        // Related highlight paint
        public string? Highlight { get; set; }

        // Link to the paint product page
        public string? Url { get; set; }
    }
}
