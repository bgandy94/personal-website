import { Project } from './projects'
import { ProjectLink } from './components/project-link'
import { Outro } from './components/outro'
import Link from 'next/link'

export const project = {
  title: 'Automatic Money Transfer Tool',
  slug: 'auto-transfer-tool',
  draft: true,
  dates: {
    start: new Date('2025-04-13'),
    end: new Date('2025-04-25'),
  },
  component: (
    <div className="w-full">
      <h2>The Problem</h2>
      <p>
        After completing our{' '}
        <ProjectLink projectName="portfolioReportingProject">
          portfolio reporting project
        </ProjectLink>
        , it became clear that manually managing transfers from the management
        company to the holding company for each property was unsustainable. As
        we continue acquiring more properties, the problem will only grow—so we
        figured it’s best to address it now.
      </p>
      <p>
        There’s nothing particularly magical about the transfer process. First,
        I generate the portfolio report and review the numbers. Once everything
        looks good, I run a script on my computer that takes the data and
        performs the transfers. While we’re likely heading toward a fully
        automated system, we’re okay with keeping a little manual oversight
        until we’re fully confident in the calculations.
      </p>

      <p className="font-bold">Why do we need to do these transfers?</p>
      <p>
        This is an interesting, though not uncommon, scenario—and one that’s
        rarely handled correctly. Essentially, we operate with two LLCs: one
        that manages the properties and one that holds title to them. The
        holding company is responsible for paying the mortgage, taxes, and
        insurance, while the management company handles leasing, rent
        collection, and operational expenses.
      </p>
      <p>
        At the end of each month, we need to transfer the remaining funds from
        the management company to the holding company. This setup is a bit
        unique compared to a standard owner–property manager relationship, but
        it’s necessary to keep the financial operations of the two companies
        separate and distinct.
      </p>

      <h2>The Solution</h2>
      <p>
        We built a system that takes data from the{' '}
        <ProjectLink projectName="portfolioReportingProject">
          portfolio reporting project
        </ProjectLink>
        , and uses Playwright to automate bank transfers for each property via
        our bank’s website.
      </p>
      <p>
        For every property in the portfolio report, the system looks at the
        owner disbursement amount. If it’s positive, we transfer that amount
        from the management account to the holding account. If it’s negative,
        the transfer goes the other way—from holding to management.
      </p>

      <h3>How It Works</h3>
      <p>
        The system is built using{' '}
        <Link
          href="https://playwright.dev"
          target="_blank"
          rel="noopener noreferrer"
        >
          Playwright
        </Link>
        , a browser automation library that lets us simulate a real user. It
        opens the bank’s website, logs in, and performs transfers property by
        property.
      </p>
      <p>
        Currently, it's just a script I run manually once the report is
        approved. But a future version will run this automatically on a
        schedule.
      </p>
      <p>
        There’s not much to show visually for this project, but imagine manually
        calculating what the management company owes the holding company and
        making those transfers—
        <span className="font-bold">every property, every month.</span>
      </p>
      <p>
        The manual effort grows linearly with the number of properties. With
        this system, that work is constant—whether you have 1 property or 1,000.
        That’s the goal. Anything that can be automated <em>should</em> be, so
        we can scale operations without increasing our workload.
      </p>

      <h2>Feedback or Questions?</h2>
      <p>
        If you have any questions, suggestions for improving this process, or
        want to discuss something I might be able to automate for you, feel free
        to reach out at{' '}
        <a href="mailto:brandongandy2012@gmail.com">
          brandongandy2012@gmail.com
        </a>
        .
      </p>

      <Outro />
    </div>
  ),
} as const satisfies Project
