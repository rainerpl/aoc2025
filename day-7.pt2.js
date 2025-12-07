const fs = require('fs');
let input = fs.readFileSync("day-7.data.txt", "utf8")

const processInput = () => {
    const data = {rows: [], nrRows: 0};
    const lines = input.replaceAll('\r', '').split("\n").filter(v => v);
    data.nrRows = lines.length;
    data.rows = lines;
    return data;
}
const data = processInput();
const startingCol = data.rows[0].indexOf('S');
const beamsByCol = {
    [startingCol]: 1
};

const run = () => {
    data.rows.forEach((row) => {
        const splitters = [...row.matchAll(/\^/gi)];
        splitters.forEach((splitter) => {
            const parentMultiplier = beamsByCol[splitter.index];
            if (!parentMultiplier) {
                // splitter with no beam falling on it
                return;
            }
            const leftBeamIndex = splitter.index - 1;
            const rightBeamIndex = splitter.index + 1;

            beamsByCol[leftBeamIndex] = beamsByCol[leftBeamIndex] ? beamsByCol[leftBeamIndex] + parentMultiplier : parentMultiplier;
            beamsByCol[rightBeamIndex] = beamsByCol[rightBeamIndex] ? beamsByCol[rightBeamIndex] + parentMultiplier : parentMultiplier;
            beamsByCol[splitter.index] = 0;
        })
    });
    let sum = 0;
    Object.keys(beamsByCol).forEach(colNr => {
        sum += beamsByCol[colNr];
    });
    console.log('Answer Is', sum);
}
run(); // <- 108924003331749
