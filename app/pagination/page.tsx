import Search from '@/app/pagination/_components/search';
import ItemList from '@/app/pagination/_components/item-list';

export default async function PaginationPage({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
    perPage?: string;
  };
}) {
  const query = searchParams?.query || '';
  const page = Number(searchParams?.page) || 0;
  const perPage = Number(searchParams?.perPage) || 10;

  return (
    <main>
      <div>
        <Search placeholder="Search items" />
        <ItemList query={query} page={page} perPage={perPage} />
      </div>
    </main>
  );
}