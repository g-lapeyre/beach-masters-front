// eslint-disable-next-line
import React from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonButtons, IonMenuButton, IonFooter, IonImg, IonModal, IonInput, IonItem, IonLabel, IonToast, IonChip, IonIcon } from '@ionic/react';
import { RouteComponentProps } from 'react-router';
import { pin } from 'ionicons/icons';

import axios from 'axios';

interface TournamentDetailProps extends RouteComponentProps<{
  id: string;
}> { }

const TournamentDetail: React.FC<TournamentDetailProps> = ({ match }) => {
  // eslint-disable-next-line
  const ipBruno = "192.168.1.65";
  // const ipBruno = "192.168.43.254";

  const [item, setItem] = React.useState([]);
  const [showToast, setShowToast] = React.useState(false);
  const [player1, setPlayer1] = React.useState('');
  const [player2, setPlayer2] = React.useState('');

  const [showAlert, setShowAlert] = React.useState(false);

  const getTournamentDetail = () => {
    return axios({
      url: "http://" + ipBruno + ":3000/tournaments/" + match.params.id,
      method: 'GET'
    }).then(res => {
      return res.data;
    })
  };

  // eslint-disable-next-line
  const sendInvitation = () => {
    return axios({
      url: "http://" + ipBruno + ":3000/tournaments/inscription",
      method: 'POST'
    }).then(res => {
      return res.data;
    })
  }

  // eslint-disable-next-line
  React.useEffect(() => {
    // eslint-disable-next-line
    getTournamentDetail().then(data => setItem(data));
    // eslint-disable-next-line
  }, []);

  const launchInvitation = () => {
    axios.post("http://" + ipBruno + ":3000/tournaments/inscription", {
      user_id: 1,
      tournament_id: match.params.id,
      mates: [player1, player2]
    })
      .then(res => {
        setShowAlert(false);
        setShowToast(true);
      })
  }

  return (
    <IonPage>
      <IonHeader translucent>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Detail du tournois</IonTitle>
        </IonToolbar>
      </IonHeader>
      {
        item.map(item => {
          return (
            <IonContent className="ion-padding">
              <IonImg src={"http://" + ipBruno + ":3000/img/" + item['id'] + ".png"} />
              <h3>
                {item['name']}
              </h3>
              <IonChip outline color="secondary">
                <IonIcon icon={pin} />
                <IonLabel>{item['address']}, {item['city']}, {item['zipcode']}</IonLabel>
              </IonChip>
              <IonChip outline color="secondary">
                <IonLabel>{item['format']}</IonLabel>
              </IonChip>
              <p>
                {item['description']}
              </p>
              <IonFooter>
                <IonToolbar>
                  <IonButton onClick={() => setShowAlert(true)} expand="full">
                    S'inscrire
                  </IonButton>
                </IonToolbar>
              </IonFooter>
              <IonModal isOpen={showAlert} cssClass="modal-size">
                <IonHeader translucent>
                  <IonToolbar>
                    <IonTitle>Inscription au tournois</IonTitle>
                  </IonToolbar>
                </IonHeader>
                <IonContent>
                  <IonItem>
                    <IonLabel position="floating">Joueur 1</IonLabel>
                    <IonInput clearInput value={player1} onIonChange={(e) => setPlayer1((e.target as HTMLInputElement).value)}></IonInput>
                  </IonItem>
                  <IonItem>
                    <IonLabel position="floating">Joueur 2</IonLabel>
                    <IonInput clearInput value={player2} onIonChange={(e) => setPlayer2((e.target as HTMLInputElement).value)}></IonInput>
                  </IonItem>
                </IonContent>
                <IonFooter className="ion-padding border-radius">
                  <IonButton color="secondary" onClick={() => setShowAlert(false)}>Annuler</IonButton>
                  <IonButton onClick={() => launchInvitation()}>Inviter</IonButton>
                </IonFooter>
              </IonModal>
              <IonToast
                isOpen={showToast}
                onDidDismiss={() => setShowToast(false)}
                message="Insciption au tounois enregistré"
                duration={600}
              />
            </IonContent>
          )
        })
      }
    </IonPage>
  );
};

export default TournamentDetail;
