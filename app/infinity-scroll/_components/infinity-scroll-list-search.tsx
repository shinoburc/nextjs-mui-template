'use client';

import { Button, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow, TextField } from '@mui/material';
import React, { useState, useEffect, useRef } from 'react';
import useSWRInfinite from 'swr/infinite'

import { fetcher }  from '@/app/_utils/fetcher';
import type { Item } from '@/app/_repositories/Item';

type InfinityScrollListSearchProps = {
  onSelect: (item: Item) => void;
};

export function InfinityScrollListSearch(props: InfinityScrollListSearchProps) {
  const { onSelect } = props;
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [editingQuery, setEditingQuery] = useState('');
  const loader = useRef(null);
  // 1ページあたりの表示数
  const perPage = 20;

  const getKey = (pageIndex: number, previousPageData: Item[][]) => {
    const take = perPage;
    const skip = pageIndex * take;
    const params = new URLSearchParams();

    params.set('query', query);
    params.set('skip', skip.toString());
    params.set('take', take.toString());
    return `/api/item/pagination?${params.toString()}`
  }

  const swrInfiniteOptions = {
      revalidateIfStale: false, // キャッシュがあっても再検証しない
      revalidateOnFocus: false, // フォーカス時の再検証を行わない 
      revalidateFirstPage: false, // 2ページ目以降を読み込むとき毎回1ページ目を再検証しない
  }

  const { data: items, size, setSize, error } = useSWRInfinite<Item[]>(getKey, fetcher, swrInfiniteOptions)

  useEffect(() => {
    const options = {
      root: null, // ビューポートをルートとする
      rootMargin: "20px", // ビューポートの下端から20pxの位置を閾値とする
      threshold: 1.0 // 完全に交差したときにコールバックを実行
    };

    const observer = new IntersectionObserver((entries) => {
      // ローディング中であれば何もしない
      entries.forEach((entry) => {
        if(entry.isIntersecting && !loading) {
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
  }, [items]); // itemsが変更されたときに再実行


  return (
    <>
      <TextField placeholder="Search" defaultValue={editingQuery} onChange={(e) => setEditingQuery(e.target.value)} />
      <Button variant='outlined' onClick={() => setQuery(editingQuery)}>Search</Button>
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
            {items?.flat().map((item, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Button onClick={() => {
                    onSelect(item);
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
              <TableCell colSpan={2}>{items ? items[size - 1]?.length : 'null'}</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
        {/* 
          * 1. items: items が存在するとき、
          * 2. items[size - 1]?.length === perPage: 前回取得分の items が perPage と等しい(次のページが存在する)とき、
          * リストの最下部を表す div 要素を挿入する。
          * この div 要素がビューポートに入る(ブラウザ上に表示される)と追加のアイテムをロードする。
          */}
        {items && items[size - 1]?.length === perPage && <div ref={loader} style={{ height: "100px", margin: "10px 0" }}>loader</div>}
      </TableContainer>

      {/* 以下の位置だとビューポートに入らず反応しなかった */}
      {/* この要素がビューポートに入る(ブラウザ上に表示される)と追加のアイテムをロードする */}
      {/*
      <div ref={loader} style={{ height: "100px", margin: "10px 0" }}></div>
      {loading && <p>ロード中...</p>}
      */}
    </>
  );
}