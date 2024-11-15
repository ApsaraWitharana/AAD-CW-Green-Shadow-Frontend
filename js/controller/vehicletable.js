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