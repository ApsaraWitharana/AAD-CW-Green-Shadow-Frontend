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
                        <td>${log.cropCode}</td>
                        <td><img src="data:image/jpeg;base64,${log.observedImage}" alt="Observed Image" width="50" height="50"></td>
                        
                       
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


/// ======================= search log =====================//
$('#btnSearch').click(function () {
    searchLog();
});

function searchLog() {
    let logCode = $('#search').val().trim(); // Remove any leading/trailing spaces
    $.ajax({
        url: `http://localhost:8080/api/v1/log/search?logCode=${logCode}`,
        method: "GET",
        headers: { "Authorization": "Bearer " + localStorage.getItem("token") },
        success: function (logList) {
            let tableBody = $('#logTableBody');
            tableBody.empty();

            if (logList.length === 0) {
                Swal.fire({
                    title: 'No Results',
                    text: 'No logs found with the given code.',
                    icon: 'info',
                    confirmButtonText: 'OK'
                });
                return;
            }

            logList.forEach(log => {
                let row = `<tr>
                        <td>${log.logCode}</td>
                        <td>${log.logDate}</td>
                        <td>${log.logDetails}</td>
                        <td>${log.cropCode}</td>
                        <td><img src="data:image/jpeg;base64,${log.observedImage}" alt="Observed Image" width="50" height="50"></td>
                        
                    </tr>`;
                tableBody.append(row);
            });
        },
        error: function (xhr, status, error) {
            if (xhr.status === 404) {
                Swal.fire({
                    title: 'No Results',
                    text: xhr.responseJSON?.message || 'No logs found with the given log code.',
                    icon: 'info',
                    confirmButtonText: 'OK'
                });
            } else {
                Swal.fire({
                    title: 'Error!',
                    text: 'Unable to search for logs. Please try again later.',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
        }
    });
}
