import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, IonTabButton, IonIcon, IonLabel, IonTabBar, IonTabs, IonSplitPane } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { basketball, calendar, paper, cog, key } from 'ionicons/icons';
import Menu from './components/Menu';
import Home from './pages/Home';
import Login from './pages/Login';
import Calendar from './pages/Calendar';
import Profile from './pages/Profile';
import { AppPage } from './declarations';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import News from './pages/News';
import TournamentDetail from './pages/TournamentDetail';

const appPages: AppPage[] = [
  {
    title: 'Profile',
    url: '/profile',
    icon: cog
  },
  {
    title: 'Logout',
    url: '/login',
    icon: key
  }
];

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonSplitPane contentId="main">
        <Menu appPages={appPages} />
        <IonRouterOutlet id="main">
          <Route exact path="/" render={() => <Redirect to="/login" />} />
          <Route path="/login" component={Login} exact={true} />
          {/* <Route path="/profile" component={Profile} exact={true} /> */}
        </IonRouterOutlet>
        <IonTabs>
          <IonRouterOutlet>
            <Route path="/login" component={Login} exact={true} />
            <Route path="/home" component={Home} exact={true} />
            <Route path="/home/tournament/:id" component={TournamentDetail} />
            <Route path="/calendar" component={Calendar} exact={true} />
            <Route path="/news" component={News} exact={true} />
            <Route exact path="/" render={() => <Redirect to="/login" />} />
          </IonRouterOutlet>
          <IonTabBar slot="bottom" color="secondary">
            <IonTabButton tab="News" href="/news">
              <IonIcon icon={paper} />
              <IonLabel>Actualites</IonLabel>
            </IonTabButton>
            <IonTabButton tab="Home" href="/home">
              <IonIcon icon={basketball} />
              <IonLabel>Accueil</IonLabel>
            </IonTabButton>
            <IonTabButton tab="Agenda" href="/calendar">
              <IonIcon icon={calendar} />
              <IonLabel>Agenda</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonSplitPane>
    </IonReactRouter>
  </IonApp>
);

export default App;
