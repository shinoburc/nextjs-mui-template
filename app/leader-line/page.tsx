/**
 * ライブラリ leader-line-new のサンプル
 * このプログラムを実行するためには npm install --save leader-line-new を実行する必要がある。
 */
import React from "react";
import dynamic from 'next/dynamic'

// サーバサイドでライブラリ leader-line-new を読み込むとエラーになるので、
// クライアントサイドで dynamic に読み込むようにする。
const Main = dynamic(
    () => import('@/app/leader-line/_components/Main')
    , { ssr: false }
  );

export default function LeaderLinePage() {
  return (
    <Main />
  );
}