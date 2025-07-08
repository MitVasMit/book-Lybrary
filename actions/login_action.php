<?php
require_once __DIR__ . '/../includes/autoload.php';
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = trim($_POST['email'] ?? '');
    $password = $_POST['password'] ?? '';

    $errors = [];

    // simple validations
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors['email'] = "Please enter a valid email address.";
    }

    if (empty($password)) {
        $errors['password'] = "Please enter your password.";
    }

    if (empty($errors)) {
        $user = $userModel->authenticate($email, $password);

        if (!$user) {
            $errors['login'] = "Invalid email or password.";
        } else {
            $_SESSION['user'] = $user;
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['role'] = $user['role'];

            if ($user['role'] === 'admin') {
                header('Location: ../admin/dashboard.php');
            } else {
                header('Location: ../public/index.php');
            }
            exit;
        }
    }


    // return with errors
    $_SESSION['errors'] = $errors;
    $_SESSION['old'] = ['email' => $email];
    header('Location: ../public/login.php');
    exit;
} else {
    // if not POST method, back to login.php
    header('Location: ../public/login.php');
    exit;
}
