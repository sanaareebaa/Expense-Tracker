<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);
session_start();

$errors = [
    'login' => $_SESSION['login_error'] ?? '',
    'register' => $_SESSION['register_error'] ?? ''
];

$activeForm = $_SESSION['active_form'] ?? 'login';

session_unset();

function showError($error) {
    return !empty($error) ? "<p class='error-message'>$error</p>" : '';
}

function isActiveForm($formName, $activeForm) {
    return $formName === $activeForm ? 'active' : '';
}
?>

<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Sign Up / Login</title>
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
    />
    <link
      href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
      rel="stylesheet"
    />
    <link rel="stylesheet" href="style.css" />
    <style>
      .container {
        max-width: 500px;
        margin: 50px auto;
        padding: 0 20px;
        display: flex;
        flex-direction: column;
        gap: 40px;
      }

      .form-box {
        background: white;
        padding: 40px;
        border-radius: var(--radius-lg);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.3);
        display: none;
      }

      .form-box.active {
        display: block;
      }

      .form-box h1,
      .form-box h2 {
        text-align: center;
        margin-bottom: 30px;
        font-weight: 800;
        color: var(--primary);
      }

      .form-box h1 {
        font-size: 28px;
      }

      .form-box h2 {
        font-size: 24px;
      }

      .btn {
        width: 100%;
        padding: 15px;
        background: var(--primary);
        color: white;
        border: none;
        border-radius: var(--radius-pill);
        font-size: 16px;
        font-weight: 700;
        cursor: pointer;
        margin-top: 10px;
      }

      .link {
        text-align: center;
        margin-top: 20px;
        font-size: 14px;
      }

      .link a {
        color: var(--primary);
        text-decoration: none;
        font-weight: 600;
      }

      .link a:hover {
        text-decoration: underline;
      }

      .error-message {
        background: #ffdddd;
        color: #d8000c;
        padding: 10px;
        border-radius: var(--radius-sm);
        margin-bottom: 20px;
        text-align: center;
      }

     input:focus:valid {
     background-color: rgba(0, 255, 0, 0.2); 
}
input {
  width: 100%;
  padding: 12px;
  border: 2px solid #ccc;
  border-radius: 8px;
  outline: none;
  background: white;
  transition: 0.2s;
}


input:valid {
  background-color: rgba(0, 255, 0, 0.15);
  border-color: green;
}

input:focus:invalid {
  background-color: rgba(255, 0, 0, 0.15);
  border-color: red;
}

input:focus {
  border-color: #4a7cff;
}



      @media (max-width: 600px) {
        .container {
          margin: 20px auto;
          padding: 0 10px;
        }

        .form-box {
          padding: 30px 20px;
        }
      }
    </style>
  </head>

  <body>
    <script src="index.js"></script>
    <div class="container">
      <div class="form-box <?= isActiveForm('register', $activeForm) ?>" id="register">
        <h1>Sign Up</h1>
        <?php echo showError($errors['register']); ?>
        <form action="login_register.php" method="post">
          <div class="form-group">
            <label for="username">Username</label>
            <input type="text" id="username" name="username" required pattern="^[a-zA-Z]{3,20}$" title="Username must be between 3 and 20 characters and contain only letters" />
          </div>

          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" id="email" name="email" required />
                </div>

                <div class="form-group">
                    <label for="password">Password</label>
                    <input type="password" id="password" name="password" minlength="4" maxlength="20" required>
                </div>

                <div class="form-group">
                    <label for="confirm_password">Confirm Password</label>
                    <input type="password" id="confirm_password" name="confirm_password" minlength="4" maxlength="20" required>
                </div>

                <button type="submit" class="btn" name="register">Sign Up</button>

            </form>

            <p class="link">
                Have an account?
                <a href="#" onclick="showform('login')">Login here</a>
            </p>

        </div>

        <div class="form-box <?= isActiveForm('login', $activeForm) ?>" id="login">
            <h2>Login</h2>
            <?php echo showError($errors['login']); ?>
            <form action="login_register.php" method="post">

                <div class="form-group">
                    <label for="login_username">Email</label>
                    <input type="email" id="login_username" name="email" required>
                </div>

                <div class="form-group">
                    <label for="login_password">Password</label>
                    <input type="password" name="password" id="login_password" required>
                </div>

                <button type="submit" class="btn" name="login" >Login</button>

            </form>

            <p class="link">
                Don't have an account?
                <a href="#" onclick="showform('register')">Register here</a>
            </p>

        </div>

    </div>



</body>

</html>