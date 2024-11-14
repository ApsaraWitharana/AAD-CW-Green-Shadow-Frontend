$(document).ready(function (){
    lordFieldCodes();
    lordStaffIds();
    getAllEquipment();
})
// =========save===============//
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
                clearFields();
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
//========lord field code=========//
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

//==========lord staff ids =============//
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

// ===========getAll ==========//
function getAllEquipment() {
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
                <button id="btnUpdate" class="btn btn-info" onclick="populateForm('${equipment.id}')">
                    <ion-icon name="create-outline"></ion-icon> 
                </button>
                <button id="btnDelete1" class="btn btn-danger" onclick="deleteField('${equipment.id}')">
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

//========= Click event for the rows in the table ===============//

$("equipmentTableBody>tr").click(function () {
    let row = $(this);
    // Get the data from the clicked row
    let id = row.children.eq.text();
    let name = row.children.eq(1).text();
    let type = row.children.eq(2).text();
    let status = row.children.eq(3).text();
    let fieldCode = row.children.eq(4).text();
    let staffId = row.children.eq(5).text();

    // Set the values in the input fields
    $('#equipmentId').val(id);
    $('#equipmentName').val(name);
    $('#type').val(type);
    $('#status').val(status);
    $('#fieldCode').val(fieldCode);
    $('#staffId').val(staffId);

    $("#btnSave").prop("disabled", true);
});

function populateForm(id){
    $.ajax({
        url: `http://localhost:8080/api/v1/equipment/${id}`,
        type: "GET",
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("token")
        },
        success: function (equipment) {
            $('#equipmentId').val(equipment.id);
            $('#equipmentName').val(equipment.name);
            $('#type').val(equipment.type);
            $('#status').val(equipment.status);
            $('#fieldCode').val(equipment.fieldCode);
            $('#staffId').val(equipment.staffId);

            $("#btnSave").prop("disabled", true);
            $("#btnUpdate").prop("disabled", false);
        },
        error: function (error) {
            console.error("Error fetching crop details:", error.responseJSON?.message || error);
            Swal.fire({
                title: 'Error!',
                text: 'Unable to fetch crop details. Please try again.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    });

}

// ================ Update Button ================ //
$('#btnUpdate').click(function () {
    let id = $('#equipmentId').val();
    let name = $('#equipmentName').val();
    let type = $('#type').val();
    let status = $('#status').val();
    let fieldCode = $('#fieldCode').val();
    let staffId = $('#staffId').val();

    const updatedEquipmentData = {
        id: id,
        name: name,
        type: type,
        status: status,
        fieldCode: fieldCode,
        staffId: staffId
    };

    $.ajax({
        url: `http://localhost:8080/api/v1/equipment/${id}`, // Endpoint for updating
        type: "PATCH",
        contentType: "application/json",
        data: JSON.stringify(updatedEquipmentData),
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("token")
        },
        success: function (resp, textStatus, jqxhr) {
            if (jqxhr.status === 200 || jqxhr.status === 201) {
                Swal.fire({
                    title: 'Success!',
                    text: 'Equipment updated successfully!',
                    icon: 'success',
                    background: 'black',
                    color: 'white',
                    confirmButtonColor: '#d33',
                    cancelButtonColor: '#3085d6',
                    confirmButtonText: 'OK'
                });
                clearFields();
                getAllEquipment();

                // Enable save button and disable update button
                // $("#btnSave").prop("disabled", false);
                // $("#btnUpdate").prop("disabled", true);
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
                text: 'Equipment update failed!',
                icon: 'error',
                background: 'black', // Sets background color to black
                color: 'white',      // Sets text color to white
                confirmButtonColor: '#d33', // Optional: Customize button color
                cancelButtonColor: "#3085d6",
                confirmButtonText: 'OK'
            });
        }
    });
});

// ========== delete Fields==========//
function deleteField(id) {
    // Confirm deletion with the user
    Swal.fire({
        title: 'Are you sure?',
        text: 'You won’t be able to revert this!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!',
        background: 'black',
        color: 'white'
    }).then((result) => {
        if (result.isConfirmed) {
            // Perform the DELETE request
            $.ajax({
                url: `http://localhost:8080/api/v1/equipment/${id}`,
                type: 'DELETE',
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token")
                },
                success: function (response, textStatus, jqxhr) {
                    if (jqxhr.status === 200) {
                        Swal.fire({
                            title: 'Deleted!',
                            text: response || 'Equipment deleted successfully!',
                            icon: 'success',
                            background: 'black',
                            color: 'white',
                            confirmButtonColor: '#d33',
                            confirmButtonText: 'OK'
                        });

                        // Refresh the table or re-fetch the equipment list
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
                        text: xhr.responseText || 'Equipment deletion failed!',
                        icon: 'error',
                        confirmButtonText: 'OK'
                    });
                }
            });
        }
    });
}

// ========== Clear Fields ========== //
function clearFields() {
    $('#equipmentId').val('');
    $('#equipmentName').val('');
    $('#type').val('');
    $('#status').val('');
    $('#fieldCode').val('');
    $('#staffId').val('');
}

