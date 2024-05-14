import axios from 'axios';
import { Character } from './interfaces';

const BASE_URL = 'https://rickandmortyapi.com/api';
interface CharacterResponse {
  characters: Character[];
  end: string | null;
}

export interface MainResponse {
  results: Character[];
  // info: Info<Character[]>;
  info?: {
    /** The length of the response */
    count: number;
    /** The amount of pages */
    pages: number;
    /** Link to the next page (if it exists) */
    next: string | null;
    /** Link to the previous page (if it exists) */
    prev: string | null;
  };
  error: string | null;
}

export const getAllCharacters = async (
  page: number
): Promise<CharacterResponse> => {
  const res = await axios.get(`${BASE_URL}/character?page=${page}`);
  const end = await res.data.info.next;
  if (res.status !== 200) {
    throw new Error('something went wrong with the request');
  }

  if (end === null) {
    console.log('end worjed');
  }
  return (await { characters: res.data.results, end }) as CharacterResponse;
};
export const filterCharacters = async (
  page: number,
  url: string
): Promise<MainResponse> => {
  const res = await axios.get(`${BASE_URL}/character?page=${page}&${url}`);
  if (res.status !== 200) {
    throw new Error('something went wrong with the request');
  }

  return await res.data;
};

export const getAll = async (page: number): Promise<MainResponse> => {
  const res = await axios.get(`${BASE_URL}/character?page=${page}`);

  if (res.status !== 200) {
    throw new Error('Something went wrong with the request');
  }
  return await res.data;
};

// export const filterCharacters = async (
//   page: number
// ): Promise<CharacterResponse> => {
//   try {
//     const res = await axios.get(`${BASE_URL}/character?page=${page}`);
//     if (res.status !== 200) {
//       throw new Error('Something went wrong with the request');
//     }
//     return {
//       characters: res.data.results as Character[],
//       message: null,
//     };
// } catch (error) {
//   return {
//     characters: [],
//     message: error.message,
//   };
//   }
// };
