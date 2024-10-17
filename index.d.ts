// NOTE this file is for defining global types for the application

interface Metadata {
    /** Title for the metadata **/
    title?: string;
    /** Description of the content **/
    description?: string;
    /** URL of an image related to the content **/
    image?: string;
    /** URL for the content **/
    url?: string;
    /** Author of the content **/
    author?: string;
    /** Type of the content (e.g., article, blog) **/
    type?: string;
    /** Publisher of the content **/
    publisher?: string;
    /** Publication date of the content **/
    publishedAt?: string;
    /** Keywords related to the content **/
    keywords?: string;
}

type ChildProps = {
    /** React node elements to render as children **/
    children?: React.ReactNode;
}
