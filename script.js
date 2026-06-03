// ========== VIRUSTOTAL API ENTEGRASYONU ==========
// VirusTotal API v3 kullanımı (Public API Key gerektirir)
// Not: VirusTotal public API key almak için https://www.virustotal.com/gui/join-us üye olun

const VT_API_KEY = "YOUR_API_KEY_HERE"; // Kullanıcı kendi API key'ini girecek

// HTML yapısını oluştur
const vtSection = document.createElement('section');
vtSection.className = 'vt-section';
vtSection.id = 'virustotal';
vtSection.innerHTML = `
    <div class="section-container">
        <div class="vt-container">
            <div class="vt-title">
                <i class="fas fa-shield-virus" style="color: #a855f7;"></i>
                <span class="gradient-text">VirusTotal</span> Scanner
            </div>
            <div class="vt-sub">Dosya veya Link analizi yapın</div>
            
            <div class="vt-input-group">
                <input type="text" id="vt-input" class="vt-input" placeholder="Dosya yolu, URL veya Hash girin...">
                <select id="vt-type" class="vt-type-select">
                    <option value="url">URL</option>
                    <option value="hash">Hash (MD5/SHA1/SHA256)</option>
                </select>
                <button id="vt-scan-btn" class="vt-btn"><i class="fas fa-search"></i> Analiz Et</button>
            </div>
            
            <div id="vt-loader" class="vt-loader">
                <div class="vt-spinner"></div>
                <span>VirusTotal'da taranıyor...</span>
            </div>
            
            <div id="vt-result" class="vt-result">
                <div id="vt-stats"></div>
                <div id="vt-detections"></div>
                <div id="vt-engines"></div>
            </div>
        </div>
    </div>
`;

// Hero section'dan sonra ekle (features'dan önce)
const heroSection = document.querySelector('#home');
if (heroSection && heroSection.nextSibling) {
    heroSection.insertAdjacentElement('afterend', vtSection);
} else {
    document.querySelector('main').insertBefore(vtSection, document.querySelector('#features'));
}

// API istekleri için yardımcı fonksiyonlar
async function vtFetch(url, options = {}) {
    const headers = {
        'x-apikey': VT_API_KEY,
        'Content-Type': 'application/json'
    };
    const response = await fetch(url, { ...options, headers });
    if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    return response.json();
}

// URL analizi
async function analyzeURL(url) {
    // Önce URL'yi submit et
    const submitRes = await vtFetch('https://www.virustotal.com/api/v3/urls', {
        method: 'POST',
        body: JSON.stringify({ url: url })
    });
    
    const scanId = submitRes.data.id;
    await new Promise(r => setTimeout(r, 3000)); // Bekle
    
    // Sonuçları al
    const resultRes = await vtFetch(`https://www.virustotal.com/api/v3/analyses/${scanId}`);
    return resultRes;
}

// Hash ile analiz
async function analyzeHash(hash) {
    try {
        const result = await vtFetch(`https://www.virustotal.com/api/v3/files/${hash}`);
        return result;
    } catch (e) {
        if (e.message.includes('404')) {
            throw new Error('Bu hash VirusTotal veritabanında bulunamadı');
        }
        throw e;
    }
}

// Sonuçları göster
function displayResults(data, type) {
    const resultDiv = document.getElementById('vt-result');
    const statsDiv = document.getElementById('vt-stats');
    const detectionsDiv = document.getElementById('vt-detections');
    const enginesDiv = document.getElementById('vt-engines');
    
    let attributes;
    let stats;
    let lastAnalysisStats;
    let results = {};
    
    if (type === 'url') {
        attributes = data.data.attributes;
        stats = attributes.stats;
        lastAnalysisStats = stats;
        results = attributes.results || {};
    } else {
        attributes = data.data.attributes;
        lastAnalysisStats = attributes.last_analysis_stats;
        results = attributes.last_analysis_results || {};
    }
    
    const malicious = lastAnalysisStats.malicious || 0;
    const suspicious = lastAnalysisStats.suspicious || 0;
    const undetected = lastAnalysisStats.undetected || 0;
    const harmless = lastAnalysisStats.harmless || 0;
    const total = malicious + suspicious + undetected + harmless;
    
    let detectionClass = 'clean';
    let detectionText = '✅ Temiz';
    if (malicious > 0) {
        detectionClass = 'malicious';
        detectionText = `⚠️ ZARARLI - ${malicious} tespit`;
    } else if (suspicious > 0) {
        detectionClass = 'suspicious';
        detectionText = `⚠️ ŞÜPHELİ - ${suspicious} tespit`;
    } else {
        detectionText = `✅ Temiz - ${undetected}/${total} güvenlik yazılımı temiz dedi`;
    }
    
    statsDiv.innerHTML = `
        <div class="vt-detections ${detectionClass}">
            <div style="font-size: 1.2rem; font-weight: 700; margin-bottom: 5px;">${detectionText}</div>
            <div style="font-size: 0.8rem;">${malicious} Zararlı | ${suspicious} Şüpheli | ${undetected} Temiz</div>
        </div>
        <div class="vt-stat"><span class="vt-stat-label">Toplam Tarama</span><span class="vt-stat-value">${total}</span></div>
        <div class="vt-stat"><span class="vt-stat-label">Son Tarama</span><span class="vt-stat-value">${new Date(attributes.date || Date.now()).toLocaleString()}</span></div>
    `;
    
    // Motor sonuçları
    const engineList = Object.entries(results);
    if (engineList.length > 0) {
        let enginesHtml = '<div style="margin-top: 20px;"><div style="font-weight: 700; margin-bottom: 10px;">🔍 Tarama Sonuçları:</div><div class="vt-engine-list">';
        for (const [engine, result] of engineList.slice(0, 30)) {
            const verdict = result.category || result.result;
            const isMalicious = verdict === 'malicious' || verdict === 'malware';
            enginesHtml += `
                <div class="vt-engine-item">
                    <span class="vt-engine-name">${engine}</span>
                    <span class="vt-engine-result ${isMalicious ? '' : 'clean'}">${verdict || 'temiz'}</span>
                </div>
            `;
        }
        enginesHtml += '</div></div>';
        enginesDiv.innerHTML = enginesHtml;
    } else {
        enginesDiv.innerHTML = '<div style="margin-top: 20px; color: var(--text-muted);">Detaylı sonuçlar bulunamadı</div>';
    }
    
    resultDiv.classList.add('active');
}

// Ana analiz fonksiyonu
async function runVTAnalysis() {
    const input = document.getElementById('vt-input').value.trim();
    const type = document.getElementById('vt-type').value;
    const scanBtn = document.getElementById('vt-scan-btn');
    const loader = document.getElementById('vt-loader');
    const resultDiv = document.getElementById('vt-result');
    
    if (!input) {
        alert('Lütfen bir dosya yolu, URL veya hash girin!');
        return;
    }
    
    // API key kontrolü
    if (VT_API_KEY === "YOUR_API_KEY_HERE") {
        resultDiv.classList.add('active');
        document.getElementById('vt-stats').innerHTML = `
            <div class="vt-detections" style="background: rgba(245,158,11,0.1); border-color: rgba(245,158,11,0.3);">
                ⚠️ VirusTotal API Key ayarlanmamış!<br>
                <span style="font-size: 0.8rem;">www.virustotal.com/gui/join-us adresinden üye olup API key alın.<br>
                Script.js içindeki VT_API_KEY değişkenini key'inizle değiştirin.</span>
            </div>
        `;
        return;
    }
    
    scanBtn.disabled = true;
    loader.classList.add('active');
    resultDiv.classList.remove('active');
    
    try {
        let result;
        if (type === 'url') {
            let url = input;
            if (!url.startsWith('http')) url = 'https://' + url;
            result = await analyzeURL(url);
            displayResults(result, 'url');
        } else {
            result = await analyzeHash(input);
            displayResults(result, 'hash');
        }
    } catch (error) {
        resultDiv.classList.add('active');
        document.getElementById('vt-stats').innerHTML = `
            <div class="vt-detections" style="background: rgba(239,68,68,0.1); border-color: rgba(239,68,68,0.3);">
                ❌ Hata: ${error.message}<br>
                <span style="font-size: 0.8rem;">API limit aşımı veya geçersiz giriş olabilir.</span>
            </div>
        `;
    } finally {
        scanBtn.disabled = false;
        loader.classList.remove('active');
    }
}

// Event listener
document.getElementById('vt-scan-btn').addEventListener('click', runVTAnalysis);
document.getElementById('vt-input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') runVTAnalysis();
});

// Sol panele VirusTotal menüsü ekle
const sideMenu = document.querySelector('#side-nav-menu');
if (sideMenu) {
    const vtMenuItem = document.createElement('li');
    vtMenuItem.style.marginBottom = '6px';
    vtMenuItem.innerHTML = `<a href="#virustotal" class="side-nav-link" data-section="virustotal"><i class="fas fa-shield-virus"></i><span>VirusTotal</span><i class="fas fa-chevron-right link-arrow"></i></a>`;
    sideMenu.appendChild(vtMenuItem);
    
    // Yeni eklenen linke smooth scroll ekle
    const vtLink = vtMenuItem.querySelector('a');
    vtLink.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector('#virustotal');
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            if (isMobile && window.innerWidth <= 992) {
                sidePanel.classList.remove('mobile-open');
                overlay.style.display = 'none';
            }
        }
    });
}

console.log('✅ VirusTotal entegrasyonu eklendi | API key gerektirir');