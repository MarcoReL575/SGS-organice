import { FormComponent, FormInput, FormLabel, FormSubmit } from '@/src/shared/components/form'

export default function FormSignup() {
  return (
    <FormComponent
        className='border p-10 rounded-lg flex flex-col'
    >
        <FormLabel id='user'>Nombre de Usuario</FormLabel>
        <FormInput 
            type='text'
            placeholder='User-24'
        />

        <FormLabel id='email'>Ingresa tu email</FormLabel>
        <FormInput 
            type='email'
            placeholder='m@example.com'
        />

        <FormLabel id='password'>Ingresa tu password</FormLabel>
        <FormInput 
            type='password'
        />

        <FormLabel id='password'>Confirma tu password</FormLabel>
        <FormInput 
            type='password'
        />

        <FormSubmit>
            Crear cuenta
        </FormSubmit>
    </FormComponent>
  )
}
