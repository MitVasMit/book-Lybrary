<?php
header('Content-Type: application/json');

require_once '../includes/autoload.php';

$searchQuery = $_GET['q'] ?? '';
$results = [];

if (!empty($searchQuery)) {
    $apiUrl = 'https://openlibrary.org/search.json?title=' . urlencode($searchQuery);
    $apiResponse = file_get_contents($apiUrl);

    if ($apiResponse) {
        $apiData = json_decode($apiResponse, true);

        $filteredBooks = array_filter($apiData['docs'], function ($book) use ($searchQuery) {
            return isset($book['title']) && stripos($book['title'], $searchQuery) !== false;
        });

        foreach (array_slice($filteredBooks, 0, 6) as $book) {
            $results[] = [
                'title'  => $book['title'] ?? 'No title',
                'author' => $book['author_name'][0] ?? 'Unknown',
                'source' => 'Open Library',
                'cover_id' => $book['cover_i'] ?? null
            ];
        }
    }

    if (isset($bookModel)) {
        $localBooks = $bookModel->searchBooks($searchQuery);

        foreach ($localBooks as $book) {
            $results[] = [
                'title'    => $book['title'],
                'author'   => $book['author'],
                'cover_id' => $book['cover_id'] ?? null,
                'source'   => 'Local DB'
            ];
        }
    } else {
        $bookModel = new Book();
        $localBooks = $bookModel->searchBooks($searchQuery);

        foreach ($localBooks as $book) {
            $results[] = [
                'title'    => $book['title'],
                'author'   => $book['author'],
                'cover_id' => $book['cover_id'] ?? null,
                'source'   => 'Local DB'
            ];
        }
    }
}

echo json_encode($results);
