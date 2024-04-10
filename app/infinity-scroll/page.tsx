'use client';

import React, { useState, useEffect, useRef } from 'react';

type InfinityScrollPageProps = {
};

export default function InfinityScrollPage(props: InfinityScrollPageProps) {
  const [items, setItems] = useState(Array.from({ length: 20 })); // 初期アイテム
  const [loading, setLoading] = useState(false);
  const loader = useRef(null);

  useEffect(() => {
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
  }, [loading]); // `loading`が変更されたときにのみ実行

  return (
    <div>
      <ul>
        {items.map((item, index) => (
          <li key={index}>アイテム {index + 1}</li>
        ))}
      </ul>
      {loading && <p>ロード中...</p>}
      {/* この要素がビューポートに入ると更にアイテムをロード */}
      <div ref={loader} style={{ height: "100px", margin: "10px 0" }}></div>
    </div>
  );
}