'use client'

import { useRef } from 'react'
import { useReactToPrint } from 'react-to-print'
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
      'Built agentic AI workflow tool using NodeJS/Playwright that automates complex healthcare tasks saving clients 85% of their time',
      'Established CI/CD pipelines across organization, streamlining development processes',
      'Introduced testing standards, increasing test coverage by 70%',
      'Built SFTP server infrastructure, managing secure file transfers for clients',
      'Designed scalable VPN solution, securing network access for clients',
      'Led SOC2 compliance process from vendor selection through completion, unlocking large customers who were requiring SOC2 compliance',
      'Streamlined client onboarding pipeline by building product wizards for new releases, increasing platform adoption by 50%.',
      'Built AI monitoring dashboards, helping clients identify workflow optimization opportunities',
      'Re-architected queueing system to a database-backed scheduling system, maintaining parity performance-wise while reducing error rates by 20%',
    ],
    company: 'KaynAI',
    title: 'Founding Engineer',
  },
  {
    order: 1,
    startDate: new Date('2023-03-01'),
    endDate: new Date('2024-03-01'),
    accomplishments: [
      'Refactored flagship product by migrating chrome extension from plain javascript to React, reducing daily error rates by 10%',
      'Established new SDLC processes (Agile, Scrum), improving team velocity across 8 engineers',
      'Led quality initiatives ensuring products were tested (coverage increase of 50%), scalable (3x increase in users), and well-documented (critical systems documented 100%)',
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
      'Led recruitment and development of engineering team from 3 to 8 engineers, enabling the launch of a new website for the rebrand',
      'Finished a rebrand with features that allowed marketing to edit content without engineering intervention, saving countless support tickets and engineering hours',
      'Negotiated with leadership to define a more realistic and achievable roadmap for the engineering team, enabling the team to deliver features on time and on budget',
    ],
    company: 'Caribou Financial',
    title: 'Engineering Manager',
  },
  {
    order: 3,
    startDate: new Date('2021-07-01'),
    endDate: new Date('2022-01-01'),
    accomplishments: [
      'Designed architecture improvements including frontend generic components for handling forms, reducing engineering time for new features requiring forms and standardizing usage.',
      'Implemented event-driven patterns using GCP PubSub, increasing durability and scalability of the application.',
      'Built highly-scalable consumer loan application with GCP PubSub and Kubernetes serving 4000+ daily visitors',
      'Led documentation effort for 3 critical services, creating 12+ artifacts including API specs, common troubleshooting how-tos, and design diagrams.',
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
      'Built public-facing APIs serving web and mobile clients using NodeJS, with a daily user count of 1000+ with pieces of the application needing to be hosted on-premise due to regulatory requirements',
      'Developed card payment system enabling mobile payments for truckers',
      'Built microservices handling wallet storage, receipts, and user data management with an anticipated daily transaction volume of 5000+',
    ],
    company: 'Independent Contributions',
    title: 'Software Engineer',
  },
]

type ContactInfo = {
  email: string
  phone: string
}

type Resume = {
  name: string
  jobTitle: string
  contactInfo: ContactInfo
  summary: string
  education: Education
  skillCategories: Record<string, string[]>
  experiences: WorkExperience[]
}

const resume: Resume = {
  name: 'Brandon Gandy',
  jobTitle: 'Software Engineering Leader',
  contactInfo: {
    email: 'brandongandy2012@gmail.com',
    phone: '+1 405-639-1520',
  },
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

const EducationSection = ({ education }: { education: Education }) => (
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

export default function ResumeClient() {
  const resumeBodyRef = useRef<HTMLDivElement>(null)
  const reactPrintFn = useReactToPrint({ contentRef: resumeBodyRef })

  return (
    <div className="overflow-scroll w-full h-screen">
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
          <div className="col-span-3 grid grid-rows-9">
            <div className="row-span-1 bg-sky-500 p-1 flex text-white text-center flex-col">
              <h3>{resume.name}</h3>
              <p>{resume.jobTitle}</p>
              <p className="text-sm my-0">{resume.contactInfo.email}</p>
              <p className="text-sm my-0">{resume.contactInfo.phone}</p>
            </div>
            <div className="bg-gray-700 text-white px-4 row-span-9">
              <section>
                <h3>Education</h3>
                <hr className="my-2" />
                <EducationSection education={resume.education} />
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

