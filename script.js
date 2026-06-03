// ========== SAĞ PANEL (CONTROL PANEL) ==========
// HTML yapısını oluştur
const panelHTML = `
<div id="control-panel" style="position: fixed; right: 0; top: 50%; transform: translateY(-50%); width: 320px; background: rgba(10, 10, 20, 0.95); backdrop-filter: blur(20px); border: 1px solid rgba(168, 85, 247, 0.3); border-radius: 16px 0 0 16px; z-index: 10000; padding: 20px; transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1); box-shadow: -5px 0 30px rgba(0,0,0,0.5);">
    <div id="panel-toggle" style="position: absolute; left: -40px; top: 20px; width: 40px; height: 40px; background: linear-gradient(135deg, #6c5ce7, #a855f7); border-radius: 8px 0 0 8px; display: flex; align-items: center; justify-content: center; cursor: pointer; color: white; font-size: 1.2rem; border: 1px solid rgba(168,85,247,0.5); border-right: none;">
        <i class="fas fa-cog"></i>
    </div>
    <div style="margin-bottom: 20px; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 12px;">
        <h3 style="color: white; font-size: 1.1rem; margin: 0; display: flex; align-items: center; gap: 8px;"><i class="fas fa-sliders-h" style="color: #a855f7;"></i> Gelişmiş Kontroller</h3>
        <p style="color: #888; font-size: 0.7rem; margin: 5px 0 0;">Animasyon & Görsel Ayarlar</p>
    </div>
    
    <!-- ANİMASYON HIZI -->
    <div style="margin-bottom: 18px;">
        <label style="display: flex; justify-content: space-between; color: #ccc; font-size: 0.8rem; margin-bottom: 6px;"><span><i class="fas fa-tachometer-alt"></i> Animasyon Hızı</span> <span id="anim-speed-val">1.0x</span></label>
        <input type="range" id="anim-speed" min="0.5" max="2" step="0.05" value="1" style="width: 100%; background: #2a2a3e; height: 3px; border-radius: 3px; -webkit-appearance: none;">
        <style>#anim-speed::-webkit-slider-thumb { -webkit-appearance: none; width: 15px; height: 15px; border-radius: 50%; background: #a855f7; cursor: pointer; box-shadow: 0 0 8px #a855f7; }</style>
    </div>
    
    <!-- PARTİKÜL YOĞUNLUĞU -->
    <div style="margin-bottom: 18px;">
        <label style="display: flex; justify-content: space-between; color: #ccc; font-size: 0.8rem; margin-bottom: 6px;"><span><i class="fas fa-circle"></i> Partikül Yoğunluğu</span> <span id="particle-count-val">50</span></label>
        <input type="range" id="particle-count" min="0" max="120" step="5" value="50" style="width: 100%; background: #2a2a3e; height: 3px; border-radius: 3px;">
    </div>
    
    <!-- ORB HAREKET GENLİĞİ -->
    <div style="margin-bottom: 18px;">
        <label style="display: flex; justify-content: space-between; color: #ccc; font-size: 0.8rem; margin-bottom: 6px;"><span><i class="fas fa-globe"></i> Orb Hareket Genliği</span> <span id="orb-amp-val">1.0x</span></label>
        <input type="range" id="orb-amp" min="0" max="2" step="0.05" value="1" style="width: 100%; background: #2a2a3e; height: 3px; border-radius: 3px;">
    </div>
    
    <!-- ARKA PLAN BLUR -->
    <div style="margin-bottom: 18px;">
        <label style="display: flex; justify-content: space-between; color: #ccc; font-size: 0.8rem; margin-bottom: 6px;"><span><i class="fas fa-blur"></i> Arka Plan Blur</span> <span id="blur-val">120px</span></label>
        <input type="range" id="bg-blur" min="30" max="250" step="10" value="120" style="width: 100%; background: #2a2a3e; height: 3px;">
    </div>
    
    <!-- RENK TEMASI -->
    <div style="margin-bottom: 20px;">
        <label style="color: #ccc; font-size: 0.8rem; margin-bottom: 8px; display: block;"><i class="fas fa-palette"></i> Renk Teması</label>
        <div style="display: flex; gap: 10px;">
            <div data-theme="purple" style="width: 35px; height: 35px; border-radius: 8px; background: linear-gradient(135deg, #6c5ce7, #a855f7); cursor: pointer; border: 2px solid transparent; transition: 0.2s;"></div>
            <div data-theme="blue" style="width: 35px; height: 35px; border-radius: 8px; background: linear-gradient(135deg, #3b82f6, #06b6d4); cursor: pointer;"></div>
            <div data-theme="red" style="width: 35px; height: 35px; border-radius: 8px; background: linear-gradient(135deg, #ef4444, #ec4899); cursor: pointer;"></div>
            <div data-theme="green" style="width: 35px; height: 35px; border-radius: 8px; background: linear-gradient(135deg, #22c55e, #10b981); cursor: pointer;"></div>
            <div data-theme="orange" style="width: 35px; height: 35px; border-radius: 8px; background: linear-gradient(135deg, #f97316, #f59e0b); cursor: pointer;"></div>
        </div>
    </div>
    
    <!-- EFEKT ANAHTARLARI -->
    <div style="border-top: 1px solid rgba(255,255,255,0.1); padding-top: 15px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
            <span style="color: #ccc; font-size: 0.8rem;"><i class="fas fa-shield-alt"></i> Grid Overlay</span>
            <label class="switch"><input type="checkbox" id="grid-toggle" checked><span class="slider"></span></label>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
            <span style="color: #ccc; font-size: 0.8rem;"><i class="fas fa-mouse-pointer"></i> Özel İmleç</span>
            <label class="switch"><input type="checkbox" id="cursor-toggle" checked><span class="slider"></span></label>
        </div>
        <div style="display: flex; justify-content: space-between; align-items: center;">
            <span style="color: #ccc; font-size: 0.8rem;"><i class="fas fa-sync-alt"></i> Dönen Kartlar</span>
            <label class="switch"><input type="checkbox" id="card-rotate-toggle"><span class="slider"></span></label>
        </div>
    </div>
    <div style="margin-top: 15px; text-align: center; font-size: 0.65rem; color: #555;">Legante Control v1.0</div>
</div>
<style>
.switch { position: relative; display: inline-block; width: 44px; height: 22px; }
.switch input { opacity: 0; width: 0; height: 0; }
.slider { position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: #2a2a3e; transition: 0.3s; border-radius: 34px; }
.slider:before { position: absolute; content: ""; height: 16px; width: 16px; left: 3px; bottom: 3px; background-color: white; transition: 0.3s; border-radius: 50%; }
input:checked + .slider { background: linear-gradient(135deg, #6c5ce7, #a855f7); }
input:checked + .slider:before { transform: translateX(22px); }
</style>
`;

document.body.insertAdjacentHTML('beforeend', panelHTML);

// Panel aç/kapa
const panel = document.getElementById('control-panel');
const toggleBtn = document.getElementById('panel-toggle');
let panelOpen = true;
toggleBtn.addEventListener('click', () => {
    panelOpen = !panelOpen;
    panel.style.transform = panelOpen ? 'translateY(-50%)' : 'translateX(100%)';
    toggleBtn.innerHTML = panelOpen ? '<i class="fas fa-cog"></i>' : '<i class="fas fa-chevron-left"></i>';
});

// 1. ANİMASYON HIZI KONTROLÜ
const animSpeedSlider = document.getElementById('anim-speed');
const speedVal = document.getElementById('anim-speed-val');
const styleSheet = document.createElement('style');
document.head.appendChild(styleSheet);

function updateAnimSpeed(value) {
    const speed = value;
    styleSheet.textContent = `
        .feature-card, .market-item, .pricing-card, .testimonial-card, .hero-card-glow, .floating-element {
            transition-duration: ${0.3 / speed}s !important;
        }
        .gradient-orb {
            animation-duration: ${25 / speed}s !important;
        }
        .feature-card:hover, .market-item:hover, .pricing-card:hover {
            transition-duration: ${0.2 / speed}s !important;
        }
    `;
    speedVal.innerText = speed.toFixed(2) + 'x';
}

animSpeedSlider.addEventListener('input', (e) => updateAnimSpeed(parseFloat(e.target.value)));
updateAnimSpeed(1);

// 2. PARTİKÜL YOĞUNLUĞU
const particleCountSlider = document.getElementById('particle-count');
const particleCountVal = document.getElementById('particle-count-val');
let currentParticles = [];

function regenerateParticles(count) {
    const container = document.querySelector('.particles');
    if (!container) return;
    // mevcut partikülleri temizle
    const oldParticles = container.querySelectorAll('.particle');
    oldParticles.forEach(p => p.remove());
    
    for (let i = 0; i < count; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        const size = Math.random() * 3 + 1;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const duration = Math.random() * 20 + 10;
        const delay = Math.random() * 10;
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: rgba(168, 85, 247, ${Math.random() * 0.5 + 0.2});
            border-radius: 50%;
            left: ${posX}%;
            top: ${posY}%;
            animation: particleFloat ${duration}s ${delay}s linear infinite;
            box-shadow: 0 0 ${size * 3}px rgba(168, 85, 247, 0.5);
        `;
        container.appendChild(particle);
    }
}

particleCountSlider.addEventListener('input', (e) => {
    const val = parseInt(e.target.value);
    particleCountVal.innerText = val;
    regenerateParticles(val);
});

// 3. ORB HAREKET GENLİĞİ
const orbAmpSlider = document.getElementById('orb-amp');
const orbAmpVal = document.getElementById('orb-amp-val');
const orbStyle = document.createElement('style');
document.head.appendChild(orbStyle);

function updateOrbAmplitude(amp) {
    const moveX = 100 * amp;
    const moveY = 80 * amp;
    orbStyle.textContent = `
        @keyframes orbFloatModified {
            0%, 100% { transform: translate(0, 0) scale(1) rotate(0deg); }
            25% { transform: translate(${moveX}px, -${moveY}px) scale(1.15) rotate(90deg); }
            50% { transform: translate(-${moveX * 0.5}px, ${moveY * 0.75}px) scale(0.85) rotate(180deg); }
            75% { transform: translate(-${moveY}px, -${moveX * 0.5}px) scale(1.1) rotate(270deg); }
        }
        .gradient-orb {
            animation-name: orbFloatModified !important;
        }
    `;
    orbAmpVal.innerText = amp.toFixed(2) + 'x';
}

orbAmpSlider.addEventListener('input', (e) => updateOrbAmplitude(parseFloat(e.target.value)));
updateOrbAmplitude(1);

// 4. ARKA PLAN BLUR
const blurSlider = document.getElementById('bg-blur');
const blurVal = document.getElementById('blur-val');
const orbs = document.querySelectorAll('.gradient-orb');
function updateBlur(val) {
    orbs.forEach(orb => {
        orb.style.filter = `blur(${val}px)`;
    });
    blurVal.innerText = val + 'px';
}
blurSlider.addEventListener('input', (e) => updateBlur(parseInt(e.target.value)));
updateBlur(120);

// 5. RENK TEMASI
const themeColors = {
    purple: { g1: '#6c5ce7', g2: '#a855f7', g3: '#c084fc' },
    blue: { g1: '#3b82f6', g2: '#06b6d4', g3: '#38bdf8' },
    red: { g1: '#ef4444', g2: '#ec4899', g3: '#f472b6' },
    green: { g1: '#22c55e', g2: '#10b981', g3: '#34d399' },
    orange: { g1: '#f97316', g2: '#f59e0b', g3: '#fbbf24' }
};
const themeStyle = document.createElement('style');
document.head.appendChild(themeStyle);

function setTheme(themeName) {
    const c = themeColors[themeName];
    if (!c) return;
    themeStyle.textContent = `
        :root {
            --gradient-1: ${c.g1} !important;
            --gradient-2: ${c.g2} !important;
            --gradient-3: ${c.g3} !important;
            --accent: ${c.g2} !important;
            --accent-light: ${c.g3} !important;
        }
        .gradient-text, .feature-link, .stat-suffix, .footer-logo i {
            background: linear-gradient(135deg, ${c.g1}, ${c.g2}) !important;
            -webkit-background-clip: text !important;
            background-clip: text !important;
            -webkit-text-fill-color: transparent !important;
        }
        .btn-primary, .market-cat-btn.active, .popular-badge, .badge-premium {
            background: linear-gradient(135deg, ${c.g1}, ${c.g2}) !important;
        }
        .feature-icon-wrapper .feature-icon, .market-icon {
            background: linear-gradient(135deg, ${c.g1}33, ${c.g2}33) !important;
        }
        .feature-card:hover .feature-icon, .market-item:hover .market-icon {
            background: linear-gradient(135deg, ${c.g1}, ${c.g2}) !important;
        }
    `;
}
document.querySelectorAll('[data-theme]').forEach(el => {
    el.addEventListener('click', () => {
        const theme = el.getAttribute('data-theme');
        setTheme(theme);
        // aktif tema vurgusu
        document.querySelectorAll('[data-theme]').forEach(e => e.style.border = '2px solid transparent');
        el.style.border = '2px solid white';
    });
});
// varsayılan purple aktif
document.querySelector('[data-theme="purple"]').style.border = '2px solid white';

// 6. GRID OVERLAY TOGGLE
const gridToggle = document.getElementById('grid-toggle');
const gridOverlay = document.querySelector('.grid-overlay');
if (gridOverlay) {
    gridToggle.addEventListener('change', (e) => {
        gridOverlay.style.opacity = e.target.checked ? '1' : '0';
    });
}

// 7. ÖZEL İMLEÇ TOGGLE
const cursorToggle = document.getElementById('cursor-toggle');
const cursorEl = document.querySelector('.cursor');
const cursorFollow = document.querySelector('.cursor-follower');
if (cursorEl && cursorFollow) {
    cursorToggle.addEventListener('change', (e) => {
        const show = e.target.checked;
        cursorEl.style.display = show ? 'block' : 'none';
        cursorFollow.style.display = show ? 'block' : 'none';
    });
}

// 8. DÖNEN KARTLAR (3D TİLT EFEKTİ)
const rotateToggle = document.getElementById('card-rotate-toggle');
const tiltCards = document.querySelectorAll('.feature-card, .market-item, .pricing-card');

function addTiltEffect(card) {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -10;
        const rotateY = ((x - centerX) / centerX) * 10;
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
        card.style.transition = 'none';
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
        card.style.transition = 'var(--transition-slow)';
    });
}

rotateToggle.addEventListener('change', (e) => {
    if (e.target.checked) {
        tiltCards.forEach(card => addTiltEffect(card));
    } else {
        tiltCards.forEach(card => {
            card.removeEventListener('mousemove', () => {});
            card.removeEventListener('mouseleave', () => {});
            card.style.transform = '';
        });
    }
});

// YENİ ANİMASYONLAR (EKSTRA)
const extraAnimStyle = document.createElement('style');
extraAnimStyle.textContent = `
    @keyframes glowPulse {
        0%, 100% { text-shadow: 0 0 5px rgba(168,85,247,0.3); }
        50% { text-shadow: 0 0 20px rgba(168,85,247,0.8); }
    }
    .hero-title .gradient-text {
        animation: gradientShift 4s ease infinite, glowPulse 3s ease-in-out infinite;
    }
    .market-item, .feature-card {
        animation: fadeInUp 0.6s ease backwards;
        animation-delay: calc(var(--order, 0) * 0.05s);
    }
    @keyframes fadeInUp {
        from { opacity: 0; transform: translateY(30px); }
        to { opacity: 1; transform: translateY(0); }
    }
    .stats-wrapper {
        animation: borderGlow 3s ease-in-out infinite;
    }
    @keyframes borderGlow {
        0%, 100% { box-shadow: 0 0 20px rgba(108,92,231,0.2); }
        50% { box-shadow: 0 0 50px rgba(108,92,231,0.5); }
    }
    .btn-primary {
        animation: btnPulse 2s ease-in-out infinite;
    }
    @keyframes btnPulse {
        0%, 100% { box-shadow: 0 8px 25px rgba(108,92,231,0.3); }
        50% { box-shadow: 0 8px 40px rgba(108,92,231,0.6); }
    }
`;
document.head.appendChild(extraAnimStyle);

// Kartlara gecikme indeksi ekle
document.querySelectorAll('.market-item, .feature-card').forEach((el, idx) => {
    el.style.setProperty('--order', idx);
});

console.log('✅ Control panel eklendi | Yeni animasyonlar aktif');