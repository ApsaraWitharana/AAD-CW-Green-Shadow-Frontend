// Save Button Click
$("#btnSave").click(function () {
    saveStaff();
});

// Update Button Click
$("#btnUpdate").click(function () {
    updateStaff();
});

// Delete Button Click
$("#btnDelete").click(function () {
    deleteStaff();
});

// Load all staff data when the page loads
$(document).ready(function() {
    getAllStaff();
});

function saveStaff() {
    let fieldCode = $("#fieldCode").val();
    let fieldName = $("#fieldName").val();
    let fieldLocation = $("#fieldLocation").val();
    let extentSize = $("#extentSize").val();
    let fieldImage1 = $("#fieldImage1").prop('files')[0];
    let fieldImage2 = $("#fieldImage2").prop('files')[0];

    var formData = new FormData();
    formData.append("fieldCode", fieldCode);
    formData.append("fieldName", fieldName);
    formData.append("fieldLocation", fieldLocation);
    formData.append("extentSize", extentSize);
    formData.append("fieldImage1", fieldImage1);
    formData.append("fieldImage2", fieldImage2);

    $.ajax({
        url: "http://localhost:8080/api/v1/field",
        method: 'POST',
        processData: false,
        contentType: false,
        data: formData,
        headers: {"Authorization": "Bearer " + localStorage.getItem("token")},
        success: function (response) {
            alert('Field saved successfully!');
            getAllStaff(); // Refresh the list after saving
        },
        error: function (jqXHR) {
            alert(jqXHR.responseJSON.message);
        }
    });
}

function updateStaff() {
    let fieldCode = $("#fieldCode").val();
    let fieldName = $("#fieldName").val();
    let fieldLocation = $("#fieldLocation").val();
    let extentSize = $("#extentSize").val();
    let fieldImage1 = $("#fieldImage1").prop('files')[0];
    let fieldImage2 = $("#fieldImage2").prop('files')[0];

    var formData = new FormData();
    formData.append("fieldCode", fieldCode);
    formData.append("fieldName", fieldName);
    formData.append("fieldLocation", fieldLocation);
    formData.append("extentSize", extentSize);
    formData.append("fieldImage1", fieldImage1);
    formData.append("fieldImage2", fieldImage2);

    $.ajax({
        url: "http://localhost:8080/api/v1/field/" + fieldCode,
        method: 'PATCH',
        processData: false,
        contentType: false,
        data: formData,
        headers: {"Authorization": "Bearer " + localStorage.getItem("token")},
        success: function (response) {
            alert('Field updated successfully!');
            getAllStaff(); // Refresh the list after updating
        },
        error: function (jqXHR) {
            alert(jqXHR.responseJSON.message);
        }
    });
}

function deleteStaff() {
    let fieldCode = $("#fieldCode").val();

    $.ajax({
        url: "http://localhost:8080/api/v1/field/" + fieldCode,
        method: 'DELETE',
        headers: {"Authorization": "Bearer " + localStorage.getItem("token")},
        success: function (response) {
            alert('Field deleted successfully!');
            getAllStaff(); // Refresh the list after deletion
        },
        error: function (jqXHR) {
            alert(jqXHR.responseJSON.message);
        }
    });
}

function getAllStaff() {
    $.ajax({
        url: "http://localhost:8080/api/v1/field",
        method: 'GET',
        headers: {"Authorization": "Bearer " + localStorage.getItem("token")},
        success: function (response) {
            // Clear existing table rows
            $("#cropTable tbody").empty();

            // Populate table with response data
            response.forEach(function (field) {
                $("#cropTable tbody").append(`
                    <tr>
                        <td>${field.fieldCode}</td>
                        <td>${field.fieldName}</td>
                        <td>${field.fieldLocation}</td>
                        <td>${field.extentSize}</td>
                        <td><img src="${field.fieldImage1}" alt="Image 1" width="50"></td>
                        <td><img src="${field.fieldImage2}" alt="Image 2" width="50"></td>
                        <td>
                            <button class="btn btn-info" onclick="populateForm('${field.fieldCode}')">Edit</button>
                            <button class="btn btn-danger" onclick="deleteStaff('${field.fieldCode}')">Delete</button>
                        </td>
                    </tr>
                `);
            });
        },
        error: function (jqXHR) {
            alert(jqXHR.responseJSON.message);
        }
    });
}

// Function to populate form for editing
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
