import { IconDescriptor } from 'next/dist/lib/metadata/types/metadata-types'

type Site = {
  url: string
  logo: string
  title: string
  name: string
  keywords: string[]
  titleTemplate: string
  description: string
  githubUsername: string
  favicons: IconDescriptor[]
}

export const site: Site = {
  url:
    process.env.NODE_ENV === 'production'
      ? 'https://honghong.me'
      : 'http://localhost:3000',
  logo: 'https://honghong.me/static/images/avatar.png',
  title: 'Hong',
  name: 'Hong',
  keywords: ['codewithhong', 'Next.js', 'React', 'TypeScript', 'Node.js'],
  titleTemplate: '- Hong',
  description: 'Hong • 17 yrs • Student • Full-stack Developer',
  githubUsername: 'codewithhong',
  favicons: [
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      url: '/static/favicon/favicon-16x16.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      url: '/static/favicon/favicon-32x32.png',
    },
  ],
}
