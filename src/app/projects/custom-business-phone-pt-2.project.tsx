import Link from 'next/link'
import { Project } from './projects'
import { Outro } from './components/outro'

export const project = {
  slug: 'custom-business-phone-pt-2',
  dates: { start: new Date('2026-03-02'), end: new Date('2026-03-06') },
  draft: true,
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
        needed to be addressed. Some of the issues we were running into
        included:
      </p>
      <ul className="text-left">
        <li>
          <span className="font-bold">Caller ID:</span> we needed a way to tell
          who was calling us when we were receiving a call.
        </li>
        <li>
          <span className="font-bold">Quick Hang Up:</span> to avoid having the
          caller reach one of our voicemails, I originally added a 10 second
          timeout before forwarding the caller to voicemail. This was a very
          short period of time to pick up the phone.
        </li>
      </ul>
      <h2 id="the-solution">The Solution</h2>
      <p>
        <span className="font-bold">Call Queues: </span>
        To allow for extended wait times, I implemented a call queue system.
        Rather than the original system, that simply attempted to forward the
        call to my wife or I.
      </p>
      <p>
        The fix for figuring out who was calling was to implement a caller name
        recording step during the call
      </p>
    </div>
  ),
} as const satisfies Project
