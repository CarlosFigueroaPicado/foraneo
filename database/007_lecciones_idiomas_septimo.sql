-- FORÁNEO - Lecciones de Idiomas Séptimo Grado
-- Ejecutar DESPUÉS de 005_malla_septimo.sql y 004_lecciones_septimo_grado.sql

-- ESPAÑOL: Aula de clases
WITH malla AS (SELECT id FROM malla_curricular WHERE codigo_unidad='LEN7-U2' LIMIT 1),
lec AS (INSERT INTO lecciones (malla_id, codigo, titulo, descripcion, objetivo_aprendizaje, duracion_minutos, dificultad, orden, publicado)
SELECT m.id, 'LEN7-U2-L1', 'El aula de clases', 'Vocabulario del salón.', 'Identifica objetos del aula.', 45, 1, 1, TRUE FROM malla m ON CONFLICT (codigo) DO UPDATE SET activo=TRUE, publicado=TRUE RETURNING id)
INSERT INTO contenidos_leccion (leccion_id, idioma_id, tipo_contenido, orden) SELECT l.id, i.id, 'texto', 1 FROM lec l, idiomas i WHERE i.codigo='es' ON CONFLICT DO NOTHING;

INSERT INTO textos_leccion (contenido_id, titulo, cuerpo, nivel_lectura)
SELECT cl.id, 'Objetos del aula', 'Vocabulario:
- La mesa, La silla, El libro, El cuaderno
- El lápiz, El bolígrafo, La pizarra
- La puerta, La ventana, El estudiante, El docente

Ejemplo: El libro está en la mesa.', 'basico'
FROM contenidos_leccion cl JOIN lecciones l ON l.id=cl.leccion_id JOIN idiomas i ON i.id=cl.idioma_id
WHERE l.codigo='LEN7-U2-L1' AND i.codigo='es' AND cl.tipo_contenido='texto' LIMIT 1;

WITH ejer AS (INSERT INTO ejercicios (leccion_id, codigo, titulo, instruccion, tipo_ejercicio, dificultad, puntos_maximos, orden)
SELECT l.id, 'LEN7-U2-L1-E1', 'Vocabulario del aula', 'Selecciona el objeto.', 'seleccion_unica', 1, 10, 1 FROM lecciones l WHERE l.codigo='LEN7-U2-L1' ON CONFLICT (codigo) DO UPDATE SET activo=TRUE RETURNING id)
INSERT INTO preguntas_ejercicio (ejercicio_id, numero_pregunta, pregunta_texto, tipo_respuesta, orden)
SELECT e.id, 1, '¿Dónde escribes? Usas el...?', 'unica', 1 FROM ejer e ON CONFLICT DO NOTHING;

INSERT INTO opciones_respuesta (pregunta_id, texto, es_correcta, retroalimentacion, orden)
SELECT p.id, 'Lápiz', TRUE, '¡Correcto!', 1 FROM preguntas_ejercicio p WHERE p.ejercicio_id IN (SELECT id FROM ejercicios WHERE codigo='LEN7-U2-L1-E1')
UNION ALL SELECT p.id, 'Mesa', FALSE, 'La mesa es donde te sientas.', 2 FROM preguntas_ejercicio p WHERE p.ejercicio_id IN (SELECT id FROM ejercicios WHERE codigo='LEN7-U2-L1-E1')
ON CONFLICT (pregunta_id, orden) DO NOTHING;

-- INGLÉS: Name and Age
WITH malla AS (SELECT id FROM malla_curricular WHERE codigo_unidad='ENG7-U2' LIMIT 1),
lec AS (INSERT INTO lecciones (malla_id, codigo, titulo, descripcion, objetivo_aprendizaje, duracion_minutos, dificultad, orden, publicado)
SELECT m.id, 'ENG7-U2-L1', 'My name and age', 'Introduce yourself.', 'Students will say name and age.', 45, 1, 1, TRUE FROM malla m ON CONFLICT (codigo) DO UPDATE SET activo=TRUE, publicado=TRUE RETURNING id)
INSERT INTO contenidos_leccion (leccion_id, idioma_id, tipo_contenido, orden) SELECT l.id, i.id, 'texto', 1 FROM lec l, idiomas i WHERE i.codigo='en' ON CONFLICT DO NOTHING;

INSERT INTO textos_leccion (contenido_id, titulo, cuerpo, nivel_lectura)
SELECT cl.id, 'Name and Age', 'Questions:
- What is your name?
- How old are you?

Answers:
- My name is...
- I am ... years old

Example:
Teacher: What is your name?
Student: My name is María.
Teacher: How old are you?
Student: I am 12 years old.', 'basico'
FROM contenidos_leccion cl JOIN lecciones l ON l.id=cl.leccion_id JOIN idiomas i ON i.id=cl.idioma_id
WHERE l.codigo='ENG7-U2-L1' AND i.codigo='en' AND cl.tipo_contenido='texto' LIMIT 1;

WITH ejer AS (INSERT INTO ejercicios (leccion_id, codigo, titulo, instruccion, tipo_ejercicio, dificultad, puntos_maximos, orden)
SELECT l.id, 'ENG7-U2-L1-E1', 'Complete', 'Select the answer.', 'seleccion_unica', 1, 10, 1 FROM lecciones l WHERE l.codigo='ENG7-U2-L1' ON CONFLICT (codigo) DO UPDATE SET activo=TRUE RETURNING id)
INSERT INTO preguntas_ejercicio (ejercicio_id, numero_pregunta, pregunta_texto, tipo_respuesta, orden)
SELECT e.id, 1, 'Teacher: What is your name? Student: ___ name is Carlos.', 'unica', 1 FROM ejer e ON CONFLICT DO NOTHING;

INSERT INTO opciones_respuesta (pregunta_id, texto, es_correcta, retroalimentacion, orden)
SELECT p.id, 'My', TRUE, 'Correct!', 1 FROM preguntas_ejercicio p WHERE p.ejercicio_id IN (SELECT id FROM ejercicios WHERE codigo='ENG7-U2-L1-E1')
UNION ALL SELECT p.id, 'Your', FALSE, 'No.', 2 FROM preguntas_ejercicio p WHERE p.ejercicio_id IN (SELECT id FROM ejercicios WHERE codigo='ENG7-U2-L1-E1')
ON CONFLICT (pregunta_id, orden) DO NOTHING;

-- INGLÉS: Where are you from?
WITH malla AS (SELECT id FROM malla_curricular WHERE codigo_unidad='ENG7-U2' LIMIT 1),
lec AS (INSERT INTO lecciones (malla_id, codigo, titulo, descripcion, objetivo_aprendizaje, duracion_minutos, dificultad, orden, publicado)
SELECT m.id, 'ENG7-U2-L2', 'Where are you from?', 'Country and nationality.', 'Students will ask about origin.', 45, 1, 2, TRUE FROM malla m ON CONFLICT (codigo) DO UPDATE SET activo=TRUE, publicado=TRUE RETURNING id)
INSERT INTO contenidos_leccion (leccion_id, idioma_id, tipo_contenido, orden) SELECT l.id, i.id, 'texto', 1 FROM lec l, idiomas i WHERE i.codigo='en' ON CONFLICT DO NOTHING;

INSERT INTO textos_leccion (contenido_id, titulo, cuerpo, nivel_lectura)
SELECT cl.id, 'Country', 'Questions:
- Where are you from?
- What is your nationality?

Answers:
- I am from Nicaragua.
- I am Nicaraguan.

Countries:
- Nicaragua - Nicaraguan
- Costa Rica - Costa Rican
- Mexico - Mexican', 'basico'
FROM contenidos_leccion cl JOIN lecciones l ON l.id=cl.leccion_id JOIN idiomas i ON i.id=cl.idioma_id
WHERE l.codigo='ENG7-U2-L2' AND i.codigo='en' AND cl.tipo_contenido='texto' LIMIT 1;

-- INGLÉS: Family
WITH malla AS (SELECT id FROM malla_curricular WHERE codigo_unidad='ENG7-U3' LIMIT 1),
lec AS (INSERT INTO lecciones (malla_id, codigo, titulo, descripcion, objetivo_aprendizaje, duracion_minutos, dificultad, orden, publicado)
SELECT m.id, 'ENG7-U3-L1', 'My family', 'Family members.', 'Students will identify family.', 45, 1, 1, TRUE FROM malla m ON CONFLICT (codigo) DO UPDATE SET activo=TRUE, publicado=TRUE RETURNING id)
INSERT INTO contenidos_leccion (leccion_id, idioma_id, tipo_contenido, orden) SELECT l.id, i.id, 'texto', 1 FROM lec l, idiomas i WHERE i.codigo='en' ON CONFLICT DO NOTHING;

INSERT INTO textos_leccion (contenido_id, titulo, cuerpo, nivel_lectura)
SELECT cl.id, 'Family', 'Family:
- mother, father
- sister, brother
- grandmother, grandfather
- aunt, uncle, cousin

Example: This is my mother.', 'basico'
FROM contenidos_leccion cl JOIN lecciones l ON l.id=cl.leccion_id JOIN idiomas i ON i.id=cl.idioma_id
WHERE l.codigo='ENG7-U3-L1' AND i.codigo='en' AND cl.tipo_contenido='texto' LIMIT 1;

WITH ejer AS (INSERT INTO ejercicios (leccion_id, codigo, titulo, instruccion, tipo_ejercicio, dificultad, puntos_maximos, orden)
SELECT l.id, 'ENG7-U3-L1-E1', 'Family', 'Select correct word.', 'seleccion_unica', 1, 10, 1 FROM lecciones l WHERE l.codigo='ENG7-U3-L1' ON CONFLICT (codigo) DO UPDATE SET activo=TRUE RETURNING id)
INSERT INTO preguntas_ejercicio (ejercicio_id, numero_pregunta, pregunta_texto, tipo_respuesta, orden)
SELECT e.id, 1, 'Your father''s sister is your...?', 'unica', 1 FROM ejer e ON CONFLICT DO NOTHING;

INSERT INTO opciones_respuesta (pregunta_id, texto, es_correcta, retroalimentacion, orden)
SELECT p.id, 'Aunt', TRUE, 'Correct!', 1 FROM preguntas_ejercicio p WHERE p.ejercicio_id IN (SELECT id FROM ejercicios WHERE codigo='ENG7-U3-L1-E1')
UNION ALL SELECT p.id, 'Cousin', FALSE, 'No.', 2 FROM preguntas_ejercicio p WHERE p.ejercicio_id IN (SELECT id FROM ejercicios WHERE codigo='ENG7-U3-L1-E1')
ON CONFLICT (pregunta_id, orden) DO NOTHING;

-- INGLÉS: Numbers 1-20
WITH malla AS (SELECT id FROM malla_curricular WHERE codigo_unidad='ENG7-U4' LIMIT 1),
lec AS (INSERT INTO lecciones (malla_id, codigo, titulo, descripcion, objetivo_aprendizaje, duracion_minutos, dificultad, orden, publicado)
SELECT m.id, 'ENG7-U4-L1', 'Numbers 1-20', 'Count 1-20.', 'Students will count.', 45, 1, 1, TRUE FROM malla m ON CONFLICT (codigo) DO UPDATE SET activo=TRUE, publicado=TRUE RETURNING id)
INSERT INTO contenidos_leccion (leccion_id, idioma_id, tipo_contenido, orden) SELECT l.id, i.id, 'texto', 1 FROM lec l, idiomas i WHERE i.codigo='en' ON CONFLICT DO NOTHING;

INSERT INTO textos_leccion (contenido_id, titulo, cuerpo, nivel_lectura)
SELECT cl.id, 'Numbers', '1-one, 2-two, 3-three, 4-four, 5-five
6-six, 7-seven, 8-eight, 9-nine, 10-ten
11-eleven, 12-twelve, 13-thirteen, 14-fourteen, 15-fifteen
16-sixteen, 17-seventeen, 18-eighteen, 19-nineteen, 20-twenty', 'basico'
FROM contenidos_leccion cl JOIN lecciones l ON l.id=cl.leccion_id JOIN idiomas i ON i.id=cl.idioma_id
WHERE l.codigo='ENG7-U4-L1' AND i.codigo='en' AND cl.tipo_contenido='texto' LIMIT 1;

-- INGLÉS: Colors
WITH malla AS (SELECT id FROM malla_curricular WHERE codigo_unidad='ENG7-U4' LIMIT 1),
lec AS (INSERT INTO lecciones (malla_id, codigo, titulo, descripcion, objetivo_aprendizaje, duracion_minutos, dificultad, orden, publicado)
SELECT m.id, 'ENG7-U4-L2', 'Colors', 'Learn colors.', 'Students will use colors.', 45, 1, 2, TRUE FROM malla m ON CONFLICT (codigo) DO UPDATE SET activo=TRUE, publicado=TRUE RETURNING id)
INSERT INTO contenidos_leccion (leccion_id, idioma_id, tipo_contenido, orden) SELECT l.id, i.id, 'texto', 1 FROM lec l, idiomas i WHERE i.codigo='en' ON CONFLICT DO NOTHING;

INSERT INTO textos_leccion (contenido_id, titulo, cuerpo, nivel_lectura)
SELECT cl.id, 'Colors', 'Colors:
red, blue, yellow, green, white, black
orange, purple, pink, brown

Example: The book is blue.', 'basico'
FROM contenidos_leccion cl JOIN lecciones l ON l.id=cl.leccion_id JOIN idiomas i ON i.id=cl.idioma_id
WHERE l.codigo='ENG7-U4-L2' AND i.codigo='en' AND cl.tipo_contenido='texto' LIMIT 1;

WITH ejer AS (INSERT INTO ejercicios (leccion_id, codigo, titulo, instruccion, tipo_ejercicio, dificultad, puntos_maximos, orden)
SELECT l.id, 'ENG7-U4-L2-E1', 'Colors', 'Select color.', 'seleccion_unica', 1, 10, 1 FROM lecciones l WHERE l.codigo='ENG7-U4-L2' ON CONFLICT (codigo) DO UPDATE SET activo=TRUE RETURNING id)
INSERT INTO preguntas_ejercicio (ejercicio_id, numero_pregunta, pregunta_texto, tipo_respuesta, orden)
SELECT e.id, 1, 'The sky is...?', 'unica', 1 FROM ejer e ON CONFLICT DO NOTHING;

INSERT INTO opciones_respuesta (pregunta_id, texto, es_correcta, retroalimentacion, orden)
SELECT p.id, 'Blue', TRUE, 'Correct!', 1 FROM preguntas_ejercicio p WHERE p.ejercicio_id IN (SELECT id FROM ejercicios WHERE codigo='ENG7-U4-L2-E1')
UNION ALL SELECT p.id, 'Red', FALSE, 'No.', 2 FROM preguntas_ejercicio p WHERE p.ejercicio_id IN (SELECT id FROM ejercicios WHERE codigo='ENG7-U4-L2-E1')
ON CONFLICT (pregunta_id, orden) DO NOTHING;

-- MISKITO: Familia
WITH malla AS (SELECT id FROM malla_curricular WHERE codigo_unidad='MIS7-U2' LIMIT 1),
lec AS (INSERT INTO lecciones (malla_id, codigo, titulo, descripcion, objetivo_aprendizaje, duracion_minutos, dificultad, orden, publicado)
SELECT m.id, 'MIS7-U2-L1', 'Mi familia', 'Familia en miskito.', 'Identifica familia.', 45, 1, 1, TRUE FROM malla m ON CONFLICT (codigo) DO UPDATE SET activo=TRUE, publicado=TRUE RETURNING id)
INSERT INTO contenidos_leccion (leccion_id, idioma_id, tipo_contenido, orden) SELECT l.id, i.id, 'texto', 1 FROM lec l, idiomas i WHERE i.codigo='miq' ON CONFLICT DO NOTHING;

INSERT INTO textos_leccion (contenido_id, titulo, cuerpo, nivel_lectura)
SELECT cl.id, 'Familia', 'Familia:
- nana (madre), tata (padre)
- witin (hermano/a)
- abula (abuela), abulu (abuelo)
- tía, tío, primu

Ejemplo: Nana tika bien.', 'basico'
FROM contenidos_leccion cl JOIN lecciones l ON l.id=cl.leccion_id JOIN idiomas i ON i.id=cl.idioma_id
WHERE l.codigo='MIS7-U2-L1' AND i.codigo='miq' AND cl.tipo_contenido='texto' LIMIT 1;

WITH ejer AS (INSERT INTO ejercicios (leccion_id, codigo, titulo, instruccion, tipo_ejercicio, dificultad, puntos_maximos, orden)
SELECT l.id, 'MIS7-U2-L1-E1', 'Familia', 'Selecciona palabra.', 'seleccion_unica', 1, 10, 1 FROM lecciones l WHERE l.codigo='MIS7-U2-L1' ON CONFLICT (codigo) DO UPDATE SET activo=TRUE RETURNING id)
INSERT INTO preguntas_ejercicio (ejercicio_id, numero_pregunta, pregunta_texto, tipo_respuesta, orden)
SELECT e.id, 1, '¿"Madre" en miskito?', 'unica', 1 FROM ejer e ON CONFLICT DO NOTHING;

INSERT INTO opciones_respuesta (pregunta_id, texto, es_correcta, retroalimentacion, orden)
SELECT p.id, 'Nana', TRUE, '¡Correcto!', 1 FROM preguntas_ejercicio p WHERE p.ejercicio_id IN (SELECT id FROM ejercicios WHERE codigo='MIS7-U2-L1-E1')
UNION ALL SELECT p.id, 'Tata', FALSE, 'No, tata es padre.', 2 FROM preguntas_ejercicio p WHERE p.ejercicio_id IN (SELECT id FROM ejercicios WHERE codigo='MIS7-U2-L1-E1')
ON CONFLICT (pregunta_id, orden) DO NOTHING;

-- MISKITO: Números
WITH malla AS (SELECT id FROM malla_curricular WHERE codigo_unidad='MIS7-U2' LIMIT 1),
lec AS (INSERT INTO lecciones (malla_id, codigo, titulo, descripcion, objetivo_aprendizaje, duracion_minutos, dificultad, orden, publicado)
SELECT m.id, 'MIS7-U2-L2', 'Números 1-10', 'Cuenta 1-10.', 'Estudiantes contarán.', 45, 1, 2, TRUE FROM malla m ON CONFLICT (codigo) DO UPDATE SET activo=TRUE, publicado=TRUE RETURNING id)
INSERT INTO contenidos_leccion (leccion_id, idioma_id, tipo_contenido, orden) SELECT l.id, i.id, 'texto', 1 FROM lec l, idiomas i WHERE i.codigo='miq' ON CONFLICT DO NOTHING;

INSERT INTO textos_leccion (contenido_id, titulo, cuerpo, nivel_lectura)
SELECT cl.id, 'Números', 'Números:
1-wan, 2-dawan, 3-tawan, 4-nani, 5-tawa
6-tawa-wan, 7-tawa-dawan, 8-tawa-tawan, 9-tawa-nani, 10-tawa-tawa', 'basico'
FROM contenidos_leccion cl JOIN lecciones l ON l.id=cl.leccion_id JOIN idiomas i ON i.id=cl.idioma_id
WHERE l.codigo='MIS7-U2-L2' AND i.codigo='miq' AND cl.tipo_contenido='texto' LIMIT 1;

-- KRIOL: Famili
WITH malla AS (SELECT id FROM malla_curricular WHERE codigo_unidad='KRI7-U2' LIMIT 1),
lec AS (INSERT INTO lecciones (malla_id, codigo, titulo, descripcion, objetivo_aprendizaje, duracion_minutos, dificultad, orden, publicado)
SELECT m.id, 'KRI7-U2-L1', 'Mi famili', 'Famili in Kriol.', 'Identify famili.', 45, 1, 1, TRUE FROM malla m ON CONFLICT (codigo) DO UPDATE SET activo=TRUE, publicado=TRUE RETURNING id)
INSERT INTO contenidos_leccion (leccion_id, idioma_id, tipo_contenido, orden) SELECT l.id, i.id, 'texto', 1 FROM lec l, idiomas i WHERE i.codigo='ncr' ON CONFLICT DO NOTHING;

INSERT INTO textos_leccion (contenido_id, titulo, cuerpo, nivel_lectura)
SELECT cl.id, 'Famili', 'Famili:
- mada (madre), fada (padre)
- sista, brada
- grandmada, grandfada
- anti, onkol, kosin

Ejemplo: Mi mada niem María.', 'basico'
FROM contenidos_leccion cl JOIN lecciones l ON l.id=cl.leccion_id JOIN idiomas i ON i.id=cl.idioma_id
WHERE l.codigo='KRI7-U2-L1' AND i.codigo='ncr' AND cl.tipo_contenido='texto' LIMIT 1;

WITH ejer AS (INSERT INTO ejercicios (leccion_id, codigo, titulo, instruccion, tipo_ejercicio, dificultad, puntos_maximos, orden)
SELECT l.id, 'KRI7-U2-L1-E1', 'Famili', 'Select word.', 'seleccion_unica', 1, 10, 1 FROM lecciones l WHERE l.codigo='KRI7-U2-L1' ON CONFLICT (codigo) DO UPDATE SET activo=TRUE RETURNING id)
INSERT INTO preguntas_ejercicio (ejercicio_id, numero_pregunta, pregunta_texto, tipo_respuesta, orden)
SELECT e.id, 1, 'Wata yu fada''s brada niem?', 'unica', 1 FROM ejer e ON CONFLICT DO NOTHING;

INSERT INTO opciones_respuesta (pregunta_id, texto, es_correcta, retroalimentacion, orden)
SELECT p.id, 'Onkol', TRUE, 'Korek!', 1 FROM preguntas_ejercicio p WHERE p.ejercicio_id IN (SELECT id FROM ejercicios WHERE codigo='KRI7-U2-L1-E1')
UNION ALL SELECT p.id, 'Kosin', FALSE, 'No.', 2 FROM preguntas_ejercicio p WHERE p.ejercicio_id IN (SELECT id FROM ejercicios WHERE codigo='KRI7-U2-L1-E1')
ON CONFLICT (pregunta_id, orden) DO NOTHING;

-- KRIOL: Nomba
WITH malla AS (SELECT id FROM malla_curricular WHERE codigo_unidad='KRI7-U2' LIMIT 1),
lec AS (INSERT INTO lecciones (malla_id, codigo, titulo, descripcion, objetivo_aprendizaje, duracion_minutos, dificultad, orden, publicado)
SELECT m.id, 'KRI7-U2-L2', 'Nomba 1-10', 'Count 1-10.', 'Students will count.', 45, 1, 2, TRUE FROM malla m ON CONFLICT (codigo) DO UPDATE SET activo=TRUE, publicado=TRUE RETURNING id)
INSERT INTO contenidos_leccion (leccion_id, idioma_id, tipo_contenido, orden) SELECT l.id, i.id, 'texto', 1 FROM lec l, idiomas i WHERE i.codigo='ncr' ON CONFLICT DO NOTHING;

INSERT INTO textos_leccion (contenido_id, titulo, cuerpo, nivel_lectura)
SELECT cl.id, 'Nomba', 'Nomba:
1-wan, 2-tuu, 3-chrii, 4-faa, 5-faiv
6-siks, 7-seven, 8-eight, 9-nain, 10-ten', 'basico'
FROM contenidos_leccion cl JOIN lecciones l ON l.id=cl.leccion_id JOIN idiomas i ON i.id=cl.idioma_id
WHERE l.codigo='KRI7-U2-L2' AND i.codigo='ncr' AND cl.tipo_contenido='texto' LIMIT 1;

-- LOGROS
INSERT INTO logros (codigo, nombre, descripcion, icono, categoria, puntos_requeridos, nivel_requerido, visible)
VALUES ('septimo_vocabulary_master', 'Maestro vocabulario', 'Completa 10 lecciones vocabulario.', 'book-open', 'vocabulario', 100, 2, TRUE),
       ('septimo_numbers', 'Experto números', 'Completa números en 4 idiomas.', 'calculator', 'numeros', 75, 2, TRUE),
       ('septimo_family', 'Experto familia', 'Completa familia en 4 idiomas.', 'users', 'familia', 75, 2, TRUE)
ON CONFLICT (codigo) DO UPDATE SET activo=TRUE;

-- NOTAS: Lecciones idiomas séptimo. Ejecutar después de 005_malla_septimo.sql y 004_lecciones_septimo_grado.sql.
