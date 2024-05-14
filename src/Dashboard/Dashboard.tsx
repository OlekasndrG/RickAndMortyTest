import { useEffect, useState } from 'react';
import { getAllCharacters } from '../API/Services';
import { useQuery } from '@tanstack/react-query';
import CharacterItem from './DashboardItem';
import styles from './DashboardItem.module.css';
import { Character } from '../API/interfaces';

export default function Dashboard() {
  const [page, setPage] = useState(40);
  const [dataToRender, setDataToRender] = useState<Character[]>([]);
  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ['characters', page],
    queryFn: () => getAllCharacters(page),
    staleTime: 10 * 1000,
  });
  console.log(data?.characters);
  useEffect(() => {
    getAllCharacters(1)
      .then(res => setDataToRender(res.characters))
      .then(console.log);
  }, []);

  const onLoadMore = () => {
    setPage(prev => prev + 1);
    if (data) {
      setDataToRender(prev => [...prev, ...data?.characters]);
    }
  };
  //   const renderedList = dataToRender.length ? dataToRender : data;

  //   if (isFetching || isPending) return <span>Data is loading...</span>;

  if (error) return 'An error has occurred: ' + error.message;

  return (
    <div className={styles.pageContainer}>
      <ul className={styles.dashBoardContainer}>
        {dataToRender?.map(item => {
          return (
            <li key={item.id}>
              <CharacterItem item={item} />
            </li>
          );
        })}
      </ul>
      {data?.end && (
        <button
          type="button"
          onClick={onLoadMore}
          className={styles.loadMoreButton}
          disabled={isFetching || isPending}
        >
          load more
        </button>
      )}

      {error && <p>An error has occurred: {error.message}</p>}
    </div>
  );
}

// import React, { useState, useEffect } from 'react';
// import { useQuery } from '@tanstack/react-query';
// import { getAllCharacters } from '../API'; // Import your API function

// export default function Dashboard() {
//   const [page, setPage] = useState(1);
//   const [newData, setNewData] = useState([]);
//   const [renderedData, setRenderedData] = useState([]);

//   const { isPending, error, data, isFetching } = useQuery({
//     queryKey: ['characters', page],
//     queryFn: () => getAllCharacters(page),
//   });

//   useEffect(() => {
//     if (data) {
//       // Update only the newData state when new data arrives
//       setNewData(data);
//     }
//   }, [data]);

//   useEffect(() => {
//     if (newData.length > 0) {
//       // Concatenate new data with existing renderedData
//       setRenderedData(prevData => [...prevData, ...newData]);
//       // Clear the newData state after appending it to renderedData
//     }
//   }, [newData]);

//   const onLoadMore = () => {
//     setPage(prevPage => prevPage + 1);
//   };

//   if (isFetching || isPending) return <span>Data is loading...</span>;

//   if (error) return <div>An error has occurred: {error.message}</div>;

//   return (
//     <>
//       <ul style={{ display: 'flex', flexDirection: 'column' }}>
//         {renderedData.map(item => (
//           <li key={item.id}>
//             <Character item={item} />
//           </li>
//         ))}
//       </ul>
//       <button type="button" onClick={onLoadMore}>
//         Load more
//       </button>
//     </>
//   );
// }
