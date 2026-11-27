'use client'

import { FormComponent, FormError, FormInput, FormLabel, FormSubmit } from '@/src/shared/components/form'
import { estadosMexico } from '@/src/shared/db/listStates'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { siteClientSchema } from '../schemas/clientSchemas'
import { ClientSelect, SiteInsert, SiteSelect } from '../types/clientsTypes'
import { IconCircleCheck, IconEdit } from '@tabler/icons-react'
import { addSiteAction } from '../actions/addSiteAction'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { updateSiteAction } from '../actions/updateSiteAction'

interface Props {
    clients: ClientSelect[];
    slug: string;
    option: string;
    site?: SiteSelect;
    id?: string 
}

export default function FormAddSiteClient({ clients, slug, option, site, id }: Props) {

    const optionClient = clients.find((client)=> client.name === slug);
    const router = useRouter();

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        mode: 'onBlur',
        resolver: zodResolver(siteClientSchema),
        defaultValues: {
            name: site?.name,
            affiliationNumber: site?.affiliationNumber ?? '',
            street: site?.street,
            exteriorNumber: site?.exteriorNumber ?? '',
            state: site?.state,
            city: site?.city,
            postalCode: site?.postalCode ?? '',

        }
    });

    const handleAddSite = async(siteInfo: SiteInsert)=> {
        if(option === 'agregar') {
            const { success, message } = await addSiteAction(siteInfo);
            if(!success) {
                toast.error(message);
            }
    
            if(success){
                reset();
                toast.success(message);
                router.push('/dashboard/clientes-sitios');
            }
        }

        if(option === 'editar' && id) {
            const { success, message } = await updateSiteAction(siteInfo, id);
            if(!success) {
                toast.error(message);
            }

            if(success) {
                reset();
                router.push(`/dashboard/clientes-sitios/${slug}`);
                toast.success(message);
            }
        }
    }

  return (
    <FormComponent
        className='flex flex-col space-y-4 border rounded-lg p-8'
        onSubmit={handleSubmit(handleAddSite)}
    >

        <div className='flex flex-col space-y-2'>
            <FormLabel>Selecciona el cliente</FormLabel>
            <select {...register('clientId')} className='border rounded-lg p-2'>
                <option value={optionClient?.id}>{optionClient?.name}</option>
            </select>
            
            <FormLabel>Nombre</FormLabel>
            <FormInput {...register('name')} type='text' placeholder='Sucursal Hidalgo' />
            {errors.name && <FormError>{errors.name.message}</FormError>}

            <FormLabel>Número de Afiliación</FormLabel>
            <FormInput {...register('affiliationNumber')} type='number' placeholder='0' />
            {errors.affiliationNumber && <FormError>{errors.affiliationNumber.message}</FormError>}

        </div>

        <div className='space-y-4'>
            <h2>Datos de la Direccion de la sucursal:</h2>
            
            <div className='grid grid-cols-2'>
                <div>
                    <FormLabel>Calle</FormLabel>
                    <FormInput {...register('street')} type='text' placeholder='Calle principal' />
                    {errors.street && <FormError>{errors.street.message}</FormError>}
                </div>

                <div>
                    <FormLabel>Número</FormLabel>
                    <FormInput {...register('exteriorNumber')} type='number' placeholder='0' />
                    {errors.exteriorNumber && <FormError>{errors.exteriorNumber.message}</FormError>}
                </div>

                <div>
                    <FormLabel>Estado</FormLabel>
                    <select {...register('state')} className='border rounded-lg p-2'>
                        <option value="">--Selecciona un estado--</option>
                        { 
                            estadosMexico.map((estado)=> (
                                <option key={estado.clave} value={estado.clave}>
                                    {estado.nombre}
                                </option>
                            ))
                        }
                    </select>
                    {errors.state && <FormError>{errors.state.message}</FormError>}
                </div>

                <div>
                    <FormLabel>Ciudad</FormLabel>
                    <FormInput {...register('city')} type='text' placeholder='León' />
                    {errors.city && <FormError>{errors.city.message}</FormError>}
                </div>

                <div>
                    <FormLabel>Código Postal</FormLabel>
                    <FormInput {...register('postalCode')} type='number' placeholder='0' />
                    {errors.postalCode && <FormError>{errors.postalCode.message}</FormError>}
                </div>

            </div>
        </div>

        <FormSubmit className='flex items-center justify-center w-full'>
            {
                option === 'agregar'
                    ?   <>
                            <IconCircleCheck className='size-6' />
                            Agregar Sitio
                        </>
                    :   <>
                            <IconEdit className='size-6' />
                            Editar sitio
                        </>
            }
        </FormSubmit>
    </FormComponent>
  )
}
