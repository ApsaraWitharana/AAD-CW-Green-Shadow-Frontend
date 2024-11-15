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
