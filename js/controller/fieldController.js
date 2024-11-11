
$("#btnSave").click(function () {
    saveStaff();
})
function saveStaff(){
    let fieldCode = $("#fieldCode").val();
    let fieldName = $("#fieldName").val();
    let fieldLocation = $("#fieldLocation").val();
    let extentSize = $("#extentSize").val();
    let fieldImage1 = $("#fieldImage1").prop('files')[0]
    let fieldImage2 = $("#fieldImage2").prop('files')[0]
    console.log(fieldImage1)

    var formData = new FormData();
    formData.append("fieldCode", fieldCode);
    formData.append("fieldName", fieldName);
    formData.append("fieldLocation", fieldLocation);
    formData.append("extentSize", extentSize);
    formData.append("fieldImage1", fieldImage1);
    formData.append("fieldImage2", fieldImage2);
    console.log(formData)
    $.ajax({
        url: "http://localhost:8080/api/v1/field",
        method: 'Post',
        processData: false,
        contentType: false,
        data: formData,
        headers: {"Authorization": "Bearer " + localStorage.getItem("token")},
        success: function (response) {
            console.log(response);
            alert('Field saved successfully!');
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.error(jqXHR);
            alert(jqXHR.responseJSON.message);
        }
    });

}

