import ReactPaginate from 'react-paginate';

export interface PaginationProps {
  pageNumber: number;
  updatePageNumber: number;
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
}

export const Pagination = ({
  pageNumber,
  info,
  updatePageNumber,
}: PaginationProps) => {
  const pageChange = data => {
    updatePageNumber(data.selected + 1);
  };

  return (
    <>
      <ReactPaginate
        containerClassName="flex justify-center my-4 gap-4  text-gray-600"
        previousLabel={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        }
        pageLinkClassName=""
        activeClassName="px-4 py-2 rounded bg-gray-300 text-gray-900 font-medium hover:bg-gray-400"
        pageClassName="px-4 py-2 rounded hover:bg-gray-100 border border-gray-300 rounded-lg"
        forcePage={pageNumber === 1 ? 0 : pageNumber - 1}
        nextLabel={
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        }
        previousClassName="flex items-center justify-center px-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        nextClassName="flex items-center justify-center px-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        marginPagesDisplayed={2}
        pageRangeDisplayed={2}
        pageCount={info?.pages}
        onPageChange={pageChange}
      />
    </>
  );
};
