const getenv = <T extends boolean>(name: string, required?: T): T extends true ? string : string | undefined => {
  const value = process.env[name];

  if (!value && required) {
    throw `Missing required environment variable: ${name}`;
  }

  return value as T extends true ? string : string | undefined;
};

export const GRAPHQL_URL = getenv('GRAPHQL_URL', true);
export const ARTICLES_PER_PAGE = parseInt(getenv('ARTICLES_PER_PAGE') || '5');
export const DEFAULT_THEME = getenv('DEFAULT_THEME') || 'dark';
