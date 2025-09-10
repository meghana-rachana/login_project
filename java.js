

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Login / Signup Page</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background: linear-gradient(to right, #6a11cb, #2575fc);
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      margin: 0;
    }
    .container {
      background: #fff;
      padding: 30px;
      border-radius: 12px;
      box-shadow: 0 5px 20px rgba(0,0,0,0.2);
      width: 320px;
      text-align: center;
    }
    .container h2 {
      margin-bottom: 20px;
      color: #333;
    }
    .container input {
      width: 100%;
      padding: 12px;
      margin: 10px 0;
      border: 1px solid #ccc;
      border-radius: 8px;
      outline: none;
    }
    .container button {
      width: 100%;
      padding: 12px;
      margin-top: 15px;
      background: #2575fc;
      border: none;
      color: white;
      font-size: 16px;
      border-radius: 8px;
      cursor: pointer;
    }
    .switch {
      margin-top: 15px;
      font-size: 14px;
    }
    .switch a {
      color: #2575fc;
      cursor: pointer;
      font-weight: bold;
    }
  </style>
</head>
<body>
  <div class="container">
    <h2 id="formTitle">Login</h2>
    <form id="authForm">
      <input type="text" id="username" placeholder="Username" required>
      <input type="password" id="password" placeholder="Password" required>
      <div id="extraField" style="display:none;">
        <input type="email" id="email" placeholder="Email (Signup only)">
      </div>
      <button type="submit">Submit</button>
    </form>
    <div class="switch">
      <span id="toggleText">Don’t have an account?</span> 
      <a id="toggleLink">Signup</a>
    </div>
    <p id="message" style="color:green; margin-top:10px;"></p>
  </div>

  <script>
    let isLogin = true; // Toggle between Login and Signup

    const formTitle = document.getElementById("formTitle");
    const authForm = document.getElementById("authForm");
    const toggleText = document.getElementById("toggleText");
    const toggleLink = document.getElementById("toggleLink");
    const extraField = document.getElementById("extraField");
    const message = document.getElementById("message");

    // Switch between Login & Signup
    toggleLink.addEventListener("click", () => {
      isLogin = !isLogin;
      if (isLogin) {
        formTitle.textContent = "Login";
        toggleText.textContent = "Don’t have an account?";
        toggleLink.textContent = "Signup";
        extraField.style.display = "none";
      } else {
        formTitle.textContent = "Signup";
        toggleText.textContent = "Already have an account?";
        toggleLink.textContent = "Login";
        extraField.style.display = "block";
      }
      message.textContent = "";
    });

    // Handle form submit
    authForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;
      const email = document.getElementById("email").value;

      if (isLogin) {
        // Login logic
        const storedUser = localStorage.getItem(username);
        if (storedUser) {
          const userData = JSON.parse(storedUser);
          if (userData.password === password) {
            message.style.color = "green";
            message.textContent = "✅ Login Successful!";
          } else {
            message.style.color = "red";
            message.textContent = "❌ Wrong password!";
          }
        } else {
          message.style.color = "red";
          message.textContent = "❌ User not found!";
        }
      } else {
        // Signup logic
        if (localStorage.getItem(username)) {
          message.style.color = "red";
          message.textContent = "⚠ Username already exists!";
        } else {
          localStorage.setItem(username, JSON.stringify({ username, password, email }));
          message.style.color = "green";
          message.textContent = "✅ Signup Successful! You can now login.";
        }
      }
      authForm.reset();
    });
  </script>
</body>
</html>
