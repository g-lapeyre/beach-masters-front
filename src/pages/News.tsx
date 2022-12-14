import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonButtons, IonMenuButton } from '@ionic/react';
import React from 'react';

const News: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
        <IonButtons slot="start">
            <IonMenuButton/>
          </IonButtons>
          <IonTitle class="text-logo">Beach Masters</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        The world is your News.
        <p>
          If you get lost, the{' '}
          <a target="_blank" rel="noopener noreferrer" href="https://ionicframework.com/docs/">
            docs
          </a>{' '}
          will be your guide.
        </p>
        <IonButton color="primary">Primary</IonButton>
    <IonButton color="secondary">Secondary</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default News;
