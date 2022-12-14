// eslint-disable-next-line
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonMenuButton, IonCard, IonCardTitle, IonAvatar, IonLabel, IonItem, IonChip, IonIcon, IonButton, IonInput, IonSelect, IonSelectOption } from '@ionic/react';
import React from 'react';
import { Palette } from 'react-palette';
import { pin } from 'ionicons/icons';

import axios from 'axios';

const Home: React.FC = () => {
  // eslint-disable-next-line
  // const ipBruno = "localhost";
  // eslint-disable-next-line
  // const ipGaby = "192.168.43.254";
  const ipBruno = "192.168.1.65";


  const [items, setItems] = React.useState([]);
  // eslint-disable-next-line
  const [city, setCity] = React.useState('');
  // eslint-disable-next-line
  const [format, setFormat] = React.useState('');

  const getTournaments = () => {
    return axios({
      url: "http://" + ipBruno + ":3000/tournaments/all",
      method: 'GET'
    }).then(res => {
      return res.data;
    })
  };

  const getTournamentsWithFilters = () => {
    let filter = {
      city: city,
      format: format
    }
    if (city === '')
      delete filter.city
    if (format === '')
      delete filter.format
    return axios({
      url: "http://" + ipBruno + ":3000/tournaments/all",
      method: 'POST',
      data: filter
    }).then(res => {
      return res.data;
    })
  };

  // eslint-disable-next-line
  const submit = async (e: any) => {
    e.preventDefault();
    console.log('submit');
    getTournamentsWithFilters().then(data => setItems(data))
  }

  React.useEffect(() => {
    getTournaments().then(data => setItems(data));
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle class="text-logo">Beach Masters</IonTitle>
        </IonToolbar>
      </IonHeader>
      <form onSubmit={(e) => { submit(e); }}>
        <IonItem>
          <IonLabel position="floating">Ville</IonLabel>
          <IonInput name="city" type="text" value={city} onIonChange={(e) => setCity((e.target as HTMLInputElement).value)}></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel>Format de Tournois</IonLabel>
          <IonSelect placeholder="Choisissez" name="password" value={format} onIonChange={(e) => setFormat((e.target as HTMLInputElement).value)}>
            <IonSelectOption value="">Tous</IonSelectOption>
            <IonSelectOption value="2v2">2v2</IonSelectOption>
            <IonSelectOption value="4v4">4v4</IonSelectOption>
          </IonSelect>
        </IonItem>
        <IonButton type="submit" color="secondary">Rechercher</IonButton>
      </form>
      <IonContent className="ion-padding">
        {
          items.map(item => {
            return (
              <IonCard key={item['id']}>
                <IonItem lines="none">
                  <IonAvatar slot="start">
                    <img src={"http://" + ipBruno + ":3000/img/" + item['id'] + ".png"} alt="" />
                  </IonAvatar>
                  <IonLabel>
                    <Palette src={"http://" + ipBruno + ":3000/img/" + item['id'] + ".png"}>
                      {({ data, loading, error }) => (
                        <IonCardTitle style={{ color: data.vibrant }}>
                          {item['name']}
                        </IonCardTitle>
                      )}
                    </Palette>
                    <IonChip outline color="secondary">
                      <IonIcon icon={pin} />
                      <IonLabel>{item['city']}</IonLabel>
                    </IonChip>
                    <IonChip outline color="secondary">
                      <IonLabel>{item['format']}</IonLabel>
                    </IonChip>
                    <IonButton expand="block" routerLink={"/home/tournament/" + item['id']}>Voir</IonButton>
                  </IonLabel>
                </IonItem>
              </IonCard>
            );
          })
        }
      </IonContent>
    </IonPage>
  );
};

export default Home;
