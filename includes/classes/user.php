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

    public function emailExists(string $email): bool
    {
        $sql = "SELECT 1 FROM users WHERE email = :email LIMIT 1";
        $stmt = $this->instance->prepare($sql);
        $stmt->execute(['email' => $email]);
        return (bool) $stmt->fetch();
    }

    public function storePasswordResetToken(string $email, string $token, string $expiresAt): bool
    {
        $sql = 'INSERT INTO password_resets (email, token, expires_at) VALUES (:email, :token, :expires_at)
                ON DUPLICATE KEY UPDATE token = VALUES(token), expires_at = VALUES(expires_at)';
        $stmt = $this->instance->prepare($sql);
        return $stmt->execute([
            'email' => $email,
            'token' => $token,
            'expires_at' => $expiresAt,
        ]);
    }

    public function getEmailByValidToken(string $token)
    {
        $sql = "SELECT email FROM password_resets WHERE token = :token AND expires_at > NOW()";
        $stmt = $this->instance->prepare($sql);
        $stmt->execute(['token' => $token]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function updatePasswordByEmail(string $email, string $hashedPassword): bool
    {
        $sql = "UPDATE users SET password = :password WHERE email = :email";
        $stmt = $this->instance->prepare($sql);
        return $stmt->execute([
            'password' => $hashedPassword,
            'email' => $email,
        ]);
    }

    public function deleteResetTokenByEmail(string $email): bool
    {
        $sql = "DELETE FROM password_resets WHERE email = :email";
        $stmt = $this->instance->prepare($sql);
        return $stmt->execute(['email' => $email]);
    }
}
