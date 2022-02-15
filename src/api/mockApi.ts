// import {  ListParams, ListResponse, User} from '../models';
import axiosClient from './axiosClient';

const mockApi = {
  async getAllData(): Promise<void> {
    const url = '/DEMO';
    return await axiosClient.get(url);
  },
  async getData(params: { limit: Number; page: Number }): Promise<void> {
    const url = '/DEMO';
    return await axiosClient.get(url, { params });
  },
  async addData(payload: { email: string; name: string; position: string }) {
    const url = '/DEMO';
    return await axiosClient.post(url, payload);
  },
};

export default mockApi;
