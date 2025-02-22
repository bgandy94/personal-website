import { getFormattedDate } from '@/src/app/lib/date'
import { Project, projects } from '@/src/app/projects/projects'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import React from 'react'
import { generateFormattedTitle } from '../../lib/metadata-helpers'

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }))
}

export const generateMetadata = async ({
  params,
}: {
  params: Promise<Pick<Project, 'slug'>>
}): Promise<Metadata> => {
  const parms = await params

  const title = projects.find((x) => x.slug === parms.slug)?.title

  if (!title) {
    throw new Error('Project not found')
  }
  return {
    title: generateFormattedTitle(title),
  }
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
      <h1>{title}</h1>
      <p className="mt-2 italic text-gray-300">
        {`${getFormattedDate(start)} - ${end ? getFormattedDate(end) : 'current'}`}
      </p>
      <hr />
      {component}
    </div>
  )
}
