$(document).ready(function () {
    clearLogFields();
    getAllLogField();
    loadCropIds();
});
$('#btnSave').click(function () {
    let logCode = $('#logCode').val();
    let logDate = $('#logDate').val();
    let logDetails = $('#logDetails').val();
    let observedImage =  $('#observedImage').prop('files')[0];
    let cropCode =  $('#cropCode').val();

    var formData = new FormData();
    formData.append('logCode', logCode);
    formData.append('logDate', logDate);
    formData.append('logDetails', logDetails);
    formData.append('observedImage', observedImage);
    formData.append('cropCode', cropCode);

    $.ajax({
        url: 'http://localhost:8080/api/v1/log',
        method: 'POST',
        data: formData,
        processData: false,
        contentType: false,
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("token")
        },
        success: function (resp, textStatus, jqxhr) {
            if (jqxhr.status === 200 || jqxhr.status === 201) {
                Swal.fire({
                    title: 'Success!',
                    text: 'Log Save Successfully!!',
                    icon: 'success',
                    background: 'black',
                    color: 'white',
                    confirmButtonColor: '#d33',
                    cancelButtonColor: '#3085d6'
                });
                clearLogFields();
                getAllLogField();
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
                text: 'Log saved Unsuccessfully!',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    });
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
                       <td>
            <button id="btnUpdate1" class="btn btn-info" onclick="populateForm('${log.logCode}')">
                <ion-icon name="create-outline"></ion-icon> 
            </button>
            <button  class="btn btn-danger" onclick="deleteLog('${log.logCode}')">
              <ion-icon name="trash-outline"></ion-icon>
           </button>
        </td>
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

//======================= delete ==========================//
function deleteLog(logCode) {
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
                url: `http://localhost:8080/api/v1/log/${logCode}`,
                method: 'DELETE',
                contentType: 'application/json',
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token")
                },
                success: function (response) {
                    Swal.fire({
                        title: 'Deleted!',
                        text: 'Log has been deleted.',
                        icon: 'success',
                        background: 'black',
                        color: 'white',
                        confirmButtonColor: '#d33',
                        cancelButtonColor: '#3085d6'
                    });

                    getAllLogField();

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
//================== Attach click event for table rows
$('#logTableBody>tr').click(function () {
    let row = $(this);
    const logCode = row.children().eq(0).text();
    const logDate = row.children().eq(1).text();
    const logDetails = row.children().eq(2).text();
    const cropCode = row.children().eq(4).text();
    const imageSrc = row.children().eq(3).find('img').attr('src'); // Get the image source

    // Set the values for the text input fields
    $('#logCode').val(logCode);
    $('#logDate').val(logDate);
    $('#logDetails').val(logDetails);
    $('#cropCode').val(cropCode);

    $('#imagePreview').attr('src', imageSrc);

});

function populateForm(logCode) {

    $.ajax({
        url: `http://localhost:8080/api/v1/log/${logCode}`,
        type: "GET",
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("token")
        },
        success: function (log) {
    $('#logCode').val(log.logCode);
    $('#logDate').val(log.logDate);
    $('#logDetails').val(log.logDetails);
    $('#cropCode').val(log.cropCode);

// Display the image preview
//             if (crop.cropImage) {
//                 $("#imagePreview").attr("src", `data:image/jpeg;base64,${log.im}`);
//             }

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
// ====================== clear====================//

function  clearLogFields() {
    $('#logCode').val('');
    $('#logDate').val('');
    $('#logDetails').val('');
    $('#observedImage').val('');
    $('#cropCode').val('');
}

//===================== update ===============//
$("#btnUpdate").click(function (){
    let logCode = $('#logCode').val();
    let updateLogDate = $('#logDate').val();
    let updateLogDetails = $('#logDetails').val();
    let updateObservedImage =  $('#observedImage').prop('files')[0];
    let updateCropCode =  $('#cropCode').val();

    var formData = new FormData();
    formData.append('logCode', logCode);
    formData.append('updateLogDate', updateLogDate);
    formData.append('updateLogDetails',updateLogDetails);
    formData.append('updateObservedImage', updateObservedImage);
    formData.append('updateCropCode', updateCropCode);

// Ajax request
    $.ajax({
        url: `http://localhost:8080/api/v1/log/${logCode}`,
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
                    text: 'Log update successfully!',
                    icon: 'success',
                    background: 'black',
                    color: 'white',
                    confirmButtonColor: '#d33',
                    cancelButtonColor: '#3085d6'
                });
                clearLogFields();
                getAllLogField();

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
                text: 'Log update failed!',
                icon: 'error',
                background: 'black',
                color: 'white',
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6'
            });
        }
    });
});
//================== lord crop ids ==============================//
function loadCropIds() {
    $.ajax({
        url: "http://localhost:8080/api/v1/crop",
        type: "GET",
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("token")
        },
        success: function (response) {
            $("#cropCode").empty();
            $("#cropCode").append('<option value="">Select Crop Code</option>');

            response.forEach(crop => {
                $("#cropCode").append(`<option value="${crop.cropCode}">${crop.cropCode}</option>`);
            });

            alert("Crop codes loaded successfully!");
        },
        error: function (xhr) {
            alert("Error loading field codes: " + xhr.status);
        }
    });
}

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
                        <td>
                            <button id="btnUpdate1" class="btn btn-info" onclick="populateForm('${log.logCode}')">
                                <ion-icon name="create-outline"></ion-icon> 
                            </button>
                            <button class="btn btn-danger" onclick="deleteLog('${log.logCode}')">
                                <ion-icon name="trash-outline"></ion-icon>
                            </button>
                        </td>
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
