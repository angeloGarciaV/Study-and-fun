let currentStage = 0;
const stages = [
    {
        text: "Había un g_tito pequeño, muy bonito de color gris y ojos negros que se encontraba aburrido en su casa. Su casa era un hermoso chalet color blanco en la cima de la montaña. Un día decidió salir a las montañas para ver si encontraba algo interesante que le quitara el aburrimiento, se adentro tanto que llegó a una jungla.",
        vowels: "A",
        sum: "0 + 1 = ?"
    },
    {
        text: "Al entr_r a la jungla miró hacia atrás para r_cordar el camino a su casa, enseguida que entró vio muchos animales, uno de ellos fue un León, le llamó mucho la atención y decidió acercarse un poco más para poder verlo mejor.",
        vowels: "A, E",
        sum: "1 + 1 = ?"
    },
    // Añadir el resto de las etapas aquí
];

function startGame() {
    displayStage();
}

function displayStage() {
    const stage = stages[currentStage];
    document.getElementById('story').textContent = stage.text;
    document.getElementById('math-question').textContent = stage.sum;
    document.getElementById('feedback').textContent = '';
    document.getElementById('next-stage').style.display = 'none';
}

function checkAnswer() {
    const correctVowel = stages[currentStage].vowels.toLowerCase();
    const userVowel = document.getElementById('vowel').value.toLowerCase();

    if (userVowel === correctVowel) {
        document.getElementById('story').textContent = document.getElementById('story').textContent.replace(/_/g, correctVowel);
        document.getElementById('feedback').textContent = '¡Correcto! Ahora resuelve la suma.';
        document.getElementById('vowel').disabled = true;
    } else {
        document.getElementById('feedback').textContent = 'Inténtalo de nuevo.';
    }
}

function checkSum() {
    const correctSum = eval(stages[currentStage].sum.split('=')[0].trim()); // Calcula la suma correcta
    const userSum = parseInt(document.getElementById('sum').value, 10);

    if (userSum === correctSum) {
        document.getElementById('feedback').textContent = '¡Bien hecho! Puedes pasar a la siguiente etapa.';
        if (currentStage < stages.length - 1) {
            document.getElementById('next-stage').style.display = 'block';
        } else {
            document.getElementById('feedback').textContent += ' ¡Has completado el juego!';
        }
    } else {
        document.getElementById('feedback').textContent = 'La suma no es correcta, intenta de nuevo.';
    }
}

function nextStage() {
    currentStage++;
    document.getElementById('vowel').disabled = false;
    displayStage();
}

window.onload = startGame;
