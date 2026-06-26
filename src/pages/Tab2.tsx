import React, { useState } from 'react';
import { 
  IonButton, 
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent, 
  IonHeader, 
  IonInput, 
  IonPage, 
  IonText, 
  IonTextarea, 
  IonTitle, 
  IonToolbar, 
  useIonViewWillEnter 
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import './Tab2.css';
import type { RepositoryPayload } from '../Interfaces/RepositoryPayload';
import { createRepository } from '../../Services/GithubService';
import LoadingSpinner from '../components/LoadingSpinner';

const Tab2: React.FC = () => {
  const history = useHistory();
  const [repositoryData, setRepositoryData] = useState<RepositoryPayload>({
    name: '',
    description: '',
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');

  const saveRepository = async () => {
    if (repositoryData.name.trim() === '') {
      setErrorMsg('El nombre del repositorio es requerido');
      return;
    }
    setLoading(true);
    createRepository(repositoryData)
      .then(() => {
        history.push('/tab1');
      })
      .catch((error) => {
        setErrorMsg("Error creando repositorio: " + (error as Error).message);
        console.error("Error creando repositorio", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useIonViewWillEnter(() => {
    setRepositoryData({ name: '', description: '' });
    setErrorMsg('');
  });

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Crear Repositorio</IonTitle>
        </IonToolbar>
      </IonHeader>
      
      <IonContent fullscreen className="ion-padding tab2-content">
        <div className="tab2-wrapper">
          <IonCard className="form-card">
            <IonCardHeader>
              <IonCardTitle>Nuevo repositorio</IonCardTitle>
              <IonCardSubtitle>Llena los datos y pulsa guardar</IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent>
              <div className="form-field">
                <IonInput
                  label="Nombre del repositorio"
                  placeholder="Ejemplo: mi-proyecto"
                  labelPlacement="floating"
                  value={repositoryData.name}
                  onIonChange={(e) => setRepositoryData({ ...repositoryData, name: e.detail.value || '' })}
                  clearInput
                />
              </div>

              <div className="form-field">
                <IonTextarea
                  label="Descripción del repositorio"
                  placeholder="Describe brevemente lo que hace"
                  labelPlacement="floating"
                  value={repositoryData.description}
                  onIonChange={(e) => setRepositoryData({ ...repositoryData, description: e.detail.value || '' })}
                  rows={5}
                />
              </div>

              {errorMsg && (
                <p className="error-msg">
                  <IonText color="danger">{errorMsg}</IonText>
                </p>
              )}

              <IonButton
                className="submit-button"
                expand="block"
                fill="solid"
                onClick={saveRepository}
                disabled={loading}
              >
                {loading ? 'Guardando...' : 'Guardar'}
              </IonButton>
            </IonCardContent>
          </IonCard>
        </div>

        {loading && <LoadingSpinner />}
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
