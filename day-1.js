
import fs from 'fs';
let input = fs.readFileSync("day-1.data.txt", "utf8");
const useDummyInput = () => {
    input = `L68
L30
R48
L5
R60
L55
L1
L99
R14
L82`;
}
//useDummyInput();
const getInputLines = () => {
    const instructions = [];
    input.split('\n').filter(v => v).forEach(v => {
        instructions.push({
            direction: v[0] === 'L' ? -1 : 1,
            value: parseInt(v.slice(1), 10),
        });
    });

    return instructions;
}
const instructions = getInputLines();
let zeroCounter = 0;
const evaluateInstruction = (currentValue, instruction) => {

    let fullTurns = Math.floor(instruction.value / 100);
    if (fullTurns) {
        console.log('fullTurns', fullTurns)
    }
    let partialTurn = fullTurns ? instruction.value - (fullTurns * 100) : instruction.value;
    let newValue = currentValue + (instruction.direction * ( partialTurn ));
    if (newValue > 99) {
        newValue = newValue - 100;
    }
    if (newValue < 0) {
        newValue = newValue + 100;
    }
    if (newValue === 0) {
        //zeroCounter += fullTurns;
        zeroCounter++;
    }
    return {newValue, partialTurn, fullTurns};
}

const run = () => {
    let currentValue = 50;
    const results = instructions.map((currentInstruction) => {
        const result = evaluateInstruction(currentValue, currentInstruction);
        currentValue = result.newValue;
        return currentValue
    });
    console.log(zeroCounter);
}
run();
// 2230 too low
