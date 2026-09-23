-- ============================================================================
-- FORÁNEO - Datos iniciales para Supabase
-- Ejecutar después de 001_schema_base.sql
-- Las expresiones en miskito y kriol deben ser cargadas únicamente tras
-- validación por hablantes y especialistas comunitarios.
-- ============================================================================

INSERT INTO idiomas (codigo, nombre, nombre_nativo, orden)
VALUES
    ('es', 'Español', 'Español', 1),
    ('en', 'Inglés estándar', 'English', 2),
    ('miq', 'Miskito nicaragüense', 'Miskitu', 3),
    ('ncr', 'Kriol nicaragüense', 'Kriol', 4)
ON CONFLICT (codigo) DO UPDATE
SET nombre = EXCLUDED.nombre,
    nombre_nativo = EXCLUDED.nombre_nativo,
    orden = EXCLUDED.orden,
    activo = TRUE;

INSERT INTO niveles_educativos (codigo, nombre, descripcion, orden)
VALUES
    ('primaria', 'Educación Primaria', 'Educación primaria regular.', 1),
    ('secundaria', 'Educación Secundaria', 'Educación secundaria regular.', 2)
ON CONFLICT (codigo) DO UPDATE
SET nombre = EXCLUDED.nombre,
    descripcion = EXCLUDED.descripcion,
    orden = EXCLUDED.orden,
    activo = TRUE;

INSERT INTO grados (nivel_id, codigo, nombre, descripcion, orden, unidad_pedagogica)
SELECT n.id, datos.codigo, datos.nombre, datos.descripcion, datos.orden, datos.unidad_pedagogica
FROM niveles_educativos n
JOIN (
    VALUES
        ('primaria', '1', 'Primer grado', 'Primer grado de primaria.', 1, 'primero-segundo'),
        ('primaria', '2', 'Segundo grado', 'Segundo grado de primaria.', 2, 'primero-segundo'),
        ('primaria', '3', 'Tercer grado', 'Tercer grado de primaria.', 3, 'tercero-cuarto'),
        ('primaria', '4', 'Cuarto grado', 'Cuarto grado de primaria.', 4, 'tercero-cuarto'),
        ('primaria', '5', 'Quinto grado', 'Quinto grado de primaria.', 5, 'quinto-sexto'),
        ('primaria', '6', 'Sexto grado', 'Sexto grado de primaria.', 6, 'quinto-sexto'),
        ('secundaria', '7', 'Séptimo grado', 'Primer año de secundaria regular.', 7, 'cuarto-ciclo'),
        ('secundaria', '8', 'Octavo grado', 'Segundo año de secundaria regular.', 8, 'cuarto-ciclo'),
        ('secundaria', '9', 'Noveno grado', 'Tercer año de secundaria regular.', 9, 'cuarto-ciclo'),
        ('secundaria', '10', 'Décimo grado', 'Cuarto año de secundaria regular.', 10, 'quinto-ciclo'),
        ('secundaria', '11', 'Undécimo grado', 'Quinto año de secundaria regular.', 11, 'quinto-ciclo')
) AS datos(nivel_codigo, codigo, nombre, descripcion, orden, unidad_pedagogica)
ON n.codigo = datos.nivel_codigo
ON CONFLICT (nivel_id, codigo) DO UPDATE
SET nombre = EXCLUDED.nombre,
    descripcion = EXCLUDED.descripcion,
    orden = EXCLUDED.orden,
    unidad_pedagogica = EXCLUDED.unidad_pedagogica,
    activo = TRUE;

INSERT INTO areas_curriculares (codigo, nombre, descripcion, color, icono, orden)
VALUES
    ('lengua_literatura', 'Lengua y Literatura', 'Comunicación oral, lectura, escritura y literatura.', '#7C3AED', 'book-open', 1),
    ('ingles', 'Inglés', 'Aprendizaje de inglés estándar como lengua adicional.', '#2563EB', 'languages', 2),
    ('lenguas_originarias', 'Lenguas Originarias y Afrodescendientes', 'Aprendizaje y fortalecimiento de miskito y kriol según el contexto educativo.', '#059669', 'message-circle', 3),
    ('matematica', 'Matemática', 'Pensamiento lógico, números, geometría y resolución de problemas.', '#DC2626', 'calculator', 4),
    ('ciencias_naturales', 'Ciencias Naturales', 'Exploración del ambiente, seres vivos, materia y energía.', '#EA580C', 'flask-conical', 5),
    ('ciencias_sociales', 'Ciencias Sociales', 'Historia, geografía, ciudadanía e identidad nacional.', '#CA8A04', 'landmark', 6),
    ('educacion_fisica', 'Educación Física', 'Movimiento, salud y convivencia.', '#16A34A', 'activity', 7),
    ('arte_cultura', 'Arte y Cultura', 'Expresión artística e identidad cultural.', '#DB2777', 'palette', 8),
    ('tecnologia', 'Tecnología Educativa', 'Competencias digitales y uso responsable de tecnología.', '#0891B2', 'monitor', 9)
ON CONFLICT (codigo) DO UPDATE
SET nombre = EXCLUDED.nombre,
    descripcion = EXCLUDED.descripcion,
    color = EXCLUDED.color,
    icono = EXCLUDED.icono,
    orden = EXCLUDED.orden,
    activo = TRUE;

INSERT INTO comunidades (nombre, descripcion, region, departamento, municipio)
VALUES
    ('Bilwi', 'Comunidad y municipio de referencia para contenidos de la Costa Caribe Norte.', 'Costa Caribe Norte', 'Región Autónoma de la Costa Caribe Norte', 'Puerto Cabezas'),
    ('Waspam', 'Comunidad y municipio de referencia del río Coco.', 'Costa Caribe Norte', 'Región Autónoma de la Costa Caribe Norte', 'Waspam'),
    ('Siuna', 'Municipio de referencia del Caribe Norte.', 'Costa Caribe Norte', 'Región Autónoma de la Costa Caribe Norte', 'Siuna'),
    ('Rosita', 'Municipio de referencia del Caribe Norte.', 'Costa Caribe Norte', 'Región Autónoma de la Costa Caribe Norte', 'Rosita'),
    ('Bonanza', 'Municipio de referencia del Caribe Norte.', 'Costa Caribe Norte', 'Región Autónoma de la Costa Caribe Norte', 'Bonanza'),
    ('Bluefields', 'Comunidad y municipio de referencia para contenidos de la Costa Caribe Sur.', 'Costa Caribe Sur', 'Región Autónoma de la Costa Caribe Sur', 'Bluefields'),
    ('Corn Island', 'Comunidad isleña de referencia para variantes de kriol.', 'Costa Caribe Sur', 'Región Autónoma de la Costa Caribe Sur', 'Corn Island'),
    ('Laguna de Perlas', 'Comunidad y municipio de referencia del Caribe Sur.', 'Costa Caribe Sur', 'Región Autónoma de la Costa Caribe Sur', 'Laguna de Perlas'),
    ('Kukra Hill', 'Municipio de referencia del Caribe Sur.', 'Costa Caribe Sur', 'Región Autónoma de la Costa Caribe Sur', 'Kukra Hill')
ON CONFLICT DO NOTHING;

INSERT INTO variantes_linguisticas (idioma_id, comunidad_id, nombre_variante, descripcion, es_principal)
SELECT i.id, c.id, datos.nombre_variante, datos.descripcion, datos.es_principal
FROM (
    VALUES
        ('miq', 'Bilwi', 'Miskito de Bilwi', 'Variante registrada como referencia y pendiente de validación comunitaria.', TRUE),
        ('miq', 'Waspam', 'Miskito de Waspam', 'Variante registrada como referencia y pendiente de validación comunitaria.', FALSE),
        ('ncr', 'Bluefields', 'Kriol de Bluefields', 'Variante registrada como referencia y pendiente de validación comunitaria.', TRUE),
        ('ncr', 'Corn Island', 'Kriol de Corn Island', 'Variante registrada como referencia y pendiente de validación comunitaria.', FALSE)
) AS datos(idioma_codigo, comunidad_nombre, nombre_variante, descripcion, es_principal)
JOIN idiomas i ON i.codigo = datos.idioma_codigo
JOIN comunidades c ON c.nombre = datos.comunidad_nombre
ON CONFLICT (idioma_id, comunidad_id) DO UPDATE
SET nombre_variante = EXCLUDED.nombre_variante,
    descripcion = EXCLUDED.descripcion,
    es_principal = EXCLUDED.es_principal,
    activo = TRUE;

INSERT INTO niveles_juego (numero_nivel, nombre, descripcion, puntos_minimos, icono, color)
VALUES
    (1, 'Explorador', 'Comienza su recorrido de aprendizaje.', 0, 'compass', '#64748B'),
    (2, 'Aprendiz', 'Domina vocabulario y actividades iniciales.', 100, 'sprout', '#22C55E'),
    (3, 'Comunicador', 'Puede usar frases y expresiones cotidianas.', 300, 'message-circle', '#3B82F6'),
    (4, 'Guardián de Lenguas', 'Fortalece el uso respetuoso de las lenguas.', 700, 'shield', '#8B5CF6'),
    (5, 'Embajador Cultural', 'Demuestra avance constante y respeto intercultural.', 1500, 'award', '#F59E0B')
ON CONFLICT (numero_nivel) DO UPDATE
SET nombre = EXCLUDED.nombre,
    descripcion = EXCLUDED.descripcion,
    puntos_minimos = EXCLUDED.puntos_minimos,
    icono = EXCLUDED.icono,
    color = EXCLUDED.color,
    activo = TRUE;

INSERT INTO logros (codigo, nombre, descripcion, icono, categoria, puntos_requeridos, nivel_requerido, visible)
VALUES
    ('primer_paso', 'Primer paso', 'Completa tu primera lección.', 'footprints', 'lecciones', 0, 1, TRUE),
    ('racha_3', 'Constancia', 'Estudia durante tres días diferentes.', 'flame', 'racha', 0, 1, TRUE),
    ('vocabulario_25', 'Coleccionista de palabras', 'Aprende o repasa 25 palabras.', 'book-marked', 'vocabulario', 0, 1, TRUE),
    ('poliglota_inicial', 'Puente entre lenguas', 'Completa actividades en dos o más idiomas.', 'languages', 'idiomas', 0, 2, TRUE),
    ('maestro_practica', 'Práctica destacada', 'Obtiene 90% o más en cinco ejercicios.', 'star', 'ejercicios', 0, 2, TRUE)
ON CONFLICT (codigo) DO UPDATE
SET nombre = EXCLUDED.nombre,
    descripcion = EXCLUDED.descripcion,
    icono = EXCLUDED.icono,
    categoria = EXCLUDED.categoria,
    puntos_requeridos = EXCLUDED.puntos_requeridos,
    nivel_requerido = EXCLUDED.nivel_requerido,
    visible = EXCLUDED.visible,
    activo = TRUE;

INSERT INTO fuentes (codigo, nombre, tipo, descripcion, activo)
VALUES
    ('MINED_CURRICULO', 'Ministerio de Educación de Nicaragua - documentos curriculares', 'institucion', 'Referencia para cargar y validar la malla curricular vigente.', TRUE),
    ('SEAR_REFERENCIA', 'Sistema Educativo Autonómico Regional', 'institucion', 'Referencia para enfoque intercultural y educación en lenguas originarias y afrodescendientes.', TRUE),
    ('VALIDACION_COMUNITARIA', 'Validación comunitaria lingüística', 'comunidad', 'Proceso requerido para contenidos en miskito y kriol.', TRUE)
ON CONFLICT (codigo) DO UPDATE
SET nombre = EXCLUDED.nombre,
    tipo = EXCLUDED.tipo,
    descripcion = EXCLUDED.descripcion,
    activo = TRUE;

INSERT INTO configuracion_app (clave, valor, descripcion, visible_usuario, editable_usuario)
VALUES
    ('app.nombre', '"Foráneo"'::JSONB, 'Nombre visible de la aplicación.', TRUE, FALSE),
    ('app.modo_offline', 'true'::JSONB, 'La aplicación debe funcionar sin conexión para las funciones instaladas.', TRUE, FALSE),
    ('app.idiomas_soportados', '["es", "en", "miq", "ncr"]'::JSONB, 'Códigos de idiomas disponibles.', TRUE, FALSE),
    ('contenido.requiere_validacion_comunitaria', 'true'::JSONB, 'Obliga a validar contenido lingüístico comunitario antes de publicarlo.', FALSE, FALSE),
    ('traduccion.mostrar_nivel_confianza', 'true'::JSONB, 'Muestra el nivel de confianza o revisión de una traducción.', TRUE, TRUE),
    ('gamificacion.puntos_por_leccion', '10'::JSONB, 'Puntos base por completar una lección.', FALSE, FALSE),
    ('gamificacion.puntos_por_ejercicio', '5'::JSONB, 'Puntos base por completar un ejercicio.', FALSE, FALSE),
    ('privacidad.analitica_local', 'true'::JSONB, 'Guarda estadísticas de uso localmente para el perfil.', TRUE, TRUE),
    ('privacidad.sincronizacion_opcional', 'true'::JSONB, 'La sincronización remota es opcional.', TRUE, TRUE)
ON CONFLICT (clave) DO UPDATE
SET valor = EXCLUDED.valor,
    descripcion = EXCLUDED.descripcion,
    visible_usuario = EXCLUDED.visible_usuario,
    editable_usuario = EXCLUDED.editable_usuario,
    activo = TRUE;
