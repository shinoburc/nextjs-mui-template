'use client'

// For QR Code Only
//import { BrowserQRCodeReader, IScannerControls } from "@zxing/browser"

// For Barcode(1D) and QR Code(2D)
import { BrowserMultiFormatReader, IScannerControls } from '@zxing/browser'

import { Result, Exception } from '@zxing/library'
import React from 'react'

type Props = {
  onResult: (result: Result | undefined, error: Exception | undefined) => void;
};

//export const QrCodeReader: React.FC<{onReadQRCode: (text: Result) => void}>= ({ onReadQRCode }) => {
export function ZxingReader(props: Props) {
  const onResult = props.onResult;
  const controlsRef = React.useRef<IScannerControls|null>()
  const videoRef = React.useRef<HTMLVideoElement>(null)

  React.useEffect(() => {
    if (!videoRef.current) {
      return 
    }
    //const codeReader = new BrowserQRCodeReader()
    const codeReader = new BrowserMultiFormatReader()
    codeReader.decodeFromVideoDevice(
      undefined, 
      videoRef.current, 
      (result, error, controls) => {
        onResult(result, error)
        controlsRef.current = controls
      }
    )
    return () => {
      if (!controlsRef.current) {
        return
      }
      
      try {
        controlsRef.current.stop()
        controlsRef.current = null
      } catch(e) {
        console.error("TODO: error handling")
      }
    }
  }, [onResult, videoRef])

  return (
    <video
      style={{ maxWidth: "100%", maxHeight: "100%",height:"100%" }}
      ref={videoRef}
    /> 
  )
 
}