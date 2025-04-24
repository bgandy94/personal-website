import { randomUUID } from 'crypto'
import Script from 'next/script'
import { codeToHtml } from 'shiki'
import { BundledLanguage } from 'shiki/langs'

type Props = {
  children: string
  lang: BundledLanguage
}

export const CodeBlock = async ({ children, lang }: Props) => {
  const id = `code-${randomUUID()}`
  const out = await codeToHtml(children, {
    lang,
    theme: 'github-dark',
    transformers: [
      {
        code(node) {
          node.properties = node.properties || {}
          node.properties.id = id
          this.addClassToHast(node, 'code-block')
        },
        pre(node) {
          this.addClassToHast(node, 'code-block-wrapper')
        },
      },
    ],
  })

  return (
    <div className="relative text-left group max-h-[30rem] overflow-auto">
      <button
        className="absolute top-2 right-2 z-10 bg-gray-800 text-white text-xs px-2 py-1 rounded hover:bg-gray-700 transition"
        data-copy-target={id}
      >
        Copy
      </button>
      <div dangerouslySetInnerHTML={{ __html: out }} />
      <Script id="copy-code" strategy="lazyOnload">
        {`
            document.addEventListener('click', (e) => {
              console.log('click', e.target)
              const btn = e.target.closest('[data-copy-target]')
              if (!btn) return
              const targetId = btn.getAttribute('data-copy-target')
              const el = document.getElementById(targetId)
              if (el) {
                navigator.clipboard.writeText(el.innerText).then(() => {
                  btn.innerText = 'Copied!'
                  setTimeout(() => {
                    btn.innerText = 'Copy'
                  }, 1500)
                })
              }
            })
        `}
      </Script>
    </div>
  )
}
