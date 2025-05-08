import Link from 'next/link'
import { PropsWithChildren } from 'react'
import { projectsMap } from '../projects'

export const ProjectLink = <PKey extends keyof typeof projectsMap>({
  projectName,
  children,
}: { projectName: PKey } & PropsWithChildren) => {
  return (
    <Link href={`/projects/${projectsMap[projectName].slug}`}>{children}</Link>
  )
}
