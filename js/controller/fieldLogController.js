$(document).ready(function () {
    loadFieldIds();
    loadCropIds();
    // Push data to table


    $('#btnAdd').click(function () {
        // Collect form data
        const formData = {
            logCode: $("#logCode1").val(),
            cropCode: $("#cropCode").val(),
            logDetails: $("#logDetails1").val(),
            logDate: $("#date").val(),
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
                appendToTable(formData);
            },
            error: function (xhr) {
                // Handle errors
                alert(`Error: ${xhr.responseText}`);
            },
        });
    });


    // Function to append data to the table
    function appendToTable(data) {
        const row = `
            <tr>
                <td>${data.logCode}</td>
                <td>${data.cropCode}</td>
                <td>${data.logDetails}</td>
                <td>${data.logDate}</td>
                <td>${data.observedImage}</td>
                <td>${data.fieldLogDetailsDTOS[0].fieldCode}</td>
                <td>${data.fieldLogDetailsDTOS[0].description}</td>
                <td>${data.fieldLogDetailsDTOS[0].workFieldsCount}</td>
                <td>${data.logDate}</td>
            </tr>`;
        $("#logTable tbody").append(row);
    }
});

//=================== lord field ids==================//
function loadFieldIds(){
    $.ajax({
        url: "http://localhost:8080/api/v1/field", // Correct endpoint for all fields
        type: "GET",
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("token")
        },
        success: function(response) {
            $("#fieldCode").empty();
            $("#fieldCode").append('<option value="">Select Field Code</option>');

            response.forEach(field => {
                $("#fieldCode").append(`<option value="${field.fieldCode}">${field.fieldCode}</option>`);
            });

            alert("Field codes loaded successfully!");
        },
        error: function(xhr) {
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
        success: function(response) {
            $("#cropCode").empty();
            $("#cropCode").append('<option value="">Select Crop Code</option>');

            response.forEach(crop => {
                $("#cropCode").append(`<option value="${crop.cropCode}">${crop.cropCode}</option>`);
            });

            alert("Crop codes loaded successfully!");
        },
        error: function(xhr) {
            alert("Error loading field codes: " + xhr.status);
        }
    });
}