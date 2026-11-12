import type {Metadata} from 'next';

export function createPageMetadata(title:string,description:string):Metadata{
  const brandedTitle=`${title} | Simplex AI`;
  return {
    title,
    description,
    openGraph:{
      type:'website',
      locale:'en_US',
      siteName:'Simplex AI',
      title:brandedTitle,
      description,
    },
    twitter:{
      card:'summary',
      title:brandedTitle,
      description,
    },
  };
}
