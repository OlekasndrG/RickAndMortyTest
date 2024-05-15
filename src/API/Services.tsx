import axios, { AxiosError } from 'axios';
import { Character } from './interfaces';

const BASE_URL = 'https://rickandmortyapi.com/api';

export interface MainResponse {
  results: Character[];

  info?: {
    count: number;

    pages: number;

    next: string | null;

    prev: string | null;
  };
  error: string | null;
}

export const filterCharacters = async (
  page: number,
  url: string
): Promise<MainResponse | undefined> => {
  try {
    const res = await axios.get(`${BASE_URL}/character?page=${page}&${url}`);
    if (res.status !== 200) {
      throw new Error('something went wrong with the request');
    }

    return res.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      if (axiosError.response) {
        const status = axiosError.response.status;
        throw { status, message: axiosError.message };
      } else {
        throw { status: 500, message: 'Network Error' };
      }
    }
  }
};
// export const filterCharacters = async (
//   page: number,
//   url: string
// ): Promise<MainResponse | undefined> => {
//   try {
//     const res = await axios.get(`${BASE_URL}/character?page=${page}&${url}`);
//     if (res.status !== 200) {
//       throw new Error('something went wrong with the request');
//     }

//     return res.data;
//   } catch (error: unknown) {
//     if (axios.isAxiosError(error)) {
//       throw new Error(error.response?.data?.error || 'Network Error');
//     }
//     throw new Error('An unexpected error occurred');
//   }
// };
