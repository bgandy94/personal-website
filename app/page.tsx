import Image from "next/image";
import Link from "next/link";
export default function Home() {
  return (
    <main className="h-screen flex items-center flex-col color-primary px-16">
      <Image
        src="/fam-pic.svg"
        alt="family picture"
        className="rounded-[50rem]"
        width={400}
        height={400}
      />
      <h1 className="text-4xl mb-4">Hi, I&apos;m Brandon.</h1>
      <p>
        As you can see in the picture above, first and foremost I&apos;m a
        father and a husband. Elsie and Judd (Judson) are very large parts of my
        life as you can imagine. Let&apos;s not forget my amazing wife, Kelley,
        who always keeps me on the straight and narrow. When I&apos;m not
        chasing my kids around I spend a considerable amount of time tinkering,
        see my{" "}
        <Link href="/projects" className="underline">
          projects page
        </Link>{" "}
        to see what I&apos;ve been up to! As a family, we&apos;ve amassed a
        small portfolio of long-term rental properties here in Oklahoma. Given
        we self-manage our rentals, I still tend to attempt to perform as much
        of the maintenance and repairs I can with my own mental health in mind.
      </p>

      {/* <h1 className="text-4xl mt-8">Interests</h1>
      <div className="flex flex-1">
        <ul>
          <li>Software</li>
          <li>Real Estate Investing</li>
          <li>Tinkering</li>
          <li>Home Renovation/Repair</li>
          <li>Carpentry</li>
        </ul>
        <div className="flex flex-1" />
        <ul>
          <li>Software</li>
          <li>Real Estate Investing</li>
          <li>Tinkering</li>
          <li>Home Renovation/Repair</li>
          <li>Carpentry</li>
        </ul>
      </div> */}
    </main>
  );
}
