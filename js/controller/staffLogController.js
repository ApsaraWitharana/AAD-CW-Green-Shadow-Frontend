$(document).ready(function () {
    loadCropIds();
    loadStaffIds();
    generateLogCode();
    getAllLog();
    getAllStaffLog();

    $('#btnAdd').click(function () {
        const formData = {
            logCode: $('#logCode1').val(),
            cropCode: $('#cropCode').val(),
            logDate: $("#workDate").val(),
            observedImage: $("#observedImage1").val(),
            logDetails: $("#workDescription").val(),
            staffLogDetailsDTOS: [
                {
                    staff: {
                        id: $('#staffId').val(),
                        firstName: $('#staffName').val()
                    },
                    description: $('#staffDescription').val(),
                    workStaffCount: Number($('#workStaffCount').val()),
                    logDate: $('#workDate').val(), // Update based on your requirement
                },
            ],
        };

        $.ajax({
            url: 'http://localhost:8080/api/v1/staff-log-details/save',
            method: 'POST',
            contentType: 'application/json',
            headers: {"Authorization": "Bearer " + localStorage.getItem("token")},
            data: JSON.stringify(formData),
            success: function (response) {
                alert('Log details saved successfully!');
                console.log('Success:', response);
                getAllStaffLog();
                getAllLog();
            },
            error: function (xhr, status, error) {
                alert('Failed to save log details!');
                console.error('Error:', error);
            },
        });
    });


    function getAllStaffLog() {
        $.ajax({
            url: 'http://localhost:8080/api/v1/staff-log-details/get',
            method: "GET",
            contentType: "application/json",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
            success: function (response) {
                console.log('All Log Details:', response);

                $('#staffLogTableBody').empty();
                if (Array.isArray(response)) {
                    response.forEach(function (item) {
                        $('#staffLogTableBody').append(
                            `<tr>
                        <td>${item.staff.id}</td>
                        <td>${item.staff.firstName}</td>
                        <td>${item.description}</td>
                        <td>${item.workStaffCount}</td>
                        <td>${item.logDate}</td>
                    </tr>
                  `);
                    });
                } else {
                    console.error("Invalid response format:", response);
                    Swal.fire({
                        title: 'Error!',
                        text: 'Unexpected response format from server!',
                        icon: 'error',
                        confirmButtonText: 'OK'
                    });
                }
            },
            error: function (error) {
                const message = error.responseJSON?.message || "An error occurred while fetching field logs!";
                Swal.fire({
                    title: 'Error!',
                    text: message,
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
        });
    }


//================== lord crop ids ==============================//
    function loadStaffIds() {
        $.ajax({
            url: "http://localhost:8080/api/v1/staff",
            method: "GET",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
            success: function (response) {
                // Clear and initialize the dropdown
                $("#staffId").empty();
                $("#staffId").append('<option value="">Select Staff ID</option>');

                // Create a mapping of staff IDs to names
                const staffMap = {};

                // Populate the dropdown and staff map
                response.forEach(staff => {
                    $("#staffId").append(`<option value="${staff.id}">${staff.id}</option>`);
                    staffMap[staff.id] = staff.firstName;
                });

                // Set up the event to update the name field
                $("#staffId").change(function () {
                    const selectedId = $(this).val(); // Get the selected ID
                    if (selectedId) {
                        $("#staffName").val(staffMap[selectedId] || "Name not found"); // Update name field
                    } else {
                        $("#staffName").val(""); // Clear the name field if no ID is selected
                    }
                });

                alert("Staff IDs loaded successfully!");
            },
            error: function (xhr) {
                alert("Error loading staff IDs: " + xhr.status);
            }
        });
    }

//================== lord crop ids ==============================//
    function loadCropIds() {
        $.ajax({
            url: "http://localhost:8080/api/v1/crop",
            method: "GET",
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

//================= set log table ====================//
    function getAllLog() {
        $.ajax({
            url: "http://localhost:8080/api/v1/log",
            method: "GET",
            contentType: "application/json",
            headers: {"Authorization": "Bearer " + localStorage.getItem("token")},
            success: function (response) {
                console.log("Field log:", response);

                // Clear the existing rows in the table
                $('#logTable tbody').empty();

                // Ensure the response is an array
                if (Array.isArray(response)) {
                    response.forEach(function (data) {
                        $('#logTable tbody').append(`
                        <tr>
                            <td>${data.logCode}</td>
                            <td>${data.cropCode}</td>
                            <td>${data.logDetails}</td>
                            <td>${data.logDate}</td>
                            <td>${data.observedImage}</td>
                        </tr>
                    `);
                    });
                } else {
                    console.error("Invalid response format:", response);
                    Swal.fire({
                        title: 'Error!',
                        text: 'Unexpected response format from server!',
                        icon: 'error',
                        confirmButtonText: 'OK'
                    });
                }
            },
            error: function (error) {
                const message = error.responseJSON?.message || "An error occurred while fetching field logs!";
                Swal.fire({
                    title: 'Error!',
                    text: message,
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
        });
    }
});
//======================= generate field logCode =================//
    function generateLogCode() {
        $.ajax({
            url: "http://localhost:8080/api/v1/staff-log-details/generate-staffLog-code", // Endpoint to generate logCode
            method: "GET",
            headers: {"Authorization": "Bearer " + localStorage.getItem("token")},
            success: function (response) {
                $('#staffLogCode').val(response); // Set the generated logCode
            },
            error: function (error) {
                Swal.fire({
                    title: 'Error!',
                    text: 'An error occurred while generating log code!',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
        });
    }
