# Ministerio de Economía, Comercio y Empresa — Reino del Pan

Portal institucional del Ministerio de Economía, Comercio y Empresa del Reino del Pan. Incluye el sitio web informativo del Ministerio y el **LPB (Laboral Panien Bank)**, la banca pública ciudadana integrada con Discord para la gestión de cuentas, préstamos, transferencias, empresas y trámites administrativos.

---

## Tabla de contenidos

1. [Stack tecnológico](#stack-tecnológico)
2. [Estructura del proyecto](#estructura-del-proyecto)
3. [Funcionalidades](#funcionalidades)
4. [Rutas del frontend](#rutas-del-frontend)
5. [API del backend](#api-del-backend)
6. [Autenticación](#autenticación)
7. [Modelo de datos (Supabase)](#modelo-de-datos-supabase)
8. [Variables de entorno](#variables-de-entorno)
9. [Puesta en marcha](#puesta-en-marcha)
10. [Sistema de diseño](#sistema-de-diseño)
11. [Aspectos legales y de accesibilidad](#aspectos-legales-y-de-accesibilidad)

---

## Stack tecnológico

| Capa | Tecnología |
|---|---|
| Frontend | React 18 + TypeScript |
| Enrutado | wouter |
| Bundler / dev server | Vite |
| Estilos | CSS con variables de diseño (tokens) propias |
| Backend | Node.js + Express |
| Base de datos | Supabase (PostgreSQL) |
| Autenticación | OAuth2 de Discord + cookies de sesión propias |
| Tiempo real | ws (WebSocket, usado por el cliente de Supabase Realtime) |

El servidor (`server.js`) sirve la aplicación de dos formas distintas según el entorno:

- **Desarrollo:** levanta Vite en modo *middleware* y delega el renderizado al propio Vite.
- **Producción:** sirve los estáticos generados en `dist/` y aplica un *fallback* a `index.html` para que el enrutado del lado cliente (wouter) funcione correctamente.

---

## Estructura del proyecto

```
.
├── server.js                  # Servidor Express: API REST, auth Discord, estáticos
├── index.html                 # Punto de entrada HTML de Vite
├── src/
│   ├── main.tsx                # Bootstrap de React + AuthProvider
│   ├── App.tsx                 # Definición de rutas (wouter)
│   ├── index.css               # Variables de diseño y estilos globales
│   │
│   ├── components/
│   │   ├── Header.tsx              # Cabecera y navegación principal
│   │   ├── Footer.tsx              # Pie de página institucional
│   │   ├── NewsTickerBar.tsx       # Cinta de noticias en movimiento
│   │   ├── BreadcrumbNav.tsx       # Migas de pan
│   │   ├── PageLayout.tsx          # Layout base de páginas (hero + secciones)
│   │   ├── SideNav.tsx             # Navegación lateral de subsecciones
│   │   └── lpb/
│   │       └── StatusBadge.tsx     # Etiqueta de estado (préstamos, etc.)
│   │
│   ├── lib/
│   │   ├── auth.tsx                # Contexto de autenticación (useAuth)
│   │   ├── supabaseClient.ts       # Cliente de Supabase (frontend, clave anónima)
│   │   ├── utils.ts                # Utilidades (formato de fechas, clsx)
│   │   └── lpb/
│   │       ├── hooks.ts            # useLpbData (economía y préstamos)
│   │       └── types.ts            # Tipos compartidos del LPB
│   │
│   └── pages/
│       ├── Home.tsx                 # Página de inicio
│       ├── NotFound.tsx             # Página 404
│       │
│       ├── ministerio/
│       │   ├── index.tsx               # Quiénes somos
│       │   ├── organizacion.tsx        # Organigrama
│       │   ├── secretarias.tsx         # Secretarías de Estado
│       │   ├── agenda.tsx              # Agenda institucional
│       │   └── noticias.tsx            # Sala de prensa
│       │
│       ├── comercio/
│       │   ├── index.tsx               # Política comercial
│       │   ├── exportaciones.tsx
│       │   ├── inversiones.tsx
│       │   ├── acuerdos.tsx
│       │   └── indicadores.tsx         # Gráfica del PIB en tiempo real
│       │
│       ├── empleo/
│       │   ├── index.tsx               # Política de empleo
│       │   ├── estadisticas.tsx
│       │   ├── politicas.tsx
│       │   └── formacion/
│       │       ├── index.tsx
│       │       └── empleos.tsx         # Tabla de ofertas de empleo público
│       │
│       ├── lpb/
│       │   ├── index.tsx               # Redirección a /lpb/cuenta
│       │   ├── Layout.tsx              # Layout común del LPB (auth, pestañas, errores)
│       │   ├── cuenta.tsx
│       │   ├── inventario.tsx
│       │   ├── prestamos.tsx
│       │   ├── transferencia.tsx
│       │   ├── empresa.tsx
│       │   ├── tramites.tsx
│       │   ├── creditos-icorp.tsx      # Trámite: Créditos ICORP
│       │   ├── bono-masa-joven.tsx     # Trámite: Bono Masa Joven
│       │   ├── crear-empresa.tsx       # Trámite: alta de empresa
│       │   └── tabs/
│       │       ├── Cuenta.tsx          # Resumen de la cuenta ciudadana
│       │       ├── Inventario.tsx      # Inventario de objetos del usuario
│       │       ├── Prestamos.tsx       # Préstamos activos / concedidos / historial
│       │       ├── Transferencia.tsx   # Formulario de transferencias por DPI
│       │       └── Empresa.tsx         # Gestión de empresa y tienda
│       │
│       └── legal/
│           ├── accesibilidad.tsx
│           ├── aviso-legal.tsx
│           ├── privacidad.tsx
│           └── mapa-del-portal.tsx
│
└── .env                        # Variables de entorno (no se versiona)
```

> Nota: los archivos de páginas se nombran en minúscula (`cuenta.tsx`) cuando actúan como ruta y en mayúscula (`Cuenta.tsx`) cuando son el componente de contenido de una pestaña dentro de `Layout.tsx`. Esta convención separa el *contenedor de ruta* del *contenido de la pestaña*.

---

## Funcionalidades

### Portal institucional

- Información pública del Ministerio: organización, secretarías de Estado, agenda institucional y sala de prensa.
- Sección de Comercio Exterior con exportaciones, inversiones extranjeras, acuerdos comerciales y un panel de indicadores del PIB con gráfica en tiempo real.
- Sección de Empleo con estadísticas del mercado de trabajo, políticas activas de empleo y listado de ofertas de empleo público.
- Páginas legales: accesibilidad, aviso legal, política de privacidad y mapa del portal.

### LPB — Laboral Panien Bank

Banca pública ciudadana, accesible únicamente a usuarios autenticados con Discord y verificados con un DPI (Documento de Identidad Paniense) válido:

- **Mi cuenta:** saldo en efectivo y en banco, estadísticas de ingresos y gastos, resumen del inventario.
- **Inventario:** objetos adquiridos por el ciudadano, agrupados por tipo y rareza.
- **Préstamos:** préstamos activos, préstamos concedidos a terceros e historial, con barra de progreso de amortización.
- **Transferencias:** envío de panedas a otro ciudadano mediante su DPI, con validación de formato y de saldo. Existe un DPI especial reservado para donaciones directas al gobierno.
- **Empresa:** creación y gestión de una empresa propia (coste fijo de alta), con tienda de productos asociada, reposición de stock y edición de catálogo.
- **Trámites:**
  - *Créditos ICORP* — línea de financiación para empresas de nueva creación.
  - *Bono Masa Joven* — ayuda económica única para ciudadanos mayores de edad.
  - *Crear empresa* — alta de empresa con coste de registro.

---

## Rutas del frontend

| Ruta | Página |
|---|---|
| `/` | Inicio |
| `/ministerio` | El Ministerio |
| `/ministerio/organizacion` | Organización |
| `/ministerio/secretarias` | Secretarías de Estado |
| `/ministerio/agenda` | Agenda institucional |
| `/ministerio/noticias` | Noticias |
| `/comercio` | Política comercial |
| `/comercio/exportaciones` | Exportaciones |
| `/comercio/inversiones` | Inversiones extranjeras |
| `/comercio/acuerdos` | Acuerdos comerciales |
| `/comercio/indicadores` | PIB en tiempo real |
| `/empleo` | Política de empleo |
| `/empleo/estadisticas` | Estadísticas laborales |
| `/empleo/politicas` | Políticas activas de empleo |
| `/empleo/formacion/empleos` | Ofertas de empleo |
| `/lpb` | Redirección a `/lpb/cuenta` |
| `/lpb/cuenta` | Mi cuenta |
| `/lpb/inventario` | Inventario |
| `/lpb/prestamos` | Préstamos |
| `/lpb/transferencia` | Transferencias |
| `/lpb/empresa` | Mi empresa |
| `/lpb/tramites` | Listado de trámites |
| `/lpb/tramites/creditos-icorp` | Trámite: Créditos ICORP |
| `/lpb/tramites/bono-masa-joven` | Trámite: Bono Masa Joven |
| `/lpb/tramites/crear-empresa` | Trámite: crear empresa |
| `/accesibilidad` | Declaración de accesibilidad |
| `/aviso-legal` | Aviso legal |
| `/privacidad` | Política de privacidad |
| `/mapa-del-portal` | Mapa del portal |
| `*` | Página 404 |

---

## API del backend

Todas las rutas devuelven JSON. Las que requieren sesión iniciada responden `401` si no hay cookie de sesión válida.

### Autenticación

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/auth/discord` | Redirige al flujo OAuth2 de Discord |
| GET | `/auth/discord/callback` | Callback de Discord; crea la sesión si el usuario está verificado |
| GET | `/api/me` | Devuelve el usuario autenticado actual (o `null`) |
| POST | `/auth/logout` | Cierra la sesión |

### LPB — Economía y préstamos

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/api/lpb/economy` | Datos económicos del usuario (efectivo, banco, inventario) |
| GET | `/api/lpb/prestamos` | Préstamos donde el usuario es prestatario o prestamista |
| POST | `/api/lpb/transfer` | Transferencia de panedas por DPI (incluye donación al gobierno) |

### Indicadores

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/api/gobierno/pib` | Balance público del gobierno utilizado para el panel del PIB |

### Trámites

| Método | Ruta | Descripción |
|---|---|---|
| POST | `/api/lpb/bono-masa-joven` | Reclama el Bono Masa Joven (valida edad por DPI y un único uso) |

### Empresas

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/api/lpb/empresas` | Empresas del usuario autenticado |
| POST | `/api/lpb/empresas` | Crea una empresa (cobra el coste de registro) |
| PATCH | `/api/lpb/empresas/:id` | Actualiza nombre, descripción o icono de la empresa |
| DELETE | `/api/lpb/empresas/:id` | Elimina la empresa |

### Tienda de empresa (entidad_shop)

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/api/lpb/empresas/:empresaId/productos` | Lista los productos de la tienda de una empresa |
| POST | `/api/lpb/empresas/:empresaId/productos` | Crea un producto nuevo |
| PATCH | `/api/lpb/empresas/:empresaId/productos/:productoId` | Edita un producto existente |
| DELETE | `/api/lpb/empresas/:empresaId/productos/:productoId` | Elimina un producto |
| POST | `/api/lpb/empresas/:empresaId/productos/:productoId/reponer` | Repone stock descontando saldo de la empresa |

Todas las rutas de empresas y de su tienda comprueban que el solicitante sea el propietario (`owner_id`) antes de permitir cualquier modificación.

---

## Autenticación

El acceso al LPB se realiza mediante **Discord OAuth2** combinado con un sistema de verificación de identidad ciudadana (DPI):

1. El usuario pulsa "Acceder con Discord" y es redirigido a `/auth/discord`.
2. Discord devuelve un código de autorización a `/auth/discord/callback`.
3. El servidor intercambia el código por un token de acceso y obtiene el perfil del usuario desde la API de Discord.
4. Se comprueba en la tabla `verificados` si ese `discord_id` tiene un DPI asociado.
   - Si **no** está verificado, se le redirige a `/lpb?error=no_dpi` y se muestra la pantalla de "No eres ciudadano del Reino del Pan", con un enlace para crear el DPI.
   - Si está verificado, se genera una cookie de sesión (`httpOnly`, codificada en base64, válida 7 días) con los datos básicos del usuario.
5. El frontend consulta `/api/me` al cargar la aplicación (`AuthProvider`) y mantiene el estado de sesión en un contexto de React (`useAuth`), con reintentos automáticos ante errores de red.

Estados de error gestionados explícitamente en la interfaz del LPB: `config` (Supabase no configurado), `auth_failed` (fallo en el intercambio con Discord) y `no_dpi` (usuario sin DPI verificado).

---

## Modelo de datos (Supabase)

Tablas utilizadas por el backend (inferidas de las consultas realizadas en `server.js`):

| Tabla | Propósito |
|---|---|
| `verificados` | Relación `discord_id` ↔ `dpi` de ciudadanos verificados |
| `dpis` | Datos del Documento de Identidad Paniense (nombre, apellidos, fecha de nacimiento) |
| `users_economy` | Economía del usuario: efectivo, banco, inventario, totales ganados/gastados |
| `prestamos` | Préstamos entre ciudadanos (prestamista, prestatario, importes, cuotas, estado) |
| `gobierno` | Balance público del gobierno (usado para el PIB y para pagos de bonos) |
| `bonos` | Registro de bonos reclamados por ciudadano (p. ej. Bono Masa Joven) |
| `empresas` | Empresas creadas por los ciudadanos |
| `entidad_shop` | Catálogo de productos de la tienda de cada empresa |

La conexión a Supabase desde el backend utiliza la clave de servicio (`SUPABASE_SERVICE_ROLE_KEY`), mientras que el frontend utiliza únicamente la clave anónima (`VITE_SUPABASE_ANON_KEY`) a través de `supabaseClient.ts`.

---

## Variables de entorno

Crear un archivo `.env` en la raíz del proyecto con las siguientes claves:

| Variable | Descripción |
|---|---|
| `PORT` | Puerto en el que escucha el servidor Express |
| `NODE_ENV` | `development` o `production` |
| `DISCORD_CLIENT_ID` | ID de la aplicación de Discord (OAuth2) |
| `DISCORD_CLIENT_SECRET` | Secreto de la aplicación de Discord |
| `DISCORD_REDIRECT_URI` | URI de callback registrada en Discord (`/auth/discord/callback`) |
| `SUPABASE_SERVICE_ROLE_KEY` | Clave de servicio de Supabase, solo para el backend |
| `VITE_SUPABASE_URL` | URL del proyecto de Supabase |
| `VITE_SUPABASE_ANON_KEY` | Clave anónima de Supabase, expuesta al frontend |
| `SESSION_SECRET` | Secreto utilizado para reforzar la seguridad de las sesiones |

> Ninguna de estas claves debe versionarse en el repositorio. El archivo `.env` debe permanecer fuera del control de versiones.

---

## Puesta en marcha

### Requisitos

- Node.js 18 o superior
- Una cuenta de Supabase con las tablas descritas en el [modelo de datos](#modelo-de-datos-supabase)
- Una aplicación de Discord configurada para OAuth2

### Desarrollo

```bash
npm install
npm run dev
```

El servidor arranca con Vite en modo *middleware*, sirviendo la aplicación con recarga en caliente.

### Producción

```bash
npm install
npm run build
npm start
```

El comando de construcción genera la carpeta `dist/`, que el servidor Express sirve como contenido estático, delegando cualquier ruta no reconocida a `index.html` para que el enrutado de wouter funcione correctamente en el cliente.

---

## Sistema de diseño

La interfaz se apoya en variables CSS (*design tokens*) definidas en `index.css`:

| Token | Uso |
|---|---|
| `--primary` | Azul institucional principal |
| `--gold` | Dorado de acento, usado en cifras, estados activos y elementos destacados |
| `--background` / `--foreground` | Fondo y texto base |
| `--card` / `--card-foreground` | Superficies de tarjetas |
| `--muted` / `--muted-foreground` | Fondos y texto secundarios |
| `--border` | Color de bordes |
| `--radius` | Radio de borde base, reutilizado en variantes pequeña, mediana y grande |
| `--display-font` | Tipografía de titulares |
| `--body-font` | Tipografía de cuerpo de texto |

Los componentes reutilizables (`Header`, `Footer`, `PageLayout`, `SideNav`, `BreadcrumbNav`, `StatusBadge`) se apoyan en estos tokens para mantener una identidad visual coherente en todo el portal y en el LPB.

---

## Aspectos legales y de accesibilidad

El portal incluye documentación legal alineada con el marco regulatorio de referencia utilizado como modelo narrativo del proyecto:

- **Aviso legal**, conforme a la LSSI-CE.
- **Política de privacidad**, conforme al RGPD y la LOPDGDD, con mención explícita al tratamiento de datos de Discord y DPI.
- **Declaración de accesibilidad**, conforme al Real Decreto 1112/2018 y las directrices WCAG 2.1 nivel AA.
- **Mapa del portal**, con la estructura completa de secciones y enlaces.