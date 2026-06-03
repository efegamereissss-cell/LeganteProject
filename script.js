// ========== SOL PANEL - SÜREKLİ AÇIK (VARSAYILAN) ==========
// Mevcut sol panel varsa kaldır
const existingPanel = document.getElementById('side-panel');
if (existingPanel) existingPanel.remove();
const existingBtn = document.getElementById('menu-toggle-btn');
if (existingBtn) existingBtn.remove();

// Sol panel HTML - KALICI AÇIK (transform ile değil, normal flow)
const sidePanelHTML = `
<div id="side-panel" style="position: fixed; left: 0; top: 0; width: 280px; height: 100vh; background: rgba(6, 6, 11, 0.98); backdrop-filter: blur(30px); border-right: 1px solid rgba(168, 85, 247, 0.3); z-index: 9999; box-shadow: 5px 0 40px rgba(0,0,0,0.6); overflow-y: auto;">
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

// ORTA NAVBAR'DAKİ LİNKLERİ GİZLE
const navMenuContainer = document.querySelector('.nav-menu');
if (navMenuContainer) {
    navMenuContainer.style.display = 'none';
}

// Header düzenlemesi - logo ve discord butonu için padding
const headerScrolled = document.querySelector('.header');
const styleMargin = document.createElement('style');
styleMargin.textContent = `
    body {
        margin-left: 280px !important;
    }
    .header {
        left: 280px !important;
        width: calc(100% - 280px) !important;
    }
    .cursor, .cursor-follower {
        z-index: 10000;
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
        .mobile-menu-overlay {
            display: none;
        }
    }
`;
document.head.appendChild(styleMargin);

// Mobil için menü butonu (sadece mobilde görünür)
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
const overlay = document.createElement('div');
overlay.id = 'mobile-overlay';
overlay.style.cssText = `
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
document.body.appendChild(overlay);

// Mobil işlemleri
function isMobile() {
    return window.innerWidth <= 992;
}

function updateMobileLayout() {
    const panel = document.getElementById('side-panel');
    const menuBtn = document.getElementById('mobile-menu-btn');
    const overlayEl = document.getElementById('mobile-overlay');
    
    if (isMobile()) {
        document.body.style.marginLeft = '0';
        if (panel) panel.classList.remove('mobile-open');
        menuBtn.style.display = 'flex';
        
        menuBtn.onclick = () => {
            panel.classList.toggle('mobile-open');
            const isOpen = panel.classList.contains('mobile-open');
            overlayEl.style.display = isOpen ? 'block' : 'none';
            menuBtn.innerHTML = isOpen ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
        };
        
        overlayEl.onclick = () => {
            panel.classList.remove('mobile-open');
            overlayEl.style.display = 'none';
            menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        };
    } else {
        document.body.style.marginLeft = '280px';
        if (panel) panel.classList.remove('mobile-open');
        overlayEl.style.display = 'none';
        mobileMenuBtn.style.display = 'none';
    }
}

window.addEventListener('resize', updateMobileLayout);
updateMobileLayout();

// Sol panel linkleri için aktif durum ve smooth scroll
const sideNavLinks = document.querySelectorAll('.side-nav-link');
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
    
    sideNavLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-section') === current) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveLink);
updateActiveLink();

// Smooth scroll
sideNavLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const target = document.querySelector(targetId);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            // mobilde paneli kapat
            if (isMobile()) {
                const panel = document.getElementById('side-panel');
                const overlayEl = document.getElementById('mobile-overlay');
                panel.classList.remove('mobile-open');
                overlayEl.style.display = 'none';
                document.getElementById('mobile-menu-btn').innerHTML = '<i class="fas fa-bars"></i>';
            }
        }
    });
});

// Hamburger varsa gizle
const hamburger = document.querySelector('.hamburger');
if (hamburger) hamburger.style.display = 'none';

console.log('✅ Sol menü KALICI AÇIK olarak eklendi | Desktop\'ta her zaman görünür, mobilde butonla açılır');