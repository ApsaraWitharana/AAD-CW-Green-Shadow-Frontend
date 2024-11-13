
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

//     // Actions cell with Update and Delete icons
//     const actionsCell = newRow.insertCell(6);
//     actionsCell.innerHTML = `
//     <button class="btn btn-info btn-sm me-2" onclick="editStaff(this)">
//         <i class="fas fa-edit"></i> <!-- Update Icon -->
//     </button>
//     <button class="btn btn-danger btn-sm" onclick="deleteStaff(this)">
//         <i class="fas fa-trash-alt"></i> <!-- Delete Icon -->
//     </button>
// `;



