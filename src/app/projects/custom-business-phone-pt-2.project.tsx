import Link from 'next/link'
import { Project } from './projects'
import { Outro } from './components/outro'
import Image from 'next/image'
import { CodeBlock } from './components/code-block'

export const project = {
  slug: 'custom-business-phone-pt-2',
  dates: { start: new Date('2026-03-02'), end: new Date('2026-03-06') },
  title: 'Custom Business Phone Pt. 2',
  component: (
    <div className="w-full">
      <Link className="no-underline" href={'/projects/custom-business-phone'}>
        <div className="bg-sky-900 rounded-lg p-2 flex justify-center">
          <p className="text-sky-200">
            Haven't read the first part of this project? Click here to read it!
          </p>
        </div>
      </Link>
      <h2 id="the-problem">The Problem</h2>
      <p>
        After the first iteration of this project, we identified some gaps that
        needed to be addressed. Some of the issues we were running in to
        included:
      </p>
      <ul className="text-left">
        <li>
          <span className="font-bold">Caller ID:</span> We needed a way to tell
          who was calling us.
        </li>
        <li>
          <span className="font-bold">Quick Hang Up:</span> To avoid having the
          caller reach one of our voicemails, I originally added a 10 second
          timeout before forwarding the caller to voicemail. This was a very
          short period of time to pick up the phone.
        </li>
      </ul>
      <h2 id="the-solution">The Solution</h2>
      <h4 className="font-bold">Call Queues</h4>
      <p>
        To allow for extended wait times, I implemented a call queue system.
        Rather than the original system, that simply attempted to forward the
        call to my wife or I ("agents"). This also allowed for more flexibility
        in how we handle calls in the future. For example, this allowed me to
        add an admin feature in the "call received" email with a{' '}
        <code>tel:</code> link to automatically allow an admin to connect with
        the caller in the queue.
      </p>
      <p>
        As for the "who is calling?" question, the fix I implemented was to have
        the caller record their name before being put in the queue. This allowed
        me to be able to transcribe the recording and display the name of the
        caller in the "call received" email. The caller's name is also played to
        the agent with an option to ignore the call or answer it. This allows
        the agent to know who is calling and decide if they want to answer the
        call or not. As you can see in the image below, the name and number of
        who is calling is now in the email!
      </p>
      <Image
        alt="call received email example"
        src="/call-received-email-example.png"
        width={1200}
        height={600}
        className="w-full h-auto my-4"
      />
      <p>
        The link in the image above is as follows:{' '}
        <code>tel:+1405*******,3</code>. As discussed in the{' '}
        <Link href="/projects/custom-business-phone/#agent-call">
          previous project
        </Link>
        , the business phone keeps record of when an "agent" is calling and when
        a customer is calling. The link in the email will call the business
        phone. The <code>,3</code> will pause 3 seconds then dial 3, which is a
        new option to pick up the oldest caller in the call queue.
      </p>
      <p>
        This UX is vastly improved from the original system in the following
        ways:
      </p>
      <ol className="text-left">
        <li>We can tell who's calling</li>
        <li>We can handle concurrent customer calls.</li>
        <li>
          We have a longer time to pick up the phone before forwarding to
          voicemail.
        </li>
        <li>
          The customer call and the call to the agents are now separated. So
          there's no risk of one of the agents ignoring the call and sending the
          customer to voicemail.
        </li>
        <li>
          The admin can connect with the caller in the queue as long as the
          caller stays in the queue. Even if the original call to the agent was
          not answered.
        </li>
        <li>The wait music is now customizable.</li>
      </ol>
      <Outro />

      <h2>Interested in the technical details? Keep reading!</h2>
      <p>
        The biggest challenge for me during this re-imagination of this project
        was trying to understand how call queues worked. Things from how to
        enqueue a customer, how to add a reasonable wait time for the customer,
        how to connect an agent to the customer, and so on...
      </p>
      <h3>Enqueueing a customer</h3>
      <p>
        The actual code to enqueue a customer was pretty straightforward. The
        docs{' '}
        <Link
          target="_blank"
          href="https://www.twilio.com/docs/voice/twiml/enqueue"
        >
          here
        </Link>{' '}
        were pretty helpful. The part that was tricky was understanding what a{' '}
        <code>TwimlResponse</code> is actually doing. The code below is the
        actual code to enqueue a customer.
      </p>
      <CodeBlock lang="typescript">
        {`  export const queueWait: Handler = async (ev: APIGatewayEvent) => {
  const urlParams = new URLSearchParams(ev.rawQueryString)
  const From = urlParams.get('from')
  const Name = urlParams.get('name')
  const strippedName = Name?.replace(/[^a-zA-Z0-9\s]/g, '')
  const response = new twiml.VoiceResponse()
  response.say('Press a key at any time to leave a voice mail.')
  const gather = response.gather({
    numDigits: 1,
    action: '/twilio/queue-wait-response',
    method: 'POST',
  })
  gather.play(
    'https://my-mp3-file.mp3',
  )
  const twilioNumber = await paramsUtil.getTwilioNumber()
  const sendCallReceivedEmail = async () => {
    const [sesEmail, anomalyEmail] = await Promise.all([
      paramsUtil.getSesEmail(),
      paramsUtil.getAnomalyEmail(),
    ])
    await sendEmail(
      sesEmail,
      anomalyEmail,
      \`New call from \${strippedName || 'Unknown'} at \${From}. To answer: <a href="tel:\${twilioNumber},3">click here</a>\`,
          \`New call from \${strippedName || 'Unknown'} at \${From}.\`,
    )
  }

  await sendCallReceivedEmail()

  const { accountSid, authToken } = await getTwilioCreds()
  const twilioService = await initTwilioService(accountSid, authToken)
  const agentPhoneList = await paramsUtil.getAgentPhoneList()
  await Promise.all(
    agentPhoneList.map(async (phone) => {
      await twilioService.twilioClient.calls.create({
        to: phone,
        from: twilioNumber,
        url: \`\${anomalyPhoneApiDomain}/twilio/queue-dial\`,
      })
    }),
  )

  response.leave()

  return twilioSuccessResponse(response.toString())
}`}
      </CodeBlock>
      <p>
        Beyond the extra parts of getting phone numbers from the depths of
        various AWS offerings and parsing out the data. The code above
        essentially builds a <code>TwimlResponse</code> that instructs Twilio to
        do the following things in order:
      </p>
      <ol className="text-left">
        <li>
          Line 7: Inform the caller they can press a key at any time to leave a
          voice mail.
        </li>
        <li>
          Line 8: Listen for key press from the caller. This allows the caller
          to skip the wait music and leave a voice mail.
        </li>
        <li>
          Line 13: Play the wait music.{' '}
          <span className="font-bold">
            It's crucial here to note that the <code>.play()</code> is being
            called on the return of the <code>gather</code>.
          </span>{' '}
          Using the return of the <code>gather</code>, it allows us to
          concurrently play the wait music while listening for an input from the
          caller. If you used the <code>response</code> object, it would do them
          sequentially. This is called "verb nesting" in Twilio terms. Read more
          about it{' '}
          <Link
            target="_blank"
            href="https://www.twilio.com/docs/voice/twiml/gather#nest-other-verbs"
          >
            here
          </Link>
          .
        </li>
        <line>
          Line 45: Leave the queue after the wait music has played.{' '}
          <span className="font-bold">
            The length of the wait music determines how long the caller is in
            the queue.
          </span>
        </line>
      </ol>
      <p>
        So, simply put, when you're constructing a <code>TwimlResponse</code>,
        you're essentially building a list of actions that Twilio will perform
        in order. I'm not sure why I didn't understand this at first.
      </p>
      <h3>Dialing an agent</h3>
      <p>
        This is the part that took a while to wrap my head around. When I
        originally implemented it, my thought was to use the{' '}
        <code>TwimlResponse</code> object and do a <code>dial</code> to each
        agent. The problem with this is, as mentioned above, the response object
        is a list of steps for Twilio to execute, in order. So if instead on
        line 35, I called <code>response.dial()</code>, I'm essentially telling
        twilio to dial the agents after doing all of the other steps that
        preceeded it in the response. The was resulting in the agent calls not
        being placed until after the music had played.
      </p>
      <p>
        The solution, which in hindsight is a forehead slapper, was to just use
        the Twilio SDK to make the calls and then define a handler with logic to
        handle agent calls and getting them connected to the queue, if they so
        desire.
      </p>
    </div>
  ),
} as const satisfies Project
