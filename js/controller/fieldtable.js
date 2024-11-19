$(document).ready(function () {
    getAllField();
});

//===========get all function ajax =============//
function getAllField() {
    $.ajax({
        url: "http://localhost:8080/api/v1/field",
        method: 'GET',
        headers: {"Authorization": "Bearer " + localStorage.getItem("token")},
        success: function (response) {
            // Clear existing table rows
            $("#fieldTable tbody").empty();

            // Populate table with response data
            response.forEach(function (field) {
                $("#fieldTable tbody").append(`
                    <tr>
                        <td>${field.fieldCode}</td>
                        <td>${field.fieldName}</td>
                        <td>${field.fieldLocation}</td>
                        <td>${field.extentSize}</td>
                     <td><img src="data:image/jpeg;base64,${field.fieldImage1}" alt="Field Image1" width="50" height="50"/></td>
                    <td><img src="data:image/jpeg;base64,${field.fieldImage2}" alt="Field Image2" width="50" height="50"/></td>
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
//===================image preview =================//
const cropImageInput = document.getElementById('fieldImage2');
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

// ======================== search =================//
$('#btnSearch').click(function (){
    searchField();
});
function searchField() {
    let fieldName = $('#search').val();
    $.ajax({
        url: `http://localhost:8080/api/v1/field/search?fieldName=${fieldName}`,
        method: "GET",
        headers: {"Authorization": "Bearer " + localStorage.getItem("token")},
        success: function (fieldList) {
            let tableBody = $('#fieldTableBody');
            tableBody.empty();

            if (fieldList.length === 0) {
                Swal.fire({
                    title: 'No Results',
                    text: 'No field  found with the given name.',
                    icon: 'info',
                    confirmButtonText: 'OK'
                });
                return;
            }
            fieldList.forEach(field => {
                let row = `<tr>
                  <td>${field.fieldCode}</td>
                        <td>${field.fieldName}</td>
                        <td>${field.fieldLocation}</td>
                        <td>${field.extentSize}</td>
                        <td><img src="data:image/jpeg;base64,${field.fieldImage1}" alt="Field Image1" width="50" height="50"/></td>
                    <td><img src="data:image/jpeg;base64,${field.fieldImage2}" alt="Field Image2" width="50" height="50"/></td>
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
