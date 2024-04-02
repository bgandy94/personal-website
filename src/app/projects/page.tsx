import { getFormattedDate } from '@/src/lib/date'
import { projects } from '@/src/lib/projects'
import Link from 'next/link'
import React from 'react'

export default function Projects({ params }: { params: { slug: string } }) {
  return (
    <>
      <h1 className="text-3xl mb-4">Projects</h1>
      <ul className="list-inside">
        {projects.map((project) => (
          <li key={project.slug}>
            <span className="text-sm font-bold">
              {getFormattedDate(project.dates.start)}
            </span>
            <br />
            <Link
              className="underline"
              key={project.slug}
              href={`/projects/${project.slug}`}
            >
              {project.title}
            </Link>
          </li>
        ))}
      </ul>
    </>
  )
}
