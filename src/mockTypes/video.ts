import videoStatsMock from "./videoStats";
import wavesStatsMock from "./wavesStats";
import pointAggregationMock from "./pointAggregation";

const videoMock: IVideo = {
    id: 0,
    title: "",
    videoProvider: "",
    videoProviderId: "",
    stats: videoStatsMock,
    wavesData: wavesStatsMock,
    points: pointAggregationMock,
};

export default videoMock;
