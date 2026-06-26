import { IonItem, IonThumbnail, IonLabel, IonButton, IonIcon } from '@ionic/react';
import { pencil, trash } from 'ionicons/icons';
import type { Repository } from '../Interfaces/Repository';
import './RepoItem.css';

interface RepoItemProps {
  repository: Repository;
  onEdit: (repository: Repository) => void;
  onDelete: (repository: Repository) => void;
}

const RepoItem: React.FC<RepoItemProps> = ({ repository, onEdit, onDelete }) => {
  return (
    <div className="repo-item-wrapper">
      <IonItem className="repo-item">
        <IonThumbnail slot="start" className="repo-thumbnail">
          <img src={repository.owner.avatar_url} alt={`${repository.owner.login} avatar`} />
        </IonThumbnail>
        <IonLabel>
          <h2>{repository.name}</h2>
          <p>{repository.description ?? 'Sin descripción'}</p>
          <p className="repo-language">
            <strong>Lenguaje:</strong> {repository.language ?? 'Desconocido'}
          </p>
        </IonLabel>
      </IonItem>
      
      <div className="repo-actions">
        <IonButton
          fill="clear"
          color="primary"
          onClick={() => onEdit(repository)}
          className="action-btn"
        >
          <IonIcon icon={pencil} slot="icon-only" />
        </IonButton>
        <IonButton
          fill="clear"
          color="danger"
          onClick={() => onDelete(repository)}
          className="action-btn"
        >
          <IonIcon icon={trash} slot="icon-only" />
        </IonButton>
      </div>
    </div>
  );
};

export default RepoItem;
