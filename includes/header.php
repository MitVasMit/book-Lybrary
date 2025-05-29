<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Book Library</title>
    <link href="../assets/css/output.css" rel="stylesheet" />
    <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
    <!-- swiper CSS -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@9/swiper-bundle.min.css" />


</head>

<body class="bg-blue-100 text-gray-900 dark:bg-gray-900 dark:text-white">
    <header class="shadow">
        <div class="container mx-auto px-4 py-4 flex items-center justify-between">

            <div class="flex items-center gap-2 w-1/3">
                <a href="../public/index.php"><img class="w-[40px]" src="../assets/images/logo.png" alt="logo"></a>
            </div>

            <div class="text-center w-1/3">
                <a href="../public/index.php" class="flex flex-col">
                    <span class="text-sm font-semibold text-gray-500 dark:text-gray-400">open</span>
                    <span class="text-4xl font-extrabold text-gray-900 dark:text-white drop-shadow-lg transition-transform duration-300 hover:scale-105">Library</span>
                </a>
            </div>

            <nav class="w-1/3 text-right space-x-4">
                <a href="/login.php" class="text-gray-600 hover:text-blue-600 font-medium">Login</a>
                <a href="/register.php" class="text-gray-600 hover:text-blue-600 font-medium">Register</a>
                <button id="darkToggle" class="ml-2 text-gray-600 dark:text-gray-300 hover:text-yellow-500" title="Toggle Dark Mode">
                    🌙
                </button>
            </nav>

        </div>
    </header>