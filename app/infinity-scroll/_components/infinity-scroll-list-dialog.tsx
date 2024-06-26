'use client';

import { Button, Dialog, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow } from '@mui/material';
import React, { useState, useEffect, useRef } from 'react';
import useSWRInfinite from 'swr/infinite'

import { fetcher }  from '@/app/_utils/fetcher';
import type { Item } from '@/app/_repositories/Item';

type InfinityScrollListDialogProps = {
  open: boolean;
  onClose: () => void;
  onSelect: (item: Item) => void;
};

export function InfinityScrollListDialog(props: InfinityScrollListDialogProps) {
  const { open, onClose, onSelect } = props;
  const [loading, setLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const loader = useRef(null);

  const getKey = (pageIndex: number, previousPageData: Item[][]) => {
    const take = 20;
    const skip = pageIndex * take;
    const params = new URLSearchParams();

    params.set('skip', skip.toString());
    params.set('take', take.toString());
    return `/api/item/pagination?${params.toString()}`
  }

  const swrInfiniteOptions = {
      revalidateIfStale: false, // キャッシュがあっても再検証しない
      revalidateOnFocus: false, // フォーカス時の再検証を行わない 
      revalidateFirstPage: false, // 2ページ目以降を読み込むとき毎回1ページ目を再検証しない
  }

  const { data: items, size, setSize } = useSWRInfinite<Item[]>(getKey, fetcher, swrInfiniteOptions)

  useEffect(() => { // 引数にnodeを受け取る
    if (!isDialogOpen) return;  // dialogが開いていなければリターンして処理終了

    const options = {
      root: null, // ビューポートをルートとする
      rootMargin: "20px", // ビューポートの下端から20pxの位置を閾値とする
      threshold: 1.0 // 完全に交差したときにコールバックを実行
    };

    const observer = new IntersectionObserver((entries) => {
      // ローディング中であれば何もしない
      entries.forEach((entry) => {
        if(entry.isIntersecting) {
          setLoading(true);
          // 次のページを読み込む
          setSize((prevSize) => prevSize + 1);
          setLoading(false);
        }
      });
    }, options);

    if (loader.current) {
      // ローダー要素を監視対象に追加
      observer.observe(loader.current);
    }

    // コンポーネントがアンマウントされたときに監視を解除
    return () => observer.disconnect();
  }, [isDialogOpen]);

  if (!items) return;

  return (
    <>
      {/* reference: https://www.miracleave.co.jp/contents/2095/post-2095/ */}
      {/* ref にコールバック関数を渡すことで、Dialog の表示・非表示が切り替わるときにコールバック関数を実行してくれる */}
      <Dialog
        open={open}
        onClose={onClose}
        maxWidth='xl'
        ref={(node) => {
          // ダイアログが開いたときに、ダイアログ要素(node)が渡される
          if(node) {
            // ダイアログが開いたとき
            setIsDialogOpen(true);
          } else {
            // ダイアログが閉じたとき
            setIsDialogOpen(false);
          }
        }}
      >
        <Button variant='outlined' onClick={onClose}>Close</Button>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell>items_attr1</TableCell>
                <TableCell>items_attr2</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            {items.flat().map((item, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Button onClick={() => {
                    onSelect(item);
                    onClose();
                  }}>SELECT</Button>
                </TableCell>
                <TableCell>{item.items_attr1}</TableCell>
                <TableCell>{item.items_attr2}</TableCell>
              </TableRow>
            ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                {loading && <TableCell colSpan={2}>ロード中...</TableCell>}
              </TableRow>
            </TableFooter>
          </Table>
          {/* この要素がビューポートに入る(ブラウザ上に表示される)と追加のアイテムをロードする */}
          <div ref={loader} style={{ height: "100px", margin: "10px 0" }}></div>
          {loading && <p>ロード中...</p>}
        </TableContainer>

        {/* 以下の位置だとビューポートに入らず反応しなかった */}
        {/* この要素がビューポートに入る(ブラウザ上に表示される)と追加のアイテムをロードする */}
        {/*
        <div ref={loader} style={{ height: "100px", margin: "10px 0" }}></div>
        {loading && <p>ロード中...</p>}
        */}
      </Dialog>
    </>
  );
}