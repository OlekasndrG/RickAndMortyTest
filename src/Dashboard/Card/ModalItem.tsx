import { Character } from '../../API/interfaces';

import { Modal } from '../../Utils/Modal/Modal';
import clsx from 'clsx';
export interface ModalItemProps {
  item: Character;
  closeModal: () => void;
}

export default function ModalItem({ closeModal, item }: ModalItemProps) {
  const { gender, image, location, name, origin, species, status, type } = item;

  return (
    <Modal onClose={closeModal}>
      <div className="flex flex-col items-center text-l bg-blue-200 gap-3  font-bold p-6 ">
        <h3>{name}</h3>
        <img src={image} alt={name} width={300} height={420} />
        <p>location : {location.name}</p>
        <div
          className={clsx(
            'inline-flex items-center py-1 px-3.5 rounded-3xl text-sm font-medium',
            status === 'Alive' && 'text-green-700 bg-green-100',
            status === 'Dead' && 'text-red-700 bg-red-100',
            status === 'unknown' && 'text-gray-700 bg-gray-100'
          )}
        >
          <div className="w-2 h-2 mr-2 rounded-full bg-current" />
          status : {status}
        </div>

        <p>Type: {type}</p>
        <p>Origin:{origin.name}</p>
        <p>Gender: {gender}</p>
        <p>Species: {species}</p>
      </div>
    </Modal>
  );
}
