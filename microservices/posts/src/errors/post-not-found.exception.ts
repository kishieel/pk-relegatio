import { createException } from '@kishieel/relegatio-common';

export class PostNotFoundException extends createException('POST_NOT_FOUND', 'Post not found.') {}
