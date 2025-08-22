// Array de objetos con las preguntas, respuestas y opciones incorrectas
const questions = [
    {
        question: '¿Cuál es el principal factor impulsor de la escasez hídrica en Chile Central?',
        options: [
            { text: 'El aumento de la urbanización en la zona costera.', correct: false },
            { text: 'La sobreexplotación de las aguas subterráneas.', correct: true },
            { text: 'La deforestación masiva de los bosques nativos.', correct: false },
            { text: 'Las altas temperaturas causadas por el cambio climático.', correct: false }
        ]
    },
    {
        question: '¿Qué papel jugó el Código de Aguas de 1981 en esta problemática?',
        options: [
            { text: 'Estableció la regulación de caudales para cada río del país.', correct: false },
            { text: 'Priorizó el uso del agua para el consumo humano.', correct: false },
            { text: 'Nacionalizó todos los recursos hídricos para una gestión centralizada.', correct: false },
            { text: 'Privatizó el recurso hídrico, desvinculándolo de la tierra.', correct: true }
        ]
    },
    {
        question: '¿Qué sector económico es el principal consumidor de aguas subterráneas en Chile Central?',
        options: [
            { text: 'La minería a gran escala.', correct: false },
            { text: 'La producción de energía hidroeléctrica.', correct: false },
            { text: 'La agricultura intensiva, especialmente el cultivo de palto.', correct: true },
            { text: 'El consumo humano en las grandes ciudades.', correct: false }
        ]
    },
    {
        question: 'Según el estudio de Taucare et al., ¿cuál es el factor dominante en el agotamiento de los acuíferos?',
        options: [
            { text: 'La megasequía ininterrumpida desde 2010.', correct: false },
            { text: 'La presión antropogénica (sobreasignación de derechos y bombeo excesivo).', correct: true },
            { text: 'El uso ineficiente de tecnologías de riego.', correct: false },
            { text: 'La falta de lluvias en la zona andina.', correct: false }
        ]
    },
    {
        question: '¿Cuál ha sido el impacto de la sobreexplotación en la profundidad de los pozos?',
        options: [
            { text: 'Los pozos se han estabilizado gracias a las lluvias torrenciales.', correct: false },
            { text: 'La profundidad de los pozos se ha reducido significativamente.', correct: false },
            { text: 'Se ha provocado un declive sostenido que obliga a perforar pozos cada vez más profundos.', correct: true },
            { text: 'El agua ha subido a la superficie debido al deshielo de los glaciares.', correct: false }
        ]
    },
    {
        question: '¿Cuál es una de las principales consecuencias socioeconómicas de la sobreexplotación?',
        options: [
            { text: 'El aumento del precio de los productos agrícolas.', correct: false },
            { text: 'El desarrollo de nuevas comunidades agrícolas.', correct: false },
            { text: 'La expansión de la industria turística en las zonas afectadas.', correct: false },
            { text: 'La desigualdad en el acceso al agua, afectando a pequeños agricultores y comunidades.', correct: true }
        ]
    },
    {
        question: '¿Qué cambio reciente se realizó en el Código de Aguas en 2022?',
        options: [
            { text: 'Se declaró el agua como un bien de uso público y se prohibió su venta.', correct: false },
            { text: 'Se impuso un impuesto a todas las extracciones de agua subterránea.', correct: false },
            { text: 'Se estableció que los nuevos derechos de agua no serán perpetuos.', correct: true },
            { text: 'Se otorgaron más derechos de agua a las grandes empresas agrícolas.', correct: false }
        ]
    },
    {
        question: '¿Cuál es una iniciativa tecnológica local para la conservación del agua mencionada en el texto?',
        options: [
            { text: 'La desalinización de agua de mar a gran escala.', correct: false },
            { text: 'El uso de drones para monitorear los pozos de agua.', correct: false },
            { text: 'El reciclaje de aguas grises para riego.', correct: true },
            { text: 'La instalación de paneles solares para bombear agua.', correct: false }
        ]
    },
    {
        question: '¿Cómo fomenta la fundación "Un Alto en el Desierto" la conciencia ambiental?',
        options: [
            { text: 'Mediante la construcción de grandes represas en las comunidades.', correct: false },
            { text: 'A través de programas de educación ambiental en escuelas rurales.', correct: true },
            { text: 'Distribuyendo agua potable de forma gratuita a las comunidades.', correct: false },
            { text: 'Ofreciendo becas para estudios universitarios en temas hídricos.', correct: false }
        ]
    },
    {
        question: '¿Cuál es el objetivo de la iniciativa "Reguemos Chile" y su proyecto Carretera Hídrica?',
        options: [
            { text: 'Trasvasar agua desde el sur hacia el norte de Chile.', correct: true },
            { text: 'Reducir el consumo de agua en la minería.', correct: false },
            { text: 'Crear nuevos acuíferos subterráneos.', correct: false },
            { text: 'Implementar un sistema de telemetría para todos los pozos de agua.', correct: false }
        ]
    }
];

// Seleccionando los elementos del DOM
const questionEl = document.getElementById('question');
const optionsContainer = document.getElementById('options-container');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const currentQuestionEl = document.getElementById('currentQuestion');
const totalQuestionsEl = document.getElementById('totalQuestions');

// Inicializando el estado del quiz
let currentQuestionIndex = 0;

// Función para cargar una pregunta con sus opciones
function loadQuestion(index) {
    const totalQuestions = questions.length;
    if (index >= 0 && index < totalQuestions) {
        const quizItem = questions[index];
        questionEl.textContent = quizItem.question;
        
        optionsContainer.innerHTML = ''; // Limpiar opciones anteriores
        quizItem.options.forEach(option => {
            const button = document.createElement('button');
            button.classList.add('option-btn');
            button.textContent = option.text;
            button.dataset.correct = option.correct;
            button.addEventListener('click', handleOptionClick);
            optionsContainer.appendChild(button);
        });

        currentQuestionEl.textContent = index + 1;
        totalQuestionsEl.textContent = totalQuestions;
    }
    updateButtons();
}

// Función para manejar el clic en una opción
function handleOptionClick(event) {
    const selectedButton = event.target;
    const isCorrect = selectedButton.dataset.correct === 'true';

    // Deshabilitar todos los botones después de la selección
    Array.from(optionsContainer.children).forEach(button => {
        button.disabled = true;
        if (button.dataset.correct === 'true') {
            button.classList.add('correct');
        } else if (button === selectedButton) {
            button.classList.add('incorrect');
        }
    });

    if (isCorrect) {
        // Opcional: podrías agregar lógica para puntuar
    }
}

// Función para actualizar el estado de los botones
function updateButtons() {
    const totalQuestions = questions.length;
    prevBtn.disabled = currentQuestionIndex === 0;
    nextBtn.disabled = currentQuestionIndex === totalQuestions - 1;
}

// Event Listeners para los botones
nextBtn.addEventListener('click', () => {
    currentQuestionIndex++;
    loadQuestion(currentQuestionIndex);
});

prevBtn.addEventListener('click', () => {
    currentQuestionIndex--;
    loadQuestion(currentQuestionIndex);
});

// Cargar la primera pregunta al iniciar la página
document.addEventListener('DOMContentLoaded', () => {
    loadQuestion(currentQuestionIndex);
});