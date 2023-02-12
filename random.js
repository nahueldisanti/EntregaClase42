function randomNumbers(cant) {
    console.log(`rcant = ${cant}`)
    const generatedNumbers = [];
    const min = 1;
    const max = 1000;
    for (let i = 0; i < cant; i++) {
        const numeros = {numeros: Math.floor(Math.random() * (max -min) + min)};
        generatedNumbers.push(numeros);
    }
    console.log(generatedNumbers)
    return generatedNumbers
}

process.on('message', (passCant) => {
    console.log(passCant);
    if (passCant.length > 0 ) {
        process.send(randomNumbers(passCant));
        console.log(randomNumbers(passCant))
    }
});