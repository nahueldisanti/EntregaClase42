function randomNumbers(cant) {
    const generatedNumbers = [];
    const min = 1;
    const max = 1000;
    for (let i = 0; i < cant; i++) {
        const numeros = {numeros: Math.floor(Math.random() * (max -min) + min)};
        generatedNumbers.push(numeros);
    }

    return generatedNumbers
}



process.on('message', (cant) => {
    console.log(cant);
    process.send(randomNumbers(cant));
})