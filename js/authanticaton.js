

function userRegistation() {
    console.log("click!!");

    let name = $('#name').val();
    let email = $("#email").val();
    let password = $('#password').val();
    let role = $('#role').val();
    console.log(email, password, name, role);

    // Create AJAX registration request
    $.ajax({
        url: "http://localhost:8080/api/v1/auth/register",
        method: "POST",
        contentType: "application/json",
        headers: { "Authorization": "Bearer " + localStorage.getItem("token") },
        data: JSON.stringify({
            name: name,
            email: email,
            password: password,
            role: role
        }),
        success: function(response) {
            console.log(response.data.token)
            const token = response.data.token;
            localStorage.setItem("token", token);
            alert("User registered successfully!");
        },
        error: function(error) {
            console.error("Error during registration:", error);
            alert("User registration unsuccessful!");
        }
    });
}

// function userLogin() {
//     console.log("click!!");
//     let email = $('#email-reg').val();
//     let password = $('#password-reg').val();
//     console.log(email, password);
//
//     // Create AJAX authenticate request
//     $.ajax({
//         url: "http://localhost:8080/api/v1/auth/authenticate",
//         method: "POST",
//         contentType: "application/json",
//         headers: { "Authorization": "Bearer " + localStorage.getItem("token") },
//         data: JSON.stringify({
//             email: email,
//             password: password
//         }),
//         success: function(response) {
//             console.log(response.data.token)
//             // Store token and role in localStorage
//             const token = response.data.token;
//             const role = response.data.role;
//             localStorage.setItem("token", token);
//             localStorage.setItem("role", role);
//             alert("User Login successfully!");
//             console.log("User role:", role);
//
//             // Redirect based on role
//             if (role === "MANAGER") {
//                 window.location.href = "./pages/admin-dashboard.html";
//             } else if (role === "SCIENTIST") {
//                 window.location.href = "./scientist-dashboard.html";
//             } else {
//                 window.location.href = "./pages/admin-dashboard.html";
//             }
//         },
//         error: function(error) {
//             console.error("Error during login:", error);
//             alert("Login unsuccessful!");
//         }
//     });
// }


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
            console.log("Response:", response);

            // Store token in localStorage
            const token = response.data.token;
            const role = response.data.role; // Extract role from response
            localStorage.setItem("token", token);

            alert("User Login successfully!");

            // Redirect based on role
            if (role === "MANAGER") {
                window.location.href = "pages/admin-dashboard.html";
            } else if (role === "SCIENTIST") {
                window.location.href = "pages/scientist-dashboard.html";
            } else if (role === "ADMINISTER") {
                window.location.href = "pages/administer-dashboard.html";
            }else {
                window.location.href = "admin-dashboard.html";
            }
        },
        error: function(error) {
            console.error("Error during login:", error);
            alert("Login unsuccessful!");
        }
    });
}
