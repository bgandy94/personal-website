import Link from 'next/link'
import React from 'react'

export type Project = {
  slug: string
  component: React.JSX.Element
  title: string
  dates: {
    start: Date
    end?: Date
  }
}

export const projects: Project[] = [
  {
    slug: 'rental-portfolio-books-automation',
    component: (
      <>
        <h2 className="text-2xl mb-2" id="how-it-started">
          How it started
        </h2>
        <p className=" mb-4">
          I&apos;ve been rentals now since February of 2018, and one of the
          things I always dread every year is taxes. Before ever getting in to
          real estate I adopted a technology called{' '}
          <a href="https://mint.intuit.com/" className="underline">
            mint
          </a>
          . It was a pretty amazing tool to help me and my wife understand where
          our money was going and even do things like budgeting. Once we began
          buying rentals, we knew we needed to have some system for books, so we
          decided to go ahead and use Quickbooks to do the financials for the
          portfolio. We would end up using tags within mint to be able to know
          which of our transactions were rental-related and which property they
          were related to. We had a top-level tag called &quot;rental prop
          tx&quot; that we&apos;d assign to ALL transactions related to rentals,
          and then if a particular purchase was related to an individual
          property, we had tags for all of our properties that we&apos;d then
          assign as well. This was particularly useful at the time because our
          operating funds and personal funds were all out of the same bank
          account, which was obviously also a terrible setup.
        </p>
        <p className=" mb-4">
          So mint was pretty much our source of truth and where the process of
          our books would begin. Then, as we found time, we&apos;d use
          mint&apos;s transaction search functionality to look for all of our
          rental transactions and put them into Quickbooks, manually. At the
          time I believe we were using Quickbooks 2017, and exporting to a QBO
          file wasn&apos;t (I think) available through mint, so all of the
          transactions from mint had to be manually typed in to Quickbooks.
          Given the arduos nature of this task, what naturally happened over
          time was that it&apos;d be many months between data being manually
          migrated from mint to Quickbooks. Also not helping the cause was the
          fact that we kept buying more rentals, which meant more data to
          import!
        </p>
        <p className=" mb-4">
          While this original system had it&apos;s obvious flaws and relied very
          heavily on my pure will to complete this unfortunate task, it did work
          for us for several years before I finally decided enough was enough.
          Being in software, automating manual tasks is always something
          I&apos;m conscious of.
        </p>

        <h2 className="text-2xl mb-2" id="how-it-started">
          How it is today
        </h2>
        <p className="mb-4">
          While this original system had it&apos;s obvious flaws and relied very
          heavily on my pure will to complete this unfortunate task, it did work
          for us for several years before I finally decided enough was enough.
          Being in software, automating manual tasks is always something
          I&apos;m conscious of. I began actually building out an export application on top of <Link href="https://www.electronjs.org/" className='underline' target="_blank">Electron</Link>&nbsp;
          to basically scrape the data from our mint account into a CSV that I could then use to in Google sheets to generate P&L reports with pivot tables.
          Then, come roughly October or November of 2023, Mint announces it&apos;s shutting down and transferring those who want to over to Credit Karma. This was obviously 
          quite annoying because I just built a tool to integrate with Mint and now it feels like I&apos;m back to the drawing board. Upon a bit of exploration, Kelley and I 
          decided to give <Link href="https://www.monarchmoney.com/" className='underline' target="_blank">Monarch Money</Link> a try. We fairly quickly
          began to enjoy the features of Monarch, including their mint migration tool, which made tranferring our data out of mint and into Monarch super easy.
          We pretty quickly devised a new system of tags that now allows us to do a lot of things with the data we&apos;re pulling.
          <ul className='list-disc'>
            <li>Generate on-demand P&L statements by property.</li>
            <li>Filter out renovations, and general write-off items</li>
            <li>Quickly find out capitalizable expenses for the year</li>
            <li>At a glance check to be sure we&apos;ve collected all rents due for each month</li>
          </ul>
        </p>
      </>
    ),
    title: 'Automating my portfolio P&L with Monarch and Google Sheets',
    dates: { start: new Date('2024-01-31') },
  },
]
