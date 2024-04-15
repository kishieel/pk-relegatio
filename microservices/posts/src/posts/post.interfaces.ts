export interface PostCreateArgs {
    title: string;
    content: string;
    authorId: string;
}

export interface PostUpdateArgs {
    id: string;
    title?: string;
    content?: string;
    authorId?: string;
}
