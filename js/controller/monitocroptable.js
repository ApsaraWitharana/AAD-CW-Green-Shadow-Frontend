$(document).ready(function () {
    getAllLogField();

});

//===================image preview =================//
const cropImageInput = document.getElementById('observedImage');
const cropImagePreview = document.getElementById('ImagePreview');

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
// ======================== get all ==============================//

function getAllLogField() {
    $.ajax({
        url: 'http://localhost:8080/api/v1/log',
        type: 'GET',
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("token")
        },
        success: function (data) {
            $('#logTable tbody').empty(); // Clear the table before adding new rows
            data.forEach(log => {
                const row = `
                    <tr>
                        <td>${log.logCode}</td>
                        <td>${log.logDate}</td>
                        <td>${log.logDetails}</td>
                        <td><img src="data:image/jpeg;base64,${log.observedImage}" alt="Observed Image" width="50" height="50"></td>
                        <td>${log.cropCode}</td>
                       
                    </tr>`;
                $('#logTable tbody').append(row);
            });
            setRowClickHandlers();
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

