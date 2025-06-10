<?php

class Book extends DB
{
    public function searchBooks(string $query): array
    {
        $stmt = $this->instance->prepare("SELECT title, author FROM books WHERE title LIKE :search");
        $stmt->execute(['search' => '%' . $query . '%']);
        return $stmt->fetchAll();
    }
}
