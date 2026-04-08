import type { Metadata } from 'next'
import { generateFormattedTitle } from '../lib/metadata-helpers'
import TextClient from './text-client'
export const metadata: Metadata = {
  title: generateFormattedTitle('Text'),
}

export default function TextPage() {
  return <TextClient />
}
