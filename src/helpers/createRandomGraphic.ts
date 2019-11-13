function getRandomArbitrary(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

const scatter = 10;

export const createRandomGraphic = (x) => {
    const response = [ getRandomArbitrary(getRandomArbitrary(1,scatter), getRandomArbitrary(scatter,scatter*2)) ];

    for (let i = 1; i < x; i++) {
        const center = response[ i - 1 ];
        const left = center - scatter < 0 ? 0 : center - scatter;
        const right = center + scatter;
        response.push( getRandomArbitrary(left, right) );
    }

    return response;
};