import { getFormattedDate } from '@/src/app/lib/date'
import { projects } from '@/src/app/projects/projects'
import { loadEnvConfig } from '@next/env'
import { Metadata } from 'next'
import Link from 'next/link'
import React from 'react'
import { generateFormattedTitle } from '../lib/metadata-helpers'

export const metadata: Metadata = {
  title: generateFormattedTitle('Projects'),
}

export default function Projects() {
  const env = loadEnvConfig(process.cwd())
  const isDev = env.combinedEnv.NODE_ENV === 'development'

  return (
    <>
      <h1>Projects</h1>
      <ul className="list-none">
        {projects
          .filter((p) => isDev || !p.draft)
          .sort((a, b) => (a.dates.start > b.dates.start ? -1 : 1))
          .map((project) => (
            <li key={project.slug} className="mb-4">
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
