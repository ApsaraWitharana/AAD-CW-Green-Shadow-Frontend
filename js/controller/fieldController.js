$(document).ready(function () {
     getAllField()
});
//========save button set ajax===========//
$("#btnSave").click(function () {
    // Collect form data
    let fieldCode = $("#fieldCode").val();
    let fieldName = $("#fieldName").val();
    let fieldLocation = $("#fieldLocation").val();
    let extentSize = $("#extentSize").val();
    let fieldImage1 = $("#fieldImage1").prop('files')[0];
    let fieldImage2 = $("#fieldImage2").prop('files')[0];

    // Create FormData object
    var formData = new FormData();
    formData.append("fieldCode", fieldCode);
    formData.append("fieldName", fieldName);
    formData.append("fieldLocation", fieldLocation);
    formData.append("extentSize", extentSize);
    formData.append("fieldImage1", fieldImage1);
    formData.append("fieldImage2", fieldImage2);

    // AJAX request to the backend
    $.ajax({
        url: "http://localhost:8080/api/v1/field",
        method: 'POST',  // Make sure POST is in uppercase
        processData: false,
        contentType: false,
        data: formData,
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("token")
        },
        success: function (resp, textStatus, jqxhr) {
            // You can check for status code 200 (OK) or other success codes
            if (jqxhr.status === 200 || jqxhr.status === 201) {
                Swal.fire({
                    title: 'Success!',
                    text: 'Field saved successfully!',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
                getAllField()
            } else {
                Swal.fire({
                    title: 'Unexpected Status Code',
                    text: 'Received status code: ' + jqxhr.status,
                    icon: 'warning',
                    confirmButtonText: 'OK'
                });
            }
        },
        error: function (xhr, status, error) {
            console.error("Error Response: ", xhr.responseText);
            Swal.fire({
                title: 'Error!',
                text: 'Field saved Unsuccessfully!',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    });
});

//======== click row set table data to input field===========//
$("#fieldTableBody>tr").click(function () {
    let row = $(this);

    let fieldCode = row.children().eq(0).text();
    let fieldName = row.children().eq(1).text();
    let fieldLocation = row.children().eq(2).text();
    let extentSize = row.children().eq(3).text();

    // Set form fields with row data
    $("#fieldCode").val(fieldCode);
    $("#fieldName").val(fieldName);
    $("#fieldLocation").val(fieldLocation);
    $("#extentSize").val(extentSize);

    // Enable update and delete buttons
    $("#btnSave").prop("disabled", true);
});

//=======get id ========
function populateForm(fieldCode) {
    // AJAX call to fetch field data by ID
    $.ajax({
        url: `http://localhost:8080/api/v1/field/${fieldCode}`,
        method: 'GET',
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("token")
        },
        success: function (field) {
            // Populate form fields with the retrieved data
            $("#fieldCode").val(field.fieldCode).prop('disabled', true); // Disable fieldCode editing
            $("#fieldName").val(field.fieldName);
            $("#fieldLocation").val(field.fieldLocation);
            $("#extentSize").val(field.extentSize);
        },
        error: function (error) {
            Swal.fire({
                title: 'Error!',
                text: 'Failed to fetch field details!',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    });
}

//=======update button ajax=========//

$("#btnUpdate").click(function () {
    // Collect form data
    let fieldCode = $("#fieldCode").val();
    let updateFieldName = $("#fieldName").val();
    let updateFieldLocation = $("#fieldLocation").val();
    let updateExtentSize = $("#extentSize").val();
    let updateFieldImage1 = $("#fieldImage1").prop('files')[0];
    let updateFieldImage2 = $("#fieldImage2").prop('files')[0];

    // Create FormData object
    var formData = new FormData();
    formData.append("updateFieldName", updateFieldName);
    formData.append("updateFieldLocation", updateFieldLocation);
    formData.append("updateExtentSize", updateExtentSize);
    formData.append("updateFieldImage1", updateFieldImage1);
    formData.append("updateFieldImage2", updateFieldImage2);
    formData.append("fieldCode", fieldCode);

    // AJAX request to the backend
    $.ajax({
        url: `http://localhost:8080/api/v1/field/${fieldCode}`,
        method: 'PATCH',  // Use PATCH for updating the field
        processData: false,
        contentType: false,
        data: formData,
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("token")
        },
        success: function (resp, textStatus, jqxhr) {
            if (jqxhr.status === 200 || jqxhr.status === 201) {
                Swal.fire({
                    title: 'Success!',
                    text: 'Field updated successfully!',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
                // You can call a function to reload the table or data if needed
                getAllField();
            } else {
                Swal.fire({
                    title: 'Unexpected Status Code',
                    text: 'Received status code: ' + jqxhr.status,
                    icon: 'warning',
                    confirmButtonText: 'OK'
                });
            }
        },
        error: function (xhr, status, error) {
            console.error("Error Response: ", xhr.responseText);
            Swal.fire({
                title: 'Error!',
                text: 'Field update failed!',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    });
});

// $('#btnDelete1').click(function () {
//     let fieldCode = $("#fieldCode").val();
//     Swal.fire({
//         title: 'Are you sure?',
//         text: "You won't be able to revert this!",
//         icon: 'warning',
//         showCancelButton: true,
//         confirmButtonColor: '#d33',
//         cancelButtonColor: '#3085d6',
//         confirmButtonText: 'Yes, delete it!'
//     }).then((result) => {
//         if (result.isConfirmed) {
//             // Proceed with AJAX to delete the field
//             $.ajax({
//                 url: `http://localhost:8080/api/v1/field/${fieldCode}`,
//                 method: 'DELETE',
//                 contentType: 'application/json',
//                 headers: {
//                     "Authorization": "Bearer " + localStorage.getItem("token")
//                 },
//                 success: function (response) {
//                     Swal.fire(
//                         'Deleted!',
//                         'Field has been deleted.',
//                         'success'
//                     );
//                     getAllField();
//                 },
//                 error: function (jqXHR, textStatus, errorThrown) {
//                     Swal.fire(
//                         'Error!',
//                         jqXHR.responseJSON?.message || 'Failed to delete the field.',
//                         'error'
//                     );
//                     console.error(jqXHR);
//                 }
//             });
//         }
//     });
// });

//=========delete function ajax===========//
function deleteField(fieldCode) {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                url: `http://localhost:8080/api/v1/field/${fieldCode}`,
                method: 'DELETE',
                contentType: 'application/json',
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token")
                },
                success: function (response) {
                    Swal.fire(
                        'Deleted!',
                        'Field has been deleted.',
                        'success'
                    );
                    getAllField(); // Refresh the table with updated data
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    Swal.fire(
                        'Error!',
                        jqXHR.responseJSON?.message || 'Failed to delete the field.',
                        'error'
                    );
                    console.error(jqXHR);
                }
            });
        }
    });
}
  //===========get all function ajax =============//
        function getAllField() {
            $.ajax({
                url: "http://localhost:8080/api/v1/field",
                method: 'GET',
                headers: {"Authorization": "Bearer " + localStorage.getItem("token")},
                success: function (response) {
                    // Clear existing table rows
                    $("#fieldTable tbody").empty();

                    // Populate table with response data
                    response.forEach(function (field) {
                        $("#fieldTable tbody").append(`
                    <tr>
                        <td>${field.fieldCode}</td>
                        <td>${field.fieldName}</td>
                        <td>${field.fieldLocation}</td>
                        <td>${field.extentSize}</td>
                       <td>
            <button id="btnUpdate" class="btn btn-info" onclick="populateForm('${field.fieldCode}')">
                <ion-icon name="create-outline"></ion-icon> 
            </button>
            <button id="btnDelete1" class="btn btn-danger" onclick="deleteField('${field.fieldCode}')">
              <ion-icon name="trash-outline"></ion-icon>
           </button>
        </td>
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



//Function to populate form for editing
function populateForm(fieldCode) {
    $.ajax({
        url: "http://localhost:8080/api/v1/field/" + fieldCode,
        method: 'GET',
        headers: {"Authorization": "Bearer " + localStorage.getItem("token")},
        success: function (field) {
            $("#fieldCode").val(field.fieldCode);
            $("#fieldName").val(field.fieldName);
            $("#fieldLocation").val(field.fieldLocation);
            $("#extentSize").val(field.extentSize);
        },
        error: function (jqXHR) {
            alert(jqXHR.responseJSON.message);
        }
    });
}

//==================search name==============//
$.ajax({
    url: `http://localhost:8080/api/v1/field/search?name=${fileName}`,
    method: 'GET',
    headers: {
        "Authorization": "Bearer " + localStorage.getItem("token")
    },
    success: function(response) {
        // Clear the previous table data
        $("#fieldTableBody").empty();

        // Check if no results were returned
        if (response.length === 0) {
            Swal.fire({
                title: 'No Results!',
                text: 'No fields found with that name.',
                icon: 'info',
                confirmButtonText: 'OK'
            });
        } else {

            response.forEach(function(field) {
                $("#fieldTableBody").append(`
                    <tr>
                        <td>${field.fieldCode}</td>
                        <td>${field.fieldName}</td>
                        <td>${field.fieldLocation}</td>
                        <td>${field.extentSize}</td>
                        <td>
                            <button class="btn btn-info" onclick="populateForm('${field.fieldCode}')">
                                <ion-icon name="create-outline"></ion-icon> 
                            </button>
                            <button class="btn btn-danger" onclick="deleteField('${field.fieldCode}')">
                                <ion-icon name="trash-outline"></ion-icon> 
                            </button>
                        </td>
                    </tr>
                `);
            });
        }
    },
    error: function(jqXHR, textStatus, errorThrown) {
        Swal.fire({
            title: 'Error!',
            text: jqXHR.responseJSON?.message || 'Failed to fetch field data.',
            icon: 'error',
            confirmButtonText: 'OK'
        });
        console.error(jqXHR);
    }
});
