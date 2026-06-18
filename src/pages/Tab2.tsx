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
  IonItem,
  IonLabel,
  IonPage,
  IonTextarea,
  IonTitle,
  IonToolbar,
  useIonAlert
} from '@ionic/react';

import { useState } from 'react';
import './Tab2.css';

const Tab2: React.FC = () => {

  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');

  const [presentAlert] = useIonAlert();

  const guardarRepositorio = () => {

    if (nombre.trim() === '' || descripcion.trim() === '') {

      presentAlert({
        header: 'Información incompleta',
        message: 'Debe completar todos los campos.',
        buttons: ['Aceptar']
      });

      return;
    }

    presentAlert({
      header: 'Repositorio guardado',
      message: `El repositorio "${nombre}" se registró correctamente.`,
      buttons: ['Aceptar']
    });

    setNombre('');
    setDescripcion('');
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Crear Repositorio</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">

        <IonCard className="form-card">

          <IonCardHeader>
            <IonCardTitle>
              Nuevo Repositorio
            </IonCardTitle>

            <IonCardSubtitle>
              Complete la información requerida
            </IonCardSubtitle>
          </IonCardHeader>

          <IonCardContent>

            <IonItem className="form-item">
              <IonLabel position="stacked">
                Nombre del repositorio
              </IonLabel>

              <IonInput
                value={nombre}
                onIonInput={(e) => setNombre(e.detail.value!)}
                placeholder="Ej: laboratorio-ionic"
              />
            </IonItem>

            <IonItem className="form-item">
              <IonLabel position="stacked">
                Descripción
              </IonLabel>

              <IonTextarea
                value={descripcion}
                onIonInput={(e) => setDescripcion(e.detail.value!)}
                rows={4}
                placeholder="Ingrese una descripción"
              />
            </IonItem>

            <IonButton
              expand="block"
              className="btn-crear"
              onClick={guardarRepositorio}
            >
              Guardar Repositorio
            </IonButton>

          </IonCardContent>

        </IonCard>

      </IonContent>
    </IonPage>
  );
};

export default Tab2;