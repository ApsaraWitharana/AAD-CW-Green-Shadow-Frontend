$(document).ready(function () {
    getAllStaff();
});

function getAllStaff(){
    $.ajax({
        url: "http://localhost:8080/api/v1/staff",
        method: "GET",
        headers: { "Authorization": "Bearer " + localStorage.getItem("token") },
        success: function (response) {
            console.log("Staff data:",response);
            $('#staffTable tbody').empty();

            response.forEach( function (staff)  {
                $('#staffTable tbody').append(`
                      <tr>
                                <td>${staff.id}</td>
                                <td>${staff.firstName}</td>
                                <td>${staff.lastName}</td>
                                <td>${staff.designation}</td>
                                <td>${staff.gender}</td>
                                <td>${staff.dob}</td>
                                <td>${staff.contactNo}</td>
                                <td>${staff.email}</td>
                                <td>${staff.role}</td>
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

$('#btnSearchStaff').click(function () {
    searchStaff();
});

function searchStaff() {
    let firstName = $('#search').val();
    $.ajax({
        url: `http://localhost:8080/api/v1/staff/search?firstName=${firstName}`,
        method: "GET",
        headers: { "Authorization": "Bearer " + localStorage.getItem("token") },
        success: function (staffList) {
            let tableBody = $('#staffTableBody');
            tableBody.empty(); // Clear the existing table rows
            if (staffList.length === 0) {
                Swal.fire({
                    title: 'No Results',
                    text: 'No staff members found with the given name.',
                    icon: 'info',
                    confirmButtonText: 'OK'
                });
                return;
            }

            staffList.forEach(staff => {
                let row = `<tr>
                    <td>${staff.id}</td>
                    <td>${staff.firstName}</td>
                    <td>${staff.lastName}</td>
                    <td>${staff.designation}</td>
                    <td>${staff.gender}</td>
                    <td>${staff.joinedDate}</td>
                    <td>${staff.contactNo}</td>
                    <td>${staff.email}</td>
                    <td>${staff.role}</td>
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