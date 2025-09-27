Foráneo – documento inicial del proyecto de hackathon

Descripción del proyecto

Foráneo es una aplicación multiplataforma (móvil y web) diseñada para centralizar en un solo lugar los servicios turísticos de Nicaragua. La plataforma permite a los usuarios planificar viajes, reservar hospedajes, contratar transporte, encontrar experiencias culturales y gastronómicas y realizar pagos de forma segura. El proyecto nace como respuesta a la fragmentación de los servicios turísticos en el país: en lugar de consultar varios sitios, los viajeros pueden gestionar todo su itinerario desde una sola interfaz. Al mismo tiempo, los pequeños negocios turísticos ganan visibilidad y cuentan con un canal digital para administrar sus reservas y promover sus ofertas.

Objetivo

El objetivo principal de Foráneo es simplificar el turismo interno conectando a viajeros con pequeños negocios locales. La aplicación busca ofrecer una experiencia integrada que facilite la planificación y reserva de servicios, incentiva el consumo responsable en destinos nacionales y fortalece la economía local.

Funcionalidades principales

• Exploración de destinos: búsqueda por ciudad, categoría o tipo de actividad, con fotografías, descripciones y opiniones de otros viajeros.
• Reservas integradas: reserva de hospedajes, tours y transporte desde la misma aplicación con confirmación en tiempo real.
• Itinerarios personalizados: creación de rutas y agendas según preferencias, por ejemplo “fin de semana en Somoto”.
• Sistema de reseñas y recompensas: los usuarios pueden calificar experiencias y acumular puntos de recompensa.
• Seguridad y soporte: incluye contactos de emergencia, mapas offline y chat con proveedores para resolver dudas o problemas durante el viaje.
• Pagos integrados: el usuario puede pagar sus reservas dentro de la aplicación usando un proveedor de pagos compatible con moneda local. Los cargos se calculan automáticamente en función del servicio, cantidad y fechas seleccionadas, y se confirma al instante.

Tecnología y requisitos técnicos

Front‑end

El cliente se desarrolla con Flutter, un framework de código abierto creado por Google. Flutter permite construir aplicaciones nativas para móviles, web, escritorio y dispositivos embebidos a partir de una única base de código. Este enfoque reduce el tiempo de desarrollo y facilita el mantenimiento, pues sólo se necesita una base de código para múltiples plataformas. Además, Flutter aprovecha gráficos acelerados por hardware para ofrecer un buen rendimiento. Una de las ventajas clave del framework es la característica de hot reload: permite experimentar y ver los cambios en la interfaz rápidamente inyectando código actualizado en tiempo de ejecución y reconstruyendo automáticamente el árbol de widgets.

Los principales requisitos para el front‑end son:

• Flutter 3.13 o superior y Dart para compilar la aplicación.
• Un sistema operativo con soporte para Flutter (Windows, macOS o Linux) y los SDK de iOS/Android si se desea ejecutar en dispositivos móviles.
• Git para control de versiones.

Back‑end

El servidor está construido con Node.js y el framework Express. Proporciona una API REST que gestiona las reservas, usuarios, servicios y transacciones de pago. Para las reservas pagadas, el backend se integra con un proveedor de pagos externo (por ejemplo, Stripe u otro procesador local) para crear cargos, confirmar pagos y registrar las transacciones en una tabla pagos.

La aplicación se conecta específicamente a una base de datos PostgreSQL, aprovechando su rendimiento, compatibilidad con JSON y extensibilidad. Los requisitos incluyen:

• Node.js 16 o superior y npm para instalar las dependencias.
• PostgreSQL (versión 14 o superior) instalado en el entorno de servidor.
• Variables de conexión correctamente configuradas (host, usuario, contraseña y nombre de la base de datos) en el archivo .env.
• Claves de API y credenciales del proveedor de pagos configuradas en el archivo .env (por ejemplo, PAYMENT_PUBLIC_KEY, PAYMENT_SECRET_KEY) para permitir la integración segura con el procesador de pagos.

Instalación

1. Clonar el repositorio del proyecto y entrar en la carpeta del código:
git clone https://github.com/tu-usuario/foraneo.git
cd foraneo
1. Instalar las dependencias de Flutter:
flutter pub get
1. (Opcional) Habilitar el soporte web de Flutter si también se quiere compilar para navegador:
flutter config --enable-web
1. Instalar PostgreSQL y preparar la base de datos:
2. Instala PostgreSQL en tu sistema. En Linux puedes usar el gestor de paquetes (por ejemplo, en Ubuntu: sudo apt install postgresql postgresql-contrib). En Windows, descarga el instalador desde la web oficial y sigue el asistente.
3. Crea una base de datos y un usuario dedicados a la aplicación. En sistemas Unix puedes ejecutar:
  sudo -u postgres psql
CREATE DATABASE foraneo_db;
CREATE USER foraneo_user WITH ENCRYPTED PASSWORD 'tu_contraseña';
GRANT ALL PRIVILEGES ON DATABASE foraneo_db TO foraneo_user;
\q
4. Actualiza el archivo .env con las credenciales de PostgreSQL (DB_HOST, DB_USER, DB_PASS, DB_NAME).
5. Configurar y ejecutar el servidor backend:
cd backend
npm install
cp .env.example .env   # Edita .env para configurar DB_HOST, DB_USER, DB_PASS, DB_NAME y las claves del proveedor de pagos (PAYMENT_PUBLIC_KEY, PAYMENT_SECRET_KEY).
npm start
1. Ejecutar la aplicación móvil en un emulador o dispositivo físico en modo de depuración:
flutter run
1. Ejecutar la versión web (si se habilitó el soporte web):
flutter run -d chrome

Uso de la aplicación

Una vez instalados el cliente y el servidor, se puede interactuar con la aplicación de la siguiente manera:

• Pantalla de inicio: muestra destinos destacados y categorías de servicios recomendados.
• Explorar: permite filtrar por ciudad o tipo de experiencia (por ejemplo, aventura, gastronomía o naturaleza) y muestra información detallada de cada servicio.
• Detalle del servicio: muestra descripciones completas, fotografías, precios y comentarios de otros viajeros; desde aquí se realizan las reservas.
• Reservas: permite ver y gestionar las reservas pendientes y su estado (confirmada, cancelada, en curso).
• Perfil de usuario: permite gestionar la cuenta, ver y editar la información personal, consultar reseñas escritas y participar en el programa de recompensas.

Contribución y licencia

El proyecto utiliza Git y GitHub para el control de versiones. Para contribuir se recomienda crear un fork o una nueva rama, hacer commits descriptivos y abrir un pull request para solicitar la revisión del código. Foráneo se distribuye bajo la licencia MIT.
