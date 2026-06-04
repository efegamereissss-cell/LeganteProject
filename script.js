// ========== PARTICLE SYSTEM ==========
const particlesContainer = document.querySelector('.particles');
if (particlesContainer) {
    for (let i = 0; i < 60; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        const size = Math.random() * 3 + 1;
        const duration = Math.random() * 20 + 10;
        const delay = Math.random() * 10;
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: rgba(168, 85, 247, ${Math.random() * 0.5 + 0.2});
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: particleFloat ${duration}s ${delay}s linear infinite;
            box-shadow: 0 0 ${size * 3}px rgba(168, 85, 247, 0.5);
        `;
        particlesContainer.appendChild(particle);
    }
}

const particleStyle = document.createElement('style');
particleStyle.textContent = `
    @keyframes particleFloat {
        0% { transform: translateY(100vh) scale(0); opacity: 0; }
        10% { opacity: 1; }
        90% { opacity: 1; }
        100% { transform: translateY(-100px) scale(1); opacity: 0; }
    }
`;
document.head.appendChild(particleStyle);

// ========== CUSTOM CURSOR ==========
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');
let mouseX = -100, mouseY = -100, followerX = -100, followerY = -100;

if (cursor && cursorFollower) {
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
        cursor.style.opacity = '1';
        cursorFollower.style.opacity = '1';
    });

    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
        cursorFollower.style.opacity = '0';
    });

    function animateFollower() {
        followerX += (mouseX - followerX) * 0.15;
        followerY += (mouseY - followerY) * 0.15;
        cursorFollower.style.left = followerX + 'px';
        cursorFollower.style.top = followerY + 'px';
        requestAnimationFrame(animateFollower);
    }
    animateFollower();

    document.addEventListener('mousedown', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(0.7)';
        cursorFollower.style.transform = 'translate(-50%, -50%) scale(0.7)';
    });
    document.addEventListener('mouseup', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
    });

    const hoverElements = document.querySelectorAll('a, button, .btn, .feature-card, .pricing-card, .market-item');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorFollower.style.width = '50px';
            cursorFollower.style.height = '50px';
            cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
        });
        el.addEventListener('mouseleave', () => {
            cursorFollower.style.width = '35px';
            cursorFollower.style.height = '35px';
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        });
    });
}

// ========== MOBILE MENU ==========
const sidePanel = document.getElementById('side-panel');
const mobileBtn = document.getElementById('mobile-menu-btn');
const overlay = document.getElementById('mobile-overlay');

function isMobile() { return window.innerWidth <= 992; }

function updateMobileMenu() {
    if (isMobile()) {
        document.body.style.marginLeft = '0';
        if (mobileBtn) mobileBtn.style.display = 'flex';
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
    } else {
        document.body.style.marginLeft = '280px';
        if (sidePanel) sidePanel.classList.remove('mobile-open');
        if (overlay) overlay.style.display = 'none';
        if (mobileBtn) mobileBtn.style.display = 'none';
    }
}
window.addEventListener('resize', updateMobileMenu);
updateMobileMenu();

// ========== SMOOTH SCROLL & ACTIVE LINK ==========
const navLinks = document.querySelectorAll('.side-nav-link');
const sections = document.querySelectorAll('section[id]');

function updateActiveLink() {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-section') === current) {
            link.classList.add('active');
        }
    });
}
window.addEventListener('scroll', updateActiveLink);
updateActiveLink();

document.querySelectorAll('.side-nav-link[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            if (isMobile()) {
                if (sidePanel) sidePanel.classList.remove('mobile-open');
                if (overlay) overlay.style.display = 'none';
            }
        }
    });
});

// ========== MARKET FILTER ==========
const categoryBtns = document.querySelectorAll('.market-cat-btn');
const marketItems = document.querySelectorAll('.market-item');
categoryBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        categoryBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const category = btn.getAttribute('data-category');
        marketItems.forEach(item => {
            if (category === 'all' || item.getAttribute('data-category') === category) {
                item.classList.remove('hidden');
            } else {
                item.classList.add('hidden');
            }
        });
    });
});

// ========== EXTRA TOOLS ==========
let unlocked = false;
const MASTER_KEYS = ["LEGANTE2024", "VIPACCESS", "SMSBOOM69", "TOKENCHECK2024", "LEGANTEPRO", "FREETOOLS"];

const smsLink = document.getElementById('sms-bomber-link');
const tokenLink = document.getElementById('token-checker-link');
const ipLink = document.getElementById('ip-locator-link');
const passLink = document.getElementById('pass-gen-link');
const hashLink = document.getElementById('hash-tool-link');
const portLink = document.getElementById('port-scan-link');
const vtExtraLink = document.getElementById('virustotal-extra-link');
const accessBtn = document.getElementById('access-extra-btn');

function updateExtraToolsUI() {
    const tools = [smsLink, tokenLink, ipLink, passLink, hashLink, portLink, vtExtraLink];
    tools.forEach(tool => {
        if (tool) {
            if (unlocked) {
                tool.style.opacity = '1';
                tool.style.pointerEvents = 'auto';
                tool.classList.remove('locked');
                const icon = tool.querySelector('i:first-child');
                if (icon && icon.className.includes('fa-lock')) icon.className = 'fas fa-chevron-right';
                const span = tool.querySelector('span');
                if (span) span.innerText = span.innerText.replace(' (Kilitli)', '');
            } else {
                tool.style.opacity = '0.5';
                tool.style.pointerEvents = 'none';
                tool.classList.add('locked');
                const icon = tool.querySelector('i:first-child');
                if (icon && !icon.className.includes('fa-lock')) icon.className = 'fas fa-lock';
                const span = tool.querySelector('span');
                if (span && !span.innerText.includes('(Kilitli)')) {
                    span.innerText = span.innerText + ' (Kilitli)';
                }
            }
        }
    });
}

function showKeyModal(callback) {
    const modalDiv = document.createElement('div');
    modalDiv.style.cssText = 'position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.95); backdrop-filter:blur(20px); z-index:30000; display:flex; justify-content:center; align-items:center;';
    modalDiv.innerHTML = `
        <div style="background:linear-gradient(135deg,#0a0a14,#0f0f1e); border:1px solid rgba(168,85,247,0.4); border-radius:28px; width:400px; padding:35px; text-align:center;">
            <div style="width:70px; height:70px; background:linear-gradient(135deg,#6c5ce7,#a855f7); border-radius:50%; display:flex; align-items:center; justify-content:center; margin:0 auto 20px;">
                <i class="fas fa-key" style="font-size:2rem; color:white;"></i>
            </div>
            <h3 style="color:white;">Extra Tools</h3>
            <p style="color:#888; margin:10px 0 20px;">7 premium araca erişmek için key girin</p>
            <input type="password" id="modal-key" placeholder="KEY GİRİN" style="width:100%; padding:14px; background:rgba(0,0,0,0.5); border:1px solid rgba(168,85,247,0.3); border-radius:14px; color:white; text-align:center; margin-bottom:20px;">
            <button id="modal-submit" style="width:100%; padding:14px; background:linear-gradient(135deg,#6c5ce7,#a855f7); border:none; border-radius:14px; color:white; font-weight:700; cursor:pointer;">ERİŞİM SAĞLA</button>
            <div id="modal-error" style="color:#ef4444; margin-top:15px; display:none;">❌ Geçersiz Key!</div>
        </div>
    `;
    document.body.appendChild(modalDiv);
    const input = document.getElementById('modal-key');
    const submit = document.getElementById('modal-submit');
    const errorDiv = document.getElementById('modal-error');
    submit.onclick = () => {
        if (MASTER_KEYS.includes(input.value.toUpperCase().trim())) {
            unlocked = true;
            modalDiv.remove();
            updateExtraToolsUI();
            if (callback) callback(true);
        } else {
            errorDiv.style.display = 'block';
            setTimeout(() => errorDiv.style.display = 'none', 2000);
        }
    };
    input.onkeypress = (e) => { if(e.key === 'Enter') submit.click(); };
}

if (accessBtn) {
    accessBtn.onclick = () => {
        if (unlocked) {
            alert('✅ Extra Tools zaten aktif!');
        } else {
            showKeyModal((success) => { if(success) alert('🔓 Extra Tools erişimi açıldı! 7 araç kullanıma hazır.'); });
        }
    };
}

function createToolModal(title, contentHTML) {
    const modal = document.createElement('div');
    modal.style.cssText = 'position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.9); backdrop-filter:blur(20px); z-index:30001; display:flex; justify-content:center; align-items:center;';
    modal.innerHTML = `
        <div style="background:linear-gradient(135deg,#0a0a14,#0f0f1e); border:1px solid rgba(168,85,247,0.3); border-radius:24px; width:550px; max-width:90%; max-height:80vh; overflow-y:auto; padding:25px;">
            <div style="display:flex; justify-content:space-between; margin-bottom:20px; border-bottom:1px solid rgba(255,255,255,0.1); padding-bottom:12px;">
                <h3 style="color:#a855f7;"><i class="fas fa-tools"></i> ${title}</h3>
                <button id="close-modal" style="background:none; border:none; color:white; font-size:1.5rem; cursor:pointer;">&times;</button>
            </div>
            <div>${contentHTML}</div>
        </div>
    `;
    document.body.appendChild(modal);
    document.getElementById('close-modal').onclick = () => modal.remove();
    modal.onclick = (e) => { if(e.target === modal) modal.remove(); };
    return modal;
}

// ========== AI CHAT TOOLS ==========
class AIChatTools {
    constructor() {
        this.currentModel = 'gpt';
        this.messages = [];
        this.isLoading = false;
        this.apiKey = localStorage.getItem('legante_api_key') || '';
        
        this.demoResponses = {
            'merhaba': 'Merhaba! 😊 Nasıl yardımcı olabilirim? Legante Project hakkında her şeyi sorabilirsiniz!',
            'nasılsın': 'Ben bir AI asistanıyım, her zaman yardıma hazırım! Siz nasılsınız?',
            'teşekkürler': 'Rica ederim! Başka bir konuda yardımcı olabilirsem memnuniyetle. 🤗',
            'yardım': 'Size şu konularda yardımcı olabilirim:\n• Legante Project üyelikleri\n• Hileler ve özellikleri\n• Sık sorulan sorular\n• Genel bilgiler\n\nNe öğrenmek istersiniz?',
            'vip': 'VIP üyeliklerimiz 3 farklı seviyededir: VIP 1 (79₺/ay), VIP 2 (149₺/ay), VIP 3 (249₺/ay). Her seviyede farklı avantajlar sunuyoruz! 🎯',
            'fiyat': '💎 Fiyat listemiz:\n• VIP 1: 79₺/ay\n• VIP 2: 149₺/ay\n• VIP 3: 249₺/ay\n• Boost paketleri: 39₺ - 119₺\n• HWID Spoofer: 199₺ (ömür boyu)',
            'hile': '50+ premium hile çeşidimiz var! Valorant, CS2, Fortnite, PUBG, Apex Legends ve daha fazlası. Hangi oyunla ilgileniyorsunuz? 🎮',
            'güvenlik': 'Gelişmiş anti-ban sistemi, HWID spoofing ve şifreleme teknolojileri kullanıyoruz. Güvenlik önlemlerimiz en üst seviyededir! 🔒',
            'destek': '7/24 canlı Discord desteğimiz var! Sunucumuza katılıp anlık yardım alabilirsiniz. Ayrıca özel VIP kanallarımız da mevcut. 💬',
            'nasıl üye olurum': 'Üye olmak için Discord sunucumuza katılmanız yeterli! Daha sonra marketten istediğiniz paketi satın alabilirsiniz. 🚀',
            'hwid': 'HWID Spoofer, bilgisayarınızın donanım kimliğini değiştirerek ban yediğiniz oyunlara tekrar girmenizi sağlar. Fiyatı: 199₺ (ömür boyu)'
        };
        
        this.init();
    }
    
    init() {
        this.cacheElements();
        this.bindEvents();
        this.loadMessages();
        
        if (this.apiKey && this.apiWarning) {
            this.apiWarning.style.display = 'none';
        }
    }
    
    cacheElements() {
        this.chatMessages = document.getElementById('chatMessages');
        this.chatInput = document.getElementById('chatInput');
        this.sendBtn = document.getElementById('sendMessageBtn');
        this.clearBtn = document.getElementById('clearChatBtn');
        this.modelBtns = document.querySelectorAll('.ai-model-btn');
        this.quickQuestions = document.querySelectorAll('.quick-question');
        this.apiWarning = document.getElementById('aiApiWarning');
    }
    
    bindEvents() {
        if (this.sendBtn) {
            this.sendBtn.addEventListener('click', () => this.sendMessage());
        }
        
        if (this.chatInput) {
            this.chatInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    this.sendMessage();
                }
            });
            
            this.chatInput.addEventListener('input', () => {
                this.chatInput.style.height = 'auto';
                this.chatInput.style.height = Math.min(this.chatInput.scrollHeight, 120) + 'px';
            });
        }
        
        if (this.clearBtn) {
            this.clearBtn.addEventListener('click', () => this.clearChat());
        }
        
        this.modelBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                this.switchModel(btn.dataset.model);
            });
        });
        
        this.quickQuestions.forEach(btn => {
            btn.addEventListener('click', () => {
                const question = btn.dataset.question;
                if (question) {
                    this.chatInput.value = question;
                    this.sendMessage();
                }
            });
        });
    }
    
    loadMessages() {
        const savedMessages = localStorage.getItem('legante_chat_messages');
        if (savedMessages && this.chatMessages) {
            try {
                const messages = JSON.parse(savedMessages);
                if (messages.length > 0) {
                    this.chatMessages.innerHTML = '';
                    messages.forEach(msg => {
                        this.addMessageToUI(msg.role, msg.content, false);
                    });
                    this.scrollToBottom();
                }
            } catch(e) {}
        }
    }
    
    saveMessages() {
        const messagesToSave = [];
        if (this.chatMessages) {
            const messageElements = this.chatMessages.querySelectorAll('.chat-message:not(.typing-message)');
            messageElements.forEach(el => {
                const role = el.classList.contains('user-message') ? 'user' : 'assistant';
                const text = el.querySelector('.message-text')?.innerHTML || '';
                if (text) {
                    messagesToSave.push({ role, content: text });
                }
            });
        }
        localStorage.setItem('legante_chat_messages', JSON.stringify(messagesToSave));
    }
    
    switchModel(model) {
        this.currentModel = model;
        this.modelBtns.forEach(btn => {
            if (btn.dataset.model === model) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
        
        const modelNames = { 'gpt': 'GPT-4', 'claude': 'Claude', 'gemini': 'Gemini', 'llama': 'Llama' };
        this.addMessageToUI('assistant', `✨ Model ${modelNames[model]} olarak değiştirildi. Size nasıl yardımcı olabilirim?`);
    }
    
    async sendMessage() {
        if (this.isLoading) return;
        
        const message = this.chatInput?.value.trim();
        if (!message) return;
        
        this.addMessageToUI('user', this.escapeHtml(message));
        this.chatInput.value = '';
        this.chatInput.style.height = 'auto';
        this.scrollToBottom();
        this.showTypingIndicator();
        this.isLoading = true;
        
        try {
            let response;
            if (this.apiKey) {
                response = await this.callRealAPI(message);
            } else {
                response = await this.getDemoResponse(message);
            }
            this.hideTypingIndicator();
            this.addMessageToUI('assistant', response);
        } catch (error) {
            console.error('AI Chat Error:', error);
            this.hideTypingIndicator();
            this.addMessageToUI('assistant', '❌ Üzgünüm, bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
        } finally {
            this.isLoading = false;
        }
    }
    
    async callRealAPI(message) {
        try {
            const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${this.apiKey}`,
                    'Content-Type': 'application/json',
                    'HTTP-Referer': window.location.origin,
                    'X-Title': 'Legante Project'
                },
                body: JSON.stringify({
                    model: this.getModelName(),
                    messages: [
                        {
                            role: 'system',
                            content: 'Sen Legante Project\'in AI asistanısın. Kibar, yardımsever ve bilgili bir şekilde cevap ver. Oyun hileleri, VIP üyelikler, Discord sunucusu ve genel sorular hakkında bilgi ver. Kullanıcıya her zaman yardımcı ol. Emoji kullanmaktan çekinme.'
                        },
                        { role: 'user', content: message }
                    ],
                    temperature: 0.7,
                    max_tokens: 500
                })
            });
            
            if (response.ok) {
                const data = await response.json();
                return data.choices[0].message.content;
            } else {
                throw new Error('API Error');
            }
        } catch (error) {
            return this.getDemoResponse(message);
        }
    }
    
    getModelName() {
        const models = {
            'gpt': 'openai/gpt-3.5-turbo',
            'claude': 'anthropic/claude-2',
            'gemini': 'google/gemini-pro',
            'llama': 'meta-llama/llama-2-13b-chat'
        };
        return models[this.currentModel] || models['gpt'];
    }
    
    async getDemoResponse(message) {
        await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 500));
        const lowerMessage = message.toLowerCase();
        
        for (const [key, response] of Object.entries(this.demoResponses)) {
            if (lowerMessage.includes(key)) {
                return response;
            }
        }
        
        const defaultResponses = [
            `🎮 Legante Project hakkında detaylı bilgi için Discord sunucumuza bekleriz!\n\nDiscord: discord.gg/bM6SZcNmzW\n\nSize özel tekliflerimiz ve 50+ premium hile seçeneğimiz mevcuttur.\n\n💡 İpucu: Gerçek AI yanıtları için alttaki uyarıya tıklayarak API key ekleyebilirsiniz.`,
            `Merhaba! "${message}" hakkında sana yardımcı olabilirim. Detaylı bilgi için Discord sunucumuza katılabilir veya sorunu daha spesifik sorabilir misin? 😊\n\n🔗 Discord: discord.gg/bM6SZcNmzW`,
            `Teşekkürler! Legante Project olarak her zaman yanınızdayız. 💪 Daha fazla bilgi için Discord sunucumuzu ziyaret edebilirsiniz: discord.gg/bM6SZcNmzW\n\nSorunuzu daha detaylı yazarsanız size daha iyi yardımcı olabilirim!`
        ];
        
        return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
    }
    
    addMessageToUI(role, content, save = true) {
        if (!this.chatMessages) return;
        
        const messageDiv = document.createElement('div');
        messageDiv.className = `chat-message ${role === 'user' ? 'user-message' : 'ai-message'}`;
        
        const avatar = role === 'user' ? '<i class="fas fa-user"></i>' : '<i class="fas fa-robot"></i>';
        const sender = role === 'user' ? 'Siz' : 'Legante AI';
        
        let formattedContent = content
            .replace(/\n/g, '<br>')
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/`(.*?)`/g, '<code>$1</code>');
        
        messageDiv.innerHTML = `
            <div class="message-avatar">${avatar}</div>
            <div class="message-content">
                <div class="message-sender">${sender}</div>
                <div class="message-text">${formattedContent}</div>
            </div>
        `;
        
        this.chatMessages.appendChild(messageDiv);
        this.scrollToBottom();
        
        if (save) this.saveMessages();
    }
    
    showTypingIndicator() {
        this.hideTypingIndicator();
        if (!this.chatMessages) return;
        
        const typingDiv = document.createElement('div');
        typingDiv.className = 'chat-message ai-message typing-message';
        typingDiv.innerHTML = `
            <div class="message-avatar"><i class="fas fa-robot"></i></div>
            <div class="message-content">
                <div class="message-sender">Legante AI</div>
                <div class="typing-indicator"><span></span><span></span><span></span></div>
            </div>
        `;
        this.chatMessages.appendChild(typingDiv);
        this.scrollToBottom();
    }
    
    hideTypingIndicator() {
        const typingElement = this.chatMessages?.querySelector('.typing-message');
        if (typingElement) typingElement.remove();
    }
    
    clearChat() {
        if (confirm('Sohbet geçmişini temizlemek istediğinizden emin misiniz?')) {
            if (this.chatMessages) {
                this.chatMessages.innerHTML = `
                    <div class="chat-message ai-message">
                        <div class="message-avatar"><i class="fas fa-robot"></i></div>
                        <div class="message-content">
                            <div class="message-sender">Legante AI</div>
                            <div class="message-text">Merhaba! Ben Legante AI asistanı. Sana nasıl yardımcı olabilirim? Oyunlar, hileler veya herhangi bir konuda sorularını bekliyorum! 🎮<br><br>💡 <strong>İpucu:</strong> Gerçek AI yanıtları için alttaki uyarıya tıklayarak API key ekleyebilirsiniz.</div>
                        </div>
                    </div>
                `;
                localStorage.removeItem('legante_chat_messages');
            }
        }
    }
    
    scrollToBottom() {
        if (this.chatMessages) {
            this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
        }
    }
    
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// AI Chat Tools'u başlat
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('ai-tools')) {
        new AIChatTools();
    }
});

// ========== SMS BOMBER (Extra Tools) ==========
if (smsLink) {
    smsLink.onclick = (e) => {
        e.preventDefault();
        if (!unlocked) { showKeyModal(()=>{}); return; }
        const modal = createToolModal('SMS Bomber', `
            <input type="text" id="sms-phone" placeholder="Telefon: 905551234567" style="width:100%; padding:12px; margin-bottom:12px; background:rgba(0,0,0,0.5); border:1px solid rgba(168,85,247,0.3); border-radius:12px; color:white;">
            <input type="number" id="sms-count" value="30" placeholder="Sayı" style="width:100%; padding:12px; margin-bottom:12px; background:rgba(0,0,0,0.5); border:1px solid rgba(168,85,247,0.3); border-radius:12px; color:white;">
            <input type="number" id="sms-delay" value="200" placeholder="Gecikme ms" style="width:100%; padding:12px; margin-bottom:12px; background:rgba(0,0,0,0.5); border:1px solid rgba(168,85,247,0.3); border-radius:12px; color:white;">
            <button id="start-sms" style="width:100%; padding:12px; background:linear-gradient(135deg,#6c5ce7,#a855f7); border:none; border-radius:12px; color:white; font-weight:700; cursor:pointer;">BAŞLAT</button>
            <div id="sms-out" style="margin-top:15px; padding:10px; background:rgba(0,0,0,0.4); border-radius:12px; font-size:0.8rem;"></div>
        `);
        const start = document.getElementById('start-sms');
        const phoneIn = document.getElementById('sms-phone');
        const countIn = document.getElementById('sms-count');
        const delayIn = document.getElementById('sms-delay');
        const out = document.getElementById('sms-out');
        start.onclick = async () => {
            let phone = phoneIn.value.trim();
            let count = parseInt(countIn.value) || 30;
            let delay = parseInt(delayIn.value) || 200;
            if (!phone.match(/^[0-9]{10,15}$/)) { out.innerHTML = '<span style="color:#ef4444;">❌ Geçersiz numara!</span>'; return; }
            start.disabled = true;
            out.innerHTML = '🚀 Başlatılıyor...';
            let sent = 0;
            for(let i=0; i<count && sent<count; i++) {
                for(let api of Array(70).fill().map((_,idx)=>`https://api${idx+1}.sms-bomb.com/send?number=${phone}`)) {
                    if(sent>=count) break;
                    try { await fetch(api, {mode:'no-cors'}); } catch(e) {}
                    sent++;
                    out.innerHTML = `✅ Gönderildi: ${sent}/${count}`;
                    await new Promise(r => setTimeout(r, delay));
                }
            }
            out.innerHTML = `<span style="color:#22c55e;">✅ BOMB TAMAMLANDI!</span><br>📤 Toplam: ${sent}<br>📱 Hedef: ${phone}`;
            start.disabled = false;
        };
    };
}

// ========== TOKEN CHECKER ==========
if (tokenLink) {
    tokenLink.onclick = (e) => {
        e.preventDefault();
        if (!unlocked) { showKeyModal(()=>{}); return; }
        const modal = createToolModal('Discord Token Checker', `
            <textarea id="tokens" rows="5" placeholder="Discord tokenler (her satıra bir)" style="width:100%; padding:12px; margin-bottom:12px; background:rgba(0,0,0,0.5); border:1px solid rgba(168,85,247,0.3); border-radius:12px; color:white; font-family:monospace;"></textarea>
            <button id="check-tokens" style="width:100%; padding:12px; background:linear-gradient(135deg,#6c5ce7,#a855f7); border:none; border-radius:12px; color:white; font-weight:700; cursor:pointer;">KONTROL ET</button>
            <div id="token-out" style="margin-top:15px; padding:10px; background:rgba(0,0,0,0.4); border-radius:12px; font-size:0.75rem; max-height:300px; overflow:auto;"></div>
        `);
        const check = document.getElementById('check-tokens');
        const tokenArea = document.getElementById('tokens');
        const outDiv = document.getElementById('token-out');
        check.onclick = async () => {
            const tokens = tokenArea.value.split(/\r?\n/).filter(t=>t.trim().length>0);
            if(!tokens.length) { outDiv.innerHTML = '<span style="color:#ef4444;">❌ Token girin!</span>'; return; }
            check.disabled = true;
            outDiv.innerHTML = '<span style="color:#f59e0b;">🔍 Kontrol ediliyor...</span>';
            let valid=0, results=[];
            for(let i=0;i<tokens.length;i++){
                const t = tokens[i].trim();
                try{
                    const res = await fetch('https://discord.com/api/v9/users/@me',{headers:{'Authorization':t}});
                    if(res.ok){
                        const data = await res.json();
                        valid++;
                        results.push(`<span style="color:#22c55e;">✅ GEÇERLİ | ${data.username} | ID: ${data.id}</span>`);
                    } else results.push(`<span style="color:#ef4444;">❌ GEÇERSİZ | ${t.substring(0,25)}...</span>`);
                } catch(e){ results.push(`<span style="color:#ef4444;">❌ HATA | ${t.substring(0,25)}...</span>`); }
                outDiv.innerHTML = `<span style="color:#f59e0b;">🔄 ${i+1}/${tokens.length}</span><br>`+results.slice(-5).join('<br>');
                await new Promise(r=>setTimeout(r,600));
            }
            outDiv.innerHTML = `<span style="color:#22c55e;">✅ KONTROL TAMAMLANDI!</span><br>📈 Toplam: ${tokens.length} | ✅ Geçerli: ${valid}<br><br>`+results.join('<br>');
            check.disabled = false;
        };
    };
}

// ========== IP LOCATOR ==========
if (ipLink) {
    ipLink.onclick = (e) => {
        e.preventDefault();
        if (!unlocked) { showKeyModal(()=>{}); return; }
        const modal = createToolModal('IP Locator', `
            <input type="text" id="ip-address" placeholder="IP Adresi: 8.8.8.8" style="width:100%; padding:12px; margin-bottom:12px; background:rgba(0,0,0,0.5); border:1px solid rgba(168,85,247,0.3); border-radius:12px; color:white;">
            <button id="locate-ip" style="width:100%; padding:12px; background:linear-gradient(135deg,#6c5ce7,#a855f7); border:none; border-radius:12px; color:white; font-weight:700; cursor:pointer;">KONUM BUL</button>
            <div id="ip-out" style="margin-top:15px; padding:10px; background:rgba(0,0,0,0.4); border-radius:12px; font-size:0.8rem;"></div>
        `);
        const locate = document.getElementById('locate-ip');
        const ipIn = document.getElementById('ip-address');
        const out = document.getElementById('ip-out');
        locate.onclick = async () => {
            const ip = ipIn.value.trim();
            if(!ip) { out.innerHTML = '<span style="color:#ef4444;">❌ IP girin!</span>'; return; }
            out.innerHTML = '<span style="color:#f59e0b;">🔍 Aranıyor...</span>';
            try {
                const res = await fetch(`https://ipapi.co/${ip}/json/`);
                const data = await res.json();
                if(data.error) throw new Error();
                out.innerHTML = `<span style="color:#22c55e;">✅ IP: ${data.ip}</span><br>📍 Ülke: ${data.country_name}<br>🏙️ Şehir: ${data.city || 'Bilinmiyor'}<br>🌐 ISP: ${data.org || 'Bilinmiyor'}`;
            } catch(e) { out.innerHTML = '<span style="color:#ef4444;">❌ IP bulunamadı!</span>'; }
        };
    };
}

// ========== PASSWORD GENERATOR ==========
if (passLink) {
    passLink.onclick = (e) => {
        e.preventDefault();
        if (!unlocked) { showKeyModal(()=>{}); return; }
        const modal = createToolModal('Password Generator', `
            <div style="display:flex; gap:10px; margin-bottom:15px; flex-wrap:wrap;">
                <input type="number" id="pass-length" value="12" min="6" max="32" style="flex:1; min-width:100px; padding:12px; background:rgba(0,0,0,0.5); border:1px solid rgba(168,85,247,0.3); border-radius:12px; color:white;">
                <div style="display:flex; gap:10px; flex-wrap:wrap;">
                    <label><input type="checkbox" id="use-upper" checked> A-Z</label>
                    <label><input type="checkbox" id="use-lower" checked> a-z</label>
                    <label><input type="checkbox" id="use-numbers" checked> 0-9</label>
                    <label><input type="checkbox" id="use-symbols" checked> !@#$</label>
                </div>
            </div>
            <button id="generate-pass" style="width:100%; padding:12px; background:linear-gradient(135deg,#6c5ce7,#a855f7); border:none; border-radius:12px; color:white; font-weight:700; cursor:pointer;">ŞİFRE OLUŞTUR</button>
            <div id="pass-out" style="margin-top:15px; padding:15px; background:rgba(0,0,0,0.4); border-radius:12px; font-family:monospace; text-align:center;"></div>
        `);
        const generate = document.getElementById('generate-pass');
        const lengthIn = document.getElementById('pass-length');
        const upperChk = document.getElementById('use-upper');
        const lowerChk = document.getElementById('use-lower');
        const numChk = document.getElementById('use-numbers');
        const symChk = document.getElementById('use-symbols');
        const out = document.getElementById('pass-out');
        generate.onclick = () => {
            let chars = '';
            if(upperChk.checked) chars += 'ABCDEFGHJKLMNPQRSTUVWXYZ';
            if(lowerChk.checked) chars += 'abcdefghijkmnopqrstuvwxyz';
            if(numChk.checked) chars += '23456789';
            if(symChk.checked) chars += '!@#$%^&*()_+-=';
            if(!chars) { out.innerHTML = '<span style="color:#ef4444;">❌ Seçim yapın!</span>'; return; }
            let length = parseInt(lengthIn.value) || 12;
            let password = '';
            for(let i=0; i<length; i++) password += chars[Math.floor(Math.random() * chars.length)];
            out.innerHTML = `<span style="color:#22c55e;">🔐 ${password}</span><br><button id="copy-pass" style="margin-top:10px; padding:5px 10px; background:rgba(255,255,255,0.1); border:none; border-radius:6px; color:white; cursor:pointer;">Kopyala</button>`;
            document.getElementById('copy-pass')?.addEventListener('click', () => { navigator.clipboard.writeText(password); alert('Kopyalandı!'); });
        };
        generate.click();
    };
}

// ========== HASH TOOL ==========
if (hashLink) {
    hashLink.onclick = (e) => {
        e.preventDefault();
        if (!unlocked) { showKeyModal(()=>{}); return; }
        const modal = createToolModal('Hash Tool', `
            <textarea id="hash-input" rows="3" placeholder="Metin girin..." style="width:100%; padding:12px; margin-bottom:12px; background:rgba(0,0,0,0.5); border:1px solid rgba(168,85,247,0.3); border-radius:12px; color:white;"></textarea>
            <div style="display:flex; gap:10px; margin-bottom:15px; flex-wrap:wrap;">
                <button id="hash-md5" style="flex:1; padding:10px; background:rgba(168,85,247,0.2); border:1px solid rgba(168,85,247,0.3); border-radius:10px; color:white; cursor:pointer;">MD5</button>
                <button id="hash-sha1" style="flex:1; padding:10px; background:rgba(168,85,247,0.2); border:1px solid rgba(168,85,247,0.3); border-radius:10px; color:white; cursor:pointer;">SHA1</button>
                <button id="hash-sha256" style="flex:1; padding:10px; background:rgba(168,85,247,0.2); border:1px solid rgba(168,85,247,0.3); border-radius:10px; color:white; cursor:pointer;">SHA256</button>
            </div>
            <div id="hash-out" style="padding:15px; background:rgba(0,0,0,0.4); border-radius:12px; font-family:monospace; font-size:0.75rem; word-break:break-all;"></div>
        `);
        const input = document.getElementById('hash-input');
        const out = document.getElementById('hash-out');
        async function computeHash(algo, text) {
            const encoder = new TextEncoder();
            const data = encoder.encode(text);
            const hashBuffer = await crypto.subtle.digest(algo, data);
            const hashArray = Array.from(new Uint8Array(hashBuffer));
            return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        }
        document.getElementById('hash-md5').onclick = async () => {
            if(!input.value.trim()) { out.innerHTML = '<span style="color:#ef4444;">Metin girin!</span>'; return; }
            const hash = await computeHash('MD5', input.value);
            out.innerHTML = `<span style="color:#22c55e;">MD5:</span><br>${hash}`;
        };
        document.getElementById('hash-sha1').onclick = async () => {
            if(!input.value.trim()) { out.innerHTML = '<span style="color:#ef4444;">Metin girin!</span>'; return; }
            const hash = await computeHash('SHA-1', input.value);
            out.innerHTML = `<span style="color:#22c55e;">SHA1:</span><br>${hash}`;
        };
        document.getElementById('hash-sha256').onclick = async () => {
            if(!input.value.trim()) { out.innerHTML = '<span style="color:#ef4444;">Metin girin!</span>'; return; }
            const hash = await computeHash('SHA-256', input.value);
            out.innerHTML = `<span style="color:#22c55e;">SHA256:</span><br>${hash}`;
        };
    };
}

// ========== PORT SCANNER ==========
if (portLink) {
    portLink.onclick = (e) => {
        e.preventDefault();
        if (!unlocked) { showKeyModal(()=>{}); return; }
        const modal = createToolModal('Port Scanner', `
            <input type="text" id="scan-ip" placeholder="IP Adresi" style="width:100%; padding:12px; margin-bottom:12px; background:rgba(0,0,0,0.5); border:1px solid rgba(168,85,247,0.3); border-radius:12px; color:white;">
            <div style="display:flex; gap:10px; margin-bottom:15px;">
                <input type="number" id="start-port" placeholder="Başlangıç" value="1" style="flex:1; padding:12px; background:rgba(0,0,0,0.5); border:1px solid rgba(168,85,247,0.3); border-radius:12px; color:white;">
                <input type="number" id="end-port" placeholder="Bitiş" value="100" style="flex:1; padding:12px; background:rgba(0,0,0,0.5); border:1px solid rgba(168,85,247,0.3); border-radius:12px; color:white;">
            </div>
            <button id="start-scan" style="width:100%; padding:12px; background:linear-gradient(135deg,#6c5ce7,#a855f7); border:none; border-radius:12px; color:white; font-weight:700; cursor:pointer;">TARA</button>
            <div id="scan-out" style="margin-top:15px; padding:10px; background:rgba(0,0,0,0.4); border-radius:12px; font-size:0.75rem; max-height:300px; overflow:auto;"></div>
        `);
        const startBtn = document.getElementById('start-scan');
        const ipIn = document.getElementById('scan-ip');
        const startPortIn = document.getElementById('start-port');
        const endPortIn = document.getElementById('end-port');
        const out = document.getElementById('scan-out');
        startBtn.onclick = async () => {
            const ip = ipIn.value.trim();
            const startPort = parseInt(startPortIn.value) || 1;
            const endPort = parseInt(endPortIn.value) || 100;
            if(!ip) { out.innerHTML = '<span style="color:#ef4444;">IP girin!</span>'; return; }
            startBtn.disabled = true;
            out.innerHTML = '<span style="color:#f59e0b;">🔍 Taranıyor...</span>';
            let results = [];
            for(let port = startPort; port <= endPort && port <= 1024; port++) {
                try {
                    const controller = new AbortController();
                    setTimeout(() => controller.abort(), 1000);
                    await fetch(`http://${ip}:${port}`, { mode: 'no-cors', signal: controller.signal });
                    results.push(`<span style="color:#22c55e;">✅ Port ${port} açık</span>`);
                } catch(e) { results.push(`<span style="color:#ef4444;">❌ Port ${port} kapalı</span>`); }
                out.innerHTML = `<span style="color:#f59e0b;">🔄 ${port}/${endPort}</span><br>` + results.slice(-10).join('<br>');
                await new Promise(r => setTimeout(r, 100));
            }
            out.innerHTML = `<span style="color:#22c55e;">✅ TAMAMLANDI!</span><br>` + results.join('<br>');
            startBtn.disabled = false;
        };
    };
}

// ========== VIRUSTOTAL SCANNER ==========
if (vtExtraLink) {
    vtExtraLink.onclick = (e) => {
        e.preventDefault();
        if (!unlocked) { showKeyModal(()=>{}); return; }
        const vtSection = document.getElementById('virustotal');
        if (vtSection) {
            vtSection.scrollIntoView({ behavior: 'smooth' });
        } else {
            alert('VirusTotal bölümü bulunamadı!');
        }
    };
}

const VT_API_KEY = "f025e25ef11c7bd1f5714664aae66a4ba012320417a1a7fd7a4491030f11e7c7";

async function vtFetch(url, options = {}) {
    if (VT_API_KEY === "YOUR_API_KEY_HERE") {
        const warning = document.getElementById('vt-api-warning');
        if (warning) warning.style.display = 'block';
        throw new Error('API Key ayarlanmamış');
    }
    const headers = {
        'x-apikey': VT_API_KEY,
        'Content-Type': 'application/json'
    };
    const response = await fetch(url, { ...options, headers });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    return response.json();
}

async function analyzeURL(url) {
    const submitRes = await vtFetch('https://www.virustotal.com/api/v3/urls', {
        method: 'POST',
        body: JSON.stringify({ url: url })
    });
    const scanId = submitRes.data.id;
    await new Promise(r => setTimeout(r, 3000));
    return await vtFetch(`https://www.virustotal.com/api/v3/analyses/${scanId}`);
}

async function analyzeHash(hash) {
    try {
        return await vtFetch(`https://www.virustotal.com/api/v3/files/${hash}`);
    } catch (e) {
        if (e.message.includes('404')) throw new Error('Hash bulunamadı');
        throw e;
    }
}

function displayVTResults(data, type) {
    const resultDiv = document.getElementById('vt-result');
    const statsDiv = document.getElementById('vt-stats');
    const enginesDiv = document.getElementById('vt-engines');
    if (!resultDiv || !statsDiv || !enginesDiv) return;
    
    let attributes, lastAnalysisStats, results = {};
    if (type === 'url') {
        attributes = data.data.attributes;
        lastAnalysisStats = attributes.stats;
        results = attributes.results || {};
    } else {
        attributes = data.data.attributes;
        lastAnalysisStats = attributes.last_analysis_stats;
        results = attributes.last_analysis_results || {};
    }
    
    const malicious = lastAnalysisStats.malicious || 0;
    const suspicious = lastAnalysisStats.suspicious || 0;
    const undetected = lastAnalysisStats.undetected || 0;
    const total = malicious + suspicious + undetected + (lastAnalysisStats.harmless || 0);
    
    let detectionClass = 'clean';
    let detectionText = '✅ Temiz';
    if (malicious > 0) {
        detectionClass = 'malicious';
        detectionText = `⚠️ ZARARLI - ${malicious} tespit`;
    } else if (suspicious > 0) {
        detectionClass = 'suspicious';
        detectionText = `⚠️ ŞÜPHELİ - ${suspicious} tespit`;
    }
    
    statsDiv.innerHTML = `
        <div class="vt-detections ${detectionClass}">
            <div style="font-size: 1.2rem; font-weight: 700; margin-bottom: 5px;">${detectionText}</div>
            <div style="font-size: 0.8rem;">${malicious} Zararlı | ${suspicious} Şüpheli | ${undetected} Temiz</div>
        </div>
        <div class="vt-stat"><span class="vt-stat-label">Toplam Tarama</span><span class="vt-stat-value">${total}</span></div>
    `;
    
    const engineList = Object.entries(results);
    if (engineList.length > 0) {
        let enginesHtml = '<div style="margin-top: 20px;"><div style="font-weight: 700; margin-bottom: 10px;">🔍 Tarama Sonuçları:</div><div class="vt-engine-list">';
        for (const [engine, result] of engineList.slice(0, 30)) {
            const verdict = result.category || result.result;
            const isMalicious = verdict === 'malicious' || verdict === 'malware';
            enginesHtml += `<div class="vt-engine-item"><span class="vt-engine-name">${engine}</span><span class="vt-engine-result ${isMalicious ? '' : 'clean'}">${verdict || 'temiz'}</span></div>`;
        }
        enginesHtml += '</div></div>';
        enginesDiv.innerHTML = enginesHtml;
    }
    resultDiv.classList.add('active');
}

async function runVTAnalysis() {
    const input = document.getElementById('vt-input')?.value.trim();
    const type = document.getElementById('vt-type')?.value;
    const scanBtn = document.getElementById('vt-scan-btn');
    const loader = document.getElementById('vt-loader');
    const resultDiv = document.getElementById('vt-result');
    
    if (!input) { alert('URL veya Hash girin!'); return; }
    
    if (VT_API_KEY === "YOUR_API_KEY_HERE") {
        if (resultDiv) resultDiv.classList.add('active');
        const statsDiv = document.getElementById('vt-stats');
        if (statsDiv) statsDiv.innerHTML = `<div class="vt-detections" style="background:rgba(245,158,11,0.1);">⚠️ VirusTotal API Key ayarlanmamış!<br><span style="font-size:0.8rem;">virustotal.com/gui/join-us adresinden üye olup script.js içindeki VT_API_KEY değişkenini key'inizle değiştirin.</span></div>`;
        return;
    }
    
    if (scanBtn) scanBtn.disabled = true;
    if (loader) loader.classList.add('active');
    if (resultDiv) resultDiv.classList.remove('active');
    
    try {
        let result;
        if (type === 'url') {
            let url = input;
            if (!url.startsWith('http')) url = 'https://' + url;
            result = await analyzeURL(url);
            displayVTResults(result, 'url');
        } else {
            result = await analyzeHash(input);
            displayVTResults(result, 'hash');
        }
    } catch (error) {
        if (resultDiv) resultDiv.classList.add('active');
        const statsDiv = document.getElementById('vt-stats');
        if (statsDiv) statsDiv.innerHTML = `<div class="vt-detections" style="background:rgba(239,68,68,0.1);">❌ Hata: ${error.message}</div>`;
    } finally {
        if (scanBtn) scanBtn.disabled = false;
        if (loader) loader.classList.remove('active');
    }
}

const vtScanBtn = document.getElementById('vt-scan-btn');
if (vtScanBtn) vtScanBtn.addEventListener('click', runVTAnalysis);
const vtInputField = document.getElementById('vt-input');
if (vtInputField) vtInputField.addEventListener('keypress', (e) => { if (e.key === 'Enter') runVTAnalysis(); });

updateExtraToolsUI();
console.log('✅ Legante Project v3.0 | 7 Extra Tools + AI Chat Tools | VirusTotal sadece Extra Tools\'da');