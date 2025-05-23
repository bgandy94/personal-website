import { Project } from './projects'
import Image from 'next/image'
import { Outro } from './components/outro'
import { ProjectLink } from './components/project-link'

export const project = {
  title: 'ATB (All Tenants Bulletin) System',
  slug: 'atb-system',
  dates: {
    start: new Date('2025-02-13'),
    end: new Date('2025-02-13'),
  },
  component: (
    <div className="w-full">
      <h2>The Problem(s)</h2>
      <p>
        One of the more stressful times for a landlord is when the weather gets
        REALLY cold. Pair that with the fact that most of my properties have
        crawlspaces, the likelihood of a pipe freezing and possibly bursting are
        fairly high.
      </p>
      <p>
        Reaching out to all of my tenants individually was no small task.
        Espcially now with over ten properties, that&apos;s at least ten text
        messages that need to be sent. So I wanted to create a system that would
        allow me to send out a mass text message to all of my tenants to remind
        them of the precautions to take in order to minimize the chances of
        problems.
      </p>
      <h2>The Solution</h2>
      <p>
        A system that retrieves all tenant numbers and sends out a text via
        Twilio. I was able to build this functionality on top of my existing
        project, which can be read up on&nbsp;
        <ProjectLink projectName="customBusinessPhoneProject">here</ProjectLink>
        .
      </p>
      <p>
        One of the tricky parts of this project was deciding where to store
        tenant contact information. Like most responsible landlords, we have a
        Google sheet where we store all of our tenant information. To avoid
        duplicative sources of truth and the need to build a front-end to manage
        tenants, I made the decision to see how bad it would be to just query
        the spreadsheet. Surprisingly enough, it wasn&apos;t that bad.
      </p>

      <h3>How it works</h3>
      <p>
        I was able to piggy back a bit on some of the code I wrote in my
        portfolio report generation tool, project write up{' '}
        <ProjectLink projectName="booksAutomationProject">here</ProjectLink>.
        However, I run that code primarily on-demand as a script on my laptop.
        This project is hosted on AWS with API gateway and lambdas. So I had to
        find a way to authorize my lambda to be able to read my tenant contact
        information spreadsheet, pull the numbers, and send out the texts. That
        way anytime we update our tenant contact list spreadsheet, the phone
        system automatically picks up any updates! After using the system for
        the first time recently during a very serious winter freeze, we only had
        one house have any issues. That&apos;s a shockingly low number
        considering the temps got below 10 degress Farenheit!
      </p>
      <div className="flex justify-center my-8">
        <Image
          alt="system flow"
          width={500}
          height={500}
          src="https://docs.google.com/drawings/d/e/2PACX-1vQnpH9ADiYgAlGhjbmLeF7ut5n1O0OlTSxicu1nKvpkYo_ZAnRp19X6FgKZcj51nzWgQfNNiJ0i1Qxy/pub?w=479&amp;h=809"
        />
      </div>

      <Outro />
      <div className="mt-12">
        <h2>Technical Details</h2>
        <h3>Auth to Google Sheets API From AWS Lambda</h3>
        <p>
          This turned out to be more trivial than I was anticipating. I already
          had an existing service account in Google Cloud Console. There were a
          couple steps involved to make sure the auth worked.
        </p>
        <ol className="text-left">
          <li>
            <span className="font-bold">
              Share the sheet with the service account.
            </span>{' '}
            All service accounts are assigned an email, so sharing the sheet is
            just like sharing it with anyone. Just put the email in and make
            sure it has the permissions it needs.
          </li>
          <li>
            <span className="font-bold">
              Retrieve/store JSON key for service account.
            </span>{' '}
            I took the key copied out of Google console and stored it in a
            secure string in AWS Systems Manager Parameter Store. I stringified
            it in, and parsed it out!
          </li>
        </ol>
        <h3>How to determine an ATB email from other text emails?</h3>
        <p>
          Nothing magic here! I decided on a particular string that denotes an
          email as an ATB. What&apos;s the string you ask? &quot;ATB&quot; of
          course!
        </p>
      </div>
    </div>
  ),
} as const satisfies Project
