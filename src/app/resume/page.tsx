'use client'

import { useRef } from 'react'
import { useReactToPrint } from 'react-to-print'

const skills = [
  'Typescript / Javascript',
  'React / React Native',
  'NodeJS',
  'PostgresSQL / MySQL / MS SQL / MariaDB',
  'C#/.NET',
  'HTML/CSS',
  'Ruby / Ruby on Rails',
  'Python',
  'Elm',
  'AWS/GCP/Heroku/Cloudflare',
  'Kafka',
  'AWS SQS / SNS',
  'AWS ECS / EKS',
  'AWS Lambdas',
  'RabbitMQ',
  'Redis',
  'Microservice Architecture',
  'Docker / Kubernetes',
  'Rest / GraphQL',
  'NextJS / Vercel',
  'AI - LLMS / Claude / GPT',
  'Redux / Redux Toolkit',
  'Flask',
  'Systems Design',
  'Auth0',
  'OAuth2',
  'Functional Programming / OOP',
  'Leadership / Mentoring',
  'Jira',
  'Confluence',
  'Agile',
  'Tailwind CSS',
  'Vite',
  'Chrome Extensions',
  'Test-driven development',
  'Playwright',
  'Jenkins / Github Actions',
  'ArgoCD',
  'Contentful',
  'LaunchDarkly',
  'Websockets',
  'IAC - CDK / Pulumi /Terraform',
  'Document Databases / NoSQL / DynamoDB',
  'React Testing Library',
  'Splunk / Cloudwatch',
]

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
    order: 1,
    startDate: new Date('2023-03-01'),
    endDate: new Date('2024-03-01'),
    accomplishments: [
      'Refactored flagship product reducing error rates by 10+% per day',
      'Led the team to new SDLC processes to help manage our team of 8 engineers',
      'Led many quality initiatives to help ensure our products were tested, scalable, easy to troubleshoot, and well-documented.',
      'Helped created pattern to split main monolith into microservices',
    ],
    company: 'Janus Health',
    title: 'Principal Software Engineer / Engineering Manager',
  },
  {
    order: 2,
    startDate: new Date('2022-01-01'),
    endDate: new Date('2023-01-01'),
    accomplishments: [
      'Oversaw the recruitment, onboarding, and development of software engineers, ensuring a skilled and motivated workforce.',
      'Successfully delivered a high-priority project saving the company countless tickets and engineering hours.',
      'Communicated project updates, milestones, and challenges transparently to leadership.',
    ],
    company: 'Caribou Financial',
    title: 'Engineering Manager',
  },
  {
    order: 3,
    startDate: new Date('2021-07-01'),
    endDate: new Date('2022-01-01'),
    accomplishments: [
      'Designed/implemented various changes to existing architecture, including new form strategy, increased test coverage, as well as event-driven architecture.',
      'Helped maintain and build new features on an existing consumer application that was visited 4000+ times a day.',
      'Documented esoteric systems which made engineering onboarding much easier.',
      'Delivered multiple business critical integrations with partners',
    ],
    company: 'Caribou Financial',
    title: 'Senior Software Engineer / Team Lead',
  },
  {
    order: 4,
    startDate: new Date('2020-11-01'),
    endDate: new Date('2021-06-01'),
    accomplishments: [
      'Designed and implemented the company’s first customer portal with React, drastically reducing customer support calls.',
      'Built internal components to be used by other front-end engineers.',
      'Ensured test coverage using React Testing Library',
      'Modified/created endpoints as needed to be used by the frontend.',
    ],
    company: 'TVC Pro-Driver',
    title: 'Senior Software Engineer / Team Lead',
  },
  {
    order: 5,
    startDate: new Date('2016-01-01'),
    endDate: new Date('2020-11-01'),
    accomplishments: [
      'Built public-facing APIs for a web and mobile client using NodeJS.',
      'Built card payments system to facilitate truckers being able to pay via a mobile app.',
      'Built many microservices to handle things such as wallet storage, receipt generation, user information storage, and many more.',
      'Created many internal tools for various business teams using .NET / C# / Angular 2',
      'Converted many repositories from JavaScript to TypeScript',
    ],
    company: 'Other Experiences',
    title: 'Software Engineer',
  },
]

type Resume = {
  name: string
  jobTitle: string
  summary: string
  education: Education
  skills: string[]
  experiences: WorkExperience[]
}
const resume: Resume = {
  name: 'Brandon Gandy',
  jobTitle: 'Software Engineering Leader',
  summary:
    'Results-driven engineer dedicated to inspiring and guiding teams and individuals toward peak performance. Deeply passionate about exploring the intricacies of technology, with a strong commitment to continuous learning. Excel at mentoring colleagues and steering teams, whether in a technical, managerial, or combined capacity. Proven team player with approximately 7-8 years of hands-on experience in the Agile software life-cycle. Outside of work, I indulge my interests in video games, hold an official real estate license in my state, and occasionally unwind by playing music.',
  education: {
    fieldOfStudy: 'Cyber Security',
    degreeType: 'bachelors',
    honors: 'Suma Cum Laude',
    university: 'Oklahoma State University',
  },
  experiences,
  skills,
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
                {skills.map((skill) => (
                  <p className="my-0 text-sm" key={skill}>
                    {skill}
                  </p>
                ))}
              </section>
            </div>
          </div>
          <div className="col-span-6 px-4">
            <section>
              <h3 className="mb-0 text-sky-500">Summary</h3>
              <hr className="my-0 border-sky-500" />
              <p className="text-sm">{resume.summary}</p>
            </section>
            <section>
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
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResumePage
