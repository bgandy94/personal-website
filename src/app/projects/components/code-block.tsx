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
    <div className="relative text-left overflow-auto rounded border border-gray-700 bg-[#24292e] my-4">
      <div className="flex items-center justify-between px-3 py-2 text-xs bg-[#1f2937] text-white sticky top-0 z-10">
        <span className="uppercase tracking-wide">{lang}</span>
        <button
          className="bg-gray-700 hover:bg-gray-600 px-2 py-1 rounded transition"
          data-copy-target={id}
        >
          Copy
        </button>
      </div>

      <div className="overflow-auto">
        <div dangerouslySetInnerHTML={{ __html: out }} />
      </div>

      <Script id="copy-code" strategy="lazyOnload">
        {`
          document.addEventListener('click', (e) => {
            const btn = e.target.closest('[data-copy-target]');
            if (!btn) return;
            const targetId = btn.getAttribute('data-copy-target');
            const el = document.getElementById(targetId);
            if (el) {
              navigator.clipboard.writeText(el.innerText).then(() => {
                btn.innerText = 'Copied!';
                setTimeout(() => {
                  btn.innerText = 'Copy';
                }, 1500);
              });
            }
          });
        `}
      </Script>
    </div>
  )
}
