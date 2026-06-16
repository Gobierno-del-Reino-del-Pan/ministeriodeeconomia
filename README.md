# Ministerio de Economía, Comercio y Empresa — Reino del Pan

Portal web oficial del Ministerio de Economía, Comercio y Empresa del Reino del Pan.

## Puesta en marcha

```bash
# 1. Instalar dependencias
npm install

# 2. Configurar variables de entorno (ya existe .env con plantilla)
# Edita .env con tus claves de Supabase cuando estén disponibles.

# 3. Arrancar el servidor de desarrollo en el puerto 4433
node server.js
```

Abre tu navegador en: **http://localhost:4433**

## Estructura de rutas

| Ruta | Descripción |
|------|-------------|
| `/` | Portada del Ministerio |
| `/ministerio` | El Ministerio — Quiénes somos |
| `/ministerio/organizacion` | Organigrama |
| `/ministerio/secretarias` | Secretarías de Estado |
| `/ministerio/agenda` | Agenda institucional |
| `/ministerio/noticias` | Sala de prensa |
| `/comercio` | Política comercial |
| `/comercio/exportaciones` | Programa de exportaciones |
| `/comercio/inversiones` | Inversiones extranjeras |
| `/comercio/acuerdos` | Acuerdos comerciales |
| `/empleo` | Política de empleo |
| `/empleo/estadisticas` | Estadísticas del mercado de trabajo |
| `/empleo/politicas` | Políticas activas de empleo |
| `/empleo/formacion` | Formación profesional |
| `/lpb` | LPB — Laboral Panien Bank (Inicio) |
| `/lpb/cuenta` | Mi cuenta LPB |
| `/lpb/prestamos` | Solicitud de préstamos |
| `/lpb/transferencia` | Realizar transferencias |
| `/accesibilidad` | Declaración de accesibilidad |
| `/aviso-legal` | Aviso legal |
| `/privacidad` | Política de privacidad |
| `/mapa-del-portal` | Mapa del portal |
| Cualquier otra ruta | Página no encontrada (404) |

##
Falta arreglar un huevo de cosas pero bueno, al menos lo básico está, si alguien quiere ayudar, bienvenido sea.
