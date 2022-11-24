CREATE DATABASE users;

use users;

CREATE TABLE IF NOT EXISTS maestros(
    id int auto_increment,
    name text,
    lastname text,
    mail varchar(60),
    tel text,
    pass text,
    rol text,
    primary key (id)
);

CREATE TABLE IF NOT EXISTS coordinadores(
    id int auto_increment,
    name text,
    lastname text,
    mail varchar(60),
    tel text,
    pass text,
    rol text,
    primary key (id)
);

CREATE TABLE IF NOT EXISTS administradores (
    id int auto_increment,
    name text,
    lastname text,
    mail varchar(60) unique,
    pass text,
    primary key (id)
);

CREATE TABLE IF NOT EXISTS alumnos (
    id int auto_increment,
    id_coordinador int,
    id_grupo text,
    name text,
    primary key (id)
);

CREATE TABLE IF NOT EXISTS padres (
    id int auto_increment,
    id_coordinador int,
    name text,
    primary key (id)
);

CREATE TABLE IF NOT EXISTS materias(
    id int auto_increment,
    name text,
    id_maestro int,
    primary key (id)
);

CREATE TABLE IF NOT EXISTS temas(
    id int auto_increment,
    topic text,
    subject text,
    subject_id int,
    id_maestro int,
    primary key (id)
);

CREATE TABLE IF NOT EXISTS grupos (
    id int auto_increment,
    id_coordinador int,
    nombre text,
    primary key (id)
);

CREATE TABLE IF NOT EXISTS registros (
    id int auto_increment,
    name text,
    subject text,
    topic text,
    date date,
    performance text,
    notes text,
    id_maestro int,
    primary key(id)
);

INSERT INTO
    administradores (name, lastname, mail, pass)
VALUES
    ('', '', '', '');

SHOW TABLES;

DESCRIBE maestros;

DESCRIBE coordinadores;