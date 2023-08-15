'use client';

// reference
// react-qr-reader
// https://github.com/JodusNodus/react-qr-reader

import Link from 'next/link';
import { useState } from 'react';
import { QrReader } from 'react-qr-reader';

import styles from '../page.module.css';

export default function QRCodeReader() {
  const [data, setData] = useState('No result');

  return (
            <QrReader
              onResult={(result, error) => {
                if (result) {
                  setData(result.getText());
                }
                if (error) {
                  console.info(error);
                }
              }}
              constraints={{ facingMode: 'environment' }}
            />
  );
}
