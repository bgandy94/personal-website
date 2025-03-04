import Link from 'next/link'
import { CSSProperties } from 'react'
import { Outro } from './components/outro'
import { Project } from './projects'

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
type CircleWithNumberProps = {
  number: number
  size: number
  color: string
  style?: CSSProperties
  strokeColor?: string
  strokeWidth?: number
  textColor?: string
  className?: string
}
const CircleWithNumber = ({
  number,
  size,
  color,
  strokeColor,
  strokeWidth,
  textColor,
  style,
  className,
}: CircleWithNumberProps) => {
  const radius = size / 2 - (strokeWidth ?? 0)
  const center = size / 2

  return (
    <svg
      className={className}
      width={size}
      style={style}
      height={size}
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx={center}
        cy={center}
        r={radius}
        stroke={strokeColor}
        strokeWidth={strokeWidth}
        fill={color}
      />
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        stroke={textColor}
        strokeWidth="1px"
        dy=".3em"
        fontSize={size / 1.5}
        fill={textColor}
      >
        {number}
      </text>
    </svg>
  )
}

export const booksAutomationProject: Project = {
  slug: 'rental-portfolio-books-automation',
  title: 'Automating my portfolio P&L with Monarch and Google Sheets',
  dates: { start: new Date('2024-01-31'), end: new Date('2024-03-01') },
  component: (
    <div className="w-full">
      <h2 id="how-it-started">How it started</h2>
      <p>
        I&apos;ve been doing rentals now since February of 2018, and one of the
        things I always dread every year is taxes. Before ever getting in to
        real estate, I adopted a technology called&nbsp;
        <Link href="https://Mint.intuit.com/">Mint</Link>. It was a pretty
        amazing tool to help me and my wife understand where our money was going
        and even do things like budgeting. Once we began buying rentals, we knew
        we needed to have some system for books, so we decided to go ahead and
        use Quickbooks to do the financials for the portfolio. We would end up
        using tags within Mint to be able to know which of our transactions were
        rental-related and which property they were related to. We had a
        top-level tag called &quot;rental prop tx&quot; that we&apos;d assign to
        ALL transactions related to rentals, and then if a particular purchase
        was related to an individual property, we had tags for all of our
        properties that we&apos;d then assign as well. This was particularly
        useful at the time because our operating funds and personal funds were
        all out of the same bank account, which was obviously also a terrible
        setup.
      </p>
      <p>
        So Mint was pretty much our source of truth and where the process of our
        books would begin. Then, as we found time, we&apos;d use Mint&apos;s
        transaction search functionality to look for all of our rental
        transactions and put them into Quickbooks, manually. At the time I
        believe we were using Quickbooks 2017. Exporting to a QBO file
        wasn&apos;t (I think) available through Mint, so all of the transactions
        from Mint had to be manually typed in to Quickbooks. Given the arduous
        nature of this task, what naturally happened over time was that
        it&apos;d be many months between data being manually migrated from Mint
        to Quickbooks. Also not helping the cause was the fact that we kept
        buying more rentals, which meant more data to import!
      </p>
      <p>
        While this original system had it&apos;s obvious flaws and relied very
        heavily on my pure will to complete this unfortunate task, it did work
        for us for several years before I finally decided enough was enough.
      </p>

      <h2 id="how-it-is-now">How it is now</h2>
      <p>
        Being in software, automating manual tasks is always something I&apos;m
        conscious of. I began actually building out an export application on top
        of&nbsp;
        <Link href="https://www.electronjs.org/" target="_blank">
          Electron
        </Link>
        &nbsp; to basically scrape the data from our Mint account into a CSV
        that I could then use in Google sheets to generate P&L reports with
        pivot tables. Then, come roughly October or November of 2023, Mint
        announces its shutting down and transferring those who want to over to
        Credit Karma. This was obviously quite annoying because I just built a
        tool to integrate with Mint and now it feels like I&apos;m back to the
        drawing board. Upon a bit of exploration, Kelley and I decided to
        give&nbsp;
        <Link href="https://www.monarchmoney.com/" target="_blank">
          Monarch Money
        </Link>
        &nbsp; a try. We fairly quickly began to enjoy the features of Monarch,
        including their Mint migration tool, which made tranferring our data out
        of Mint and into Monarch super easy. We pretty quickly devised a new
        system of tags that now allows us to do a lot of things with the data
        we&apos;re pulling.
      </p>
      <h3>Here&apos;s an overview of what we can do now very easily:</h3>
      <ul className="list-disc flex flex-col align-middle list-inside text-left mb-2">
        <li>Generate on-demand P&L statements by property.</li>
        <li>
          Filter reports by&nbsp;
          <Link href="#transactions-types">transaction type</Link>
        </li>
        <li>Quickly find out capitalizable expenses for the year</li>
        <li>
          At a glance check to be sure we&apos;ve collected all rents due for
          each month
        </li>
      </ul>
      <h3 id="data-formatter-diagram">How it works</h3>
      <div className="grid gap-x-16 gap-y-8 grid-cols-1 my-4 md:grid-cols-2">
        {[
          'Data export started -- run every 1 hour on a schedule',
          "Login to Monarch and download a CSV export of all transactions with main 'rental prop tx' tag",
          'CSV file parsed/formatted',
          'Newly formatted data pushed to Google Sheets via API',
        ].map((text, i) => (
          <div
            key={text}
            className="bg-primary rounded-md px-4 items-center justify-center h-48 flex relative"
          >
            <CircleWithNumber
              className="absolute top-3 left-3"
              number={i + 1}
              color="white"
              size={25}
            />
            <p>{text}</p>
          </div>
        ))}
      </div>

      <p>
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
        So in the <Link href="#data-formatter-diagram">diagram above</Link>
        &nbsp; the step where we actually parse/format the CSV file from
        Monarch, there&apos;s a bit of interesting pieces going on. Because of
        the tags in monarch we can assign a property and a transaction type to
        our data going in to sheets.
      </p>

      <h3 id="transactions-types">Transaction Types</h3>
      <div>
        {transactionTypes.map((tx) => (
          <p key={tx.name}>
            <span className="font-bold">{tx.name}: </span> {tx.description}
          </p>
        ))}
      </div>

      <h3 id="transactions-types">
        How does the System determine transaction types
      </h3>
      <p>
        Simply enough, to determine a particular transaction&apos;s type, we use
        the tags to determine that. The logic can be found below
      </p>
      <div className="bg-gray-600 w-full text-left p-1 lg:p-2 my-2">
        <code className="text-sm lg:text-[16px] ">
          if transaction has a property and &apos;maintenance&apos; tag then
          type = &apos;Maintenance&apos; <br />
          if transaction has a property and &apos;renovation&apos; tag then type
          = &apos;Renovation&apos; <br />
          if transaction has a &apos;rpt write-offs&apos; tag then type =
          &apos;Write-Offs&apos;
          <br />
          else type = &apos;Operating&apos;
        </code>
      </div>
      <div className="w-full overflow-x-scroll">
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
              <td className="p-2 border-r-2">Electrical</td>
              <td className="p-2 border-r-2">$1500.00</td>
              <td className="p-2 border-r-2">
                rental prop tx, property 1, renovation
              </td>
              <td className="p-3">Renovation</td>
            </tr>
          </tbody>
        </table>
      </div>
      <h3 id="taxes">Taxes</h3>
      <p>
        Now with this new system I&apos;m also able to send my capitalizable
        expenses (which are also tracked by tags) report, portfolio P&L report,
        and my realtor P&L report to my accountant and have the hard part of
        taxes done. Obviously still a lot of work to do in order to gather all
        the documents, but still way less time consuming that it was in
        years&apos; passed
      </p>
      <Outro />
    </div>
  ),
}
