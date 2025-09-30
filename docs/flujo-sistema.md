# Diagrama de flujo del sistema

```mermaid
flowchart TD
    subgraph Inicio
        A[Usuario abre app]
        B[Verifica estado de sesión]
    end

    A --> B
    B -->|Sesión activa| C{Selecciona acción}
    B -->|Sesión expirada| D[Redirigir a pantalla de login]

    C -->|Explorar actividades| E[Consultar catálogo]
    C -->|Ver detalle| F[Obtener datos del evento]
    C -->|Gestionar perfil| G[Recuperar información del usuario]

    D --> H[Capturar credenciales]
    H --> I[Validar en backend]
    I -->|Éxito| C
    I -->|Error| J[Mostrar mensaje de error]

    E --> K[Filtrar por ubicación, fecha y categoría]
    K --> L[Renderizar lista de resultados]

    F --> M[Cargar multimedia y reseñas]
    M --> N[Renderizar detalle enriquecido]

    G --> O[Sincronizar ajustes]
    O --> P[Actualizar preferencias locales]

    L --> Q[Usuario añade al itinerario]
    N --> Q
    Q --> R[Persistir selección en backend]
    R --> S[Confirmar actualización al usuario]

    J --> H
```

- **Entradas principales:** credenciales del usuario, parámetros de filtrado, identificadores de eventos.
- **Salidas clave:** listas filtradas, pantallas de detalle, confirmaciones de itinerario.
- **Lógica destacada:** validación de sesión, sincronización de preferencias y persistencia de itinerario.
