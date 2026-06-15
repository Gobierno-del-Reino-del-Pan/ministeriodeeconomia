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
import BoeIndex from './pages/boe/index';
import BoeDetalle from './pages/boe/[id]';
import SedeIndex from './pages/sede/index';
import Tramites from './pages/sede/tramites';
import Notificaciones from './pages/sede/notificaciones';
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
      {/* BOE */}
      <Route path="/boe" component={BoeIndex} />
      <Route path="/boe/:id" component={BoeDetalle} />
      {/* Sede electrónica */}
      <Route path="/sede" component={SedeIndex} />
      <Route path="/sede/tramites" component={Tramites} />
      <Route path="/sede/notificaciones" component={Notificaciones} />
      {/* 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}
