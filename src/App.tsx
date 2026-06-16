import { Route, Switch } from 'wouter';

// Páginas
import Home from './pages/Home';
import MinisterioIndex from './pages/ministerio/index';
import Organizacion from './pages/ministerio/organizacion';
import Secretarias from './pages/ministerio/secretarias';
import AgendaPage from './pages/ministerio/agenda';
import NoticiasPage from './pages/ministerio/noticias';
import ComercioIndex from './pages/comercio/index';
import Exportaciones from './pages/comercio/exportaciones';
import Inversiones from './pages/comercio/inversiones';
import Acuerdos from './pages/comercio/acuerdos';
import EmpleoIndex from './pages/empleo/index';
import Estadisticas from './pages/empleo/estadisticas';
import Politicas from './pages/empleo/politicas';
import Formacion from './pages/empleo/formacion';

// LPB
import LpbIndex from './pages/lpb/index';
import LpbCuenta from './pages/lpb/cuenta';
import LpbPrestamos from './pages/lpb/prestamos';
import LpbTransferencia from './pages/lpb/transferencia';

// Legal
import Accesibilidad from './pages/legal/accesibilidad';
import AvisoLegal from './pages/legal/aviso-legal';
import Privacidad from './pages/legal/privacidad';
import MapaDelPortal from './pages/legal/mapa-del-portal';

import NotFound from './pages/NotFound';

export default function App() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      {/* Ministerio */}
      <Route path="/ministerio" component={MinisterioIndex} />
      <Route path="/ministerio/organizacion" component={Organizacion} />
      <Route path="/ministerio/secretarias" component={Secretarias} />
      <Route path="/ministerio/agenda" component={AgendaPage} />
      <Route path="/ministerio/noticias" component={NoticiasPage} />
      {/* Comercio */}
      <Route path="/comercio" component={ComercioIndex} />
      <Route path="/comercio/exportaciones" component={Exportaciones} />
      <Route path="/comercio/inversiones" component={Inversiones} />
      <Route path="/comercio/acuerdos" component={Acuerdos} />
      {/* Empleo */}
      <Route path="/empleo" component={EmpleoIndex} />
      <Route path="/empleo/estadisticas" component={Estadisticas} />
      <Route path="/empleo/politicas" component={Politicas} />
      <Route path="/empleo/formacion" component={Formacion} />
      {/* LPB */}
      <Route path="/lpb" component={LpbIndex} />
      <Route path="/lpb/cuenta" component={LpbCuenta} />
      <Route path="/lpb/prestamos" component={LpbPrestamos} />
      <Route path="/lpb/transferencia" component={LpbTransferencia} />
      {/* Legal */}
      <Route path="/accesibilidad" component={Accesibilidad} />
      <Route path="/aviso-legal" component={AvisoLegal} />
      <Route path="/privacidad" component={Privacidad} />
      <Route path="/mapa-del-portal" component={MapaDelPortal} />
      {/* 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}