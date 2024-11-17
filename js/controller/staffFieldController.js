$(document).ready(function (){
    loadStaffIds();
    loadFieldIds();
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
        work_staff_count: parseInt($('#workFieldsCount1').val(), 10),
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