import Search from '@/app/pagination/_components/search';
import ItemList from '@/app/pagination/_components/item-list';
import { Typography } from '@mui/material';


// searchParams は URL クエリパラメーターから取得する。
// reference: https://nextjs.org/docs/app/api-reference/file-conventions/page#searchparams-optional
type PaginationPageProps = {
  searchParams?: {
    query?: string;
    page?: string;
    perPage?: string;
  }
};

export default async function PaginationPage(props: PaginationPageProps) {
  // URL クエリパラメーターから query, page, perPage を取得する。
  const query = props.searchParams?.query || '';
  const page = Number(props.searchParams?.page) || 0;
  const perPage = Number(props.searchParams?.perPage) || 10;

  return (
    <main>
      <div>
        <Typography variant="h4" component="h1">
          検索クエリ(query)、ページ数(page)、1ページあたりの表示数(perPage)を
          URL クエリパラメーターに追加しながら、Item の一覧を表示する。
        </Typography>
        {/* 
          検索フォーム。
          URL クエリパラメーターに query を追加する。
         */}
        <Search placeholder="Search items" />
        {/* 
          ItemList コンポーネント。
          Item の一覧と Pagination を表示する。
         */}
        <ItemList query={query} page={page} perPage={perPage} />
      </div>
    </main>
  );
}