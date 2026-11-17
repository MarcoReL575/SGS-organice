import { authService } from '@/src/features/auth/service/authService'
import UsersTable from '@/src/features/user/components/TableUsers'
import { requireAuth } from '@/src/lib/session'
import { Button } from '@/src/shared/components/ui/button'
import { IconCirclePlus } from '@tabler/icons-react'
import { Route } from 'next'
import Link from 'next/link'
import { Suspense } from 'react'

async function UserConetnt() {
  const session = await requireAuth();
  const user = session.user
  const { success, message, users } = await authService.selectAllUsers(user.email);

  return (
    <main className='flex flex-col space-y-8'>
      <Link href={'/dashboard/usuarios/agregarUsuario' as Route}>
        <Button className='bg-green-500 hover:bg-green-400 text-white duration-300 transition-all'>
            <IconCirclePlus />
            Agregar Nuevo Usuario
        </Button>
      </Link>

      <UsersTable data={users} />
    </main>
  )
}

export default async function UsuariosPage() {
  return (
    <Suspense fallback={<div className='container mx-auto'>Cargando usuarios...</div>}>
      <UserConetnt />
    </Suspense>
  )
}
