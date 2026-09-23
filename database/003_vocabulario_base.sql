-- ============================================================================
-- FORÁNEO - Vocabulario base español e inglés
-- Ejecutar después de 001_schema_base.sql y 002_datos_iniciales.sql
-- Miskito y kriol: cargar únicamente mediante fuentes y validación comunitaria.
-- ============================================================================

WITH datos(codigo, palabra_clave, categoria, frecuencia_uso, nivel_educativo, grado_recomendado, etiquetas, es, en) AS (
    VALUES
        ('saludo_hola', 'hola', 'expresion', 100, 'primaria', 1, ARRAY['saludo','aula'], 'hola', 'hello'),
        ('saludo_adios', 'adiós', 'expresion', 95, 'primaria', 1, ARRAY['despedida','aula'], 'adiós', 'goodbye'),
        ('cortesia_por_favor', 'por favor', 'expresion', 95, 'primaria', 1, ARRAY['cortesia','aula'], 'por favor', 'please'),
        ('cortesia_gracias', 'gracias', 'expresion', 100, 'primaria', 1, ARRAY['cortesia','aula'], 'gracias', 'thank you'),
        ('cortesia_perdon', 'perdón', 'expresion', 85, 'primaria', 1, ARRAY['cortesia','aula'], 'perdón', 'sorry'),
        ('respuesta_si', 'sí', 'adverbio', 100, 'primaria', 1, ARRAY['respuesta'], 'sí', 'yes'),
        ('respuesta_no', 'no', 'adverbio', 100, 'primaria', 1, ARRAY['respuesta'], 'no', 'no'),
        ('persona_nino', 'niño', 'sustantivo', 90, 'primaria', 1, ARRAY['personas'], 'niño', 'boy'),
        ('persona_nina', 'niña', 'sustantivo', 90, 'primaria', 1, ARRAY['personas'], 'niña', 'girl'),
        ('persona_estudiante', 'estudiante', 'sustantivo', 95, 'primaria', 1, ARRAY['escuela','personas'], 'estudiante', 'student'),
        ('persona_docente', 'docente', 'sustantivo', 90, 'primaria', 1, ARRAY['escuela','personas'], 'docente', 'teacher'),
        ('persona_amigo', 'amigo', 'sustantivo', 90, 'primaria', 1, ARRAY['personas','familia'], 'amigo', 'friend'),
        ('familia_madre', 'madre', 'sustantivo', 95, 'primaria', 1, ARRAY['familia'], 'madre', 'mother'),
        ('familia_padre', 'padre', 'sustantivo', 95, 'primaria', 1, ARRAY['familia'], 'padre', 'father'),
        ('familia_hermano', 'hermano', 'sustantivo', 85, 'primaria', 1, ARRAY['familia'], 'hermano', 'brother'),
        ('familia_hermana', 'hermana', 'sustantivo', 85, 'primaria', 1, ARRAY['familia'], 'hermana', 'sister'),
        ('familia_abuela', 'abuela', 'sustantivo', 75, 'primaria', 2, ARRAY['familia'], 'abuela', 'grandmother'),
        ('familia_abuelo', 'abuelo', 'sustantivo', 75, 'primaria', 2, ARRAY['familia'], 'abuelo', 'grandfather'),
        ('escuela_escuela', 'escuela', 'sustantivo', 100, 'primaria', 1, ARRAY['escuela','aula'], 'escuela', 'school'),
        ('escuela_aula', 'aula', 'sustantivo', 90, 'primaria', 1, ARRAY['escuela','aula'], 'aula', 'classroom'),
        ('escuela_libro', 'libro', 'sustantivo', 95, 'primaria', 1, ARRAY['escuela','lectura'], 'libro', 'book'),
        ('escuela_cuaderno', 'cuaderno', 'sustantivo', 90, 'primaria', 1, ARRAY['escuela','aula'], 'cuaderno', 'notebook'),
        ('escuela_lapiz', 'lápiz', 'sustantivo', 85, 'primaria', 1, ARRAY['escuela','aula'], 'lápiz', 'pencil'),
        ('escuela_pizarra', 'pizarra', 'sustantivo', 75, 'primaria', 1, ARRAY['escuela','aula'], 'pizarra', 'board'),
        ('escuela_tarea', 'tarea', 'sustantivo', 85, 'primaria', 1, ARRAY['escuela'], 'tarea', 'homework'),
        ('numero_cero', 'cero', 'numero', 95, 'primaria', 1, ARRAY['numeros'], 'cero', 'zero'),
        ('numero_uno', 'uno', 'numero', 100, 'primaria', 1, ARRAY['numeros'], 'uno', 'one'),
        ('numero_dos', 'dos', 'numero', 100, 'primaria', 1, ARRAY['numeros'], 'dos', 'two'),
        ('numero_tres', 'tres', 'numero', 100, 'primaria', 1, ARRAY['numeros'], 'tres', 'three'),
        ('numero_cuatro', 'cuatro', 'numero', 100, 'primaria', 1, ARRAY['numeros'], 'cuatro', 'four'),
        ('numero_cinco', 'cinco', 'numero', 100, 'primaria', 1, ARRAY['numeros'], 'cinco', 'five'),
        ('numero_seis', 'seis', 'numero', 95, 'primaria', 1, ARRAY['numeros'], 'seis', 'six'),
        ('numero_siete', 'siete', 'numero', 95, 'primaria', 1, ARRAY['numeros'], 'siete', 'seven'),
        ('numero_ocho', 'ocho', 'numero', 95, 'primaria', 1, ARRAY['numeros'], 'ocho', 'eight'),
        ('numero_nueve', 'nueve', 'numero', 95, 'primaria', 1, ARRAY['numeros'], 'nueve', 'nine'),
        ('numero_diez', 'diez', 'numero', 100, 'primaria', 1, ARRAY['numeros'], 'diez', 'ten'),
        ('color_rojo', 'rojo', 'adjetivo', 85, 'primaria', 1, ARRAY['colores'], 'rojo', 'red'),
        ('color_azul', 'azul', 'adjetivo', 85, 'primaria', 1, ARRAY['colores'], 'azul', 'blue'),
        ('color_amarillo', 'amarillo', 'adjetivo', 80, 'primaria', 1, ARRAY['colores'], 'amarillo', 'yellow'),
        ('color_verde', 'verde', 'adjetivo', 80, 'primaria', 1, ARRAY['colores'], 'verde', 'green'),
        ('color_blanco', 'blanco', 'adjetivo', 80, 'primaria', 1, ARRAY['colores'], 'blanco', 'white'),
        ('color_negro', 'negro', 'adjetivo', 80, 'primaria', 1, ARRAY['colores'], 'negro', 'black'),
        ('tiempo_hoy', 'hoy', 'adverbio', 95, 'primaria', 1, ARRAY['tiempo'], 'hoy', 'today'),
        ('tiempo_ayer', 'ayer', 'adverbio', 80, 'primaria', 2, ARRAY['tiempo'], 'ayer', 'yesterday'),
        ('tiempo_manana', 'mañana', 'adverbio', 90, 'primaria', 1, ARRAY['tiempo'], 'mañana', 'tomorrow'),
        ('tiempo_dia', 'día', 'sustantivo', 95, 'primaria', 1, ARRAY['tiempo'], 'día', 'day'),
        ('tiempo_noche', 'noche', 'sustantivo', 85, 'primaria', 1, ARRAY['tiempo'], 'noche', 'night'),
        ('naturaleza_sol', 'sol', 'sustantivo', 90, 'primaria', 1, ARRAY['naturaleza'], 'sol', 'sun'),
        ('naturaleza_lluvia', 'lluvia', 'sustantivo', 80, 'primaria', 1, ARRAY['naturaleza','clima'], 'lluvia', 'rain'),
        ('naturaleza_agua', 'agua', 'sustantivo', 100, 'primaria', 1, ARRAY['naturaleza','alimentos'], 'agua', 'water'),
        ('naturaleza_arbol', 'árbol', 'sustantivo', 85, 'primaria', 1, ARRAY['naturaleza'], 'árbol', 'tree'),
        ('naturaleza_rio', 'río', 'sustantivo', 75, 'primaria', 2, ARRAY['naturaleza','geografia'], 'río', 'river'),
        ('naturaleza_mar', 'mar', 'sustantivo', 75, 'primaria', 2, ARRAY['naturaleza','geografia'], 'mar', 'sea'),
        ('animal_perro', 'perro', 'sustantivo', 85, 'primaria', 1, ARRAY['animales'], 'perro', 'dog'),
        ('animal_gato', 'gato', 'sustantivo', 85, 'primaria', 1, ARRAY['animales'], 'gato', 'cat'),
        ('animal_pez', 'pez', 'sustantivo', 75, 'primaria', 1, ARRAY['animales'], 'pez', 'fish'),
        ('alimento_pan', 'pan', 'sustantivo', 80, 'primaria', 1, ARRAY['alimentos'], 'pan', 'bread'),
        ('alimento_arroz', 'arroz', 'sustantivo', 85, 'primaria', 1, ARRAY['alimentos'], 'arroz', 'rice'),
        ('alimento_fruta', 'fruta', 'sustantivo', 80, 'primaria', 1, ARRAY['alimentos'], 'fruta', 'fruit'),
        ('alimento_leche', 'leche', 'sustantivo', 75, 'primaria', 1, ARRAY['alimentos'], 'leche', 'milk'),
        ('verbo_ser', 'ser', 'verbo', 100, 'primaria', 2, ARRAY['verbos'], 'ser', 'to be'),
        ('verbo_tener', 'tener', 'verbo', 100, 'primaria', 2, ARRAY['verbos'], 'tener', 'to have'),
        ('verbo_ir', 'ir', 'verbo', 95, 'primaria', 1, ARRAY['verbos'], 'ir', 'to go'),
        ('verbo_venir', 'venir', 'verbo', 85, 'primaria', 2, ARRAY['verbos'], 'venir', 'to come'),
        ('verbo_comer', 'comer', 'verbo', 90, 'primaria', 1, ARRAY['verbos'], 'comer', 'to eat'),
        ('verbo_beber', 'beber', 'verbo', 80, 'primaria', 1, ARRAY['verbos'], 'beber', 'to drink'),
        ('verbo_leer', 'leer', 'verbo', 90, 'primaria', 1, ARRAY['verbos','escuela'], 'leer', 'to read'),
        ('verbo_escribir', 'escribir', 'verbo', 90, 'primaria', 1, ARRAY['verbos','escuela'], 'escribir', 'to write'),
        ('verbo_escuchar', 'escuchar', 'verbo', 85, 'primaria', 1, ARRAY['verbos','aula'], 'escuchar', 'to listen'),
        ('verbo_hablar', 'hablar', 'verbo', 95, 'primaria', 1, ARRAY['verbos','aula'], 'hablar', 'to speak'),
        ('verbo_aprender', 'aprender', 'verbo', 90, 'primaria', 1, ARRAY['verbos','escuela'], 'aprender', 'to learn'),
        ('verbo_jugar', 'jugar', 'verbo', 85, 'primaria', 1, ARRAY['verbos','juego'], 'jugar', 'to play'),
        ('adjetivo_grande', 'grande', 'adjetivo', 85, 'primaria', 1, ARRAY['adjetivos'], 'grande', 'big'),
        ('adjetivo_pequeno', 'pequeño', 'adjetivo', 85, 'primaria', 1, ARRAY['adjetivos'], 'pequeño', 'small'),
        ('adjetivo_bueno', 'bueno', 'adjetivo', 90, 'primaria', 1, ARRAY['adjetivos'], 'bueno', 'good'),
        ('adjetivo_feliz', 'feliz', 'adjetivo', 80, 'primaria', 1, ARRAY['emociones'], 'feliz', 'happy'),
        ('pregunta_que', 'qué', 'interrogativo', 100, 'primaria', 1, ARRAY['preguntas'], 'qué', 'what'),
        ('pregunta_quien', 'quién', 'interrogativo', 95, 'primaria', 1, ARRAY['preguntas'], 'quién', 'who'),
        ('pregunta_donde', 'dónde', 'interrogativo', 95, 'primaria', 1, ARRAY['preguntas'], 'dónde', 'where'),
        ('pregunta_cuando', 'cuándo', 'interrogativo', 85, 'primaria', 2, ARRAY['preguntas'], 'cuándo', 'when'),
        ('pregunta_como', 'cómo', 'interrogativo', 95, 'primaria', 1, ARRAY['preguntas'], 'cómo', 'how'),
        ('pronombre_yo', 'yo', 'pronombre', 100, 'primaria', 1, ARRAY['pronombres'], 'yo', 'I'),
        ('pronombre_tu', 'tú', 'pronombre', 100, 'primaria', 1, ARRAY['pronombres'], 'tú', 'you'),
        ('pronombre_el', 'él', 'pronombre', 95, 'primaria', 1, ARRAY['pronombres'], 'él', 'he'),
        ('pronombre_ella', 'ella', 'pronombre', 95, 'primaria', 1, ARRAY['pronombres'], 'ella', 'she'),
        ('pronombre_nosotros', 'nosotros', 'pronombre', 90, 'primaria', 2, ARRAY['pronombres'], 'nosotros', 'we'),
        ('pronombre_ellos', 'ellos', 'pronombre', 90, 'primaria', 2, ARRAY['pronombres'], 'ellos', 'they')
), insert_vocabulario AS (
    INSERT INTO vocabulario (codigo, palabra_clave, categoria, frecuencia_uso, nivel_educativo, grado_recomendado, etiquetas)
    SELECT codigo, palabra_clave, categoria, frecuencia_uso, nivel_educativo, grado_recomendado, etiquetas
    FROM datos
    ON CONFLICT (codigo) DO UPDATE
    SET palabra_clave = EXCLUDED.palabra_clave,
        categoria = EXCLUDED.categoria,
        frecuencia_uso = EXCLUDED.frecuencia_uso,
        nivel_educativo = EXCLUDED.nivel_educativo,
        grado_recomendado = EXCLUDED.grado_recomendado,
        etiquetas = EXCLUDED.etiquetas,
        activo = TRUE
    RETURNING id, codigo
)
INSERT INTO vocabulario_traduccion (vocabulario_id, idioma_id, texto, es_principal, confianza_traduccion, fuente_validacion)
SELECT v.id, i.id, traducciones.texto, TRUE, 5, 'VOCABULARIO_BASE_ES_EN'
FROM datos d
JOIN vocabulario v ON v.codigo = d.codigo
CROSS JOIN LATERAL (
    VALUES ('es', d.es), ('en', d.en)
) AS traducciones(codigo_idioma, texto)
JOIN idiomas i ON i.codigo = traducciones.codigo_idioma
ON CONFLICT (vocabulario_id, idioma_id, texto) DO UPDATE
SET es_principal = TRUE,
    confianza_traduccion = 5,
    fuente_validacion = 'VOCABULARIO_BASE_ES_EN',
    activo = TRUE;

-- Plantilla de control: las traducciones miq/ncr deben insertarse tras revisión.
-- INSERT INTO vocabulario_traduccion (vocabulario_id, idioma_id, texto, es_principal,
--     confianza_traduccion, fuente_validacion, fecha_validacion)
-- SELECT v.id, i.id, '<texto validado>', TRUE, 5, '<fuente o validador>', CURRENT_DATE
-- FROM vocabulario v JOIN idiomas i ON i.codigo = 'miq' -- o 'ncr'
-- WHERE v.codigo = '<codigo_vocabulario>';
