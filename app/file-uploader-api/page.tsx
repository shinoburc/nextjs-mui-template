'use client';

import Link from 'next/link';
import { useState } from 'react';

import FileUploadIcon from '@mui/icons-material/FileUpload';
import { Button, Typography } from '@mui/material';
import { array } from 'yup';

export default function FileUploader() {
  const [image, setImage] = useState<File>();

  const handleFileSelected = async (event: { target: HTMLInputElement }) => {
    const fileList = event.target.files;
    if (fileList) {
      const formData = new FormData();

      // ファイルを追加
      for (let i = 0; i < fileList.length; i++) {
        formData.append('files', fileList[i]);
      }

      // JSON も送りたい場合
      const anyValue = {
        key: 'value',
        array: [1, 2, 3],
      };
      const anyJson = JSON.stringify(anyValue);
      formData.append('anyJson', anyJson);

      // ファイルを送信
      const response = await fetch('/api/file-uploader', {
			  method: 'POST',
        // multipart/form-data は設定してはいけない。
        // fetch が Content-Type multipart/form-data; boundary=... を自動で設定する。
        //headers: { 'Content-Type': 'multipart/form-data' },
			  body: formData,
		  })
    }
  };

  return (
    <main>
      <div>
        <Typography>File Uploader&nbsp;</Typography>
        <Link href='/' className='underline'>
          <Button variant='outlined'>Home</Button>
        </Link>
        <div className=''>
          <div className=''>
            <label htmlFor='file-input' className=''>
              File Select
              <FileUploadIcon />
            </label>
            <input
              id='file-input'
              //style={{ visibility: 'hidden' }}
              type='file'
              //accept='image/*'
              multiple
              onChange={handleFileSelected}
            />
          </div>
          <div className=''>
            <span>TODO: file uploader API Response status</span>
          </div>
        </div>
      </div>
    </main>
  );
}
