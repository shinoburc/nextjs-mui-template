'use client';

import Link from 'next/link';

/* ライブラリ Material-UI が提供するコンポーネントの import */
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
/* icons */
import PersonAddIcon from '@mui/icons-material/PersonAdd';

import { Prisma } from '@prisma/client';
import { useRouter } from 'next/navigation';

type User = Prisma.UserGetPayload<{
  include: {
    role: true;
    department: true;
  };
}>;
type Props = {
  users: User[];
};

export default function UserList(props: Props) {
  const users = props.users;

  const router = useRouter();

  const onDelete = async (id: string) => {
    const response = await fetch(`/api/user/${id}`, {
      method: 'DELETE',
    });
    router.refresh();
  };

  return (
    <>
      <Link href='/user/create' passHref>
        <Button variant='contained' color='primary'>
          <PersonAddIcon /> Create User
        </Button>
      </Link>
      <div>
        <Table size='small'>
          <TableHead>
            <TableRow>
              <TableCell>id</TableCell>
              <TableCell>name</TableCell>
              <TableCell>email</TableCell>
              <TableCell>role</TableCell>
              <TableCell>department</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* users 全件をテーブル出力する */}
            {users.map((user) => {
              return (
                /* 一覧系の更新箇所を特定するために一意となる key を設定する必要がある */
                <TableRow key={user.id}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role.name}</TableCell>
                  <TableCell>{user.department.name}</TableCell>
                  <TableCell>
                    <Link href={`/user/edit/${user.id}`} passHref>
                      <Button variant='contained' color='primary'>
                        Edit
                      </Button>
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Button onClick={() => onDelete(user.id)} variant='contained' color='warning'>
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
