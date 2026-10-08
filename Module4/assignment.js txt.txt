document.getElementById("baconForm").addEventListener("submit", getBacon);

async function getBacon(event) {
    event.preventDefault();

    let paragraphs = document.getElementById("paragraphs").value;
    let type = document.getElementById("type").value;

    let apiUrl =
        "https://baconipsum.com/api/?type=" +
        type +
        "&paras=" +
        paragraphs +
        "&format=json";

    try {
        let response = await fetch(apiUrl);
        let data = await response.json();

        document.getElementById("rawJson").textContent =
            JSON.stringify(data, null, 2);

        let formattedText = document.getElementById("formattedText");
        formattedText.innerHTML = "";

        let encryptedText = document.getElementById("encryptedText");
        encryptedText.innerHTML = "";

        data.forEach(function(paragraph) {
            let p = document.createElement("p");
            p.textContent = paragraph;
            formattedText.appendChild(p);
        });

        data.forEach(paragraph => {
            console.log("ENCRYPTED:", caesarCipher(paragraph));

            let p = document.createElement("p");
            p.textContent = caesarCipher(paragraph);
            encryptedText.appendChild(p);
        });

    } catch (error) {
        alert("There was a problem getting the Bacon Ipsum data.");
        console.error(error);
    }
}

function caesarCipher(text) {
    let encrypted = "";

    for (let i = 0; i < text.length; i++) {
        let code = text.charCodeAt(i);

        // Uppercase letters
        if (code >= 65 && code <= 90) {
            code = ((code - 65 + 13) % 26) + 65;
        }

        // Lowercase letters
        else if (code >= 97 && code <= 122) {
            code = ((code - 97 + 13) % 26) + 97;
        }

        encrypted += String.fromCharCode(code);
    }

    return encrypted;
}