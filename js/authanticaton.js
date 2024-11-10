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
            localStorage.setItem("role", role); // Store the role in localStorage
            alert("User registered successfully!");
        },
        error: function (error){
            console.log(error)
            alert("User registration unsuccessful!");
        }

    })
}

function userLogin() {
    console.log("click!!");
    let email = $('#email-reg').val();
    let password = $('#password-reg').val();
    console.log(email, password);

    // Create AJAX authenticate request
    $.ajax({
        url: "http://localhost:8080/api/v1/auth/authenticate",
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify({
            email: email,
            password: password
        }),
        success: function(response) {
            const token = response.data.token;
            const role = response.data.role; // Ensure the role is fetched from response.data

            // Store token and role in localStorage for session management
            localStorage.setItem("token", token);
            localStorage.setItem("role", role);
            alert("User logged in successfully!");

            // Redirect user based on role
            if (role === "MANAGER") {
                window.location.href = "./admin-dashboard.html"; // Manager's dashboard
            } else if (role === "SCIENTIST") {
                window.location.href = "./scientist-dashboard.html"; // Scientist's dashboard
            } else {
                window.location.href = "./admin-dashboard.html"; // Fallback for other roles
            }
        },
        error: function(error) {
            console.log(error);
            alert("Login unsuccessful!");
        }
    });
}


