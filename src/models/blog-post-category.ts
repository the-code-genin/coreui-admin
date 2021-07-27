import moment, { Moment } from 'moment'

export default class BlogPostCategory {
    readonly created_at: Moment
    readonly updated_at: Moment

    constructor(
        readonly id: number,
        readonly name: string,
        readonly no_blog_posts: number,
        readonly no_published_blog_posts: number,
        created_at: string,
        updated_at: string
    ) {
        this.created_at = moment.utc(created_at);
        this.updated_at = moment.utc(updated_at);
    }

    static fromJSON(json: any): BlogPostCategory {
        return new BlogPostCategory(
            json.id,
            json.name,
            json.no_blog_posts,
            json.no_published_blog_posts,
            json.created_at,
            json.updated_at
        );
    }
}