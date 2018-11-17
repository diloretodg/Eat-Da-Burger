CREATE DATABASE IF NOT EXISTS hxwk3ktxprdp0fdf;
USE hxwk3ktxprdp0fdf;

-- If the table already exists, remove it before trying to create the table again
DROP TABLE IF EXISTS burgers;

-- Create the burgers table
CREATE TABLE burgers (
    id int NOT NULL AUTO_INCREMENT,
    burger varchar(255) NOT NULL,
    eaten BOOLEAN DEFAULT false,
    PRIMARY KEY (id)
);
