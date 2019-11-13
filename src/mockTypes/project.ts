import taskMock from "./task";
import tagMock from "./tag";

const projectMock: IProject = {
    slug: "",
    _id: 0,
    title: "",
    description: "",
    thumb: "",
    creator: 0,
    tasks: [taskMock],
    refer: tagMock,
    tags: [tagMock],
};

export default projectMock;
