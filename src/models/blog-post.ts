import moment from "moment";
import BlogPostCategory from "./blog-post-category";

export default class BlogPost {
    public readonly publish_by: moment.Moment;
    public readonly created_at: moment.Moment;
    public readonly updated_at: moment.Moment;
    public readonly blog_post_category: BlogPostCategory

    constructor(
        readonly id: number,
        readonly blog_post_category_id: number,
        readonly slug: string,
        readonly title: string,
        readonly contents: string,
        readonly summary: string,
        readonly status: "published" | "draft",
        publish_by: string,
        readonly feature_image: string,
        readonly no_blog_post_views: number,
        blog_post_category: any,
        created_at: string,
        updated_at: string
    ) {
        this.blog_post_category = BlogPostCategory.fromJSON(blog_post_category);
        this.publish_by = moment.utc(publish_by, "YYYY-MM-DD HH:mm:ss").local();
        this.created_at = moment.utc(created_at, "YYYY-MM-DD HH:mm:ss").local();
        this.updated_at = moment.utc(updated_at, "YYYY-MM-DD HH:mm:ss").local();
    }

    static fromJSON(data: { [key: string]: any }): BlogPost {
        return new BlogPost(
            data.id,
            data.blog_post_category_id,
            data.slug,
            data.title,
            data.contents,
            data.summary,
            data.status,
            data.publish_by,
            data.feature_image,
            data.no_blog_post_views,
            data.blog_post_category,
            data.created_at,
            data.updated_at,
        )
    }
}