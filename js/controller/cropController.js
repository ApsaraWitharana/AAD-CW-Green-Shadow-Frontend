
$(document).ready(function (){
    getAllCrop();
    loadFieldIds()

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
                    confirmButtonText: 'OK'
                });
                getAllCrop()
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
                            <button class="btn btn-info" onclick="populateForm('${crop.cropCode}')">
                                <ion-icon name="create-outline"></ion-icon>
                            </button>
                            <button class="btn btn-danger" onclick="deleteField('${crop.cropCode}')">
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
