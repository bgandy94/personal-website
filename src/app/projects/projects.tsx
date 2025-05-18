import React from 'react'
import { project as booksAutomationProject } from './books-automation.project'
import { project as customBusinessPhoneProject } from './custom-business-phone.project'
import { project as atbSystemProject } from './atb-system.project'
import { project as portfolioReportingProject } from './portfolio-reporting.project'
import { project as autoTransferToolProject } from './auto-transfer-tool.project'

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

export const projectsMap = {
  portfolioReportingProject,
  booksAutomationProject,
  customBusinessPhoneProject,
  atbSystemProject,
  autoTransferToolProject,
}

export const projects: Project[] = Object.entries(projectsMap).map(([, v]) => v)
