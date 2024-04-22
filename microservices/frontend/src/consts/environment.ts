const getenv = <T extends boolean>(name: string, required?: T): T extends true ? string : string | undefined => {
  const value = process.env[name];

  if (!value && required) {
    throw `Missing env var ${name}`;
  }

  return value as T extends true ? string : string | undefined;
};

export const GRAPHQL_URL = getenv('GRAPHQL_URL', true);
