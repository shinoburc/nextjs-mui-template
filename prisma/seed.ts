import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const role_admin = await prisma.role.upsert({
    where: { name: 'admin' },
    update: {},
    create: {
      name: 'admin',
    },
  });
  const role_user = await prisma.role.upsert({
    where: { name: 'user' },
    update: {},
    create: {
      name: 'user',
    },
  });
  const dept1 = await prisma.department.upsert({
    where: { code: 0 },
    update: {},
    create: {
      name: '全体',
      code: 0,
    },
  });
  const dept2 = await prisma.department.upsert({
    where: { code: 100 },
    update: {},
    create: {
      name: '管理本部',
      code: 100,
      parentId: dept1.id,
    },
  });
  const dept3 = await prisma.department.upsert({
    where: { code: 200 },
    update: {},
    create: {
      name: '開発本部',
      code: 200,
      parentId: dept1.id,
    },
  });
  const now = new Date();
  const admin = await prisma.user.upsert({
    where: { email: 'admin@ts.occ.co.jp' },
    update: {},
    create: {
      name: 'admin',
      email: 'admin@ts.occ.co.jp',
      password: 'admin',
      joinningDate: now,
      roleId: role_admin.id,
      departmentId: dept2.id,
    },
  });

  const user = await prisma.user.upsert({
    where: { email: 'user@ts.occ.co.jp' },
    update: {},
    create: {
      name: 'user',
      email: 'user@ts.occ.co.jp',
      password: 'user',
      joinningDate: now,
      roleId: role_user.id,
      departmentId: dept3.id,
    },
  });
  console.log({ admin, user });

  const tc1 = await prisma.thanksCard.upsert({
    where: { id: 'thanks_card_test1' },
    update: {},
    create: {
      title: 'thankscard1 title',
      body: 'thankscard1 body',
      fromId: admin.id,
      toId: user.id,
    },
  });
  const tc2 = await prisma.thanksCard.upsert({
    where: { id: 'thanks_card_test2' },
    update: {},
    create: {
      title: 'thankscard2 title',
      body: 'thankscard2 body',
      fromId: user.id,
      toId: admin.id,
    },
  });
  const tc3 = await prisma.thanksCard.upsert({
    where: { id: 'thanks_card_test3' },
    update: {},
    create: {
      title: 'thankscard3 title',
      body: 'thankscard3 body',
      fromId: user.id,
      toId: admin.id,
    },
  });
  console.log({ tc1, tc2, tc3 });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
