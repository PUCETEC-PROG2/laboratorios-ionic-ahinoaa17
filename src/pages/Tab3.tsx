import {
  IonAvatar,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar
} from '@ionic/react';

import './Tab3.css';

const Tab3: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Usuario</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">

        <IonCard className="perfil-card">

          <div className="avatar-contenedor">
            <IonAvatar className="avatar-usuario">
              <img
                src="https://avatars.githubusercontent.com/u/245423058?v=4"
                alt="Usuario"
              />
            </IonAvatar>
          </div>

          <IonCardHeader>
            <IonCardTitle>
              Perfil de Usuario
            </IonCardTitle>
          </IonCardHeader>

          <IonCardContent className="info-usuario">
            <p><strong>Usuario:</strong> ahinoaa17</p>
            <p><strong>Nombre:</strong> Ahinoa Andino</p>
            <p><strong>Email:</strong> aandinos@puce.edu.ec</p>
            <p><strong>Descripción:</strong> Usuario en GitHub</p>
          </IonCardContent>

        </IonCard>

      </IonContent>
    </IonPage>
  );
};

export default Tab3;