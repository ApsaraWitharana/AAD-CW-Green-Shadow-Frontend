$(document).ready(function () {
    // Uncomment the line below if you want to load all staff data on page load
    // getAllStaff();
    gatherStaffData()
});

function gatherStaffData() {
    return {
        id: $('#id').val(),
        firstName: $('#firstName').val(),
        lastName: $('#lastName').val(),
        designation: $('#designation').val(),
        gender: $('#gender').val(),
        joinedDate: $('#joinedDate').val(),
        dob: $('#dob').val(),
        contactNo: $('#contactNo').val(),
        addressLine1: $('#addressLine1').val(),
        addressLine2: $('#addressLine2').val(),
        addressLine3: $('#addressLine3').val(),
        addressLine4: $('#addressLine4').val(),
        addressLine5: $('#addressLine5').val(),
        email: $('#email').val(),
        role: $('#role').val()
    };
}

$('#btnSave').click(function () {
    saveStaff();
});

$('#btnUpdate').click(function () {
    updateStaff();
});

$('#btnDelete').click(function () {
    deleteStaff();
});

$('#btnSearch').click(function () {
    searchStaff();
});

function saveStaff() {
    let staffObj = gatherStaffData();
    let jsonObj = JSON.stringify(staffObj);

    $.ajax({
        url: "http://localhost:8080/api/v1/staff",
        method: "POST",
        contentType: "application/json",
        data: jsonObj,
        headers: { "Authorization": "Bearer " + localStorage.getItem("token") },
        success: function (resp, textStatus, jqxhr) {
            if (jqxhr.status === 204) {
                Swal.fire({
                    title: 'Success!',
                    text: 'Staff saved successfully!',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
                //getAllStaff(); // Refresh the table
            }
        },
        error: function (xhr) {
            console.error("Error Response: ", xhr.responseText);
            Swal.fire({
                title: 'Error!',
                text: `Error ${xhr.status}: ${xhr.responseText}`,
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }

    });
}

function updateStaff() {
    let staffObj = gatherStaffData();
    let jsonObj = JSON.stringify(staffObj);

    $.ajax({
        url: `http://localhost:8080/api/v1/staff/${staffObj.id}`,
        method: "PUT",
        contentType: "application/json",
        data: jsonObj,
        headers: { "Authorization": "Bearer " + localStorage.getItem("token") },
        success: function () {
            Swal.fire({
                title: 'Success!',
                text: 'Staff updated successfully!',
                icon: 'success',
                confirmButtonText: 'OK'
            });
            getAllStaff(); // Refresh the table
        },
        error: function (xhr, status, error) {
            Swal.fire({
                title: 'Error!',
                text: 'Could not update staff data. Please try again.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    });
}

function deleteStaff() {
    let id = $('#id').val();

    $.ajax({
        url: `http://localhost:8080/api/v1/staff/${id}`,
        method: "DELETE",
        headers: { "Authorization": "Bearer " + localStorage.getItem("token") },
        success: function () {
            Swal.fire({
                title: 'Success!',
                text: 'Staff deleted successfully!',
                icon: 'success',
                confirmButtonText: 'OK'
            });
            getAllStaff(); // Refresh the table
        },
        error: function (xhr, status, error) {
            Swal.fire({
                title: 'Error!',
                text: 'Could not delete staff. Please try again.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    });
}

function getAllStaff() {
    $.ajax({
        url: "http://localhost:8080/api/v1/staff",
        method: "GET",
        headers: { "Authorization": "Bearer " + localStorage.getItem("token") },
        success: function (data) {
            $('#staffTable tbody').empty(); // Clear existing table rows if there are any
            data.forEach(staff => {
                let row = `<tr>
                                <td>${staff.id}</td>
                                <td>${staff.firstName}</td>
                                <td>${staff.lastName}</td>
                                <td>${staff.designation}</td>
                                <td>${staff.gender}</td>
                                <td>${staff.joinedDate}</td>
                                <td>${staff.dob}</td>
                                <td>${staff.contactNo}</td>
                                <td>${staff.email}</td>
                                <td>${staff.role}</td>
                           </tr>`;
                $('#staffTable tbody').append(row);
            });
        },
        error: function (xhr, status, error) {
            Swal.fire({
                title: 'Error!',
                text: 'Could not load staff data. Please try again.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    });
}

function searchStaff() {
    let id = $('#id').val();

    $.ajax({
        url: `http://localhost:8080/api/v1/staff/${id}`,
        method: "GET",
        headers: { "Authorization": "Bearer " + localStorage.getItem("token") },
        success: function (staff) {
            // Populate the form fields with the retrieved data
            $('#firstName').val(staff.firstName);
            $('#lastName').val(staff.lastName);
            $('#designation').val(staff.designation);
            $('#gender').val(staff.gender);
            $('#joinedDate').val(staff.joinedDate);
            $('#dob').val(staff.dob);
            $('#addressLine1').val(staff.addressLine1);
            $('#addressLine2').val(staff.addressLine2);
            $('#addressLine3').val(staff.addressLine3);
            $('#addressLine4').val(staff.addressLine4);
            $('#addressLine5').val(staff.addressLine5);
            $('#contactNo').val(staff.contactNo);
            $('#email').val(staff.email);
            $('#role').val(staff.role);
        },
        error: function (xhr, status, error) {
            Swal.fire({
                title: 'Error!',
                text: 'Staff member not found.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    });
}

