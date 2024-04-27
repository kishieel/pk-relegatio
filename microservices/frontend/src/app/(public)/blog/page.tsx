import { getClient } from '@app/apollo/apollo-client';
import { POSTS_QUERY } from '@app/apollo/queries/posts';
import { Article } from '@app/components/articles/Article';
import { ARTICLES_PER_PAGE } from '@app/consts/environment';
import { Paging } from '@app/components/paging/Paging';
import { AllTags } from '@app/components/tags/AllTags';

export default async function Page() {
  const client = getClient();

  const { data, error, errors } = await client.query({
    query: POSTS_QUERY,
    variables: {
      input: {
        paging: {
          offset: 0,
          limit: ARTICLES_PER_PAGE,
        },
      },
    },
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
            <AllTags />
          </div>
          <div>
            <ul>
              {data?.posts.data.map((post, index) => (
                <li key={index} className="py-5">
                  <Article post={post} />
                </li>
              ))}
            </ul>
            <div className="space-y-2 pb-8 pt-6 md:space-y-5">
              <Paging hasPrev={data?.posts.pageInfo.hasPrevPage} hasNext={data?.posts.pageInfo.hasNextPage} page={1} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
