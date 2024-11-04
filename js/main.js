
// add hovered class to selected list item

let list = document.querySelectorAll(".navigating li");

function activeLink(){
    list.forEach(item=>{
        item.classList.remove("hovered");
    })

    this.classList.remove("hovered");

}

list.forEach(item => item.addEventListener("mouseover",activeLink))

//menu ioggle

let toggle = document.querySelector('.toggle');
let navigation = document.querySelector('.navigating');
let main = document.querySelector('.main');


toggle.onclick =function(){

    navigation.classList.toggle('active');
    main.classList.toggle('active');

};

//===================datetime=================
// script.js
function updateDateTime() {
    const dateElement = document.getElementById('date');
    const timeElement = document.getElementById('time');

    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const dateString = now.toLocaleDateString(undefined, options);
    const timeString = now.toLocaleTimeString();

    dateElement.textContent = dateString;
    timeElement.textContent = timeString;
}

// Update the time immediately, then every second
updateDateTime();
setInterval(updateDateTime, 1000);

//
function saveStaff() {
    // Get values from the form
    const id = document.getElementById("id").value;
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const designation = document.getElementById("designation").value;
    const gender = document.getElementById("gender").value;
    const role = document.getElementById("role").value;

    // Check if all required fields are filled
    if (!id || !firstName || !lastName || !designation || !gender || !role) {
        alert("Please fill out all required fields.");
        return;
    }

    // Create a new row in the table
    const table = document.getElementById("staffTable").getElementsByTagName("tbody")[0];
    const newRow = table.insertRow();

    // Insert cells and add values
    newRow.insertCell(0).textContent = id;
    newRow.insertCell(1).textContent = firstName;
    newRow.insertCell(2).textContent = lastName;
    newRow.insertCell(3).textContent = designation;
    newRow.insertCell(4).textContent = gender;
    newRow.insertCell(5).textContent = role;

    // Actions cell with Update and Delete icons
    const actionsCell = newRow.insertCell(6);
    actionsCell.innerHTML = `
    <button class="btn btn-info btn-sm me-2" onclick="editStaff(this)">
        <i class="fas fa-edit"></i> <!-- Update Icon -->
    </button>
    <button class="btn btn-danger btn-sm" onclick="deleteStaff(this)">
        <i class="fas fa-trash-alt"></i> <!-- Delete Icon -->
    </button>
`;


    // Clear form inputs after saving
    document.getElementById("staffForm").reset();
}

// Optional editStaff function (for updating staff details in the future)
function editStaff(button) {
    const row = button.closest("tr");
    const cells = row.getElementsByTagName("td");

    document.getElementById("id").value = cells[0].textContent;
    document.getElementById("firstName").value = cells[1].textContent;
    document.getElementById("lastName").value = cells[2].textContent;
    document.getElementById("designation").value = cells[3].textContent;
    document.getElementById("gender").value = cells[4].textContent;
    document.getElementById("role").value = cells[5].textContent;

    // Remove the row (or you could use it to save updated details back)
    row.remove();
}

// Delete a specific staff row
function deleteStaff(button) {
    const row = button.closest("tr");
    row.remove();
}
