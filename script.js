document.addEventListener('DOMContentLoaded', () => {
    console.log('--- Vizionary System Initialized ---');

    // Inicializar Lluvia de Código (Canvas)
    initCodeRain();

    /* ==========================================================
       1. CONFIGURACIÓN DE PARTÍCULAS (RED NEURONAL)
       ========================================================== */
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            "particles": {
                "number": { "value": 80, "density": { "enable": true, "value_area": 800 } },
                "color": { "value": "#00ff66" },
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
                }
            },
            "retina_detect": true
        });
    }

    /* ==========================================================
       2. LÓGICA HORARIA (Actualizada para mayor fluidez)
       ========================================================== */
    function actualizarAmbienteVizionary() {
        const ahora = new Date();
        const hora = ahora.getHours();
        const esNoche = (hora >= 18 || hora < 6);
        
        const tierra = document.getElementById('particles-js');
        
        if (esNoche) {
            if(tierra) tierra.style.filter = "brightness(0.7) contrast(1.3)";
        } else {
            if(tierra) tierra.style.filter = "brightness(1) contrast(1.1)";
        }

        // Cambio de color de partículas en tiempo real
        if (window.pJSDom && window.pJSDom.length > 0) {
            const pJS = window.pJSDom[0].pJS;
            const nuevoColor = esNoche ? "#00ff66" : "#ffffff";
            pJS.particles.color.value = nuevoColor;
            pJS.particles.line_linked.color = nuevoColor;
            // Forzar actualización visual
            pJS.fn.particlesRefresh();
        }
    }
    actualizarAmbienteVizionary();
    setInterval(actualizarAmbienteVizionary, 60000);

    /* ==========================================================
       3. MONITOR DE LATENCIA (Con protección)
       ========================================================== */
    const latencyEl = document.getElementById('latency');
    if (latencyEl) {
        setInterval(() => {
            const ms = Math.floor(Math.random() * (35 - 12 + 1) + 12);
            latencyEl.innerText = ms + "ms"; // Añadido "ms" para claridad
            latencyEl.style.color = ms > 30 ? '#ff4b4b' : '#00ffcc';
        }, 3000);
    }

    /* ==========================================================
       4. SISTEMA DE FRASES DINÁMICAS
       ========================================================== */
    const frasesVizionary = [
        "El futuro pertenece a quienes lo automatizan.",
        "Innovación constante: El código del éxito.",
        "Tu visión, nuestra inteligencia artificial.",
        "Escalando negocios con lógica de vanguardia.",
        "Vizionary: Construyendo el mañana, hoy.",
        "No predigas el futuro, prográmalo."
    ];

    function actualizarFrase() {
        const fraseEl = document.getElementById('motivational-phrase');
        if (fraseEl) {
            fraseEl.style.transition = "opacity 0.5s ease";
            fraseEl.style.opacity = 0;
            setTimeout(() => {
                const indiceAleatorio = Math.floor(Math.random() * frasesVizionary.length);
                fraseEl.innerText = frasesVizionary[indiceAleatorio];
                fraseEl.style.opacity = 0.8;
            }, 500);
        }
    }
    setInterval(actualizarFrase, 5000);

    /* ==========================================================
       5. FORMULARIO DE CONTACTO
       ========================================================== */
    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = document.getElementById('btn-submit');
            if(btn) {
                btn.innerText = 'ENVIANDO...';
                btn.disabled = true;
                setTimeout(() => {
                    btn.innerText = '✓ ENVIADO CON ÉXITO';
                    btn.style.background = '#00ff66';
                    btn.style.color = '#000';
                    form.reset();
                }, 2000);
            }
        });
    }
});

/* ==========================================================
   6. FUNCIÓN DE LLUVIA DE CÓDIGO (Optimización de Rendimiento)
   ========================================================== */
function initCodeRain() {
    const colors = ["#00ff66", "#ff0051", "#8a2be2", "#ffffff"]; 
// Verde Neón, Turquesa, Morado Eléctrico y Blanco
    const canvas = document.getElementById('code-rain');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    const codeChars = "publicstaticvoidmain(String[]args)System.out.println{if}{else}return;01<>!=+-*/%&^";
    const charArray = codeChars.split("");
    const fontSize = 16;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = Array(columns).fill(0).map(() => Math.random() * -100);

    function draw() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.font = fontSize + "px 'Courier New', monospace";

    for (let i = 0; i < drops.length; i++) {
        const text = charArray[Math.floor(Math.random() * charArray.length)];
        
        // --- CAMBIO AQUÍ: COLORES ALEATORIOS DE LA PALETA ---
        // Elegimos un color al azar del array 'colors'
        ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];
        
        // Un toque extra: que la "cabeza" de la gota siempre brille más
        if (Math.random() > 0.95) ctx.fillStyle = "#ffffff"; 

        const x = i * fontSize;
        const y = drops[i] * fontSize;
        ctx.fillText(text, x, y);

        if (y > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}
    setInterval(draw, 35);
}

/* ==========================================================
   LÓGICA DEL FORMULARIO TERMINAL (BENCHMARK US)
   ========================================================== */

function nextStep(current, next) {
    // Validar campos requeridos antes de avanzar
    const currentStepDiv = document.getElementById(`step-${current}`);
    const inputs = currentStepDiv.querySelectorAll('input[required]');
    let isValid = true;

    inputs.forEach(input => {
        if (!input.checkValidity()) {
            input.reportValidity();
            isValid = false;
        }
    });

    if (isValid) {
        document.getElementById(`step-${current}`).classList.remove('active');
        document.getElementById(`step-${next}`).classList.add('active');
    }
}

function prevStep(current, prev) {
    document.getElementById(`step-${current}`).classList.remove('active');
    document.getElementById(`step-${prev}`).classList.add('active');
}

// Intercepción del Envio (Simulación de Procesamiento AI)
const aiForm = document.getElementById('ai-lead-form');
if (aiForm) {
    aiForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Evita recargar la página

        // Ocultar paso 3, mostrar pantalla de carga
        document.getElementById('step-3').classList.remove('active');
        const processingDiv = document.getElementById('step-processing');
        processingDiv.classList.add('active');
        
        const logsContainer = document.getElementById('terminal-logs');
        logsContainer.innerHTML = ''; // Limpiar logs

        // Secuencia de logs técnicos simulados (Genera autoridad)
        const sysLogs = [
            "<span class='status'>[OK]</span> Datos de Lead interceptados y encriptados.",
            "<span class='warn'>[!]</span> Analizando viabilidad de proyecto...",
            "<span class='status'>[OK]</span> Compatibilidad con Vizionary Engine: 98.4%.",
            "<span class='status'>[OK]</span> Inyectando en canal prioritario de IA.",
            "<br><span style='color:#00ff66; font-size:1.1rem;'>» DIAGNÓSTICO COMPLETADO.</span>",
            "Tu solicitud está en la cola de procesamiento. Un agente de Vizionary te contactará en breve. <span class='blink-cursor'>_</span>"
        ];

        let i = 0;
        function typeLog() {
            if (i < sysLogs.length) {
                const p = document.createElement('p');
                p.className = 'log-line';
                p.innerHTML = sysLogs[i];
                logsContainer.appendChild(p);
                i++;
                // Retraso aleatorio para parecer que está procesando de verdad
                setTimeout(typeLog, Math.random() * 800 + 400); 
            }
        }
        
        typeLog(); // Iniciar secuencia
    });
}

const frasesAccion = [
    "El futuro no te está esperando. Se está programando ahora.",
    "Tu competencia ya está usando IA. ¿Tú sigues en modo manual?",
    "La procrastinación es el glitch que mata grandes empresas.",
    "Mañana es la excusa de los que se quedan atrás. Hoy es el despliegue.",
    "En la era de la automatización, dudar es volverse obsoleto.",
    "No busques el momento perfecto. Crea el algoritmo perfecto hoy."
];

let indiceActual = 0;

function rotarFrases() {
    const fraseEl = document.getElementById('motivational-phrase');
    if (!fraseEl) return;

    // 1. Inicia el Fade Out (Desaparece)
    fraseEl.classList.remove('visible');

    setTimeout(() => {
        // 2. Cambia el texto mientras es invisible
        fraseEl.innerText = frasesAccion[indiceActual];
        
        // 3. Inicia el Fade In (Aparece)
        fraseEl.classList.add('visible');

        // 4. Prepara el siguiente índice
        indiceActual = (indiceActual + 1) % frasesAccion.length;

    }, 1000); // Espera 1 segundo para cambiar el texto (duración del fade out)
}

// Ejecutar cada 4 segundos
setInterval(rotarFrases, 4000);

// Iniciar la primera frase de inmediato
document.addEventListener('DOMContentLoaded', rotarFrases);