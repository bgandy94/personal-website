import { projects } from '@/src/lib/projects'
import React from 'react'

export default function Projects({ params }: { params: { slug: string } }) {
  return (
    <>
      <h1 className="text-3xl mb-4">Projects</h1>
      <ul className="list-disc">
        {projects.map((project) => (
          <a href={`/projects/${project.slug}`}>
            <li className="underline">{project.title}</li>
          </a>
        ))}
      </ul>
    </>
  )
}
