$(document).ready(function (){
    lordFieldCodes();
    lordStaffIds();
    getAllEquipment();
})

$('#btnSave').click(function (){
    let equipmentId = $('#equipmentId').val();
    let equipmentName = $('#equipmentName').val();
    let type = $('#type').val();
    let status = $('#status').val();
    let fieldCode =$('#fieldCode').val();
    let staffId = $('#staffId').val();

    const equipmentData = {
        id: equipmentId,
        name: equipmentName,
        type: type,
        status: status,
        fieldCode: fieldCode,
        staffId: staffId
    };

    $.ajax({
        url: "http://localhost:8080/api/v1/equipment",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(equipmentData),
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("token")
        },
        success: function (resp, textStatus, jqxhr) {
            if (jqxhr.status === 200 || jqxhr.status === 201) {
                Swal.fire({
                    title: 'Success!',
                    text: 'Equipment saved successfully!',
                    icon: 'success',
                    background: 'black',
                    color: 'white',
                    confirmButtonColor: '#d33',
                    cancelButtonColor: '#3085d6',
                    confirmButtonText: 'OK'
                });
                // clearFields();
                getAllEquipment();
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
                text: 'Equipment saved Unsuccessfully!',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    });
});

function lordFieldCodes() {
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
function lordStaffIds() {
    $.ajax({
        url: "http://localhost:8080/api/v1/staff",
        type: "GET",
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("token")
        },
        success: function(response) {
            console.log("Staff Response:", response);
            $("#staffId").empty();
            $("#staffId").append('<option value="">Select Staff Id</option>');

            if (response && response.length > 0) {
                response.forEach(staff => {
                    console.log("Staff ID:", staff.staffId || staff.id); // Adjust property access
                    $("#staffId").append(`<option value="${staff.id || staff.id}">${staff.id || staff.id}</option>`);
                });
            } else {
                alert("No staff IDs available.");
            }
        },
        error: function(xhr) {
            console.error("Error loading staff IDs:", xhr);
            alert("Error loading staff IDs: " + xhr.status);
        }
    });
}

function getAllEquipment(){
    $.ajax({
        url: "http://localhost:8080/api/v1/equipment",
        method: 'GET',
        headers: {"Authorization": "Bearer " + localStorage.getItem("token")},
        success: function (response) {
            // Clear existing table rows
            $("#equipmentTable tbody").empty();

            // Populate table with response data
            response.forEach(function (equipment) {
                $("#equipmentTable tbody").append(`
        <tr>
            <td>${equipment.id}</td>
            <td>${equipment.name}</td>
            <td>${equipment.type}</td>
            <td>${equipment.status}</td>
            <td>${equipment.fieldCode}</td>
            <td>${equipment.staffId}</td>
            <td>
                <button id="btnUpdate" class="btn btn-info" onclick="populateForm('${equipment.equipmentId}')">
                    <ion-icon name="create-outline"></ion-icon> 
                </button>
                <button id="btnDelete1" class="btn btn-danger" onclick="deleteField('${equipment.equipmentId}')">
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