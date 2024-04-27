import { format } from 'date-fns';
import { excerpt } from '@app/utils/excerpt.function';
import { getClient } from '@app/apollo/apollo-client';
import { POSTS_QUERY } from '@app/apollo/queries/posts';

export default async function Page() {
  const client = getClient();

  const { data, error, errors } = await client.query({
    query: POSTS_QUERY,
  });

  return (
    <main className="mb-auto">
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            Latest
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">Unpopular opinions on popular topics</p>
        </div>
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {data?.posts.data.map((post, index) => (
            <li key={index} className="py-12">
              <article>
                <div className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
                  <dl>
                    <dt className="sr-only">Published on</dt>
                    <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                      <time dateTime={post.createdAt}>{format(post.createdAt, 'MMMM d, yyyy')}</time>
                    </dd>
                  </dl>
                  <div className="space-y-5 xl:col-span-3">
                    <div className="space-y-6">
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
                    <div className="text-base font-medium leading-6">
                      <a
                        className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                        aria-label='Read more: "Release of Tailwind Nextjs Starter Blog v2.0"'
                        href={`/blog/${post.slug}`}
                      >
                        Read more →
                      </a>
                    </div>
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex justify-end text-base font-medium leading-6">
        <a
          className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
          aria-label="All posts"
          href="/blog"
        >
          All Posts →
        </a>
      </div>
    </main>
  );
}
