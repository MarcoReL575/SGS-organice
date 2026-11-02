import { authService } from '@/src/features/auth/service/authService'
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
    <div>
        <Link href={'/dashboard/usuarios/agregarUsuario' as Route}>
            <Button className='bg-green-500 hover:bg-green-400 text-white duration-300 transition-all'>
                <IconCirclePlus />
                Agregar Nuevo Usuario
            </Button>
        </Link>

        <section>
          {
            users.map((user)=> (
              <ul key={user.id} className='flex space-x-4'>
                <li>{user.name}</li>
                <li>{user.email}</li>
                <li>{user.role}</li>
              </ul>
            ))
          }
        </section>
    </div>
  )
}

export default async function UsuariosPage() {
  return (
    <Suspense fallback={<div>Cargando usuarios...</div>}>
      <UserConetnt />
    </Suspense>
  )
}
