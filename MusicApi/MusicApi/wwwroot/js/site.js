const uri = 'api/MusicItems';
let musicItems = [];

function getItems() {
    fetch(uri)
        .then(response => response.json())
        .then(data => _displayItems(data))
        .catch(error => console.error('Unable to get music items.', error));
}

function addItem() {
    const songName = document.getElementById('add-songName');
    const artistName = document.getElementById('add-artistName');
    const rating = document.getElementById('add-rating');

    const item = {
        songName: songName.value.trim(),
        artistName: artistName.value.trim(),
        rating: Number(rating.value)
    };

    fetch(uri, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`POST failed: ${response.status}`);
            }
            return response.json();
        })
        .then(() => {
            getItems();

            songName.value = '';
            artistName.value = '';
            rating.value = '';
        })
        .catch(error => console.error('Unable to add music item.', error));

    return false;
}

function deleteItem(id) {
    fetch(`${uri}/${id}`, {
        method: 'DELETE'
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`DELETE failed: ${response.status}`);
            }

            getItems();
        })
        .catch(error => console.error('Unable to delete music item.', error));
}

function displayEditForm(id) {
    const item = musicItems.find(item => item.id === id);

    if (!item) {
        console.error(`Music item ${id} was not found.`);
        return;
    }

    document.getElementById('edit-id').value = item.id;
    document.getElementById('edit-songName').value = item.songName;
    document.getElementById('edit-artistName').value = item.artistName;
    document.getElementById('edit-rating').value = item.rating;

    document.getElementById('editForm').style.display = 'block';
}

function updateItem() {
    const itemId = document.getElementById('edit-id').value;

    const item = {
        id: Number(itemId),
        songName: document.getElementById('edit-songName').value.trim(),
        artistName: document.getElementById('edit-artistName').value.trim(),
        rating: Number(document.getElementById('edit-rating').value)
    };

    fetch(`${uri}/${itemId}`, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`PUT failed: ${response.status}`);
            }

            getItems();
            closeInput();
        })
        .catch(error => console.error('Unable to update music item.', error));

    return false;
}

function closeInput() {
    document.getElementById('editForm').style.display = 'none';
}

function _displayCount(itemCount) {
    const name = itemCount === 1 ? 'song' : 'songs';
    document.getElementById('counter').innerText = `${itemCount} ${name}`;
}

function _displayItems(data) {
    const tBody = document.getElementById('musicItems');

    tBody.innerHTML = '';
    _displayCount(data.length);

    const button = document.createElement('button');

    data.forEach(item => {
        const editButton = button.cloneNode(false);
        editButton.innerText = 'Edit';
        editButton.setAttribute(
            'onclick',
            `displayEditForm(${item.id})`
        );

        const deleteButton = button.cloneNode(false);
        deleteButton.innerText = 'Delete';
        deleteButton.setAttribute(
            'onclick',
            `deleteItem(${item.id})`
        );

        const tr = tBody.insertRow();

        const td1 = tr.insertCell(0);
        td1.appendChild(
            document.createTextNode(item.songName)
        );

        const td2 = tr.insertCell(1);
        td2.appendChild(
            document.createTextNode(item.artistName)
        );

        const td3 = tr.insertCell(2);
        td3.appendChild(
            document.createTextNode(item.rating)
        );

        const td4 = tr.insertCell(3);
        td4.appendChild(editButton);

        const td5 = tr.insertCell(4);
        td5.appendChild(deleteButton);
    });

    musicItems = data;
}