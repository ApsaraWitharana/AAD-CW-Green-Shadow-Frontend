
$(document).ready(function (){
    getAllCrop();
    loadFieldIds();
    clearFields();

})
$("#btnSave").click(function (){
    let cropCode = $("#cropCode").val();
    let cropCommonName = $("#cropCommonName").val();
    let cropScientificName = $("#cropScientificName").val();
    let cropImage = $("#cropImage").prop('files')[0];
    let category = $("#category").val();
    let cropSeason = $("#cropSeason").val();
    let fileCode = $("#fieldCode").val();

    var formData = new FormData();
    formData.append("cropCode",cropCode);
    formData.append("cropCommonName",cropCommonName);
    formData.append("cropScientificName",cropScientificName);
    formData.append("cropImage",cropImage);
    formData.append("category",category);
    formData.append("cropSeason",cropSeason);
    formData.append("fieldCode",fileCode);


    $.ajax({
        url: "http://localhost:8080/api/v1/crop",
        type: "POST",
        data: formData,
        processData: false,
        contentType: false,
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("token")
        },
        success: function (resp, textStatus, jqxhr) {
            // You can check for status code 200 (OK) or other success codes
            if (jqxhr.status === 200 || jqxhr.status === 201) {
                Swal.fire({
                    title: 'Success!',
                    text: 'Crop saved successfully!',
                    icon: 'success',
                    background: 'black',
                    color: 'white',
                    confirmButtonColor: '#d33',
                    cancelButtonColor: '#3085d6',
                    confirmButtonText: 'OK'
                });
                clearFields();
                getAllCrop();
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

//=============getAll =========================//
function getAllCrop() {
    $.ajax({
        url: "http://localhost:8080/api/v1/crop",
        type: "GET",
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("token")
        },
        success: function(response) {
            $("#cropTable tbody").empty();
            response.forEach(function(crop) {
                // Assuming `crop.cropImage` contains the Base64 image string
                $("#cropTable tbody").append(`
                    <tr>
                        <td>${crop.cropCode}</td>
                        <td>${crop.cropCommonName}</td>
                        <td>${crop.cropScientificName}</td>
                        <td>${crop.category}</td>
                        <td>${crop.cropSeason}</td>
                        <td>${crop.fieldCode}</td>
                        <td><img src="data:image/jpeg;base64,${crop.cropImage}" alt="Crop Image" width="50" height="50"/></td>
                        <td>
                           <button id="btnUpdate" class="btn btn-info" onclick="populateForm('${crop.cropCode}')">
                          <ion-icon name="create-outline"></ion-icon> 
            </button>
            <button  class="btn btn-danger" onclick="deleteCrop('${crop.cropCode}')">
              <ion-icon name="trash-outline"></ion-icon>
           </button>
                        </td>
                    </tr>
                `);
            });
        },
        error: function(error) {
            const message = error.responseJSON?.message || "An error occurred!";
            Swal.fire({
                title: 'Error!',
                text: message,
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    });
}



function loadFieldIds() {
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

//========= Click event for the rows in the table ===============//
$("#cropTableBody>tr").click(function() {
    let row = $(this);

    // Get the data from the clicked row
    let cropCode = row.children().eq(0).text();
    let cropCommonName = row.children().eq(1).text();
    let cropScientificName = row.children().eq(2).text();
    let category = row.children().eq(3).text();
    let cropSeason = row.children().eq(4).text();

    // Set the values in the input fields
    $("#cropCode").val(cropCode);
    $("#cropCommonName").val(cropCommonName);
    $("#cropScientificName").val(cropScientificName);
    $("#category").val(category);
    $("#cropSeason").val(cropSeason);

    $("#btnSave").prop("disabled", true);
});

//======================== Update functionality =========================//
$("#btnUpdate").click(function () {
    let cropCode = $("#cropCode").val();
    let updateCropCommonName = $("#cropCommonName").val();
    let updateCropScientificName = $("#cropScientificName").val();
    let updateCropImage = $("#cropImage").prop('files')[0];
    let updateCategory = $("#category").val();
    let updateCropSeason = $("#cropSeason").val();
    let updateFileCode = $("#fieldCode").val();

    var formData = new FormData();
    formData.append("updateCropCommonName", updateCropCommonName);
    formData.append("updateCropScientificName", updateCropScientificName);
    formData.append("updateCropImage", updateCropImage);
    formData.append("updateCategory", updateCategory);
    formData.append("updateCropSeason", updateCropSeason);
    formData.append("updateFieldCode", updateFileCode);
    formData.append("cropCode", cropCode);

    // Ajax request
    $.ajax({
        url: `http://localhost:8080/api/v1/crop/${cropCode}`,
        type: "PATCH",
        processData: false,
        contentType: false,
        data: formData,
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("token")
        },
        success: function (resp, textStatus, jqxhr) {
            if (jqxhr.status === 200 || jqxhr.status === 201) {
                Swal.fire({
                    title: 'Success!',
                    text: 'Crop update successfully!',
                    icon: 'success',
                    background: 'black',
                    color: 'white',
                    confirmButtonColor: '#d33',
                    cancelButtonColor: '#3085d6'
                });
                clearFields();
                getAllCrop();

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
                text: 'Crop update failed!',
                icon: 'error',
                background: 'black',
                color: 'white',
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6'
            });
        }
    });
});
function populateForm(cropCode) {
    // Make an AJAX call to fetch the crop details using cropCode
    $.ajax({
        url: `http://localhost:8080/api/v1/crop/${cropCode}`,
        type: "GET",
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("token")
        },
        success: function (crop) {
            // Populate the form fields
            $("#cropCode").val(crop.cropCode);
            $("#cropCommonName").val(crop.cropCommonName);
            $("#cropScientificName").val(crop.cropScientificName);
            $("#category").val(crop.category);
            $("#cropSeason").val(crop.cropSeason);
            $("#fieldCode").val(crop.fieldCode);

            // Display the image preview
            if (crop.cropImage) {
                $("#cropImagePreview").attr("src", `data:image/jpeg;base64,${crop.cropImage}`);
            }

            // Disable the "Save" button and enable the "Update" button
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
//=================delete btn==========//
function deleteCrop(cropCode){
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
                url: `http://localhost:8080/api/v1/crop/${cropCode}`,
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

                    //$(`#cropRow-${cropCode}`).remove();
                    getAllCrop();

                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.error("AJAX Error Details:", {
                        status: jqXHR.status,
                        statusText: jqXHR.statusText,
                        responseText: jqXHR.responseText,
                        errorThrown: errorThrown
                    });
                    Swal.fire(
                        'Error!',
                        jqXHR.responseJSON?.message || 'Failed to delete the field.',
                        'error'
                    );
                }

            });
        }
    });
}
//===================image preview =================//
const cropImageInput = document.getElementById('cropImage');
const cropImagePreview = document.getElementById('cropImagePreview');

cropImageInput.addEventListener('change', function (event) {
    const file = event.target.files[0]; // Get the selected file
    if (file) {
        const reader = new FileReader();

        reader.onload = function (e) {
            // Display the selected image in the preview container
            cropImagePreview.innerHTML = `<img src="${e.target.result}" alt="Selected Image">`;
        };

        reader.readAsDataURL(file); // Convert the image file to Base64 URL
    } else {
        cropImagePreview.innerHTML = "No Image Selected";
    }
});
//===================== search ===========================//
$('#btnSearch').click(function (){
    searchCrop();
});
function searchCrop(){
    let cropCommonName = $('#search').val();
    $.ajax({
        url: `http://localhost:8080/api/v1/crop/search?cropCommonName=${cropCommonName}`,
        method: "GET",
        headers: { "Authorization": "Bearer " + localStorage.getItem("token") },
        success:function (cropList) {
            let tableBody = $('#cropTableBody');
            tableBody.empty();

            if (cropList.length === 0) {
                Swal.fire({
                    title: 'No Results',
                    text: 'No crops  found with the given name.',
                    icon: 'info',
                    confirmButtonText: 'OK'
                });
                return;
            }
            cropList.forEach(crop => {
                let row = `<tr>
                  <td>${crop.cropCode}</td>
                        <td>${crop.cropCommonName}</td>
                        <td>${crop.cropScientificName}</td>
                        <td>${crop.category}</td>
                        <td>${crop.cropSeason}</td>
                        <td>${crop.fieldCode}</td>
                        <td><img src="data:image/jpeg;base64,${crop.cropImage}" alt="Crop Image" width="50" height="50"/></td>
                        <td>
                           <button id="btnUpdate" class="btn btn-info" onclick="populateForm('${crop.cropCode}')">
                          <ion-icon name="create-outline"></ion-icon> 
            </button>
            <button  class="btn btn-danger" onclick="deleteCrop('${crop.cropCode}')">
              <ion-icon name="trash-outline"></ion-icon>
           </button>
                </tr>`;
                tableBody.append(row);
            });
        },
        error: function (xhr, status, error) {
            Swal.fire({
                title: 'Error!',
                text: 'Unable to search for crops.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    });
}
//============clear===========//

function clearFields() {
    $("#cropCode").val('');
    $("#cropCommonName").val('');
    $("#cropScientificName").val('');
    $("#cropImage").val('');
    $("#category").val('');
    $("#cropSeason").val('');
    $("#fieldCode").val('');
}

//============================ PDF to crop table ================== //
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
    doc.text("Crop Details Report", pageWidth / 2, 20, { align: "center" });

    // Clone the table body and create a temporary table
    const tableBody = document.getElementById("cropTableBody").cloneNode(true);
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
    doc.save("Crop_Details_Report.pdf");
});
