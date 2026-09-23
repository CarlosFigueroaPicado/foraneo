-- ============================================================================
-- FORÁNEO - Malla Curricular Séptimo Grado
-- Basado en documentos oficiales MINED: Malla Curricular 7°-9° grado
-- Fuente: https://nicaraguaeduca.mined.gob.ni/ y Biblioteca Digital MINED
-- ============================================================================

-- ============================================================================
-- ÁREAS CURRICULARES SÉPTIMO GRADO
-- ============================================================================

INSERT INTO areas_curriculares (codigo, nombre, descripcion, color, icono, orden)
VALUES
    ('lengua_literatura_7', 'Lengua y Literatura 7°', 'Comunicación oral, lectura, escritura y literatura nicaragüense.', '#7C3AED', 'book-open', 1),
    ('ingles_7', 'Inglés 7°', 'Inglés como lengua adicional - nivel A1.', '#2563EB', 'languages', 2),
    ('lenguas_originarias_7', 'Lenguas Originarias 7°', 'Miskito y Kriol - enfoque intercultural bilingüe SEAR.', '#059669', 'message-circle', 3),
    ('matematica_7', 'Matemática 7°', 'Números naturales, fracciones, geometría básica.', '#DC2626', 'calculator', 4),
    ('ciencias_naturales_7', 'Ciencias Naturales 7°', 'Seres vivos, materia, energía y ambiente.', '#EA580C', 'flask-conical', 5),
    ('ciencias_sociales_7', 'Ciencias Sociales 7°', 'Historia, geografía y ciudadanía nicaragüense.', '#CA8A04', 'landmark', 6)
ON CONFLICT (codigo) DO UPDATE
SET nombre = EXCLUDED.nombre,
    descripcion = EXCLUDED.descripcion,
    color = EXCLUDED.color,
    icono = EXCLUDED.icono,
    orden = EXCLUDED.orden,
    activo = TRUE;

-- ============================================================================
-- MALLA CURRICULAR - LENGUA Y LITERATURA 7° GRADO
-- Basado en MINED: Lengua y Literatura Séptimo Grado
-- ============================================================================

WITH grado_7 AS (
    SELECT id FROM grados WHERE codigo = '7' LIMIT 1
), area_len AS (
    SELECT id FROM areas_curriculares WHERE codigo = 'lengua_literatura_7' LIMIT 1
)
INSERT INTO malla_curricular (grado_id, area_id, codigo_unidad, nombre_unidad, descripcion_unidad, duracion_semanas, orden)
SELECT 
    g.id,
    a.id,
    'LEN7-U1',
    'La comunicación y el lenguaje',
    'Elementos del proceso comunicativo, funciones del lenguaje y variedades lingüísticas.',
    6,
    1
FROM grado_7 g, area_len a
ON CONFLICT DO NOTHING;

WITH grado_7 AS (
    SELECT id FROM grados WHERE codigo = '7' LIMIT 1
), area_len AS (
    SELECT id FROM areas_curriculares WHERE codigo = 'lengua_literatura_7' LIMIT 1
)
INSERT INTO malla_curricular (grado_id, area_id, codigo_unidad, nombre_unidad, descripcion_unidad, duracion_semanas, orden)
SELECT 
    g.id,
    a.id,
    'LEN7-U2',
    'Comprensión lectora',
    'Estrategias de lectura literal, inferencial y crítica. Tipos de texto.',
    8,
    2
FROM grado_7 g, area_len a
ON CONFLICT DO NOTHING;

WITH grado_7 AS (
    SELECT id FROM grados WHERE codigo = '7' LIMIT 1
), area_len AS (
    SELECT id FROM areas_curriculares WHERE codigo = 'lengua_literatura_7' LIMIT 1
)
INSERT INTO malla_curricular (grado_id, area_id, codigo_unidad, nombre_unidad, descripcion_unidad, duracion_semanas, orden)
SELECT 
    g.id,
    a.id,
    'LEN7-U3',
    'Producción de textos',
    'Escritura de párrafos, cuentos y descripciones. Ortografía y gramática.',
    8,
    3
FROM grado_7 g, area_len a
ON CONFLICT DO NOTHING;

WITH grado_7 AS (
    SELECT id FROM grados WHERE codigo = '7' LIMIT 1
), area_len AS (
    SELECT id FROM areas_curriculares WHERE codigo = 'lengua_literatura_7' LIMIT 1
)
INSERT INTO malla_curricular (grado_id, area_id, codigo_unidad, nombre_unidad, descripcion_unidad, duracion_semanas, orden)
SELECT 
    g.id,
    a.id,
    'LEN7-U4',
    'Literatura nicaragüense',
    'Autores nacionales: Rubén Darío, cuentos y leyendas de Nicaragua.',
    6,
    4
FROM grado_7 g, area_len a
ON CONFLICT DO NOTHING;

-- ============================================================================
-- MALLA CURRICULAR - INGLÉS 7° GRADO
-- Basado en MINED: Módulo Autoformativo English 7th Grade
-- Nivel A1 (Marco Común Europeo)
-- ============================================================================

WITH grado_7 AS (
    SELECT id FROM grados WHERE codigo = '7' LIMIT 1
), area_eng AS (
    SELECT id FROM areas_curriculares WHERE codigo = 'ingles_7' LIMIT 1
)
INSERT INTO malla_curricular (grado_id, area_id, codigo_unidad, nombre_unidad, descripcion_unidad, duracion_semanas, orden)
SELECT 
    g.id,
    a.id,
    'ENG7-U1',
    'Greetings and introductions',
    'Saludos, presentaciones personales y de otras personas.',
    4,
    1
FROM grado_7 g, area_eng a
ON CONFLICT DO NOTHING;

WITH grado_7 AS (
    SELECT id FROM grados WHERE codigo = '7' LIMIT 1
), area_eng AS (
    SELECT id FROM areas_curriculares WHERE codigo = 'ingles_7' LIMIT 1
)
INSERT INTO malla_curricular (grado_id, area_id, codigo_unidad, nombre_unidad, descripcion_unidad, duracion_semanas, orden)
SELECT 
    g.id,
    a.id,
    'ENG7-U2',
    'Personal information',
    'Nombre, edad, nacionalidad, dirección y ocupación.',
    4,
    2
FROM grado_7 g, area_eng a
ON CONFLICT DO NOTHING;

WITH grado_7 AS (
    SELECT id FROM grados WHERE codigo = '7' LIMIT 1
), area_eng AS (
    SELECT id FROM areas_curriculares WHERE codigo = 'ingles_7' LIMIT 1
)
INSERT INTO malla_curricular (grado_id, area_id, codigo_unidad, nombre_unidad, descripcion_unidad, duracion_semanas, orden)
SELECT 
    g.id,
    a.id,
    'ENG7-U3',
    'Family and friends',
    'Miembros de la familia, descripciones físicas y de personalidad.',
    6,
    3
FROM grado_7 g, area_eng a
ON CONFLICT DO NOTHING;

WITH grado_7 AS (
    SELECT id FROM grados WHERE codigo = '7' LIMIT 1
), area_eng AS (
    SELECT id FROM areas_curriculares WHERE codigo = 'ingles_7' LIMIT 1
)
INSERT INTO malla_curricular (grado_id, area_id, codigo_unidad, nombre_unidad, descripcion_unidad, duracion_semanas, orden)
SELECT 
    g.id,
    a.id,
    'ENG7-U4',
    'Daily routines',
    'Actividades diarias, horas y rutinas escolares.',
    6,
    4
FROM grado_7 g, area_eng a
ON CONFLICT DO NOTHING;

-- ============================================================================
-- MALLA CURRICULAR - LENGUAS ORIGINARIAS 7° GRADO
-- Basado en SEAR/URACCAN: Educación Intercultural Bilingüe
-- ============================================================================

WITH grado_7 AS (
    SELECT id FROM grados WHERE codigo = '7' LIMIT 1
), area_loa AS (
    SELECT id FROM areas_curriculares WHERE codigo = 'lenguas_originarias_7' LIMIT 1
)
INSERT INTO malla_curricular (grado_id, area_id, codigo_unidad, nombre_unidad, descripcion_unidad, duracion_semanas, orden)
SELECT 
    g.id,
    a.id,
    'MIS7-U1',
    'Salutat y comunicación básica (Miskito)',
    'Saludos, presentaciones y expresiones cotidianas en miskito.',
    6,
    1
FROM grado_7 g, area_loa a
ON CONFLICT DO NOTHING;

WITH grado_7 AS (
    SELECT id FROM grados WHERE codigo = '7' LIMIT 1
), area_loa AS (
    SELECT id FROM areas_curriculares WHERE codigo = 'lenguas_originarias_7' LIMIT 1
)
INSERT INTO malla_curricular (grado_id, area_id, codigo_unidad, nombre_unidad, descripcion_unidad, duracion_semanas, orden)
SELECT 
    g.id,
    a.id,
    'MIS7-U2',
    'Familia y comunidad (Miskito)',
    'Vocabulario de familia, personas y vida comunitaria.',
    6,
    2
FROM grado_7 g, area_loa a
ON CONFLICT DO NOTHING;

WITH grado_7 AS (
    SELECT id FROM grados WHERE codigo = '7' LIMIT 1
), area_loa AS (
    SELECT id FROM areas_curriculares WHERE codigo = 'lenguas_originarias_7' LIMIT 1
)
INSERT INTO malla_curricular (grado_id, area_id, codigo_unidad, nombre_unidad, descripcion_unidad, duracion_semanas, orden)
SELECT 
    g.id,
    a.id,
    'KRI7-U1',
    'Greetingz and introductions (Kriol)',
    'Saludos, presentaciones y expresiones cotidianas en kriol.',
    6,
    3
FROM grado_7 g, area_loa a
ON CONFLICT DO NOTHING;

WITH grado_7 AS (
    SELECT id FROM grados WHERE codigo = '7' LIMIT 1
), area_loa AS (
    SELECT id FROM areas_curriculares WHERE codigo = 'lenguas_originarias_7' LIMIT 1
)
INSERT INTO malla_curricular (grado_id, area_id, codigo_unidad, nombre_unidad, descripcion_unidad, duracion_semanas, orden)
SELECT 
    g.id,
    a.id,
    'KRI7-U2',
    'Famili and komiuniti (Kriol)',
    'Vocabulario de familia, personas y vida comunitaria en kriol.',
    6,
    4
FROM grado_7 g, area_loa a
ON CONFLICT DO NOTHING;

-- ============================================================================
-- COMPETENCIAS POR UNIDAD - LENGUA Y LITERATURA
-- ============================================================================

WITH malla AS (
    SELECT id FROM malla_curricular WHERE codigo_unidad = 'LEN7-U1' LIMIT 1
)
INSERT INTO competencias (malla_id, codigo, descripcion, indicador_logro, orden)
SELECT 
    m.id,
    'LEN7-U1-C1',
    'Comprende el proceso de comunicación como base para la interacción social.',
    'Identifica los elementos del proceso comunicativo en situaciones cotidianas y escolares.',
    1
FROM malla m
ON CONFLICT DO NOTHING;

WITH malla AS (
    SELECT id FROM malla_curricular WHERE codigo_unidad = 'LEN7-U1' LIMIT 1
)
INSERT INTO competencias (malla_id, codigo, descripcion, indicador_logro, orden)
SELECT 
    m.id,
    'LEN7-U1-C2',
    'Reconoce las funciones del lenguaje en diferentes contextos comunicativos.',
    'Distingue las funciones del lenguaje en textos orales y escritos.',
    2
FROM malla m
ON CONFLICT DO NOTHING;

WITH malla AS (
    SELECT id FROM malla_curricular WHERE codigo_unidad = 'LEN7-U1' LIMIT 1
)
INSERT INTO competencias (malla_id, codigo, descripcion, indicador_logro, orden)
SELECT 
    m.id,
    'LEN7-U1-C3',
    'Valora la diversidad lingüística de Nicaragua.',
    'Identifica las variedades dialectales del español en Nicaragua.',
    3
FROM malla m
ON CONFLICT DO NOTHING;

-- ============================================================================
-- COMPETENCIAS - INGLÉS
-- ============================================================================

WITH malla AS (
    SELECT id FROM malla_curricular WHERE codigo_unidad = 'ENG7-U1' LIMIT 1
)
INSERT INTO competencias (malla_id, codigo, descripcion, indicador_logro, orden)
SELECT 
    m.id,
    'ENG7-U1-C1',
    'Uses basic greetings and farewells appropriately.',
    'Students will greet people according to time of day and context.',
    1
FROM malla m
ON CONFLICT DO NOTHING;

WITH malla AS (
    SELECT id FROM malla_curricular WHERE codigo_unidad = 'ENG7-U1' LIMIT 1
)
INSERT INTO competencias (malla_id, codigo, descripcion, indicador_logro, orden)
SELECT 
    m.id,
    'ENG7-U1-C2',
    'Introduces themselves and others using simple structures.',
    'Students will introduce themselves and classmates confidently.',
    2
FROM malla m
ON CONFLICT DO NOTHING;

-- ============================================================================
-- COMPETENCIAS - LENGUAS ORIGINARIAS
-- ============================================================================

WITH malla AS (
    SELECT id FROM malla_curricular WHERE codigo_unidad = 'MIS7-U1' LIMIT 1
)
INSERT INTO competencias (malla_id, codigo, descripcion, indicador_logro, orden)
SELECT 
    m.id,
    'MIS7-U1-C1',
    'Saluda apropiadamente en miskito según el contexto.',
    'Los estudiantes usarán saludos miskitos correctamente.',
    1
FROM malla m
ON CONFLICT DO NOTHING;

WITH malla AS (
    SELECT id FROM malla_curricular WHERE codigo_unidad = 'KRI7-U1' LIMIT 1
)
INSERT INTO competencias (malla_id, codigo, descripcion, indicador_logro, orden)
SELECT 
    m.id,
    'KRI7-U1-C1',
    'Greets appropriately in Kriol according to context.',
    'Students will use Kriol greetings correctly.',
    1
FROM malla m
ON CONFLICT DO NOTHING;

-- ============================================================================
-- NOTAS PARA DOCENTES
-- ============================================================================

-- Esta malla curricular está basada en documentos oficiales del MINED.
-- Las unidades pueden expandirse con más competencias según el plan anual.
-- Las lecciones deben insertarse referenciando el malla_id correspondiente.
