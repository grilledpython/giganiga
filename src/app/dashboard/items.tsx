'use client'

import { Skeleton } from '@codewithhong/ui'
import {
  IconBrandGithub,
  IconBrandYoutube,
  IconClock,
  IconPencil,
  IconUser,
} from '@tabler/icons-react'
import dayjs from 'dayjs'
import React from 'react'
import useSWR from 'swr'

import fetcher from '@/lib/fetcher'

import { GithubData, Likes, Views, WakatimeData, YouTubeData } from '@/types'

type Card = {
  icon: React.ReactNode
  title: string
  link: string
  value: number | string | undefined
}

const Items = () => {
  const { data: youtubeData } = useSWR<YouTubeData>('/api/youtube', fetcher)
  const { data: githubData } = useSWR<GithubData>('/api/github', fetcher)
  const { data: likesData } = useSWR<Likes>('/api/likes', fetcher)
  const { data: viewsData } = useSWR<Views>('/api/views', fetcher)
  const { data: wakatimeData } = useSWR<WakatimeData>('/api/wakatime', fetcher)

  const getAge = () =>
    (
      dayjs().diff('2006-04-11', 'milliseconds') /
      (365.25 * 24 * 60 * 60 * 1000)
    ).toFixed(9)

  const [age, setAge] = React.useState(getAge())
  const [mounted, setMounted] = React.useState(false)

  setInterval(() => {
    setAge(getAge())
  }, 10)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const data: Card[] = [
    {
      title: 'My Age',
      link: 'https://honghong.me/about',
      value: age,
      icon: <IconUser />,
    },
    {
      title: 'Coding Hours',
      link: 'https://wakatime.com/@codewithhong',
      value: wakatimeData?.seconds
        ? `${Math.round(wakatimeData.seconds / 60 / 60)} hrs`
        : undefined,
      icon: <IconClock />,
    },
    {
      title: 'YouTube Subscribers',
      link: 'https://youtube.com/@codewithhong',
      value: youtubeData?.subscribers,
      icon: <IconBrandYoutube />,
    },
    {
      title: 'YouTube Views',
      link: 'https://youtube.com/@codewithhong',
      value: youtubeData?.views,
      icon: <IconBrandYoutube />,
    },
    {
      title: 'GitHub Followers',
      link: 'https://github.com/codewithhong',
      value: githubData?.followers,
      icon: <IconBrandGithub />,
    },
    {
      title: 'GitHub Stars',
      link: 'https://github.com/codewithhong',
      value: githubData?.stars,
      icon: <IconBrandGithub />,
    },
    {
      title: 'Blog Total Views',
      link: 'https://honghong.me',
      value: viewsData?.views,
      icon: <IconPencil />,
    },
    {
      title: 'Blog Total Likes',
      link: 'https://honghong.me',
      value: likesData?.likes,
      icon: <IconPencil />,
    },
  ]

  return (
    <>
      <div className='mb-4 grid gap-4 sm:grid-cols-2'>
        {mounted &&
          data.map((item) => {
            const { icon, link, title, value } = item

            return (
              <a
                key={title}
                target='_blank'
                rel='noopener noreferrer'
                href={link}
                className='flex flex-col gap-2 rounded-lg border border-accent-2 p-4 transition-colors duration-150 hover:bg-accent-1'
              >
                <div className='flex items-center gap-1'>
                  {icon}
                  <div className='text-sm font-bold'>{title}</div>
                </div>
                <div className='text-4xl font-black text-accent-fg'>
                  {value ? value : <Skeleton className='h-10' />}
                </div>
              </a>
            )
          })}
      </div>
    </>
  )
}

export default Items
