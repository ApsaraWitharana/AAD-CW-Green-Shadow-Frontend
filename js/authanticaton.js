function userRegistration() {
    console.log("Register button clicked!");

    let userData = {
        email: $('#email').val(),
        password: $('#password').val(),
        name: $('#name').val(),
        role: $('#role').val()
    };

    $.ajax({
        url: "http://localhost:8080/api/v1/auth/register",
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify(userData), // Convert object to JSON
        success: function(response) {
            console.log("Response:", response);
            console.log(userData);
            if (response && response.data && response.data.token) {
                localStorage.setItem("token", response.data.token);
                alert("User registered successfully!");
            } else {
                alert("Registration successful, but no token received.");
            }
        },
        error: function(error) {
            console.error("Error during registration:", error);
            alert("User registration unsuccessful!");
        }
    });
}

function userLogin() {
    console.log("Login button clicked!");
    let email = $('#email').val();
    let password = $('#password').val();

    $.ajax({
        url: "http://localhost:8080/api/v1/auth/authenticate",
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify({ email, password }),
        success: function(response) {
            console.log("Response received:", response);
            if (response && response.data && response.data.token) {
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("role", response.data.role);

                console.log("Extracted Role:", response.data.role);
                alert("User Login successful!");

                // Redirect based on role
                switch (response.data.role) {
                    case "MANAGER":
                        window.location.href = "pages/manager/admin-dashboard.html";
                        break;
                    case "SCIENTIST":
                        window.location.href = "pages/scientist/scientist-dashboard.html";
                        break;
                    case "ADMINISTER":
                        window.location.href = "pages/administer/administer-dashboard.html";
                        break;
                    default:
                        window.location.href = "admin-dashboard.html";
                        alert("User Login successfully!");
                }
            } else {
                alert("Login successful, but no token received.");
            }
        },
        error: function(error) {
            console.error("Error during login:", error);
            alert("Login unsuccessful!");
        }
    });
}
