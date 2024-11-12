$(document).ready(function () {
     getAllField()
});

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



//$("#btnUpdate").click(function () {
//     let fieldCode = $("#fieldCode").val();
//     let fieldName = $("#fieldName").val();
//     let fieldLocation = $("#fieldLocation").val();
//     let extentSize = $("#extentSize").val();
//     let fieldImage1 = $("#fieldImage1").prop('files')[0];
//     let fieldImage2 = $("#fieldImage2").prop('files')[0];
//
//     var formData = new FormData();
//     formData.append("fieldCode", fieldCode);
//     formData.append("fieldName", fieldName);
//     formData.append("fieldLocation", fieldLocation);
//     formData.append("extentSize", extentSize);
//     formData.append("fieldImage1", fieldImage1);
//     formData.append("fieldImage2", fieldImage2);
//
//     $.ajax({
//         url: "http://localhost:8080/api/v1/field/" + fieldCode,
//         method: 'PATCH',
//         processData: false,
//         contentType: false,
//         data: formData,
//         headers: {"Authorization": "Bearer " + localStorage.getItem("token")},
//         success: function (response) {
//             alert('Field updated successfully!');
//             getAllStaff(); // Refresh the list after updating
//         },
//         error: function(error) {
//             const message = error.responseJSON?.message || "An error occurred!";
//             alert(message);
//         }
//
//     });
// }
//
// $("#btnDelete").click(function () {
//     let fieldCode = $("#fieldCode").val();
//
//     $.ajax({
//         url: "http://localhost:8080/api/v1/field/" + fieldCode,
//         method: 'DELETE',
//         headers: {"Authorization": "Bearer " + localStorage.getItem("token")},
//         success: function (response) {
//             alert('Field deleted successfully!');
//             getAllStaff(); // Refresh the list after deletion
//         },
//         error: function(error) {
//             const message = error.responseJSON?.message || "An error occurred!";
//             alert(message);
//         }
//
//     });
// }
//
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
            <button class="btn btn-info" onclick="populateForm('${field.fieldCode}')">
                <ion-icon name="create-outline"></ion-icon> 
            </button>
            <button class="btn btn-danger" onclick="deleteStaff('${field.fieldCode}')">
                <ion-icon name="trash-outline"></ion-icon> 
            </button>
        </td>
                    </tr>
                `);
            });

            // // SweetAlert success message
            // Swal.fire({
            //     title: 'Data Loaded Successfully!',
            //     text: 'Fields retrieved and table updated.',
            //     icon: 'success',
            //     confirmButtonText: 'OK'
            // });
        },
        error: function(error) {
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

//
// // Function to populate form for editing
// // function populateForm(fieldCode) {
// //     $.ajax({
// //         url: "http://localhost:8080/api/v1/field/" + fieldCode,
// //         method: 'GET',
// //         headers: {"Authorization": "Bearer " + localStorage.getItem("token")},
// //         success: function (field) {
// //             $("#fieldCode").val(field.fieldCode);
// //             $("#fieldName").val(field.fieldName);
// //             $("#fieldLocation").val(field.fieldLocation);
// //             $("#extentSize").val(field.extentSize);
// //         },
// //         error: function (jqXHR) {
// //             alert(jqXHR.responseJSON.message);
// //         }
// //     });
// // }
