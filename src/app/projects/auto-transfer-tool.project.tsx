import { Project } from './projects'
import { ProjectLink } from './components/project-link'
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
        , it was very clear that going through each property and managing
        transfers from the management company to the holding company was going
        to be too much. The problem will only get worse with the more properties
        we buy, so I figured we might as well address it now.
      </p>
      <p>
        There&apos;s nothing really magic about the transfer process. The first
        thing I do is generate the portfolio report, review it, and once the
        numbers look good I run a script on my computer to take that data and
        perform the transfers. We&apos;re probably headed to a place where
        everything will happen without human intervention, but until we really
        trust the calculations we&apos;re okay with a little bit of effort for
        now.
      </p>
      <h2>The Solution</h2>
      <p>
        A system was built to take the data from the{' '}
        <ProjectLink projectName="portfolioReportingProject">
          portfolio reporting project
        </ProjectLink>
        , and go to my bank&apos;s website using Playwright and do the transfer
        for each property.
      </p>
      <p>
        For every property listed in the portfolio report data we have to take
        the owner disbursement amount and transfer that money from the
        management company's account to the holding company's account. Or, in
        the event the owner disbursement amount is negative, transfer the money
        from the holding account to the management account!
      </p>
    </div>
  ),
} as const satisfies Project
