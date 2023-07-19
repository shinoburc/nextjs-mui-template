import { HeaderItemsList } from './_components/header-items-list';

import { HeaderRepository } from '@/app/_repositories/Header'

export default async function HeaderItemsFormPage() {
  const headers = await HeaderRepository.findMany();
  return (
    <>
      <HeaderItemsList headers={headers}/>
    </>
  );
}
