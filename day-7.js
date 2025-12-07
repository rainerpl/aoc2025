const fs = require('fs');
let input = fs.readFileSync("day-7.data.txt", "utf8")
input = `.......S.......
...............
.......^.......
...............
......^.^......
...............
.....^.^.^.....
...............
....^.^...^....
...............
...^.^...^.^...
...............
..^...^.....^..
...............
.^.^.^.^.^...^.
...............`
const processInput = () => {
    const data = {rows: [], cols: [], nrCols: 0, nrRows: 0, startingRowIndex: 0};
    const lines = input.replaceAll('\r', '').split("\n").filter(v => v);
    data.nrRows = lines.length;
    data.nrCols = lines[0].length;
    data.rows = lines;
    data.cols = [];
    let i = 0;
    for (i = 0; i < data.nrCols; i++) {
        const col = [];
        data.rows.forEach((row) => {
            col.push(row[i]);
        });
        data.cols.push(col);
    }
    return data;
}
const PATH_COMPLETED = 2;
const PATH_IN_PROGRESS = 1;
const data = processInput();
const uniquePathStrings = {};
let allBeamPaths = {};
const splittingPoints = {};
const evaluateBeam = (parentBeam) => {
    const { rowIndex, colIndex, path } = parentBeam;
    const fullCol = data.cols[colIndex];
    const colFromBeamStartPoint = fullCol.slice(rowIndex);
    const nrRemovedElements = fullCol.length - colFromBeamStartPoint.length;
    let splitterIndex = colFromBeamStartPoint.indexOf('^');
    if (splitterIndex === -1) {
        // beam completed
        allBeamPaths[parentBeam.path] = PATH_COMPLETED;
        uniquePathStrings[parentBeam.path] = 1;
        return;
    }
    splitterIndex += nrRemovedElements; // so we start counting from the top again
    const splitKey = colIndex + ':' + splitterIndex;
    if ( splittingPoints[splitKey] ) {
        // this path has already been counted
        return ;
    }
    splittingPoints[splitKey] = 1;
    const leftBeam = {
        rowIndex: splitterIndex,
        colIndex: colIndex - 1,
        path: path + '->' + (colIndex - 1) + ':' + splitterIndex
    };
    const rightBeam = {
        rowIndex: splitterIndex,
        colIndex: colIndex + 1,
        path: path + '->' + (colIndex + 1) + ':' + splitterIndex
    };

    const result = [];
    if (leftBeam.colIndex >= 0)  {
        result.push(leftBeam);
        allBeamPaths[leftBeam.path] = PATH_IN_PROGRESS;
    }
    if (rightBeam.colIndex < data.nrCols)  {
        result.push(rightBeam)
        allBeamPaths[rightBeam.path] = PATH_IN_PROGRESS;
    }
    return result;
}
const run = () => {
    let beamsToEvaluate = [
        {
            rowIndex: data.startingRowIndex + 1,
            colIndex: data.rows[0].indexOf('S'),
        }
    ];
    let breaker = 100;
    beamsToEvaluate[0].path = beamsToEvaluate[0].colIndex + ':' + beamsToEvaluate[0].rowIndex;
    while (breaker > 0 && beamsToEvaluate.length > 0) {
        breaker--;
        const newBeams = [];
        beamsToEvaluate.forEach((beam) => {
            const beams = evaluateBeam(beam);
            if (beams && beams?.length !== 0) {
                newBeams.push(...beams);
            }
        });
        beamsToEvaluate = newBeams.slice();
    }
    console.log(Object.keys(splittingPoints).length); // 1651 <- right answer
}
run();
