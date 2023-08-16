'use client';

import { useState, useEffect } from 'react';
import { ZxingReader } from './_components/ZxingReader'

import styles from '../page.module.css';

export default function BarcodeAndQRCodeReader() {
  const [data, setData] = useState('No result');

  // Hydration failed エラーを回避するために、
  // useEffect が一度実行された(レンダリングが行われた)ことを確認して、
  // 画面を表示するようにしている。
  // Error: Hydration failed because the initial UI does not match what was rendered on the server.
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
  }, [])
  if (!hasMounted) return null;

  return (
    <main className={styles.main}>
      <div>
        <ZxingReader
          onResult={(result, error) => {
            if(error) {
              console.info(error);
              return;
            }
            if(result) {
              setData(result.getText());
            }
          }}
        />
      </div>
      <div>{data}</div>
    </main>
  );
}
