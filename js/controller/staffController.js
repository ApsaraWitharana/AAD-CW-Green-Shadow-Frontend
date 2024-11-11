$(document).ready(function () {
    // Uncomment the line below if you want to load all staff data on page load
    // getAllStaff();
});

$('#btnSave').click(function () {
    let id = $('#id').val();
    let firstName = $('#firstName').val();
    let lastName = $('#lastName').val();
    let designation = $('#designation').val();
    let gender = $('#gender').val();
    let joinedDate = $('#joinedDate').val();
    let dob = $('#dob').val();
    let addressLine1 = $('#addressLine1').val();
    let addressLine2 = $('#addressLine2').val();
    let addressLine3 = $('#addressLine3').val();
    let addressLine4 = $('#addressLine4').val();
    let addressLine5 = $('#addressLine5').val();
    let contactNo = $('#contactNo').val();
    let email = $('#email').val();
    let role = $('#role').val();

    let custObj = {
        id: id,
        firstName: firstName,
        lastName: lastName,
        designation: designation,
        gender: gender,
        joinedDate: joinedDate,
        dob: dob,
        addressLine1: addressLine1,
        addressLine2: addressLine2,
        addressLine3: addressLine3,
        addressLine4: addressLine4,
        addressLine5: addressLine5,
        contactNo: contactNo,
        email: email,
        role: role
    };
    let jsonObj = JSON.stringify(custObj);

    $.ajax({
        url: "http://localhost:8080/api/v1/staff",
        method: "POST",
        contentType: "application/json",
        data: jsonObj,
        headers: { "Authorization": "Bearer " + localStorage.getItem("token") },
        success: function (resp, textStatus, jqxhr) {
            console.log(jsonObj)
            if (jqxhr.status === 204) {
                Swal.fire({
                    title: 'Success!',
                    text: 'Staff saved successfully!',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
            }
        },
        error: function (xhr, status, error) {
            console.error("Error: ", error);
            console.log("Status: ", status);
            console.log("XHR Response: ", xhr.responseText);
            Swal.fire({
                title: 'Error!',
                text: 'Could not save staff data. Please try again.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    });
});

function getAllStaff() {
    $.ajax({
        url: "http://localhost:8080/api/v1/staff",
        method: "GET",
        success: function (data) {
            $('#staffTable tbody').empty(); // Clear existing table rows if there are any
            data.forEach(staff => {
                // Create a new row with the staff information
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
                $('#staffTable tbody').append(row); // Append the row to the table body
            });
        },
        error: function (xhr, status, error) {
            console.error("Error retrieving staff data: ", error);
            Swal.fire({
                title: 'Error!',
                text: 'Could not load staff data. Please try again.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    });
}
