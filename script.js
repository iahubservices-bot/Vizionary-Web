/**
 * VIZIONARY - SYSTEM SCRIPT v3.0
 * Módulos: Partículas Interactivas, Frases, Latencia, Test de CI, Formulario.
 */

document.addEventListener('DOMContentLoaded', () => {
    console.log('--- Vizionary System Initialized ---');

    /* ==========================================================
       1. CONFIGURACIÓN DE PARTÍCULAS (RED NEURONAL)
       ========================================================== */
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            "particles": {
                "number": { 
                    "value": 100, 
                    "density": { "enable": true, "value_area": 800 } 
                },
                "color": { "value": "#ffffff" },
                "shape": { "type": "circle" },
                "opacity": { 
                    "value": 0.5, 
                    "random": true, 
                    "anim": { "enable": true, "speed": 1, "opacity_min": 0.1, "sync": false }
                },
                "size": { "value": 3, "random": true },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": "#8a2be2", // Morado Vizionary
                    "opacity": 0.4,
                    "width": 1
                },
                "move": { 
                    "enable": true, 
                    "speed": 2.5, 
                    "direction": "none", 
                    "out_mode": "out",
                    "bounce": false
                }
            },
            "interactivity": {
                "detect_on": "window", // CAMBIO CLAVE: Detecta el mouse en toda la ventana
                "events": {
                    "onhover": { 
                        "enable": true, 
                        "mode": "grab" // Las líneas se conectan al cursor
                    },
                    "onclick": { 
                        "enable": true, 
                        "mode": "push" // Crea más puntos al hacer click
                    },
                    "resize": true
                },
                "modes": {
                    "grab": { 
                        "distance": 250, 
                        "line_linked": { "opacity": 1 } 
                    },
                    "push": { 
                        "particles_nb": 8 
                    }
                }
            },
            "retina_detect": true
        });
        console.log('✓ Particles.js: Active & Interactive');
    }

    /* ==========================================================
       2. SISTEMA DE FRASES DINÁMICAS (HERO)
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
    actualizarFrase(); // Primera carga

    /* ==========================================================
       3. MONITOR DE LATENCIA (UI SIMULADA)
       ========================================================== */
    function initLatencyMonitor() {
        const latencyEl = document.getElementById('latency');
        if (!latencyEl) return;
        setInterval(() => {
            const ms = Math.floor(Math.random() * (35 - 12 + 1) + 12);
            latencyEl.innerText = ms;
            latencyEl.style.color = ms > 30 ? '#ff4b4b' : '#00ffcc';
        }, 3000);
    }
    initLatencyMonitor();

    /* ==========================================================
       4. MÓDULO TEST DE CI (INTERACTIVO)
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
        document.getElementById('question-text').innerText = qData.q;
        document.getElementById('progress-fill').style.width = `${((currentIdx) / questions.length) * 100}%`;

        const container = document.getElementById('options-container');
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

    function showResults() {
        document.getElementById('test-active').style.display = 'none';
        document.getElementById('test-result').style.display = 'block';
        document.getElementById('progress-fill').style.width = '100%';
        const finalScore = Math.round((score / questions.length) * 100);
        document.getElementById('final-score').innerText = finalScore;
    }

    /* ==========================================================
       5. MANEJO DE FORMULARIO DE CONTACTO
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