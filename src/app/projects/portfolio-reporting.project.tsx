import { Project } from './projects'
import { Outro } from './components/outro'
import { CodeBlock } from './components/code-block'
import Link from 'next/link'

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
        this project, seen <a href="#unofficial-apis-in-rpa">below.</a>
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
      <h3>Sneak Peak</h3>
      <p>
        I&apos;m in the final stages of finishing a project to use this data and
        automatically transfer the money for all of our properties every month,
        once we report is approved.
      </p>
      <p>Stay tuned...</p>
      <Outro />
      <h2>Interested in the technical details? Keep reading!</h2>
      <h3 id="unofficial-apis-in-rpa">Unofficial APIs in RPA</h3>
      <p>
        I was able to use almost 100% of what we call in the RPA world an
        &quot;unoffical API&quot;s. What&apos;s typically meant by this phrase
        is the API that the front-end uses. The general idea is that you
        authorize to the website, and then use the credentials received to call
        the API just like the front-end does. This strategy is a great way to
        interact with websites with code because it&apos;s much more stable that
        querying for elements on the page itself. I was able to convert a
        Playwright automation that required at least 10 selectors and a ton of
        clicking, typing, and waiting for elements into 3 simple GraphQL calls.
        I used this strategy for both Monarch and Baselane.
      </p>
      <p>
        One technique that I&apos;ve learned recently (shoutout to{' '}
        <Link target="_blank" href={'https://github.com/shoopapa'}>
          Joe Davis
        </Link>
        ) in order to more easily get auth information when traditional methods
        prove difficult is to use Playwright&apos;s &nbsp;
        <code>page.on(&apos;request&apos;)</code> method, and return all the
        headers from that request to be used subsequently.
      </p>
      <CodeBlock lang="typescript">
        {`const headers = await new Promise<Record<string, string>>((res, rej) =>
page.on('request', async (req) => {
  if (
    req.url() === baselaneGraphqlUrl &&
    req.postDataJSON()?.operationName === 'currentWorkspace'
  ) {
    const headers = await req.allHeaders()
    if (!headers.cookie) {
      rej(new Error('failed to get cookie'))
      return
    }
    page.removeAllListeners()
    res(
      Object.entries(headers).reduce(
        (acc, [key, value]) => {
          if (key.startsWith(':') || key === 'content-length') {
            return acc
          }
          acc[key.toLowerCase()] = value
          return acc
        },
        {} as Record<string, string>,
      ),
    )
  }
}),
    )`}
      </CodeBlock>
      <h3>Baselane Requires text message 2FA prior to transfers. 😳</h3>
      <p>
        This one was actually made simple because of the&nbsp;
        <Link href="/projects/custom-business-phone">
          business phone project.
        </Link>
        &nbsp; Due to the fact we&apos;re already using Twilio to send and
        receive texts, I was able to easily use Twilio&apos;s SDK to receive the
        OTP code. Not the most beautiful, but the code used is below. The
        retries were necessary due to the delay in the receipt of the message.
      </p>
      <CodeBlock lang="typescript">
        {`// twilio-service method:
const getNRecentMessages = (n: number) =>
  twilioClient.messages.list({
    limit: n,
  })
// main code:    
const TWILIO_ACCOUNT_SID = twilioCreds.accountSid
const TWILIO_AUTH_TOKEN = twilioCreds.authToken
const twilioService = initTwilioService(
  TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN,
)
let otpCode: string | undefined = undefined
const now = new Date(Date.now() - 5000)
let retries = 0
while (!otpCode && retries < 5) {
  const recentMessages = await twilioService.getNRecentMessages(5)

  const otpMessage = recentMessages.find(
    (msg) =>
      msg.body.includes('Baselane verification code') &&
      msg.dateCreated > now,
  )

  const codeRegex = /(\d{6})/
  const codeMatch = otpMessage?.body.match(codeRegex)
  if (codeMatch) {
    otpCode = codeMatch[0]
    break
  }

  retries++
  await waitFor(3000)
}

if (!otpCode) {
  throw new Error('failed to get OTP code')
}`}
      </CodeBlock>
    </div>
  ),
}
