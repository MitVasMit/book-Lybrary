<?php
include('../includes/header.php');
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

?>

<div class="min-h-screen flex items-center justify-center px-4 bg-gray-50 dark:bg-gray-900">
    <div class="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-10 max-w-md w-full">

        <div class="mb-2 p-3 text-center text-bold text-green-300 rounded-md">
            <?= !empty($_SESSION['success']) ? $_SESSION['success'] : ''; ?>
        </div>


        <h2 class="text-3xl font-extrabold text-center text-blue-600 mb-8">Log In to Your Account</h2>
        <small class="mb-2 block text-center text-base block font-semibold text-red-700 dark:text-red-300"><?= !empty($_SESSION['errors']['login']) ? $_SESSION['errors']['login'] : ''; ?></small>

        <form action="../actions/login_action.php" method="POST" class="space-y-6">
            <div>
                <label for="email" class="block mb-2 font-medium text-gray-700 dark:text-gray-200">Email Address</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="you@example.com"
                    value="<?= htmlspecialchars($_SESSION['old']['email'] ?? '') ?>"
                    class="w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <small class="mt-2 block font-semibold text-red-700 dark:text-red-300"><?= !empty($_SESSION['errors']['email']) ? $_SESSION['errors']['email'] : ''; ?></small>
            </div>

            <div>
                <label for="password" class="block mb-2 font-medium text-gray-700 dark:text-gray-200">Password</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Enter password"
                    class="w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                <small class="mt-2 block font-semibold text-red-700 dark:text-red-300"><?= !empty($_SESSION['errors']['password']) ? $_SESSION['errors']['password'] : ''; ?></small>
            </div>

            <button
                type="submit"
                class="w-full bg-blue-600 hover:bg-blue-700 transition-colors text-white py-3 rounded-md font-semibold text-lg">
                Log In
            </button>
            <a href="forgot-password.php" class="block text-right text-blue-600 hover:underline">Forgot your password?</a>
        </form>

        <p class="text-center mt-6 text-gray-600 dark:text-gray-300 text-sm">
            Don't have an account?
            <a href="register.php" class="text-blue-500 hover:underline font-medium">Register here</a>.
        </p>
    </div>
</div>




<?php include('../includes/footer.php');
unset($_SESSION['success']);
