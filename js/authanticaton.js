function userRegistation() {
    console.log("click!!");

    let formData = new FormData();
    formData.append("email", $('#email').val());
    formData.append("password", $('#password').val());
    formData.append("name", $('#name').val());
    formData.append("role", $('#role').val());

    $.ajax({
        url: "http://localhost:8080/api/v1/auth/signup",
        method: "POST",
        processData: false, // Important: Prevent jQuery from processing the data
        contentType: false, // Important: Let the browser set the Content-Type
        data: formData,
        success: function(response) {
            console.log("Response:", response);
            if (response && response.token) {
                localStorage.setItem("token", response.token);
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
    console.log("click!!");
    let email = $('#email-reg').val();
    let password = $('#password-reg').val();
    console.log(email, password);

    // Create AJAX authenticate request
    $.ajax({
        url: "http://localhost:8080/api/v1/auth/signin",
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify({
            email: email,
            password: password
        }),
        success: function(response) {
            console.log("Response received:", response);

            if (response && response.token) {
                localStorage.setItem("token", response.token);

                const role = response.role && response.role.length > 0 ? response.role[0].authority.replace("ROLE_", "") : "";
                console.log("Extracted Role:", role);

                alert("User Login successfully!");

                // Use correct base path for redirection
                const baseURL = "http://localhost:63342/"; // Change to match your frontend URL
                if (role === "MANAGER") {
                    window.location.href = `${baseURL}/pages/manager/admin-dashboard.html`;
                } else if (role === "SCIENTIST") {
                    window.location.href = `${baseURL}/pages/scientist/scientist-dashboard.html`;
                } else if (role === "ADMINISTER") {
                    window.location.href = `${baseURL}/pages/administer/admin-dashboard.html`;
                } else {
                    window.location.href = `${baseURL}/admin-dashboard.html`;
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
