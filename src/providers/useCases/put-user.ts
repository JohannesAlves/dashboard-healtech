import jsonServerApi from '../api';
import { IUsers } from '../dto/get-all-users-dto';

export const putUser = async (id: string, data: IUsers): Promise<IUsers[]> => {
  const response = await jsonServerApi.put(`/users/${id}`, data);

  return response.data;
};
