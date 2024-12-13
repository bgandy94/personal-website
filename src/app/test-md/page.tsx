'use client'
import Markdown from 'react-markdown'
const PhonePage = () => {
  return (
    <Markdown
      components={{
        ul: ({ children }) => <ul className="list-disc ml-4">{children}</ul>,
        h1: ({ children }) => <h1 className="text-3xl mb-4">{children}</h1>,
        h2: ({ children }) => (
          <h2 className="text-lg mb-4 italic text-gray-300">{children}</h2>
        ),
        hr: () => <hr className="text-white w-full my-4" />,
        code: ({ children }) => (
          <code className="bg-slate-600 p-1">{children}</code>
        ),
      }}
    >{`
# Hello!

you're my boyee! \`whatup\` boyee!
-----
**bold** is cool

cool
`}</Markdown>
  )
}

export default PhonePage
