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
  //const skip = (page - 1) * perPage;
  const skip = page * perPage;
  const take = perPage;

  const count = await ItemRepository.countByQuery(query);
  const items = await ItemRepository.search(query, skip, take);

  return (
    <>
      <Pagination count={count} />
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