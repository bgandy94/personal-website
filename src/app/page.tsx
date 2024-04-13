import Image from 'next/image'
import Link from 'next/link'
const interests = [
  'Software',
  'Real Estate Investing',
  'Tinkering',
  'Home Renovation/Repair',
  'Carpentry',
  'Fishing',
  'Anything at the lake',
  'Music',
  'Video games',
  'Golf',
]
export default function Home() {
  return (
    <div className="md:max-w-[50rem] mb-4 text-center">
      <div className="flex justify-center">
        <Image
          src="/fam-pic.svg"
          alt="family picture"
          layout="response"
          className="rounded-[50rem]"
          width={400}
          height={400}
        />
      </div>
      <h1 className="text-3xl ">Hi, I&apos;m Brandon.</h1>
      <p className="text-gray-400 text-xs mb-4 italic font-bold">
        Last updated: 4/6/2024
      </p>
      <p className="mb-2">
        &emsp;As you can see in the picture above, first and foremost I&apos;m a
        father and a husband. Elsie and Judd (Judson) are very large parts of my
        life as you can imagine. Let&apos;s not forget my amazing wife, Kelley,
        who always keeps me on the straight and narrow. When I&apos;m not
        chasing my kids around I spend a considerable amount of time tinkering,
        see my{' '}
        <Link href="/projects" className="underline">
          projects page
        </Link>{' '}
        to see what I&apos;ve been up to! As a family, we&apos;ve amassed a
        small portfolio of long-term rental properties here in Oklahoma. Given
        we self-manage our rentals, I still attempt to perform as much of the
        maintenance and repairs with my own mental health in mind.
      </p>
      <p>
        &emsp;During the day I&apos;m a software engineer. I&apos;ve been doing
        software now for about 10 years, mostly all professional experience but
        also quite a lot of my experience comes through side projects. A buddy
        of mine and I recently released the alpha version of{' '}
        <Link
          className="underline"
          target="_blank"
          href={'https://closingestimate.com'}
        >
          www.closingestimate.com
        </Link>
        &nbsp; to help Oklahoma-based real estate agents generate closing costs
        estimates for their clients. I&apos;m currently working (as of April
        2024) at an early-stage startup as a founding engineer. As anyone
        who&apos;s experienced such an early-stage startup before knows,
        I&apos;m wearing a lot of hats right now. However, it&apos;s been an
        amazing right so far and I&apos;m super excited to see what comes out of
        it.
      </p>

      <h1 className="text-3xl mt-8 mb-4">Interests</h1>
      <div className="flex flex-1 w-full justify-center text-center pb-4">
        {[...interests]
          .map((x) => ` - ${x}`)
          .join('')
          .trim()}
      </div>
    </div>
  )
}
