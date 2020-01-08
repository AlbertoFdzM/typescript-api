CREATE DATABASE routine_local CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'routine'@'%' IDENTIFIED WITH mysql_native_password BY '12345678';
GRANT ALL PRIVILEGES ON *.* TO 'routine'@'%';
FLUSH PRIVILEGES;
