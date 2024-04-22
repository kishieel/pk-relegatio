import { getClient } from '@app/apollo/apollo-client';
import { POSTS_QUERY } from '@app/apollo/queries/posts';
import { format } from 'date-fns';
import { excerpt } from '@app/utils/excerpt.function';

export default async function Page() {
  const client = getClient();

  const { data, error, errors } = await client.query({
    query: POSTS_QUERY,
  });

  return (
    <main className="mb-auto">
      <div>
        <div className="pb-6 pt-6">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:hidden sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            All Posts
          </h1>
        </div>
        <div className="flex sm:space-x-24">
          <div className="hidden h-full max-h-screen min-w-[280px] max-w-[280px] flex-wrap overflow-auto rounded bg-gray-50 pt-5 shadow-md dark:bg-gray-900/70 dark:shadow-gray-800/40 sm:flex">
            <div className="px-6 py-4">
              <h3 className="font-bold uppercase text-primary-500">All Posts</h3>
              <ul>
                <li className="my-3">
                  <a
                    className="px-3 py-2 text-sm font-medium uppercase text-gray-500 hover:text-primary-500 dark:text-gray-300 dark:hover:text-primary-500"
                    aria-label="View posts tagged next-js"
                    href="/tags/next-js"
                  >
                    next-js (6)
                  </a>
                </li>
                <li className="my-3">
                  <a
                    className="px-3 py-2 text-sm font-medium uppercase text-gray-500 hover:text-primary-500 dark:text-gray-300 dark:hover:text-primary-500"
                    aria-label="View posts tagged guide"
                    href="/tags/guide"
                  >
                    guide (5)
                  </a>
                </li>
                <li className="my-3">
                  <a
                    className="px-3 py-2 text-sm font-medium uppercase text-gray-500 hover:text-primary-500 dark:text-gray-300 dark:hover:text-primary-500"
                    aria-label="View posts tagged tailwind"
                    href="/tags/tailwind"
                  >
                    tailwind (3)
                  </a>
                </li>
                <li className="my-3">
                  <a
                    className="px-3 py-2 text-sm font-medium uppercase text-gray-500 hover:text-primary-500 dark:text-gray-300 dark:hover:text-primary-500"
                    aria-label="View posts tagged feature"
                    href="/tags/feature"
                  >
                    feature (2)
                  </a>
                </li>
                <li className="my-3">
                  <a
                    className="px-3 py-2 text-sm font-medium uppercase text-gray-500 hover:text-primary-500 dark:text-gray-300 dark:hover:text-primary-500"
                    aria-label="View posts tagged markdown"
                    href="/tags/markdown"
                  >
                    markdown (1)
                  </a>
                </li>
                <li className="my-3">
                  <a
                    className="px-3 py-2 text-sm font-medium uppercase text-gray-500 hover:text-primary-500 dark:text-gray-300 dark:hover:text-primary-500"
                    aria-label="View posts tagged code"
                    href="/tags/code"
                  >
                    code (1)
                  </a>
                </li>
                <li className="my-3">
                  <a
                    className="px-3 py-2 text-sm font-medium uppercase text-gray-500 hover:text-primary-500 dark:text-gray-300 dark:hover:text-primary-500"
                    aria-label="View posts tagged features"
                    href="/tags/features"
                  >
                    features (1)
                  </a>
                </li>
                <li className="my-3">
                  <a
                    className="px-3 py-2 text-sm font-medium uppercase text-gray-500 hover:text-primary-500 dark:text-gray-300 dark:hover:text-primary-500"
                    aria-label="View posts tagged math"
                    href="/tags/math"
                  >
                    math (1)
                  </a>
                </li>
                <li className="my-3">
                  <a
                    className="px-3 py-2 text-sm font-medium uppercase text-gray-500 hover:text-primary-500 dark:text-gray-300 dark:hover:text-primary-500"
                    aria-label="View posts tagged ols"
                    href="/tags/ols"
                  >
                    ols (1)
                  </a>
                </li>
                <li className="my-3">
                  <a
                    className="px-3 py-2 text-sm font-medium uppercase text-gray-500 hover:text-primary-500 dark:text-gray-300 dark:hover:text-primary-500"
                    aria-label="View posts tagged github"
                    href="/tags/github"
                  >
                    github (1)
                  </a>
                </li>
                <li className="my-3">
                  <a
                    className="px-3 py-2 text-sm font-medium uppercase text-gray-500 hover:text-primary-500 dark:text-gray-300 dark:hover:text-primary-500"
                    aria-label="View posts tagged holiday"
                    href="/tags/holiday"
                  >
                    holiday (1)
                  </a>
                </li>
                <li className="my-3">
                  <a
                    className="px-3 py-2 text-sm font-medium uppercase text-gray-500 hover:text-primary-500 dark:text-gray-300 dark:hover:text-primary-500"
                    aria-label="View posts tagged canada"
                    href="/tags/canada"
                  >
                    canada (1)
                  </a>
                </li>
                <li className="my-3">
                  <a
                    className="px-3 py-2 text-sm font-medium uppercase text-gray-500 hover:text-primary-500 dark:text-gray-300 dark:hover:text-primary-500"
                    aria-label="View posts tagged images"
                    href="/tags/images"
                  >
                    images (1)
                  </a>
                </li>
                <li className="my-3">
                  <a
                    className="px-3 py-2 text-sm font-medium uppercase text-gray-500 hover:text-primary-500 dark:text-gray-300 dark:hover:text-primary-500"
                    aria-label="View posts tagged writings"
                    href="/tags/writings"
                  >
                    writings (1)
                  </a>
                </li>
                <li className="my-3">
                  <a
                    className="px-3 py-2 text-sm font-medium uppercase text-gray-500 hover:text-primary-500 dark:text-gray-300 dark:hover:text-primary-500"
                    aria-label="View posts tagged book"
                    href="/tags/book"
                  >
                    book (1)
                  </a>
                </li>
                <li className="my-3">
                  <a
                    className="px-3 py-2 text-sm font-medium uppercase text-gray-500 hover:text-primary-500 dark:text-gray-300 dark:hover:text-primary-500"
                    aria-label="View posts tagged reflection"
                    href="/tags/reflection"
                  >
                    reflection (1)
                  </a>
                </li>
                <li className="my-3">
                  <a
                    className="px-3 py-2 text-sm font-medium uppercase text-gray-500 hover:text-primary-500 dark:text-gray-300 dark:hover:text-primary-500"
                    aria-label="View posts tagged multi-author"
                    href="/tags/multi-author"
                  >
                    multi-author (1)
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div>
            <ul>
              {data?.posts.edges.map(({ node: post }, index) => (
                <li key={index} className="py-5">
                  <article className="flex flex-col space-y-2 xl:space-y-0">
                    <dl>
                      <dt className="sr-only">Published on</dt>
                      <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                        <time dateTime={post.createdAt}>{format(post.createdAt, 'MMMM d, yyyy')}</time>
                      </dd>
                    </dl>
                    <div className="space-y-3">
                      <div>
                        <h2 className="text-2xl font-bold leading-8 tracking-tight">
                          <a className="text-gray-900 dark:text-gray-100" href={`/blog/${post.slug}`}>
                            {post.title}
                          </a>
                        </h2>
                        <div className="flex flex-wrap">
                          <a
                            className="mr-3 text-sm font-medium uppercase text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                            href="/tags/next-js"
                          >
                            next-js
                          </a>
                          <a
                            className="mr-3 text-sm font-medium uppercase text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                            href="/tags/tailwind"
                          >
                            tailwind
                          </a>
                          <a
                            className="mr-3 text-sm font-medium uppercase text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                            href="/tags/guide"
                          >
                            guide
                          </a>
                          <a
                            className="mr-3 text-sm font-medium uppercase text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                            href="/tags/feature"
                          >
                            feature
                          </a>
                        </div>
                      </div>
                      <div className="prose max-w-none text-gray-500 dark:text-gray-400">
                        {excerpt(post.content, 30)}
                      </div>
                    </div>
                  </article>
                </li>
              ))}
            </ul>
            <div className="space-y-2 pb-8 pt-6 md:space-y-5">
              <nav className="flex justify-between">
                <button className="cursor-auto disabled:opacity-50" disabled>
                  Previous
                </button>
                <span>1 of 2</span>
                <a rel="next" href="/blog/page/2">
                  Next
                </a>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
