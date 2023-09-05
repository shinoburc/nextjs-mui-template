'use client';

// reference: https://dev.classmethod.jp/articles/get-image-with-react-webcam-and-typescript/

import Image from 'next/image';
import { useRef, useState, useCallback } from 'react';

import styles from '../page.module.css';

import Webcam from "react-webcam";

const videoConstraints = {
  width: 720,
  height: 360,
  facingMode: "user",
};

export default function CameraPhotoUploader() {
  const [isCaptureEnable, setCaptureEnable] = useState<boolean>(false);
  const webcamRef = useRef<Webcam>(null);
  const [url, setUrl] = useState<string | null>(null);
  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setUrl(imageSrc);
    }
  }, [webcamRef]);

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>Camera Photo Uploader&nbsp;</p>
        <div className=''>
          <div className=''>
            {isCaptureEnable || (
              <button onClick={() => setCaptureEnable(true)}>開始</button>
            )}
            {isCaptureEnable && (
              <>
                <div>
                  <button onClick={() => setCaptureEnable(false)}>終了</button>
                </div>
                <div>
                  <Webcam
                    audio={false}
                    width={540}
                    height={360}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    videoConstraints={videoConstraints}
                  />
                </div>
                <button onClick={capture}>キャプチャ</button>
              </>
            )}
            {url && (
              <>
                <div>
                  <button
                    onClick={() => {
                      setUrl(null);
                    }}
                  >
                    削除
                  </button>
                </div>
                <div>
                  <Image
                    className=''
                    src={url}
                    alt='Screenshot'
                    width='100'
                    height='100'
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
