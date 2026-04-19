document.addEventListener('DOMContentLoaded', () => {
    console.log('--- Vizionary System Initialized ---');

    // 1. INICIALIZAR LLUVIA DE CÓDIGO (CANVAS)
    initCodeRain();

    // 2. CONFIGURACIÓN DE PARTÍCULAS (RED NEURONAL)
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            "particles": {
                "number": { "value": 80, "density": { "enable": true, "value_area": 800 } },
                "color": { "value": "#8a2be2" }, // Morado Vizionary
                "shape": { "type": "circle" },
                "opacity": { "value": 0.5 },
                "size": { "value": 3 },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": "#8a2be2",
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

    // 3. MONITOR DE LATENCIA
    const latencyEl = document.getElementById('latency');
    if (latencyEl) {
        setInterval(() => {
            const ms = Math.floor(Math.random() * (35 - 12 + 1) + 12);
            latencyEl.innerText = ms + "ms";
            latencyEl.style.color = ms > 30 ? '#ff4b4b' : '#00ffcc';
        }, 3000);
    }

    // 4. ROTACIÓN DE FRASES MOTIVACIONALES
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

        fraseEl.style.opacity = 0;
        setTimeout(() => {
            fraseEl.innerText = frasesAccion[indiceActual];
            fraseEl.style.opacity = 0.8;
            indiceActual = (indiceActual + 1) % frasesAccion.length;
        }, 1000);
    }
    setInterval(rotarFrases, 5000);
    rotarFrases(); // Ejecución inicial

    // 5. LÓGICA DEL FORMULARIO TERMINAL
    const aiForm = document.getElementById('ai-lead-form');
    if (aiForm) {
        aiForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Ocultar paso actual y mostrar procesamiento
            document.getElementById('step-3').classList.remove('active');
            const processingDiv = document.getElementById('step-processing');
            if (processingDiv) processingDiv.classList.add('active');
            
            const logsContainer = document.getElementById('terminal-logs');
            if (!logsContainer) return;
            logsContainer.innerHTML = ''; 

            const sysLogs = [
                "<span style='color:#27c93f'>[OK]</span> Datos de Lead interceptados y encriptados.",
                "<span style='color:#ffbd2e'>[!]</span> Analizando viabilidad de proyecto...",
                "<span style='color:#27c93f'>[OK]</span> Compatibilidad con Vizionary Engine: 99.1%.",
                "<span style='color:#27c93f'>[OK]</span> Inyectando en canal prioritario de IA.",
                "<br><span style='color:#8a2be2; font-size:1.1rem; font-weight:bold;'>» DIAGNÓSTICO COMPLETADO.</span>",
                "Tu solicitud ha sido procesada. Un agente de Vizionary te contactará en breve. <span class='blink'>_</span>"
            ];

            let i = 0;
            function typeLog() {
                if (i < sysLogs.length) {
                    const p = document.createElement('p');
                    p.style.marginBottom = "10px";
                    p.innerHTML = sysLogs[i];
                    logsContainer.appendChild(p);
                    i++;
                    setTimeout(typeLog, Math.random() * 600 + 300); 
                }
            }
            typeLog();
        });
    }
});

/* --- FUNCIONES GLOBALES --- */

function nextStep(current, next) {
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

function initCodeRain() {
    const canvas = document.getElementById('code-rain');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const resize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();

    const codeChars = "01<>!=+-*/%&^VizionaryAISEOLeadGenerate{}[]";
    const charArray = codeChars.split("");
    const fontSize = 16;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = Array(columns).fill(0).map(() => Math.random() * -100);

    const colors = ["#8a2be2", "#4b0082", "#9370db", "#ffffff"];

    function draw() {
        ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.font = fontSize + "px monospace";

        for (let i = 0; i < drops.length; i++) {
            const text = charArray[Math.floor(Math.random() * charArray.length)];
            ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];
            
            if (Math.random() > 0.98) ctx.fillStyle = "#ffffff"; 

            ctx.fillText(text, i * fontSize, drops[i] * fontSize);

            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }
    setInterval(draw, 35);
}

function iniciarAnimacionCadena() {
    const title = document.getElementById('main-title');
    const words = title.querySelectorAll('span');
    let i = 0;

    const interval = setInterval(() => {
        // 1. Quitamos el verde de la palabra anterior
        if (i > 0) {
            words[i - 1].classList.remove('word-active');
        }

        // 2. Si terminamos todas las palabras
        if (i === words.length) {
            clearInterval(interval); // Detenemos el cronómetro
            title.classList.add('final-smoke-effect'); // Activamos el humo
            return;
        }

        // 3. Ponemos el verde a la palabra actual
        words[i].classList.add('word-active');
        i++;
    }, 400); // 400ms es una velocidad de lectura cómoda
}

// Ejecutar la animación cuando cargue la página
window.onload = iniciarAnimacionCadena;

const auditBtn = document.getElementById('start-audit-btn');
const terminal = document.getElementById('audit-terminal');

const auditSteps = [
    { txt: "> Conectando con Vizionary Crawler...", time: 1000 },
    { txt: "> Bypass de firewalls de indexación detectado.", time: 1500 },
    { txt: "> Analizando Core Web Vitals...", time: 1200 },
    { txt: "> [!] ALERTA: 42% del tráfico GEO se pierde en Google Maps.", time: 2000 },
    { txt: "> Sugerencia IA: Optimizar microdatos de esquema local.", time: 1000 },
    { txt: "> Auditoría completa. Generando informe de impacto...", time: 1500 }
];

auditBtn.addEventListener('click', async () => {
    const url = document.getElementById('target-url').value;
    if(!url) return alert("Ingresa una URL");

    auditBtn.disabled = true;
    terminal.innerHTML = "";

    for (const step of auditSteps) {
        let p = document.createElement('p');
        p.innerText = step.txt;
        terminal.appendChild(p);
        await new Promise(res => setTimeout(res, step.time));
    }
    
    alert("Demo finalizada. Para el reporte completo de " + url + ", completa tus datos.");
});

function irADemo() {
    const url = document.getElementById('user-website').value;
    if (!url) {
        alert("Por favor, ingresa tu sitio web para analizar.");
        return;
    }
    // Guardamos la URL en la memoria del navegador
    localStorage.setItem('webAAuditar', url);
    // Saltamos a la nueva página
    window.location.href = "auditoria.html";
}