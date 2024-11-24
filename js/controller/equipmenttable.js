$(document).ready(function (){
    getAllEquipment();
})

function getAllEquipment() {
    $.ajax({
        url: "http://localhost:8080/api/v1/equipment",
        method: 'GET',
        headers: {"Authorization": "Bearer " + localStorage.getItem("token")},
        success: function (response) {
            // Clear existing table rows
            $("#equipmentTable tbody").empty();

            // Populate table with response data
            response.forEach(function (equipment) {
                $("#equipmentTable tbody").append(`
        <tr>
            <td>${equipment.id}</td>
            <td>${equipment.name}</td>
            <td>${equipment.type}</td>
            <td>${equipment.status}</td>
            <td>${equipment.fieldCode}</td>
            <td>${equipment.staffId}</td>
            
        </tr>
    `);
            });

        },
        error: function (error) {
            const message = error.responseJSON?.message || "An error occurred!";

            // SweetAlert error message
            Swal.fire({
                title: 'Error!',
                text: message,
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    });
}


// ================================= search bar ========================//

$('#btnSearch').click(function (){
    searchEquipment();
});
function searchEquipment(){
    let name = $('#search').val();
    $.ajax({
        url: `http://localhost:8080/api/v1/equipment/search?name=${name}`,
        method: "GET",
        headers: { "Authorization": "Bearer " + localStorage.getItem("token") },
        success: function (equipmentList) {
            let tableBody = $('#equipmentTableBody');
            tableBody.empty(); // Clear the existing table rows

            if (equipmentList.length === 0) {
                Swal.fire({
                    title: 'No Results',
                    text: 'No equipment  found with the given name.',
                    icon: 'info',
                    confirmButtonText: 'OK'
                });
                return;
            }

            equipmentList.forEach(equipment => {
                let row = `<tr>
                    <td>${equipment.id}</td>
                    <td>${equipment.name}</td>
                    <td>${equipment.type}</td>
                    <td>${equipment.status}</td>
                    <td>${equipment.fieldCode}</td>
                    <td>${equipment.staffId}</td>
                    
                </tr>`;
                tableBody.append(row);
            });
        },
        error: function (xhr, status, error) {
            Swal.fire({
                title: 'Error!',
                text: 'Unable to search for equipments.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    });

}