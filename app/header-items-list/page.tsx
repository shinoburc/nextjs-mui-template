import { HeaderRepository } from '@/app/_repositories/Header';
import { HeaderItemsList } from './_components/header-items-list';

export default async function HeaderItemsFormPage() {
  const headers = await HeaderRepository.findMany();
  return (
    <>
      <HeaderItemsList headers={headers} />
    </>
  );
}
