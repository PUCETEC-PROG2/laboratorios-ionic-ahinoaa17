import React, { useState } from "react";
import { 
  IonAlert,
  IonContent, 
  IonHeader, 
  IonPage, 
  IonTitle, 
  IonToolbar, 
  IonList, 
  IonToast,
  useIonViewWillEnter 
} from "@ionic/react";
import { fetchRepositories, updateRepository, deleteRepository } from "../../Services/GithubService";
import type { Repository } from "../Interfaces/Repository";
import type { RepositoryPayload } from "../Interfaces/RepositoryPayload";
import LoadingSpinner from "../components/LoadingSpinner";
import RepoItem from "../components/RepoItem";

const Tab1: React.FC = () => {
  const [repositoryList, setRepositoryList] = useState<Repository[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [selectedRepo, setSelectedRepo] = useState<Repository | null>(null);
  const [showEditAlert, setShowEditAlert] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [toastMessage, setToastMessage] = useState<string>('');
  const [editData, setEditData] = useState<RepositoryPayload>({ name: '', description: '' });

  const fetchRepos = async () => {
    setLoading(true);
    setErrorMsg("");
    try {
      const repos = await fetchRepositories();
      setRepositoryList(repos);
    } catch (error) {
      console.error("Error obteniendo repositorios", error);
      setErrorMsg("Error obteniendo repositorios: " + (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (repository: Repository) => {
    setSelectedRepo(repository);
    setEditData({ name: repository.name, description: repository.description ?? '' });
    setShowEditAlert(true);
  };

  const handleDelete = (repository: Repository) => {
    setSelectedRepo(repository);
    setShowDeleteAlert(true);
  };

  const submitEdit = async (data: RepositoryPayload) => {
    if (!selectedRepo) return;
    setLoading(true);
    try {
      const updated = await updateRepository(selectedRepo.owner.login, selectedRepo.name, data);
      setRepositoryList((current) => current.map((repo) => (repo.id === updated.id ? updated : repo)));
      setToastMessage('Repositorio actualizado correctamente');
    } catch (error) {
      setErrorMsg('Error actualizando repositorio: ' + (error as Error).message);
    } finally {
      setLoading(false);
      setShowEditAlert(false);
      setSelectedRepo(null);
    }
  };

  const submitDelete = async () => {
    if (!selectedRepo) return;
    setLoading(true);
    try {
      await deleteRepository(selectedRepo.owner.login, selectedRepo.name);
      setRepositoryList((current) => current.filter((repo) => repo.id !== selectedRepo.id));
      setToastMessage('Repositorio eliminado correctamente');
    } catch (error) {
      setErrorMsg('Error eliminando repositorio: ' + (error as Error).message);
    } finally {
      setLoading(false);
      setShowDeleteAlert(false);
      setSelectedRepo(null);
    }
  };

  useIonViewWillEnter(() => {
    fetchRepos();
  });

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Repositorios</IonTitle>
        </IonToolbar>
      </IonHeader>
      
      <IonContent fullscreen className="ion-padding">
        {loading ? (
          <LoadingSpinner />
        ) : errorMsg ? (
          <p style={{ color: "red", padding: "1rem" }}>{errorMsg}</p>
        ) : (
          <IonList>
            {repositoryList.map((repo) => (
              <RepoItem
                key={repo.id}
                repository={repo}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </IonList>
        )}

        <IonAlert
          isOpen={showEditAlert}
          onDidDismiss={() => setShowEditAlert(false)}
          header="Editar repositorio"
          inputs={[
            {
              name: 'name',
              type: 'text',
              value: editData.name,
              placeholder: 'Nombre del repositorio',
            },
            {
              name: 'description',
              type: 'textarea',
              value: editData.description,
              placeholder: 'Descripción del repositorio',
            },
          ]}
          buttons={[
            {
              text: 'Cancelar',
              role: 'cancel',
              handler: () => setShowEditAlert(false),
            },
            {
              text: 'Guardar',
              handler: (values) => {
                submitEdit({
                  name: values.name || '',
                  description: values.description || '',
                });
              },
            },
          ]}
          onDidPresent={() => {
            if (selectedRepo) {
              setEditData({ name: selectedRepo.name, description: selectedRepo.description ?? '' });
            }
          }}
        />

        <IonAlert
          isOpen={showDeleteAlert}
          onDidDismiss={() => setShowDeleteAlert(false)}
          header="Eliminar repositorio"
          message={`¿Seguro que quieres eliminar ${selectedRepo?.name}? Esta acción no se puede deshacer.`}
          buttons={[
            {
              text: 'Cancelar',
              role: 'cancel',
              handler: () => setShowDeleteAlert(false),
            },
            {
              text: 'Eliminar',
              role: 'destructive',
              handler: submitDelete,
            },
          ]}
        />

        <IonToast
          isOpen={toastMessage.length > 0}
          message={toastMessage}
          duration={2000}
          onDidDismiss={() => setToastMessage('')}
        />
      </IonContent>
    </IonPage>
  );
};

export default Tab1;