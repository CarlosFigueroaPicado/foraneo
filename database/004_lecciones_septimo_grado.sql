-- ============================================================================
-- FORÁNEO - Lecciones completas Séptimo Grado
-- Vinculadas a la malla curricular MINED/SEAR/URACCAN
-- Ejecutar DESPUÉS de 005_malla_septimo.sql
-- ============================================================================

-- UNIDAD 1: LA COMUNICACIÓN (Español) - Malla: LEN7-U1
WITH malla_com AS (SELECT id FROM malla_curricular WHERE codigo_unidad = 'LEN7-U1' LIMIT 1),
leccion_insert AS (
  INSERT INTO lecciones (malla_id, codigo, titulo, descripcion, objetivo_aprendizaje, duracion_minutos, dificultad, orden, publicado)
  SELECT m.id, 'LEN7-U1-L1', 'La comunicación humana', 'Comprende el proceso de comunicación.', 'Identifica los elementos del proceso comunicativo.', 45, 2, 1, TRUE
  FROM malla_com m
  ON CONFLICT (codigo) DO UPDATE SET titulo=EXCLUDED.titulo, descripcion=EXCLUDED.descripcion, objetivo_aprendizaje=EXCLUDED.objetivo_aprendizaje, activo=TRUE, publicado=TRUE
  RETURNING id)
INSERT INTO contenidos_leccion (leccion_id, idioma_id, tipo_contenido, orden)
SELECT l.id, i.id, 'texto', 1 FROM leccion_insert l, idiomas i WHERE i.codigo='es' ON CONFLICT DO NOTHING;

INSERT INTO textos_leccion (contenido_id, titulo, cuerpo, nivel_lectura)
SELECT cl.id, '¿Qué es la comunicación?', 'La comunicación es el proceso mediante el cual las personas intercambian información.

Elementos:
1. Emisor: quien envía el mensaje
2. Receptor: quien recibe el mensaje
3. Mensaje: la información
4. Canal: el medio (aire, papel)
5. Código: el idioma (español, inglés, miskito, kriol)
6. Contexto: la situación

Ejemplo: Cuando saludas "¡Hola!", tú eres el emisor, tu amigo es el receptor.', 'basico'
FROM contenidos_leccion cl JOIN lecciones l ON l.id=cl.leccion_id JOIN idiomas i ON i.id=cl.idioma_id
WHERE l.codigo='LEN7-U1-L1' AND i.codigo='es' AND cl.tipo_contenido='texto' LIMIT 1;

WITH ejer AS (
  INSERT INTO ejercicios (leccion_id, codigo, titulo, instruccion, tipo_ejercicio, dificultad, puntos_maximos, orden)
  SELECT l.id, 'LEN7-U1-L1-E1', 'Identifica los elementos', 'Selecciona la respuesta correcta.', 'seleccion_unica', 2, 10, 1
  FROM lecciones l WHERE l.codigo='LEN7-U1-L1'
  ON CONFLICT (codigo) DO UPDATE SET titulo=EXCLUDED.titulo, activo=TRUE RETURNING id)
INSERT INTO preguntas_ejercicio (ejercicio_id, numero_pregunta, pregunta_texto, tipo_respuesta, orden)
SELECT e.id, 1, 'María escribe una carta a su abuela. ¿Quién es el emisor?', 'unica', 1 FROM ejer e ON CONFLICT DO NOTHING;

INSERT INTO opciones_respuesta (pregunta_id, texto, es_correcta, retroalimentacion, orden)
SELECT p.id, 'María', TRUE, '¡Correcto! María envía la carta.', 1 FROM preguntas_ejercicio p WHERE p.ejercicio_id IN (SELECT id FROM ejercicios WHERE codigo='LEN7-U1-L1-E1')
UNION ALL SELECT p.id, 'La abuela', FALSE, 'La abuela recibe.', 2 FROM preguntas_ejercicio p WHERE p.ejercicio_id IN (SELECT id FROM ejercicios WHERE codigo='LEN7-U1-L1-E1')
UNION ALL SELECT p.id, 'La carta', FALSE, 'La carta es el mensaje.', 3 FROM preguntas_ejercicio p WHERE p.ejercicio_id IN (SELECT id FROM ejercicios WHERE codigo='LEN7-U1-L1-E1')
ON CONFLICT (pregunta_id, orden) DO NOTHING;

-- UNIDAD 1: INGLÉS - GREETINGS - Malla: ENG7-U1
WITH malla_eng AS (SELECT id FROM malla_curricular WHERE codigo_unidad='ENG7-U1' LIMIT 1),
leccion_insert AS (
  INSERT INTO lecciones (malla_id, codigo, titulo, descripcion, objetivo_aprendizaje, duracion_minutos, dificultad, orden, publicado)
  SELECT m.id, 'ENG7-U1-L1', 'Greetings and farewells', 'Learn to greet people in English.', 'Students will use basic greetings.', 45, 1, 1, TRUE
  FROM malla_eng m ON CONFLICT (codigo) DO UPDATE SET titulo=EXCLUDED.titulo, activo=TRUE, publicado=TRUE RETURNING id)
INSERT INTO contenidos_leccion (leccion_id, idioma_id, tipo_contenido, orden)
SELECT l.id, i.id, 'texto', 1 FROM leccion_insert l, idiomas i WHERE i.codigo='en' ON CONFLICT DO NOTHING;

INSERT INTO textos_leccion (contenido_id, titulo, cuerpo, nivel_lectura)
SELECT cl.id, 'Common greetings', 'Formal:
- Good morning! (before 12 PM)
- Good afternoon! (after 12 PM)
- Good evening! (after 6 PM)

Informal:
- Hello!
- Hi!

Farewells:
- Goodbye!
- Bye!
- See you later!

Example:
Teacher: Good morning!
Students: Good morning!', 'basico'
FROM contenidos_leccion cl JOIN lecciones l ON l.id=cl.leccion_id JOIN idiomas i ON i.id=cl.idioma_id
WHERE l.codigo='ENG7-U1-L1' AND i.codigo='en' AND cl.tipo_contenido='texto' LIMIT 1;

WITH ejer AS (
  INSERT INTO ejercicios (leccion_id, codigo, titulo, instruccion, tipo_ejercicio, dificultad, puntos_maximos, orden)
  SELECT l.id, 'ENG7-U1-L1-E1', 'Choose the greeting', 'Select the correct greeting.', 'seleccion_unica', 1, 10, 1
  FROM lecciones l WHERE l.codigo='ENG7-U1-L1' ON CONFLICT (codigo) DO UPDATE SET activo=TRUE RETURNING id)
INSERT INTO preguntas_ejercicio (ejercicio_id, numero_pregunta, pregunta_texto, tipo_respuesta, orden)
SELECT e.id, 1, 'It is 8 AM. You see your teacher. What do you say?', 'unica', 1 FROM ejer e ON CONFLICT DO NOTHING;

INSERT INTO opciones_respuesta (pregunta_id, texto, es_correcta, retroalimentacion, orden)
SELECT p.id, 'Good morning!', TRUE, 'Correct! Before 12 PM.', 1 FROM preguntas_ejercicio p WHERE p.ejercicio_id IN (SELECT id FROM ejercicios WHERE codigo='ENG7-U1-L1-E1')
UNION ALL SELECT p.id, 'Goodbye!', FALSE, 'No, this is for leaving.', 2 FROM preguntas_ejercicio p WHERE p.ejercicio_id IN (SELECT id FROM ejercicios WHERE codigo='ENG7-U1-L1-E1')
ON CONFLICT (pregunta_id, orden) DO NOTHING;

-- UNIDAD 1: MISKITU - SALUTAT - Malla: MIS7-U1
WITH malla_mis AS (SELECT id FROM malla_curricular WHERE codigo_unidad='MIS7-U1' LIMIT 1),
leccion_insert AS (
  INSERT INTO lecciones (malla_id, codigo, titulo, descripcion, objetivo_aprendizaje, duracion_minutos, dificultad, orden, publicado)
  SELECT m.id, 'MIS7-U1-L1', 'Salutat (Saludos)', 'Aprende saludos en miskito.', 'Los estudiantes saludarán en miskito.', 45, 1, 1, TRUE
  FROM malla_mis m ON CONFLICT (codigo) DO UPDATE SET activo=TRUE, publicado=TRUE RETURNING id)
INSERT INTO contenidos_leccion (leccion_id, idioma_id, tipo_contenido, orden)
SELECT l.id, i.id, 'texto', 1 FROM leccion_insert l, idiomas i WHERE i.codigo='miq' ON CONFLICT DO NOTHING;

INSERT INTO textos_leccion (contenido_id, titulo, cuerpo, nivel_lectura)
SELECT cl.id, 'Salutat - Saludos', 'Maibila! - ¡Buenos días!
Tan prisa! - ¡Buenas tardes!
Buenas noch! - ¡Buenas noches!

¿Taya tika? - ¿Cómo estás?
Ai tika bien - Estoy bien
Dios maibila - Gracias a Dios

Adios - Adiós
Bai - Bye
Welpa - Hasta luego', 'basico'
FROM contenidos_leccion cl JOIN lecciones l ON l.id=cl.leccion_id JOIN idiomas i ON i.id=cl.idioma_id
WHERE l.codigo='MIS7-U1-L1' AND i.codigo='miq' AND cl.tipo_contenido='texto' LIMIT 1;

WITH ejer AS (
  INSERT INTO ejercicios (leccion_id, codigo, titulo, instruccion, tipo_ejercicio, dificultad, puntos_maximos, orden)
  SELECT l.id, 'MIS7-U1-L1-E1', 'Selecciona el saludo', 'Elige el saludo correcto.', 'seleccion_unica', 1, 10, 1
  FROM lecciones l WHERE l.codigo='MIS7-U1-L1' ON CONFLICT (codigo) DO UPDATE SET activo=TRUE RETURNING id)
INSERT INTO preguntas_ejercicio (ejercicio_id, numero_pregunta, pregunta_texto, tipo_respuesta, orden)
SELECT e.id, 1, 'Son las 9 AM. Llegas a la escuela. ¿Qué dices?', 'unica', 1 FROM ejer e ON CONFLICT DO NOTHING;

INSERT INTO opciones_respuesta (pregunta_id, texto, es_correcta, retroalimentacion, orden)
SELECT p.id, 'Maibila!', TRUE, '¡Correcto! Saludo de mañana.', 1 FROM preguntas_ejercicio p WHERE p.ejercicio_id IN (SELECT id FROM ejercicios WHERE codigo='MIS7-U1-L1-E1')
UNION ALL SELECT p.id, 'Bai!', FALSE, 'No, es despedida.', 2 FROM preguntas_ejercicio p WHERE p.ejercicio_id IN (SELECT id FROM ejercicios WHERE codigo='MIS7-U1-L1-E1')
ON CONFLICT (pregunta_id, orden) DO NOTHING;

-- UNIDAD 1: KRIOL - GREETINGZ - Malla: KRI7-U1
WITH malla_kri AS (SELECT id FROM malla_curricular WHERE codigo_unidad='KRI7-U1' LIMIT 1),
leccion_insert AS (
  INSERT INTO lecciones (malla_id, codigo, titulo, descripcion, objetivo_aprendizaje, duracion_minutos, dificultad, orden, publicado)
  SELECT m.id, 'KRI7-U1-L1', 'Greetingz an Farewelz', 'Learn greetings in Kriol.', 'Students will greet in Kriol.', 45, 1, 1, TRUE
  FROM malla_kri m ON CONFLICT (codigo) DO UPDATE SET activo=TRUE, publicado=TRUE RETURNING id)
INSERT INTO contenidos_leccion (leccion_id, idioma_id, tipo_contenido, orden)
SELECT l.id, i.id, 'texto', 1 FROM leccion_insert l, idiomas i WHERE i.codigo='ncr' ON CONFLICT DO NOTHING;

INSERT INTO textos_leccion (contenido_id, titulo, cuerpo, nivel_lectura)
SELECT cl.id, 'Greetingz', 'Gud morning! - Good morning!
Gud aftanun! - Good afternoon!
Gud iivnin! - Good evening!

Hai! - Hi!
Helou! - Hello!

Hau di bodi? - How are you?
Ai gud - I''m good
Tank yu - Thank you

Bai! - Bye!
Si yu lata! - See you later!', 'basico'
FROM contenidos_leccion cl JOIN lecciones l ON l.id=cl.leccion_id JOIN idiomas i ON i.id=cl.idioma_id
WHERE l.codigo='KRI7-U1-L1' AND i.codigo='ncr' AND cl.tipo_contenido='texto' LIMIT 1;

WITH ejer AS (
  INSERT INTO ejercicios (leccion_id, codigo, titulo, instruccion, tipo_ejercicio, dificultad, puntos_maximos, orden)
  SELECT l.id, 'KRI7-U1-L1-E1', 'Choose di greeting', 'Select di correct greeting.', 'seleccion_unica', 1, 10, 1
  FROM lecciones l WHERE l.codigo='KRI7-U1-L1' ON CONFLICT (codigo) DO UPDATE SET activo=TRUE RETURNING id)
INSERT INTO preguntas_ejercicio (ejercicio_id, numero_pregunta, pregunta_texto, tipo_respuesta, orden)
SELECT e.id, 1, 'It is 3 PM. Yu si yu tiicha. Wata yu se?', 'unica', 1 FROM ejer e ON CONFLICT DO NOTHING;

INSERT INTO opciones_respuesta (pregunta_id, texto, es_correcta, retroalimentacion, orden)
SELECT p.id, 'Gud aftanun!', TRUE, 'Korek! Afta 12 PM.', 1 FROM preguntas_ejercicio p WHERE p.ejercicio_id IN (SELECT id FROM ejercicios WHERE codigo='KRI7-U1-L1-E1')
UNION ALL SELECT p.id, 'Bai!', FALSE, 'No, dis is for leavin.', 2 FROM preguntas_ejercicio p WHERE p.ejercicio_id IN (SELECT id FROM ejercicios WHERE codigo='KRI7-U1-L1-E1')
ON CONFLICT (pregunta_id, orden) DO NOTHING;

-- LOGROS
INSERT INTO logros (codigo, nombre, descripcion, icono, categoria, puntos_requeridos, nivel_requerido, visible)
VALUES ('septimo_comunicacion', 'Comunicador séptimo', 'Completa lecciones de comunicación.', 'message-circle', 'lecciones', 50, 2, TRUE),
       ('septimo_ingles', 'English speaker', 'Completa lecciones de inglés.', 'languages', 'idiomas', 50, 2, TRUE),
       ('septimo_miskito', 'Salutad Miskitu', 'Completa lecciones de miskito.', 'message-circle', 'idiomas', 50, 2, TRUE),
       ('septimo_kriol', 'Kriol speaker', 'Completa lecciones de kriol.', 'languages', 'idiomas', 50, 2, TRUE),
       ('septimo_poliglota', 'Políglota costeño', 'Completa los 4 idiomas.', 'award', 'idiomas', 150, 3, TRUE)
ON CONFLICT (codigo) DO UPDATE SET nombre=EXCLUDED.nombre, visible=EXCLUDED.visible, activo=TRUE;

-- FUENTES
INSERT INTO fuentes (codigo, nombre, tipo, descripcion, url_referencia, activo)
VALUES ('MINED_LEN_7', 'MINED - Lengua 7°', 'documento', 'Libro oficial.', 'https://www.mined.gob.ni/biblioteca/product/lengua-y-literatura-septimo-grado/', TRUE),
       ('MINED_ENG_7', 'MINED - English 7°', 'documento', 'Módulo inglés.', 'https://www.mined.gob.ni/biblioteca/product-category/septimo-grado/', TRUE),
       ('SEAR_2021', 'SEAR', 'documento', 'Enfoque intercultural.', 'https://observatorio.uraccan.edu.ni/', TRUE),
       ('URACCAN_MIS', 'URACCAN - Miskitu', 'documento', 'Didáctica miskito.', 'http://repositorio.uraccan.edu.ni/289/', TRUE)
ON CONFLICT (codigo) DO UPDATE SET activo=TRUE;

-- NOTAS: Lecciones listas para estudiantes. Ejecutar después de 005_malla_septimo.sql.
