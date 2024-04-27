export interface TagProps {
  name: string;
}

export const Tag = ({ name }: TagProps) => {
  return (
    <a
      className="mr-3 text-sm font-medium uppercase text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
      href={`/tags/${name}`}
    >
      {name}
    </a>
  );
};
