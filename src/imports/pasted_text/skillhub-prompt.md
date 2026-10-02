# PROMPT MAESTRO PARA FIGMA MAKE

## SKILLHUB – Plataforma Web de Cursos y Aprendizaje

Diseña y genera el frontend completo de una plataforma web educativa llamada **SkillHub**, una plataforma moderna de cursos y aprendizaje en línea.

La interfaz debe sentirse como un producto tecnológico real, profesional y listo para producción, no como una maqueta genérica.

---

# 1. IDENTIDAD DEL PRODUCTO

**Nombre:** SkillHub

**Tipo:** Plataforma web de cursos y aprendizaje.

**Propósito:**
SkillHub permite que estudiantes aprendan mediante cursos organizados por módulos y contenidos, que profesores creen y administren cursos y actividades, y que administradores gestionen usuarios, cursos, categorías y estadísticas generales de la plataforma.

La plataforma tiene exactamente **tres tipos de usuarios**:

1. Estudiante
2. Profesor
3. Administrador

Debe existir **UN ÚNICO SISTEMA DE INICIO DE SESIÓN** para los tres roles.

No crear páginas de login independientes para cada rol.

Después de iniciar sesión, el sistema identifica el rol del usuario y lo dirige automáticamente al dashboard correspondiente.

---

# 2. ESTILO VISUAL

Crear una interfaz:

* Moderna
* Elegante
* Profesional
* Educativa
* Tecnológica
* Minimalista
* Intuitiva
* Limpia
* Premium
* Fácil de utilizar

Evitar completamente una apariencia infantil o excesivamente corporativa.

Debe parecer una plataforma educativa tecnológica moderna.

Inspiración visual conceptual:

* LMS modernos
* SaaS dashboards
* Plataformas educativas premium
* Interfaces de productividad
* Sistemas administrativos modernos

No copiar ninguna plataforma existente.

---

# 3. PALETA DE COLORES

Utilizar una identidad visual basada principalmente en:

### Color principal

**Azul profundo / azul índigo**

Uso:

* Botones principales
* Links
* Elementos activos
* Sidebar
* Indicadores
* Acciones importantes

### Color secundario

**Turquesa / cyan elegante**

Uso:

* Progreso
* Estadísticas
* Estados positivos
* Elementos interactivos
* Detalles visuales

### Color de acento

**Violeta suave**

Uso:

* Categorías
* Estadísticas secundarias
* Elementos destacados
* Gradientes sutiles

### Neutros

* Blanco
* Gris muy claro para fondos
* Gris medio para textos secundarios
* Gris oscuro para textos principales
* Bordes gris claro

La interfaz debe tener suficiente contraste y cumplir buenas prácticas de accesibilidad.

Utilizar gradientes únicamente de forma sutil.

Ejemplo conceptual:

Primary:
#3157D5

Secondary:
#18B6A4

Accent:
#7C5CFC

Background:
#F7F9FC

Surface:
#FFFFFF

Text:
#172033

Muted:
#667085

Border:
#E5E7EB

No utilizar todos los colores simultáneamente en cada pantalla. Mantener una jerarquía visual elegante.

---

# 4. TIPOGRAFÍA

Utilizar una tipografía moderna sans-serif.

Preferiblemente:

**Inter**

Jerarquía:

* H1 grande y fuerte
* H2 claramente diferenciado
* H3 para secciones
* Body cómodo de leer
* Labels pequeños
* Texto secundario gris

Evitar tipografías decorativas.

---

# 5. DISEÑO GENERAL

La aplicación debe utilizar:

* Cards con bordes redondeados
* Sombras muy suaves
* Espaciado generoso
* Iconografía consistente
* Botones modernos
* Tablas limpias
* Badges
* Progress bars
* Gráficos
* Modales
* Dropdowns
* Tooltips
* Estados hover
* Estados activos
* Estados disabled
* Estados loading
* Estados empty
* Estados error
* Estados success

Usar iconos profesionales tipo Lucide Icons.

No utilizar emojis como iconos principales de la interfaz.

---

# 6. ESTRUCTURA DE LA APLICACIÓN

Crear una aplicación SPA con navegación simulada.

La estructura general debe ser:

SkillHub
│
├── Autenticación
│   ├── Login
│   └── Registro
│
├── Estudiante
│   ├── Dashboard
│   ├── Explorar cursos
│   ├── Detalle del curso
│   ├── Mis cursos
│   ├── Aula virtual
│   ├── Contenido
│   ├── Actividades
│   ├── Resultados
│   ├── Progreso
│   └── Perfil
│
├── Profesor
│   ├── Dashboard
│   ├── Mis cursos
│   ├── Crear curso
│   ├── Editar curso
│   ├── Módulos
│   ├── Contenidos
│   ├── Actividades
│   ├── Estudiantes
│   └── Perfil
│
└── Administrador
├── Dashboard administrativo
├── Usuarios
├── Cursos
├── Categorías
├── Reportes
└── Configuración

---

# 7. USUARIOS DE PRUEBA

Crear tres usuarios ficticios para demostrar el funcionamiento de los tres roles.

## ESTUDIANTE

Nombre:

**María González**

Correo:

**[estudiante@skillhub.com](mailto:estudiante@skillhub.com)**

Contraseña:

**123456**

Rol:

**Estudiante**

Dashboard:

**/student/dashboard**

Datos ficticios:

* Cursos inscritos: 4
* Cursos completados: 1
* Cursos en progreso: 3
* Progreso promedio: 68%
* Actividades pendientes: 3
* Promedio académico: 4.5/5

---

## PROFESOR

Nombre:

**Carlos Martínez**

Correo:

**[profesor@skillhub.com](mailto:profesor@skillhub.com)**

Contraseña:

**123456**

Rol:

**Profesor**

Dashboard:

**/teacher/dashboard**

Datos ficticios:

* Cursos creados: 5
* Cursos publicados: 4
* Estudiantes: 128
* Actividades creadas: 32
* Curso más popular: Introducción a Python
* Valoración promedio: 4.8/5

---

## ADMINISTRADOR

Nombre:

**Laura Rodríguez**

Correo:

**[admin@skillhub.com](mailto:admin@skillhub.com)**

Contraseña:

**123456**

Rol:

**Administrador**

Dashboard:

**/admin/dashboard**

Datos ficticios:

* Usuarios: 1,248
* Estudiantes: 1,050
* Profesores: 180
* Administradores: 18
* Cursos: 86
* Cursos publicados: 72
* Inscripciones: 4,835
* Actividades: 624

---

# 8. LOGIN

Crear una pantalla de inicio de sesión elegante.

Debe contener:

Logo SkillHub

Texto:

**Aprende. Crea. Evoluciona.**

Campos:

* Correo electrónico
* Contraseña

Opciones:

* Recordarme
* ¿Olvidaste tu contraseña?

Botón:

**Iniciar sesión**

Link:

**Crear una cuenta**

Agregar una sección visual lateral o superior con una ilustración abstracta relacionada con educación y tecnología.

IMPORTANTE:

No crear tres botones:

"Login estudiante"

"Login profesor"

"Login administrador"

Debe existir solamente:

**Iniciar sesión**

El rol se obtiene después de autenticarse.

---

# 9. REGISTRO

Crear pantalla de registro.

Campos:

* Nombre
* Apellido
* Correo electrónico
* Contraseña
* Confirmar contraseña

Rol:

Permitir seleccionar únicamente:

* Estudiante
* Profesor

El administrador no debe aparecer como opción de registro público.

Botón:

**Crear cuenta**

---

# 10. DASHBOARD DEL ESTUDIANTE

Crear un dashboard completo.

Sidebar:

* Dashboard
* Explorar cursos
* Mis cursos
* Actividades
* Progreso
* Perfil

Header:

* Buscador
* Notificaciones
* Avatar
* Nombre del estudiante
* Menú de usuario

Contenido:

Saludo:

**¡Hola, María! 👋**

Subtítulo:

**Continúa aprendiendo y alcanza tus objetivos.**

Cards estadísticas:

1. Cursos inscritos
2. Cursos completados
3. Progreso promedio
4. Actividades pendientes

Agregar sección:

### Continuar aprendiendo

Mostrar cursos actualmente en progreso.

Cada card debe mostrar:

* Imagen
* Nombre
* Profesor
* Categoría
* Porcentaje de progreso
* Barra de progreso
* Botón "Continuar"

Agregar sección:

### Cursos recomendados

Mostrar 4 cursos.

Cada tarjeta debe mostrar:

* Imagen
* Categoría
* Título
* Profesor
* Valoración
* Número de estudiantes
* Duración
* Botón "Ver curso"

Agregar un pequeño gráfico de progreso semanal.

---

# 11. EXPLORAR CURSOS

Crear una página dedicada a explorar cursos.

Título:

**Explora nuevos conocimientos**

Buscador grande:

**¿Qué quieres aprender?**

Filtros:

* Categoría
* Nivel
* Duración
* Valoración

Categorías:

* Programación
* Matemáticas
* Ciencia de datos
* Inteligencia Artificial
* Ciberseguridad
* Diseño
* Desarrollo Web
* Bases de Datos

Mostrar grid de cursos.

Cada curso debe tener:

* Imagen
* Categoría
* Título
* Descripción corta
* Profesor
* Rating
* Número de estudiantes
* Duración
* Nivel
* Botón

---

# 12. DETALLE DEL CURSO

Crear una página completa para consultar un curso.

Mostrar:

* Imagen/portada
* Categoría
* Título
* Descripción
* Profesor
* Valoración
* Número de estudiantes
* Duración
* Nivel
* Fecha de actualización

Botón principal:

**Inscribirme al curso**

Sección:

### Lo que aprenderás

Lista de objetivos.

Sección:

### Contenido del curso

Accordion de módulos.

Ejemplo:

Módulo 1
Introducción a Python

Módulo 2
Variables y estructuras

Módulo 3
Funciones

Módulo 4
Programación orientada a objetos

Mostrar:

* Número de contenidos
* Actividades
* Duración estimada

---

# 13. MIS CURSOS

Crear página:

**Mis cursos**

Tabs:

* Todos
* En progreso
* Completados

Mostrar cards de cursos.

Cada card:

* Imagen
* Nombre
* Profesor
* Progreso
* Último contenido
* Botón "Continuar"

---

# 14. AULA VIRTUAL

Crear una experiencia de aprendizaje.

Layout:

Sidebar izquierda:

Curso actual.

Módulos desplegables.

Contenido principal:

* Título
* Video o reproductor simulado
* Texto educativo
* Recursos
* Botón anterior
* Botón siguiente

Panel inferior:

**Tu progreso**

65%

Mostrar barra de progreso.

---

# 15. ACTIVIDADES DEL ESTUDIANTE

Crear página:

**Mis actividades**

Filtros:

* Todas
* Pendientes
* Entregadas
* Calificadas

Tabla/card list:

Actividad
Curso
Fecha límite
Estado
Calificación
Acción

Estados:

Pendiente
Entregada
Calificada

Usar badges.

---

# 16. ACTIVIDAD

Crear pantalla para realizar una actividad.

Mostrar:

* Curso
* Módulo
* Título
* Descripción
* Instrucciones
* Fecha límite
* Puntaje máximo

Área:

**Tu respuesta**

Textarea o editor.

Botón:

**Entregar actividad**

Después de entregar mostrar estado:

**Actividad entregada correctamente**

---

# 17. PROGRESO DEL ESTUDIANTE

Crear dashboard de progreso.

Mostrar:

* Progreso general
* Cursos completados
* Contenidos completados
* Actividades realizadas

Gráfico de progreso por curso.

Gráfico de rendimiento académico.

Lista:

Curso
Progreso
Actividades
Calificación
Estado

Usar gráficos profesionales.

---

# 18. DASHBOARD DEL PROFESOR

Crear un dashboard completamente diferente al del estudiante.

Sidebar:

* Dashboard
* Mis cursos
* Crear curso
* Actividades
* Estudiantes
* Perfil

Header con:

* Buscador
* Notificaciones
* Avatar
* Carlos Martínez
* Profesor

Dashboard:

**Buenos días, Carlos**

Cards:

* Cursos creados
* Estudiantes
* Actividades
* Valoración promedio

Gráfico:

**Estudiantes inscritos por mes**

Segundo gráfico:

**Rendimiento de estudiantes**

Sección:

### Mis cursos

Tabla:

Curso
Estudiantes
Progreso promedio
Estado
Acciones

Botón:

**+ Crear curso**

---

# 19. CREAR CURSO

Crear formulario profesional.

Campos:

* Título
* Descripción
* Categoría
* Nivel
* Imagen
* Estado

Estados:

* Borrador
* Publicado

Sección:

### Módulos

Permitir agregar módulos.

Cada módulo:

Título
Descripción
Orden

Dentro de cada módulo:

Contenidos.

Botón:

**+ Agregar módulo**

Botón:

**Guardar borrador**

Botón:

**Publicar curso**

---

# 20. EDITAR CURSO

Crear pantalla de administración del curso.

Header:

Nombre del curso.

Tabs:

* Información
* Módulos
* Contenidos
* Actividades
* Estudiantes

Mostrar estructura:

Curso
→ Módulo
→ Contenido
→ Actividad

Permitir:

* Crear
* Editar
* Eliminar
* Reordenar

---

# 21. CREAR CONTENIDO

Crear formulario:

* Título
* Descripción
* Tipo de contenido
* Contenido
* Orden
* Estado

Tipos:

* Video
* Texto
* Documento
* Presentación
* Enlace

Botones:

**Guardar**

**Publicar**

---

# 22. CREAR ACTIVIDAD

Formulario:

* Título
* Descripción
* Instrucciones
* Puntaje
* Fecha límite
* Estado

Botones:

**Guardar actividad**

**Publicar actividad**

---

# 23. ESTUDIANTES DEL PROFESOR

Crear página:

**Mis estudiantes**

Mostrar tabla:

* Estudiante
* Curso
* Progreso
* Actividades
* Promedio
* Estado

Permitir buscar y filtrar.

Agregar botón:

**Ver progreso**

---

# 24. DASHBOARD DEL ADMINISTRADOR

Este debe ser el dashboard visualmente más completo.

Sidebar:

* Dashboard
* Usuarios
* Cursos
* Categorías
* Reportes
* Configuración

Header:

* Buscador
* Notificaciones
* Avatar
* Laura Rodríguez
* Administradora

Título:

**Panel de administración**

Subtítulo:

**Resumen general de SkillHub**

Cards:

### Usuarios totales

1,248

### Estudiantes

1,050

### Profesores

180

### Cursos

86

### Inscripciones

4,835

### Actividades

624

Utilizar iconos y variaciones visuales sutiles.

---

# 25. GRÁFICOS DEL ADMINISTRADOR

Crear gráficos profesionales.

### Gráfico 1

**Crecimiento de usuarios**

Gráfico de líneas.

Mostrar datos de los últimos 12 meses.

### Gráfico 2

**Distribución de usuarios**

Gráfico circular/donut:

* Estudiantes
* Profesores
* Administradores

### Gráfico 3

**Cursos por categoría**

Gráfico de barras.

Categorías:

* Programación
* Matemáticas
* IA
* Ciencia de datos
* Ciberseguridad
* Diseño

### Gráfico 4

**Inscripciones mensuales**

Gráfico de barras o área.

### Gráfico 5

**Cursos más populares**

Ranking:

1. Introducción a Python
2. Matemáticas para programación
3. Fundamentos de IA
4. Desarrollo Web
5. Bases de datos SQL

Los gráficos deben parecer reales y estar correctamente etiquetados.

---

# 26. GESTIÓN DE USUARIOS

Crear página administrativa:

**Usuarios**

Tabla:

* Usuario
* Correo
* Rol
* Estado
* Fecha de registro
* Acciones

Filtros:

* Todos
* Estudiantes
* Profesores
* Administradores

Estados:

* Activo
* Inactivo

Acciones:

* Ver
* Editar
* Cambiar estado
* Eliminar

Agregar botón:

**+ Nuevo usuario**

---

# 27. GESTIÓN DE CURSOS

Página:

**Cursos**

Tabla:

* Curso
* Profesor
* Categoría
* Estudiantes
* Estado
* Fecha
* Acciones

Filtros:

* Publicados
* Borradores
* Inactivos

Acciones:

* Ver
* Editar
* Desactivar
* Eliminar

---

# 28. CATEGORÍAS

Página:

**Categorías**

Mostrar cards o tabla.

Ejemplo:

Programación
Matemáticas
Inteligencia Artificial
Ciencia de Datos
Ciberseguridad
Diseño
Bases de Datos
Desarrollo Web

Permitir:

* Crear
* Editar
* Eliminar
* Activar/desactivar

---

# 29. REPORTES

Crear una sección administrativa.

Título:

**Reportes y estadísticas**

Mostrar:

* Usuarios registrados
* Cursos creados
* Inscripciones
* Cursos completados
* Actividades realizadas

Filtros por:

* Día
* Semana
* Mes
* Año

Agregar botones:

**Exportar PDF**

**Exportar Excel**

Estos botones pueden ser visuales en el prototipo.

---

# 30. CONFIGURACIÓN

Crear página:

**Configuración**

Secciones:

### Perfil

Nombre
Correo
Avatar

### Plataforma

Nombre de plataforma
Logo
Descripción

### Seguridad

Cambiar contraseña
Sesiones activas

### Notificaciones

Email
Actividades
Cursos
Sistema

---

# 31. PERFIL

Crear perfil para los tres roles.

Mostrar:

* Avatar
* Nombre
* Correo
* Rol
* Fecha de registro

Formulario:

* Nombre
* Apellido
* Correo

Botón:

**Guardar cambios**

---

# 32. NOTIFICACIONES

Crear dropdown de notificaciones.

Ejemplos:

Estudiante:

"Tu actividad de Python vence mañana."

"Has completado el 80% del curso."

Profesor:

"Nuevo estudiante inscrito."

"Tu curso ha alcanzado 100 estudiantes."

Administrador:

"Nuevo profesor registrado."

"El curso Introducción a Python recibió 50 nuevas inscripciones."

Mostrar:

* Icono
* Mensaje
* Fecha
* Estado leído/no leído

---

# 33. NAVEGACIÓN Y ROLES

La navegación debe cambiar dinámicamente según el usuario.

## Estudiante

Solo puede visualizar:

* Dashboard
* Cursos
* Mis cursos
* Actividades
* Progreso
* Perfil

## Profesor

Puede visualizar:

* Dashboard
* Mis cursos
* Crear curso
* Actividades
* Estudiantes
* Perfil

## Administrador

Puede visualizar:

* Dashboard
* Usuarios
* Cursos
* Categorías
* Reportes
* Configuración

No mostrar opciones que el usuario no tiene permiso para utilizar.

---

# 34. LOGIN DEMO

En el prototipo, permitir simular el acceso utilizando:

### Estudiante

[estudiante@skillhub.com](mailto:estudiante@skillhub.com)
123456

### Profesor

[profesor@skillhub.com](mailto:profesor@skillhub.com)
123456

### Administrador

[admin@skillhub.com](mailto:admin@skillhub.com)
123456

Cuando se seleccione un usuario y se presione iniciar sesión:

Estudiante → Dashboard del estudiante

Profesor → Dashboard del profesor

Administrador → Dashboard administrativo

Crear una pequeña lógica de autenticación simulada únicamente para el prototipo.

---

# 35. RESPONSIVE DESIGN

La aplicación debe ser completamente responsive.

Diseñar:

### Desktop

1440px

### Laptop

1280px

### Tablet

768px

### Mobile

390px

En móvil:

* Sidebar se convierte en menú desplegable
* Tablas se convierten en cards o scroll horizontal
* Gráficos se adaptan
* Cards pasan a una columna
* Header se simplifica
* Botones permanecen accesibles

---

# 36. COMPONENTES REUTILIZABLES

Crear componentes consistentes:

* Navbar
* Sidebar
* Header
* Footer
* Button
* Input
* Select
* SearchBar
* Card
* CourseCard
* StatCard
* Avatar
* Badge
* Modal
* Dropdown
* Table
* Tabs
* Accordion
* ProgressBar
* Notification
* Chart
* EmptyState
* LoadingState
* ErrorState
* Pagination
* Breadcrumb

Utilizar componentes reutilizables en todas las pantallas.

---

# 37. ESTADOS DE INTERFAZ

No diseñar únicamente el estado ideal.

Crear también ejemplos de:

### Loading

Skeleton loaders.

### Empty

Ejemplo:

"No tienes cursos inscritos todavía."

Botón:

"Explorar cursos"

### Error

"Ha ocurrido un error."

Botón:

"Intentar nuevamente"

### Success

"Curso creado correctamente."

### Warning

"Esta actividad está próxima a vencer."

### Confirmation

Modal:

"¿Estás seguro de eliminar este curso?"

Botones:

Cancelar
Eliminar

---

# 38. CURSOS DE EJEMPLO

Utilizar datos ficticios realistas.

Crear al menos estos cursos:

1. Introducción a Python
2. Matemáticas para Programación
3. Fundamentos de Inteligencia Artificial
4. Desarrollo Web Moderno
5. Bases de Datos SQL
6. Introducción a Ciencia de Datos
7. Fundamentos de Ciberseguridad
8. Programación Orientada a Objetos

Cada curso debe tener:

* Imagen
* Profesor
* Categoría
* Nivel
* Duración
* Rating
* Estudiantes
* Descripción
* Progreso cuando corresponda

---

# 39. EXPERIENCIA DE USUARIO

La plataforma debe ser fácil de entender incluso para alguien que la utiliza por primera vez.

Priorizar:

1. Claridad
2. Jerarquía visual
3. Navegación sencilla
4. Consistencia
5. Accesibilidad
6. Feedback visual
7. Buen uso del espacio

Evitar:

* Interfaces saturadas
* Exceso de colores
* Animaciones exageradas
* Texto innecesario
* Cards gigantes
* Sidebar excesivamente ancha
* Gráficos sin información útil

---

# 40. ANIMACIONES

Agregar microinteracciones elegantes:

* Hover en botones
* Hover en cards
* Transiciones suaves
* Animación de progress bars
* Aparición suave de modales
* Dropdowns animados
* Cambio de páginas suave

No utilizar animaciones excesivas.

---

# 41. LOGO

Crear un concepto visual para el logo:

**SkillHub**

Puede utilizar un símbolo relacionado con:

* aprendizaje
* conexión
* conocimiento
* crecimiento

Logo minimalista.

Debe funcionar en:

* Sidebar
* Login
* Navbar
* Mobile

Crear versión:

* Logo + nombre
* Solo icono

---

# 42. ESTRUCTURA DE FRAMES

Crear todos los frames organizados por secciones.

Utilizar nombres:

01 – Authentication
02 – Student
03 – Teacher
04 – Administrator
05 – Shared Components
06 – Responsive

Cada pantalla debe tener un nombre claro.

---

# 43. PROTOTIPO INTERACTIVO

Conectar las pantallas principales.

Flujo estudiante:

Login
→ Student Dashboard
→ Explorar cursos
→ Detalle curso
→ Inscribirse
→ Mis cursos
→ Aula virtual
→ Actividad
→ Entregar
→ Progreso

Flujo profesor:

Login
→ Teacher Dashboard
→ Mis cursos
→ Crear curso
→ Agregar módulo
→ Agregar contenido
→ Crear actividad
→ Publicar

Flujo administrador:

Login
→ Admin Dashboard
→ Usuarios
→ Cursos
→ Categorías
→ Reportes
→ Configuración

Agregar navegación mediante botones y elementos interactivos.

---

# 44. REQUISITO FUNDAMENTAL DE ARQUITECTURA

El frontend debe estar preparado conceptualmente para conectarse posteriormente con:

**React + Vite**

Backend:

**Java + Spring Boot**

Base de datos:

**MySQL**

API:

**REST API**

Autenticación:

**Spring Security**

El diseño debe separar claramente:

Frontend
→ REST API
→ Backend
→ Base de datos

No incluir PHP.

No incluir Laravel.

No incluir Node.js como backend.

No crear múltiples sistemas de autenticación.

---

# 45. PREPARACIÓN PARA IMPLEMENTACIÓN

Diseñar las interfaces de manera que posteriormente puedan convertirse fácilmente en componentes React.

Utilizar:

* Componentes reutilizables
* Estados claros
* Formularios consistentes
* Tablas estructuradas
* Cards reutilizables
* Layouts por rol
* Design system consistente

Los nombres de componentes deben ser intuitivos.

Ejemplos:

StudentDashboard
TeacherDashboard
AdminDashboard
CourseCard
CourseDetails
Sidebar
StatCard
ActivityTable
UserTable
CourseTable
ProgressChart

---

# 46. RESULTADO ESPERADO

Generar un sistema visual completo llamado:

# SKILLHUB

Debe parecer una plataforma educativa real y funcional.

Debe contener como mínimo:

* Login
* Registro
* Dashboard estudiante
* Dashboard profesor
* Dashboard administrador
* Exploración de cursos
* Detalle de curso
* Mis cursos
* Aula virtual
* Actividades
* Progreso
* Gestión de cursos
* Creación de cursos
* Gestión de módulos
* Gestión de contenidos
* Gestión de actividades
* Gestión de estudiantes
* Gestión de usuarios
* Gestión de categorías
* Reportes
* Gráficos
* Configuración
* Perfil
* Notificaciones
* Estados de interfaz
* Responsive design
* Componentes reutilizables
* Prototipo navegable

La interfaz debe tener una estética **premium, moderna, elegante, tecnológica y educativa**, con predominio de blanco, azul profundo, turquesa y pequeños acentos violetas.

La prioridad debe ser que el sistema se vea como un **producto SaaS educativo profesional**, con excelente jerarquía visual y una experiencia de usuario clara.

No generar una interfaz genérica.

No omitir las diferencias entre los tres roles.

No crear tres sistemas de login.

El administrador debe tener el panel administrativo más completo, incluyendo gráficos y métricas.

El profesor debe tener herramientas para crear, editar, publicar y administrar cursos, módulos, contenidos y actividades.

El estudiante debe tener herramientas para explorar cursos, inscribirse, aprender, realizar actividades y visualizar su progreso.
