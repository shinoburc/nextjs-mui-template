'use client';

import React from 'react';
import { Prisma, Department } from '@prisma/client';

/* ライブラリ Material-UI が提供するコンポーネントの import */
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import type { ThanksCardWithFromTo } from '@/app/_repositories/ThanksCard';

// reference:
// https://www.prisma.io/docs/concepts/components/prisma-client/advanced-type-safety/operating-against-partial-structures-of-model-types#problem-using-variations-of-the-generated-model-type
/*
const thanksCardWithFromTo = Prisma.validator<Prisma.ThanksCardArgs>()({
    include: {
        from: true,
        to: true,
    }
});
type ThanksCardWithFromTo = Prisma.ThanksCardGetPayload<typeof thanksCardWithFromTo>
*/

/*
type ThanksCardWithFromTo = Prisma.ThanksCardGetPayload<{
    include: {
        from: true;
        to: true;
    }
}>
*/

type Props = {
  thanks_cards: ThanksCardWithFromTo[];
};

function ThanksCardList(props: Props) {
  const thanks_cards = props.thanks_cards;

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell>id</TableCell>
            <TableCell>title</TableCell>
            <TableCell>body</TableCell>
            <TableCell>from</TableCell>
            <TableCell>to</TableCell>
            <TableCell>createdAt</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* thanks_cards 全件をテーブル出力する */}
          {thanks_cards?.map((thanks_card) => {
            return (
              /* 一覧系の更新箇所を特定するために一意となる key を設定する必要がある */
              <TableRow key={thanks_card.id}>
                <TableCell>{thanks_card.id}</TableCell>
                <TableCell>{thanks_card.title}</TableCell>
                <TableCell>{thanks_card.body}</TableCell>
                <TableCell>{thanks_card.from.name}</TableCell>
                <TableCell>{thanks_card.to.name}</TableCell>
                <TableCell>{thanks_card.createdAt?.toString()}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ThanksCardList;
