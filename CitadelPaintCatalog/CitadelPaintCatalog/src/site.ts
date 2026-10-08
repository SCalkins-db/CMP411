
"use strict";

// Define the paint data returned by the API
interface Paint {
    id: number;
    name: string;
    value: string | null;
    type: string | null;
    layer: string | null;
    shade: string | null;
    highlight: string | null;
    url: string | null;
}

// Connect to the HTML elements
const searchInput = document.getElementById(
    "searchInput"
) as HTMLInputElement;

const typeFilter = document.getElementById(
    "typeFilter"
) as HTMLSelectElement;

const paintGrid = document.getElementById(
    "paintGrid"
) as HTMLElement;

const resultCount = document.getElementById(
    "resultCount"
) as HTMLElement;

// Store the paint records
let allPaints: Paint[] = [];

// Load paint data from the API
async function loadPaints(): Promise<void> {
    try {
        const response = await fetch("/api/paints");

        if (!response.ok) {
            throw new Error("Unable to retrieve paints.");
        }

        allPaints = (await response.json()) as Paint[];

        populateTypeFilter();
        displayPaints();
    } catch (error: unknown) {
        console.error("API error:", error);

        resultCount.textContent = "Unable to load paints.";
        paintGrid.replaceChildren();

        const message = document.createElement("p");
        message.className = "empty-message";
        message.textContent = "Please check that the API is running.";

        paintGrid.appendChild(message);
    }
}

// Add available paint types to the dropdown
function populateTypeFilter(): void {
    const types: string[] = [
        ...new Set(
            allPaints
                .map((paint: Paint) => paint.type)
                .filter((type): type is string => Boolean(type))
        )
    ].sort();

    for (const type of types) {
        const option = document.createElement("option");

        option.value = type;
        option.textContent = type;

        typeFilter.appendChild(option);
    }
}

// Check that color values are valid hex codes
function getPaintColor(value: string | null): string {
    if (typeof value !== "string") {
        return "#dddddd";
    }

    const color = value.trim();

    if (/^#(?:[0-9a-f]{3}|[0-9a-f]{6})$/i.test(color)) {
        return color;
    }

    if (/^(?:[0-9a-f]{3}|[0-9a-f]{6})$/i.test(color)) {
        return "#" + color;
    }

    return "#dddddd";
}

// Filter paints by name and type
function displayPaints(): void {
    const search: string = searchInput.value.trim().toLowerCase();
    const selectedType: string = typeFilter.value;

    const filteredPaints: Paint[] = allPaints.filter(
        (paint: Paint) => {
            const matchesName: boolean = (paint.name ?? "")
                .toLowerCase()
                .includes(search);

            const matchesType: boolean =
                selectedType === "" || paint.type === selectedType;

            return matchesName && matchesType;
        }
    );

    // Update the result count
    resultCount.textContent =
        `Showing ${filteredPaints.length} of ${allPaints.length} paints`;

    // Clear the previous paint cards
    paintGrid.replaceChildren();

    if (filteredPaints.length === 0) {
        const message = document.createElement("p");

        message.className = "empty-message";
        message.textContent = "No paints match your search.";

        paintGrid.appendChild(message);
        return;
    }

    // Display the matching paints
    for (const paint of filteredPaints) {
        paintGrid.appendChild(createPaintCard(paint));
    }
}

// Create a card for each paint
function createPaintCard(paint: Paint): HTMLElement {
    const card = document.createElement("article");
    card.className = "paint-card";

    // Set the paint color preview
    const swatch = document.createElement("div");
    swatch.className = "paint-swatch";
    swatch.style.backgroundColor = getPaintColor(paint.value);
    swatch.setAttribute("aria-hidden", "true");

    const details = document.createElement("div");
    details.className = "paint-details";

    const name = document.createElement("h2");
    name.textContent = paint.name;

    const type = document.createElement("p");
    type.className = "paint-type";
    type.textContent = paint.type || "Unknown type";

    const code = document.createElement("span");
    code.className = "paint-code";
    code.textContent = paint.value || "No color code";

    details.append(name, type, code);

    // Add a product link if the URL is valid
    if (paint.url) {
        try {
            const url = new URL(paint.url);

            if (url.protocol === "https:") {
                const link = document.createElement("a");

                link.className = "paint-link";
                link.href = url.href;
                link.target = "_blank";
                link.rel = "noopener noreferrer";
                link.textContent = "View Paint";

                details.appendChild(document.createElement("br"));
                details.appendChild(link);
            }
        } catch {
            // Skip invalid URLs
        }
    }

    card.append(swatch, details);

    return card;
}

// Update results when the search or filter changes
searchInput.addEventListener("input", displayPaints);
typeFilter.addEventListener("change", displayPaints);

// Load paints when the page opens
loadPaints();
