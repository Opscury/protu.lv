import { blogPage, formatDate, listedPosts, postHref } from '../data/blog'
import { onLinkClick } from '../router'
import '../services.css'
import '../blog.css'

/** /blog/: raksti, jaunākais pirmais. Melnraksti te nav (izņemot izstrādes režīmā). */
function BlogIndex() {
  return (
    <article className="svc">
      <header className="svc-head">
        <h1 className="svc-title">{blogPage.title}</h1>
        <p className="svc-lead">{blogPage.lead}</p>
      </header>

      {listedPosts.length ? (
        <ol className="blog-list">
          {listedPosts.map((post) => (
            <li key={post.slug} className="blog-item">
              <time className="blog-date" dateTime={post.date}>{formatDate(post.date)}</time>
              <h2>
                <a href={postHref(post.slug)} onClick={onLinkClick}>
                  {post.title}
                </a>
              </h2>
              <p>{post.description}</p>
              {post.draft && <p className="blog-draft">{blogPage.draft}</p>}
            </li>
          ))}
        </ol>
      ) : (
        <p className="blog-empty">{blogPage.empty}</p>
      )}
    </article>
  )
}

export default BlogIndex
