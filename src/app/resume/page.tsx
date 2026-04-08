import type { Metadata } from 'next'
import { generateFormattedTitle } from '../lib/metadata-helpers'
import ResumeClient from './resume-client'

export const metadata: Metadata = {
  title: generateFormattedTitle('Resume'),
}

export default function ResumePage() {
  return <ResumeClient />
}
