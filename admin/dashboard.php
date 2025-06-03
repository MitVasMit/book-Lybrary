<?php include('../includes/header.php');
if (!isset($_SESSION['user']) || $_SESSION['user']['role'] !== 'admin') {
    header('Location: ../public/index.php');
    exit;
}
?>


<div class="text-center">this is admin dashboard</div>

<?php include('../includes/footer.php'); ?>