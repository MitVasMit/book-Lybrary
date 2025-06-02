<?php
include('../includes/header.php');
session_start();
?>

<div>
    <h1><?= !empty($_SESSION['success']) ? $_SESSION['success'] : ''; ?></h1>
    this is login page
</div>




<?php include('../includes/footer.php');
unset($_SESSION['success']);
