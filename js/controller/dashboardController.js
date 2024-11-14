$(document).ready(function () {
    let token = localStorage.getItem("token");
    if (token) {
        // Make an AJAX GET request to fetch data
        $.ajax({
            url: "http://localhost:8080/api/v1/blog",
            method: "GET",
            contentType: "application/json",
            headers: { "Authorization": "Bearer " + token },
            success: function (response) {
                console.log(response);
                if (response.data && response.data.token) {
                    // Append the token to the body if available
                    $('<p>' + response.data.token + '</p>').appendTo('body');
                } else {
                    console.error("Token not found in response data");
                }
            },
            error: function (error) {
                console.error("Error occurred:", error);
            }
        });
    } else {
        // Redirect to login page if no token is found
        window.location.href = "user.html";
    }
});

// Function for user logout
function userRegistration() {
    localStorage.removeItem("token");
}

//===================dashboard staff details ================//
$(document).ready(function () {
    // Fetch staff data on page load
    fetchStaffData();
    fetchCropData();
});
//===============Science Dashboard ==================//
 function  fetchCropData(){
     $.ajax({
         url: "http://localhost:8080/api/v1/blog/getCrop", // Update with the correct backend URL
         type: "GET",
         headers: {
             "Authorization": "Bearer " + localStorage.getItem("token")  // Add Authorization header with token
         },
         success: function (response) {
             if (response.code === "OK") {
                 populateCropTable(response.data);
             } else {
                 alert("Failed to fetch data: " + response.message);
             }
         },
         error: function (error) {
             console.error("Error fetching staff data:", error);
             alert("Error fetching staff data!");
         }
     });
 }

 //=====================manager Dashboard ==================//
function fetchStaffData() {
    $.ajax({
        url: "http://localhost:8080/api/v1/blog/getStaff", // Update with the correct backend URL
        type: "GET",
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("token")  // Add Authorization header with token
        },
        success: function (response) {
            if (response.code === "OK") {
                populateStaffTable(response.data);
            } else {
                alert("Failed to fetch data: " + response.message);
            }
        },
        error: function (error) {
            console.error("Error fetching staff data:", error);
            alert("Error fetching staff data!");
        }
    });
}

function populateStaffTable(staffList) {
    const tableBody = $(".staff-table tbody");
    tableBody.empty(); // Clear existing rows

    staffList.forEach((staff) => {
        const row = `
      <tr>
        <td>${staff.id}</td>
        <td>${staff.firstName}</td>
        <td>${staff.lastName}</td>
        <td>${staff.designation}</td>
        <td>${staff.gender}</td>
        <td>${staff.role}</td>
      </tr>
    `;
        tableBody.append(row);
    });
}

function populateCropTable(cropList) {
    const tableBody = $(".crop-table tbody");
    tableBody.empty(); // Clear existing rows

    cropList.forEach((crop) => {
        const row = `
      <tr>
        <td>${crop.cropCode}</td>
        <td>${crop.cropCommonName}</td>
        <td>${crop.cropScientificName}</td>
        <td>${crop.category}</td>
        <td>${crop.cropSeason}</td>
      </tr>
    `;
        tableBody.append(row);
    });
}
