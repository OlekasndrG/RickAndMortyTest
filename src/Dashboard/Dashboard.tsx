import { useEffect, useState } from 'react';
import { filterCharacters, getAllCharacters } from '../API/Services';
import { useQuery } from '@tanstack/react-query';
import CharacterItem from './DashboardItem';
import styles from './DashboardItem.module.css';
import { Character } from '../API/interfaces';
import { MultiSelect } from '../components/Filter';
import { Pagination } from '../components/Pagination';
import Card from './DashboardItem';

export default function Dashboard() {
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState('');

  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ['characters', page, filter],
    queryFn: () => filterCharacters(page, filter),

    staleTime: 10 * 1000,
  });

  const onSetFilterValue = (filterValue: string) => {
    setFilter(filterValue);
    setPage(1);
  };
  console.log(data?.results);
  if (error) return 'An error has occurred: ' + error.message;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 mt-12 flex flex-wrap items-start">
      {/* Sidebar */}
      <div className="w-full sm:w-1/4 pr-4 mb-8 sm:mb-0">
        <MultiSelect FilterValue={onSetFilterValue} />
      </div>
      <div>
        <Pagination
          info={data?.info}
          pageNumber={page}
          updatePageNumber={setPage}
        />
      </div>

      {isFetching || isPending ? (
        <>fetching</>
      ) : (
        <ul className={styles.dashBoardContainer}>
          {data?.results?.map(item => {
            return (
              <li key={item.id}>
                <Card item={item} />
              </li>
            );
          })}
        </ul>
      )}

      {error && <p>An error has occurred: {error.message}</p>}
    </div>
  );
}
