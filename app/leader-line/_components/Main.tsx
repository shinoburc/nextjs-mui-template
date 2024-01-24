'use client';

import React, { useEffect, useRef } from 'react';

import Card from '@mui/material/Card';
import LeaderLine from 'leader-line-new';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

export default function Main() {
  const cardRef1 = useRef<HTMLDivElement>(null);
  const cardRef2 = useRef<HTMLDivElement>(null);
  const cardRef3 = useRef<HTMLDivElement>(null);
  const cardRef4 = useRef<HTMLDivElement>(null);

  let lines: LeaderLine[] = [];

  const drawLine = () => {
    // Card1 と Card3 を結ぶ線を引く
    if (cardRef1.current && cardRef3.current) {
      const line1 = new LeaderLine(cardRef1.current, cardRef3.current, {
        color: 'gray' /* 線の色を灰色にする */,
        path: 'grid' /* 直角な線を引く */,
        startSocket: 'left' /* 始点の線の出口を下にする */,
        endSocket: 'left' /* 終点の線の出口を右にする */,
        endPlug: 'behind' /* 矢印を表示しない */,
      });
      lines.push(line1);
    }

    // Card2 と Card3 を結ぶ線を引く
    if (cardRef2.current && cardRef3.current) {
      const line2 = new LeaderLine(cardRef2.current, cardRef3.current, {
        color: 'gray' /* 線の色を灰色にする */,
        path: 'grid' /* 直角な線を引く */,
        startSocket: 'bottom' /* 始点の線の出口を下にする */,
        endSocket: 'right' /* 終点の線の出口を右にする */,
        endPlug: 'behind' /* 矢印を表示しない */,
      });
      lines.push(line2);
    }

    // Card2 と Card4 を結ぶ線を引く
    if (cardRef2.current && cardRef4.current) {
      const line3 = new LeaderLine(cardRef2.current, cardRef4.current, {
        color: 'gray' /* 線の色を灰色にする */,
        path: 'grid' /* 直角な線を引く */,
        startSocket: 'bottom' /* 始点の線の出口を下にする */,
        endSocket: 'left' /* 終点の線の出口を右にする */,
        endPlug: 'behind' /* 矢印を表示しない */,
      });
      lines.push(line3);
    }
  };

  const removeLine = () => {
    lines.map((line) => {
      line.remove();
    });
    lines = [];
  };


  const execute = () => {
    // 線を引く前に、既存の線を削除する
    removeLine();
    // 線を引く
    drawLine();
  };

  useEffect(() => {
    execute();
    window.dispatchEvent(new Event('resize'));
    // ウィンドウのサイズが変更されたときに、線を引き直す
    //window.addEventListener('resize', execute);

    // コンポーネントがアンマウントされるときに、イベントハンドラを削除し、線を削除する
    return () => {
        removeLine();
        //window.removeEventListener('resize', execute);
    };
  }, [cardRef1, cardRef2, cardRef3, cardRef4]);

  return (
    <Paper>
      <Grid container spacing={2}>
        {/* Grid Header */}
        <Grid item xs={4}>
          <span>P</span>
        </Grid>
        <Grid item xs={4}></Grid>
        <Grid item xs={4}>
          <span>T</span>
        </Grid>

        {/* Grid Space */}
        <Grid item xs={12}></Grid>

        {/* Grid Body 1 */}
        <Grid item xs={1}></Grid>
        <Grid item xs={2}>
          <Card ref={cardRef1}>1. Card1</Card>
        </Grid>
        <Grid item xs={1}></Grid>
        <Grid item xs={4}>
          <Card ref={cardRef2}>Card2</Card>
        </Grid>
        <Grid item xs={4}></Grid>

        {/* Grid Space */}
        <Grid item xs={12}></Grid>

        {/* Grid Body 2 */}
        <Grid item xs={4}>
          <Card ref={cardRef3}>1. Card3</Card>
        </Grid>
        <Grid item xs={4}></Grid>
        <Grid item xs={4}>
          <Card ref={cardRef4}>1. Card4</Card>
        </Grid>
      </Grid>
    </Paper>
  );
}