import Link from 'next/link'
import { Project } from './projects'
import { Outro } from './components/outro'

export const customBusinessPhoneProject: Project = {
  slug: 'custom-business-phone',
  dates: { start: new Date('2024-10-03'), end: new Date('2024-11-12') },
  title: 'Custom Business Phone to Replace RingCentral',
  component: (
    <div className="w-full">
      <Link className="no-underline" href={'/projects/atb-system'}>
        <div className="bg-sky-900 rounded-lg p-2 flex justify-center">
          <p className="text-sky-200">
            Click to view project for new ATB functionality!
          </p>
        </div>
      </Link>
      <h2 id="the-problem">The Problem</h2>
      <p>
        My wife and I have been managing rentals for quite some time now, and
        one of the tools we&apos;ve been using for a while is&nbsp;
        <Link href="https://ringcentral.com">RingCentral</Link> as a business
        phone offering. The primary issues we were running into with not having
        a centralized number include:
      </p>
      <ul className="text-left">
        <li>
          <span className="font-bold">Privacy:</span> posting our personal
          numbers on the rental listings and legal documents was not desired.
        </li>
        <li>
          <span className="font-bold">Professionalism:</span> having a dedicated
          business number helps maintain a professional image.
        </li>
        <li>
          <span className="font-bold">Call Management:</span> it was difficult
          to manage and track calls related to the business when using personal
          numbers.
        </li>
        <li>
          <span className="font-bold">Separation:</span> keeping business and
          personal communications separate was important for work-life balance.
        </li>
        <li>
          <span className="font-bold">Verification Codes:</span> a lot of our
          different systems (banks, supply houses, etc...) will send a
          verification code to a phone number on file. Having a shared number
          allows us to receive those texts independently without having to ask
          the other person to share the code.
        </li>
      </ul>
      <p>
        While RingCentral supported texting and had a lot of great features, it
        came with some pretty considerable drawbacks. For one, the texting
        worked, but it did not work for the shared number. This meant we were in
        the same boat before in regards to being able to solve our Verification
        Code problem. Secondly, we were constantly receiving calls from spam
        numbers, and while RingCentral did have a spam filter, it was not very
        good. Lastly, the cost was pretty high for what we were getting out of
        it.
      </p>
      <h2 id="the-solution">The Solution</h2>
      <p>
        After a bit of ideation, I decided to build a custom business phone
        tailored to our needs that addressed our specific problems. The way the
        system works is pretty simple. We have a single phone number that
        behaves in the following way:
      </p>
      <h3>Incoming Phone Call</h3>
      <p className="font-bold">A call is received from a non-agent number</p>
      <p>
        A non-agent number consists of any number that is not my wife or
        I&apos;s number. When this occurs, both of our phones will ring. Whoever
        picks up first receives the call. If neither of us answer the call in
        time, the call will be forwarded to voicemail. Once they reach
        voicemail, the caller will prompted to leave a message. The voice
        message, if left, will be transcribed, and sent in an email along with
        the audio to our shared business email.
        <p className="font-bold">A call is received from an agent number</p>
        An agent phone number is either my wife or I&apos;s personal number.
        When this occurs, an IVR menu (press 1 to x, press 2 to y) will be
        reached that includes the following options:
      </p>
      <ol className="text-left">
        <li>
          <span className="font-bold">Redial the last non-agent number.</span>
          &nbsp; This allows us to easily redial callers when we missed their
          call.
        </li>
        <li>
          <span className="font-bold">Make a call as the business number.</span>
          &nbsp; This allows us to make calls behind the business number,
          maintaining the privacy of our personal numbers.
        </li>
      </ol>
      <h3>Incoming Text Message</h3>
      <p>
        Text messages are handled by routing incoming texts to our business
        email, including the sender&apos;s phone number and the message
        contents. To reply, we respond directly to the email, and the system
        converts our email reply into a text sent to the original sender. While
        this approach is unconventional, it eliminates the need for a custom
        mobile app, saving development time and costs. Additionally, the system
        supports MMS, enabling images to be sent and received seamlessly.
      </p>
      <Outro />

      <h2>Interested in the technical details? Keep reading!</h2>

      <h3>Intro</h3>

      <p>
        The following technologies were used to build the custom business phone:
      </p>
      <ul className="text-left">
        <li>Twilio - SMS/Phone technology</li>
        <li>
          AWS:
          <ul>
            <li>
              API Gateway - used to route requests to the serverless endpoints.
            </li>
            <li>Lambda - serveless functions to do things.</li>
            <li>
              DynamoDB - used to store text messages. (will explain more later)
            </li>
            <li>
              S3 - used to store recordings, and also MMS images in-flight
            </li>
            <li>SES - used for emailing receiving and sending</li>
            <li>Route53 - used for DNS</li>
            <li>AWS Transcribe - used for voicemail transcriptions.</li>
          </ul>
        </li>
      </ul>
      <p>
        Looking at that list of tech, I&apos;m sure the question that instantly
        comes to mind is, how did this get so complicated? Well there was one
        particularly major thing I was trying to avoid to get this thing up and
        running as quick as possible.&nbsp;
        <span className="font-bold">No custom mobile app.</span> One of the
        major issues of building a custom app is building it in such a way that
        the lovely team at Apple would approve to be put on the Apple Store, or
        pay for various tools like TestFlight and really hack it onto my
        wife&apos;s phone. I wanted to avoid all of that, so after chatting with
        a couple of my buddies in tech, the idea of using email as the
        technology to faciliate text communication became highly intriguing.
        Overall, the idea of receiving a text and sending it over email was
        extremely simple to implement. The tricky part came in when trying to
        trick my email service of choice (Gmail) into threading text exchanges
        together. This was more complicated than I had originally anticipated.
        The naive part of me thought: same sender, same subject—surely Gmail
        will just thread that. But that&apos;s definitely not how it went down.
      </p>
      <h3>Gmail and Threading</h3>
      <p>
        My main desire was to have the text emails thread similarly to how they
        would in all SMS/email apps. There&apos;s at least one major requirement
        in order to make Gmail understand that that an email is a reply to
        another email. The <code>In-Reply-To</code> and&nbsp;
        <code>References</code> headers. The catch about those headers is that
        you need to set them to the message id of the email you want to thread
        with. Obviously, the email client handled that for free, as it always
        does when we were sending emails out. But when the text messages came
        in, we&apos;d have to associate the text with the last email associated
        with the thread for that phone number. So basically, everytime an email
        is either received by our business email, or a text is received and an
        email is sent to the business email, everything is stored in DynamoDB
        along with their message id. This way, as emails are being sent to the
        business email triggered by a text, we can lookup the most recent email
        for that phone number, grab the message id, and inject that into the
        headers so Gmail will recognize that email as a reply to the latest
        email in the thread.
      </p>
      <p>
        Sadly, even with all this &ldquo;fun&rdquo; work, Gmail will still limit
        my threads to be less than 50 emails, but it&apos;s still better than
        new threads for every text.
      </p>

      <h3>MMS</h3>
      <p className="font-bold">
        Why are my email images not being sent over text?!
      </p>
      <p>
        Another painpoint of this project was handling images in both
        directions. Sending images from a text over email was a pretty trivial
        effort. Unexpectedly, going the other direction proved to be a bit more
        challenging. The main problem I originally ran into was that emails were
        bouncing when being sent with images to the SES email, but there was
        virtually no indication as to what the problem was. After stepping away
        from the idea and attempting to be content with the system as it was, I
        finally decided to re-address the problem and give it another look.
        Based on everything I could find, Twilio&apos;s image size limits were
        way larger than what I was sending, as was SES&apos;s (seemingly). I
        finally tripped on&nbsp;
        <Link
          target="_blank"
          href="https://docs.aws.amazon.com/ses/latest/dg/receiving-email-action-sns.html"
        >
          this AWS documentation page
        </Link>
        &nbsp; that finally gave me the answer I was looking for. Apparently, if
        you drop an SES event directly on to SNS, it drastically reduces your
        email size limit, all the way down to 150KB. After discovering this, I
        adjusted the SES receipt rule to put it on S3, and then trigger the SNS
        topic which pulls the full email from S3 and processes it from there.
      </p>
      <p className="font-bold">
        Twilio&apos;s API for sending texts uses URLS. How do I faciliate that?
      </p>
      <p>
        Following&nbsp;
        <Link
          target="_blank"
          href="https://www.twilio.com/docs/messaging/tutorials/how-to-send-sms-messages/node#send-a-message-containing-media-mms-in-nodejs"
        >
          the tutorial available on Twilio&apos;s website,
        </Link>
        &nbsp;the <code>mediaUrl</code> property is an array of urls to the
        files needing attached to the text. Given this need, the images that are
        received by SES need to be publicly available for Twilio to be able to
        send them. It works as follows: once an email is received with images
        via the SES email, those images are parsed and stored in S3. Once stored
        in S3, presigned urls are generated for each image and then those URLs
        are sent along in the <code>mediaUrl</code> property. This gives us
        time-based authorization for links so Twilio can access them and send
        them along!
      </p>
      <p>
        Since the images are only needed temporarily, I configured the bucket to
        automatically delete any objects that are older than 24 hours.
      </p>
    </div>
  ),
}
