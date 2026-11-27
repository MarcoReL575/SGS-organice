import { Card, CardHeader, CardTitle, CardDescription, CardAction, CardContent, CardFooter } from '@/src/shared/components/ui/card'
import { SiteInfo } from '../types/clientsTypes'
import { IconInfoCircle, IconPhone, IconUser } from '@tabler/icons-react';
import DropdownOptionsSite from './DropdownOptionsSite';

interface Props {
    site: SiteInfo;
}

export default function CardSite({ site }: Props) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>{site.affiliationNumber}</CardTitle>
                <CardDescription>
                    <p className='text-xl font-bold'>{site.name}</p>
                </CardDescription>
                <CardAction>
                    <DropdownOptionsSite id={site.id} />
                </CardAction>
            </CardHeader>
            <CardContent className='flex flex-col space-y-2'>
                <p className='flex items-center font-semibold gap-x-2 text-lg'><IconInfoCircle />Datos de contacto</p>
                <p className='flex items-center'> <IconUser/> {site.client?.contactName}</p>
                <p className='flex items-center'> <IconPhone /> +{site.client?.phone}</p>
            </CardContent>
            <CardFooter>
                <p className='text-xl font-semibold'>Cliente: {site.client?.name}</p>
            </CardFooter>
        </Card>
    )
}
