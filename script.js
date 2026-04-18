document.addEventListener('DOMContentLoaded', () => {
    console.log('--- Vizionary System Initialized ---');

    /* ==========================================================
       1. CONFIGURACIÓN DE PARTÍCULAS (RED NEURONAL)
       ========================================================== */
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            "particles": {
                "number": { "value": 100, "density": { "enable": true, "value_area": 800 } },
                "color": { "value": "#00ff66" }, // Verde Neón por defecto
                "shape": { "type": "circle" },
                "opacity": { "value": 0.5 },
                "size": { "value": 3 },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": "#00ff66",
                    "opacity": 0.4,
                    "width": 1
                },
                "move": { "enable": true, "speed": 1.5 }
            },
            "interactivity": {
                "detect_on": "window",
                "events": {
                    "onhover": { "enable": true, "mode": "grab" },
                    "onclick": { "enable": true, "mode": "push" }
                },
                "modes": {
                    "grab": { "line_linked": { "opacity": 1 } }
                }
            },
            "retina_detect": true
        });
    }

    /* ==========================================================
       2. LÓGICA HORARIA (Iluminación y Color de Partículas)
       ========================================================== */
    function actualizarAmbienteVizionary() {
        const ahora = new Date();
        const hora = ahora.getHours();
        const minutos = ahora.getMinutes();
        const tiempoDecimal = hora + (minutos / 60);
        const esNoche = (hora >= 18 || hora < 6);
        
        // 2a. Iluminación de la Tierra
        const anguloSol = (tiempoDecimal / 24) * 100; // Porcentaje de posición
        const tierra = document.getElementById('particles-js');
        let sunOverlay = document.getElementById('sun-light');

        if (!sunOverlay) {
            sunOverlay = document.createElement('div');
            sunOverlay.id = 'sun-light';
            document.body.appendChild(sunOverlay);
        }

        if (!esNoche) {
            // DÍA
            sunOverlay.style.background = `radial-gradient(circle at ${anguloSol}% 30%, rgba(255,255,200,0.3) 0%, rgba(0,0,0,0.6) 70%)`;
            if(tierra) tierra.style.filter = "brightness(1) contrast(1.1)";
        } else {
            // NOCHE
            sunOverlay.style.background = `radial-gradient(circle at ${anguloSol}% 70%, rgba(0,255,102,0.1) 0%, rgba(0,0,0,0.85) 80%)`;
            if(tierra) tierra.style.filter = "brightness(0.7) contrast(1.3)";
        }

        // 2b. Color de Partículas según horario
        if (window.pJSDom && window.pJSDom.length > 0) {
            const pJS = window.pJSDom[0].pJS;
            const nuevoColor = esNoche ? "#00ff66" : "#ffffff";
            
            pJS.particles.color.value = nuevoColor;
            pJS.particles.line_linked.color = nuevoColor;
            pJS.fn.particlesRefresh();
        }
    }

    // Ejecutar cada minuto y al cargar
    setInterval(actualizarAmbienteVizionary, 60000);
    actualizarAmbienteVizionary();

    /* ==========================================================
       3. SISTEMA DE FRASES DINÁMICAS (HERO)
       ========================================================== */
    const frasesVizionary = [
        "El futuro pertenece a quienes lo automatizan.",
        "Innovación constante: El código del éxito.",
        "Tu visión, nuestra inteligencia artificial.",
        "Escalando negocios con lógica de vanguardia.",
        "Vizionary: Construyendo el mañana, hoy.",
        "La eficiencia es la base de la libertad empresarial.",
        "No predigas el futuro, prográmalo."
    ];

    function actualizarFrase() {
        const fraseEl = document.getElementById('motivational-phrase');
        if (!fraseEl) return;
        
        fraseEl.style.opacity = 0;
        setTimeout(() => {
            const indiceAleatorio = Math.floor(Math.random() * frasesVizionary.length);
            fraseEl.innerText = frasesVizionary[indiceAleatorio];
            fraseEl.style.opacity = 0.8;
        }, 500);
    }

    setInterval(actualizarFrase, 4500);
    actualizarFrase();

    /* ==========================================================
       4. MONITOR DE LATENCIA
       ========================================================== */
    const latencyEl = document.getElementById('latency');
    if (latencyEl) {
        setInterval(() => {
            const ms = Math.floor(Math.random() * (35 - 12 + 1) + 12);
            latencyEl.innerText = ms;
            latencyEl.style.color = ms > 30 ? '#ff4b4b' : '#00ffcc';
        }, 3000);
    }

    /* ==========================================================
       5. MÓDULO TEST DE CI
       ========================================================== */
    const questions = [
        { q: "¿Qué número sigue: 2, 6, 12, 20, ...?", options: ["28", "30", "24", "32"], answer: 1 },
        { q: "Si el bate y la bola cuestan $1.10 y el bate cuesta $1 más, ¿cuánto cuesta la bola?", options: ["$0.10", "$0.05", "$0.01", "$0.15"], answer: 1 },
        { q: "Si tres gatos cazan tres ratones en 3 minutos, ¿cuánto tarda un gato en cazar uno?", options: ["1 min", "3 min", "9 min", "6 min"], answer: 1 }
    ];

    let currentIdx = 0;
    let score = 0;

    const btnStart = document.getElementById('btn-start-test');
    if (btnStart) {
        btnStart.addEventListener('click', () => {
            document.getElementById('test-intro').style.display = 'none';
            document.getElementById('test-active').style.display = 'block';
            loadQuestion();
        });
    }

    function loadQuestion() {
        const qData = questions[currentIdx];
        const qText = document.getElementById('question-text');
        const progress = document.getElementById('progress-fill');
        const container = document.getElementById('options-container');

        if(qText) qText.innerText = qData.q;
        if(progress) progress.style.width = `${((currentIdx) / questions.length) * 100}%`;
        if(container) {
            container.innerHTML = '';
            qData.options.forEach((opt, i) => {
                const btn = document.createElement('button');
                btn.className = 'option-btn';
                btn.innerText = opt;
                btn.onclick = () => {
                    if (i === qData.answer) score++;
                    currentIdx++;
                    if (currentIdx < questions.length) loadQuestion();
                    else showResults();
                };
                container.appendChild(btn);
            });
        }
    }

    function showResults() {
        document.getElementById('test-active').style.display = 'none';
        document.getElementById('test-result').style.display = 'block';
        const finalScoreEl = document.getElementById('final-score');
        if(finalScoreEl) finalScoreEl.innerText = Math.round((score / questions.length) * 100);
    }

    /* ==========================================================
       6. FORMULARIO DE CONTACTO
       ========================================================== */
    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = document.getElementById('btn-submit');
            btn.innerText = 'PROCESANDO...';
            setTimeout(() => {
                btn.innerText = '✓ ENVIADO';
                btn.style.background = '#00ffcc';
                form.reset();
            }, 2000);
        });
    }
});