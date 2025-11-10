'use client'

import { useRef } from 'react'
import { useReactToPrint } from 'react-to-print'
import { generateFormattedTitle } from '../lib/metadata-helpers'
import Image from 'next/image'
import Link from 'next/link'

const skillCategories = {
  'Languages/Frameworks': [
    'Typescript / Javascript',
    'React / React Native',
    'NodeJS',
    'C#/.NET',
    'Ruby / Ruby on Rails',
    'Python',
    'Elm',
    'NextJS / Vercel',
    'Redux / Redux Toolkit',
    'Flask',
    'HTML/CSS',
    'Tailwind CSS',
  ],
  'Infra/DevOps': [
    'AWS/GCP/Heroku/Cloudflare',
    'Docker / Kubernetes',
    'AWS ECS / EKS',
    'AWS Lambdas',
    'IaC - CDK / Pulumi / Terraform',
    'Jenkins / Github Actions',
    'ArgoCD',
    'Splunk / Cloudwatch',
  ],
  'Data/Architecture': [
    'PostgresSQL / MySQL / MS SQL / MariaDB',
    'Redis',
    'DynamoDB / NoSQL',
    'Microservice Architecture',
    'Systems Design',
    'Rest / GraphQL',
    'Kafka',
    'AWS SQS / SNS',
    'RabbitMQ',
    'Websockets',
  ],
  AI: [
    'AI Fluent - Prompt engineering, tool orchestration, message streaming',
    'Agentic Workflow Automation',
  ],
  'Leadership/Management': [
    'Leadership / Mentoring',
    'Agile',
    'Test-driven development',
    'Jira / Confluence',
  ],
}

type Education = {
  university: string
  fieldOfStudy: string
  degreeType: 'bachelors'
  honors: string
}

const degreeTypeLabelMap: Record<Education['degreeType'], string> = {
  bachelors: "Bachelor's",
}

const generateDegreeAndFieldOfStudy = (education: Education): string =>
  `${degreeTypeLabelMap[education.degreeType]} in ${education.fieldOfStudy}`

type WorkExperience = {
  order: number
  startDate: Date
  endDate?: Date
  title: string
  company: string
  accomplishments: string[]
}

const experiences: WorkExperience[] = [
  {
    order: 0,
    startDate: new Date('2024-03-01'),
    accomplishments: [
      'Built agentic AI workflow tool that automates complex healthcare tasks',
      'Established CI/CD pipelines across organization, streamlining development processes',
      'Introduced testing standards, increasing test coverage by 70%',
      'Built SFTP server infrastructure, managing secure file transfers for clients',
      'Designed scalable VPN solution, securing network access for clients',
      'Led SOC2 compliance process from vendor selection through completion',
      'Streamlined client onboarding pipeline, increasing platform adoption by 50%',
      'Built AI monitoring dashboards, helping clients identify workflow optimization opportunities',
      'Re-architected queueing system, reducing error rates by 20%',
    ],
    company: 'KaynAI',
    title: 'Founding Engineer',
  },
  {
    order: 1,
    startDate: new Date('2023-03-01'),
    endDate: new Date('2024-03-01'),
    accomplishments: [
      'Refactored flagship product, reducing daily error rates by 10%',
      'Established new SDLC processes, improving team velocity across 8 engineers',
      'Led quality initiatives ensuring products were tested, scalable, and well-documented',
      'Created microservices migration pattern, enabling monolith decomposition',
    ],
    company: 'Janus Health',
    title: 'Principal Software Engineer / Engineering Manager',
  },
  {
    order: 2,
    startDate: new Date('2022-01-01'),
    endDate: new Date('2023-01-01'),
    accomplishments: [
      'Led recruitment and development of engineering team, building skilled workforce',
      'Delivered high-priority project, saving countless support tickets and engineering hours',
      'Maintained transparent communication with leadership on milestones and challenges',
    ],
    company: 'Caribou Financial',
    title: 'Engineering Manager',
  },
  {
    order: 3,
    startDate: new Date('2021-07-01'),
    endDate: new Date('2022-01-01'),
    accomplishments: [
      'Designed architecture improvements including form strategy and event-driven patterns, increasing test coverage',
      'Built features for consumer application serving 4000+ daily visitors',
      'Documented complex systems, accelerating engineering onboarding',
      'Delivered business-critical partner integrations',
    ],
    company: 'Caribou Financial',
    title: 'Senior Software Engineer / Team Lead',
  },
  {
    order: 4,
    startDate: new Date('2016-01-01'),
    endDate: new Date('2021-06-01'),
    accomplishments: [
      'Built public-facing APIs serving web and mobile clients using NodeJS',
      'Developed card payment system enabling mobile payments for truckers',
      'Built microservices handling wallet storage, receipts, and user data management',
      'Created internal tools for business teams using .NET / C# / Angular 2',
    ],
    company: 'Independent Contributions',
    title: 'Software Engineer',
  },
]

type Resume = {
  name: string
  jobTitle: string
  summary: string
  education: Education
  skillCategories: Record<string, string[]>
  experiences: WorkExperience[]
}
const resume: Resume = {
  name: 'Brandon Gandy',
  jobTitle: 'Software Engineering Leader',
  summary:
    'Engineering leader with 9+ years designing distributed systems and leading high-performance teams. Specialized in AI-native workflows, microservice architecture, and full-stack systems at scale. Proven success driving SOC2 compliance, building agentic AI tools, and reducing error rates through strong architecture and DevOps discipline.',
  education: {
    fieldOfStudy: 'Cyber Security',
    degreeType: 'bachelors',
    honors: 'Suma Cum Laude',
    university: 'Oklahoma State University',
  },
  experiences,
  skillCategories,
}

const Education = ({ education }: { education: Education }) => (
  <div>
    <p className="text-xl mt-0">{education.university}</p>
    <p className="my-0 text-md italic">
      {generateDegreeAndFieldOfStudy(education)}
    </p>
    <p className="my-0 text-md italic">{education.honors}</p>
  </div>
)
const formatDate = (date: Date): string =>
  `${date.getUTCMonth() + 1 < 10 ? '0' : ''}${date.getUTCMonth() + 1}/${date.getUTCFullYear()}`

const ResumePage = () => {
  const resumeBodyRef = useRef<HTMLDivElement>(null)
  const reactPrintFn = useReactToPrint({ contentRef: resumeBodyRef })
  return (
    <div className="overflow-scroll w-full h-screen">
      <title>{generateFormattedTitle('Resume')}</title>
      <div className="flex flex-col">
        <div
          ref={resumeBodyRef}
          id="resume-body"
          className="bg-white grid grid-cols-9 w-[1120px] self-start xl:self-center text-gray-800 h-[1448px] font-mono"
        >
          <button
            className="fixed print:hidden bg-primary p-2 text-white rounded-md bottom-5 left-5 xl:bottom-20 xl:left-20"
            onClick={() => reactPrintFn()}
          >
            Print
          </button>
          <div className="col-span-3 grid grid-rows-10">
            <div className="row-span-1 bg-sky-500 p-1 flex text-white text-center flex-col">
              <h3>{resume.name}</h3>
              <p>{resume.jobTitle}</p>
            </div>
            <div className="bg-gray-700 text-white px-4 row-span-9">
              <section>
                <h3>Education</h3>
                <hr className="my-2" />
                <Education education={resume.education} />
              </section>
              <section>
                <h3>Skills</h3>
                <hr className="my-2" />
                {Object.entries(resume.skillCategories).map(
                  ([category, skills]) => (
                    <div key={category} className="mb-3">
                      <p className="my-0 text-sm font-bold text-sky-300">
                        {category}
                      </p>
                      {skills.map((skill) => (
                        <p className="my-0 text-sm" key={skill}>
                          {skill}
                        </p>
                      ))}
                    </div>
                  )
                )}
              </section>
            </div>
          </div>
          <div className="col-span-6 px-4 flex flex-col">
            <section>
              <h3 className="mb-0 text-sky-500">Summary</h3>
              <hr className="my-0 border-sky-500" />
              <p className="text-sm">{resume.summary}</p>
            </section>
            <section className="flex flex-1 flex-col">
              <h3 className="mb-0 text-sky-500">Work Experience</h3>
              <hr className="my-0 border-sky-500" />
              {experiences
                .sort((a, b) => a.order - b.order)
                .map((exp) => (
                  <div key={`${exp.title}${exp.company}`}>
                    <div className="flex justify-between mb-0">
                      <p className="text-sky-500 text-sm mb-0">{exp.title}</p>
                      <p className="text-sky-500 text-sm mb-0">
                        {formatDate(exp.startDate)} -{' '}
                        {exp.endDate ? formatDate(exp.endDate) : 'Present'}
                      </p>
                    </div>
                    <div>
                      <p className="my-0 text-sm font-bold">{exp.company}</p>
                      <ul className="marker:text-sky-500">
                        {exp.accomplishments.map((accomplishment) => (
                          <li className="my-0 text-sm" key={accomplishment}>
                            {accomplishment}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              <div className="flex flex-1 flex-col justify-end">
                <div className="flex items-center">
                  <Image
                    src="/gh-logo.png"
                    alt="linkedin logo"
                    width={30}
                    height={30}
                  />
                  <Link
                    target="_blank"
                    className="ml-2"
                    href="https://github.com/bgandy94"
                  >
                    https://github.com/bgandy94
                  </Link>
                </div>
                <div className="flex items-center">
                  <Image
                    src="/linkedin-logo.png"
                    alt="linkedin logo"
                    width={30}
                    height={30}
                  />
                  <Link
                    target="_blank"
                    className="ml-2"
                    href="https://www.linkedin.com/in/brandongandy1"
                  >
                    https://www.linkedin.com/in/brandongandy1
                  </Link>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResumePage
