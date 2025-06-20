<?php
require_once '../includes/auth.php';
requireAdmin();
include('../includes/header.php');
?>

<div class="flex min-h-screen bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white">
    <?php include_once '../includes/admin/admin_nav.php'; ?>

    <main class="flex-1 p-6">
        <h1 class="text-3xl font-bold mb-6">Admin Dashboard</h1>
        <!-- Content goes here -->
    </main>
</div>

<?php include('../includes/footer.php'); ?>