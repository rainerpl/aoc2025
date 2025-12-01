
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
// useDummyInput();
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
    let partialTurn = fullTurns ? instruction.value - (fullTurns * 100) : instruction.value;
    let newValue = currentValue + (instruction.direction * ( partialTurn ));
    if (newValue > 99) {
        newValue = newValue - 100;
    }
    if (newValue < 0) {
        newValue = newValue + 100;
    }
    zeroCounter += fullTurns;

    if (instruction.direction < 0) {
        if (currentValue && currentValue - partialTurn <= 0) {
            zeroCounter++;
        }
    } else {
        if (currentValue && currentValue + partialTurn >= 100) {
            zeroCounter++;
        }
    }
    return newValue;
}

const run = () => {
    const startTime = Date.now();
    let currentValue = 50;
    instructions.forEach((currentInstruction) => {
        currentValue = evaluateInstruction(currentValue, currentInstruction)
        return currentValue
    });
    console.log('Answer is:', zeroCounter, 'time taken', Date.now() - startTime);
}
run();
// 6554 correct answer
