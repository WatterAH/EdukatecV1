CREATE DATABASE users;

use users;

CREATE TABLE IF NOT EXISTS maestros(
    id int auto_increment,
    name text,
    lastname text,
    mail varchar(250) unique,
    pass text,
    primary key (id)
);

CREATE TABLE IF NOT EXISTS coordinadores(
    id int auto_increment,
    name text,
    lastname text,
    mail varchar(250),
    pass text,
    primary key (id)
);

CREATE TABLE IF NOT EXISTS administradores (
    id int auto_increment,
    name text,
    lastname text,
    mail varchar(250) unique,
    pass text,
    primary key (id)
);

CREATE TABLE IF NOT EXISTS alumnos(
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

CREATE TABLE IF NOT EXISTS asignacion_grupos(id_maestro int, id_grupo int);

CREATE TABLE IF NOT EXISTS asignacion_padres(id_padre int, id_alumno int);

CREATE TABLE IF NOT EXISTS materias(
    id int auto_increment,
    id_maestro int,
    name text,
    primary key (id)
);

CREATE TABLE IF NOT EXISTS temas(
    id int auto_increment,
    id_materia int,
    id_maestro int,
    materia text,
    name text,
    primary key (id)
);

CREATE TABLE IF NOT EXISTS registros (
    id int auto_increment,
    id_maestro int,
    id_alumno int,
    name text,
    materia text,
    tema text,
    date date,
    performance text,
    notes text,
    primary key(id)
);

CREATE TABLE IF NOT EXISTS grupos (
    id int auto_increment,
    id_coordinador int,
    nombre text,
    primary key (id)
);

INSERT INTO
    administradores (name, lastname, mail, pass)
VALUES
    ('Samuel', 'Tlahuel', 'samueltlahuel.m@gmail.com', 'SamT0710');

SHOW TABLES;

DESCRIBE maestros;

DESCRIBE coordinadores;