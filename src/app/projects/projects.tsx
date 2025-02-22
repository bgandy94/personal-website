import React from 'react'
import { booksAutomationProject } from './books-automation.project'
import { customBusinessPhoneProject } from './custom-business-phone.project'
import { atbSystemProject } from './atb-system.project'

export type Project = {
  slug: string
  component: React.JSX.Element
  draft?: boolean
  title: string
  dates: {
    start: Date
    end?: Date
  }
}

export const projects: Project[] = [
  booksAutomationProject,
  customBusinessPhoneProject,
  atbSystemProject,
]
