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

declare module "~tailwind" {
    declare const config: {
        theme: {
            extend: {
                colors: {
                    action: {
                        default: string,
                        hover: string,
                        secondary: string
                    },
                    text: {
                        primary: string,
                        secondary: string
                    }
                }
            }
        }
    }
    export default config;
}


type NavBarProps = {
    /**
     * Content to be inserted at the right of the navbar
     */
    right?: React.ReactNode
    /**
     * Content to be inserted at the left of the navbar
     */
    left?: React.ReactNode
}

/**
 * Represents the data structure for a single inventory item.
 */
interface InventoryData {
    /** The unique identifier for the supply. */
    supplyId: string;

    /** The name of the product. */
    productName: string;

    /** The date of purchase in the format YYYY-MM-DD. */
    purchaseDate: string;

    /** The price at which the product is being sold. */
    sellingPrice: number;

    /** The category to which the product belongs. */
    category: string;

    /** The number of items available in stock. */
    quantity: number;

    /** The current stock status of the product. */
    status: "available" | "out-of-stock";
}