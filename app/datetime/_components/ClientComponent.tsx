'use client';

import dayjs from 'dayjs';

export default function ClientComponent() {
  const date = new Date();
  const dayjsDate = dayjs();

  return (
    <>
      <p>Client Component(Date): {date.toLocaleString()}</p>
      <p>Client Component(Dayjs): {dayjs().toDate().toLocaleString()}</p>
    </>
  );
}
