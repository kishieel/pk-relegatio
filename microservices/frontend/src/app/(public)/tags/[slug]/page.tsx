import { AllTags } from '@app/components/tags/AllTags';

export default async function Page() {
  return (
    <main className="mb-auto">
      <div>
        <div className="pb-6 pt-6">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:hidden sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            Code
          </h1>
        </div>
        <div className="flex sm:space-x-24">
          <div className="hidden h-full max-h-screen min-w-[280px] max-w-[280px] flex-wrap overflow-auto rounded bg-gray-50 pt-5 shadow-md dark:bg-gray-900/70 dark:shadow-gray-800/40 sm:flex">
            <AllTags />
          </div>
          <div>
            <ul>
              <li className="py-5">
                <article className="flex flex-col space-y-2 xl:space-y-0">
                  <dl>
                    <dt className="sr-only">Published on</dt>
                    <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                      <time dateTime="2016-03-08T00:00:00.000Z">March 8, 2016</time>
                    </dd>
                  </dl>
                  <div className="space-y-3">
                    <div>
                      <h2 className="text-2xl font-bold leading-8 tracking-tight">
                        <a className="text-gray-900 dark:text-gray-100" href="/blog/code-sample">
                          Sample .md file
                        </a>
                      </h2>
                      <div className="flex flex-wrap">
                        <a
                          className="mr-3 text-sm font-medium uppercase text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                          href="/tags/markdown"
                        >
                          markdown
                        </a>
                        <a
                          className="mr-3 text-sm font-medium uppercase text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                          href="/tags/code"
                        >
                          code
                        </a>
                        <a
                          className="mr-3 text-sm font-medium uppercase text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                          href="/tags/features"
                        >
                          features
                        </a>
                      </div>
                    </div>
                    <div className="prose max-w-none text-gray-500 dark:text-gray-400">
                      Example of a markdown file with code blocks and syntax highlighting
                    </div>
                  </div>
                </article>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}
