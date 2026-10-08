# Citadel Air Paint Catalog

**CMP411 – Software Engineering: Front-End Design and Development**

## Project Overview

The Citadel Air Paint Catalog is a full-stack web application that allows users to browse, search, and filter Citadel Air miniature paints.

The application imports 77 paint records from an Excel workbook and displays them through a responsive web interface.

## Technologies Used

- **HTML5** – Page structure and user inputs
- **CSS3** – Styling and responsive layout
- **TypeScript** – Frontend application logic
- **JavaScript** – Compiled TypeScript executed in the browser
- **C# / ASP.NET Core 10** – Backend REST API
- **Entity Framework Core** – In-memory database
- **ClosedXML** – Excel workbook import
- **Swagger** – API testing and documentation
- **Git / GitHub** – Version control

## Features

- Browse 77 Citadel Air paints.
- Search paints by name.
- Filter paints by type.
- Combine search and type filters.
- Display paint color swatches and hexadecimal values.
- Open available paint product links.
- Responsive desktop and mobile layouts.
- Accessible form labels and keyboard focus indicators.
- Display messages for empty results and API errors.

## Application Structure

```text
CitadelPaintCatalog/
├── Controllers/
│   └── PaintsController.cs
├── Data/
│   ├── CitadelAir.xlsx
│   └── PaintDataSeeder.cs
├── Models/
│   ├── Paint.cs
│   └── PaintContext.cs
├── src/
│   └── site.ts
├── wwwroot/
│   ├── css/
│   │   └── site.css
│   ├── js/
│   │   └── site.js
│   └── index.html
├── Program.cs
├── tsconfig.json
└── README.md
```

## How the Application Works

1. The application starts and reads `CitadelAir.xlsx`.
2. ClosedXML extracts the paint records.
3. Entity Framework Core stores the records in an in-memory database.
4. ASP.NET Core provides the paint data through REST API endpoints.
5. The frontend retrieves the data using the Fetch API.
6. Users search and filter the records without reloading the page.

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/paints` | Returns all paints alphabetically |
| GET | `/api/paints/{id}` | Returns one paint by ID |

## Running the Application

### Requirements

- .NET 10 SDK
- Node.js and npm

### Instructions

Open a terminal in the project folder.

Install the frontend dependencies:

```powershell
npm install
```

Compile TypeScript:

```powershell
npx tsc
```

Restore the .NET dependencies:

```powershell
dotnet restore
```

Start the application:

```powershell
dotnet run
```

Open the application at:

`http://localhost:5090`

Swagger API documentation is available in development at:

`http://localhost:5090/swagger`

## User Inputs

The application includes two interactive controls:

**Paint Search:** Allows users to enter a paint name or part of a name.

**Paint Type:** Allows users to select a specific paint category.

Both filters work together to update the displayed results.

## Responsive Design and Accessibility

The application uses CSS Grid and Flexbox for layout.

At screen widths of 600 pixels or less, the filters and paint cards change to a single-column layout.

Accessibility features include labeled inputs, visible keyboard focus indicators, semantic HTML, and an accessible result counter.

## Testing

Manual testing has included:

- Loading all 77 paint records.
- Retrieving paint records from the REST API.
- Searching paint names.
- Filtering by paint type.
- Displaying color swatches.
- Displaying messages when no paints match.
- Checking the responsive layout at mobile screen widths.

## Known Limitations

- The database is in memory and reloads when the application restarts.
- Only the Citadel Air paint collection is currently included.
- Updating the Excel workbook requires restarting the application.
- The frontend requires the backend server to be running.
- The application currently uses an HTTP development configuration.

## Future Improvements

- Replace the in-memory database with SQLite.
- Add additional Citadel paint collections.
- Add advanced search and filtering.
- Display layer, shade, and highlight recommendations.
- Add paint inventory tracking.

## Project Status

Functional application with frontend search, filtering, responsive design, Excel data import, and REST API integration.