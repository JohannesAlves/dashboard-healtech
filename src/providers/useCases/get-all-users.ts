import jsonServerApi from '../api';
import { IUsers } from '../dto/get-all-users-dto';

export const getAllUsers = async (): Promise<IUsers[]> => {
  const response = await jsonServerApi.get('/users');

  return response.data;
};
