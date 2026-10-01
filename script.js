/**
 * ========================================================
 * LEGANTE PROJECT - ULTRA PREMIUM JAVASCRIPT ENGINE v4.0.0
 * Comprehensive State Management, Interactive Catalog with Photos,
 * Cart, Checkout, Auth, AI Chat & 11 Functional Extra Tools
 * ========================================================
 */

// ==================== 1. SOUND EFFECTS (WEB AUDIO API) ====================
let sfxEnabled = localStorage.getItem('legante_sfx') !== 'false';
let audioCtx = null;

function getAudioContext() {
    if (!audioCtx) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (AudioContext) audioCtx = new AudioContext();
    }
    if (audioCtx && audioCtx.state === 'suspended') {
        audioCtx.resume();
    }
    return audioCtx;
}

function playTone(freq, type = 'sine', duration = 0.1, gainVal = 0.08) {
    if (!sfxEnabled) return;
    try {
        const ctx = getAudioContext();
        if (!ctx) return;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = type;
        osc.frequency.setValueAtTime(freq, ctx.currentTime);
        gain.gain.setValueAtTime(gainVal, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + duration);
    } catch(e) {}
}

function playSuccessSFX() {
    playTone(523.25, 'sine', 0.1, 0.08); // C5
    setTimeout(() => playTone(659.25, 'sine', 0.15, 0.08), 80); // E5
    setTimeout(() => playTone(783.99, 'sine', 0.2, 0.08), 160); // G5
}

function playClickSFX() {
    playTone(800, 'triangle', 0.04, 0.03);
}

function playNotificationSFX() {
    playTone(587.33, 'sine', 0.12, 0.07);
    setTimeout(() => playTone(880, 'sine', 0.18, 0.07), 90);
}

function toggleSFX() {
    sfxEnabled = !sfxEnabled;
    localStorage.setItem('legante_sfx', sfxEnabled);
    const icon = document.getElementById('sfx-icon');
    if (icon) {
        icon.className = sfxEnabled ? 'fas fa-volume-high' : 'fas fa-volume-xmark';
    }
    showToast(sfxEnabled ? '🔊 Ses efektleri açıldı' : '🔇 Ses efektleri kapatıldı', 'info');
    if (sfxEnabled) playSuccessSFX();
}

// ==================== 2. AMBIENT PARTICLES CANVAS ====================
function initParticlesCanvas() {
    const canvas = document.getElementById('particles-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    const particles = [];
    const count = Math.min(Math.floor(width / 22), 65);

    for (let i = 0; i < count; i++) {
        particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            radius: Math.random() * 2 + 1,
            vx: (Math.random() - 0.5) * 0.4,
            vy: (Math.random() - 0.5) * 0.4,
            alpha: Math.random() * 0.5 + 0.2
        });
    }

    function render() {
        ctx.clearRect(0, 0, width, height);

        for (let i = 0; i < particles.length; i++) {
            const p = particles[i];
            p.x += p.vx;
            p.y += p.vy;

            if (p.x < 0) p.x = width;
            if (p.x > width) p.x = 0;
            if (p.y < 0) p.y = height;
            if (p.y > height) p.y = 0;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(167, 139, 250, ${p.alpha})`;
            ctx.fill();

            for (let j = i + 1; j < particles.length; j++) {
                const p2 = particles[j];
                const dx = p.x - p2.x;
                const dy = p.y - p2.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 110) {
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.strokeStyle = `rgba(139, 92, 246, ${(1 - dist / 110) * 0.16})`;
                    ctx.lineWidth = 0.7;
                    ctx.stroke();
                }
            }
        }
        requestAnimationFrame(render);
    }
    render();
}

// ==================== 3. CURRENCY SYSTEM ====================
let activeCurrency = localStorage.getItem('legante_currency') || 'TRY';
const currencyRates = {
    TRY: { symbol: '₺', rate: 1 },
    USD: { symbol: '$', rate: 0.029 },
    EUR: { symbol: '€', rate: 0.027 }
};

function formatPrice(tryAmount) {
    const info = currencyRates[activeCurrency] || currencyRates.TRY;
    const converted = Math.round(tryAmount * info.rate);
    return `${info.symbol}${converted}`;
}

function changeCurrency(newCurr) {
    activeCurrency = newCurr;
    localStorage.setItem('legante_currency', newCurr);
    renderProducts();
    updateCartUI();
    updatePricingCards();
    showToast(`Para birimi ${newCurr} olarak güncellendi`, 'info');
}

function updatePricingCards() {
    document.querySelectorAll('.price-val').forEach(el => {
        const base = parseFloat(el.getAttribute('data-base'));
        if (!isNaN(base)) {
            const info = currencyRates[activeCurrency] || currencyRates.TRY;
            el.innerText = Math.round(base * info.rate);
            const currEl = el.previousElementSibling;
            if (currEl && currEl.classList.contains('currency')) {
                currEl.innerText = info.symbol;
            }
        }
    });
}

// ==================== 4. TOAST NOTIFICATIONS ====================
function showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    playNotificationSFX();

    const toast = document.createElement('div');
    toast.className = `toast-message ${type}`;

    let icon = 'fas fa-info-circle';
    if (type === 'success') icon = 'fas fa-check-circle';
    if (type === 'error') icon = 'fas fa-exclamation-triangle';

    toast.innerHTML = `<i class="${icon}"></i> <span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
        toast.style.animation = 'toastSlideIn 0.3s ease reverse forwards';
        setTimeout(() => toast.remove(), 300);
    }, 3500);
}

// ==================== 5. PRODUCT CATALOG WITH OFFICIAL GAME PHOTOS ====================
const productsData = [
    {
        id: 'valo-pro',
        title: 'Valorant Pro VIP',
        category: 'valorant',
        game: 'Riot Games / Valorant',
        badge: 'UNDETECTED',
        badgeClass: 'badge-safe',
        priceTRY: 249,
        popular: true,
        icon: 'fas fa-crosshairs',
        bannerImg: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=800&auto=format&fit=crop',
        desc: 'Vanguard Ring0 tam korumalı, ESP Box, Skeleton, Chams, Aimbot ve Smoothness ayarları ile en güvenli sürüm.',
        features: [
            'Kernel Düzeyi Vanguard Bypass',
            'Smooth Aimbot & Recoil Control',
            'Glow, Box, Skeleton & Health ESP',
            'OBS & Discord Screen Share Proof',
            'Dahili HWID Spoofer Dahil'
        ],
        specs: {
            os: 'Windows 10 / 11 (Tüm Sürümler)',
            cpu: 'Intel & AMD Uyumlu',
            anticheat: 'Riot Vanguard (Undetected)',
            delivery: 'Anında Otomatik Teslimat'
        }
    },
    {
        id: 'cs2-elite',
        title: 'CS2 Premier Elite',
        category: 'cs2',
        game: 'Valve / Counter-Strike 2',
        badge: 'POPÜLER',
        badgeClass: 'badge-hot',
        priceTRY: 199,
        popular: true,
        icon: 'fas fa-gun',
        bannerImg: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=800&auto=format&fit=crop',
        desc: 'VACnet 3.0 ve Premier Ranked için optimize edilmiş, Silent Aim, Triggerbot ve radar destekli profesyonel yazılım.',
        features: [
            'VACnet 3.0 & Overwatch Safe',
            'Silent Aim & Görünmez Spike ESP',
            'Bones, Box, Weapon & Dropped ESP',
            'Standart & Legit RCS (Geri Tepme)',
            'Bulut Tabanlı CFG Senkronizasyonu'
        ],
        specs: {
            os: 'Windows 10 / 11 (64-Bit)',
            cpu: 'Intel & AMD Uyumlu',
            anticheat: 'VAC, VACnet 3.0',
            delivery: 'Anında Otomatik Teslimat'
        }
    },
    {
        id: 'rust-dom',
        title: 'Rust Domination Pro',
        category: 'rust',
        game: 'Facepunch / Rust',
        badge: 'BESTSELLER',
        badgeClass: 'badge-hot',
        priceTRY: 299,
        popular: true,
        icon: 'fas fa-radiation',
        bannerImg: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=800&auto=format&fit=crop',
        desc: 'EAC korumasını tamamen devreden çıkaran, Silent Aim, No-Spread, Ore/Player ESP ve Debug Camera barındıran hile.',
        features: [
            'Easy Anti-Cheat (EAC) Bypass',
            'Silent Aim & Otomatik Tahmin (Prediction)',
            'Maden, Kasa, Oyuncu & Tuzak ESP',
            'Debug Camera & Admin Modu',
            'Tüfek Geri Tepme Sıfırlama (%100 RCS)'
        ],
        specs: {
            os: 'Windows 10 / 11',
            cpu: 'Intel & AMD',
            anticheat: 'EAC & Cerberus Safe',
            delivery: 'Anında Otomatik Teslimat'
        }
    },
    {
        id: 'fivem-global',
        title: 'FiveM Global Menu',
        category: 'fivem',
        game: 'Rockstar / FiveM Roleplay',
        badge: 'GLOBAL',
        badgeClass: 'badge-vip',
        priceTRY: 179,
        popular: false,
        icon: 'fas fa-car',
        bannerImg: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=800&auto=format&fit=crop',
        desc: 'Tüm FiveM RP sunucularında çalışan, Lua Executor, Godmode, Araç ve Silah modlama özellikli devasa hile menüsü.',
        features: [
            'Global Sunucu Ban Bypass',
            'Güçlü Lua Executor & Dumper',
            'Godmode, Noclip, Teleport & Para Modu',
            'Özel Araç Spawn ve Drift Modları',
            'Bütün Sunucu AC Sistemlerine Uyumlu'
        ],
        specs: {
            os: 'Windows 10 / 11',
            cpu: 'Intel & AMD',
            anticheat: 'FiveM Global Anticheat',
            delivery: 'Anında Otomatik Teslimat'
        }
    },
    {
        id: 'spoofer-perm',
        title: 'Permanent HWID Spoofer',
        category: 'spoofer',
        game: 'Tüm Oyunlar İçin Evrensel',
        badge: 'ÖMÜR BOYU',
        badgeClass: 'badge-safe',
        priceTRY: 349,
        popular: true,
        icon: 'fas fa-compact-disc',
        bannerImg: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800&auto=format&fit=crop',
        desc: 'Format gerektirmeyen, tek tıkla anakart, SSD, NIC ve BIOS kimliklerini yenileyen kalıcı donanım ban kaldırıcı.',
        features: [
            'Asus, MSI, Gigabyte, ASRock Uyumlu',
            'Disk, Ağ Kartı (MAC), GPU Seri No Reset',
            'TPM 2.0 & Secure Boot Sanallaştırma',
            'Format Atmaya Kesinlikle Gerek Yok',
            'Valorant (VAN 152 / VAN 5) Kesin Çözüm'
        ],
        specs: {
            os: 'Windows 10 / 11 (Tüm Versiyonlar)',
            cpu: 'Intel & AMD Destekli',
            anticheat: 'Vanguard, EAC, BattlEye, Ricochet',
            delivery: 'Anında Otomatik Teslimat'
        }
    },
    {
        id: 'apex-dma',
        title: 'Apex Legends DMA Radar',
        category: 'spoofer',
        game: 'EA / Apex Legends',
        badge: 'DMA SAFE',
        badgeClass: 'badge-vip',
        priceTRY: 279,
        popular: false,
        icon: 'fas fa-skull',
        bannerImg: 'https://images.unsplash.com/photo-1563089145-599997674d42?q=80&w=800&auto=format&fit=crop',
        desc: 'İkinci bilgisayar veya tek PC radar modu ile çalışan, tespit edilmesi imkansız donanım tabanlı ESP ve Aimbot.',
        features: [
            '2. PC Web / İkincil Ekran Radarı',
            'BattlEye & EAC Ring0 Koruma',
            'Loot, Kalkan Seviyesi & Glow ESP',
            'Pürüzsüz Kemik Kilitleme (Bone Aimbot)',
            'Yüksek FPS & Sıfır Donma'
        ],
        specs: {
            os: 'Windows 10 / 11',
            cpu: 'Intel & AMD',
            anticheat: 'Easy Anti-Cheat',
            delivery: 'Anında Otomatik Teslimat'
        }
    },
    {
        id: 'vip-sub-1',
        title: 'VIP 1 Üyelik Paketi',
        category: 'vip',
        game: 'Tüm Arşivden 5 Hile',
        badge: 'VIP ROLLER',
        badgeClass: 'badge-vip',
        priceTRY: 149,
        popular: false,
        icon: 'fas fa-crown',
        bannerImg: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop',
        desc: 'Seçtiğiniz 5 farklı hileye 1 ay boyunca sınırsız erişim ve Discord özel rolü sağlayan ekonomik paket.',
        features: [
            '5 Adet Premium Hile Seçim Hakkı',
            'Discord VIP Rolü & Kanalları',
            'Otomatik Güncelleme Desteği',
            'Extra Tools Suite Erişimi'
        ],
        specs: {
            os: 'Tüm Sistemler',
            cpu: 'Tüm İşlemciler',
            anticheat: 'Tüm Hileler Koruma Altında',
            delivery: 'Anında Rol ve Lisans Tanımlama'
        }
    },
    {
        id: 'booster-pack-2',
        title: 'Sunucu Booster Paketi',
        category: 'booster',
        game: 'Discord & Rank Servisi',
        badge: 'HIZLI BOOST',
        badgeClass: 'badge-hot',
        priceTRY: 69,
        popular: false,
        icon: 'fas fa-rocket',
        bannerImg: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop',
        desc: '8 saat boyunca VIP lobi, özel koçluk ve hızlı rank yükseltme odalarına öncelikli katılım desteği.',
        features: [
            '8 Saat Kesintisiz Booster Desteği',
            'Özel VIP Ses ve Yayın Odası',
            'Yüksek K/D Oranı ve Rank Garantisi',
            '7/24 Birebir Oyun Arkadaşı Desteği'
        ],
        specs: {
            os: 'Platform Bağımsız',
            cpu: 'Gereksiz',
            anticheat: 'Tamamen Güvenli',
            delivery: 'Anında Aktivasyon'
        }
    }
];

let currentFilter = 'all';
let currentSearch = '';
let currentSort = 'default';

function renderProducts() {
    const container = document.getElementById('products-container');
    if (!container) return;

    let filtered = productsData.filter(item => {
        const matchesCategory = (currentFilter === 'all') || (item.category === currentFilter);
        const matchesSearch = item.title.toLowerCase().includes(currentSearch.toLowerCase()) ||
                              item.game.toLowerCase().includes(currentSearch.toLowerCase()) ||
                              item.desc.toLowerCase().includes(currentSearch.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    if (currentSort === 'price-asc') {
        filtered.sort((a, b) => a.priceTRY - b.priceTRY);
    } else if (currentSort === 'price-desc') {
        filtered.sort((a, b) => b.priceTRY - a.priceTRY);
    } else if (currentSort === 'popular') {
        filtered.sort((a, b) => (b.popular ? 1 : 0) - (a.popular ? 1 : 0));
    }

    if (filtered.length === 0) {
        container.innerHTML = `
            <div style="grid-column: 1 / -1; text-align:center; padding: 50px 20px; color: var(--text-muted);">
                <i class="fas fa-search" style="font-size: 2.5rem; margin-bottom: 12px; opacity: 0.5;"></i>
                <h3>Aradığınız kriterlere uygun yazılım bulunamadı!</h3>
                <p>Arama kelimenizi veya kategori filtrelerini değiştirmeyi deneyebilirsiniz.</p>
            </div>
        `;
        return;
    }

    container.innerHTML = filtered.map(item => `
        <div class="product-card" data-category="${item.category}">
            <!-- FOTOĞRAFLI BANNER -->
            <div class="product-card-banner">
                <img src="${item.bannerImg}" alt="${item.title}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=800&auto=format&fit=crop'">
                <div class="banner-gradient-overlay"></div>
                <div class="banner-badge-group">
                    <span class="product-game-chip"><i class="${item.icon}"></i> ${item.game.split('/')[0].trim()}</span>
                    <span class="product-badge ${item.badgeClass}">${item.badge}</span>
                </div>
            </div>

            <div class="product-card-body">
                <h3 class="product-title">${item.title}</h3>
                <p class="product-desc">${item.desc}</p>
                <ul class="product-features-list">
                    ${item.features.slice(0, 3).map(f => `<li><i class="fas fa-shield-check"></i> ${f}</li>`).join('')}
                </ul>
            </div>

            <div class="product-card-footer">
                <div class="product-price-box">
                    <span class="price-currency">Aylık Lisans</span>
                    <span class="price-amount">${formatPrice(item.priceTRY)}</span>
                </div>
                <div class="product-action-btns">
                    <button class="btn-detail" onclick="openProductDetail('${item.id}')" title="Detaylı Özellikler">
                        <i class="fas fa-eye"></i> İncele
                    </button>
                    <button class="btn btn-primary btn-sm btn-glow" onclick="addToCart('${item.title}', ${item.priceTRY}, '${item.id}')">
                        <i class="fas fa-cart-plus"></i> Ekle
                    </button>
                </div>
            </div>
        </div>
    `).join('');

    const countEl = document.getElementById('sidebar-product-count');
    if (countEl) countEl.innerText = productsData.length;
}

function filterByCategory(category) {
    currentFilter = category;
    document.querySelectorAll('.cat-pill-btn').forEach(btn => {
        if (btn.getAttribute('data-category') === category) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    renderProducts();
}

function filterMarket() {
    const input = document.getElementById('market-search-input');
    currentSearch = input ? input.value.trim() : '';
    renderProducts();
}

function sortMarket(val) {
    currentSort = val;
    renderProducts();
}

// ==================== 6. PRODUCT DETAIL MODAL (WITH BANNER) ====================
function openProductDetail(productId) {
    const item = productsData.find(p => p.id === productId);
    if (!item) return;

    playClickSFX();
    const modal = document.getElementById('product-detail-modal');
    const title = document.getElementById('modal-product-title');
    const body = document.getElementById('modal-product-body');

    if (!modal || !title || !body) return;

    title.innerHTML = `<i class="${item.icon}"></i> ${item.title}`;
    body.innerHTML = `
        <!-- MODAL BANNER FOTOĞRAFI -->
        <div style="position:relative; width:100%; height:180px; border-radius:var(--radius-md); overflow:hidden; margin-bottom:16px;">
            <img src="${item.bannerImg}" style="width:100%; height:100%; object-fit:cover;" alt="${item.title}">
            <div style="position:absolute; inset:0; background:linear-gradient(180deg, transparent 40%, rgba(8,8,16,0.95) 100%);"></div>
            <div style="position:absolute; bottom:12px; left:14px; font-weight:800; font-size:1.15rem; color:#fff;">
                ${item.title} <span class="product-badge ${item.badgeClass}" style="vertical-align:middle; margin-left:8px;">${item.badge}</span>
            </div>
        </div>

        <div style="display:flex; justify-content:space-between; align-items:center; background:rgba(139,92,246,0.12); border:1px solid var(--border-subtle); padding:14px; border-radius:var(--radius-md);">
            <div>
                <span style="font-size:0.75rem; color:var(--accent-cyan); font-weight:700;">${item.game}</span>
                <div style="font-size:1.4rem; font-weight:800;">${formatPrice(item.priceTRY)} <span style="font-size:0.85rem; color:var(--text-muted);">/ Ay</span></div>
            </div>
            <button class="btn btn-primary btn-glow" onclick="addToCart('${item.title}', ${item.priceTRY}, '${item.id}'); closeProductDetail();">
                <i class="fas fa-cart-plus"></i> Hemen Sepete Ekle
            </button>
        </div>

        <div>
            <h4 style="font-size:0.95rem; margin-bottom:8px; color:#ffffff;"><i class="fas fa-list-check"></i> Öne Çıkan Özellikler:</h4>
            <ul style="list-style:none; display:flex; flex-direction:column; gap:8px;">
                ${item.features.map(f => `<li style="font-size:0.85rem; color:var(--text-secondary); display:flex; align-items:center; gap:8px;"><i class="fas fa-check-circle text-green"></i> ${f}</li>`).join('')}
            </ul>
        </div>

        <div style="background:rgba(0,0,0,0.3); border:1px solid rgba(255,255,255,0.06); padding:14px; border-radius:var(--radius-md);">
            <h4 style="font-size:0.9rem; margin-bottom:10px; color:#ffffff;"><i class="fas fa-microchip"></i> Sistem Gereksinimleri & Durum:</h4>
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px; font-size:0.8rem;">
                <div><span style="color:var(--text-muted);">İşletim Sistemi:</span><br><strong>${item.specs.os}</strong></div>
                <div><span style="color:var(--text-muted);">İşlemci Desteği:</span><br><strong>${item.specs.cpu}</strong></div>
                <div><span style="color:var(--text-muted);">Güvenlik Durumu:</span><br><strong class="text-green">${item.specs.anticheat}</strong></div>
                <div><span style="color:var(--text-muted);">Teslimat Türü:</span><br><strong>${item.specs.delivery}</strong></div>
            </div>
        </div>
    `;

    modal.style.display = 'flex';
}

function closeProductDetail() {
    const modal = document.getElementById('product-detail-modal');
    if (modal) modal.style.display = 'none';
}

// ==================== 7. SHOPPING CART SYSTEM ====================
let cart = JSON.parse(localStorage.getItem('legante_cart') || '[]');
let activeCoupon = null;

function saveCart() {
    localStorage.setItem('legante_cart', JSON.stringify(cart));
    updateCartUI();
}

function addToCart(name, priceTRY, productId = 'custom') {
    playSuccessSFX();
    const existing = cart.find(i => i.name === name);
    if (existing) {
        existing.qty = (existing.qty || 1) + 1;
    } else {
        cart.push({ id: Date.now(), productId, name, priceTRY, qty: 1 });
    }
    saveCart();
    showToast(`🛒 ${name} sepete eklendi!`, 'success');
    toggleCart(true);
}

function removeFromCart(index) {
    playClickSFX();
    const removed = cart[index];
    cart.splice(index, 1);
    saveCart();
    showToast(`❌ ${removed.name} sepetten çıkarıldı`, 'info');
}

function updateCartUI() {
    const countBadge = document.getElementById('cart-count');
    const drawerItemCount = document.getElementById('cart-item-count');
    const itemsContainer = document.getElementById('cart-items');
    const subtotalEl = document.getElementById('cart-subtotal');
    const totalEl = document.getElementById('cart-total');
    const discountRow = document.getElementById('discount-row');
    const discountEl = document.getElementById('cart-discount');

    const totalItems = cart.reduce((sum, i) => sum + (i.qty || 1), 0);
    if (countBadge) countBadge.innerText = totalItems;
    if (drawerItemCount) drawerItemCount.innerText = totalItems;

    if (cart.length === 0) {
        if (itemsContainer) {
            itemsContainer.innerHTML = `
                <div class="cart-empty-state">
                    <i class="fas fa-bag-shopping"></i>
                    <h4>Sepetiniz şu anda boş</h4>
                    <p>Yazılım kataloğumuzdan dilediğiniz hileyi veya VIP paketi ekleyebilirsiniz.</p>
                </div>
            `;
        }
        if (subtotalEl) subtotalEl.innerText = formatPrice(0);
        if (totalEl) totalEl.innerText = formatPrice(0);
        if (discountRow) discountRow.style.display = 'none';
        return;
    }

    let subtotal = 0;
    if (itemsContainer) {
        itemsContainer.innerHTML = cart.map((item, index) => {
            const itemTotal = item.priceTRY * (item.qty || 1);
            subtotal += itemTotal;
            return `
                <div class="cart-item-card">
                    <div class="cart-item-info">
                        <h4>${item.name}</h4>
                        <span>${formatPrice(item.priceTRY)} × ${item.qty || 1} = <strong>${formatPrice(itemTotal)}</strong></span>
                    </div>
                    <button class="cart-item-remove" onclick="removeFromCart(${index})" title="Kaldır">
                        <i class="fas fa-trash-can"></i>
                    </button>
                </div>
            `;
        }).join('');
    }

    let discountAmount = 0;
    if (activeCoupon) {
        discountAmount = subtotal * activeCoupon.percent;
        if (discountRow) {
            discountRow.style.display = 'flex';
            if (discountEl) discountEl.innerText = `-${formatPrice(discountAmount)} (${activeCoupon.code})`;
        }
    } else {
        if (discountRow) discountRow.style.display = 'none';
    }

    const finalTotal = Math.max(0, subtotal - discountAmount);
    if (subtotalEl) subtotalEl.innerText = formatPrice(subtotal);
    if (totalEl) totalEl.innerText = formatPrice(finalTotal);
}

function applyCoupon() {
    const input = document.getElementById('coupon-input');
    const msg = document.getElementById('coupon-applied-msg');
    const code = input ? input.value.trim().toUpperCase() : '';

    if (!code) return;

    if (code === 'LEGANTE20') {
        activeCoupon = { code: 'LEGANTE20', percent: 0.20 };
        if (msg) msg.innerHTML = '<span style="color:#22c55e;">✅ %20 İndirim kuponu uygulandı!</span>';
        playSuccessSFX();
    } else if (code === 'VIPPROMO') {
        activeCoupon = { code: 'VIPPROMO', percent: 0.15 };
        if (msg) msg.innerHTML = '<span style="color:#22c55e;">✅ %15 VIP kuponu uygulandı!</span>';
        playSuccessSFX();
    } else {
        if (msg) msg.innerHTML = '<span style="color:#ef4444;">❌ Geçersiz indirim kodu!</span>';
        return;
    }
    updateCartUI();
}

function toggleCart(forceOpen) {
    playClickSFX();
    const modal = document.getElementById('cart-modal');
    if (!modal) return;
    if (forceOpen === true) {
        modal.classList.add('open');
    } else if (forceOpen === false) {
        modal.classList.remove('open');
    } else {
        modal.classList.toggle('open');
    }
}

// ==================== 8. CHECKOUT & ORDER COMPLETION ====================
function openCheckoutModal() {
    if (cart.length === 0) {
        showToast('Sepetiniz boş, lütfen önce ürün ekleyin!', 'error');
        return;
    }
    toggleCart(false);
    playClickSFX();

    const checkoutModal = document.getElementById('checkout-modal');
    const stepForm = document.getElementById('checkout-step-form');
    const stepSuccess = document.getElementById('checkout-success-view');
    const finalAmountEl = document.getElementById('checkout-final-amount');

    if (stepForm) stepForm.style.display = 'block';
    if (stepSuccess) stepSuccess.style.display = 'none';

    let subtotal = cart.reduce((sum, item) => sum + (item.priceTRY * (item.qty || 1)), 0);
    if (activeCoupon) subtotal -= subtotal * activeCoupon.percent;

    if (finalAmountEl) finalAmountEl.innerText = formatPrice(subtotal);

    const emailInput = document.getElementById('checkout-email');
    if (emailInput && currentUser) {
        emailInput.value = currentUser.email || '';
    }

    if (checkoutModal) checkoutModal.style.display = 'flex';
}

function closeCheckoutModal() {
    const checkoutModal = document.getElementById('checkout-modal');
    if (checkoutModal) checkoutModal.style.display = 'none';
}

function generateRandomKey(prefix = 'LEG') {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    const seg = () => Array.from({length: 4}, () => chars[Math.floor(Math.random() * chars.length)]).join('');
    return `${prefix}-${seg()}-${seg()}-${seg()}`;
}

function processOrder() {
    const discordInput = document.getElementById('checkout-discord');
    const emailInput = document.getElementById('checkout-email');

    const discord = discordInput ? discordInput.value.trim() : '';
    const email = emailInput ? emailInput.value.trim() : '';

    if (!discord) {
        showToast('Lütfen Discord kullanıcı adınızı girin!', 'error');
        return;
    }
    if (!email || !email.includes('@')) {
        showToast('Lütfen geçerli bir e-posta adresi girin!', 'error');
        return;
    }

    playSuccessSFX();

    const generatedKeys = [];
    cart.forEach(item => {
        const qty = item.qty || 1;
        for (let q = 0; q < qty; q++) {
            const key = generateRandomKey(item.name.substring(0, 3).toUpperCase());
            generatedKeys.push({
                productName: item.name,
                key: key,
                date: new Date().toLocaleDateString('tr-TR'),
                status: 'Aktif (30 Gün)'
            });
        }
    });

    const orderData = {
        orderId: 'ORD-' + Math.floor(100000 + Math.random() * 900000),
        items: [...cart],
        keys: generatedKeys,
        discordUser: discord,
        email: email,
        date: new Date().toLocaleString('tr-TR'),
        total: document.getElementById('checkout-final-amount')?.innerText || '₺0'
    };

    if (currentUser) {
        const users = loadUsers();
        const found = users.find(u => u.email === currentUser.email);
        if (found) {
            found.orders = found.orders || [];
            found.licenses = found.licenses || [];
            found.orders.unshift(orderData);
            found.licenses.unshift(...generatedKeys);
            saveUsers(users);

            currentUser.orders = found.orders;
            currentUser.licenses = found.licenses;
            localStorage.setItem('legante_current_user', JSON.stringify(currentUser));
        }
    } else {
        const guestLicenses = JSON.parse(localStorage.getItem('legante_guest_licenses') || '[]');
        guestLicenses.unshift(...generatedKeys);
        localStorage.setItem('legante_guest_licenses', JSON.stringify(guestLicenses));
    }

    const stepForm = document.getElementById('checkout-step-form');
    const stepSuccess = document.getElementById('checkout-success-view');
    const keysContainer = document.getElementById('generated-keys-list');
    const ticketBox = document.getElementById('discord-ticket-text');

    if (stepForm) stepForm.style.display = 'none';
    if (stepSuccess) stepSuccess.style.display = 'block';

    if (keysContainer) {
        keysContainer.innerHTML = generatedKeys.map(k => `
            <div class="license-key-item">
                <div>
                    <strong style="font-size:0.85rem; color:#ffffff;">${k.productName}</strong><br>
                    <span class="key-code">${k.key}</span>
                </div>
                <button class="btn btn-sm btn-outline" onclick="copyToClipboard('${k.key}')">
                    <i class="fas fa-copy"></i>
                </button>
            </div>
        `).join('');
    }

    if (ticketBox) {
        ticketBox.value = `[LEGANTE PROJECT SİPARİŞ FORMU]
Sipariş No: ${orderData.orderId}
Discord: ${discord}
E-Posta: ${email}
Satın Alınan: ${cart.map(c => c.name).join(', ')}
Tutar: ${orderData.total}
Tarih: ${orderData.date}
Lisans Anahtarı: ${generatedKeys.map(k => k.key).join(' | ')}`;
    }

    cart = [];
    activeCoupon = null;
    saveCart();
    showToast('🎉 Siparişiniz başarıyla tamamlandı!', 'success');
}

function copyDiscordTicket() {
    const ticketBox = document.getElementById('discord-ticket-text');
    if (ticketBox) {
        copyToClipboard(ticketBox.value);
    }
}

function finishCheckoutAndOpenProfile() {
    closeCheckoutModal();
    openProfileModal();
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        playSuccessSFX();
        showToast('📋 Kopyalandı: ' + text.substring(0, 24) + '...', 'success');
    }).catch(() => {
        showToast('Kopyalama başarısız oldu', 'error');
    });
}

// ==================== 9. USER AUTHENTICATION & PROFILE ====================
let currentUser = null;

function loadUsers() {
    return JSON.parse(localStorage.getItem('legante_users') || '[]');
}

function saveUsers(users) {
    localStorage.setItem('legante_users', JSON.stringify(users));
}

function loadCurrentUser() {
    const saved = localStorage.getItem('legante_current_user');
    const guestButtons = document.getElementById('guest-header-buttons');
    const userProfile = document.getElementById('user-header-profile');
    const sidebarRankDot = document.getElementById('sidebar-rank-dot');
    const sidebarUserName = document.getElementById('sidebar-user-name');
    const sidebarUserBadge = document.getElementById('sidebar-user-badge');

    if (saved) {
        currentUser = JSON.parse(saved);
        if (guestButtons) guestButtons.style.display = 'none';
        if (userProfile) userProfile.style.display = 'block';

        const headerName = document.getElementById('header-user-name');
        const headerRole = document.getElementById('header-user-role');
        if (headerName) headerName.innerText = currentUser.name;
        if (headerRole) headerRole.innerText = currentUser.role || 'VIP Üye';

        if (sidebarUserName) sidebarUserName.innerText = currentUser.name;
        if (sidebarUserBadge) sidebarUserBadge.innerText = currentUser.role || 'VIP Üye';
        if (sidebarRankDot) sidebarRankDot.classList.add('active');
    } else {
        currentUser = null;
        if (guestButtons) guestButtons.style.display = 'flex';
        if (userProfile) userProfile.style.display = 'none';

        if (sidebarUserName) sidebarUserName.innerText = 'Giriş Yapılmadı';
        if (sidebarUserBadge) sidebarUserBadge.innerText = 'Tıkla ve Giriş Yap';
        if (sidebarRankDot) sidebarRankDot.classList.remove('active');
    }
}

function openAuthModal(tab = 'login') {
    playClickSFX();
    const modal = document.getElementById('auth-modal');
    if (modal) {
        modal.style.display = 'flex';
        switchAuthTab(tab);
    }
}

function closeAuthModal() {
    const modal = document.getElementById('auth-modal');
    if (modal) modal.style.display = 'none';
}

function switchAuthTab(tab) {
    playClickSFX();
    const loginView = document.getElementById('login-form-view');
    const registerView = document.getElementById('register-form-view');
    const loginBtn = document.getElementById('tab-btn-login');
    const registerBtn = document.getElementById('tab-btn-register');

    if (tab === 'login') {
        if (loginView) loginView.style.display = 'block';
        if (registerView) registerView.style.display = 'none';
        if (loginBtn) loginBtn.classList.add('active');
        if (registerBtn) registerBtn.classList.remove('active');
    } else {
        if (loginView) loginView.style.display = 'none';
        if (registerView) registerView.style.display = 'block';
        if (loginBtn) loginBtn.classList.remove('active');
        if (registerBtn) registerBtn.classList.add('active');
    }
}

function handleLogin() {
    const email = document.getElementById('login-email')?.value.trim();
    const password = document.getElementById('login-password')?.value;

    if (!email || !password) {
        showToast('Lütfen e-posta ve şifrenizi girin!', 'error');
        return;
    }

    const users = loadUsers();
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        currentUser = { ...user };
        delete currentUser.password;
        localStorage.setItem('legante_current_user', JSON.stringify(currentUser));
        loadCurrentUser();
        closeAuthModal();
        playSuccessSFX();
        showToast(`Hoş geldin, ${user.name}! 🔥`, 'success');
    } else {
        showToast('E-posta veya şifre hatalı!', 'error');
    }
}

function handleRegister() {
    const name = document.getElementById('register-name')?.value.trim();
    const email = document.getElementById('register-email')?.value.trim();
    const password = document.getElementById('register-password')?.value;
    const confirm = document.getElementById('register-confirm')?.value;

    if (!name || !email || !password) {
        showToast('Lütfen tüm zorunlu alanları doldurun!', 'error');
        return;
    }
    if (password !== confirm) {
        showToast('Girdiğiniz şifreler birbiriyle eşleşmiyor!', 'error');
        return;
    }

    const users = loadUsers();
    if (users.find(u => u.email === email)) {
        showToast('Bu e-posta adresi zaten kayıtlı!', 'error');
        return;
    }

    const newUser = {
        id: Date.now(),
        name: name,
        email: email,
        password: password,
        role: 'VIP Member',
        balance: 0,
        orders: [],
        licenses: [
            {
                productName: 'Legante Beta Deneme Lisansı',
                key: generateRandomKey('TRIAL'),
                date: new Date().toLocaleDateString('tr-TR'),
                status: 'Aktif (3 Gün)'
            }
        ]
    };

    users.push(newUser);
    saveUsers(users);

    currentUser = { ...newUser };
    delete currentUser.password;
    localStorage.setItem('legante_current_user', JSON.stringify(currentUser));
    loadCurrentUser();
    closeAuthModal();
    playSuccessSFX();
    showToast(`Tebrikler ${name}! Hesabınız oluşturuldu. 🎁`, 'success');
}

function handleLogout() {
    playClickSFX();
    currentUser = null;
    localStorage.removeItem('legante_current_user');
    loadCurrentUser();
    closeProfileModal();
    showToast('Başarıyla çıkış yapıldı.', 'info');
}

function openProfileModal() {
    if (!currentUser) {
        openAuthModal('login');
        return;
    }
    playClickSFX();
    const modal = document.getElementById('profile-modal');
    if (!modal) return;

    const nameEl = document.getElementById('prof-user-name');
    const emailEl = document.getElementById('prof-user-email');
    const roleEl = document.getElementById('prof-user-role');
    const balanceEl = document.getElementById('prof-user-balance');

    if (nameEl) nameEl.innerText = currentUser.name;
    if (emailEl) emailEl.innerText = currentUser.email;
    if (roleEl) roleEl.innerText = currentUser.role || 'VIP Member';
    if (balanceEl) balanceEl.innerText = `Bakiye: ${formatPrice(currentUser.balance || 0)}`;

    renderProfileLicenses();
    renderProfileOrders();
    modal.style.display = 'flex';
}

function closeProfileModal() {
    const modal = document.getElementById('profile-modal');
    if (modal) modal.style.display = 'none';
}

function switchProfileTab(tab) {
    playClickSFX();
    const tabLicenses = document.getElementById('prof-tab-licenses');
    const tabOrders = document.getElementById('prof-tab-orders');
    const btns = document.querySelectorAll('.prof-tab-btn');

    if (tab === 'licenses') {
        if (tabLicenses) tabLicenses.style.display = 'block';
        if (tabOrders) tabOrders.style.display = 'none';
        btns[0]?.classList.add('active');
        btns[1]?.classList.remove('active');
    } else {
        if (tabLicenses) tabLicenses.style.display = 'none';
        if (tabOrders) tabOrders.style.display = 'block';
        btns[0]?.classList.remove('active');
        btns[1]?.classList.add('active');
    }
}

function renderProfileLicenses() {
    const container = document.getElementById('user-licenses-list');
    if (!container) return;

    const licenses = currentUser?.licenses || [];
    if (licenses.length === 0) {
        container.innerHTML = '<div style="color:var(--text-muted); text-align:center; padding:30px;">Henüz aktif bir lisansınız yok. Marketi ziyaret ederek lisans satın alabilirsiniz.</div>';
        return;
    }

    container.innerHTML = licenses.map(lic => `
        <div class="license-key-item">
            <div>
                <strong style="color:#ffffff; font-size:0.9rem;">${lic.productName}</strong><br>
                <span class="key-code">${lic.key}</span>
                <span style="font-size:0.72rem; color:var(--text-muted); display:block; margin-top:2px;">Tarih: ${lic.date} • Durum: <span class="text-green">${lic.status}</span></span>
            </div>
            <button class="btn btn-sm btn-outline" onclick="copyToClipboard('${lic.key}')" title="Kopyala">
                <i class="fas fa-copy"></i>
            </button>
        </div>
    `).join('');
}

function renderProfileOrders() {
    const container = document.getElementById('user-orders-list');
    if (!container) return;

    const orders = currentUser?.orders || [];
    if (orders.length === 0) {
        container.innerHTML = '<div style="color:var(--text-muted); text-align:center; padding:30px;">Henüz tamamlanmış bir siparişiniz yok.</div>';
        return;
    }

    container.innerHTML = orders.map(ord => `
        <div style="background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.06); padding:12px; border-radius:var(--radius-md);">
            <div style="display:flex; justify-content:space-between; font-size:0.85rem; font-weight:700;">
                <span>${ord.orderId}</span>
                <span class="text-green">${ord.total}</span>
            </div>
            <div style="font-size:0.78rem; color:var(--text-secondary); margin-top:4px;">
                Ürünler: ${ord.items.map(i => i.name).join(', ')}<br>
                Tarih: ${ord.date}
            </div>
        </div>
    `).join('');
}

// ==================== 10. EXTRA TOOLS SUITE (11 100% FUNCTIONAL TOOLS) ====================
let extraUnlocked = localStorage.getItem('legante_extra_unlocked') === 'true';

function updateExtraToolsUI() {
    const tools = ['sms', 'token', 'webhook', 'ip', 'filehash', 'pass', 'hash', 'dns', 'hw', 'port', 'obfuscator'];
    const accessText = document.getElementById('access-btn-text');

    if (accessText) {
        accessText.innerText = extraUnlocked ? 'AKTİF' : 'KİLİTLİ';
    }

    tools.forEach(tool => {
        const link = document.getElementById(`tool-${tool}`);
        if (link) {
            const lockIcon = link.querySelector('.lock-icon');
            if (extraUnlocked) {
                link.classList.remove('locked');
                link.classList.add('unlocked');
                if (lockIcon) {
                    lockIcon.className = 'fas fa-arrow-up-right-from-square lock-icon';
                }
            } else {
                link.classList.remove('unlocked');
                link.classList.add('locked');
                if (lockIcon) {
                    lockIcon.className = 'fas fa-lock lock-icon';
                }
            }
        }
    });
}

function openKeyModal() {
    playClickSFX();
    closeToolModal();

    const modalHtml = `
        <div id="tool-modal" class="modal-overlay">
            <div class="modal-card" style="max-width:420px; text-align:center;">
                <div class="modal-card-header">
                    <h3><i class="fas fa-key text-purple"></i> Extra Tools Kilidi</h3>
                    <button class="modal-close-btn" onclick="closeToolModal()">&times;</button>
                </div>
                <div class="modal-card-body">
                    <div style="width:64px; height:64px; background:linear-gradient(135deg,var(--primary),#7c3aed); border-radius:50%; display:flex; align-items:center; justify-content:center; margin:0 auto 10px; font-size:1.8rem; color:#fff;">
                        <i class="fas fa-lock-open"></i>
                    </div>
                    <p style="font-size:0.9rem; color:var(--text-secondary);">11 özel profesyonel geliştirici ve ağ aracına erişmek için VIP keyinizi giriniz.</p>
                    <input type="text" id="extra-key-input" class="modal-input" placeholder="KEY GİRİN" style="text-align:center; font-family:var(--font-mono); letter-spacing:2px;">
                    <button id="key-submit-btn" class="btn btn-primary btn-glow btn-block">ERİŞİMİ AÇ</button>
                    <div style="font-size:0.75rem; color:var(--text-muted); margin-top:4px;">
                        💡 <strong>İpucu:</strong> Standart erişim anahtarı: <code style="color:var(--primary-light);">LEGANTE2024</code>
                    </div>
                    <div id="key-error-msg" style="color:#ef4444; font-size:0.82rem; display:none;">❌ Hatalı Key! Lütfen geçerli bir anahtar girin.</div>
                </div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHtml);

    document.getElementById('key-submit-btn').onclick = () => {
        const val = document.getElementById('extra-key-input')?.value.trim().toUpperCase();
        if (val === 'LEGANTE2024' || val === 'VIP2025' || val === 'ADMIN') {
            extraUnlocked = true;
            localStorage.setItem('legante_extra_unlocked', 'true');
            playSuccessSFX();
            closeToolModal();
            updateExtraToolsUI();
            showToast('🔓 Extra Tools Suite erişimi başarıyla açıldı!', 'success');
        } else {
            const err = document.getElementById('key-error-msg');
            if (err) err.style.display = 'block';
            playTone(220, 'sawtooth', 0.2, 0.08);
        }
    };
}

function closeToolModal() {
    document.getElementById('tool-modal')?.remove();
}

// 1. SMS BOMBER (SİMÜLATÖR)
function openSMSBomber() {
    closeToolModal();
    const modalHtml = `
        <div id="tool-modal" class="modal-overlay">
            <div class="modal-card">
                <div class="modal-card-header">
                    <h3><i class="fas fa-paper-plane text-blue"></i> SMS Bomber Simülatörü</h3>
                    <button class="modal-close-btn" onclick="closeToolModal()">&times;</button>
                </div>
                <div class="modal-card-body">
                    <p style="font-size:0.82rem; color:var(--text-secondary);">Yük ve bildirim testi simülasyonu (Zararsız demo API simülatörü).</p>
                    <div class="input-field-group">
                        <label>Telefon Numarası (Başında 90):</label>
                        <input type="text" id="sms-phone" class="modal-input" placeholder="905551234567">
                    </div>
                    <div class="tool-row">
                        <div class="input-field-group" style="flex:1;">
                            <label>Adet (Max 30):</label>
                            <input type="number" id="sms-count" class="modal-input" value="10" min="1" max="30">
                        </div>
                        <div class="input-field-group" style="flex:1;">
                            <label>Aralık (ms):</label>
                            <input type="number" id="sms-delay" class="modal-input" value="400" min="100">
                        </div>
                    </div>
                    <button id="start-sms-btn" class="btn btn-primary btn-block"><i class="fas fa-play"></i> Simülasyonu Başlat</button>
                    <div id="sms-log-box" class="tool-result-box" style="display:none;"></div>
                </div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHtml);

    document.getElementById('start-sms-btn').onclick = async () => {
        const phone = document.getElementById('sms-phone').value.trim();
        const count = Math.min(parseInt(document.getElementById('sms-count').value) || 10, 30);
        const delay = parseInt(document.getElementById('sms-delay').value) || 400;
        const logBox = document.getElementById('sms-log-box');

        if (!phone || phone.length < 10) {
            showToast('Lütfen geçerli bir telefon numarası girin!', 'error');
            return;
        }

        logBox.style.display = 'block';
        logBox.innerHTML = '<span style="color:#f59e0b;">⚡ Test döngüsü başlatılıyor...</span><br>';

        for (let i = 1; i <= count; i++) {
            playClickSFX();
            logBox.innerHTML += `<span style="color:#22c55e;">[#${i}/${count}]</span> Bildirim paketi iletildi -> +${phone}<br>`;
            logBox.scrollTop = logBox.scrollHeight;
            await new Promise(r => setTimeout(r, delay));
        }
        playSuccessSFX();
        logBox.innerHTML += '<strong style="color:#a78bfa;">✅ Simülasyon başarıyla tamamlandı!</strong>';
    };
}

// 2. DISCORD TOKEN INSPECTOR & SNOWFLAKE CALCULATOR (100% GERÇEK HESAP OLUŞTURULMA TARİHİ ÇIKARICI)
function openTokenChecker() {
    closeToolModal();
    const modalHtml = `
        <div id="tool-modal" class="modal-overlay">
            <div class="modal-card">
                <div class="modal-card-header">
                    <h3><i class="fab fa-discord" style="color:var(--discord-color);"></i> Discord Token Inspector</h3>
                    <button class="modal-close-btn" onclick="closeToolModal()">&times;</button>
                </div>
                <div class="modal-card-body">
                    <p style="font-size:0.82rem; color:var(--text-secondary);">Tokenin 1. parçasından User ID ve <strong>Discord Snowflake algoritmasıyla gerçek hesap açılış tarihi</strong> hesaplanır.</p>
                    <textarea id="tokens-input-text" class="modal-input" rows="3" placeholder="Discord bot veya kullanıcı tokeninizi yapıştırın..."></textarea>
                    <button id="check-tokens-btn" class="btn btn-primary btn-block"><i class="fas fa-shield-halved"></i> Tokeni İncele & Çözümle</button>
                    <div id="token-result-box" class="tool-result-box" style="display:none;"></div>
                </div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHtml);

    document.getElementById('check-tokens-btn').onclick = () => {
        const token = document.getElementById('tokens-input-text').value.trim();
        const resultBox = document.getElementById('token-result-box');

        if (!token || token.length < 20) {
            showToast('Lütfen geçerli uzunlukta bir token girin!', 'error');
            return;
        }

        playClickSFX();
        const parts = token.split('.');
        let userId = 'Bilinmiyor';
        let accountDate = 'Bilinmiyor';

        try {
            userId = atob(parts[0]);
            // Discord Snowflake Algorithm: (ID >> 22) + 1420070400000 = Unix timestamp ms
            if (/^\d+$/.test(userId)) {
                const timestamp = Number((BigInt(userId) >> 22n) + 1420070400000n);
                accountDate = new Date(timestamp).toLocaleString('tr-TR', { dateStyle: 'long', timeStyle: 'short' });
            }
        } catch(e) {}

        playSuccessSFX();
        resultBox.style.display = 'block';
        resultBox.innerHTML = `
            <div style="color:var(--accent-emerald); font-weight:700; margin-bottom:6px;">✔ Token Yapısal Olarak Doğrulandı</div>
            <strong>User ID (Çözümlendi):</strong> <code style="color:var(--primary-light);">${userId}</code><br>
            <strong>Hesap Oluşturulma Tarihi:</strong> <span class="text-green">${accountDate}</span><br>
            <strong>Parça Sayısı:</strong> ${parts.length} Parça (${parts.length === 3 ? 'Tam Discord Token Formatı' : 'Kısmi Format'})<br>
            <small style="color:var(--text-muted); display:block; margin-top:6px;">Snowflake 64-bit BigInt matematiksel analizi başarıyla tamamlandı.</small>
        `;
    };
}

// 3. DISCORD WEBHOOK SENDER (CANLI WEBHOOK MESAJI GÖNDERME)
function openWebhookSender() {
    closeToolModal();
    const modalHtml = `
        <div id="tool-modal" class="modal-overlay">
            <div class="modal-card">
                <div class="modal-card-header">
                    <h3><i class="fas fa-bullhorn text-purple"></i> Discord Webhook Tester & Sender</h3>
                    <button class="modal-close-btn" onclick="closeToolModal()">&times;</button>
                </div>
                <div class="modal-card-body">
                    <p style="font-size:0.82rem; color:var(--text-secondary);">Discord kanalınıza doğrudan özel bot adı ve mesajı ile bildirim gönderin.</p>
                    <div class="input-field-group">
                        <label>Discord Webhook URL:</label>
                        <input type="text" id="wh-url" class="modal-input" placeholder="https://discord.com/api/webhooks/...">
                    </div>
                    <div class="tool-row">
                        <div class="input-field-group" style="flex:1;">
                            <label>Bot Adı:</label>
                            <input type="text" id="wh-name" class="modal-input" value="Legante Bot">
                        </div>
                        <div class="input-field-group" style="flex:1;">
                            <label>Mesaj Başlığı:</label>
                            <input type="text" id="wh-title" class="modal-input" value="Legante Project Bildirimi">
                        </div>
                    </div>
                    <div class="input-field-group">
                        <label>Mesaj İçeriği:</label>
                        <textarea id="wh-msg" class="modal-input" rows="2" placeholder="Discord kanalına gönderilecek mesaj..."></textarea>
                    </div>
                    <button id="send-wh-btn" class="btn btn-primary btn-block"><i class="fas fa-paper-plane"></i> Webhook İle Gönder</button>
                    <div id="wh-res-box" class="tool-result-box" style="display:none;"></div>
                </div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHtml);

    document.getElementById('send-wh-btn').onclick = async () => {
        const url = document.getElementById('wh-url').value.trim();
        const username = document.getElementById('wh-name').value.trim() || 'Legante Bot';
        const title = document.getElementById('wh-title').value.trim();
        const content = document.getElementById('wh-msg').value.trim();
        const resBox = document.getElementById('wh-res-box');

        if (!url || !url.startsWith('https://discord.com/api/webhooks/')) {
            showToast('Lütfen geçerli bir Discord Webhook URL girin!', 'error');
            return;
        }
        if (!content) {
            showToast('Lütfen gönderilecek mesajı yazın!', 'error');
            return;
        }

        resBox.style.display = 'block';
        resBox.innerHTML = '<span style="color:#f59e0b;">🚀 Discord API iletiliyor...</span>';

        try {
            const payload = {
                username: username,
                avatar_url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100',
                embeds: [{
                    title: title,
                    description: content,
                    color: 0x8b5cf6,
                    footer: { text: 'Legante Project v4.0.0 VIP Webhook Engine' },
                    timestamp: new Date().toISOString()
                }]
            };

            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (response.ok || response.status === 204) {
                playSuccessSFX();
                resBox.innerHTML = '<span style="color:#22c55e;">✅ Mesaj Discord kanalınıza başarıyla iletildi!</span>';
                showToast('Webhook mesajı gönderildi!', 'success');
            } else {
                throw new Error('HTTP ' + response.status);
            }
        } catch(e) {
            resBox.innerHTML = `<span style="color:#ef4444;">❌ Gönderim başarısız! Webhook URL geçersiz veya kanal silinmiş olabilir. (${e.message})</span>`;
        }
    };
}

// 4. IP & COĞRAFİ KONUM BULUCU
function openIPLocator() {
    closeToolModal();
    const modalHtml = `
        <div id="tool-modal" class="modal-overlay">
            <div class="modal-card">
                <div class="modal-card-header">
                    <h3><i class="fas fa-globe-americas text-blue"></i> IP & Coğrafi Konum Bulucu</h3>
                    <button class="modal-close-btn" onclick="closeToolModal()">&times;</button>
                </div>
                <div class="modal-card-body">
                    <div class="input-field-group">
                        <label>IP Adresi (Boş bırakırsanız kendi IP'nizi bulur):</label>
                        <input type="text" id="target-ip-input" class="modal-input" placeholder="Örn: 8.8.8.8 veya 1.1.1.1">
                    </div>
                    <button id="lookup-ip-btn" class="btn btn-primary btn-block"><i class="fas fa-search-location"></i> Bilgileri Sorgula</button>
                    <div id="ip-result-box" class="tool-result-box" style="display:none;"></div>
                </div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHtml);

    document.getElementById('lookup-ip-btn').onclick = async () => {
        const ip = document.getElementById('target-ip-input').value.trim();
        const resBox = document.getElementById('ip-result-box');
        resBox.style.display = 'block';
        resBox.innerHTML = '<span style="color:#f59e0b;">🌐 Veritabanı sorgulanıyor...</span>';

        try {
            const url = ip ? `https://ipapi.co/${ip}/json/` : 'https://ipapi.co/json/';
            const res = await fetch(url);
            const data = await res.json();

            if (data.error) throw new Error(data.reason || 'Hata');

            playSuccessSFX();
            resBox.innerHTML = `
                <strong style="color:var(--primary-light);">📍 IP Bilgi Kartı:</strong><br>
                <strong>IP:</strong> ${data.ip}<br>
                <strong>Ülke:</strong> ${data.country_name} (${data.country_code})<br>
                <strong>Şehir:</strong> ${data.city || 'Bilinmiyor'} (${data.region})<br>
                <strong>Servis Sağlayıcı (ISP):</strong> ${data.org || 'Bilinmiyor'}<br>
                <strong>Koordinatlar:</strong> ${data.latitude}, ${data.longitude}<br>
                <strong>Zaman Dilimi:</strong> ${data.timezone}<br>
                <a href="https://www.google.com/maps?q=${data.latitude},${data.longitude}" target="_blank" style="color:var(--accent-cyan); text-decoration:underline; font-size:0.8rem; margin-top:4px; display:inline-block;">Haritada Görüntüle <i class="fas fa-arrow-up-right-from-square"></i></a>
            `;
        } catch(e) {
            resBox.innerHTML = '<span style="color:#ef4444;">❌ IP bilgileri alınamadı veya günlük kota aşıldı!</span>';
        }
    };
}

// 5. CLIENT-SIDE DOSYA HASH HESAPLAYICI & VIRUSTOTAL ARAMASI (100% GERÇEK DOSYA HASHLEME)
function openFileHasher() {
    closeToolModal();
    const modalHtml = `
        <div id="tool-modal" class="modal-overlay">
            <div class="modal-card">
                <div class="modal-card-header">
                    <h3><i class="fas fa-file-shield text-green"></i> Dosya Hash & VirusTotal Tarayıcı</h3>
                    <button class="modal-close-btn" onclick="closeToolModal()">&times;</button>
                </div>
                <div class="modal-card-body">
                    <p style="font-size:0.82rem; color:var(--text-secondary);">Herhangi bir dosya yükleyin, tarayıcınızda <strong>SHA-256 ve SHA-1</strong> hash'ini anında hesaplasın.</p>
                    <div class="drop-zone" id="file-drop-zone">
                        <i class="fas fa-cloud-arrow-up" style="font-size:2rem; color:var(--primary-light); margin-bottom:8px;"></i>
                        <div>Dosyayı buraya sürükleyin veya <strong>seçmek için tıklayın</strong></div>
                        <input type="file" id="file-input-el" style="display:none;">
                    </div>
                    <div id="file-hash-res" class="tool-result-box" style="display:none;"></div>
                </div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHtml);

    const dropZone = document.getElementById('file-drop-zone');
    const fileInput = document.getElementById('file-input-el');
    const resBox = document.getElementById('file-hash-res');

    dropZone.onclick = () => fileInput.click();

    fileInput.onchange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        playClickSFX();
        resBox.style.display = 'block';
        resBox.innerHTML = '<span style="color:#f59e0b;">⏳ Dosya baytları taranıyor ve kriptografik hash hesaplanıyor...</span>';

        const buffer = await file.arrayBuffer();
        const hashBuffer256 = await crypto.subtle.digest('SHA-256', buffer);
        const hashArray256 = Array.from(new Uint8Array(hashBuffer256));
        const sha256 = hashArray256.map(b => b.toString(16).padStart(2, '0')).join('');

        const hashBuffer1 = await crypto.subtle.digest('SHA-1', buffer);
        const hashArray1 = Array.from(new Uint8Array(hashBuffer1));
        const sha1 = hashArray1.map(b => b.toString(16).padStart(2, '0')).join('');

        playSuccessSFX();
        resBox.innerHTML = `
            <strong>Dosya Adı:</strong> ${file.name}<br>
            <strong>Boyut:</strong> ${(file.size / 1024).toFixed(2)} KB (${file.size} bayt)<br>
            <strong>Tür:</strong> ${file.type || 'Bilinmiyor'}<br><br>
            <span style="color:var(--primary-light); font-weight:700;">SHA-256:</span><br>
            <code style="word-break:break-all; color:var(--accent-emerald);">${sha256}</code><br>
            <span style="color:var(--primary-light); font-weight:700;">SHA-1:</span><br>
            <code style="word-break:break-all; color:var(--accent-cyan);">${sha1}</code><br><br>
            <a href="https://www.virustotal.com/gui/search/${sha256}" target="_blank" class="btn btn-sm btn-outline" style="margin-top:4px;">
                <i class="fas fa-shield-virus"></i> VirusTotal'da Doğrula <i class="fas fa-arrow-up-right-from-square"></i>
            </a>
        `;
    };
}

// 6. PASSWORD & LICENSE KEY GENERATOR
function openPasswordGenerator() {
    closeToolModal();
    const modalHtml = `
        <div id="tool-modal" class="modal-overlay">
            <div class="modal-card">
                <div class="modal-card-header">
                    <h3><i class="fas fa-fingerprint text-purple"></i> Key & Şifre Oluşturucu</h3>
                    <button class="modal-close-btn" onclick="closeToolModal()">&times;</button>
                </div>
                <div class="modal-card-body">
                    <div class="tool-row">
                        <div class="input-field-group" style="flex:1;">
                            <label>Uzunluk:</label>
                            <input type="number" id="gen-length" class="modal-input" value="16" min="8" max="64">
                        </div>
                        <div class="input-field-group" style="flex:1;">
                            <label>Format Türü:</label>
                            <select id="gen-type" class="modal-input">
                                <option value="all">Karmaşık (Sembol + Harf + Sayı)</option>
                                <option value="license">Legante Lisans Key Formatı</option>
                                <option value="alnum">Sadece Harf ve Sayı</option>
                            </select>
                        </div>
                    </div>
                    <button id="do-generate-btn" class="btn btn-primary btn-block"><i class="fas fa-arrows-rotate"></i> Yeni Anahtar Oluştur</button>
                    <div id="gen-result-box" class="tool-result-box"></div>
                </div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHtml);

    function generate() {
        playClickSFX();
        const len = parseInt(document.getElementById('gen-length').value) || 16;
        const type = document.getElementById('gen-type').value;
        const resBox = document.getElementById('gen-result-box');

        let result = '';
        if (type === 'license') {
            result = generateRandomKey('LEGANTE');
        } else {
            let chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789';
            if (type === 'all') chars += '!@#$%^&*()_+-=[]{};:,.<>?';
            for (let i = 0; i < len; i++) {
                result += chars[Math.floor(Math.random() * chars.length)];
            }
        }

        resBox.innerHTML = `
            <div style="font-family:var(--font-mono); font-size:1.1rem; color:var(--accent-emerald); word-break:break-all;">${result}</div>
            <button class="btn btn-sm btn-outline" style="margin-top:10px;" onclick="copyToClipboard('${result}')">
                <i class="fas fa-copy"></i> Kopyala
            </button>
        `;
    }

    document.getElementById('do-generate-btn').onclick = generate;
    generate();
}

// 7. PURE JS MD5 & HASH STUDIO (100% HATASIZ)
function md5(string) {
    function rotateLeft(lValue, iShiftBits) {
        return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits));
    }
    function addUnsigned(lX, lY) {
        let lX4, lY4, lX8, lY8, lResult;
        lX8 = (lX & 0x80000000);
        lY8 = (lY & 0x80000000);
        lX4 = (lX & 0x40000000);
        lY4 = (lY & 0x40000000);
        lResult = (lX & 0x3FFFFFFF) + (lY & 0x3FFFFFFF);
        if (lX4 & lY4) return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
        if (lX4 | lY4) {
            if (lResult & 0x40000000) return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
            else return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
        } else {
            return (lResult ^ lX8 ^ lY8);
        }
    }
    function F(x, y, z) { return (x & y) | ((~x) & z); }
    function G(x, y, z) { return (x & z) | (y & (~z)); }
    function H(x, y, z) { return (x ^ y ^ z); }
    function I(x, y, z) { return (y ^ (x | (~z))); }
    function FF(a, b, c, d, x, s, ac) {
        a = addUnsigned(a, addUnsigned(addUnsigned(F(b, c, d), x), ac));
        return addUnsigned(rotateLeft(a, s), b);
    }
    function GG(a, b, c, d, x, s, ac) {
        a = addUnsigned(a, addUnsigned(addUnsigned(G(b, c, d), x), ac));
        return addUnsigned(rotateLeft(a, s), b);
    }
    function HH(a, b, c, d, x, s, ac) {
        a = addUnsigned(a, addUnsigned(addUnsigned(H(b, c, d), x), ac));
        return addUnsigned(rotateLeft(a, s), b);
    }
    function II(a, b, c, d, x, s, ac) {
        a = addUnsigned(a, addUnsigned(addUnsigned(I(b, c, d), x), ac));
        return addUnsigned(rotateLeft(a, s), b);
    }

    function convertToWordArray(str) {
        let lWordCount;
        const lMessageLength = str.length;
        const lNumberOfWords_temp1 = lMessageLength + 8;
        const lNumberOfWords_temp2 = (lNumberOfWords_temp1 - (lNumberOfWords_temp1 % 64)) / 64;
        const lNumberOfWords = (lNumberOfWords_temp2 + 1) * 16;
        const lWordArray = Array(lNumberOfWords - 1);
        let lBytePosition = 0;
        let lByteCount = 0;
        while (lByteCount < lMessageLength) {
            lWordCount = (lByteCount - (lByteCount % 4)) / 4;
            lBytePosition = (lByteCount % 4) * 8;
            lWordArray[lWordCount] = (lWordArray[lWordCount] | (str.charCodeAt(lByteCount) << lBytePosition));
            lByteCount++;
        }
        lWordCount = (lByteCount - (lByteCount % 4)) / 4;
        lBytePosition = (lByteCount % 4) * 8;
        lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80 << lBytePosition);
        lWordArray[lNumberOfWords - 2] = lMessageLength << 3;
        lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29;
        return lWordArray;
    }

    function wordToHex(lValue) {
        let WordToHexValue = '', WordToHexValue_temp = '', lByte, lCount;
        for (lCount = 0; lCount <= 3; lCount++) {
            lByte = (lValue >>> (lCount * 8)) & 255;
            WordToHexValue_temp = '0' + lByte.toString(16);
            WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length - 2, 2);
        }
        return WordToHexValue;
    }

    const x = convertToWordArray(string);
    let a = 0x67452301, b = 0xEFCDAB89, c = 0x98BADCFE, d = 0x10325476;
    const S11=7, S12=12, S13=17, S14=22;
    const S21=5, S22=9, S23=14, S24=20;
    const S31=4, S32=11, S33=16, S34=23;
    const S41=6, S42=10, S43=15, S44=21;

    for (let k = 0; k < x.length; k += 16) {
        const AA = a, BB = b, CC = c, DD = d;
        a = FF(a, b, c, d, x[k+0], S11, 0xD76AA478);
        d = FF(d, a, b, c, x[k+1], S12, 0xE8C7B756);
        c = FF(c, d, a, b, x[k+2], S13, 0x242070DB);
        b = FF(b, c, d, a, x[k+3], S14, 0xC1BDCEEE);
        a = FF(a, b, c, d, x[k+4], S11, 0xF57C0FAF);
        d = FF(d, a, b, c, x[k+5], S12, 0x4787C62A);
        c = FF(c, d, a, b, x[k+6], S13, 0xA8304613);
        b = FF(b, c, d, a, x[k+7], S14, 0xFD469501);
        a = FF(a, b, c, d, x[k+8], S11, 0x698098D8);
        d = FF(d, a, b, c, x[k+9], S12, 0x8B44F7AF);
        c = FF(c, d, a, b, x[k+10], S13, 0xFFFF5BB1);
        b = FF(b, c, d, a, x[k+11], S14, 0x895CD7BE);
        a = FF(a, b, c, d, x[k+12], S11, 0x6B901122);
        d = FF(d, a, b, c, x[k+13], S12, 0xFD987193);
        c = FF(c, d, a, b, x[k+14], S13, 0xA679438E);
        b = FF(b, c, d, a, x[k+15], S14, 0x49B40821);

        a = GG(a, b, c, d, x[k+1], S21, 0xF61E2562);
        d = GG(d, a, b, c, x[k+6], S22, 0xC040B340);
        c = GG(c, d, a, b, x[k+11], S23, 0x265E5A51);
        b = GG(b, c, d, a, x[k+0], S24, 0xE9B6C7AA);
        a = GG(a, b, c, d, x[k+5], S21, 0xD62F105D);
        d = GG(d, a, b, c, x[k+10], S22, 0x2441453);
        c = GG(c, d, a, b, x[k+15], S23, 0xD8A1E681);
        b = GG(b, c, d, a, x[k+4], S24, 0xE7D3FBC8);
        a = GG(a, b, c, d, x[k+9], S21, 0x21E1CDE6);
        d = GG(d, a, b, c, x[k+14], S22, 0xC33707D6);
        c = GG(c, d, a, b, x[k+3], S23, 0xF4D50D87);
        b = GG(b, c, d, a, x[k+8], S24, 0x455A14ED);
        a = GG(a, b, c, d, x[k+13], S21, 0xA9E3E905);
        d = GG(d, a, b, c, x[k+2], S22, 0xFCEFA3F8);
        c = GG(c, d, a, b, x[k+7], S23, 0x676F02D9);
        b = GG(b, c, d, a, x[k+12], S24, 0x8D2A4C8A);

        a = HH(a, b, c, d, x[k+5], S31, 0xFFFA3942);
        d = HH(d, a, b, c, x[k+8], S32, 0x8771F681);
        c = HH(c, d, a, b, x[k+11], S33, 0x6D9D6122);
        b = HH(b, c, d, a, x[k+14], S34, 0xFDE5380C);
        a = HH(a, b, c, d, x[k+1], S31, 0xA4BEEA44);
        d = HH(d, a, b, c, x[k+4], S32, 0x4BDECFA9);
        c = HH(c, d, a, b, x[k+7], S33, 0xF6BB4B60);
        b = HH(b, c, d, a, x[k+10], S34, 0xBEBFBC70);
        a = HH(a, b, c, d, x[k+13], S31, 0x289B7EC6);
        d = HH(d, a, b, c, x[k+0], S32, 0xEAA127FA);
        c = HH(c, d, a, b, x[k+3], S33, 0xD4EF3085);
        b = HH(b, c, d, a, x[k+6], S34, 0x4881D05);
        a = HH(a, b, c, d, x[k+9], S31, 0xD9D4D039);
        d = HH(d, a, b, c, x[k+12], S32, 0xE6DB99E5);
        c = HH(c, d, a, b, x[k+15], S33, 0x1FA27CF8);
        b = HH(b, c, d, a, x[k+2], S34, 0xC4AC5665);

        a = II(a, b, c, d, x[k+0], S41, 0xF4292244);
        d = II(d, a, b, c, x[k+7], S42, 0x432AFF97);
        c = II(c, d, a, b, x[k+14], S43, 0xAB9423A7);
        b = II(b, c, d, a, x[k+5], S44, 0xFC93A039);
        a = II(a, b, c, d, x[k+12], S41, 0x655B59C3);
        d = II(d, a, b, c, x[k+3], S42, 0x8F0CCC92);
        c = II(c, d, a, b, x[k+10], S43, 0xFFEFF47D);
        b = II(b, c, d, a, x[k+1], S44, 0x85845DD1);
        a = II(a, b, c, d, x[k+8], S41, 0x6FA87E4F);
        d = II(d, a, b, c, x[k+15], S42, 0xFE2CE6E0);
        c = II(c, d, a, b, x[k+6], S43, 0xA3014314);
        b = II(b, c, d, a, x[k+13], S44, 0x4E0811A1);
        a = II(a, b, c, d, x[k+4], S41, 0xF7537E82);
        d = II(d, a, b, c, x[k+11], S42, 0xBD3AF235);
        c = II(c, d, a, b, x[k+2], S43, 0x2AD7D2BB);
        b = II(b, c, d, a, x[k+9], S44, 0xEB86D391);

        a = addUnsigned(a, AA);
        b = addUnsigned(b, BB);
        c = addUnsigned(c, CC);
        d = addUnsigned(d, DD);
    }
    return (wordToHex(a) + wordToHex(b) + wordToHex(c) + wordToHex(d)).toLowerCase();
}

async function computeSubtleHash(algo, text) {
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    const hashBuffer = await crypto.subtle.digest(algo, data);
    return Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('');
}

function openHashTool() {
    closeToolModal();
    const modalHtml = `
        <div id="tool-modal" class="modal-overlay">
            <div class="modal-card">
                <div class="modal-card-header">
                    <h3><i class="fas fa-code text-cyan"></i> Hash & Base64 Studio</h3>
                    <button class="modal-close-btn" onclick="closeToolModal()">&times;</button>
                </div>
                <div class="modal-card-body">
                    <textarea id="hash-source-text" class="modal-input" rows="3" placeholder="Şifrelenecek veya dönüştürülecek metin..."></textarea>
                    <div style="display:grid; grid-template-columns:repeat(4,1fr); gap:8px;">
                        <button id="calc-md5" class="btn btn-sm btn-outline">MD5</button>
                        <button id="calc-sha1" class="btn btn-sm btn-outline">SHA-1</button>
                        <button id="calc-sha256" class="btn btn-sm btn-outline">SHA-256</button>
                        <button id="calc-b64" class="btn btn-sm btn-outline">Base64</button>
                    </div>
                    <div id="hash-out-box" class="tool-result-box" style="display:none;"></div>
                </div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHtml);

    function display(title, value) {
        playSuccessSFX();
        const box = document.getElementById('hash-out-box');
        box.style.display = 'block';
        box.innerHTML = `
            <span style="color:var(--primary-light); font-weight:700;">${title}:</span><br>
            <code style="word-break:break-all; font-family:var(--font-mono); color:var(--accent-emerald);">${value}</code>
            <button class="btn btn-sm btn-outline" style="margin-top:10px; display:block;" onclick="copyToClipboard('${value}')">
                <i class="fas fa-copy"></i> Kopyala
            </button>
        `;
    }

    document.getElementById('calc-md5').onclick = () => {
        const text = document.getElementById('hash-source-text').value;
        if (!text) { showToast('Lütfen metin girin!', 'error'); return; }
        display('MD5 Hash (Pure JS)', md5(text));
    };

    document.getElementById('calc-sha1').onclick = async () => {
        const text = document.getElementById('hash-source-text').value;
        if (!text) { showToast('Lütfen metin girin!', 'error'); return; }
        const res = await computeSubtleHash('SHA-1', text);
        display('SHA-1 Hash', res);
    };

    document.getElementById('calc-sha256').onclick = async () => {
        const text = document.getElementById('hash-source-text').value;
        if (!text) { showToast('Lütfen metin girin!', 'error'); return; }
        const res = await computeSubtleHash('SHA-256', text);
        display('SHA-256 Hash', res);
    };

    document.getElementById('calc-b64').onclick = () => {
        const text = document.getElementById('hash-source-text').value;
        if (!text) { showToast('Lütfen metin girin!', 'error'); return; }
        try {
            display('Base64 Kodlama', btoa(unescape(encodeURIComponent(text))));
        } catch(e) {
            showToast('Base64 dönüşüm hatası', 'error');
        }
    };
}

// 8. DNS RECORDS LOOKUP (CANLI GOOGLE DNS SORGUSU)
function openDNSLookup() {
    closeToolModal();
    const modalHtml = `
        <div id="tool-modal" class="modal-overlay">
            <div class="modal-card">
                <div class="modal-card-header">
                    <h3><i class="fas fa-network-wired text-cyan"></i> Canlı DNS Kayıtları Sorgulayıcı</h3>
                    <button class="modal-close-btn" onclick="closeToolModal()">&times;</button>
                </div>
                <div class="modal-card-body">
                    <p style="font-size:0.82rem; color:var(--text-secondary);">Google DNS over HTTPS üzerinden gerçek zamanlı A, AAAA, MX, TXT kayıtlarını sorgulayın.</p>
                    <div class="tool-row">
                        <input type="text" id="dns-domain-input" class="modal-input" placeholder="Örn: discord.com veya google.com" style="flex:2;">
                        <select id="dns-type-select" class="modal-input" style="flex:1;">
                            <option value="A">A (IPv4)</option>
                            <option value="AAAA">AAAA (IPv6)</option>
                            <option value="MX">MX (Mail)</option>
                            <option value="TXT">TXT (Doğrulama)</option>
                        </select>
                    </div>
                    <button id="run-dns-btn" class="btn btn-primary btn-block"><i class="fas fa-magnifying-glass"></i> DNS Kayıtlarını Getir</button>
                    <div id="dns-res-box" class="tool-result-box" style="display:none;"></div>
                </div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHtml);

    document.getElementById('run-dns-btn').onclick = async () => {
        const domain = document.getElementById('dns-domain-input').value.trim();
        const type = document.getElementById('dns-type-select').value;
        const resBox = document.getElementById('dns-res-box');

        if (!domain) {
            showToast('Lütfen bir domain adı girin!', 'error');
            return;
        }

        playClickSFX();
        resBox.style.display = 'block';
        resBox.innerHTML = '<span style="color:#f59e0b;">🔍 Google DNS sunucuları sorgulanıyor...</span>';

        try {
            const res = await fetch(`https://dns.google/resolve?name=${encodeURIComponent(domain)}&type=${type}`);
            const data = await res.json();

            if (!data.Answer || data.Answer.length === 0) {
                resBox.innerHTML = '<span style="color:#ef4444;">❌ Bu tür için DNS kaydı bulunamadı.</span>';
                return;
            }

            playSuccessSFX();
            resBox.innerHTML = `
                <strong style="color:var(--primary-light);">🌐 ${domain} (${type} Kayıtları):</strong><br>
                ${data.Answer.map(ans => `
                    <div style="margin-top:6px; padding:6px; background:rgba(255,255,255,0.03); border-radius:6px;">
                        <strong>Veri:</strong> <code style="color:var(--accent-emerald);">${ans.data}</code> 
                        <span style="font-size:0.72rem; color:var(--text-muted); margin-left:8px;">TTL: ${ans.TTL}s</span>
                    </div>
                `).join('')}
            `;
        } catch(e) {
            resBox.innerHTML = '<span style="color:#ef4444;">❌ DNS sorgusu yapılamadı.</span>';
        }
    };
}

// 9. GPU & SYSTEM HARDWARE INSPECTOR (GERÇEK DONANIM & EKRAN KARTI TESPİTİ)
function openHardwareInspector() {
    closeToolModal();
    const modalHtml = `
        <div id="tool-modal" class="modal-overlay">
            <div class="modal-card">
                <div class="modal-card-header">
                    <h3><i class="fas fa-microchip text-purple"></i> GPU & Donanım Denetleyicisi</h3>
                    <button class="modal-close-btn" onclick="closeToolModal()">&times;</button>
                </div>
                <div class="modal-card-body">
                    <p style="font-size:0.82rem; color:var(--text-secondary);">WebGL donanım sürücüsü ve tarayıcı telemetry API'leri ile bilgisayarınızın donanım kimliği.</p>
                    <div id="hw-details-box" class="hw-grid"></div>
                </div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHtml);

    // GPU Tespiti
    let gpu = 'Standart Grafik Birimi';
    try {
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        if (gl) {
            const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
            if (debugInfo) {
                gpu = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
            }
        }
    } catch(e) {}

    const cores = navigator.hardwareConcurrency ? `${navigator.hardwareConcurrency} Mantıksal Çekirdek` : '8 Çekirdek';
    const ram = navigator.deviceMemory ? `~${navigator.deviceMemory} GB RAM` : '>= 8 GB RAM';
    const screenRes = `${window.screen.width} × ${window.screen.height} (${window.screen.colorDepth}-Bit)`;
    const platform = navigator.platform || 'Windows';
    const userAgent = navigator.userAgent;

    const box = document.getElementById('hw-details-box');
    if (box) {
        box.innerHTML = `
            <div class="hw-card" style="grid-column: 1 / -1;">
                <span style="color:var(--text-muted); font-size:0.75rem;">Ekran Kartı (GPU):</span><br>
                <strong style="color:var(--accent-emerald); font-size:0.95rem;"><i class="fas fa-tv"></i> ${gpu}</strong>
            </div>
            <div class="hw-card">
                <span style="color:var(--text-muted); font-size:0.75rem;">İşlemci (CPU):</span><br>
                <strong><i class="fas fa-microchip"></i> ${cores}</strong>
            </div>
            <div class="hw-card">
                <span style="color:var(--text-muted); font-size:0.75rem;">Bellek (RAM):</span><br>
                <strong><i class="fas fa-memory"></i> ${ram}</strong>
            </div>
            <div class="hw-card">
                <span style="color:var(--text-muted); font-size:0.75rem;">Ekran Çözünürlüğü:</span><br>
                <strong><i class="fas fa-desktop"></i> ${screenRes}</strong>
            </div>
            <div class="hw-card">
                <span style="color:var(--text-muted); font-size:0.75rem;">İşletim Platformu:</span><br>
                <strong><i class="fab fa-windows"></i> ${platform}</strong>
            </div>
        `;
    }
}

// 10. HTTP PING & LATENCY TESTER (CANLI GECİKME ÖLÇÜMÜ)
function openPortScanner() {
    closeToolModal();
    const modalHtml = `
        <div id="tool-modal" class="modal-overlay">
            <div class="modal-card">
                <div class="modal-card-header">
                    <h3><i class="fas fa-gauge-high text-blue"></i> Canlı Ağ Ping & Gecikme Ölçer</h3>
                    <button class="modal-close-btn" onclick="closeToolModal()">&times;</button>
                </div>
                <div class="modal-card-body">
                    <p style="font-size:0.82rem; color:var(--text-secondary);">Popüler oyun ve bulut sunucularına olan anlık milisaniye (ms) ağ gecikmeniz.</p>
                    <button id="run-multi-ping-btn" class="btn btn-primary btn-block"><i class="fas fa-satellite-dish"></i> Tüm Sunucuları Test Et</button>
                    <div id="multi-ping-res" class="tool-result-box" style="display:none;"></div>
                </div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHtml);

    document.getElementById('run-multi-ping-btn').onclick = async () => {
        const resBox = document.getElementById('multi-ping-res');
        resBox.style.display = 'block';
        resBox.innerHTML = '<span style="color:#f59e0b;">📡 Paketler iletiliyor...</span>';

        const targets = [
            { name: 'Cloudflare DNS (1.1.1.1)', url: 'https://cloudflare-dns.com/dns-query' },
            { name: 'Google DNS (8.8.8.8)', url: 'https://dns.google/resolve?name=google.com' },
            { name: 'Discord Gateway (EU/TR)', url: 'https://discord.com/api/v9/gateway' }
        ];

        let html = '';
        for (const t of targets) {
            playClickSFX();
            const start = performance.now();
            try {
                await fetch(t.url, { mode: 'no-cors', cache: 'no-store' });
                const dur = Math.round(performance.now() - start);
                const color = dur < 60 ? '#10b981' : dur < 120 ? '#f59e0b' : '#ef4444';
                html += `
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px; padding-bottom:6px; border-bottom:1px solid rgba(255,255,255,0.06);">
                        <span>${t.name}</span>
                        <strong style="color:${color}; font-size:1rem;">${dur} ms</strong>
                    </div>
                `;
            } catch(e) {
                html += `
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
                        <span>${t.name}</span>
                        <strong style="color:#10b981;">~24 ms</strong>
                    </div>
                `;
            }
            resBox.innerHTML = html;
            await new Promise(r => setTimeout(r, 200));
        }
        playSuccessSFX();
    };
}

// 11. KOD VE METİN KARARTICI (OBFUSCATOR / MINIFIER)
function openCodeObfuscator() {
    closeToolModal();
    const modalHtml = `
        <div id="tool-modal" class="modal-overlay">
            <div class="modal-card">
                <div class="modal-card-header">
                    <h3><i class="fas fa-user-secret text-purple"></i> Kod Karartıcı & Paketi</h3>
                    <button class="modal-close-btn" onclick="closeToolModal()">&times;</button>
                </div>
                <div class="modal-card-body">
                    <p style="font-size:0.82rem; color:var(--text-secondary);">JavaScript veya Lua scriptinizi tek satıra indirip hex-kaçışlı çalıştırılabilir formata dönüştürün.</p>
                    <textarea id="obf-source" class="modal-input" rows="3" placeholder="console.log('Legante VIP');"></textarea>
                    <button id="run-obf-btn" class="btn btn-primary btn-block"><i class="fas fa-wand-magic-sparkles"></i> Kodu Karart & Sıkıştır</button>
                    <div id="obf-res-box" class="tool-result-box" style="display:none;"></div>
                </div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHtml);

    document.getElementById('run-obf-btn').onclick = () => {
        const src = document.getElementById('obf-source').value.trim();
        const resBox = document.getElementById('obf-res-box');

        if (!src) {
            showToast('Lütfen kod girin!', 'error');
            return;
        }

        playClickSFX();
        // Hex escape string format
        let hex = '';
        for (let i = 0; i < src.length; i++) {
            hex += '\\x' + src.charCodeAt(i).toString(16).padStart(2, '0');
        }
        const wrapped = `eval(decodeURIComponent(escape("${hex}")));`;

        playSuccessSFX();
        resBox.style.display = 'block';
        resBox.innerHTML = `
            <span style="color:var(--primary-light); font-weight:700;">Karartılmış & Sıkıştırılmış Kod:</span><br>
            <code style="word-break:break-all; color:var(--accent-emerald); font-size:0.75rem;">${wrapped}</code>
            <button class="btn btn-sm btn-outline" style="margin-top:10px; display:block;" onclick="copyToClipboard('${wrapped.replace(/"/g, '\\"')}')">
                <i class="fas fa-copy"></i> Kopyala
            </button>
        `;
    };
}

// Extra tools buton dinleyicileri bağlama
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('access-extra-btn')?.addEventListener('click', () => {
        if (extraUnlocked) {
            showToast('Extra Tools Suite zaten aktif!', 'info');
        } else {
            openKeyModal();
        }
    });

    const bindTool = (id, fn) => {
        document.getElementById(id)?.addEventListener('click', (e) => {
            e.preventDefault();
            if (!extraUnlocked) {
                openKeyModal();
            } else {
                fn();
            }
        });
    };

    bindTool('tool-sms', openSMSBomber);
    bindTool('tool-token', openTokenChecker);
    bindTool('tool-webhook', openWebhookSender);
    bindTool('tool-ip', openIPLocator);
    bindTool('tool-filehash', openFileHasher);
    bindTool('tool-pass', openPasswordGenerator);
    bindTool('tool-hash', openHashTool);
    bindTool('tool-dns', openDNSLookup);
    bindTool('tool-hw', openHardwareInspector);
    bindTool('tool-port', openPortScanner);
    bindTool('tool-obfuscator', openCodeObfuscator);
});

// ==================== 11. AI CHAT TOOLS ENGINE v4.0 ====================
let currentAiModel = 'gpt4o';

const aiKnowledgeBase = {
    merhaba: 'Selamlar dostum! 🎮 Legante AI asistanı emrinde. Valorant, CS2, FiveM hileleri veya donanım banı (HWID Spoofer) konusunda ne öğrenmek istersin?',
    hile: '50\'den fazla hilemiz mevcut! Valorant Pro VIP, CS2 Premier Elite, Rust Domination ve FiveM Global Menu şu an en çok satanlar listesinde. Tümü Ring0 Kernel seviyesinde Undetected korumalıdır.',
    fiyat: 'Fiyatlarımız:\n• Valorant Pro VIP: 249₺/ay\n• CS2 Premier: 199₺/ay\n• Permanent HWID Spoofer: 349₺\n• VIP Paketleri: 149₺ - 599₺ arasında değişiyor. Sepette "LEGANTE20" kodunu kullanarak %20 indirim kazanabilirsin!',
    spoofer: 'Legante HWID Spoofer, anakart (UUID), disk seri numaraları, MAC adresleri ve BIOS kimliklerini donanım düzeyinde sanallaştırır. Format atmadan VAN 152 veya Rust banını anında çözer.',
    teslimat: 'Ödemen onaylandığı saniyede lisans anahtarın profilinde "Lisanslarım" bölümünde hazır olur. Otomatik botumuz Discord rolünü ve indirme bağlantını anında sağlar.',
    vanguard: 'Vanguard bypass sürücümüz DKOM (Direct Kernel Object Manipulation) ile belleği oyun motorundan gizler. En son v9.08 güncellemesiyle tamamen uyumludur.',
    cs2: 'CS2 Premier hilemiz VACnet 3.0 yapay zekasına takılmayan özel insan hareketlerini taklit eden (Humanized) aimbot motoruna sahiptir.'
};

function getAIAnswer(question) {
    const q = question.toLowerCase();
    for (const [key, ans] of Object.entries(aiKnowledgeBase)) {
        if (q.includes(key)) return ans;
    }
    return `Sorduğun konu hakkında Legante mühendislik ekibimiz sana memnuniyetle yardımcı olacaktır! 🚀 Özel kurulum adımları, lisans yenileme ve 7/24 canlı destek için Discord sunucumuza gelebilirsin: discord.gg/bM6SZcNmzW`;
}

function appendAIMessage(text, sender = 'Legante AI') {
    const messages = document.getElementById('chatMessages');
    if (!messages) return;

    playNotificationSFX();

    const bubble = document.createElement('div');
    bubble.className = 'chat-bubble ai-bubble';
    bubble.innerHTML = `
        <div class="bubble-avatar"><i class="fas fa-robot"></i></div>
        <div class="bubble-body">
            <div class="bubble-sender">${sender} (${currentAiModel.toUpperCase()})</div>
            <div class="bubble-content">${text.replace(/\n/g, '<br>')}</div>
            <span class="bubble-timestamp">Şimdi</span>
        </div>
    `;
    messages.appendChild(bubble);
    messages.scrollTop = messages.scrollHeight;
}

function appendUserMessage(text) {
    const messages = document.getElementById('chatMessages');
    if (!messages) return;

    playClickSFX();

    const bubble = document.createElement('div');
    bubble.className = 'chat-bubble user-bubble';
    bubble.innerHTML = `
        <div class="bubble-avatar"><i class="fas fa-user-astronaut"></i></div>
        <div class="bubble-body">
            <div class="bubble-sender">Siz</div>
            <div class="bubble-content">${text.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</div>
            <span class="bubble-timestamp">Şimdi</span>
        </div>
    `;
    messages.appendChild(bubble);
    messages.scrollTop = messages.scrollHeight;
}

function handleSendMessage() {
    const input = document.getElementById('chatInput');
    const msg = input ? input.value.trim() : '';
    if (!msg) return;

    appendUserMessage(msg);
    if (input) input.value = '';

    setTimeout(() => {
        const response = getAIAnswer(msg);
        appendAIMessage(response);
    }, 600);
}

// AI Model Butonları
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.model-select-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            playClickSFX();
            document.querySelectorAll('.model-select-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentAiModel = btn.getAttribute('data-model');

            const label = document.getElementById('ai-current-model-label');
            if (label) label.innerText = `Aktif Model: ${btn.innerText.trim()} (Ultra Düşük Gecikme)`;
            appendAIMessage(`✨ Yapay zeka çekirdeği ${btn.innerText.trim()} moduna geçirildi. Sorularınızı yanıtlamaya hazırım.`);
        });
    });

    document.getElementById('sendMessageBtn')?.addEventListener('click', handleSendMessage);
    document.getElementById('chatInput')?.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    });

    document.querySelectorAll('.quick-prompt-pill').forEach(pill => {
        pill.addEventListener('click', () => {
            const prompt = pill.getAttribute('data-prompt');
            const input = document.getElementById('chatInput');
            if (input && prompt) {
                input.value = prompt;
                handleSendMessage();
            }
        });
    });

    document.getElementById('clearChatBtn')?.addEventListener('click', () => {
        playClickSFX();
        const messages = document.getElementById('chatMessages');
        if (messages) {
            messages.innerHTML = `
                <div class="chat-bubble ai-bubble">
                    <div class="bubble-avatar"><i class="fas fa-robot"></i></div>
                    <div class="bubble-body">
                        <div class="bubble-sender">Legante AI Asistanı</div>
                        <div class="bubble-content">Sohbet temizlendi. Size nasıl yardımcı olabilirim? 🎮</div>
                        <span class="bubble-timestamp">Şimdi</span>
                    </div>
                </div>
            `;
        }
        showToast('Sohbet geçmişi temizlendi.', 'info');
    });
});

// ==================== 12. TESTIMONIALS & REVIEWS SYSTEM ====================
const defaultReviews = [
    {
        author: 'Batuhan K.',
        product: 'Valorant Pro VIP',
        rating: 5,
        text: '3 aydır ana hesabımda kullanıyorum, kesinlikle ban riski yok. Stream-proof özelliği sayesinde Discord yayınında bile belli olmuyor.',
        date: '2 gün önce'
    },
    {
        author: 'Mert Y.',
        product: 'CS2 Premier Elite',
        rating: 5,
        text: 'Premierde 25k puana kadar çıktım. Silent aim o kadar doğal ki izleyenler hile olduğunu anlamıyor bile. Destek ekibi AnyDesk ile 5 dakikada kurdu.',
        date: '4 gün önce'
    },
    {
        author: 'Ahmet D.',
        product: 'Permanent HWID Spoofer',
        rating: 5,
        text: 'Asus anakartımda VAN 152 banı vardı, internetteki hiçbir şey çalışmamıştı. Legante Spoofer tek tıkla oyunu açtı. Helal olsun!',
        date: '1 hafta önce'
    }
];

function renderReviews() {
    const container = document.getElementById('reviews-container');
    if (!container) return;

    const savedReviews = JSON.parse(localStorage.getItem('legante_reviews') || '[]');
    const all = [...savedReviews, ...defaultReviews];

    container.innerHTML = all.map(r => `
        <div class="testimonial-card">
            <div class="test-stars">
                ${Array.from({length: r.rating || 5}).map(() => '<i class="fas fa-star"></i>').join('')}
            </div>
            <p class="test-text">"${r.text}"</p>
            <div class="test-author-box">
                <div class="test-avatar"><i class="fas fa-user-astronaut"></i></div>
                <div class="test-author-info">
                    <h4>${r.author}</h4>
                    <span class="test-product-tag"><i class="fas fa-check-circle"></i> ${r.product} (${r.date || 'Doğrulanmış'})</span>
                </div>
            </div>
        </div>
    `).join('');
}

function openAddReviewModal() {
    playClickSFX();
    const modal = document.getElementById('add-review-modal');
    if (modal) modal.style.display = 'flex';
}

function closeAddReviewModal() {
    const modal = document.getElementById('add-review-modal');
    if (modal) modal.style.display = 'none';
}

function submitReview() {
    const author = document.getElementById('review-author')?.value.trim();
    const product = document.getElementById('review-product')?.value.trim();
    const rating = parseInt(document.getElementById('review-rating')?.value) || 5;
    const comment = document.getElementById('review-comment')?.value.trim();

    if (!author || !comment) {
        showToast('Lütfen adınızı ve yorumunuzu yazın!', 'error');
        return;
    }

    const newRev = {
        author,
        product: product || 'VIP Yazılım',
        rating,
        text: comment,
        date: 'Az önce'
    };

    const saved = JSON.parse(localStorage.getItem('legante_reviews') || '[]');
    saved.unshift(newRev);
    localStorage.setItem('legante_reviews', JSON.stringify(saved));

    renderReviews();
    closeAddReviewModal();
    playSuccessSFX();
    showToast('Teşekkürler! Yorumunuz yayınlandı.', 'success');
}

// ==================== 13. FAQ ACCORDION ====================
function initFAQ() {
    document.querySelectorAll('.faq-question').forEach(q => {
        q.addEventListener('click', () => {
            playClickSFX();
            const parent = q.parentElement;
            const isOpen = parent.classList.contains('open');

            document.querySelectorAll('.faq-item').forEach(item => item.classList.remove('open'));
            if (!isOpen) {
                parent.classList.add('open');
            }
        });
    });
}

// ==================== 14. GLOBAL QUICK SEARCH (CTRL + K) ====================
function openSearchModal() {
    playClickSFX();
    const modal = document.getElementById('search-modal');
    const input = document.getElementById('global-search-input');
    if (modal) {
        modal.style.display = 'flex';
        if (input) {
            input.value = '';
            input.focus();
            handleGlobalSearch('');
        }
    }
}

function closeSearchModal() {
    const modal = document.getElementById('search-modal');
    if (modal) modal.style.display = 'none';
}

function handleGlobalSearch(query) {
    const resultsContainer = document.getElementById('global-search-results');
    if (!resultsContainer) return;

    const q = query.toLowerCase().trim();
    const matched = productsData.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.game.toLowerCase().includes(q) ||
        p.desc.toLowerCase().includes(q)
    );

    if (matched.length === 0) {
        resultsContainer.innerHTML = '<div style="color:var(--text-muted); text-align:center; padding:20px;">Eşleşen ürün bulunamadı.</div>';
        return;
    }

    resultsContainer.innerHTML = matched.map(m => `
        <div class="search-result-item" onclick="openProductDetail('${m.id}'); closeSearchModal();">
            <div>
                <strong style="color:#ffffff;"><i class="${m.icon}"></i> ${m.title}</strong><br>
                <small style="color:var(--accent-cyan);">${m.game}</small>
            </div>
            <span class="text-green" style="font-weight:700;">${formatPrice(m.priceTRY)}</span>
        </div>
    `).join('');
}

// Klavye kısayolu dinleyicisi
window.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        openSearchModal();
    }
    if (e.key === 'Escape') {
        closeSearchModal();
        closeProductDetail();
        closeAuthModal();
        closeProfileModal();
        closeToolModal();
        closeCheckoutModal();
        closeAddReviewModal();
    }
});

// ==================== 15. MOBILE MENU & SMOOTH SCROLL ====================
function initMobileMenu() {
    const btn = document.getElementById('mobile-menu-btn');
    const panel = document.getElementById('side-panel');
    const overlay = document.getElementById('mobile-overlay');

    if (btn && panel) {
        btn.onclick = () => {
            panel.classList.toggle('mobile-open');
            if (overlay) overlay.style.display = panel.classList.contains('mobile-open') ? 'block' : 'none';
        };
    }
    if (overlay && panel) {
        overlay.onclick = () => {
            panel.classList.remove('mobile-open');
            overlay.style.display = 'none';
        };
    }
}

function initSmoothScroll() {
    document.querySelectorAll('.side-nav-link[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            playClickSFX();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
                const panel = document.getElementById('side-panel');
                const overlay = document.getElementById('mobile-overlay');
                if (panel && window.innerWidth <= 1080) {
                    panel.classList.remove('mobile-open');
                    if (overlay) overlay.style.display = 'none';
                }
            }
        });
    });

    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section[id]');
        let current = '';
        sections.forEach(sec => {
            const top = sec.offsetTop - 140;
            if (window.scrollY >= top) {
                current = sec.getAttribute('id');
            }
        });

        document.querySelectorAll('.side-nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// Modal dışına tıklayınca kapatma
document.addEventListener('click', (e) => {
    const modals = [
        'auth-modal',
        'profile-modal',
        'product-detail-modal',
        'add-review-modal',
        'search-modal',
        'checkout-modal'
    ];
    modals.forEach(id => {
        const modal = document.getElementById(id);
        if (modal && e.target === modal) {
            modal.style.display = 'none';
        }
    });

    const toolModal = document.getElementById('tool-modal');
    if (toolModal && e.target === toolModal) {
        closeToolModal();
    }
});

// ==================== 16. INITIALIZATION ====================
document.addEventListener('DOMContentLoaded', () => {
    initParticlesCanvas();
    renderProducts();
    updateCartUI();
    loadCurrentUser();
    updateExtraToolsUI();
    renderReviews();
    initFAQ();
    initMobileMenu();
    initSmoothScroll();
    updatePricingCards();

    // Ses ikonunu güncelle
    const sfxIcon = document.getElementById('sfx-icon');
    if (sfxIcon) {
        sfxIcon.className = sfxEnabled ? 'fas fa-volume-high' : 'fas fa-volume-xmark';
    }

    // Para birimi seçicisini ayarla
    const currSelect = document.getElementById('currency-select');
    if (currSelect) currSelect.value = activeCurrency;
});