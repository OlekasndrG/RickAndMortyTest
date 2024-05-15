import { FormEvent, useState } from 'react';
import Select from 'react-select';
import { Character } from '../../API/interfaces';

const GenderOptions = [
  {
    label: 'Gender',
    options: [
      {
        label: 'Female',
        value: 'Female',
      },
      {
        label: 'Male',
        value: 'Male',
      },
      {
        label: 'Genderless',
        value: 'Genderless',
      },
      {
        label: 'unknown',
        value: 'unknown',
      },
    ],
  },
];
const StatusOptions = [
  {
    label: 'Status',
    options: [
      { label: 'Dead', value: 'Dead' },
      { label: 'Alive', value: 'Alive' },
      { label: 'unknown', value: 'unknown' },
    ],
  },
];
const SpeciesOptions = [
  {
    label: 'Species',
    options: [
      { label: 'Human', value: 'Human' },
      { label: 'Alien', value: 'Alien' },
      { label: 'Humanoid', value: 'Humanoid' },
      { label: 'Poopybutthole', value: 'Poopybutthole' },
      { label: 'Alien', value: 'Alien' },
      { label: 'Mythological', value: 'Mythological' },
      { label: 'Unknown', value: 'Unknown' },
      { label: 'Animal', value: 'Animal' },
      { label: 'Disease', value: 'Disease' },
      { label: 'Robot', value: 'Robot' },
      { label: 'Cronenberg', value: 'Cronenberg' },
      { label: 'Planet', value: 'Planet' },
    ],
  },
];

export interface FilterInterface {
  FilterValue: (a: string) => void;
  sort: (a: Character[]) => void;
  mainArray: Character[];
}
export interface Option {
  label: string;
  value: string;
}

export const MultiSelect = ({
  FilterValue,
  sort,
  mainArray,
}: FilterInterface) => {
  const [selectedGenderOption, setSelectedGenderOption] =
    useState<Option | null>(null);
  const [selectedStatusOption, setSelectedStatusOption] =
    useState<Option | null>(null);
  const [selectedSpeciesOption, setSelectedSpeciesOption] =
    useState<Option | null>(null);
  const [searchValue, setSearchValue] = useState('');
  const clearValues = () => {
    setSearchValue('');
    setSelectedStatusOption(null);
    setSelectedGenderOption(null);
    setSelectedSpeciesOption(null);
  };
  const onSearchButtonClick = async (e: FormEvent) => {
    e.preventDefault();

    const urlParams = [];

    if (searchValue.trim() !== '') {
      urlParams.push(`name=${searchValue}`);
    }
    if (selectedGenderOption) {
      urlParams.push(`gender=${selectedGenderOption.value}`);
    }
    if (selectedStatusOption) {
      urlParams.push(`status=${selectedStatusOption.value}`);
    }
    if (selectedSpeciesOption) {
      urlParams.push(`species=${selectedSpeciesOption.value}`);
    }

    const url = urlParams.join('&');

    FilterValue(url);
    clearValues();
  };
  const onSort = () => {
    const sortedArray = [...mainArray].sort((a, b) =>
      a.name.localeCompare(b.name)
    );
    sort(sortedArray);
  };
  return (
    <form
      className="flex flex-col  gap-4 bg-white p-6 rounded-lg shadow-md min-w-72"
      onSubmit={onSearchButtonClick}
    >
      <label
        htmlFor="search"
        className="block text-center text-gray-700 text-m font-bold "
      >
        Name
        <input
          className="border mt-2 border-gray-300 rounded w-full p-2 block text-gray-700 text-sm font-bold  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 "
          type="text"
          value={searchValue}
          name="search"
          id="search"
          autoComplete="off"
          autoFocus
          placeholder="Enter name"
          onChange={e => setSearchValue(e.target.value)}
        ></input>
      </label>
      <Select
        options={GenderOptions}
        isMulti={false}
        placeholder="Select Gender"
        closeMenuOnSelect={true}
        hideSelectedOptions={false}
        value={selectedGenderOption}
        onChange={setSelectedGenderOption}
      />
      <Select
        value={selectedStatusOption}
        options={StatusOptions}
        isMulti={false}
        placeholder="Select Status"
        closeMenuOnSelect={true}
        hideSelectedOptions={false}
        onChange={setSelectedStatusOption}
      />
      <Select
        value={selectedSpeciesOption}
        options={SpeciesOptions}
        isMulti={false}
        placeholder="Select Species"
        closeMenuOnSelect={true}
        hideSelectedOptions={false}
        onChange={setSelectedSpeciesOption}
      />
      <button
        type="submit"
        className="bg-blue-500 mb-3 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Apply changes
      </button>
      <button
        type="button"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        onClick={onSort}
      >
        Sort by Name
      </button>
    </form>
  );
};
