import { SiteInfo } from '../types/clientsTypes'
import CardSite from './CardSite'

interface Props {
    sitesList: SiteInfo[]
}

export default function GridSites({ sitesList }: Props) {

  return (
    <section className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {
            sitesList.map((site)=> (
                <CardSite key={site.id} site={site} />
            ))
        }
    </section>
  )
}
