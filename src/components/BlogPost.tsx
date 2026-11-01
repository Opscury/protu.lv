import { BLOG_PATH, blogCtas, blogPage, formatDate, type Post } from '../data/blog'
import { onLinkClick } from '../router'
import Markdown from './Markdown'
import '../services.css'
import '../blog.css'

type Umami = { track: (event: string, data?: Record<string, string>) => void }

/** Klikšķis uz piedāvājumu: Umami notikums, bet lapa mainās bez pārlādes (sk. ServicePage). */
function track(slug: string) {
  ;(window as Window & { umami?: Umami }).umami?.track('blog-cta', { post: slug })
}

/** /blog/<slug>/: virsraksts, datums, teksts un noslēguma bloks no `cta`. */
function BlogPost({ post }: { post: Post }) {
  const cta = blogCtas[post.cta]

  return (
    <article className="post">
      <a className="case-back" href={BLOG_PATH} onClick={onLinkClick}>
        {blogPage.all}
      </a>
      <header className="post-head">
        <h1 className="post-title">{post.title}</h1>
        <p className="blog-date">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
        </p>
        {post.draft && <p className="blog-draft">{blogPage.draft}</p>}
      </header>

      <div className="post-body">
        <Markdown source={post.body} />
      </div>

      <aside className="post-cta" aria-labelledby="post-cta-title">
        <h2 id="post-cta-title">{cta.title}</h2>
        <p>{cta.text}</p>
        <p>
          {/* Veidotājs ir mans.protu.lv: parasta pāreja, ne SPA navigācija. */}
          <a className="action action-primary" href={cta.href} onClick={() => track(post.slug)}>
            {cta.linkLabel}
          </a>
        </p>
        {cta.secondary && (
          <p className="post-cta-secondary">
            <a href={cta.secondary.href} onClick={onLinkClick}>
              {cta.secondary.label}
            </a>
          </p>
        )}
      </aside>
    </article>
  )
}

export default BlogPost
