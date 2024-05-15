import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { filterCharacters } from '../API/Services';

import styles from './DashboardItem.module.css';
import { MultiSelect } from '../components/Filter/Filter';
import { Pagination } from '../components/Pagination/Pagination';
import Card from './Card/DashboardItem';
import { Character } from '../API/interfaces';

export default function Dashboard() {
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState('');
  const [mainArray, setMainArray] = useState<Character[]>([]);
  const { isPending, isError, isSuccess, error, data, isFetching } = useQuery({
    queryKey: ['characters', page, filter],
    queryFn: () => filterCharacters(page, filter),
    retry: false,
    staleTime: 10 * 1000,
  });

  useEffect(() => {
    if (data?.results) {
      setMainArray([...data.results]);
    }
  }, [data?.results]);

  const onSetFilterValue = (filterValue: string) => {
    setFilter(filterValue);
    setPage(1);
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.mainContainer}>
        <MultiSelect
          FilterValue={onSetFilterValue}
          sort={setMainArray}
          mainArray={mainArray}
        />
        {isFetching || isPending ? (
          <div className="mx-auto mt-4 border-gray-300 h-40 w-40 animate-spin rounded-full border-8 border-t-blue-600" />
        ) : (
          <div>
            {isSuccess && (
              <ul className={styles.dashBoardContainer}>
                {mainArray.map(item => {
                  return (
                    <li key={item.id}>
                      <Card item={item} />
                    </li>
                  );
                })}
              </ul>
            )}
            <div>
              {!isError && (
                <Pagination
                  info={data?.info}
                  pageNumber={page}
                  updatePageNumber={setPage}
                />
              )}
            </div>
          </div>
        )}

        {error && (
          <h3 className="text-2xl text-center font-bold mt-10 ml-10">
            {error?.status == 404 ? (
              <>Error: Characters with these paramaters were not found. </>
            ) : (
              <>Error: Something went wrong.</>
            )}
          </h3>
        )}
      </div>
    </div>
  );
}
