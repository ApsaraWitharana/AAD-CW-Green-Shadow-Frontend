$(document).ready(function (){
    lordFieldCodes();
    lordStaffIds();
    getAllEquipment();
    fetchNextEquipmentCode();
})

function fetchNextEquipmentCode() {
    const token = localStorage.getItem("token");
    if (token) {
        $.ajax({
            url: "http://localhost:8080/api/v1/equipment/nextEquipment",
            type: "GET",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
            success: function (res) {
                console.log("Equipment Code:", res);
                // Verify the API response
                if (res) {
                    document.getElementById("equipmentId").value = res;
                    document.getElementById("equipmentId").readOnly = true;
                } else {
                    console.error("Empty response from API");
                }
            },
            error: function (err) {
                console.error('Failed to fetch next Equipment id:', err);
                const errorDiv = document.querySelector('.errorMassageId');
                errorDiv.style.display = "block";
                errorDiv.textContent = "Failed to fetch Equipment id. Please try again.";
            }
        });
    } else {
        console.error("Token is not available in localStorage.");
    }
}
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
                <button id="btnDelete1" class="btn btn-danger" onclick="deleteEquipment('${equipment.id}')">
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
                $("#btnSave").prop("disabled", false);
                $("#btnUpdate").prop("disabled", true);
                $("#btnDelete").prop("disabled", false);
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
                background: 'black',
                color: 'white',
                confirmButtonColor: '#d33',
                cancelButtonColor: "#3085d6",
                confirmButtonText: 'OK'
            });
        }
    });
});

// ========== delete Fields==========//
function deleteEquipment(id) {
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
                method: 'DELETE',
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
$('#btnSearch').click(function (){
    searchEquipment();
})
function searchEquipment(){
    let name = $('#search').val();
    $.ajax({
        url: `http://localhost:8080/api/v1/equipment/search?name=${name}`,
        method: "GET",
        headers: { "Authorization": "Bearer " + localStorage.getItem("token") },
        success: function (equipmentList) {
            let tableBody = $('#equipmentTableBody');
            tableBody.empty(); // Clear the existing table rows

            if (equipmentList.length === 0) {
                Swal.fire({
                    title: 'No Results',
                    text: 'No equipment  found with the given name.',
                    icon: 'info',
                    confirmButtonText: 'OK'
                });
                return;
            }

            equipmentList.forEach(equipment => {
                let row = `<tr>
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
                <button id="btnDelete1" class="btn btn-danger" onclick="deleteEquipment('${equipment.id}')">
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
                text: 'Unable to search for equipments.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    });

}
//================================= set pdf ===========================//
document.getElementById("downloadPDF").addEventListener("click", function () {
    const { jsPDF } = window.jspdf; // Get the jsPDF library
    const doc = new jsPDF(); // Create a new PDF instance
    const pageWidth = doc.internal.pageSize.width;
    const pageHeight = doc.internal.pageSize.height;

    // Set background color to black
    doc.setFillColor(255, 255, 255);
    doc.rect(0, 0, pageWidth, pageHeight, "F");

// Get current date and time
    const now = new Date();
    const dateTimeString = now.toLocaleString(); // Format: "MM/DD/YYYY, hh:mm:ss AM/PM"

    // Add a title with white text
    doc.setFontSize(18);
    doc.setTextColor(0,0,0); // White text
    doc.text("Green Shadow Equipment Details Report", pageWidth / 2, 20, { align: "center" });
    doc.setFontSize(10);
    doc.text(`Generated on: ${dateTimeString}`, pageWidth / 2, 28, { align: "center" });

    // Clone the table body and create a temporary table
    const tableBody = document.getElementById("equipmentTableBody").cloneNode(true);
    const tempTable = document.createElement("table");
    tempTable.border = 1;

    // Add the header without the "Actions" column
    const originalHeader = document.querySelector("thead");
    const clonedHeader = originalHeader.cloneNode(true);
    const actionHeader = clonedHeader.querySelector("th:nth-child(8)"); // Adjust index for "Actions"
    if (actionHeader) actionHeader.remove(); // Remove "Actions" column
    tempTable.appendChild(clonedHeader);

    // Add rows without the "Actions" column and process images
    const rows = tableBody.querySelectorAll("tr");
    rows.forEach((row) => {
        const clonedRow = row.cloneNode(true);
        const actionCell = clonedRow.querySelector("td:nth-child(7)"); // Adjust index for "Actions"
        if (actionCell) actionCell.remove(); // Remove the cell

        tempTable.appendChild(clonedRow);
    });

    // Use jsPDF AutoTable to add the filtered table
    doc.autoTable({
        html: '#equipmentTable', // Reference the table
        startY: 30, // Start after the title
        theme: 'grid', // Grid theme
        styles: {
            fontSize: 10, // Font size
            textColor: [0, 0, 0], // Text color
        },
        headStyles: {
            fillColor: [0, 128, 0], // Green header
            textColor: [255, 255, 255], // White text
        },
        bodyStyles: {
            fillColor: [245, 245, 245], // Light gray
        },
        alternateRowStyles: {
            fillColor: [230, 230, 230], // Slightly darker gray
        },
        columnStyles: {
            7: { cellWidth: 0 }, // Restrict the "Actions" column width
        },
        didParseCell: function (data) {
            if (data.column.index === 7) {
                // Remove "Actions" column content
                data.cell.text = '';
            }
        },
    });


    // Add a footer with centered text and shadow effect
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(10);
        doc.setTextColor(0, 255, 0);
        doc.setDrawColor(0, 255, 0);
        doc.setFont("helvetica", "bold");
        const footerText = "Green Shadow Designed by @Sachini Apsara 2024";
        doc.text(footerText, pageWidth / 2, pageHeight - 10, { align: "center" });
    }

    // Save the PDF
    doc.save("Equipment_Details_Report.pdf");
});
