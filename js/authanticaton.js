//=============================Ajax set user =================//

function userRegistation(){
    console.log("click!!")

    let name = $('#name').val();
    let email = $("#email").val();
    let password = $('#password').val();
    let role = $('#role').val();
    console.log(email,password,name,role)

    //create ajax request
    $.ajax({
        url: "http://localhost:8080/api/v1/auth/register",
        method: "POST",
        contentType: "application/json",
        "data": JSON.stringify({
            "name": name,
            "email": email,
            "password": password,
            "role":role
        }),

        //error handling
        success: function (response){
            console.log(response.data.token)
            localStorage.setItem("token",response.data.token)
            alert("user register Successfully!!")
        },
        error: function (error){
            console.log(error)
            alert("user register Unsuccessfully!!")
        }

    })
}
