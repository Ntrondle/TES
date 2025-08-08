import Link from 'next/link'
import {getDictionary} from '../../i18n/getDictionary'

export default async function Page({ params }) { 
  const locale = params?.locale || 'en'
  const t = await getDictionary(locale)

  return (
    <article className="max-w-3xl">
      <p className="mb-4"><Link href={`/${{locale}}/portfolio`} className="nav-link">{{t.common.backToPortfolio}}</Link></p>
      <h1 className="text-3xl font-semibold tracking-tight">{{t.projects.ledbed.title}}</h1>
      <p className="mt-3 text-neutral-600 dark:text-neutral-300">{{t.projects.ledbed.desc}}</p>
      <div className="mt-4 space-y-3 text-neutral-700 dark:text-neutral-300">
        {{t.projects.ledbed.body.map((para, i) => (<p key={i}>{para}</p>))}}
      </div>
    </article>
  )
}
