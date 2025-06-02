USE mysql;
UPDATE user SET authentication_string=NULL WHERE User='root';
UPDATE user SET plugin='mysql_native_password' WHERE User='root';
FLUSH PRIVILEGES;
   ALTER USER 'root'@'localhost' IDENTIFIED BY 'MOROSda2';
   ALTER USER 'root'@'%' IDENTIFIED BY 'MOROSda2';
   GRANT ALL PRIVILEGES ON *.* TO 'dani'@'%';
    GRANT TRIGGER ON portugues.* TO 'dani'@'%';

   FLUSH PRIVILEGES;
