import { Link, useLocation } from 'wouter';
import { useAuth } from '../lib/auth';
import { useEffect, useState, useRef } from 'react';

const NAV = [
  { label: 'Home', href: '/' },
  {
    label: 'Ministerio',
    href: '/ministerio',
    sub: [
      { label: 'El Ministerio',  href: '/ministerio' },
      { label: 'Organización',   href: '/ministerio/organizacion' },
      { label: 'Secretarías',    href: '/ministerio/secretarias' },
      { label: 'Agenda',         href: '/ministerio/agenda' },
      { label: 'Noticias',       href: '/ministerio/noticias' },
    ],
  },
  {
    label: 'Comercio',
    href: '/comercio',
    sub: [
      { label: 'Política Comercial', href: '/comercio' },
      { label: 'Exportaciones',      href: '/comercio/exportaciones' },
      { label: 'Inversiones',        href: '/comercio/inversiones' },
      { label: 'Acuerdos',           href: '/comercio/acuerdos' },
      { label: 'PIB',                 href: '/comercio/indicadores' },
    ],
  },
  {
    label: 'Empleo',
    href: '/empleo',
    sub: [
      { label: 'Política de Empleo', href: '/empleo' },
      { label: 'Estadísticas',       href: '/empleo/estadisticas' },
      { label: 'Políticas Activas',  href: '/empleo/politicas' },
      { label: 'Ofertas de empleo',   href: '/empleo/formacion/empleos' },
    ],
  },
];

export default function Header() {
  const [location] = useLocation();
  const { user, loading } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const navRef = useRef<HTMLElement>(null);

  // Cerrar el menú desplegable al hacer clic fuera de él
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // Cerrar menús al cambiar de ruta
  useEffect(() => {
    setMobileOpen(false);
    setActiveDropdown(null);
  }, [location]);

  const avatarUrl = user?.avatar
    ? `https://cdn.discordapp.com/avatars/${user.discord_id}/${user.avatar}.png?size=64`
    : user
    ? `https://cdn.discordapp.com/embed/avatars/0.png`
    : null;

  const isLpbActive = location.startsWith('/lpb');

  return (
    <>
      <header className="site-header">
        <div className="container mx-auto flex items-center justify-between gap-4">
          {/* LOGOTIPO / MARCA */}
          <Link href="/" className="flex items-center shrink-0">
            <img
              src="/logo.png"
              alt="Escudo del Reino del Pan"
              className="logo-img"
            />
          </Link>

          {/* NAVEGACIÓN PRINCIPAL (DESKTOP) */}
          <nav ref={navRef} className="hidden lg:flex items-center gap-1 xl:gap-2">
            {NAV.map((item) => {
              const isParentActive = item.href === '/'
                ? location === '/'
                : location.startsWith(item.href);

              if (item.sub) {
                const isOpen = activeDropdown === item.label;
                return (
                  <div key={item.label} className="relative">
                    <button
                      onClick={() => setActiveDropdown(isOpen ? null : item.label)}
                      className={`px-3.5 py-1.5 uppercase tracking-[0.16em] text-[11px] font-bold transition-all duration-300 whitespace-nowrap rounded-full flex items-center gap-1.5 cursor-pointer ${
                        isParentActive
                          ? "text-neutral-900 bg-[#97b4e0]/25 font-extrabold"
                          : "text-neutral-700 hover:text-neutral-900 hover:bg-neutral-100/70"
                      }`}
                    >
                      {item.label}
                      <svg className={`w-3 h-3 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    {isOpen && (
                      <div className="absolute left-0 mt-2 w-52 rounded-2xl border border-neutral-200/50 bg-white/95 backdrop-blur-xl shadow-xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-150 p-1.5">
                        {item.sub.map((subItem) => {
                          const isSubActive = location === subItem.href;
                          return (
                            <Link
                              key={subItem.href}
                              href={subItem.href}
                              className={`w-full block px-4 py-2 rounded-xl text-[11px] font-bold uppercase tracking-[0.12em] transition duration-200 ${
                                isSubActive
                                  ? "text-neutral-950 bg-[#97b4e0]/35 font-black"
                                  : "text-neutral-700 hover:text-neutral-900 hover:bg-neutral-100/70"
                              }`}
                            >
                              {subItem.label}
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative px-3.5 py-1.5 uppercase tracking-[0.16em] text-[11px] font-bold transition-all duration-300 whitespace-nowrap rounded-full ${
                    isParentActive
                      ? "text-neutral-900 bg-[#97b4e0]/25 font-extrabold"
                      : "text-neutral-700 hover:text-neutral-900 hover:bg-neutral-100/70"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* BOTÓN DE ACCIÓN / MENÚ MÓVIL */}
          <div className="flex items-center gap-3 shrink-0">
            {!loading && (
              <>
                {user ? (
                  <>
                    <Link
                      href="/lpb"
                      className={`hidden sm:inline-flex px-3.5 py-1.5 uppercase tracking-[0.16em] text-[11px] font-bold transition-all duration-300 whitespace-nowrap rounded-full ${
                        isLpbActive
                          ? "text-neutral-900 bg-[#97b4e0]/25 font-extrabold"
                          : "text-neutral-700 hover:text-neutral-900 hover:bg-neutral-100/70"
                      }`}
                    >
                      LPB
                    </Link>
                    {avatarUrl && (
                      <img
                        src={avatarUrl}
                        alt={user.discord_username}
                        title={user.discord_username}
                        className="w-8 h-8 rounded-full border-2 border-[#97b4e0] object-cover shadow-sm transition-transform duration-300 hover:scale-105"
                      />
                    )}
                  </>
                ) : (
                  <a
                    href="/auth/discord"
                    className="hidden sm:inline-flex items-center gap-2 shrink-0 whitespace-nowrap cursor-pointer px-5 py-2 rounded-full text-[11px] font-bold uppercase tracking-[0.16em]
                      border border-[#97b4e0]/30 text-neutral-800 bg-[#97b4e0]/10
                      transition-all duration-300 hover:bg-[#97b4e0] hover:text-neutral-950 hover:shadow-[0_0_20px_rgba(151,180,224,0.4)] active:scale-[0.98]"
                  >
                    <span>Accede a LPB</span>
                  </a>
                )}
              </>
            )}

            <button
              onClick={() => setMobileOpen(v => !v)}
              className="lg:hidden flex flex-col justify-center items-center w-10 h-10 rounded-full border border-neutral-200 bg-neutral-50 hover:bg-neutral-100 transition relative z-50 cursor-pointer shadow-sm"
              aria-label="Menú"
            >
              <div className="w-5 h-3.5 flex flex-col justify-between relative">
                <span className={`block w-5 h-0.5 rounded-full transition-all duration-300 ${mobileOpen ? "bg-neutral-800 rotate-45 translate-y-1.5" : "bg-neutral-800"}`} />
                <span className={`block w-5 h-0.5 rounded-full transition-all duration-300 ${mobileOpen ? "opacity-0 scale-0" : "bg-neutral-800"}`} />
                <span className={`block w-5 h-0.5 rounded-full transition-all duration-300 ${mobileOpen ? "bg-neutral-800 -rotate-45 -translate-y-1.5" : "bg-neutral-800"}`} />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* MENÚ LATERAL / DESPLEGABLE MÓVIL */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-40 pt-[70px]">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => { setMobileOpen(false); }} />
          <div className="relative bg-white/95 backdrop-blur-xl border-b border-neutral-200 shadow-2xl overflow-y-auto max-h-[calc(100vh-70px)] animate-in slide-in-from-top duration-200">
            <nav className="container mx-auto px-5 py-6 flex flex-col gap-3">
              {NAV.map((item) => {
                const isParentActive = item.href === "/"
                  ? location === "/"
                  : location.startsWith(item.href);

                return (
                  <div key={item.label} className="flex flex-col gap-1">
                    {item.sub ? (
                      <>
                        <div className="flex items-center px-4 py-1.5 rounded-xl text-[10px] font-bold uppercase tracking-[0.16em] text-neutral-500">
                          {item.label}
                        </div>
                        <div className="flex flex-col gap-1 pl-3">
                          {item.sub.map((subItem) => {
                            const isSubActive = location === subItem.href;
                            return (
                              <Link
                                key={subItem.href}
                                href={subItem.href}
                                className={`relative flex items-center px-4 py-2 rounded-xl text-[11px] font-bold uppercase tracking-[0.12em] transition-all duration-200 ${
                                  isSubActive
                                    ? "text-neutral-950 bg-[#97b4e0]/30 font-black"
                                    : "text-neutral-700 hover:text-neutral-950 hover:bg-neutral-100/60"
                                }`}
                              >
                                <span className="flex-1">{subItem.label}</span>
                              </Link>
                            );
                          })}
                        </div>
                      </>
                    ) : (
                      <Link
                        href={item.href}
                        className={`relative flex items-center px-4 py-2.5 rounded-xl text-[11px] font-bold uppercase tracking-[0.16em] transition-all duration-200 ${
                          isParentActive
                            ? "text-neutral-950 bg-[#97b4e0]/30 font-black"
                            : "text-neutral-700 hover:text-neutral-950 hover:bg-neutral-100/60"
                        }`}
                      >
                        <span className="flex-1">{item.label}</span>
                      </Link>
                    )}
                  </div>
                );
              })}

              {!loading && (
                <>
                  <div className="h-px bg-neutral-200 my-2" />
                  {user ? (
                    <Link
                      href="/lpb"
                      className={`relative flex items-center px-4 py-2.5 rounded-xl text-[11px] font-bold uppercase tracking-[0.16em] transition-all duration-200 ${
                        isLpbActive
                          ? "text-neutral-950 bg-[#97b4e0]/30 font-black"
                          : "text-neutral-700 hover:text-neutral-950 hover:bg-neutral-100/60"
                      }`}
                    >
                      <span className="flex-1">LPB</span>
                    </Link>
                  ) : (
                    <a
                      href="/auth/discord"
                      className="flex justify-center items-center gap-2 px-4 py-2.5 rounded-xl text-[11px] font-bold uppercase tracking-[0.16em]
                        border border-[#97b4e0] text-neutral-800 bg-[#97b4e0]/5 transition-all duration-200 hover:bg-[#97b4e0] hover:text-neutral-950"
                    >
                      <span>Accede a LPB</span>
                    </a>
                  )}
                </>
              )}
            </nav>
          </div>
        </div>
      )}
    </>
  );
}