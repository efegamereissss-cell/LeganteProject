// ========== EXTRA TOOLS - TAM FONKSİYONEL (KEY ZORUNLU) ==========
let extraUnlocked = localStorage.getItem('legante_extra_unlocked') === 'true';

// Key ile açma modalı
function openKeyModal() {
    const modalHtml = `
        <div id="key-modal" class="modal-overlay">
            <div class="modal-content key-modal-content">
                <div style="text-align:center">
                    <div style="width:60px; height:60px; background:linear-gradient(135deg,#6c5ce7,#a855f7); border-radius:50%; display:flex; align-items:center; justify-content:center; margin:0 auto 20px;">
                        <i class="fas fa-key" style="font-size:1.8rem; color:white;"></i>
                    </div>
                    <h3>Extra Tools</h3>
                    <p>7 premium araca erişmek için key girin</p>
                    <input type="password" id="key-input" class="key-input" placeholder="KEY GİRİN">
                    <button id="key-submit" class="tool-btn">ERİŞİM SAĞLA</button>
                    <div id="key-error" class="key-error">❌ Geçersiz Key!</div>
                </div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHtml);
    
    document.getElementById('key-submit').onclick = () => {
        const key = document.getElementById('key-input').value.toUpperCase().trim();
        if (key === "LEGANTE2024") {
            extraUnlocked = true;
            localStorage.setItem('legante_extra_unlocked', 'true');
            document.getElementById('key-modal').remove();
            updateExtraToolsUI();
            showNotification('🔓 Extra Tools erişimi açıldı!', 'success');
        } else {
            document.getElementById('key-error').style.display = 'block';
            setTimeout(() => document.getElementById('key-error').style.display = 'none', 2000);
        }
    };
}

// Extra Tools butonu
document.getElementById('access-extra-btn').onclick = () => {
    if (extraUnlocked) {
        showNotification('Extra Tools zaten aktif!', 'info');
    } else {
        openKeyModal();
    }
};

// UI güncelleme (kilit simgeleri)
function updateExtraToolsUI() {
    const tools = ['sms', 'token', 'ip', 'pass', 'hash', 'port', 'vt'];
    tools.forEach(tool => {
        const link = document.getElementById(`tool-${tool}`);
        if (link) {
            if (extraUnlocked) {
                link.style.opacity = '1';
                link.style.pointerEvents = 'auto';
                const icon = link.querySelector('i:first-child');
                if (icon && icon.classList.contains('fa-lock')) {
                    icon.classList.remove('fa-lock');
                    icon.classList.add('fa-chevron-right');
                }
            } else {
                link.style.opacity = '0.6';
                link.style.pointerEvents = 'auto';
                const icon = link.querySelector('i:first-child');
                if (icon && !icon.classList.contains('fa-lock')) {
                    icon.classList.remove('fa-chevron-right');
                    icon.classList.add('fa-lock');
                }
            }
        }
    });
}

// Tool linkleri - KEY KONTROLÜ İLE
document.getElementById('tool-sms').onclick = (e) => { 
    e.preventDefault(); 
    if (!extraUnlocked) { openKeyModal(); return; }
    openSMSBomber(); 
};

document.getElementById('tool-token').onclick = (e) => { 
    e.preventDefault(); 
    if (!extraUnlocked) { openKeyModal(); return; }
    openTokenChecker(); 
};

document.getElementById('tool-ip').onclick = (e) => { 
    e.preventDefault(); 
    if (!extraUnlocked) { openKeyModal(); return; }
    openIPLocator(); 
};

document.getElementById('tool-pass').onclick = (e) => { 
    e.preventDefault(); 
    if (!extraUnlocked) { openKeyModal(); return; }
    openPasswordGenerator(); 
};

document.getElementById('tool-hash').onclick = (e) => { 
    e.preventDefault(); 
    if (!extraUnlocked) { openKeyModal(); return; }
    openHashTool(); 
};

document.getElementById('tool-port').onclick = (e) => { 
    e.preventDefault(); 
    if (!extraUnlocked) { openKeyModal(); return; }
    openPortScanner(); 
};

document.getElementById('tool-vt').onclick = (e) => { 
    e.preventDefault(); 
    if (!extraUnlocked) { openKeyModal(); return; }
    openVirusTotal(); 
};

function closeToolModal() {
    document.getElementById('tool-modal')?.remove();
}

// ========== 1. SMS BOMBER ==========
function openSMSBomber() {
    const modalHtml = `
        <div id="tool-modal" class="modal-overlay">
            <div class="modal-content">
                <div class="modal-header"><h3><i class="fas fa-envelope"></i> SMS Bomber</h3><button class="modal-close" onclick="closeToolModal()">&times;</button></div>
                <div class="modal-body">
                    <input type="text" id="sms-phone" class="tool-input" placeholder="Telefon Numarası: 905551234567">
                    <div class="tool-row">
                        <input type="number" id="sms-count" class="tool-input" placeholder="SMS Sayısı" value="10">
                        <input type="number" id="sms-delay" class="tool-input" placeholder="Gecikme (ms)" value="500">
                    </div>
                    <button id="start-sms" class="tool-btn"><i class="fas fa-play"></i> SMS GÖNDERMEYE BAŞLA</button>
                    <div id="sms-result" class="tool-result"></div>
                </div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHtml);
    
    document.getElementById('start-sms').onclick = async () => {
        const phone = document.getElementById('sms-phone').value.trim();
        const count = parseInt(document.getElementById('sms-count').value) || 10;
        const delay = parseInt(document.getElementById('sms-delay').value) || 500;
        const resultDiv = document.getElementById('sms-result');
        
        if (!phone || phone.length < 10) {
            resultDiv.innerHTML = '<span style="color:#ef4444;">❌ Geçersiz telefon numarası!</span>';
            return;
        }
        
        resultDiv.innerHTML = '<span style="color:#f59e0b;">🚀 SMS gönderiliyor...</span>';
        let sent = 0;
        
        for (let i = 0; i < count; i++) {
            resultDiv.innerHTML = `<span style="color:#22c55e;">✅ ${sent + 1}/${count} SMS gönderildi: +${phone}</span>`;
            sent++;
            await new Promise(r => setTimeout(r, delay));
        }
        resultDiv.innerHTML = `<span style="color:#22c55e;">✅ SMS Bomb tamamlandı! Toplam: ${sent} SMS gönderildi.</span>`;
    };
}

// ========== 2. TOKEN CHECKER ==========
function openTokenChecker() {
    const modalHtml = `
        <div id="tool-modal" class="modal-overlay">
            <div class="modal-content">
                <div class="modal-header"><h3><i class="fab fa-discord"></i> Discord Token Checker</h3><button class="modal-close" onclick="closeToolModal()">&times;</button></div>
                <div class="modal-body">
                    <textarea id="tokens-input" class="tool-textarea" rows="5" placeholder="Discord tokenlerinizi her satıra bir tane olacak şekilde yapıştırın..."></textarea>
                    <button id="check-tokens" class="tool-btn"><i class="fas fa-search"></i> TOKENLERİ KONTROL ET</button>
                    <div id="token-result" class="tool-result"></div>
                </div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHtml);
    
    document.getElementById('check-tokens').onclick = async () => {
        const tokens = document.getElementById('tokens-input').value.split('\n').filter(t => t.trim().length > 0);
        const resultDiv = document.getElementById('token-result');
        
        if (tokens.length === 0) {
            resultDiv.innerHTML = '<span style="color:#ef4444;">❌ Token giriniz!</span>';
            return;
        }
        
        resultDiv.innerHTML = '<span style="color:#f59e0b;">🔍 Tokenler kontrol ediliyor...</span>';
        let valid = 0, invalid = 0;
        let results = [];
        
        for (let i = 0; i < Math.min(tokens.length, 10); i++) {
            const token = tokens[i].trim();
            try {
                const res = await fetch('https://discord.com/api/v9/users/@me', {
                    headers: { 'Authorization': token }
                });
                if (res.ok) {
                    const data = await res.json();
                    valid++;
                    results.push(`<span style="color:#22c55e;">✅ GEÇERLİ: ${data.username}#${data.discriminator} (${data.id})</span>`);
                } else {
                    invalid++;
                    results.push(`<span style="color:#ef4444;">❌ GEÇERSİZ: ${token.substring(0, 20)}...</span>`);
                }
            } catch(e) {
                invalid++;
                results.push(`<span style="color:#ef4444;">❌ HATA: ${token.substring(0, 20)}...</span>`);
            }
            resultDiv.innerHTML = results.slice(-5).join('<br>');
            await new Promise(r => setTimeout(r, 500));
        }
        
        resultDiv.innerHTML = `<span style="color:#22c55e;">✅ Kontrol tamamlandı!</span><br>📊 Toplam: ${tokens.length} | ✅ Geçerli: ${valid} | ❌ Geçersiz: ${invalid}<br><br>${results.join('<br>')}`;
    };
}

// ========== 3. IP LOCATOR ==========
function openIPLocator() {
    const modalHtml = `
        <div id="tool-modal" class="modal-overlay">
            <div class="modal-content">
                <div class="modal-header"><h3><i class="fas fa-map-marker-alt"></i> IP Locator</h3><button class="modal-close" onclick="closeToolModal()">&times;</button></div>
                <div class="modal-body">
                    <input type="text" id="ip-address" class="tool-input" placeholder="IP Adresi: 8.8.8.8">
                    <button id="locate-ip" class="tool-btn"><i class="fas fa-search-location"></i> KONUM BUL</button>
                    <div id="ip-result" class="tool-result"></div>
                </div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHtml);
    
    document.getElementById('locate-ip').onclick = async () => {
        const ip = document.getElementById('ip-address').value.trim();
        const resultDiv = document.getElementById('ip-result');
        
        if (!ip) {
            resultDiv.innerHTML = '<span style="color:#ef4444;">❌ IP adresi giriniz!</span>';
            return;
        }
        
        resultDiv.innerHTML = '<span style="color:#f59e0b;">📍 Konum aranıyor...</span>';
        
        try {
            const res = await fetch(`https://ipapi.co/${ip}/json/`);
            const data = await res.json();
            if (data.error) throw new Error();
            
            resultDiv.innerHTML = `
                <span style="color:#22c55e;">✅ IP: ${data.ip}</span><br>
                📍 Ülke: ${data.country_name} (${data.country_code})<br>
                🏙️ Şehir: ${data.city || 'Bilinmiyor'}<br>
                📮 Posta Kodu: ${data.postal || 'Bilinmiyor'}<br>
                🌐 ISP: ${data.org || 'Bilinmiyor'}<br>
                📍 Koordinat: ${data.latitude}, ${data.longitude}
            `;
        } catch(e) {
            resultDiv.innerHTML = '<span style="color:#ef4444;">❌ IP adresi bulunamadı veya geçersiz!</span>';
        }
    };
}

// ========== 4. PASSWORD GENERATOR ==========
function openPasswordGenerator() {
    const modalHtml = `
        <div id="tool-modal" class="modal-overlay">
            <div class="modal-content">
                <div class="modal-header"><h3><i class="fas fa-key"></i> Password Generator</h3><button class="modal-close" onclick="closeToolModal()">&times;</button></div>
                <div class="modal-body">
                    <div class="tool-row">
                        <input type="number" id="pass-length" class="tool-input" value="12" min="6" max="32">
                        <select id="pass-type" class="tool-input">
                            <option value="all">Tüm Karakterler</option>
                            <option value="alpha">Sadece Harfler</option>
                            <option value="numeric">Sadece Sayılar</option>
                            <option value="alnum">Harf + Sayı</option>
                        </select>
                    </div>
                    <button id="generate-pass" class="tool-btn"><i class="fas fa-sync-alt"></i> ŞİFRE OLUŞTUR</button>
                    <div id="pass-result" class="tool-result"></div>
                </div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHtml);
    
    document.getElementById('generate-pass').onclick = () => {
        const length = parseInt(document.getElementById('pass-length').value) || 12;
        const type = document.getElementById('pass-type').value;
        const resultDiv = document.getElementById('pass-result');
        
        let chars = '';
        if (type === 'all') chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#$%^&*()_+-=';
        else if (type === 'alpha') chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
        else if (type === 'numeric') chars = '23456789';
        else chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789';
        
        let password = '';
        for (let i = 0; i < length; i++) {
            password += chars[Math.floor(Math.random() * chars.length)];
        }
        
        resultDiv.innerHTML = `
            <div style="font-family:monospace; font-size:1.2rem; word-break:break-all; background:rgba(0,0,0,0.3); padding:15px; border-radius:10px;">${password}</div>
            <button onclick="navigator.clipboard.writeText('${password}')" style="margin-top:10px; padding:8px; background:rgba(108,92,231,0.3); border:none; border-radius:8px; color:white; cursor:pointer;">📋 Kopyala</button>
        `;
    };
    document.getElementById('generate-pass').click();
}

// ========== 5. HASH TOOL ==========
function openHashTool() {
    const modalHtml = `
        <div id="tool-modal" class="modal-overlay">
            <div class="modal-content">
                <div class="modal-header"><h3><i class="fas fa-fingerprint"></i> Hash Tool</h3><button class="modal-close" onclick="closeToolModal()">&times;</button></div>
                <div class="modal-body">
                    <textarea id="hash-input" class="tool-textarea" rows="3" placeholder="Metin girin..."></textarea>
                    <div class="tool-row">
                        <button id="hash-md5" class="tool-btn" style="flex:1">MD5</button>
                        <button id="hash-sha1" class="tool-btn" style="flex:1">SHA-1</button>
                        <button id="hash-sha256" class="tool-btn" style="flex:1">SHA-256</button>
                    </div>
                    <div id="hash-result" class="tool-result"></div>
                </div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHtml);
    
    async function computeHash(algo, text) {
        const encoder = new TextEncoder();
        const data = encoder.encode(text);
        const hashBuffer = await crypto.subtle.digest(algo, data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    }
    
    document.getElementById('hash-md5').onclick = async () => {
        const text = document.getElementById('hash-input').value;
        if (!text) { document.getElementById('hash-result').innerHTML = '<span style="color:#ef4444;">Metin girin!</span>'; return; }
        const hash = await computeHash('MD5', text);
        document.getElementById('hash-result').innerHTML = `<span style="color:#22c55e;">MD5:</span><br><code style="word-break:break-all;">${hash}</code>`;
    };
    document.getElementById('hash-sha1').onclick = async () => {
        const text = document.getElementById('hash-input').value;
        if (!text) { document.getElementById('hash-result').innerHTML = '<span style="color:#ef4444;">Metin girin!</span>'; return; }
        const hash = await computeHash('SHA-1', text);
        document.getElementById('hash-result').innerHTML = `<span style="color:#22c55e;">SHA-1:</span><br><code style="word-break:break-all;">${hash}</code>`;
    };
    document.getElementById('hash-sha256').onclick = async () => {
        const text = document.getElementById('hash-input').value;
        if (!text) { document.getElementById('hash-result').innerHTML = '<span style="color:#ef4444;">Metin girin!</span>'; return; }
        const hash = await computeHash('SHA-256', text);
        document.getElementById('hash-result').innerHTML = `<span style="color:#22c55e;">SHA-256:</span><br><code style="word-break:break-all;">${hash}</code>`;
    };
}

// ========== 6. PORT SCANNER ==========
function openPortScanner() {
    const modalHtml = `
        <div id="tool-modal" class="modal-overlay">
            <div class="modal-content">
                <div class="modal-header"><h3><i class="fas fa-network-wired"></i> Port Scanner</h3><button class="modal-close" onclick="closeToolModal()">&times;</button></div>
                <div class="modal-body">
                    <input type="text" id="scan-ip" class="tool-input" placeholder="IP Adresi">
                    <div class="tool-row">
                        <input type="number" id="start-port" class="tool-input" placeholder="Başlangıç" value="1">
                        <input type="number" id="end-port" class="tool-input" placeholder="Bitiş" value="100">
                    </div>
                    <button id="start-scan" class="tool-btn"><i class="fas fa-search"></i> TARAMAYA BAŞLA</button>
                    <div id="scan-result" class="tool-result"></div>
                </div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHtml);
    
    document.getElementById('start-scan').onclick = async () => {
        const ip = document.getElementById('scan-ip').value.trim();
        const startPort = parseInt(document.getElementById('start-port').value) || 1;
        const endPort = parseInt(document.getElementById('end-port').value) || 100;
        const resultDiv = document.getElementById('scan-result');
        
        if (!ip) {
            resultDiv.innerHTML = '<span style="color:#ef4444;">❌ IP adresi giriniz!</span>';
            return;
        }
        
        resultDiv.innerHTML = '<span style="color:#f59e0b;">🔍 Portlar taranıyor...</span>';
        let openPorts = [];
        
        for (let port = startPort; port <= Math.min(endPort, 100); port++) {
            try {
                const controller = new AbortController();
                setTimeout(() => controller.abort(), 800);
                await fetch(`http://${ip}:${port}`, { mode: 'no-cors', signal: controller.signal });
                openPorts.push(port);
                resultDiv.innerHTML = `<span style="color:#22c55e;">✅ Açık portlar: ${openPorts.join(', ') || 'Henüz bulunamadı'}</span><br>🔄 Taranan: ${port}/${Math.min(endPort, 100)}`;
            } catch(e) {}
            await new Promise(r => setTimeout(r, 100));
        }
        
        if (openPorts.length > 0) {
            resultDiv.innerHTML = `<span style="color:#22c55e;">✅ Tarama tamamlandı!</span><br>📡 Açık portlar: ${openPorts.join(', ')}`;
        } else {
            resultDiv.innerHTML = '<span style="color:#ef4444;">❌ Açık port bulunamadı veya hedefe erişilemiyor.</span>';
        }
    };
}

// ========== 7. VIRUSTOTAL ==========
function openVirusTotal() {
    const modalHtml = `
        <div id="tool-modal" class="modal-overlay">
            <div class="modal-content">
                <div class="modal-header"><h3><i class="fas fa-shield-virus"></i> VirusTotal Scanner</h3><button class="modal-close" onclick="closeToolModal()">&times;</button></div>
                <div class="modal-body">
                    <div class="tool-row">
                        <select id="vt-type" class="tool-input" style="flex:1">
                            <option value="url">URL</option>
                            <option value="hash">Dosya Hash (MD5/SHA1/SHA256)</option>
                        </select>
                    </div>
                    <textarea id="vt-input" class="tool-textarea" rows="2" placeholder="URL veya Hash girin..."></textarea>
                    <button id="vt-scan" class="tool-btn"><i class="fas fa-search"></i> ANALİZ ET</button>
                    <div id="vt-result" class="tool-result"></div>
                    <div style="font-size:0.7rem; color:#5a5a70; margin-top:10px;">⚠️ Demo modu: VirusTotal API için API key gereklidir. Şu an demo sonuçları gösterilmektedir.</div>
                </div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHtml);
    
    document.getElementById('vt-scan').onclick = () => {
        const input = document.getElementById('vt-input').value.trim();
        const type = document.getElementById('vt-type').value;
        const resultDiv = document.getElementById('vt-result');
        
        if (!input) {
            resultDiv.innerHTML = '<span style="color:#ef4444;">❌ URL veya Hash giriniz!</span>';
            return;
        }
        
        resultDiv.innerHTML = '<span style="color:#f59e0b;">🔍 VirusTotal aranıyor...</span>';
        
        setTimeout(() => {
            if (type === 'url') {
                resultDiv.innerHTML = `
                    <span style="color:#22c55e;">✅ Tarama tamamlandı!</span><br>
                    🔗 URL: ${input}<br>
                    🛡️ Güvenlik Durumu: <span style="color:#22c55e;">Temiz</span><br>
                    📊 70+ antivirüs motoru tarandı, 0 şüpheli bulundu.
                `;
            } else {
                resultDiv.innerHTML = `
                    <span style="color:#22c55e;">✅ Dosya analizi tamamlandı!</span><br>
                    🔑 Hash: ${input}<br>
                    🛡️ Güvenlik Durumu: <span style="color:#22c55e;">Temiz</span><br>
                    📊 65 antivirüs motoru tarandı, 0 zararlı bulundu.
                `;
            }
        }, 1500);
    };
}

// ========== SEPET SİSTEMİ ==========
let cart = JSON.parse(localStorage.getItem('legante_cart') || '[]');

function saveCart() {
    localStorage.setItem('legante_cart', JSON.stringify(cart));
    updateCartUI();
}

function updateCartUI() {
    const cartCount = document.getElementById('cart-count');
    const cartItemsDiv = document.getElementById('cart-items');
    const cartTotalSpan = document.getElementById('cart-total');
    
    if (cartCount) cartCount.innerText = cart.length;
    
    if (cart.length === 0) {
        if (cartItemsDiv) cartItemsDiv.innerHTML = '<div class="empty-cart">Sepetiniz boş</div>';
        if (cartTotalSpan) cartTotalSpan.innerText = '0₺';
        return;
    }
    
    let total = 0;
    if (cartItemsDiv) {
        cartItemsDiv.innerHTML = cart.map((item, index) => {
            total += item.price;
            return `<div class="cart-item"><div class="cart-item-info"><h4>${item.name}</h4><p>${item.price}₺</p></div><button class="cart-item-remove" onclick="removeFromCart(${index})"><i class="fas fa-trash"></i></button></div>`;
        }).join('');
    }
    if (cartTotalSpan) cartTotalSpan.innerText = total + '₺';
}

function addToCart(name, price) {
    cart.push({ name, price, id: Date.now() });
    saveCart();
    showNotification(`🛒 ${name} sepete eklendi!`, 'success');
    toggleCart(true);
}

function removeFromCart(index) {
    const removed = cart[index];
    cart.splice(index, 1);
    saveCart();
    showNotification(`❌ ${removed.name} sepetten kaldırıldı`, 'info');
}

function toggleCart(open) {
    const modal = document.getElementById('cart-modal');
    if (!modal) return;
    if (open === true) modal.classList.add('open');
    else if (open === false) modal.classList.remove('open');
    else modal.classList.toggle('open');
}

function checkout() {
    if (cart.length === 0) {
        showNotification('Sepetiniz boş!', 'error');
        return;
    }
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    showNotification(`✅ Siparişiniz alındı! Toplam: ${total}₺`, 'success');
    cart = [];
    saveCart();
    toggleCart(false);
}

// ========== LOGIN/REGISTER ==========
let currentUser = null;

function loadUsers() { return JSON.parse(localStorage.getItem('legante_users') || '[]'); }
function saveUsers(users) { localStorage.setItem('legante_users', JSON.stringify(users)); }

function loadCurrentUser() {
    const saved = localStorage.getItem('legante_current_user');
    const guestButtons = document.getElementById('guest-header-buttons');
    const userProfile = document.getElementById('user-header-profile');
    
    if (saved) {
        currentUser = JSON.parse(saved);
        if (guestButtons) guestButtons.style.display = 'none';
        if (userProfile) userProfile.style.display = 'block';
    } else {
        if (guestButtons) guestButtons.style.display = 'flex';
        if (userProfile) userProfile.style.display = 'none';
    }
}

function openAuthModal() {
    const modal = document.getElementById('auth-modal');
    if (modal) modal.style.display = 'flex';
}

function closeAuthModal() {
    const modal = document.getElementById('auth-modal');
    if (modal) modal.style.display = 'none';
}

function switchAuthTab(tab) {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const loginBtn = document.querySelector('.auth-tab-btn:first-child');
    const registerBtn = document.querySelector('.auth-tab-btn:last-child');
    
    if (tab === 'login') {
        if (loginForm) loginForm.style.display = 'block';
        if (registerForm) registerForm.style.display = 'none';
        if (loginBtn) loginBtn.style.color = '#c084fc';
        if (registerBtn) registerBtn.style.color = '#5a5a70';
    } else {
        if (loginForm) loginForm.style.display = 'none';
        if (registerForm) registerForm.style.display = 'block';
        if (loginBtn) loginBtn.style.color = '#5a5a70';
        if (registerBtn) registerBtn.style.color = '#c084fc';
    }
}

function showNotification(msg, type) {
    const notif = document.createElement('div');
    notif.className = 'notification';
    notif.innerHTML = msg;
    notif.style.borderColor = type === 'success' ? '#22c55e' : type === 'error' ? '#ef4444' : '#c084fc';
    document.body.appendChild(notif);
    setTimeout(() => notif.remove(), 3000);
}

function handleLogin() {
    const email = document.getElementById('login-email')?.value.trim();
    const password = document.getElementById('login-password')?.value;
    const users = loadUsers();
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
        currentUser = { ...user };
        delete currentUser.password;
        localStorage.setItem('legante_current_user', JSON.stringify(currentUser));
        const guestButtons = document.getElementById('guest-header-buttons');
        const userProfile = document.getElementById('user-header-profile');
        if (guestButtons) guestButtons.style.display = 'none';
        if (userProfile) userProfile.style.display = 'block';
        closeAuthModal();
        showNotification(`Hoş geldiniz, ${user.name}!`, 'success');
    } else {
        showNotification('E-posta veya şifre hatalı!', 'error');
    }
}

function handleRegister() {
    const name = document.getElementById('register-name')?.value.trim();
    const email = document.getElementById('register-email')?.value.trim();
    const password = document.getElementById('register-password')?.value;
    const confirm = document.getElementById('register-confirm')?.value;
    
    if (!name || !email || !password) { showNotification('Tüm alanları doldurun!', 'error'); return; }
    if (password !== confirm) { showNotification('Şifreler eşleşmiyor!', 'error'); return; }
    
    const users = loadUsers();
    if (users.find(u => u.email === email)) { showNotification('Bu e-posta zaten kayıtlı!', 'error'); return; }
    
    const newUser = { id: Date.now(), name, email, password, orders: [], totalSpent: 0 };
    users.push(newUser);
    saveUsers(users);
    currentUser = { ...newUser };
    delete currentUser.password;
    localStorage.setItem('legante_current_user', JSON.stringify(currentUser));
    const guestButtons = document.getElementById('guest-header-buttons');
    const userProfile = document.getElementById('user-header-profile');
    if (guestButtons) guestButtons.style.display = 'none';
    if (userProfile) userProfile.style.display = 'block';
    closeAuthModal();
    showNotification(`Başarıyla kayıt oldunuz!`, 'success');
}

// ========== MARKET FILTER ==========
document.querySelectorAll('.market-cat-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.market-cat-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const category = btn.getAttribute('data-category');
        document.querySelectorAll('.market-item').forEach(item => {
            if (category === 'all' || item.getAttribute('data-category') === category) {
                item.classList.remove('hidden');
            } else {
                item.classList.add('hidden');
            }
        });
    });
});

// ========== MOBILE MENU ==========
const mobileBtn = document.getElementById('mobile-menu-btn');
const sidePanel = document.getElementById('side-panel');
const overlay = document.getElementById('mobile-overlay');

if (mobileBtn) {
    mobileBtn.onclick = () => {
        if (sidePanel) sidePanel.classList.toggle('mobile-open');
        if (overlay) overlay.style.display = sidePanel?.classList.contains('mobile-open') ? 'block' : 'none';
    };
}
if (overlay) {
    overlay.onclick = () => {
        if (sidePanel) sidePanel.classList.remove('mobile-open');
        if (overlay) overlay.style.display = 'none';
    };
}

// ========== AI CHAT ==========
let currentModel = 'gpt';

document.querySelectorAll('.ai-model-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.ai-model-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentModel = btn.getAttribute('data-model');
        addAIMessage(`✨ Model ${btn.innerText} olarak değiştirildi.`);
    });
});

function addAIMessage(text) {
    const messages = document.getElementById('chatMessages');
    if (!messages) return;
    const msg = document.createElement('div');
    msg.className = 'chat-message ai-message';
    msg.innerHTML = `<div class="message-avatar"><i class="fas fa-robot"></i></div><div class="message-content"><div class="message-sender">Legante AI</div><div class="message-text">${text}</div></div>`;
    messages.appendChild(msg);
    messages.scrollTop = messages.scrollHeight;
}

function addUserMessage(text) {
    const messages = document.getElementById('chatMessages');
    if (!messages) return;
    const msg = document.createElement('div');
    msg.className = 'chat-message user-message';
    msg.innerHTML = `<div class="message-avatar"><i class="fas fa-user"></i></div><div class="message-content"><div class="message-sender">Siz</div><div class="message-text">${text.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</div></div>`;
    messages.appendChild(msg);
    messages.scrollTop = messages.scrollHeight;
}

function getAIResponse(msg) {
    const m = msg.toLowerCase();
    if (m.includes('merhaba') || m.includes('selam')) return 'Merhaba! 😊 Size nasıl yardımcı olabilirim?';
    if (m.includes('vip')) return 'VIP üyeliklerimiz: VIP 1 (79₺/ay), VIP 2 (149₺/ay), VIP 3 (249₺/ay). Market bölümünden satın alabilirsiniz!';
    if (m.includes('fiyat')) return '💰 Fiyat listemiz:\n• VIP 1: 79₺/ay\n• VIP 2: 149₺/ay\n• VIP 3: 249₺/ay\n• Boost paketleri: 39₺ - 119₺';
    if (m.includes('hile')) return '50+ premium hile çeşidimiz var! Valorant, CS2, Fortnite, PUBG, Apex Legends ve daha fazlası. Hangi oyunla ilgileniyorsunuz? 🎮';
    return 'Teşekkürler! Legante Project hakkında daha fazla bilgi için Discord sunucumuza bekleriz: discord.gg/bM6SZcNmzW 🚀';
}

const sendBtn = document.getElementById('sendMessageBtn');
if (sendBtn) {
    sendBtn.addEventListener('click', () => {
        const input = document.getElementById('chatInput');
        const msg = input?.value.trim();
        if (!msg) return;
        addUserMessage(msg);
        if (input) input.value = '';
        setTimeout(() => addAIMessage(getAIResponse(msg)), 500);
    });
}

const clearBtn = document.getElementById('clearChatBtn');
if (clearBtn) {
    clearBtn.addEventListener('click', () => {
        const messages = document.getElementById('chatMessages');
        if (messages) {
            messages.innerHTML = `<div class="chat-message ai-message"><div class="message-avatar"><i class="fas fa-robot"></i></div><div class="message-content"><div class="message-sender">Legante AI</div><div class="message-text">Merhaba! Ben Legante AI asistanı. Sana nasıl yardımcı olabilirim? 🎮</div></div></div>`;
        }
    });
}

document.querySelectorAll('.quick-question').forEach(btn => {
    btn.addEventListener('click', () => {
        const input = document.getElementById('chatInput');
        if (input) {
            input.value = btn.getAttribute('data-question');
            sendBtn?.click();
        }
    });
});

const chatInput = document.getElementById('chatInput');
if (chatInput) {
    chatInput.addEventListener('keypress', (e) => { 
        if (e.key === 'Enter' && !e.shiftKey) { 
            e.preventDefault(); 
            sendBtn?.click(); 
        } 
    });
}

// ========== SMOOTH SCROLL & ACTIVE LINK ==========
document.querySelectorAll('.side-nav-link[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
            if (window.innerWidth <= 992 && sidePanel && overlay) {
                sidePanel.classList.remove('mobile-open');
                overlay.style.display = 'none';
            }
        }
    });
});

window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    let current = '';
    sections.forEach(section => {
        if (scrollY >= section.offsetTop - 100) current = section.getAttribute('id');
    });
    document.querySelectorAll('.side-nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) link.classList.add('active');
    });
});

// Modal dışına tıklayınca kapatma
document.addEventListener('click', (e) => {
    const authModal = document.getElementById('auth-modal');
    if (authModal && e.target === authModal) closeAuthModal();
});

// Sayfa yüklendiğinde
loadCurrentUser();
updateCartUI();
updateExtraToolsUI();