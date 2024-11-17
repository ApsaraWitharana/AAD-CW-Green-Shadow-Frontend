$(document).ready(function () {
     getAllField();
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
                    text: 'Field Save Successfully!!',
                    icon: 'success',
                    background: 'black',
                    color: 'white',
                    confirmButtonColor: '#d33',
                    cancelButtonColor: '#3085d6'
                });
                clearFields();
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
                    text: 'Field update successfully!',
                    icon: 'success',
                    background: 'black',
                    color: 'white',
                    confirmButtonColor: '#d33',
                    cancelButtonColor: '#3085d6'
                });
                clearFields();
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
        background: "black",
        color: "white",
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!',
        customClass: {
            confirmButton: 'custom-confirm-button',
            cancelButton: 'custom-cancel-button'
        }
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
                    Swal.fire({
                        title: 'Deleted!',
                        text: 'Field has been deleted.',
                        icon: 'success',
                        background: 'black',
                        color: 'white',
                        confirmButtonColor: '#d33',
                        cancelButtonColor: '#3085d6'
                    });
                    getAllField();
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
                     <td><img src="data:image/jpeg;base64,${field.fieldImage1}" alt="Field Image1" width="50" height="50"/></td>
                    <td><img src="data:image/jpeg;base64,${field.fieldImage2}" alt="Field Image2" width="50" height="50"/></td>
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
                    <td><img src="data:image/jpeg;base64,${field.fieldImage1}" alt="Field Image1" width="50" height="50"/></td>
                    <td><img src="data:image/jpeg;base64,${field.fieldImage2}" alt="Field Image2" width="50" height="50"/></td>
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


//===================image preview =================//
const cropImageInput = document.getElementById('fieldImage2');
const cropImagePreview = document.getElementById('cropImagePreview');

cropImageInput.addEventListener('change', function (event) {
    const file = event.target.files[0]; // Get the selected file
    if (file) {
        const reader = new FileReader();

        reader.onload = function (e) {
            // Display the selected image in the preview container
            cropImagePreview.innerHTML = `<img src="${e.target.result}" alt="Selected Image">`;
        };

        reader.readAsDataURL(file); // Convert the image file to Base64 URL
    } else {
        cropImagePreview.innerHTML = "No Image Selected";
    }
});

//===========clier field==========//
function clearFields(){
    $("#fieldCode").val("");
    $("#fieldName").val("");
    $("#fieldLocation").val("");
    $("#extentSize").val("");
    $("#fieldImage1").val("");
    $("#fieldImage2").val("");
}

// ======================== search =================//

$('btnSearch').click(function (){
    searchField();
});

function searchField() {
    let fieldName = $('#search').val();
    $.ajax({
        url: `http://localhost:8080/api/v1/field/search?fieldName=${fieldName}`,
        method: "GET",
        headers: {"Authorization": "Bearer " + localStorage.getItem("token")},
        success: function (fieldList) {
            let tableBody = $('#fieldTableBody');
            tableBody.empty();

            if (fieldList.length === 0) {
                Swal.fire({
                    title: 'No Results',
                    text: 'No field  found with the given name.',
                    icon: 'info',
                    confirmButtonText: 'OK'
                });
                return;
            }
            fieldList.forEach(field => {
                let row = `<tr>
                  <td>${field.fieldCode}</td>
                        <td>${field.fieldName}</td>
                        <td>${field.fieldLocation}</td>
                        <td>${field.extentSize}</td>
                        <td><img src="data:image/jpeg;base64,${field.fieldImage1}" alt="Field Image1" width="50" height="50"/></td>
                    <td><img src="data:image/jpeg;base64,${field.fieldImage2}" alt="Field Image2" width="50" height="50"/></td>
                        <td>
                            <button class="btn btn-info" onclick="populateForm('${field.fieldCode}')">
                                <ion-icon name="create-outline"></ion-icon> 
                            </button>
                            <button class="btn btn-danger" onclick="deleteField('${field.fieldCode}')">
                                <ion-icon name="trash-outline"></ion-icon> 
                            </button>
                        </td>
                </tr>`;
                tableBody.append(row);
            });
        },
        error: function (xhr, status, error) {
            Swal.fire({
                title: 'Error!',
                text: 'Unable to search for crops.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    });
}