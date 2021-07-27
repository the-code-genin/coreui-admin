import moment from "moment";

export default class SystemSetting {
    public readonly created_at: moment.Moment
    public readonly updated_at: moment.Moment

    constructor(
        readonly id: number,
        readonly config_name: string,
        readonly config_value: string,
        created_at: string,
        updated_at: string
    ) {
        this.created_at = moment.utc(created_at, "YYYY-MM-DD HH:mm:ss").local();
        this.updated_at = moment.utc(updated_at, "YYYY-MM-DD HH:mm:ss").local();
    }

    static fromJSON(data: {[key: string]: any}): SystemSetting {
        return new SystemSetting(
            data.id,
            data.config_name,
            data.config_value,
            data.created_at,
            data.updated_at,
        )
    }
}