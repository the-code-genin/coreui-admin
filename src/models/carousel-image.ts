import moment, { Moment } from 'moment'

export default class CarouselImage {
    readonly created_at: Moment
    readonly updated_at: Moment

    constructor(
        readonly id: number,
        readonly title: string,
        readonly image: string,
        created_at: string,
        updated_at: string
    ) {
        this.created_at = moment.utc(created_at);
        this.updated_at = moment.utc(updated_at);
    }

    static fromJSON(json: any): CarouselImage {
        return new CarouselImage(
            json.id,
            json.title,
            json.image,
            json.created_at,
            json.updated_at
        );
    }
}