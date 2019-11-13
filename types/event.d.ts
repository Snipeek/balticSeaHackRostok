interface IEvent {
    id?: number;
    point?: IPoint;
    title?: string;
    time?: ITime;
    description?: string;
    people?: IPeople[];
    admins?: number[];
    tags?: number[];
    item?: IItem;
}
