$(document).ready(function () {
    getAllField();
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
                clearFields();
                getAllField();
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

function getAllField() {
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
                        <td><img src="${log.observedImage}" alt="Observed Image" width="50"></td>
                        <td>${log.cropCode}</td>
                       <td>
            <button id="btnUpdate" class="btn btn-info" onclick="populateForm('${log.logCode}')">
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

                    getAllField();

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



function populateForm(logCode, logDate, logDetails, cropCode) {
    $('#logCode').val(logCode);
    $('#logDate').val(logDate);
    $('#logDetails').val(logDetails);
    $('#cropCode').val(cropCode);
}
// ====================== clear====================//

function clearFields() {
    $('#logCode').val('');
    $('#logDate').val('');
    $('#logDetails').val('');
    $('#observedImage').val('');
    $('#cropCode').val('');
}

//===================== row ===============//


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

