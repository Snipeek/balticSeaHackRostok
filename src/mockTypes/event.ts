import pointMock from "./point";
import timeMock from "./time";
import peopleMock from "./people";
import itemMock from "./item";

const eventMock: IEvent = {
    id: 0,
    point: pointMock,
    title: "",
    time: timeMock,
    description: "",
    people: [peopleMock],
    admins: [0],
    tags: [0],
    item: itemMock,
};

export default eventMock;
