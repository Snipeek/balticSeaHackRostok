interface IVideo {
    id: number;
    title: string;
    videoProvider: string;
    videoProviderId: string;
    stats?: IVideoStats;
    wavesData: IWavesStats;
    points: IPointAggregation;
}
