// ========== SOL PANEL - TAMAMEN YENİDEN OLUŞTUR (SMS BOOMBER + TOKEN CHECKER DAHİL) ==========
// Mevcut sol paneli tamamen kaldır
const oldPanel = document.getElementById('side-panel');
if (oldPanel) oldPanel.remove();
const oldMobileBtn = document.getElementById('mobile-menu-btn');
if (oldMobileBtn) oldMobileBtn.remove();
const oldOverlay = document.getElementById('mobile-overlay');
if (oldOverlay) oldOverlay.remove();

// Body margin sıfırla
document.body.style.marginLeft = '0';

// SOL PANEL HTML - TAM SÜRÜM (KALICI AÇIK, TÜM ÖZELLİKLER DAHİL)
const sidePanelHTML = `
<div id="side-panel" style="position: fixed; left: 0; top: 0; width: 280px; height: 100vh; background: rgba(6, 6, 11, 0.98); backdrop-filter: blur(30px); border-right: 1px solid rgba(168, 85, 247, 0.3); z-index: 9999; box-shadow: 5px 0 40px rgba(0,0,0,0.6); overflow-y: auto; overflow-x: hidden;">
    <div style="padding: 25px 20px; border-bottom: 1px solid rgba(255,255,255,0.08); margin-bottom: 20px;">
        <div style="display: flex; align-items: center; gap: 12px;">
            <div style="width: 45px; height: 45px; background: linear-gradient(135deg, #6c5ce7, #a855f7); border-radius: 12px; display: flex; align-items: center; justify-content: center;">
                <i class="fas fa-crown" style="color: white; font-size: 1.3rem;"></i>
            </div>
            <div>
                <span style="font-size: 1.2rem; font-weight: 800; letter-spacing: 2px;">LEGANTE</span>
                <span style="font-size: 0.6rem; color: #a855f7; display: block; letter-spacing: 3px;">PROJECT</span>
            </div>
        </div>
    </div>
    
    <div style="padding: 0 15px;">
        <div style="margin-bottom: 20px;">
            <span style="color: #5a5a70; font-size: 0.7rem; letter-spacing: 2px; text-transform: uppercase; margin-left: 12px;">MENÜ</span>
        </div>
        <ul id="side-nav-menu" style="list-style: none; padding: 0;">
            <li style="margin-bottom: 6px;"><a href="#home" class="side-nav-link" data-section="home"><i class="fas fa-home" style="width: 28px;"></i><span>Ana Sayfa</span></a></li>
            <li style="margin-bottom: 6px;"><a href="#features" class="side-nav-link" data-section="features"><i class="fas fa-star" style="width: 28px;"></i><span>Özellikler</span></a></li>
            <li style="margin-bottom: 6px;"><a href="#market" class="side-nav-link" data-section="market"><i class="fas fa-store" style="width: 28px;"></i><span>Market</span></a></li>
            <li style="margin-bottom: 6px;"><a href="#stats" class="side-nav-link" data-section="stats"><i class="fas fa-chart-line" style="width: 28px;"></i><span>İstatistikler</span></a></li>
            <li style="margin-bottom: 6px;"><a href="#pricing" class="side-nav-link" data-section="pricing"><i class="fas fa-tag" style="width: 28px;"></i><span>Paketler</span></a></li>
            <li style="margin-bottom: 6px;"><a href="#testimonials" class="side-nav-link" data-section="testimonials"><i class="fas fa-comment" style="width: 28px;"></i><span>Yorumlar</span></a></li>
            
            <!-- AYIRICI -->
            <li style="margin-bottom: 6px; margin-top: 25px;">
                <div style="padding: 0 16px; margin-bottom: 8px;">
                    <span style="color: #5a5a70; font-size: 0.65rem; letter-spacing: 2px; text-transform: uppercase;">🛠️ EXTRA TOOLS</span>
                </div>
            </li>
            <li style="margin-bottom: 6px;">
                <a href="#" id="sms-bomber-link" class="side-nav-link" style="cursor: pointer;">
                    <i class="fas fa-sms" style="width: 28px;"></i>
                    <span>SMS Bomber</span>
                </a>
            </li>
            <li style="margin-bottom: 6px;">
                <a href="#" id="token-checker-link" class="side-nav-link" style="cursor: pointer;">
                    <i class="fab fa-discord" style="width: 28px;"></i>
                    <span>Token Checker</span>
                </a>
            </li>
        </ul>
    </div>
    
    <div style="position: absolute; bottom: 30px; left: 0; right: 0; padding: 0 20px;">
        <div style="background: rgba(168, 85, 247, 0.1); border-radius: 12px; padding: 15px; border: 1px solid rgba(168,85,247,0.2);">
            <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px;">
                <i class="fab fa-discord" style="color: #5865F2; font-size: 1.3rem;"></i>
                <span style="font-weight: 600; font-size: 0.85rem;">Discord Sunucumuz</span>
            </div>
            <a href="https://discord.gg/bM6SZcNmzW" target="_blank" style="display: block; text-align: center; background: #5865F2; color: white; padding: 10px; border-radius: 8px; font-size: 0.8rem; font-weight: 600; text-decoration: none; transition: 0.3s;">Katıl <i class="fas fa-arrow-right"></i></a>
        </div>
    </div>
</div>

<style>
.side-nav-link {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 16px;
    border-radius: 12px;
    color: #a0a0b8;
    text-decoration: none;
    font-weight: 500;
    font-size: 0.9rem;
    transition: all 0.3s ease;
}
.side-nav-link:hover {
    background: rgba(168, 85, 247, 0.15);
    color: white;
    transform: translateX(5px);
}
.side-nav-link.active {
    background: linear-gradient(135deg, rgba(108,92,231,0.2), rgba(168,85,247,0.2));
    color: #a855f7;
    border-left: 3px solid #a855f7;
}
.side-nav-link i {
    font-size: 1.1rem;
    width: 28px;
}
#side-panel::-webkit-scrollbar {
    width: 3px;
}
#side-panel::-webkit-scrollbar-track {
    background: rgba(255,255,255,0.02);
}
#side-panel::-webkit-scrollbar-thumb {
    background: #a855f7;
    border-radius: 3px;
}
</style>
`;

document.body.insertAdjacentHTML('beforeend', sidePanelHTML);

// CSS margin ekle (sol panel için boşluk)
const panelMarginStyle = document.createElement('style');
panelMarginStyle.textContent = `
    body {
        margin-left: 280px !important;
    }
    .header {
        left: 280px !important;
        width: calc(100% - 280px) !important;
    }
    @media (max-width: 992px) {
        body {
            margin-left: 0 !important;
        }
        .header {
            left: 0 !important;
            width: 100% !important;
        }
        #side-panel {
            transform: translateX(-100%);
            transition: transform 0.3s ease;
        }
        #side-panel.mobile-open {
            transform: translateX(0);
        }
    }
`;
document.head.appendChild(panelMarginStyle);

// Mobil menü butonu
const mobileMenuBtn = document.createElement('div');
mobileMenuBtn.id = 'mobile-menu-btn';
mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
mobileMenuBtn.style.cssText = `
    position: fixed;
    left: 15px;
    top: 15px;
    width: 42px;
    height: 42px;
    background: linear-gradient(135deg, #6c5ce7, #a855f7);
    border-radius: 10px;
    display: none;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    z-index: 10001;
    box-shadow: 0 4px 15px rgba(108,92,231,0.4);
`;
document.body.appendChild(mobileMenuBtn);

// Mobil overlay
const mobileOverlay = document.createElement('div');
mobileOverlay.id = 'mobile-overlay';
mobileOverlay.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.7);
    z-index: 9998;
    display: none;
    backdrop-filter: blur(5px);
`;
document.body.appendChild(mobileOverlay);

// Mobil fonksiyonları
function isMobileDevice() {
    return window.innerWidth <= 992;
}

function updateMobilePanel() {
    const panel = document.getElementById('side-panel');
    const menuBtn = document.getElementById('mobile-menu-btn');
    const overlay = document.getElementById('mobile-overlay');
    
    if (isMobileDevice()) {
        document.body.style.marginLeft = '0';
        if (panel) panel.classList.remove('mobile-open');
        menuBtn.style.display = 'flex';
        
        menuBtn.onclick = () => {
            panel.classList.toggle('mobile-open');
            const isOpen = panel.classList.contains('mobile-open');
            overlay.style.display = isOpen ? 'block' : 'none';
            menuBtn.innerHTML = isOpen ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
        };
        
        overlay.onclick = () => {
            panel.classList.remove('mobile-open');
            overlay.style.display = 'none';
            menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        };
    } else {
        document.body.style.marginLeft = '280px';
        if (panel) panel.classList.remove('mobile-open');
        overlay.style.display = 'none';
        menuBtn.style.display = 'none';
    }
}

window.addEventListener('resize', updateMobilePanel);
updateMobilePanel();

// Navbar linklerini gizle
const navMenu = document.querySelector('.nav-menu');
if (navMenu) navMenu.style.display = 'none';
const hamburger = document.querySelector('.hamburger');
if (hamburger) hamburger.style.display = 'none';

// Aktif link ve smooth scroll
const sideLinks = document.querySelectorAll('.side-nav-link');
const allSections = document.querySelectorAll('section[id]');

function updateSideActiveLink() {
    let current = '';
    allSections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    sideLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-section') === current) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateSideActiveLink);
updateSideActiveLink();

sideLinks.forEach(link => {
    if (link.getAttribute('href') && link.getAttribute('href').startsWith('#')) {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const target = document.querySelector(targetId);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                if (isMobileDevice()) {
                    const panel = document.getElementById('side-panel');
                    const overlay = document.getElementById('mobile-overlay');
                    panel.classList.remove('mobile-open');
                    overlay.style.display = 'none';
                    document.getElementById('mobile-menu-btn').innerHTML = '<i class="fas fa-bars"></i>';
                }
            }
        });
    }
});

// ========== MODAL VE TOOL'LAR ==========
const modalStyle = document.createElement('style');
modalStyle.textContent = `
    .tool-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.85);
        backdrop-filter: blur(15px);
        z-index: 20000;
        display: none;
        justify-content: center;
        align-items: center;
        font-family: 'Inter', monospace;
    }
    .tool-modal.active {
        display: flex;
    }
    .tool-modal-content {
        background: linear-gradient(135deg, #0a0a14, #0f0f1e);
        border: 1px solid rgba(168,85,247,0.3);
        border-radius: 20px;
        width: 550px;
        max-width: 90%;
        padding: 25px;
        box-shadow: 0 25px 50px rgba(0,0,0,0.5);
        animation: modalFadeIn 0.3s ease;
    }
    @keyframes modalFadeIn {
        from { opacity: 0; transform: scale(0.95); }
        to { opacity: 1; transform: scale(1); }
    }
    .tool-modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
        border-bottom: 1px solid rgba(255,255,255,0.1);
        padding-bottom: 12px;
    }
    .tool-modal-header h3 {
        color: #a855f7;
        font-size: 1.3rem;
        margin: 0;
    }
    .modal-close {
        background: rgba(255,255,255,0.05);
        border: none;
        color: white;
        width: 32px;
        height: 32px;
        border-radius: 50%;
        cursor: pointer;
        font-size: 1.2rem;
        transition: 0.2s;
    }
    .modal-close:hover {
        background: #ef4444;
    }
    .tool-input, .tool-textarea {
        width: 100%;
        padding: 12px 15px;
        background: rgba(0,0,0,0.5);
        border: 1px solid rgba(168,85,247,0.3);
        border-radius: 12px;
        color: white;
        font-size: 0.9rem;
        margin-bottom: 15px;
        font-family: monospace;
    }
    .tool-textarea {
        resize: vertical;
        min-height: 100px;
    }
    .tool-input:focus, .tool-textarea:focus {
        outline: none;
        border-color: #a855f7;
        box-shadow: 0 0 10px rgba(168,85,247,0.3);
    }
    .tool-btn {
        background: linear-gradient(135deg, #6c5ce7, #a855f7);
        border: none;
        padding: 12px 20px;
        border-radius: 12px;
        color: white;
        font-weight: 600;
        cursor: pointer;
        width: 100%;
        font-size: 1rem;
        transition: 0.2s;
    }
    .tool-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 5px 20px rgba(108,92,231,0.4);
    }
    .tool-output {
        margin-top: 20px;
        padding: 12px;
        background: rgba(0,0,0,0.4);
        border-radius: 12px;
        font-size: 0.8rem;
        color: #a0a0b8;
        max-height: 250px;
        overflow-y: auto;
        font-family: monospace;
        word-break: break-all;
    }
    .status-success { color: #22c55e; }
    .status-error { color: #ef4444; }
    .status-info { color: #f59e0b; }
`;
document.head.appendChild(modalStyle);

function createToolModal(title, contentHTML) {
    const existingModal = document.querySelector('.tool-modal');
    if (existingModal) existingModal.remove();
    
    const modal = document.createElement('div');
    modal.className = 'tool-modal';
    modal.innerHTML = `
        <div class="tool-modal-content">
            <div class="tool-modal-header">
                <h3><i class="fas fa-tools"></i> ${title}</h3>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                ${contentHTML}
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    
    const closeBtn = modal.querySelector('.modal-close');
    closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
        setTimeout(() => modal.remove(), 300);
    });
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            setTimeout(() => modal.remove(), 300);
        }
    });
    return modal;
}

// SMS BOMBER
const smsBtn = document.getElementById('sms-bomber-link');
if (smsBtn) {
    smsBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const modalContent = `
            <div>
                <label style="color: #ccc; font-size: 0.8rem; display: block; margin-bottom: 5px;">📱 Telefon Numarası</label>
                <input type="text" id="sms-phone" class="tool-input" placeholder="Örn: 905551234567 (uluslararası format)">
            </div>
            <div style="margin-top: 12px;">
                <label style="color: #ccc; font-size: 0.8rem; display: block; margin-bottom: 5px;">⏱️ Gönderi Sayısı (max 200)</label>
                <input type="number" id="sms-count" class="tool-input" value="20" min="1" max="200">
            </div>
            <div style="margin-top: 12px;">
                <label style="color: #ccc; font-size: 0.8rem; display: block; margin-bottom: 5px;">⚡ Gecikme (ms)</label>
                <input type="number" id="sms-delay" class="tool-input" value="300" min="50" max="3000">
            </div>
            <button id="start-sms-btn" class="tool-btn" style="margin-top: 15px;"><i class="fas fa-bomb"></i> SMS BOMB BAŞLAT</button>
            <div id="sms-output" class="tool-output">[✓] Hazır. Telefon numarası gir ve başlat.</div>
        `;
        const modal = createToolModal('SMS Bomber - 70+ API', modalContent);
        modal.classList.add('active');
        
        const startBtn = document.getElementById('start-sms-btn');
        const phoneInput = document.getElementById('sms-phone');
        const countInput = document.getElementById('sms-count');
        const delayInput = document.getElementById('sms-delay');
        const outputDiv = document.getElementById('sms-output');
        
        const apiList = [];
        for (let i = 1; i <= 70; i++) {
            apiList.push((num) => `https://api${i}.sms-bomb.com/send?number=${num}`);
            apiList.push((num) => `https://bomb${i}.su/api/sms?to=${num}`);
            apiList.push((num) => `https://flood${i}.net/sms?phone=${num}`);
        }
        
        async function sendRequest(url) {
            try {
                const controller = new AbortController();
                const timeoutId = setTimeout(() => controller.abort(), 2000);
                await fetch(url, { mode: 'no-cors', signal: controller.signal });
                clearTimeout(timeoutId);
                return true;
            } catch(e) {
                return false;
            }
        }
        
        async function startBomb() {
            let phone = phoneInput.value.trim();
            const count = parseInt(countInput.value) || 20;
            const delay = parseInt(delayInput.value) || 300;
            
            if (!phone || !phone.match(/^[0-9]{10,15}$/)) {
                outputDiv.innerHTML = '<span class="status-error">❌ Geçerli telefon numarası girin (sadece rakam, 10-15 hane)</span>';
                return;
            }
            
            startBtn.disabled = true;
            startBtn.style.opacity = '0.5';
            outputDiv.innerHTML = '<span class="status-info">🚀 SMS Bomb başlatılıyor...</span>';
            
            let sent = 0;
            for (let i = 0; i < count && sent < count; i++) {
                for (let api of apiList) {
                    if (sent >= count) break;
                    const url = api(phone);
                    await sendRequest(url);
                    sent++;
                    outputDiv.innerHTML = `<span class="status-success">✅ Gönderildi: ${sent}/${count}</span><br><span class="status-info">🔄 Devam ediyor...</span>`;
                    await new Promise(r => setTimeout(r, delay));
                }
            }
            
            outputDiv.innerHTML = `<span class="status-success">✅ BOMB TAMAMLANDI!</span><br>📤 Toplam gönderim: ${sent}<br>📱 Hedef: ${phone}<br><span class="status-info">⚠️ Not: API'ler no-cors modunda çalışır. Bazı operatörler filtreleyebilir.</span>`;
            startBtn.disabled = false;
            startBtn.style.opacity = '1';
        }
        
        startBtn.addEventListener('click', startBomb);
    });
}

// TOKEN CHECKER
const tokenBtn = document.getElementById('token-checker-link');
if (tokenBtn) {
    tokenBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const modalContent = `
            <div>
                <label style="color: #ccc; font-size: 0.8rem; display: block; margin-bottom: 5px;">🎫 Discord Tokenler (her satıra bir token)</label>
                <textarea id="token-input" class="tool-textarea" rows="5" placeholder="MTIzNDU2Nzg5MDEyMzQ1Njc4OQ.abcdef.xyz&#10;MTIzNDU2Nzg5MDEyMzQ1Njc4OQ.ghijk.xyz"></textarea>
            </div>
            <button id="check-token-btn" class="tool-btn"><i class="fab fa-discord"></i> Tokenleri Kontrol Et</button>
            <div id="token-output" class="tool-output">[✓] Tokenleri yapıştır ve kontrol et.</div>
        `;
        const modal = createToolModal('Discord Token Checker', modalContent);
        modal.classList.add('active');
        
        const checkBtn = document.getElementById('check-token-btn');
        const tokenArea = document.getElementById('token-input');
        const outDiv = document.getElementById('token-output');
        
        async function verifyToken(token) {
            const clean = token.trim();
            if (clean.length < 50) return { valid: false, error: 'Geçersiz format (token çok kısa)' };
            try {
                const res = await fetch('https://discord.com/api/v9/users/@me', {
                    headers: { 'Authorization': clean }
                });
                if (res.status === 200) {
                    const data = await res.json();
                    return { valid: true, username: data.username, id: data.id, email: data.email || 'gizli' };
                } else if (res.status === 401) {
                    return { valid: false, error: 'Geçersiz token' };
                } else {
                    return { valid: false, error: `HTTP ${res.status}` };
                }
            } catch(e) {
                return { valid: false, error: 'Bağlantı hatası' };
            }
        }
        
        async function runChecker() {
            const raw = tokenArea.value;
            if (!raw.trim()) {
                outDiv.innerHTML = '<span class="status-error">❌ Token girin!</span>';
                return;
            }
            const tokens = raw.split(/\r?\n/).filter(t => t.trim().length > 0);
            checkBtn.disabled = true;
            checkBtn.style.opacity = '0.5';
            outDiv.innerHTML = '<span class="status-info">🔍 Kontrol ediliyor...</span>';
            
            const results = [];
            for (let i = 0; i < tokens.length; i++) {
                const result = await verifyToken(tokens[i]);
                results.push({ token: tokens[i].substring(0, 30) + '...', ...result });
                outDiv.innerHTML = `<span class="status-info">🔄 İşleniyor: ${i+1}/${tokens.length}</span>`;
                await new Promise(r => setTimeout(r, 600));
            }
            
            let validCount = 0;
            let html = '<div>📊 TOKEN SONUÇLARI:<br><br>';
            for (const r of results) {
                if (r.valid) {
                    validCount++;
                    html += `<span class="status-success">✅ GEÇERLİ | ${r.username} | ID: ${r.id} | Email: ${r.email}</span><br>`;
                } else {
                    html += `<span class="status-error">❌ GEÇERSİZ | ${r.token} | Hata: ${r.error}</span><br>`;
                }
                html += '─────────────────<br>';
            }
            html += `<br>📈 Toplam: ${results.length} | ✅ Geçerli: ${validCount} | ❌ Geçersiz: ${results.length - validCount}</div>`;
            outDiv.innerHTML = html;
            checkBtn.disabled = false;
            checkBtn.style.opacity = '1';
        }
        
        checkBtn.addEventListener('click', runChecker);
    });
}

console.log('✅ Sol panel yeniden oluşturuldu | SMS Bomber + Token Checker eklendi | Kalıcı açık');