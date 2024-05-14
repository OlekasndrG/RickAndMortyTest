import axios from 'axios';
import { Character } from './interfaces';

const BASE_URL = 'https://rickandmortyapi.com/api';
interface CharacterResponse {
  characters: Character[];
  end: string | null;
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
export const filterCharacters = async (page: number) => {
  const res = await axios.get(`${BASE_URL}/character?page=${page}`);
  if (res.status !== 200) {
    throw new Error('something went wrong with the request');
  }

  return (await res.data.results) as CharacterResponse;
};

// export const getAllCharacters = async (
//   page: number
// ): Promise<CharacterResponse> => {
//   try {
//     const res = await axios.get(`${BASE_URL}/character?page=${page}`);
//     const end = res.data.info.next;
//     if (res.status !== 200) {
//       throw new Error('Something went wrong with the request');
//     }
//     if (end === null) {
//       return {
//         characters: [],
//         end: 'End of character list reached',
//       };
//     }
//     return {
//       characters: res.data.results as Character[],
//       message: null,
//     };
//   } catch (error) {
//     return {
//       characters: [],
//       message: error.message,
//     };
//   }
// };

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
//   } catch (error) {
//     return {
//       characters: [],
//       message: error.message,
//     };
//   }
// };
