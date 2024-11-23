import { getFormattedDate } from '@/src/app/lib/date'
import { Project, projects } from '@/src/app/lib/projects'
import { loadEnvConfig } from '@next/env'
import Head from 'next/head'
import { notFound } from 'next/navigation'
import React from 'react'

export function generateStaticParams() {
  const env = loadEnvConfig(process.cwd())
  const isDev = env.combinedEnv.NODE_ENV === 'development'
  return projects
    .filter((p) => isDev || !p.draft)
    .map((project) => ({
      slug: project.slug,
    }))
}

export default async function Projects(props: {
  params: Promise<Pick<Project, 'slug'>>
}) {
  const params = await props.params

  const project = projects.find((x) => x.slug === params.slug)

  if (!project) {
    return notFound()
  }
  const {
    title,
    component,
    dates: { start, end },
  } = project

  return (
    <div className="flex flex-col items-center text-center px-2 md:px-0 pb-8 w-full max-w-[50rem]">
      <Head>
        <title>{title}</title>
      </Head>
      <h1 className="text-3xl mb-4">{title}</h1>
      <h2 className="text-lg mb-4 italic text-gray-300">
        {`${getFormattedDate(start)} - ${end ? getFormattedDate(end) : 'current'}`}
      </h2>
      <hr className="text-white w-full my-4" />
      {component}
    </div>
  )
}
