import type { MetadataRoute } from 'next';
import { site } from '@/config/site';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: site.name,
    description: '',
    start_url: '/',
    display: 'browser',
    lang: site.locale,
  };
}
