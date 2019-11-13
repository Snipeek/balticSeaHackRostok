import {createRandomGraphic} from "@/helpers/createRandomGraphic";


export const randomStatisticMock = (x) => ({
    "wavesData": {
        "alpha": {
            "data": createRandomGraphic(x),
            "frequency": 1
        },
        "beta": {
            "data": createRandomGraphic(x),
            "frequency": 1
        },
        "gamma": {
            "data": createRandomGraphic(x),
            "frequency": 1
        },
        "theta": {
            "data": createRandomGraphic(x),
            "frequency": 1
        },
        "vote": 0
    }
});

