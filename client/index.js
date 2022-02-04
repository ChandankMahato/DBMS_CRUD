
document.addEventListener('DOMContentLoaded', function () {
    fetch('http://localhost:5000/getAll')
        .then(response => response.json())
        .then(data => loadHTMLTable(data['data']));
});

document.querySelector('table tbody').addEventListener
('click', function(event) {
   if(event.target.className === "delete-row-btn"){
       deleteRowById(event.target.id); //what is this dataset? how this getting Id??
   }
   if(event.target.className === 'edit-row-btn'){
       handleEditRow(event.target.id);
   }
});

const updateBtn = document.querySelector('#update-row-btn');
const searchBtn = document.querySelector('#search-btn');

searchBtn.onclick = function() {
    const searchValue = document.querySelector('#search-input').value;

    fetch('http://localhost:5000/search/' + searchValue)
    .then(response => response.json())
    .then(data => loadHTMLTable(data['data']));
}

function deleteRowById(Id){
    fetch('http://localhost:5000/delete/' + Id, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
        if(data.success){
            console.log('hello');
            location.reload();
        }
    });
}

function handleEditRow(Id){
    const updateSection = document.querySelector('#update-row');
    updateSection.hidden = false;
    document.querySelector('#update-row-btn').id = Id;
}

updateBtn.onclick = function(){
    const updateNameInput = document.querySelector('#update-name-input');
    fetch('http://localhost:5000/update', {
        method: 'PATCH',
        headers: {
            'Content-type' : 'application/json'
        },
        body: JSON.stringify({
            Id: updateBtn.id,
            name: updateNameInput.value,
        })
    })
    .then(response => response.json())
    .then(data => {
        if(data.success){
            location.reload();
        }
    });
}

const addBtn = document.querySelector('#add-name-btn');


addBtn.onclick = function () {
    const nameInput = document.querySelector('#name-input');
    const name = nameInput.value;
    nameInput.value = "";

    fetch('http://localhost:5000/insert', {
        headers: {
            'Content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({ name: name })
    })
        .then(response => response.json())
        .then(data => insertRowIntoTable(data['data']));
}

function insertRowIntoTable(data) {
    const table = document.querySelector('table tbody');
    const isTableDataExist = table.querySelector('.no-data');

    let tableHTML = "<tr>";

    for (var key in data) {
        if (data.hasOwnProperty(key)) {
            if (key === 'dateAdded') {
                data[key] = new Date(data[key]).toLocaleString();
            }
            tableHTML += `<td>${data[key]}</td>`;
        }
    }

    tableHTML += `<td><button class="delete-row-btn" id=${data.Id}>Delete</button></td>`;
    tableHTML += `<td><button class="edit-row-btn" id=${data.Id}>Edit</button></td>`;

    tableHTML += "</tr>";

    if (isTableDataExist) {
        table.innerHTML = tableHTML;
    } else {
        const newRow = table.insertRow();
        newRow.innerHTML = tableHTML;
    }
}

function loadHTMLTable(data) {
    const table = document.querySelector('table tbody');
    if (data.length === 0) {
        table.innerHTML =
            "<tr><td class='no-data' colspan='5'>No Data</td></tr>";
        return;
    }

    let tableHTML = "";

    data.forEach(function ({ Id, name, date_added }) {
        tableHTML += "<tr>"; //row starts

        //cols inside row
        tableHTML += `<td>${Id}</td>`;
        tableHTML += `<td>${name}</td>`;
        tableHTML += `<td>${new Date(date_added).toLocaleString()}</td>`;
        tableHTML +=
            `<td>
        <button class="delete-row-btn" id=${Id}>Delete</button>
        </td>`;

        tableHTML +=
            `<td>
        <button class="edit-row-btn" id=${Id}>Edit</button>
        </td>`;

        tableHTML += "</tr>"; //row ends
    });

    table.innerHTML = tableHTML;
}