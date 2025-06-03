<?php
class User extends DB
{
    public function __construct()
    {
        parent::__construct();
    }

    public function createUser($name, $email, $password)
    {
        $role = 'user';
        $sql = "INSERT INTO users (name, email, password, role) VALUES (:name, :email, :password, :role)";
        $stmt = $this->instance->prepare($sql);
        return $stmt->execute([
            'name' => $name,
            'email' => $email,
            'password' => $password,
            'role' => $role
        ]);
    }

    public function isEmailTaken($email)
    {
        $sql = "SELECT 1 FROM users WHERE email = :email LIMIT 1";
        $stmt = $this->instance->prepare($sql);
        $stmt->execute(['email' => $email]);
        return (bool) $stmt->fetch();
    }

    public function authenticate($email, $password)
    {
        $sql = "SELECT * FROM users WHERE email = :email LIMIT 1";
        $stmt = $this->instance->prepare($sql);
        $stmt->execute(['email' => $email]);
        $user = $stmt->fetch();

        if ($user && password_verify($password, $user['password'])) {
            unset($user['password']);
            return $user;
        }

        return false;
    }
}
