
$(document).ready(function (){
    getAllCrop();
})


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
