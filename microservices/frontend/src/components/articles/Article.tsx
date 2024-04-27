import { format } from 'date-fns';
import { excerpt } from '@app/utils/excerpt.function';
import { Tag } from '@app/components/articles/Tag';

interface ArticleProps {
  post: {
    title: string;
    slug: string;
    content: string;
    createdAt: string;
    updatedAt: string;
  };
}

export const Article = ({ post }: ArticleProps) => {
  return (
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
            <Tag name={'next-js'} />
            <Tag name={'tailwind'} />
            <Tag name={'guide'} />
            <Tag name={'feature'} />
          </div>
        </div>
        <div className="prose max-w-none text-gray-500 dark:text-gray-400">{excerpt(post.content, 30)}</div>
      </div>
    </article>
  );
};
