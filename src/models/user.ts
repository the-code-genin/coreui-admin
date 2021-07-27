import moment, { Moment } from 'moment'

export default class User {
    readonly created_at: Moment
    readonly updated_at: Moment

    constructor(
        readonly id: number,
        readonly name: string,
        readonly email: string,
        readonly status: 'active'|'banned',
        created_at: string,
        updated_at: string
    ) {
        this.created_at = moment.utc(created_at);
        this.updated_at = moment.utc(updated_at);
    }

    static fromJson(json: any): User {
        return new User(
            json.id,
            json.name,
            json.email,
            json.status,
            json.created_at,
            json.updated_at
        );
    }
}