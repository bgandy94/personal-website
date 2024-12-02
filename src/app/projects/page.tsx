import { getFormattedDate } from '@/src/app/lib/date'
import { projects } from '@/src/app/lib/projects'
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
      <h1 className="text-3xl mb-4">Projects</h1>
      <ul className="list-inside">
        {projects
          .filter((p) => isDev || !p.draft)
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
