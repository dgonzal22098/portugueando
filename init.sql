-- Crear las bases de datos
CREATE DATABASE IF NOT EXISTS usuarios;
CREATE DATABASE IF NOT EXISTS portugues;

-- Asegurar que el usuario tiene todos los privilegios necesarios
CREATE USER IF NOT EXISTS 'dani'@'%' IDENTIFIED BY '1234';
GRANT ALL PRIVILEGES ON usuarios.* TO 'dani'@'%';
GRANT ALL PRIVILEGES ON portugues.* TO 'dani'@'%';
FLUSH PRIVILEGES;