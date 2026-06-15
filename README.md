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
| / | Portada del Ministerio |
| /ministerio | El Ministerio — Quiénes somos |
| /ministerio/organizacion | Organigrama |
| /ministerio/secretarias | Secretarías de Estado |
| /ministerio/agenda | Agenda institucional |
| /ministerio/noticias | Sala de prensa |
| /comercio | Política comercial |
| /comercio/exportaciones | Programa de exportaciones |
| /comercio/inversiones | Inversiones extranjeras |
| /comercio/acuerdos | Acuerdos comerciales |
| /empleo | Política de empleo |
| /empleo/estadisticas | Estadísticas del mercado de trabajo |
| /empleo/politicas | Políticas activas de empleo |
| /empleo/formacion | Formación profesional |
| /boe | Boletín Oficial del Reino del Pan |
| /boe/:id | Detalle de disposición BOE |
| /sede | Sede electrónica |
| /sede/tramites | Catálogo de trámites |
| /sede/notificaciones | Notificaciones electrónicas |

## Tecnologías

- **Frontend:** React 18 + TypeScript + Wouter (router)
- **Estilos:** Tailwind CSS v4 + CSS custom properties
- **Servidor:** Express + Vite (dev middleware / static en producción)
- **Base de datos:** Supabase (pendiente de configurar — claves en .env)

Es una caca como una catedral pero al menos hay algo, mañana hago q funcione y si alguien quiere decorarlo bienvenido sea
