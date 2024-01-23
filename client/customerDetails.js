

//Loading initial data
//#######################################################
document.addEventListener('DOMContentLoaded', function () {
    fetch('http://localhost:5000/getAll')
        .then(response => response.json())
        .then(data => loadHTMLTable(data['data']));
});
//#######################################################



//passing id to delete and edit function
//#######################################################
document.querySelector('table tbody').addEventListener
    ('click', function (event) {
        if (event.target.className === "delete-row-btn") {
            deleteRowById(event.target.id); //what is this dataset? how this getting Id??
        }
        if (event.target.className === 'update-row-btn') {
            handleUpdateRow(event.target.id);
        }
    });
//#######################################################

//Delete data
//#######################################################
function deleteRowById(number) {
    fetch('http://localhost:5000/delete/' + number, {
        method: 'DELETE'
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                location.reload();
            }
        });
}
//#######################################################


//Updating data
//#######################################################

function handleUpdateRow(number) {
    const updateSection = document.querySelector('#update-Customer-Details');
    updateSection.hidden = false;
    
    fetch('http://localhost:5000/search/' + number)
    .then(response => response.json())
    .then(data => loadUpdateTable(data['data']))
}

function loadUpdateTable(data){
    console.log(data[0].address);
    document.querySelector('#updateForm #Cname').value = data[0].name;
    document.querySelector('#updateForm #Cnumber').value = data[0].number;
    document.querySelector('#updateForm #Caddress').value = data[0].address;
    document.querySelector('#updateForm #Cdues').value = data[0].dues;
    document.querySelector('#updateForm #Cfavorite').value = data[0].favorite;
}

const updateCustomerDetails = document.querySelector('#update-customer-details-btn');

updateCustomerDetails.onclick = function () {
    const data = Array.from(document.querySelectorAll('#updateForm input')).reduce((acc, input) => ({
        ...acc,
        [input.id]: input.value
    }), {});
    fetch('http://localhost:5000/update', {
        method: 'PATCH',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({data})
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                location.reload();
            }
        });
}
//#######################################################



//Data search
//#######################################################
const searchBtn = document.querySelector('#search-btn');
searchBtn.onclick = function () {
    const searchValue = document.querySelector('#search-input').value;

    fetch('http://localhost:5000/search/' + searchValue)
        .then(response => response.json())
        .then(data => loadHTMLTable(data['data']));
}
//#######################################################


// // Adding data
// // #######################################################
const addCustomerDetails = document.querySelector('#add-customer-details-btn');
addCustomerDetails.onclick = function () {
    const data = Array.from(document.querySelectorAll('#registrationFrom input')).reduce((acc, input) => ({
        ...acc,
        [input.id]: input.value
    }), {});

    fetch('http://localhost:5000/insert', {
        headers: {
            'Content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({ data })
    })
        .then(response => response.json())
        .then(data => insertRowIntoTable(data(data)));
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

    tableHTML += `<td><button class="delete-row-btn" id=${data.number}>Delete</button></td>`;
    tableHTML += `<td><button class="update-row-btn" id=${data.number}>Edit</button></td>`;

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

    data.forEach(function ({name, number, address, dateadded, favorite, amount, dues }) {
        tableHTML += "<tr>"; //row starts

        //cols inside row
        tableHTML += `<td>${name}</td>`;
        tableHTML += `<td>${number}`;
        tableHTML += `<td>${address}`;
        tableHTML += `<td>${favorite}`;
        tableHTML += `<td>${new Date(dateadded).toLocaleString()}</td>`;
        tableHTML += `<td>${amount}`;
        tableHTML += `<td>${dues}`;
        tableHTML +=
            `<td>
                <button class="delete-row-btn" id=${number}>Delete</button>
            </td>`;

        tableHTML +=
            `<td>
                <button class="update-row-btn" id=${number}>Update</button>
            </td>`;

        tableHTML += "</tr>"; //row ends
    });

    table.innerHTML = tableHTML;
}

//#######################################################