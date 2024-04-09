'use client';

import { TablePagination } from '@mui/material';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';

type PaginationProps = {
  count: number
};

export default function Pagination(props: PaginationProps) {
  const count = props.count;

  const searchParams = useSearchParams();
  const page = Number(searchParams.get('page')) || 0;
  const perPage = Number(searchParams.get('perPage')) || 10;

  const pathname = usePathname();
  const { replace } = useRouter();
 
  // ページ数を URL クエリパラメーターに追加する。
  function handlePage(page: number) {
    const params = new URLSearchParams(searchParams);
    if (page) {
      params.set('page', page.toString());
    } else {
      params.delete('page');
    }
    replace(`${pathname}?${params.toString()}`);
  }

  // 1ページあたりの表示数を URL クエリパラメーターに追加する。
  function handlePerPage(perPage: number) {
    const params = new URLSearchParams(searchParams);
    if (perPage) {
      params.set('perPage', perPage.toString());
    } else {
      params.delete('perPage');
    }
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <>
      {/* mui TablePagination を使用して Pagination を表示 */}
      <TablePagination
        component="div"
        count={count}
        rowsPerPage={perPage}
        page={page}
        onPageChange={(event, page) => {
          handlePage(page);
        }}
        onRowsPerPageChange={(event) => {
          handlePerPage(parseInt(event.target.value));
        }}
      />
    </>
  );
}