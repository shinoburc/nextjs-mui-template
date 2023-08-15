import { HeaderRepository } from '@/app/_repositories/Header';

import { FormMain } from '@/app/header-items-form/_components/form-main';

// Dynamic Segments (/user/edit/[id]) から [id] を取得する
type Props = {
  id: string;
};

export default async function HeaderItemsFormPage({ params }: { params: Props }) {
  const header = await HeaderRepository.findUnique(params.id);

  return (
    <>
      <FormMain header={header} />
    </>
  );
}
