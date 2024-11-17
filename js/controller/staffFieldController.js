$(document).ready(function (){
    loadLogData();
    loadStaffIds();
    loadFieldIds();
    generateLogCode();
});

// ====================== save staff field details =========================//
$('#btnAdd').click(function () {
    const formData = {
        staff: {
            id: $('#staffId').val(),
            firstName: $('#staffName').val()
        },
        field: {
            fieldCode: $('#fieldCode').val()
        },
        status: $('#status').val(),
        description: $('#description1').val(),
        workStaffCount: parseInt($('#workFieldsCount1').val(), 10),
        date: $('#logDate').val()
    };

    $.ajax({
        url: 'http://localhost:8080/api/v1/staff-field-details/save',
        method: 'POST',
        contentType: 'application/json',
        headers: { "Authorization": "Bearer " + localStorage.getItem("token") },
        data: JSON.stringify(formData),
        success: function (response) {
            alert('Log details saved successfully!');
            console.log('Success:', response);
            loadLogData();
        },
        error: function (xhr, status, error) {
            alert('Failed to save log details!');
            console.error('Error:', error);
        },
    });
});


//================== lord crop ids ==============================//
function loadStaffIds() {
    $.ajax({
        url: "http://localhost:8080/api/v1/staff",
        method: "GET",
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("token")
        },
        success: function (response) {
            // Clear and initialize the dropdown
            $("#staffId").empty();
            $("#staffId").append('<option value="">Select Staff ID</option>');

            // Create a mapping of staff IDs to names
            const staffMap = {};

            // Populate the dropdown and staff map
            response.forEach(staff => {
                $("#staffId").append(`<option value="${staff.id}">${staff.id}</option>`);
                staffMap[staff.id] = staff.firstName;
            });

            // Set up the event to update the name field
            $("#staffId").change(function () {
                const selectedId = $(this).val();
                if (selectedId) {
                    $("#staffName").val(staffMap[selectedId] || "Name not found");
                } else {
                    $("#staffName").val("");
                }
            });

            alert("Staff IDs loaded successfully!");
        },
        error: function (xhr) {
            alert("Error loading staff IDs: " + xhr.status);
        }
    });
}

//===================== lord field ids =================================//
function loadFieldIds() {
    $.ajax({
        url: "http://localhost:8080/api/v1/field",
        method: "GET",
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

// =============== get all =================//

function loadLogData() {
    $.ajax({
        url: "http://localhost:8080/api/v1/staff-field-details/get",
        method: "GET",
        contentType: 'application/json',
        headers: { "Authorization": "Bearer " + localStorage.getItem("token") },
        success: function (response) {
            console.log("Staff Field:", response);
            $("#staffFieldTableBody").empty();
            if (Array.isArray(response)) {
                response.forEach(function (item) {
                    $('#staffFieldTableBody').append(`
                        <tr>
                            <td>${item.staff.id}</td>
                            <td>${item.staff.firstName}</td>
                            <td>${item.status}</td>
                            <td>${item.date}</td>
                            <td>${item.workStaffCount}</td>
                            <td>${item.description}</td>
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

//====================== generate log code ==================================//
function generateLogCode() {
    $.ajax({
        url: "http://localhost:8080/api/v1/staff-field-details/generate-staffField-code", // Endpoint to generate logCode
        method: "GET",
        headers: {"Authorization": "Bearer " + localStorage.getItem("token")},
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
