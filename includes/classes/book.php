<?php

class Book extends DB
{
    public function searchBooks(string $query): array
    {
        $stmt = $this->instance->prepare("SELECT title, author FROM books WHERE title LIKE :search");
        $stmt->execute(['search' => '%' . $query . '%']);
        return $stmt->fetchAll();
    }

    public function getAllWithCategory()
    {
        $sql = "SELECT b.*, c.name AS category_name
            FROM books b
            JOIN categories c ON b.category_id = c.id
            ORDER BY b.created_at DESC";

        $stmt = $this->instance->prepare($sql);
        $stmt->execute();

        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
}
