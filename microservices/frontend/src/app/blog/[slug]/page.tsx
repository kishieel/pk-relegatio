import { getClient } from '@app/apollo/apollo-client';
import { POST_BY_SLUG_QUERY } from '@app/apollo/queries/post-by-slug';
import { notFound } from 'next/navigation';
import { timePassed } from '@app/utils/time-passed.function';
import Markdown from 'react-markdown';

export interface PageProps {
  params: {
    slug: string;
  };
}

export default async function Page(props: PageProps) {
  const client = getClient();

  const { data, error, errors } = await client.query({
    query: POST_BY_SLUG_QUERY,
    variables: {
      slug: props.params.slug,
    },
  });

  if (!data?.postBySlug) {
    return notFound();
  }

  return (
    <section className="mx-auto max-w-3xl px-4 sm:px-6 xl:max-w-5xl xl:px-0">
      <div className="fixed bottom-8 right-8 hidden flex-col gap-3 md:hidden">
        <button
          aria-label="Scroll To Top"
          className="rounded-full bg-gray-200 p-2 text-gray-500 transition-all hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-600"
        >
          <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
      </div>
      <article>
        <div className="xl:divide-y xl:divide-gray-200 xl:dark:divide-gray-700">
          <header className="pt-6 xl:pb-6">
            <div className="space-y-1 text-center">
              <dl className="space-y-10">
                <div>
                  <dt className="sr-only">Published on</dt>
                  <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                    <time dateTime="2023-08-05T00:00:00.000Z">Saturday, August 5, 2023</time>
                  </dd>
                </div>
              </dl>
              <div>
                <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14">
                  {data.postBySlug.title}
                </h1>
              </div>
            </div>
          </header>
          <div className="grid-rows-[auto_1fr] divide-y divide-gray-200 pb-8 dark:divide-gray-700 xl:grid xl:grid-cols-4 xl:gap-x-6 xl:divide-y-0">
            <dl className="pb-10 pt-6 xl:border-b xl:border-gray-200 xl:pt-11 xl:dark:border-gray-700">
              <dt className="sr-only">Authors</dt>
              <dd>
                <ul className="flex flex-wrap justify-center gap-4 sm:space-x-12 xl:block xl:space-x-0 xl:space-y-8">
                  <li className="flex items-center space-x-2">
                    <img
                      alt="avatar"
                      loading="lazy"
                      width="38"
                      height="38"
                      decoding="async"
                      data-nimg="1"
                      className="h-10 w-10 rounded-full"
                      src="https://gravatar.com/avatar/348972347298942312123123?d=identicon"
                      style={{ color: 'transparent' }}
                    />
                    <dl className="whitespace-nowrap text-sm font-medium leading-5">
                      <dt className="sr-only">Name</dt>
                      <dd className="text-gray-900 dark:text-gray-100">
                        {data.postBySlug.author.firstName} {data.postBySlug.author.lastName}
                      </dd>
                      <dt className="sr-only">Joined</dt>
                      <dd className="text-gray-600 dark:text-gray-400">
                        Posted {timePassed(data.postBySlug.createdAt)} ago
                      </dd>
                    </dl>
                  </li>
                </ul>
              </dd>
            </dl>
            <div className="divide-y divide-gray-200 dark:divide-gray-700 xl:col-span-3 xl:row-span-2 xl:pb-0">
              <div className="prose max-w-none pb-8 pt-10 dark:prose-invert">
                <Markdown className={'markdown'}>{data.postBySlug.content}</Markdown>
              </div>
              <div className="pb-6 pt-6 text-center text-gray-700 dark:text-gray-300" id="comment"></div>
            </div>
            <footer>
              <div className="divide-gray-200 text-sm font-medium leading-5 dark:divide-gray-700 xl:col-start-1 xl:row-start-2 xl:divide-y">
                <div className="py-4 xl:py-8">
                  <h2 className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">Tags</h2>
                  <div className="flex flex-wrap">
                    <a
                      className="mr-3 text-sm font-medium uppercase text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                      href="/tags/next-js"
                    >
                      next-js
                    </a>
                  </div>
                </div>
                <div className="flex justify-between py-4 xl:block xl:space-y-8 xl:py-8">
                  <div>
                    <h2 className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                      Previous Article
                    </h2>
                    <div className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
                      <a href="/blog/new-features-in-v1">New features in v1</a>
                    </div>
                  </div>
                  <div>
                    <h2 className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">Next Article</h2>
                    <div className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
                      <a href="/blog/new-features-in-v1">New features in v1</a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="pt-4 xl:pt-8">
                <a
                  className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                  aria-label="Back to the blog"
                  href="/blog"
                >
                  ← Back to the blog
                </a>
              </div>
            </footer>
          </div>
        </div>
      </article>
    </section>
  );
}
