'use client';

import { Button, Dialog } from '@mui/material';
import React, { useState, useEffect, useRef, useCallback } from 'react';

type InfinityScrollPageProps = {
  open: boolean;
  onClose: () => void;
};

export function InfinityScrollListDialog(props: InfinityScrollPageProps) {
  const [items, setItems] = useState(Array.from({ length: 20 })); // 初期アイテム
  const [loading, setLoading] = useState(false);
  const loader = useRef(null);

  const dialogDisplayCallback = useCallback((node: any) => { // 引数にnodeを受け取る
    if (!node) return;  // nodeがnullの場合はリターンして処理終了

    const options = {
      root: null, // ビューポートをルートとする
      rootMargin: "20px", // ビューポートの下端から20pxの位置を閾値とする
      threshold: 1.0 // 完全に交差したときにコールバックを実行
    };

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !loading) {
        setLoading(true);
        setTimeout(() => { // デモのために遅延を模擬
          setItems((prev) => [...prev, ...Array.from({ length: 20 })]);
          setLoading(false);
        }, 1000);
      }
    }, options);

    if (loader.current) {
      console.log("loader.current", loader.current);
      observer.observe(loader.current);
    }

    // クリーンアップ関数
    return () => observer.disconnect();
//},[props.open]);
}, []);


  return (
    <>
      {/* reference: https://www.miracleave.co.jp/contents/2095/post-2095/ */}
      {/* ref にコールバック関数を渡すことで、Dialog が表示されるときにコールバック関数を実行してくれる */}
      <Dialog open={props.open} onClose={props.onClose} maxWidth='xl' ref={dialogDisplayCallback}>
        <Button variant='outlined' onClick={props.onClose}>Close</Button>
        <p>Infinity Scroll Dialog</p>
        <ul>
          {items.map((item, index) => (
            <li key={index}>アイテム {index + 1}</li>
          ))}
        </ul>
        {loading && <p>ロード中...</p>}
        {/* この要素がビューポートに入ると更にアイテムをロード */}
        <div ref={loader} style={{ height: "100px", margin: "10px 0" }}></div>
      </Dialog>
    </>
  );
}