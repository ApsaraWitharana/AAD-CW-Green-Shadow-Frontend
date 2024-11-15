$(document).ready(function (){
    lordStaffIds();
    getAllVehicle();
})

$('#btnSave').click(function (){
    let vehicleCode = $('#vehicleCode').val();
    let licensePlateNumber =$('#licensePlateNumber').val();
    let vehicleCategory = $('#vehicleCategory').val();
    let fuelType = $('#fuelType').val();
    let status = $('#status').val();
    let staffId = $('#staffId').val();
    let remarks = $('#remarks').val();

    const vehicleData = {
        vehicleCode:vehicleCode,
        licensePlateNumber:licensePlateNumber,
        vehicleCategory:vehicleCategory,
        fuelType:fuelType,
        status:status,
        staffId:staffId,
        remarks:remarks
    };

    $.ajax({
        url: "http://localhost:8080/api/v1/vehicle",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(vehicleData),
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("token")
        },
        success: function (resp, textStatus, jqxhr) {
            if (jqxhr.status === 200 || jqxhr.status === 201) {
                Swal.fire({
                    title: 'Success!',
                    text: 'Vehicle saved successfully!',
                    icon: 'success',
                    background: 'black',
                    color: 'white',
                    confirmButtonColor: '#d33',
                    cancelButtonColor: '#3085d6',
                    confirmButtonText: 'OK'
                });
                clearVehicle();
                getAllVehicle();
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
                text: 'Vehicle saved Unsuccessfully!',
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
                alert("Field codes loaded successfully!");
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


//============ getAllEquipment ======================//
function getAllVehicle() {
    $.ajax({
        url: "http://localhost:8080/api/v1/vehicle", // Update with your correct endpoint if needed
        type: "GET",
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("token")
        },
        success: function (response) {
            console.log("Vehicle Data:", response);
            $("#vehicleTable tbody").empty();


             response.forEach(function(vehicle) {
                 $("#vehicleTable tbody").append( `
                        <tr>
                            <td>${vehicle.vehicleCode}</td>
                            <td>${vehicle.licensePlateNumber}</td>
                            <td>${vehicle.vehicleCategory}</td>
                            <td>${vehicle.fuelType}</td>
                            <td>${vehicle.status}</td>
                            <td>${vehicle.staffId}</td>
                            <td>${vehicle.remarks}</td>
                              <td>
                <button id="btnUpdate" class="btn btn-info" onclick="populateForm('${vehicle.vehicleCode}')">
                    <ion-icon name="create-outline"></ion-icon> 
                </button>
                <button id="btnDelete1" class="btn btn-danger" onclick="deleteVehicle('${vehicle.vehicleCode}')">
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

//================click row table data to input field =====================//
$('#vehicleTableBody>tr').click(function (){
    let row = $(this);
    let vehicleCode = row.children.eq(0).text();
    let licensePlateNumber = row.children.eq(1).text();
    let vehicleCategory = row.children.eq(2).text();
    let fuelType = row.children.eq(3).text();
    let status = row.children.eq(4).text();
    let staffId = row.children.eq(5).text();
    let remarks = row.children.eq(6).text();

// Set form fields with row data
     $('#vehicleCode').val(vehicleCode);
     $('#licensePlateNumber').val(licensePlateNumber);
     $('#vehicleCategory').val(vehicleCategory);
     $('#fuelType').val(fuelType);
     $('#status').val(status);
     $('#staffId').val(staffId);
     $('#remarks').val(remarks);

     $('#btnSave').prop('disabled',true);

});

function populateForm(vehicleCode){
    $.ajax({
        url: `http://localhost:8080/api/v1/vehicle/${vehicleCode}`,
        method: 'GET',
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("token")
        },
        success:function (vehicle){
            $('#vehicleCode').val(vehicle.vehicleCode);
            $('#licensePlateNumber').val(vehicle.licensePlateNumber);
            $('#vehicleCategory').val(vehicle.vehicleCategory);
            $('#fuelType').val(vehicle.fuelType);
            $('#status').val(vehicle.status);
            $('#staffId').val(vehicle.staffId);
            $('#remarks').val(vehicle.remarks);
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

// ==================== update button ======================//
$('#btnUpdate').click(function (){
    let vehicleCode = $('#vehicleCode').val();
    let licensePlateNumber =$('#licensePlateNumber').val();
    let vehicleCategory = $('#vehicleCategory').val();
    let fuelType = $('#fuelType').val();
    let status = $('#status').val();
    let staffId = $('#staffId').val();
    let remarks = $('#remarks').val();

    const updateVehicleData = {
        vehicleCode:vehicleCode,
        licensePlateNumber:licensePlateNumber,
        vehicleCategory:vehicleCategory,
        fuelType:fuelType,
        status:status,
        staffId:staffId,
        remarks:remarks
    };
    $.ajax({
        url: `http://localhost:8080/api/v1/vehicle/${vehicleCode}`,
        type: "PATCH",
        contentType: "application/json",
        data: JSON.stringify(updateVehicleData),
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("token")
        },
        success: function (resp, textStatus, jqxhr) {
            if (jqxhr.status === 200 || jqxhr.status === 201) {
                Swal.fire({
                    title: 'Success!',
                    text: 'Vehicle update successfully!',
                    icon: 'success',
                    background: 'black',
                    color: 'white',
                    confirmButtonColor: '#d33',
                    cancelButtonColor: '#3085d6',
                    confirmButtonText: 'OK'
                });
                clearVehicle();
                getAllVehicle();
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
                text: 'Vehicle update Unsuccessfully!',
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

// ============== delete button =============//

function deleteVehicle(vehicleCode) {
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
                url: `http://localhost:8080/api/v1/vehicle/${vehicleCode}`,
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
                    getAllVehicle()
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

function clearVehicle(){
    $('#vehicleCode').val("");
    $('#licensePlateNumber').val("");
    $('#vehicleCategory').val("");
    $('#fuelType').val("");
    $('#status').val("");
    $('#staffId').val("");
    $('#remarks').val("");
}

// ========================== search ===============//
$('#btnSearch').click(function (){
    searchVehicle();
})
function searchVehicle(){
    let vehicleCategory = $('#search').val();
    $.ajax({
        url: `http://localhost:8080/api/v1/vehicle/search?vehicleCategory=${vehicleCategory}`,
        method: "GET",
        headers: { "Authorization": "Bearer " + localStorage.getItem("token") },
        success: function (vehicleList) {
            let tableBody = $('#vehicleTableBody');
            tableBody.empty(); // Clear the existing table rows

            if (vehicleList.length === 0) {
                Swal.fire({
                    title: 'No Results',
                    text: 'No staff members found with the given name.',
                    icon: 'info',
                    confirmButtonText: 'OK'
                });
                return;
            }
            vehicleList.forEach(vehicle => {
                let row = `<tr>
                    <td>${vehicle.vehicleCode}</td>
                    <td>${vehicle.licensePlateNumber}</td>
                    <td>${vehicle.vehicleCategory}</td>
                    <td>${vehicle.type}</td>
                    <td>${vehicle.status}</td>
                    <td>${vehicle.staffId}</td>
                    <td>${vehicle.remarks}</td>
                    <td>
                <button id="btnUpdate" class="btn btn-info" onclick="populateForm('${vehicle.vehicleCode}')">
                    <ion-icon name="create-outline"></ion-icon> 
                </button>
                <button id="btnDelete1" class="btn btn-danger" onclick="deleteVehicle('${vehicle.vehicleCode}')">
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
                text: 'Unable to search for staff members.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    });

}

//===================== PDF to vehicle details ========================//

document.getElementById("downloadPDF").addEventListener("click", function () {
    const { jsPDF } = window.jspdf; // Get the jsPDF library
    const doc = new jsPDF(); // Create a new PDF instance
    const pageWidth = doc.internal.pageSize.width;
    const pageHeight = doc.internal.pageSize.height;

    // Set background color to black
    doc.setFillColor(0, 0, 0);
    doc.rect(0, 0, pageWidth, pageHeight, "F");

    // Add a title with white text
    doc.setFontSize(18);
    doc.setTextColor(255, 255, 255); // White text
    doc.text("Vehicle Details Report", pageWidth / 2, 20, { align: "center" });

    // Clone the table body and create a temporary table
    const tableBody = document.getElementById("vehicleTableBody").cloneNode(true);
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
        const actionCell = clonedRow.querySelector("td:nth-child(8)"); // Adjust index for "Actions"
        if (actionCell) actionCell.remove(); // Remove the cell

        // Process images: Embed them in the PDF
        const imageCells = clonedRow.querySelectorAll("img");
        imageCells.forEach((img) => {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0, img.width, img.height);
            const dataURL = canvas.toDataURL("image/png");
            const newImg = document.createElement("img");
            newImg.src = dataURL;
            img.replaceWith(newImg);
        });

        tempTable.appendChild(clonedRow);
    });

    // Use jsPDF AutoTable to add the filtered table
    doc.autoTable({
        html: tempTable, // Pass the filtered table
        startY: 30, // Start the table below the title
        theme: 'grid', // Table theme
        styles: {
            fontSize: 10, // Font size for the table
            textColor: [255, 255, 255], // White text for table
        },
        headStyles: {
            fillColor: [0, 128, 0], // Green header background
            textColor: [255, 255, 255], // White header text
        },
        bodyStyles: {
            fillColor: [30, 30, 30], // Dark gray background
        },
        alternateRowStyles: {
            fillColor: [45, 45, 45], // Slightly lighter gray
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
    doc.save("Vehicle_Details_Report.pdf");
});
