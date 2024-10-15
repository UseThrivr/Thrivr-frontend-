import { META_AUTHOR, META_DESCRIPTION, META_IMAGE, META_KEYWORDS, META_TITLE, META_TYPE, META_URL } from "@/constants";
import { Helmet } from "react-helmet-async";

/**
 * SEO component for setting metadata in the head of the document.
 *
 * @component
 *
 * @example
 * // Example usage of the SEO component
 * <SEO
 *   title="Page Title"
 *   description="Description of the page"
 *   author="Author Name"
 *   image="https://example.com/image.jpg"
 *   keywords="keyword1, keyword2"
 *   publishedAt="2024-03-08"
 *   publisher="Publisher Name"
 *   type="article"
 *   url="https://example.com/page-url"
 * />
 */

type SEOProps = Metadata & {
    children?: React.ReactNode
}

const Seo: React.FC<SEOProps> = (props) => {
    // Construct the site title by combining the meta title and the provided title
    const siteTitle = META_TITLE + (props.title ? ' - ' + props.title : '');

    return (
        <Helmet>
            <title>{siteTitle}</title>
            {/* Meta tags for various properties */}
            <meta
                name='description'
                content={props.description || META_DESCRIPTION}
            />
            <meta
                name='author'
                content={props.author || META_AUTHOR}
            />
            <meta
                name='keywords'
                content={props.keywords || META_KEYWORDS}
            />
            <meta
                name='og:title'
                content={siteTitle}
            />
            <meta
                name='og:description'
                content={props.description || META_DESCRIPTION}
            />
            <meta
                name='og:image'
                content={props.image || META_IMAGE}
            />
            <meta
                name='og:url'
                content={props.url || META_URL}
            />
            <meta
                name='og:type'
                content={props.type || META_TYPE}
            />
            <meta
                name='twitter:title'
                content={siteTitle}
            />
            <meta
                name='twitter:description'
                content={props.description || META_DESCRIPTION}
            />
            <meta
                name='twitter:image'
                content={props.image || META_IMAGE}
            />
            {/* Additional child components, if any */}
            {props.children}
        </Helmet>
    );
}

export default Seo;