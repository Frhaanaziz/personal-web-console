import axios from 'axios';
import { backendUrl } from './constant';

export function getBackendApi(token: string, params?: any) {
  return axios.create({
    baseURL: backendUrl,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params,
  });
}

export function getApi(token: string) {
  return axios.create({
    baseURL: '/api',
    headers: {
      Authorization: token ? `Bearer ${token}` : undefined,
    },
  });
}
