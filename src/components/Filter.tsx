import { MouseEvent, useState } from 'react';
import Select from 'react-select';

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
}
export interface Option {
  label: string;
  value: string;
}

export const MultiSelect = ({ FilterValue }: FilterInterface) => {
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
  const onSearchButtonClick = async (e: MouseEvent) => {
    e.preventDefault();

    const urlParams = [];

    if (searchValue !== '') {
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

  return (
    <>
      <label htmlFor="search">
        Search
        <input
          type="text"
          value={searchValue}
          name="search"
          autoComplete="off"
          autoFocus
          placeholder="Введіть імя"
          onChange={e => setSearchValue(e.target.value)}
        ></input>
      </label>

      <Select
        options={GenderOptions}
        isMulti={false}
        placeholder="Select options to filter characters by Gender"
        closeMenuOnSelect={true}
        hideSelectedOptions={false}
        value={selectedGenderOption}
        onChange={setSelectedGenderOption}
      />
      <Select
        value={selectedStatusOption}
        options={StatusOptions}
        isMulti={false}
        placeholder="Select options to filter characters by Status"
        closeMenuOnSelect={true}
        hideSelectedOptions={false}
        onChange={setSelectedStatusOption}
      />
      <Select
        value={selectedSpeciesOption}
        options={SpeciesOptions}
        isMulti={false}
        placeholder="Select options to filter characters by Species"
        closeMenuOnSelect={true}
        hideSelectedOptions={false}
        onChange={setSelectedSpeciesOption}
      />
      <button type="button" onClick={onSearchButtonClick}>
        Apply changes
      </button>
    </>
  );
};
