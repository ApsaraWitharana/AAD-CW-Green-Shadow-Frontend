$(document).ready(function (){
    getAllVehicle();
});

function getAllVehicle() {
    $.ajax({
        url: "http://localhost:8080/api/v1/vehicle", // Update with your correct endpoint if needed
        type: "GET",
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("token")
        },
        success: function (response) {
            console.log("Vehicle Data:", response);
            $("#vehicleTable tbody").empty();
            response.forEach(function(vehicle) {
                $("#vehicleTable tbody").append( `
                        <tr>
                            <td>${vehicle.vehicleCode}</td>
                            <td>${vehicle.licensePlateNumber}</td>
                            <td>${vehicle.vehicleCategory}</td>
                            <td>${vehicle.fuelType}</td>
                            <td>${vehicle.status}</td>
                            <td>${vehicle.staffId}</td>
                            <td>${vehicle.remarks}</td>
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
// ================= search bar ====================================//
$('#btnSearch').click(function (){
    searchVehicle();
});
function searchVehicle(){
    let vehicleCategory = $('#search').val();
    $.ajax({
        url: `http://localhost:8080/api/v1/vehicle/search?vehicleCategory=${vehicleCategory}`,
        method: "GET",
        headers: { "Authorization": "Bearer " + localStorage.getItem("token") },
        success: function (vehicleList) {
            let tableBody = $('#vehicleTableBody');
            tableBody.empty(); // Clear the existing table rows

            if (vehicleList.length === 0) {
                Swal.fire({
                    title: 'No Results',
                    text: 'No staff members found with the given name.',
                    icon: 'info',
                    confirmButtonText: 'OK'
                });
                return;
            }
            vehicleList.forEach(vehicle => {
                let row = `<tr>
                    <td>${vehicle.vehicleCode}</td>
                    <td>${vehicle.licensePlateNumber}</td>
                    <td>${vehicle.vehicleCategory}</td>
                    <td>${vehicle.type}</td>
                    <td>${vehicle.status}</td>
                    <td>${vehicle.staffId}</td>
                    <td>${vehicle.remarks}</td>
                </tr>`;
                tableBody.append(row);
            });
        },
        error: function (xhr, status, error) {
            Swal.fire({
                title: 'Error!',
                text: 'Unable to search for staff members.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    });

}