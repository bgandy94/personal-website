import Image from 'next/image'
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

type TransactionTypeDisplay = {
  name: string
  description: string
}
const transactionTypes: TransactionTypeDisplay[] = [
  {
    name: 'Operating',
    description:
      'a transaction, unrelated to a particular property, that is necessary for operations of the portfolio. Examples include business phone subscription,tools, software subscriptions, etc...',
  },
  {
    name: 'Maintenance',
    description:
      'a transaction, related to a particular property, that is incurred during a tenancy or a make-ready in order to keep the property rented. Examples include plumbing repairs, hvac repairs, etc...',
  },
  {
    name: 'Renovation',
    description:
      'a transaction, related to a particular property, that is incurred during a major renovation (typically unneeded for reletting). Examples include house additions, complete home renovations, etc...',
  },
  {
    name: 'Write-Offs',
    description:
      'a transaction, typically unrelated to a particular property, that is related to your portfolio but not necessarily needed to operate/maintain the portfolio. Examples include vehicles, equipment, tools, etc...',
  },
]

export const projects: Project[] = [
  {
    slug: 'rental-portfolio-books-automation',
    component: (
      <>
        <h2 className="text-2xl mb-2" id="how-it-started">
          How it started
        </h2>
        <p className="mb-4">
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

        <h2 className="text-2xl mb-2" id="how-it-is-now">
          How it is now
        </h2>
        <p className="mb-4">
          While this original system had it&apos;s obvious flaws and relied very
          heavily on my pure will to complete this unfortunate task, it did work
          for us for several years before I finally decided enough was enough.
          Being in software, automating manual tasks is always something
          I&apos;m conscious of. I began actually building out an export
          application on top of{' '}
          <Link
            href="https://www.electronjs.org/"
            className="underline"
            target="_blank"
          >
            Electron
          </Link>
          &nbsp; to basically scrape the data from our mint account into a CSV
          that I could then use to in Google sheets to generate P&L reports with
          pivot tables. Then, come roughly October or November of 2023, Mint
          announces its shutting down and transferring those who want to over to
          Credit Karma. This was obviously quite annoying because I just built a
          tool to integrate with Mint and now it feels like I&apos;m back to the
          drawing board. Upon a bit of exploration, Kelley and I decided to give{' '}
          <Link
            href="https://www.monarchmoney.com/"
            className="underline"
            target="_blank"
          >
            Monarch Money
          </Link>{' '}
          a try. We fairly quickly began to enjoy the features of Monarch,
          including their mint migration tool, which made tranferring our data
          out of mint and into Monarch super easy. We pretty quickly devised a
          new system of tags that now allows us to do a lot of things with the
          data we&apos;re pulling.
        </p>
        <h3 className="font-bold mb-2">
          Here&apos;s an overview of what we can do now very easily:
        </h3>
        <ul className="list-disc flex flex-col align-middle list-inside text-left mb-2">
          <li>Generate on-demand P&L statements by property.</li>
          <li>
            Filter reports by{' '}
            <Link className="underline" href="#transactions-types">
              transaction type
            </Link>
          </li>
          <li>Quickly find out capitalizable expenses for the year</li>
          <li>
            At a glance check to be sure we&apos;ve collected all rents due for
            each month
          </li>
        </ul>
        <h3 className="text-xl">How it works</h3>
        <Image
          id="data-formatter-diagram"
          src="/data-formatter-diagram.svg"
          alt="data formatter system diagram"
          width={800}
          height={500}
        />
        <p className="mb-4">
          Now that all of this is setup, every single hour, on the hour, I get
          updates to my Google sheet with any new transactions that were
          performed. See below for a slimmed down version of the results of the
          export
        </p>
        <iframe
          className="w-full min-h-[450px] mb-4"
          src="https://docs.google.com/spreadsheets/d/e/2PACX-1vSOh_aR3EEg3vO9TwSLDaUi1CDT1X_U4JsHhp1ziisxKAj6nuxjYjT_PmFcuFS2FPUwsztnXwpfVIoC/pubhtml?gid=400669900&amp;single=true&amp;widget=true&amp;headers=false"
        />
        <p>
          So in the{' '}
          <Link className="underline" href="#data-formatter-diagram">
            diagram above
          </Link>{' '}
          the step where we actually parse/format the CSV file from Monarch,
          there&apos;s a bit of interesting pieces going on. Because of the tags
          in monarch we can assign a property and a transaction type to our data
          going in to sheets.
        </p>

        <h3 className="text-xl my-4" id="transactions-types">
          Transaction Types
        </h3>
        <div className="">
          {transactionTypes.map((tx) => (
            <p key={tx.name} className="mb-2">
              <span className="font-bold">{tx.name}: </span> {tx.description}
            </p>
          ))}
        </div>

        <h3 className="text-xl my-4" id="transactions-types">
          How does the System determine transaction types
        </h3>
        <p className="mb-2">
          Simply enough, to determine a particular transaction&apos;s type, we
          use the tags to determine that. The logic can be found below
        </p>
        <code className="text-sm lg:text-[16px] bg-gray-600 w-full text-left p-1 lg:p-2 my-2">
          if transaction has a property and &apos;maintenance&apos; tag then
          type = &apos;Maintenance&apos; <br />
          if transaction has a property and &apos;renovation&apos; tag then type
          = &apos;Renovation&apos; <br />
          if transaction has a &apos;rpt write-offs&apos; tag then type =
          &apos;Write-Offs&apos;
          <br />
          else type = &apos;Operating&apos;
        </code>
        <table className="table-auto text-left">
          <thead className="border-b-2">
            <tr>
              <th className="p-3 border-r-2">Category</th>
              <th className="p-3 border-r-2">Amount</th>
              <th className="p-3 border-r-2">Tags</th>
              <th className="p-3">Type</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-2 border-r-2">Plumbing</td>
              <td className="p-2 border-r-2">$75.00</td>
              <td className="p-2 border-r-2">
                rental prop tx,property 1, maintenance
              </td>
              <td className="p-2">Maintenance</td>
            </tr>
            <tr>
              <td className="p-2 border-r-2">RingCentral</td>
              <td className="p-2 border-r-2">$75.00</td>
              <td className="p-2 border-r-2">rental prop tx</td>
              <td className="p-2">Operating</td>
            </tr>
            <tr>
              <td className="p-2 border-r-2">Home Depot</td>
              <td className="p-2 border-r-2">$150.00</td>
              <td className="p-2 border-r-2">rental prop tx, write-off</td>
              <td className="p-2">Write-Offs</td>
            </tr>
            <tr>
              <td className="p-2 border-r-2">Johnny the Contractor</td>
              <td className="p-2 border-r-2">$1500.00</td>
              <td className="p-2 border-r-2">
                rental prop tx, property 1, renovation
              </td>
              <td className="p-3">Renovation</td>
            </tr>
          </tbody>
        </table>
        <h3 className="text-xl my-4" id="taxes">
          Taxes
        </h3>
        <p className="pb-4">
          Now with this new system I&apos;m also able to send capitalizable
          expenses (which are also tracked by tags) report, property P&L
          reports, and my real estate agent P&L report to my accountant and have
          the hard part of taxes done. Obviously still a lot of work to do in
          order to gather all the documents, but still way less time consuming
          that it was in years&apos; passed
        </p>
        <h3 className="text-xl my-4" id="taxes">
          Feedback/Questions?
        </h3>
        <p>
          If you have any questions, thoughts on improving this process, or want
          to get in touch to see if there&apos;s something I can automate for
          you, please reach out to me at{' '}
          <Link href="mailto:brandongandy2012@gmail.com" className="underline">
            brandongandy2012@gmail.com
          </Link>
        </p>
      </>
    ),
    title: 'Automating my portfolio P&L with Monarch and Google Sheets',
    dates: { start: new Date('2024-01-31') },
  },
]
