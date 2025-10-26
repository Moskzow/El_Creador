# El Creador de Menús

¡Bienvenido a "El Creador de Menús"! Una aplicación web diseñada para que dueños de negocios de hostelería y restauración puedan crear, personalizar y compartir los menús de su negocio de una forma sencilla, rápida y profesional.

Este proyecto está siendo construido para ser una herramienta "premium", *mobile-first* y 100% personalizable.

## Características Actuales (Fase 2)

En esta fase, la aplicación cuenta con las siguientes funcionalidades:

-   **Editor Visual en Tiempo Real:** Una interfaz intuitiva con un panel de herramientas y una vista previa que se actualiza al instante.
-   **Componentes de Menú Básicos:** Añade fácilmente el nombre de tu negocio, títulos de sección (ej. "Entrantes", "Postres") y productos con nombre, descripción y precio.
-   **Carga y Personalización de Logo:**
    -   Sube el logo de tu negocio.
    -   Ajusta su **tamaño** (pequeño, mediano, grande).
    -   Elige su **posición** (izquierda, centro, derecha).
-   **Personalización de Estilo:**
    -   Escoge entre una selección de **Google Fonts** para darle un toque único a tu menú.
    -   Selecciona el **color de fondo** y el **color del texto** para que coincida con la identidad de tu marca.
-   **Exportación a PDF:** Descarga una versión en PDF de tu menú directamente desde el navegador, listo para imprimir o compartir.

## Cómo Empezar

La forma más sencilla de ejecutar y probar este proyecto es usando Gitpod, ya que viene preconfigurado.

[![Abrir en Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io)

Gitpod abrirá un entorno de desarrollo completo en tu navegador, instalará todas las dependencias y lanzará la aplicación automáticamente.

### Ejecución Local

Si prefieres ejecutarlo en tu máquina local, necesitarás tener Node.js instalado.

1.  Clona el repositorio.
2.  Navega al directorio del proyecto `menu-creator`.
3.  Instala las dependencias: `npm install`.
4.  Inicia el servidor de desarrollo: `npm run dev`.
5.  Abre `http://localhost:3000` en tu navegador.

## Tecnologías Utilizadas

-   **Framework:** Next.js (con React)
-   **Lenguaje:** TypeScript
-   **Estilos:** Tailwind CSS
-   **Exportación a PDF:** jsPDF y html2canvas
