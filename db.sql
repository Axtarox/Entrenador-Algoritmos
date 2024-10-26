CREATE DATABASE algorithm_trainer;

USE algorithm_trainer;


CREATE TABLE USUARIO (
    id INT PRIMARY KEY,
    nombre VARCHAR(50),
    correo VARCHAR(100),
    contrasena VARCHAR(50),
    tipo ENUM('estudiante', 'profesor', 'administrador')
);

CREATE TABLE ESTUDIANTE (
    usuario_id INT PRIMARY KEY,
    institucion_educativa VARCHAR(100),
    nivel_estudios VARCHAR(50),
    nivel_entrenamiento INT,
    porcentaje_completado FLOAT,
    FOREIGN KEY (usuario_id) REFERENCES USUARIO(id)
);


CREATE TABLE PROFESOR (
    usuario_id INT PRIMARY KEY,
    institucion_educativa VARCHAR(100),
    nivel_estudios VARCHAR(50),
    FOREIGN KEY (usuario_id) REFERENCES USUARIO(id)
);

CREATE TABLE ADMINISTRADOR (
    usuario_id INT PRIMARY KEY,
    FOREIGN KEY (usuario_id) REFERENCES USUARIO(id)
);

CREATE TABLE MODULO (
    id INT PRIMARY KEY,
    nivel INT,
    nombre VARCHAR(100),
    teoria VARCHAR(1000)
);

CREATE TABLE EJERCICIO (
    id INT PRIMARY KEY,
    nivel INT,
    enunciado TEXT,
    solucion_esperada TEXT,
    modulo_id INT,
    FOREIGN KEY (modulo_id) REFERENCES MODULO(id)
);

CREATE TABLE EJERCICIO_RESUELTO (
    id INT PRIMARY KEY,
    estudiante_id INT,
    ejercicio_id INT,
    solucion TEXT,
    correcto BOOLEAN,
    fecha_resolucion DATETIME,
    FOREIGN KEY (estudiante_id) REFERENCES ESTUDIANTE(usuario_id),
    FOREIGN KEY (ejercicio_id) REFERENCES EJERCICIO(id)
);

CREATE TABLE RANKING (
    id INT PRIMARY KEY,
    estudiante_id INT,
    ejercicio_id INT,
    posicion INT,
    puntaje INT,
    FOREIGN KEY (estudiante_id) REFERENCES ESTUDIANTE(usuario_id),
    FOREIGN KEY (ejercicio_id) REFERENCES EJERCICIO(id)
);