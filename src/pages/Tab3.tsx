import React, { useState } from 'react';
import { 
  IonCard, 
  IonCardContent, 
  IonCardHeader, 
  IonCardSubtitle, 
  IonCardTitle, 
  IonContent, 
  IonHeader, 
  IonPage, 
  IonTitle, 
  IonToolbar, 
  useIonViewWillEnter 
} from '@ionic/react';

import './Tab3.css';
import type { GithubUser } from '../Interfaces/GithubUser';
import { fetchUserInfo } from '../../Services/GithubService';
import LoadingSpinner from '../components/LoadingSpinner';

const Tab3: React.FC = () => {
  const [userInfo, setUserInfo] = useState<GithubUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [errorMsg, setErrorMsg] = useState<string>("");

  useIonViewWillEnter(() => {
    setLoading(true);
    setErrorMsg(""); // Limpiamos errores previos al volver a entrar
    fetchUserInfo()
      .then((user) => {
        setUserInfo(user);
      })
      .catch((error) => {
        setErrorMsg("Error obteniendo información del usuario: " + (error as Error).message);
      })
      .finally(() => {
        setLoading(false);
      });
  });

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Perfil del Usuario</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="ion-padding tab3-content">
        {loading ? (
          <LoadingSpinner />
        ) : errorMsg ? (
          <div className="tab3-error">
            <p>{errorMsg}</p>
          </div>
        ) : (
          <div className="tab3-wrapper">
            <IonCard className="perfil-card">
              {userInfo?.avatar_url && (
                <div className="avatar-contenedor">
                  <img className="avatar-usuario" src={userInfo.avatar_url} alt={userInfo.name || 'Avatar'} />
                </div>
              )}

              <IonCardHeader className="perfil-header">
                <IonCardTitle>{userInfo?.name || userInfo?.login}</IonCardTitle>
                <IonCardSubtitle>@{userInfo?.login}</IonCardSubtitle>
              </IonCardHeader>

              <IonCardContent className="info-usuario">
                <p>{userInfo?.bio || 'Sin biografía disponible.'}</p>
              </IonCardContent>
            </IonCard>
          </div>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Tab3;