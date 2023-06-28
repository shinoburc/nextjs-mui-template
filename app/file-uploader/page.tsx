'use client';

// reference
// Next.jsとFirebase storageで画像をuploadする方法
// https://masa-engineer-blog.com/next-js-firebase-file-upload/

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import styles from '../page.module.css';

import ImageIcon from '@mui/icons-material/Image';

export default function FileUploader() {
  const [image, setImage] = useState<File>();
  const [createObjectURL, setCreateObjectURL] = useState<string>('');

  const showImage = (event: { target: HTMLInputElement }) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      setImage(file);
      setCreateObjectURL(URL.createObjectURL(file));

      /*******************************************/
      /* ここで file をストレージ等に送信すれば良い */
      /*******************************************/
    }
  };

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>File Uploader&nbsp;</p>
        <p>
          <Link href='/' className='underline'>
            Home
          </Link>
        </p>
        <div className=''>
          <div className=''>
            <label htmlFor='file-input' className=''>
              File Select
              <ImageIcon />
            </label>
            {/* HTML 標準のファイル選択UIを非表示にする */}
            <input
              id='file-input'
              style={{ visibility: 'hidden' }}
              type='file'
              accept='image/*'
              name='myImage'
              onChange={showImage}
            />
          </div>
          <div className=''>
            {createObjectURL != '' && (
              <>
                <Image
                  className=''
                  src={createObjectURL}
                  alt='target image'
                  width='100'
                  height='100'
                />
                <span>{createObjectURL}</span>
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
