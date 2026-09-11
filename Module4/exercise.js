document.getElementById("baconForm").addEventListener("submit", getBacon);

async function getBacon(event) {
    event.preventDefault();

    let paragraphs = document.getElementById("paragraphs").value;

    let apiUrl =
        "https://baconipsum.com/api/?type=all-meat&paras=" +
        paragraphs +
        "&format=json";

    try {
        let response = await fetch(apiUrl);
        let data = await response.json();

        document.getElementById("rawJson").textContent =
            JSON.stringify(data, null, 2);

        let formattedText = document.getElementById("formattedText");
        formattedText.innerHTML = "";

        data.forEach(function(paragraph) {
            let p = document.createElement("p");
            p.textContent = paragraph;
            formattedText.appendChild(p);
        });

    } catch (error) {
        alert("There was a problem getting the Bacon Ipsum data.");
        console.error(error);
    }
}