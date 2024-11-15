$(document).ready(function () {
     getAllStaff();
});
$('#btnSave').click(function (){
  let id = $('#id').val();
  let firstName = $('#firstName').val();
  let lastName = $('#lastName').val();
  let designation = $('#designation').val();
  let gender = $('#gender').val();
  let joinedDate = $('#joinedDate').val();
  let dob = $('#dob').val();
  let contactNo = $('#contactNo').val();
  let addressLine1 = $('#addressLine1').val();
  let addressLine2 = $('#addressLine2').val();
  let addressLine3 = $('#addressLine3').val();
  let addressLine4 = $('#addressLine4').val();
  let addressLine5 = $('#addressLine5').val();
  let email = $('#email').val();
  let role = $('#role').val();

  const  staffData = {
      id:id,
      firstName:firstName,
      lastName:lastName,
      designation:designation,
      gender:gender,
      joinedDate:joinedDate,
      dob:dob,
      contactNo:contactNo,
      addressLine1:addressLine1,
      addressLine2:addressLine2,
      addressLine3:addressLine3,
      addressLine4:addressLine4,
      addressLine5:addressLine5,
      email:email,
      role:role
  };

    $.ajax({
        url: "http://localhost:8080/api/v1/staff",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(staffData),
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("token")
        },
        success: function (resp, textStatus, jqxhr) {
            if (jqxhr.status === 200 || jqxhr.status === 201) {
                Swal.fire({
                    title: 'Success!',
                    text: 'Staff saved successfully!',
                    icon: 'success',
                    background: 'black',
                    color: 'white',
                    confirmButtonColor: '#d33',
                    cancelButtonColor: '#3085d6',
                    confirmButtonText: 'OK'
                });
                clearStaff();
                getAllStaff();
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
                text: 'Staff saved Unsuccessfully!',
                icon: 'error',
                background: 'black',
                color: 'white',
                confirmButtonColor: '#d33',
                cancelButtonColor: "#3085d6",
                confirmButtonText: 'OK'
            });
        }
    });
});

//============ getAll staff ======================//

function getAllStaff() {
    $.ajax({
        url: "http://localhost:8080/api/v1/staff",
        method: "GET",
        headers: { "Authorization": "Bearer " + localStorage.getItem("token") },
        success: function (response) {
            console.log("Staff data:",response);
            $('#staffTable tbody').empty();

            response.forEach( function (staff)  {
                $('#staffTable tbody').append(`
                      <tr>
                                <td>${staff.id}</td>
                                <td>${staff.firstName}</td>
                                <td>${staff.lastName}</td>
                                <td>${staff.designation}</td>
                                <td>${staff.gender}</td>
                                <td>${staff.dob}</td>
                                <td>${staff.contactNo}</td>
                                <td>${staff.email}</td>
                                <td>${staff.role}</td>
                            <td>
                <button id="btnUpdate" class="btn btn-info" onclick="populateForm('${staff.id}')">
                    <ion-icon name="create-outline"></ion-icon> 
                </button>
                <button id="btnDelete1" class="btn btn-danger" onclick="deleteStaff('${staff.id}')">
                    <ion-icon name="trash-outline"></ion-icon>
                </button>
            </td>     
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
//================click row table data to input field =====================//

$('#staffTableBody>tr').click(function (){
    let row = $(this);
    let id = row.children.eq(0).text();
    let firstName = row.children.eq(1).text();
    let lastName = row.children.eq(2).text();
    let designation = row.children.eq(3).text();
    let gender = row.children.eq(4).text();
    let joinedDate = row.children.eq(5).text();
    let dob = row.children.eq(6).text();
    let contactNo = row.children.eq(7).text();
    let addressLine1 = row.children.eq(8).text();
    let addressLine2 = row.children.eq(9).text();
    let addressLine3 = row.children.eq(10).text();
    let addressLine4 = row.children.eq(11).text();
    let addressLine5 = row.children.eq(12).text();
    let email = row.children.eq(13).text();
    let role = row.children.eq(14).text();

    // Set from fields with row data
     $('#id').val(id);
     $('#firstName').val(firstName);
     $('#lastName').val(lastName);
     $('#designation').val(designation);
     $('#gender').val(gender);
     $('#joinedDate').val(joinedDate);
     $('#dob').val(dob);
     $('#contactNo').val(contactNo);
     $('#addressLine1').val(addressLine1);
     $('#addressLine2').val(addressLine2);
     $('#addressLine3').val(addressLine3);
     $('#addressLine4').val(addressLine4);
     $('#addressLine5').val(addressLine5);
     $('#email').val(email);
     $('#role').val(role);

     $('#btnSave').prop('disabled',true);
});

function populateForm(id){
    $.ajax({
        url: `http://localhost:8080/api/v1/staff/${id}`,
        method:'GET',
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("token")
        },
        success:function (staff){
            $('#id').val(staff.id);
            $('#firstName').val(staff.firstName);
            $('#lastName').val(staff.lastName);
            $('#designation').val(staff.designation);
            $('#gender').val(staff.gender);
            $('#joinedDate').val(staff.joinedDate);
            $('#dob').val(staff.dob);
            $('#contactNo').val(staff.contactNo);
            $('#addressLine1').val(staff.addressLine1);
            $('#addressLine2').val(staff.addressLine2);
            $('#addressLine3').val(staff.addressLine3);
            $('#addressLine4').val(staff.addressLine4);
            $('#addressLine5').val(staff.addressLine5);
            $('#email').val(staff.email);
            $('#role').val(staff.role);
        },
        error: function (error) {
            Swal.fire({
                title: 'Error!',
                text: 'Failed to fetch staff details!',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    });
}

// ================ update staff data =======================
$('#btnUpdate').click(function () {

    let id = $('#id').val();
    let firstName = $('#firstName').val();
    let lastName = $('#lastName').val();
    let designation = $('#designation').val();
    let gender = $('#gender').val();
    let joinedDate = $('#joinedDate').val();
    let dob = $('#dob').val();
    let contactNo = $('#contactNo').val();
    let addressLine1 = $('#addressLine1').val();
    let addressLine2 = $('#addressLine2').val();
    let addressLine3 = $('#addressLine3').val();
    let addressLine4 = $('#addressLine4').val();
    let addressLine5 = $('#addressLine5').val();
    let email = $('#email').val();
    let role = $('#role').val();

    const updateStaffData = {
        id:id,
        firstName:firstName,
        lastName:lastName,
        designation:designation,
        gender:gender,
        joinedDate:joinedDate,
        dob:dob,
        contactNo:contactNo,
        addressLine1:addressLine1,
        addressLine2:addressLine2,
        addressLine3:addressLine3,
        addressLine4:addressLine4,
        addressLine5:addressLine5,
        email:email,
        role:role
    };

    $.ajax({
        url: `http://localhost:8080/api/v1/staff/${id}`,
        type: "PATCH",
        contentType: "application/json",
        data: JSON.stringify(updateStaffData),
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("token")
        },
        success: function (resp, textStatus, jqxhr) {
            if (jqxhr.status === 200 || jqxhr.status === 201) {
                Swal.fire({
                    title: 'Success!',
                    text: 'Staff update successfully!',
                    icon: 'success',
                    background: 'black',
                    color: 'white',
                    confirmButtonColor: '#d33',
                    cancelButtonColor: '#3085d6',
                    confirmButtonText: 'OK'
                });
                clearStaff();
                getAllStaff();
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
                text: 'Staff update Unsuccessfully!',
                icon: 'error',
                background: 'black',
                color: 'white',
                confirmButtonColor: '#d33',
                cancelButtonColor: "#3085d6",
                confirmButtonText: 'OK'
            });
        }
    });

});

// ================= delete staff data ==================
function deleteStaff(id) {
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
                url: `http://localhost:8080/api/v1/staff/${id}`,
                method: 'DELETE',
                contentType: 'application/json',
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token")
                },
                success: function (response) {
                    Swal.fire({
                        title: 'Deleted!',
                        text: 'Staff has been deleted.',
                        icon: 'success',
                        background: 'black',
                        color: 'white',
                        confirmButtonColor: '#d33',
                        cancelButtonColor: '#3085d6'
                    });
                    getAllStaff();
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    Swal.fire(
                        'Error!',
                        jqXHR.responseJSON?.message || 'Failed to delete the field.',
                        'error'
                    );
                    console.error(jqXHR);
                }
            });
        }
    });
}

$('#btnSearch').click(function () {
    searchStaff();
});

function searchStaff() {
    let firstName = $('#search').val();
    $.ajax({
        url: `http://localhost:8080/api/v1/staff/search?firstName=${firstName}`,
        method: "GET",
        headers: { "Authorization": "Bearer " + localStorage.getItem("token") },
        success: function (staffList) {
            let tableBody = $('#staffTableBody');
            tableBody.empty(); // Clear the existing table rows

            if (staffList.length === 0) {
                Swal.fire({
                    title: 'No Results',
                    text: 'No staff members found with the given name.',
                    icon: 'info',
                    confirmButtonText: 'OK'
                });
                return;
            }

            staffList.forEach(staff => {
                let row = `<tr>
                    <td>${staff.id}</td>
                    <td>${staff.firstName}</td>
                    <td>${staff.lastName}</td>
                    <td>${staff.designation}</td>
                    <td>${staff.gender}</td>
                    <td>${staff.joinedDate}</td>
                    <td>${staff.contactNo}</td>
                    <td>${staff.email}</td>
                    <td>${staff.role}</td>
                    <td>
                <button id="btnUpdate" class="btn btn-info" onclick="populateForm('${staff.id}')">
                    <ion-icon name="create-outline"></ion-icon> 
                </button>
                <button id="btnDelete1" class="btn btn-danger" onclick="deleteStaff('${staff.id}')">
                    <ion-icon name="trash-outline"></ion-icon>
                </button>
            </td>     
                </tr>`;
                tableBody.append(row);
            });
        },
        error: function (xhr, status, error) {
            Swal.fire({
                title: 'Error!',
                text: 'Unable to search for staff members.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    });
}

function clearStaff(){
    $('#firstName').val('');
    $('#lastName').val('');
    $('#designation').val('');
    $('#gender').val('');
    $('#joinedDate').val('');
    $('#dob').val('');
    $('#addressLine1').val('');
    $('#addressLine2').val('');
    $('#addressLine3').val('');
    $('#addressLine4').val('');
    $('#addressLine5').val('');
    $('#contactNo').val('');
    $('#email').val('');
    $('#role').val('');
}

// ========================= downlord PDF staff data ==============================

document.getElementById("downloadPDF").addEventListener("click", function () {
    const { jsPDF } = window.jspdf; // Import jsPDF
    const doc = new jsPDF(); // Create a new jsPDF instance

    // Set title
    const pageWidth = doc.internal.pageSize.width;
    doc.setFontSize(12);
    doc.text("Staff List Report", pageWidth / 2, 20, { align: "center" });

    // AutoTable plugin to handle the table
    doc.autoTable({
        html: '#staffTable', // Reference the table
        startY: 30, // Start after the title
        theme: 'grid', // Grid theme
        styles: {
            fontSize: 10, // Font size
            textColor: [0, 0, 0], // Text color
        },
        headStyles: {
            fillColor: [0, 128, 0], // Green header
            textColor: [255, 255, 255], // White text
        },
        bodyStyles: {
            fillColor: [245, 245, 245], // Light gray
        },
        alternateRowStyles: {
            fillColor: [230, 230, 230], // Slightly darker gray
        },
        columnStyles: {
            9: { cellWidth: 0 }, // Restrict the "Actions" column width
        },
        didParseCell: function (data) {
            if (data.column.index === 9) {
                // Remove "Actions" column content
                data.cell.text = '';
            }
        },
    });

    // Footer
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(10);
        // Footer text
        const footerText = "Green Shadow Designed by @ Sachini Apsara 2024";
        doc.setTextColor(0, 128, 0); // Green text
        doc.text(footerText, pageWidth / 2, doc.internal.pageSize.height - 15, { align: "center" });

        // Page numbering
        const pageNumberText = `Page ${i} of ${pageCount}`;
        doc.text(pageNumberText, pageWidth - 20, doc.internal.pageSize.height - 15, { align: "right" });
    }

    // Save the PDF
    doc.save("Staff_List_Report.pdf");
});

