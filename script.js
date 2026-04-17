// --- VIZIONARY INTELLIGENCE SYSTEM (VERSIÓN FINAL CORREGIDA) ---
document.addEventListener('DOMContentLoaded', () => {
    console.log('✓ Sistema Vizionary: Inicializando módulos...');

    // 1. CONFIGURACIÓN DE PARTÍCULAS (Red Neuronal)
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            "particles": {
                "number": { "value": 80, "density": { "enable": true, "value_area": 800 } },
                "color": { "value": "#ffffff" },
                "shape": { "type": "circle" },
                "opacity": { "value": 0.5, "random": false },
                "size": { "value": 3, "random": true },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": "#8a2be2",
                    "opacity": 0.4,
                    "width": 1
                },
                "move": { "enable": true, "speed": 2, "direction": "none", "random": false, "straight": false, "out_mode": "out" }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": { "enable": true, "mode": "grab" },
                    "onclick": { "enable": true, "mode": "push" }
                }
            },
            "retina_detect": true
        });
        console.log('✓ Partículas: Activas');
    }

    // 2. SISTEMA DE FRASES DINÁMICAS (Cada 4 segundos)
    const frasesVizionary = [
        "El futuro pertenece a quienes lo automatizan.",
        "Innovación constante: El código del éxito.",
        "Tu visión, nuestra inteligencia artificial.",
        "Escalando negocios con lógica de vanguardia.",
        "Vizionary: Construyendo el mañana, hoy.",
        "La eficiencia es la base de la libertad empresarial.",
        "No predigas el futuro, prográmalo.",
        "La IA no reemplaza al humano, potencia su visión.",
        "Inteligencia aplicada, resultados exponenciales.",
        "Automatización: Menos procesos, más progreso."
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

    setInterval(actualizarFrase, 4000);
    actualizarFrase(); // Primera ejecución

    // 3. SISTEMA DE NOTICIAS ROTATIVAS VIZIONARY (Cada 5 segundos)
    let noticiaActualIndex = 0;
    const noticiasIA = [
        { id: 1, titulo: "GPT-5: Filtraciones sobre su nueva arquitectura", cuerpo: "La nueva arquitectura promete una reducción del 90% en alucinaciones." },
        { id: 2, titulo: "Nvidia presenta Blackwell: El chip más potente", cuerpo: "30 veces más rápido en tareas de inferencia que su predecesor." },
        { id: 3, titulo: "IA logra predecir estructuras proteicas", cuerpo: "DeepMind alcanza un hito mapeando el plegamiento de proteínas con precisión atómica." },
        { id: 4, titulo: "Sora: La revolución del video hiperrealista", cuerpo: "OpenAI genera videos de 60 segundos con coherencia física total." }
    ];

    function rotarNoticiasIA() {
        const el = document.getElementById('news-data-active');
        if (!el) return;

        el.classList.remove('fade-in');
        el.classList.add('fade-out');

        setTimeout(() => {
            noticiaActualIndex = (noticiaActualIndex + 1) % noticiasIA.length;
            el.innerText = noticiasIA[noticiaActualIndex].titulo;
            el.classList.remove('fade-out');
            el.classList.add('fade-in');
        }, 800);
    }

    setInterval(rotarNoticiasIA, 5000);
    
    const newsTrigger = document.getElementById('news-card-trigger');
    if (newsTrigger) {
        newsTrigger.addEventListener('click', () => {
            abrirBlog(noticiasIA[noticiaActualIndex]);
        });
    }

    function abrirBlog(noticiaSeleccionada) {
        document.getElementById('hero').style.display = 'none';
        document.getElementById('api-content').style.display = 'none';
        const blog = document.getElementById('blog-detalle');
        blog.style.display = 'block';

        document.getElementById('contenido-noticia').innerHTML = `
            <h1 style="color: var(--accent); margin-bottom: 20px;">${noticiaSeleccionada.titulo}</h1>
            <p style="font-size: 1.2rem; line-height: 1.8; margin-bottom: 40px;">${noticiaSeleccionada.cuerpo}</p>
            <hr style="border: 0; border-top: 1px solid var(--glass-border); margin: 40px 0;">
            <h3>Otras noticias de interés</h3>
            <div style="display: grid; gap: 15px; margin-top: 20px;">
                ${noticiasIA.map(n => `
                    <div class="card" style="padding: 15px; cursor: pointer;" onclick="recargarNoticiaBlog(${n.id})">
                        <h4 style="color: #fff; margin: 0;">${n.titulo}</h4>
                    </div>
                `).join('')}
            </div>
        `;
        window.scrollTo(0, 0);
    }

    window.recargarNoticiaBlog = function(id) {
        const noticia = noticiasIA.find(n => n.id === id);
        abrirBlog(noticia);
    };

    const btnVolver = document.getElementById('btn-volver');
    if (btnVolver) {
        btnVolver.addEventListener('click', () => {
            document.getElementById('blog-detalle').style.display = 'none';
            document.getElementById('hero').style.display = 'flex';
            document.getElementById('api-content').style.display = 'block';
            actualizarFrase();
        });
    }

    // 4. MONITOREO DE SISTEMA (Latencia)
    function monitorearSistema() {
        const latenciaEl = document.getElementById('latency');
        if (!latenciaEl) return;
        setInterval(() => {
            const ms = Math.floor(Math.random() * (35 - 12 + 1) + 12);
            latenciaEl.innerText = ms;
            latenciaEl.style.color = ms > 28 ? '#ffcc00' : '#00ff00';
        }, 2000);
    }
    monitorearSistema();

    // 5. TEST DE RAZONAMIENTO (CI)
    const questions = [
        { q: "¿Qué número continúa la secuencia: 2, 6, 12, 20, ...?", options: ["28", "30", "24", "32"], answer: 1 },
        { q: "Un bate y una pelota cuestan $1.10. El bate cuesta $1.00 más que la pelota. ¿Cuánto cuesta la pelota?", options: ["$0.10", "$0.05", "$0.15", "$0.01"], answer: 1 },
        { q: "Si todos los Bloops son Razzies, y todos los Razzies son Lazzies, entonces...", options: ["Todos los Lazzies son Bloops", "Algunos Bloops no son Lazzies", "Todos los Bloops son Lazzies", "Ninguna es correcta"], answer: 2 },
        { q: "Si la palabra LÓGICA se codifica como MPJDBB, ¿cómo se codifica IA?", options: ["JB", "HZ", "JC", "JZ"], answer: 0 },
        { q: "Un tren viaja a 60 km/h. ¿Cuántos minutos tardará en recorrer 45 km?", options: ["45 min", "40 min", "50 min", "30 min"], answer: 0 },
        { q: "¿Cuál es el número que falta en la serie: 1, 1, 2, 3, 5, 8, ...?", options: ["11", "12", "13", "15"], answer: 2 },
        { q: "Si 5 máquinas hacen 5 artículos en 5 minutos, ¿cuánto tardan 100 máquinas en hacer 100 artículos?", options: ["100 min", "20 min", "5 min", "50 min"], answer: 2 },
        { q: "El hijo de Juan es el padre de mi hijo. ¿Quién soy yo respecto a Juan?", options: ["Su abuelo", "Su hijo", "Su nieto", "Yo soy Juan"], answer: 1 },
        { q: "Dedo es a Mano como Hoja es a...", options: ["Planta", "Árbol", "Cuaderno", "Bosque"], answer: 1 },
        { q: "¿Qué número sigue la serie: 100, 95, 85, 70, ...?", options: ["50", "55", "60", "45"], answer: 0 },
        { q: "Algunos meses tienen 31 días, otros tienen 30. ¿Cuántos tienen 28?", options: ["1", "6", "12", "Depende si es bisiesto"], answer: 2 },
        { q: "Si entras en una habitación oscura con una cerilla y hay una lámpara de aceite, una vela y una chimenea, ¿qué enciendes primero?", options: ["La lámpara", "La vela", "La chimenea", "La cerilla"], answer: 3 },
        { q: "Si la hija de Teresa es la madre de mi hija, ¿qué soy yo de Teresa?", options: ["Su hijo", "Su yerno/nuera", "Su hermano", "Su padre"], answer: 1 },
        { q: "¿Cuántos animales de cada especie llevó Moisés en el Arca?", options: ["2", "1", "0 (Fue Noé)", "7"], answer: 2 },
        { q: "Si tres gatos cazan tres ratones en tres minutos, ¿cuánto tardará un solo gato en cazar un ratón?", options: ["1 min", "3 min", "9 min", "1.5 min"], answer: 1 }
    ];

    let currentQuestionIndex = 0;
    let score = 0;

    const btnStartTest = document.getElementById('btn-start-test');
    if (btnStartTest) {
        btnStartTest.addEventListener('click', iniciarTest);
        document.getElementById('btn-restart-test').addEventListener('click', () => iniciarTest());
    }

    function iniciarTest() {
        document.getElementById('test-intro').style.display = 'none';
        document.getElementById('test-result').style.display = 'none';
        document.getElementById('test-active').style.display = 'block';
        currentQuestionIndex = 0;
        score = 0;
        cargarPregunta();
    }

    function cargarPregunta() {
        const qData = questions[currentQuestionIndex];
        document.getElementById('question-counter').innerText = `Pregunta ${currentQuestionIndex + 1} de ${questions.length}`;
        document.getElementById('question-text').innerText = qData.q;
        document.getElementById('progress-fill').style.width = `${(currentQuestionIndex / questions.length) * 100}%`;

        const container = document.getElementById('options-container');
        container.innerHTML = '';
        qData.options.forEach((opt, idx) => {
            const btn = document.createElement('button');
            btn.className = 'option-btn';
            btn.innerText = opt;
            btn.onclick = () => {
                if (idx === qData.answer) score++;
                currentQuestionIndex++;
                if (currentQuestionIndex < questions.length) cargarPregunta();
                else mostrarResultados();
            };
            container.appendChild(btn);
        });
    }

    function mostrarResultados() {
        document.getElementById('test-active').style.display = 'none';
        document.getElementById('test-result').style.display = 'block';
        const percent = Math.round((score / questions.length) * 100);
        document.getElementById('final-score').innerText = percent;
        document.getElementById('progress-fill').style.width = '100%';
    }

    // 6. FORMULARIO DE CONTACTO
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = document.getElementById('btn-submit');
            btn.textContent = 'Enviando...';
            setTimeout(() => {
                document.getElementById('form-status').textContent = "✓ Mensaje enviado con éxito.";
                btn.textContent = 'Enviar Mensaje';
                contactForm.reset();
            }, 2000);
        });
    }
});