#  Control de Versiones  Flujo de Trabajo

Este repositorio utiliza **Git + GitHub** con un flujo de trabajo basado en **issues, ramas y Pull Requests (PRs)** para garantizar una gestión organizada del código.

---

###  1. Issues
Cada tarea o mejora se documenta como un **issue** en GitHub.  
Ejemplos:
- #1 Configurar Tailwind + NativeWind  
- #2 Diagrama de flujo (procesos principales)  

---

###  2. Ramas
Por cada issue se crea una rama específica siguiendo esta convención:

`
feature/...
chore/...
docs/...
fix/...
`

Ejemplos reales:
- chore/tailwind-config  
- docs/flow-diagram  

---

###  3. Commits
Los commits siguen la convención **Conventional Commits**:  

`
<tipo>(<scope>): <descripción>
`

Ejemplo:
`
docs: add system flowchart (Mermaid) for main processes
`

---

###  4. Pull Requests (PRs)
Cada rama se publica y se abre un **PR** hacia main.  
Los PRs incluyen referencia al issue con Closes #N para cerrarlo automáticamente al hacer merge.  

---

###  5. Merge y cierre automático
Al aprobar y mergear un PR:
- El issue asociado se cierra automáticamente.  
- Los cambios quedan integrados en main.  

---

###  Beneficios
- Código organizado y trazable.  
- Issues  Ramas  Commits  PRs  Merge.  
- Historial limpio y profesional.  
