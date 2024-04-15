import { Request } from 'express';

export const createSubgraphContext = (req: Request) => {
    const internal = req.headers['x-internal'];
    return internal ? JSON.parse(Array.isArray(internal) ? internal[0] : internal) : null;
};
