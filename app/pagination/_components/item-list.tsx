import { ItemRepository } from '@/app/_repositories/Item';

import Pagination from '@/app/pagination/_components/pagination';

import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

type ItemListProps = {
  query: string;
  page: number;
  perPage: number;
}

export default async function ItemList(props: ItemListProps) {
  const { query, page, perPage } = props;
  // 現在のページ(page)数と1ページあたりの表示(perPage)数から、skip と take を計算する。
  const skip = page * perPage;
  const take = perPage;

  // Pagination コンポーネントで使用するため、Item の総数を取得する。
  const count = await ItemRepository.countByQuery(query);
  // Item の一覧を取得する。
  const items = await ItemRepository.search(query, skip, take);

  return (
    <>
      {/* Pagination コンポーネントを表示 */}
      <Pagination count={count} />
      {/* items を表示 */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>item_attr1</TableCell>
              <TableCell>item_attr2</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.items_attr1}</TableCell>
                <TableCell>{item.items_attr2}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}