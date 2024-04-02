import { getFormattedDate } from '@/src/lib/date'
import { Project, projects } from '@/src/lib/projects'
import { notFound } from 'next/navigation'
import React from 'react'

export const dynamic = 'error'

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }))
}

export default function Projects({
  params,
}: {
  params: Pick<Project, 'slug'>
}) {
  const project = projects.find((x) => x.slug === params.slug)
  console.log('project!', project)

  if (!project) {
    return notFound()
  }
  const {
    title,
    component,
    dates: { start, end },
  } = project

  return (
    <div className="flex flex-col items-center text-center">
      <h1 className="text-3xl mb-4">{title}</h1>
      <h2 className="text-lg mb-4 italic text-gray-300">
        {`${getFormattedDate(start)} - ${end ? getFormattedDate(end) : 'current'}`}
      </h2>
      <hr className="text-white w-full my-4" />
      {component}
    </div>
  )
}
