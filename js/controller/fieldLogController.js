$(document).ready(function () {
    loadFieldIds();
    loadCropIds();
    getAllFieldLog();
    getAllLog();
    generateLogCode();

    $('#btnAdd').click(function () {
        // Collect form data
        const formData = {
            logCode: $("#logCode1").val(),
            cropCode: $("#cropCode").val(),
            logDetails: $("#logDetails1").val(),
            logDate: $("#logDate").val(),
            observedImage: $("#cropImage").val(),
            fieldLogDetailsDTOS: [
                {
                    field: {
                        fieldCode: $("#fieldCode").val(), // Include as part of the "field" object
                    },
                    description: $("#description1").val(),
                    workFieldsCount: Number($("#workFieldsCount1").val()), // Ensure numeric
                },
            ],
        };
        // Make an AJAX request
        $.ajax({
            url: "http://localhost:8080/api/v1/field-log-details/save",
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify(formData),
            headers: {"Authorization": "Bearer " + localStorage.getItem("token")},
            success: function (response) {
                alert("Log saved successfully!");
                getAllLog();
                getAllFieldLog();

            },
            error: function (xhr) {
                // Handle errors
                alert(`Error: ${xhr.responseText}`);
            },
        });
    });

    function getAllFieldLog() {
        $.ajax({
            url: "http://localhost:8080/api/v1/field-log-details/get",
            method: "GET",
            contentType: "application/json",
            headers: { "Authorization": "Bearer " + localStorage.getItem("token") },
            success: function (response) {
                console.log("Field log:", response);

                // Clear the existing rows in the table
                $('#fieldTable tbody').empty();

                // Ensure the response is an array
                if (Array.isArray(response)) {
                    response.forEach(function (data) {
                        $('#fieldTable tbody').append(`
                        <tr>
                            <td>${data.description}</td>
                            <td>${data.workFieldsCount}</td>
                            <td>${data.logDate}</td>
                        </tr>
                    `);
                    });
                } else {
                    console.error("Invalid response format:", response);
                    Swal.fire({
                        title: 'Error!',
                        text: 'Unexpected response format from server!',
                        icon: 'error',
                        confirmButtonText: 'OK'
                    });
                }
            },
            error: function (error) {
                const message = error.responseJSON?.message || "An error occurred while fetching field logs!";
                Swal.fire({
                    title: 'Error!',
                    text: message,
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
        });
    }


    function getAllLog() {
        $.ajax({
            url: "http://localhost:8080/api/v1/log",
            method: "GET",
            contentType: "application/json",
            headers: {"Authorization": "Bearer " + localStorage.getItem("token")},
            success: function (response) {
                console.log("Field log:", response);

                // Clear the existing rows in the table
                $('#logTable tbody').empty();

                // Ensure the response is an array
                if (Array.isArray(response)) {
                    response.forEach(function (data) {
                        $('#logTable tbody').append(`
                        <tr>
                            <td>${data.logCode}</td>
                            <td>${data.cropCode}</td>
                            <td>${data.logDetails}</td>
                            <td>${data.logDate}</td>
                            <td>${data.observedImage}</td>
                        </tr>
                    `);
                    });
                } else {
                    console.error("Invalid response format:", response);
                    Swal.fire({
                        title: 'Error!',
                        text: 'Unexpected response format from server!',
                        icon: 'error',
                        confirmButtonText: 'OK'
                    });
                }
            },
            error: function (error) {
                const message = error.responseJSON?.message || "An error occurred while fetching field logs!";
                Swal.fire({
                    title: 'Error!',
                    text: message,
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
        });
    }


    // Function to append data to the table
//     function appendToTable(data) {
//         const row = `
//             <tr>
//                 <td>${data.logCode}</td>
//                 <td>${data.cropCode}</td>
//                 <td>${data.logDetails}</td>
//                 <td>${data.logDate}</td>
//                 <td>${data.observedImage}</td>
//                 <td>${data.fieldLogDetailsDTOS[0].fieldCode}</td>
//                 <td>${data.fieldLogDetailsDTOS[0].description}</td>
//                 <td>${data.fieldLogDetailsDTOS[0].workFieldsCount}</td>
//                 <td>${data.logDate}</td>
//             </tr>`;
//         $("#logTable tbody").append(row);
//     }
// });

//=================== lord field ids==================//
    function loadFieldIds() {
        $.ajax({
            url: "http://localhost:8080/api/v1/field", // Correct endpoint for all fields
            type: "GET",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
            success: function (response) {
                $("#fieldCode").empty();
                $("#fieldCode").append('<option value="">Select Field Code</option>');

                response.forEach(field => {
                    $("#fieldCode").append(`<option value="${field.fieldCode}">${field.fieldCode}</option>`);
                });

                alert("Field codes loaded successfully!");
            },
            error: function (xhr) {
                alert("Error loading field codes: " + xhr.status);
            }
        });
    }

//================== lord crop ids ==============================//
    function loadCropIds() {
        $.ajax({
            url: "http://localhost:8080/api/v1/crop",
            type: "GET",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
            success: function (response) {
                $("#cropCode").empty();
                $("#cropCode").append('<option value="">Select Crop Code</option>');

                response.forEach(crop => {
                    $("#cropCode").append(`<option value="${crop.cropCode}">${crop.cropCode}</option>`);
                });

                alert("Crop codes loaded successfully!");
            },
            error: function (xhr) {
                alert("Error loading field codes: " + xhr.status);
            }
        });
    }
})

//======================= generate field logCode =================//
function generateLogCode() {
    $.ajax({
        url: "http://localhost:8080/api/v1/field-log-details/generate-log-code",
        method: "GET",
        headers: { "Authorization": "Bearer " + localStorage.getItem("token") },
        success: function (response) {
            $('#logCode').val(response); // Set the generated logCode
        },
        error: function (error) {
            Swal.fire({
                title: 'Error!',
                text: 'An error occurred while generating log code!',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    });
}



