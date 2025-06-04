<?php
require_once __DIR__ . '/../includes/autoload.php';

if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

$token = $_GET['token'] ?? '';

// if token is missing
if (empty($token)) {
    $_SESSION['errors']['token'] = 'Invalid or missing token.';
    header('Location: login.php');
    exit;
}

// check if there is an acc/email with this token
$reset = $userModel->getEmailByValidToken($token);

if (!$reset) {
    $_SESSION['errors']['token'] = 'Reset token is invalid or has expired.';
    header('Location: login.php');
    exit;
}

$email = htmlspecialchars($reset['email']);
?>

<?php include('../includes/header.php'); ?>

<div class="min-h-screen flex items-center justify-center px-4 bg-gray-50 dark:bg-gray-900">
    <div class="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-10 max-w-md w-full">
        <h2 class="text-2xl font-bold text-center text-blue-600 mb-6">Reset Your Password</h2>

        <form action="../actions/reset_password_action.php" method="POST" class="space-y-6">
            <input type="hidden" name="token" value="<?= htmlspecialchars($token) ?>">

            <div>
                <label for="new_password" class="block mb-2 font-medium text-gray-700 dark:text-gray-200">New Password</label>
                <input
                    type="password"
                    id="new_password"
                    name="new_password"
                    required
                    placeholder="Enter your new password"
                    class="w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <small class="mt-2 block font-semibold text-red-700 dark:text-red-300"><?= !empty($_SESSION['errors']['password']) ? $_SESSION['errors']['password'] : ''; ?></small>

            </div>

            <div>
                <label for="confirm_password" class="block mb-2 font-medium text-gray-700 dark:text-gray-200">Confirm Password</label>
                <input
                    type="password"
                    id="confirm_password"
                    name="confirm_password"
                    required
                    placeholder="Confirm your new password"
                    class="w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <small class="mt-2 block font-semibold text-red-700 dark:text-red-300"><?= !empty($_SESSION['errors']['password']) ? $_SESSION['errors']['password'] : ''; ?></small>

            </div>

            <button
                type="submit"
                class="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md font-semibold text-lg transition-colors">
                Reset Password
            </button>
        </form>
    </div>
</div>

<?php include('../includes/footer.php'); ?>