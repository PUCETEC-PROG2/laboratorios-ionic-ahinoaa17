import axios from 'axios';
import type { Repository } from '../src/Interfaces/Repository';
import type { GithubUser } from '../src/Interfaces/GithubUser';
import type { RepositoryPayload } from '../src/Interfaces/RepositoryPayload';

type GithubRepo = {
  id: number;
  name: string;
  description?: string | null;
  language?: string | null;
  owner: { login: string; avatar_url: string };
};

// 1. Acceder correctamente a las variables de entorno (Vite / React CLI)
const GITHUB_API_URL = import.meta.env.VITE_GITHUB_API_URL || 'https://api.github.com';
const GITHUB_API_TOKEN = import.meta.env.VITE_GITHUB_API_TOKEN || '';

const headers: Record<string, string> = {
  Accept: 'application/vnd.github.v3+json',
};

if (GITHUB_API_TOKEN) {
  headers.Authorization = `token ${GITHUB_API_TOKEN}`;
}

const apiClient = axios.create({
  baseURL: GITHUB_API_URL,
  headers,
});

export const fetchRepositories = async (): Promise<Repository[]> => {
  try {
    const response = await apiClient.get<GithubRepo[]>('/user/repos', {
      params: {
        per_page: 100,
        sort: 'updated',
        direction: 'desc',
        affiliation: 'owner,collaborator',
        t: Date.now(),
      },
    });

    // 2. Corregido: Se añadió 'owner' en el map ya que Tab1.tsx lo necesita obligatoriamente
    return response.data.map((repo) => ({
      id: repo.id,
      name: repo.name,
      description: repo.description ?? undefined,
      language: repo.language ?? undefined,
      owner: {
        login: repo.owner.login,
        avatar_url: repo.owner.avatar_url,
      },
    }));
  } catch (error) {
    console.error('Error obteniendo repositorios:', error);
    // Es mejor lanzar el error para que la interfaz (Tab1) pueda capturarlo y mostrar el errorMsg
    throw error; 
  }
};

export const createRepository = async (repository: RepositoryPayload): Promise<Repository | null> => {
  try {
    const response = await apiClient.post('/user/repos', repository);
    if (response.status !== 201) {
      throw new Error(`Error creando repositorio: ${response.statusText}`);
    }
    return response.data;
  } catch (error: unknown) {
    let message = 'Error desconocido';
    if (axios.isAxiosError(error)) {
      message = error.response?.data?.message || error.message;
    } else if (error instanceof Error) {
      message = error.message;
    } else if (typeof error === 'string') {
      message = error;
    }
    throw new Error(message);
  }
};

export const updateRepository = async (
  owner: string,
  repo: string,
  repository: RepositoryPayload
): Promise<Repository> => {
  try {
    const response = await apiClient.patch<Repository>(`/repos/${owner}/${repo}`, repository);
    return response.data;
  } catch (error: unknown) {
    let message = 'Error desconocido';
    if (axios.isAxiosError(error)) {
      message = error.response?.data?.message || error.message;
    } else if (error instanceof Error) {
      message = error.message;
    } else if (typeof error === 'string') {
      message = error;
    }
    throw new Error(message);
  }
};

export const deleteRepository = async (owner: string, repo: string): Promise<void> => {
  try {
    await apiClient.delete(`/repos/${owner}/${repo}`);
  } catch (error: unknown) {
    let message = 'Error desconocido';
    if (axios.isAxiosError(error)) {
      message = error.response?.data?.message || error.message;
    } else if (error instanceof Error) {
      message = error.message;
    } else if (typeof error === 'string') {
      message = error;
    }
    throw new Error(message);
  }
};

export const fetchUserInfo = async (): Promise<GithubUser | null> => {
  try {
    const response = await apiClient.get<GithubUser>('/user');
    return response.data;
  } catch (error: unknown) {
    let message = 'Error desconocido';
    if (axios.isAxiosError(error)) {
      message = error.response?.data?.message || error.message;
    } else if (error instanceof Error) {
      message = error.message;
    } else if (typeof error === 'string') {
      message = error;
    }
    throw new Error(message);
  }
};