// ===== CONFIGURACIÓN =====
const reasons = [
    "Porque tu amor es incondicional, incluso cuando cometo errores",
    "Porque fuiste quien me dió la vida",
    "Porque me enseñaste el valor de la honestidad con tu ejemplo",
    "Porque siempre preguntas si he comido, aunque tenga 20 años",
    "Porque tu abrazo cura cualquier herida del alma",
    "Porque sacrificaste tanto para darme una buena educación",
    "Porque siempre has estado conmigo en las buenas y malas",
    "Porque me enseñaste a ser fuerte ante las adversidades",
    "Porque siempre creíste en mí, incluso cuando yo no creía",
    "Porque me inculcaste el amor por el aprendizaje",
    "Porque tu paciencia parece no tener límites",
    "Porque me apoyaste en cada sueño que tuve",
    "Porque tu comida tiene el sabor del hogar",
    "Porque siempre me cuidaste y me sigues cuidando",
    "Porque siempre tienes un consejo sabio cuando lo necesito",
    "Porque celebras mis logros como si fueran los tuyos",
    "Porque me consuelas cuando las cosas no salen bien",
    "Porque sigo siendo un niño cuando en tus brazos estoy",
    "Porque me amas como nadie en este mundo me ha podido amar",
    "Porque me escuchas con atención, incluso de cosas triviales",
    "Porque me enseñaste a apreciar las cosas simples de la vida",
    "Porque siempre defiendes a tu familia ante todo",
    "Porque eres la mayor bendición que Dios me ha dado",
    "Porque me diste raíces para saber de dónde vengo y hacia donde ir",
    "Porque cada llamada tuya alegra mi día",
    "Porque me aceptas tal como soy, con virtudes y defectos",
    "Porque tu amor es el más grande en este mundo",
    "Porque me enseñaste que la familia es lo más importante",
    "Porque eres mi refugio en los momentos difíciles",
    "Por la mujer increíble que eres y el ejemplo que me das cada día"
];

// Variables globales
let openedPetals = 0;
const totalReasons = reasons.length;

// ===== ELEMENTOS DEL DOM =====
const cover = document.getElementById('cover');
const mainApp = document.getElementById('mainApp');
const startBtn = document.getElementById('startBtn');
const petalsContainer = document.getElementById('petalsContainer');
const flowerCenter = document.getElementById('flowerCenter');
const reasonText = document.getElementById('reasonText');
const reasonNumber = document.getElementById('reasonNumber');
const currentReasonSpan = document.getElementById('currentReason');
const totalReasonsSpan = document.getElementById('totalReasons');
const progressBar = document.getElementById('progressBar');
const progressText = document.getElementById('progressText');
const finalContainer = document.getElementById('finalContainer');
const restartBtn = document.getElementById('restartBtn');
const backHomeBtn = document.getElementById('backHomeBtn');
const finalHomeBtn = document.getElementById('finalHomeBtn');

// ===== INICIALIZACIÓN =====
function init() {
    totalReasonsSpan.textContent = totalReasons;
    setupEventListeners();
    updateProgress();
}

// ===== CREAR PÉTALOS EN ESPIRAL INTERCALADA =====
function createPetals() {
    petalsContainer.innerHTML = '';
    
    const containerWidth = petalsContainer.offsetWidth;
    const containerHeight = petalsContainer.offsetHeight;
    const centerX = containerWidth / 2;
    const centerY = containerHeight / 2;
    
    // Tamaños de pétalos más pequeños para mejor separación
    const petalWidth = containerWidth * 0.12;
    const petalHeight = containerWidth * 0.2;
    
    // Parámetros para espiral intercalada
    const totalLayers = 3; // 3 capas intercaladas
    const petalsPerLayer = Math.ceil(totalReasons / totalLayers);
    
    // Calculamos el centro geométrico real de la espiral
    let spiralCenterX = 0;
    let spiralCenterY = 0;
    let minX = Infinity, maxX = -Infinity;
    let minY = Infinity, maxY = -Infinity;
    
    // Primera pasada: calcular posiciones y encontrar límites
    const positions = [];
    
    for (let i = 0; i < totalReasons; i++) {
        // Determinar capa (0, 1, 2) para intercalar
        const layer = i % totalLayers;
        
        // Radio base según la capa
        const baseRadius = containerWidth * (0.25 + layer * 0.15);
        
        // Ángulo con offset para cada capa
        const angleOffset = (layer * 2 * Math.PI) / totalLayers;
        const petalIndexInLayer = Math.floor(i / totalLayers);
        const angle = angleOffset + (petalIndexInLayer * 2 * Math.PI / petalsPerLayer);
        
        // Variación radial para crear espiral suave
        const radiusVariation = Math.sin(petalIndexInLayer * 0.3) * (containerWidth * 0.05);
        const radius = baseRadius + radiusVariation;
        
        // Posición del pétalo
        const x = centerX + radius * Math.cos(angle) - (petalWidth / 2);
        const y = centerY + radius * Math.sin(angle) - (petalHeight / 2);
        
        // Rotación para que apunte hacia afuera
        const rotation = (angle * 180 / Math.PI) + 90;
        
        // Guardar posición para cálculos posteriores
        positions.push({ x, y, rotation, layer });
        
        // Actualizar límites para encontrar centro
        minX = Math.min(minX, x);
        maxX = Math.max(maxX, x + petalWidth);
        minY = Math.min(minY, y);
        maxY = Math.max(maxY, y + petalHeight);
    }
    
    // Calcular centro geométrico de la espiral
    spiralCenterX = (minX + maxX) / 2;
    spiralCenterY = (minY + maxY) / 2;
    
    // Centrar el corazón en el centro de la espiral
    flowerCenter.style.setProperty('--spiral-center-x', `${spiralCenterX}px`);
    flowerCenter.style.setProperty('--spiral-center-y', `${spiralCenterY}px`);
    
    // Segunda pasada: crear pétalos
    for (let i = 0; i < totalReasons; i++) {
        const { x, y, rotation, layer } = positions[i];
        
        const petal = document.createElement('div');
        petal.className = `petal ${layer === 0 ? 'inner-layer' : layer === 1 ? 'middle-layer' : 'outer-layer'}`;
        petal.dataset.index = i;
        
        // Posicionar pétalo
        petal.style.position = 'absolute';
        petal.style.width = `${petalWidth}px`;
        petal.style.height = `${petalHeight}px`;
        petal.style.left = `${x}px`;
        petal.style.top = `${y}px`;
        petal.style.transform = `rotate(${rotation}deg)`;
        
        // Variables CSS para animación
        petal.style.setProperty('--final-rotation', `${rotation}deg`);
        petal.style.setProperty('--final-x', '0px');
        petal.style.setProperty('--final-y', '0px');
        
        // Punto de inicio para animación (desde el centro)
        const startX = centerX - x - (petalWidth / 2);
        const startY = centerY - y - (petalHeight / 2);
        petal.style.setProperty('--start-x', `${startX}px`);
        petal.style.setProperty('--start-y', `${startY}px`);
        
        // Número claro y legible
        const number = document.createElement('span');
        number.textContent = i + 1;
        number.style.fontSize = `${Math.min(petalWidth * 0.3, 24)}px`;
        number.style.transform = `rotate(${-rotation}deg)`;
        number.style.display = 'flex';
        number.style.alignItems = 'center';
        number.style.justifyContent = 'center';
        number.style.width = '100%';
        number.style.height = '100%';
        number.style.fontWeight = 'bold';
        number.style.textShadow = '1px 1px 3px rgba(0,0,0,0.8)';
        number.style.color = '#FFFFFF';
        petal.appendChild(number);
        
        // Eventos para mejor usabilidad
        setupPetalEvents(petal, rotation, i);
        
        petalsContainer.appendChild(petal);
    }
    
    // Asegurar que el corazón esté al frente
    setTimeout(() => {
        flowerCenter.style.zIndex = '2000';
        flowerCenter.style.transform = 'translate(-50%, -50%)';
    }, 100);
}

// ===== CONFIGURAR EVENTOS DE PÉTALOS =====
function setupPetalEvents(petal, rotation, index) {
    // Click
    petal.addEventListener('click', () => openPetal(index));
    
    // Hover
    petal.addEventListener('mouseenter', () => {
        if (!petal.classList.contains('opened')) {
            petal.style.transform = `rotate(${rotation}deg) scale(1.2)`;
            petal.style.zIndex = '50';
            petal.style.boxShadow = '0 0 20px rgba(255, 255, 255, 0.6)';
        }
    });
    
    petal.addEventListener('mouseleave', () => {
        if (!petal.classList.contains('opened')) {
            petal.style.transform = `rotate(${rotation}deg) scale(1)`;
            petal.style.zIndex = '1';
            petal.style.boxShadow = '';
        }
    });
    
    // Touch para móviles
    petal.addEventListener('touchstart', (e) => {
        e.preventDefault();
        if (!petal.classList.contains('opened')) {
            petal.style.transform = `rotate(${rotation}deg) scale(1.15)`;
            petal.style.zIndex = '50';
        }
    }, { passive: false });
    
    petal.addEventListener('touchend', (e) => {
        e.preventDefault();
        if (!petal.classList.contains('opened')) {
            petal.style.transform = `rotate(${rotation}deg) scale(1)`;
            petal.style.zIndex = '1';
        }
    }, { passive: false });
}

// ===== ENCONTRAR SIGUIENTE PÉTALO =====
function findNextAvailablePetal() {
    // Buscar de forma más inteligente - alternar entre capas
    const searchOrder = [];
    for (let i = 0; i < totalReasons; i++) {
        const layer = i % 3;
        const index = Math.floor(i / 3) * 3 + layer;
        if (index < totalReasons) searchOrder.push(index);
    }
    
    for (const index of searchOrder) {
        const petal = document.querySelector(`.petal[data-index="${index}"]`);
        if (petal && !petal.classList.contains('opened')) {
            return index;
        }
    }
    
    // Si no encuentra en el orden intercalado, buscar cualquier disponible
    for (let i = 0; i < totalReasons; i++) {
        const petal = document.querySelector(`.petal[data-index="${i}"]`);
        if (petal && !petal.classList.contains('opened')) {
            return i;
        }
    }
    
    return -1;
}

// ===== CONFIGURAR EVENTOS PRINCIPALES =====
function setupEventListeners() {
    startBtn.addEventListener('click', () => {
        cover.style.display = 'none';
        mainApp.style.display = 'block';
        
        setTimeout(() => {
            createPetals();
            
            window.addEventListener('resize', debounce(() => {
                if (mainApp.style.display !== 'none') {
                    createPetals();
                    reopenPetals();
                }
            }, 350));
        }, 150);
    });
    
    // Corazón con feedback mejorado
    flowerCenter.addEventListener('click', () => {
        // Animación de pulsación
        flowerCenter.style.transform = 'translate(-50%, -50%) scale(0.9)';
        setTimeout(() => {
            flowerCenter.style.transform = 'translate(-50%, -50%) scale(1)';
        }, 200);
        
        if (openedPetals === totalReasons) {
            showFinalMessage();
        } else {
            const nextPetalIndex = findNextAvailablePetal();
            if (nextPetalIndex !== -1) {
                openPetal(nextPetalIndex);
            }
        }
    });
    
    // Touch para el corazón
    flowerCenter.addEventListener('touchstart', () => {
        flowerCenter.style.transform = 'translate(-50%, -50%) scale(0.9)';
    });
    
    flowerCenter.addEventListener('touchend', () => {
        flowerCenter.style.transform = 'translate(-50%, -50%) scale(1)';
    });
    
    // Navegación
    backHomeBtn.addEventListener('click', () => {
        mainApp.style.display = 'none';
        cover.style.display = 'block';
        resetFlower();
    });
    
    finalHomeBtn.addEventListener('click', () => {
        finalContainer.style.display = 'none';
        cover.style.display = 'block';
        resetFlower();
    });
    
    restartBtn.addEventListener('click', () => {
        finalContainer.style.display = 'none';
        mainApp.style.display = 'block';
        resetFlower();
    });
}

// ===== FUNCIONES DE UTILIDAD =====
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function reopenPetals() {
    for (let i = 0; i < totalReasons; i++) {
        const petal = document.querySelector(`.petal[data-index="${i}"]`);
        if (petal && petal.classList.contains('opened')) {
            petal.classList.add('opened');
        }
    }
}

// ===== ABRIR PÉTALO =====
function openPetal(index) {
    const petal = document.querySelector(`.petal[data-index="${index}"]`);
    
    if (!petal || petal.classList.contains('opened')) {
        return;
    }
    
    // Animación de apertura
    petal.classList.add('opened');
    openedPetals++;
    
    currentReasonSpan.textContent = openedPetals;
    showReason(index);
    updateProgress();
    
    // Destacar el pétalo recién abierto
    petal.style.zIndex = '100';
    petal.style.boxShadow = '0 0 25px rgba(255, 255, 255, 0.8)';
    
    setTimeout(() => {
        petal.style.boxShadow = petal.classList.contains('opened') ? 
            'inset 0 0 15px rgba(255, 255, 255, 0.8), 0 6px 12px rgba(171, 71, 188, 0.4)' : '';
    }, 1500);
    
    if (openedPetals === totalReasons) {
        setTimeout(() => {
            flowerCenter.classList.add('all-open');
            flowerCenter.style.fontSize = 'min(8vw, 3.5rem)';
            flowerCenter.style.boxShadow = 
                '0 0 40px rgba(255, 64, 129, 0.9), ' +
                '0 0 70px rgba(255, 64, 129, 0.6), ' +
                '0 0 100px rgba(255, 64, 129, 0.3)';
            
            setTimeout(showFinalMessage, 2000);
        }, 800);
    }
}

// ===== MOSTRAR RAZÓN =====
function showReason(index) {
    reasonNumber.textContent = index + 1;
    reasonText.textContent = reasons[index];
    
    reasonText.style.animation = 'none';
    setTimeout(() => {
        reasonText.style.animation = 'fadeIn 0.6s ease-out';
    }, 10);
}

// ===== ACTUALIZAR PROGRESO =====
function updateProgress() {
    const progress = (openedPetals / totalReasons) * 100;
    progressBar.style.width = `${progress}%`;
    progressText.textContent = `${Math.round(progress)}% completado`;
    
    // Cambiar color según progreso
    if (progress >= 80) {
        progressBar.style.background = 'linear-gradient(to right, #4CAF50, #2E7D32)';
    } else if (progress >= 50) {
        progressBar.style.background = 'linear-gradient(to right, #FF9800, #F57C00)';
    }
}

// ===== MOSTRAR MENSAJE FINAL =====
function showFinalMessage() {
    mainApp.style.display = 'none';
    finalContainer.style.display = 'block';
}

// ===== REINICIAR FLOR =====
function resetFlower() {
    openedPetals = 0;
    currentReasonSpan.textContent = '0';
    
    document.querySelectorAll('.petal').forEach(petal => {
        petal.classList.remove('opened');
        const rotation = petal.style.transform.match(/rotate\(([^)]+)\)/);
        if (rotation) {
            petal.style.transform = rotation[0];
        }
        petal.style.zIndex = '1';
        petal.style.boxShadow = '';
    });
    
    reasonNumber.textContent = '0';
    reasonText.textContent = 'Toca un pétalo de la rosa para descubrir una razón especial...';
    
    flowerCenter.classList.remove('all-open');
    flowerCenter.style.animation = 'heartbeat 2s infinite';
    flowerCenter.style.fontSize = 'min(7vw, 3rem)';
    flowerCenter.style.boxShadow = 
        '0 0 30px rgba(255, 64, 129, 0.7), ' +
        '0 0 50px rgba(255, 64, 129, 0.4), ' +
        '0 0 70px rgba(255, 64, 129, 0.2)';
    
    progressBar.style.background = 'linear-gradient(to right, #f48fb1, #ec407a)';
    updateProgress();
    
    if (mainApp.style.display !== 'none') {
        createPetals();
    }
}

// ===== INICIAR APLICACIÓN =====
document.addEventListener('DOMContentLoaded', init);