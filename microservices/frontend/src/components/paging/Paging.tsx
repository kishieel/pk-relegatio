import { PagingAction } from '@app/components/paging/PagingAction';

interface PagingProps {
  hasNext: boolean;
  hasPrev: boolean;
  page: number;
}

export const Paging = ({ hasNext, hasPrev, page }: PagingProps) => {
  return (
    <nav className="flex justify-between">
      <PagingAction disabled={!hasPrev} rel="prev" href={`/blog/page/${page - 1}`}>
        Previous
      </PagingAction>
      <span>- {page} -</span>
      <PagingAction disabled={!hasNext} rel="next" href={`/blog/page/${page + 1}`}>
        Next
      </PagingAction>
    </nav>
  );
};
