import { prisma } from '@/app/_utils/prismaSingleton';

import type { HeaderItemsFormData } from '@/app/_formSchema/header_items_schema';

import type { Prisma } from '@prisma/client';
import type { Header as _Header } from '@prisma/client';

export type Header = _Header;

export type HeaderWithItems = Exclude<
  Prisma.PromiseReturnType<typeof HeaderRepository.findUnique>,
  null
>;

export namespace HeaderRepository {
  export async function findMany() {
    return await prisma.header.findMany({
      include: {
        items: true,
      },
    });
  }

  export async function findUnique(id: string) {
    return await prisma.header.findUnique({
      include: {
        items: true,
      },
      where: {
        id: id,
      },
      /*
      select: {
        id: true,
        header_attr1: true,
        header_attr2: true,
        header_attr3: true,
        header_attr4: true,
        items: {
          select: {
            items_attr1: true,
            items_attr2: true,
          },
        }
      }
      */
    });
  }

  /**
   * prisma の Nested writes を利用して Header と Item を作成する。
   * Nested writes は 1 トランザクションとして扱われる。
   * reference: https://www.prisma.io/docs/concepts/components/prisma-client/transactions#nested-writes
   *
   * @param header_items
   * @returns created_header
   */
  export async function create(header_items: HeaderItemsFormData) {
    // items は react-hook-form で required にしていないため、型に undefined が含まれる。
    // undefined が付いていると prisma での型チェックに通らない。
    // そのため、items の各要素から undefined を取り省いた型を生成する。
    type ItemRequiredType = Required<(typeof header_items.items)[number]>;
    // 上記は以下と同様。
    /*
    type ItemRequiredType = {
      items_attr1: string,
      items_attr2: string,
    }
    */

    // 現状の実装では入力フォームで空の items が生成されるようにしているため。
    // header_items.items から全プロパティが空文字の要素を除外する。
    /*
    const items = header_items.items.filter(
      (item): item is item_type => item.items_attr1 != '' && item.items_attr2 != ''
    );
    */

    return await prisma.header.create({
      data: {
        ...header_items.header,
        // Item テーブルに作成するデータを指定している。
        items: {
          create: header_items.items as ItemRequiredType[],
        },
      },
      // Header テーブルと同時に Item テーブルにもデータを作成することを指定している。
      include: {
        items: true,
      },
    });
  }

  /**
   * TODO:
   *
   * @param id
   * @param header
   * @returns
   */
  export async function update(id: string, header_items: HeaderItemsFormData) {
    // items の各要素から undefined を取り省いた型を生成する。
    type ItemRequiredType = Required<(typeof header_items.items)[number]>;
    // 現状の実装では入力フォームで空の items が生成されるようにしているため。
    // header_items.items から全プロパティが空文字の要素を除外する。
    /*
    const items = header_items.items.filter(
      (item): item is item_type => item.items_attr1 != '' && item.items_attr2 != ''
    );
    */

    return await prisma.header.update({
      where: {
        id: id,
      },
      data: {
        ...header_items.header,
        // Item テーブルに作成するデータを指定している。
        items: {
          // prisma の Transaction API を使用して
          // delete してから create すると明記する
          // 必要があるかもしれない。
          // 現状はソースコードの順番で実行されている。
          deleteMany: {},
          create: header_items.items as ItemRequiredType[],
        },
      },
      // Header テーブルと同時に Item テーブルにもデータを作成することを指定している。
      include: {
        items: true,
      },
    });
  }

  /**
   * Header の削除。
   * schema.prisma で Header が削除されたときに、
   * 紐づく Item も削除するように設定しているため、
   * 同時に紐づく Item も削除される。
   *
   * @param id
   * @returns deleted_header
   */
  export async function remove(id: string) {
    return await prisma.header.delete({
      where: {
        id: id,
      },
      /*
      include: {
        items: true,
      }
      */
    });
  }
}
