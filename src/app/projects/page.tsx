import { projects } from '@/src/lib/projects'
import Link from 'next/link'
import React from 'react'

export default function Projects({ params }: { params: { slug: string } }) {
  return (
    <>
      <h1 className="text-3xl mb-4">Projects</h1>
      <ul className="list-disc">
        {projects.map((project) => (
          <Link key={project.slug} href={`/projects/${project.slug}`}>
            <li className="underline">{project.title}</li>
          </Link>
        ))}
      </ul>
    </>
  )
}
