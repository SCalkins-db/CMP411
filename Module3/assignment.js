function validateAndAdd() {
    let word = document.getElementById("word").value;
    let listNumber = document.getElementById("listNumber").value;

    let listEntry = {
        word: word,
        listNumber: listNumber
    };

    if (word === "") {
    alert("Please enter a word.");
    return;
    }

    if (listNumber !== "1" && listNumber !== "2") {
        alert("Please enter 1 or 2 for the list.");
        return;
    }

    if (listEntry.listNumber === "1") {
        let list = document.getElementById("list1");
        let item = document.createElement("li");
        let result = checkPalindrome1(listEntry.word);
        item.textContent = listEntry.word + ": " + result;
        list.appendChild(item);
    } else {
        let list = document.getElementById("list2");
        let item = document.createElement("li");
        let result = checkPalindrome2(listEntry.word);
        item.textContent = listEntry.word + ": " + result;
        list.appendChild(item);
    }
}   // <-- closes validateAndAdd()

function clearList1() {
    document.getElementById("list1").innerHTML = "";
}

function clearList2() {
    document.getElementById("list2").innerHTML = "";
}

function checkPalindrome1(word) {
    let reversedWord = word.split("").reverse().join("");

    return word === reversedWord;
}

function checkPalindrome2(word) {
    let left = 0;
    let right = word.length - 1;

    while (left < right) {
        if (word[left] !== word[right]) {
            return false;
        }

        left++;
        right--;
    }

    return true;
}