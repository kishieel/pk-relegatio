export interface PageProps {
    params: {
        slug: string;
    }
}

export default function Page(props: PageProps) {
    return (
        <article>
            {props.params.slug}<br/>
        </article>
    );
}
