import { METADATA } from "@/constants";
import React from "react";
import { Helmet } from "react-helmet-async";

/**
 * SEO component for setting metadata in the head of the document.
 * @example
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

const Seo: React.FC<Metadata & ChildProps> = (props) => {
    // Construct the site title by combining the meta title and the provided title
    const siteTitle = METADATA.title + (props.title ? ' | ' + props.title : '');

    return (
        <Helmet>
            <title>{siteTitle}</title>
            {/* Meta tags for various properties */}
            <meta
                name='description'
                content={props.description || METADATA.description}
            />
            <meta
                name='author'
                content={props.author || METADATA.author}
            />
            <meta
                name='keywords'
                content={props.keywords || METADATA.keywords}
            />
            <meta
                name='og:title'
                content={siteTitle}
            />
            <meta
                name='og:description'
                content={props.description || METADATA.description}
            />
            <meta
                name='og:image'
                content={props.image || METADATA.image}
            />
            <meta
                name='og:url'
                content={props.url || METADATA.url}
            />
            <meta
                name='og:type'
                content={props.type || METADATA.type}
            />
            <meta
                name='twitter:title'
                content={siteTitle}
            />
            <meta
                name='twitter:description'
                content={props.description || METADATA.description}
            />
            <meta
                name='twitter:image'
                content={props.image || METADATA.image}
            />
            {props.children}
        </Helmet>
    );
}

export default Seo;