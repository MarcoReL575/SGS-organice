import { Card, CardHeader, CardTitle, CardDescription, CardAction, CardContent, CardFooter } from '@/src/shared/components/ui/card'
import { SiteInfo } from '../types/clientsTypes'
import { IconMapPin } from '@tabler/icons-react';
import DropdownOptionsSite from './DropdownOptionsSite';
import { estadosMexico } from '@/src/shared/db/listStates';

interface Props {
    site: SiteInfo;
}

export default function CardSite({ site }: Props) {

    const state = estadosMexico.find((state)=> state.clave === site.state);

    return (
        <Card>
            <CardHeader>
                <CardTitle>ID: {site.affiliationNumber}</CardTitle>
                <CardDescription>
                    <p className='text-xl font-bold'>{site.name}</p>
                </CardDescription>
                <CardAction>
                    <DropdownOptionsSite id={site.id} />
                </CardAction>
            </CardHeader>
            <CardContent className='flex flex-col space-y-2'>
                <p className='flex items-center font-semibold gap-x-2 text-lg'><IconMapPin />Datos de la sucursal</p>
                <p>
                    <span className='font-semibold pr-1'> Dirección:</span> 
                    <span>{site.street},</span>
                    <span> #{site.exteriorNumber}. </span>
                    <span>CP: {site.postalCode}</span>
                </p>
                <p className='flex items-center'>{site.city}, {state?.nombre}</p>
            </CardContent>
            <CardFooter>
                <p className='text-xl font-semibold'>Cliente: {site.client?.name}</p>
            </CardFooter>
        </Card>
    )
}
