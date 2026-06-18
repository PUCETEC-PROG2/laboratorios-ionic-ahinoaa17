import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonCard,
  IonItem,
  IonLabel,
  IonAvatar
} from '@ionic/react';

import './Tab1.css';

const Tab1: React.FC = () => {
  const repositorios = [
    {
      nombre: 'laboratorios-ionic-ahinoaa17',
      descripcion: 'Cliente GitHub desarrollado con Ionic'
    },
    {
      nombre: 'desarrollo-movil',
      descripcion: 'Ejercicios y prácticas de la asignatura'
    },
    {
      nombre: 'proyecto-prueba',
      descripcion: 'Repositorio de prueba'
    }
  ];

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Repositorios</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">

        {repositorios.map((repo, index) => (
          <IonCard className="repo-card" key={index}>

            <IonItem lines="none" className="repo-item">

              <IonAvatar slot="start" className="repo-avatar">
                <img
                  src="https://www.jasoft.org/Blog/image.axd?picture=/GitHub-Logo_thumb.png"
                  alt="GitHub"
                />
              </IonAvatar>

              <IonLabel>
                <h2 className="repo-nombre">{repo.nombre}</h2>
                <p className="repo-descripcion">
                  {repo.descripcion}
                </p>
              </IonLabel>

            </IonItem>

          </IonCard>
        ))}

      </IonContent>
    </IonPage>
  );
};

export default Tab1;