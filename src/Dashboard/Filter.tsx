import { Character } from '../API/interfaces';

export interface CharacterItem {
  item: Character;
}

export default function Character({ item }: CharacterItem) {
  const {
    id,
    episode,
    gender,
    image,
    location,
    name,
    origin,
    species,
    status,
    type,
  } = item;
  return (
    <div>
      <h3>{name}</h3>
      <img src={image} alt={name} />
      <p> status :{status}</p>
      <p> type: {type}</p>
      <p>origin :{origin.name}</p>
      <p>gender :{gender}</p>
    </div>
  );
}
