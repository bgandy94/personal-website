import Link from 'next/link'
import { Project } from './projects'
import Image from 'next/image'
import { Outro } from './components/outro'

export const portfolioReportingProject: Project = {
  title: 'Portfolio Reporting System',
  slug: 'portfolio-reporting-system',
  dates: {
    start: new Date('2025-02-18'),
    end: new Date('2025-02-19'),
  },
  component: (
    <div className="w-full">
      <h2>The Problem</h2>
      <p>
        As our portfolio has grown, we&apos;ve made a lot of changes in how we
        operate. With the addition of new LLCs to hold title, separate from the
        LLC that manages our properties, a lot of repetitive and tedious work
        has to be done every month to keep track of various aspects of the
        business. For example, answering quite a few questions such as:
      </p>
      <ul className="text-left">
        <li>How much rent was collected?</li>
        <li>How much was spent on maintenance?</li>
        <li>Leases coming up for expiration</li>
        <li>Any properties with deliquent rent?</li>
        <li>How much money did the management company make?</li>
        <li>How much money did the holding company make?</li>
        <li>How much total profit between the two companies was realized?</li>
      </ul>
      <p>
        In additon to the questions above we also have to disburse funds each
        month from our management company to our holding company. Being that
        we&apos;re managers for both companies, we have a unique management
        agreement between the two entities. The agreement is pretty simple, the
        management company will collect all rent, pay all expenses, and then
        disburse to the holding company the current rent minus any expenses
        incurred minus a 10% management fee. For example:
      </p>
      <table className="text-left xs:w-full xl:w-1/2">
        <thead>
          <tr>
            <th>Item</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Rent Collected</td>
            <td>$1,000</td>
          </tr>
          <tr>
            <td>Expenses</td>
            <td>$200</td>
          </tr>
          <tr>
            <td>Management Fee</td>
            <td>$100</td>
          </tr>
          <tr>
            <td>Disbursement to Holding Company</td>
            <td>$700</td>
          </tr>
        </tbody>
      </table>
      <p className="font-bold">
        What happens if the expenses plus the management fee exceed the
        property&apos;s rent amount?
      </p>
      <p>Simple, the holding company then reimburses the management company.</p>
      <p>
        This process is fairly simple, but when your portfolio grows and the
        need to repeat this process continues to increase, it was vital for us
        to automate this.
      </p>
      <h2>The Solution</h2>
      <p>
        A system that utilizes Monarch and Google Sheets to generate a report
        that answered all of our questions laid out above. As with many of our
        other projects we had a few goals in mind. Minimize redundant sources of
        information, avoid building a custom front-end, and keep costs as low as
        possible.
      </p>
      <p>
        The system works similarly to my other projects that interact with
        Monarch and Google, it simply authorizes to both systems, pulls the data
        and processes it. There are some unique technical strategies used in
        this project. One of which is that I&apos;m using what we call in the
        RPA world an &quot;unoffical API&quot;. What&apos;s typically meant by
        this phrase is the API that the front-end uses. The general idea is that
        you authorize to the website, and then use the credentials received to
        call the API just like the front-end does. This strategy is a great way
        to interact with websites with code because it&apos;s much more stable
        that querying for elements on the page itself.
      </p>
      <p>
        As with any project, the report was expanded quite a bit from its
        original vision. When you start to see information, you tend to
        naturally ask more questions of it. It was my goal to ensure that we
        could answer virtually any question about our portfolio with this single
        report.
      </p>
      <p>
        Here&apos;s an example with bogus data of the report we run every month
      </p>
      <iframe
        className="w-full bg-white h-[800px]"
        src="/cashflow-report-fake.html"
      ></iframe>
      <p>
        After several iterations after using the report for two months it seems
        that the report is finally in more of a complete state. It&apos;s very
        simple to update with additional information as needed though as new
        questions arise.
      </p>
      <Outro />
    </div>
  ),
}
