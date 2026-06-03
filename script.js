// ========== SOL PANEL (SİDE MENU) - TÜM NAVİGASYON ==========
// Mevcut navbar linklerini al ve sol panele taşı
const originalNavLinks = document.querySelectorAll('.nav-link');
const navMenuContainer = document.querySelector('.nav-menu');
const header = document.querySelector('.header');

// Sol panel HTML
const sidePanelHTML = `
<div id="side-panel" style="position: fixed; left: 0; top: 0; width: 280px; height: 100vh; background: rgba(6, 6, 11, 0.98); backdrop-filter: blur(30px); border-right: 1px solid rgba(168, 85, 247, 0.2); z-index: 9999; transform: translateX(-100%); transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1); box-shadow: 5px 0 40px rgba(0,0,0,0.6);">
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
            <li style="margin-bottom: 8px;"><a href="#home" class="side-nav-link" data-section="home"><i class="fas fa-home" style="width: 28px;"></i><span>Ana Sayfa</span></a></li>
            <li style="margin-bottom: 8px;"><a href="#features" class="side-nav-link" data-section="features"><i class="fas fa-star" style="width: 28px;"></i><span>Özellikler</span></a></li>
            <li style="margin-bottom: 8px;"><a href="#market" class="side-nav-link" data-section="market"><i class="fas fa-store" style="width: 28px;"></i><span>Market</span></a></li>
            <li style="margin-bottom: 8px;"><a href="#stats" class="side-nav-link" data-section="stats"><i class="fas fa-chart-line" style="width: 28px;"></i><span>İstatistikler</span></a></li>
            <li style="margin-bottom: 8px;"><a href="#pricing" class="side-nav-link" data-section="pricing"><i class="fas fa-tag" style="width: 28px;"></i><span>Paketler</span></a></li>
            <li style="margin-bottom: 8px;"><a href="#testimonials" class="side-nav-link" data-section="testimonials"><i class="fas fa-comment" style="width: 28px;"></i><span>Yorumlar</span></a></li>
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
    background: rgba(168, 85, 247, 0.1);
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
}
</style>
`;

document.body.insertAdjacentHTML('beforeend', sidePanelHTML);

// Panel açma butonu (sol üst köşe)
const menuBtnHTML = `
<div id="menu-toggle-btn" style="position: fixed; left: 20px; top: 20px; width: 45px; height: 45px; background: linear-gradient(135deg, #6c5ce7, #a855f7); border-radius: 12px; display: flex; align-items: center; justify-content: center; cursor: pointer; z-index: 10000; box-shadow: 0 5px 20px rgba(108,92,231,0.4); transition: 0.3s;">
    <i class="fas fa-bars" style="color: white; font-size: 1.3rem;"></i>
</div>
`;
document.body.insertAdjacentHTML('beforeend', menuBtnHTML);

// ORTA NAVBAR'DAKİ LİNKLERİ GİZLE (sol panele taşındı)
if (navMenuContainer) {
    navMenuContainer.style.display = 'none';
}

// Panel state
const sidePanel = document.getElementById('side-panel');
const menuBtn = document.getElementById('menu-toggle-btn');
let isPanelOpen = false;

menuBtn.addEventListener('click', () => {
    isPanelOpen = !isPanelOpen;
    sidePanel.style.transform = isPanelOpen ? 'translateX(0)' : 'translateX(-100%)';
    menuBtn.style.left = isPanelOpen ? '300px' : '20px';
    
    // buton ikonunu değiştir
    const icon = menuBtn.querySelector('i');
    if (isPanelOpen) {
        icon.className = 'fas fa-times';
    } else {
        icon.className = 'fas fa-bars';
    }
});

// Dışarı tıklayınca kapat
document.addEventListener('click', (e) => {
    if (isPanelOpen && !sidePanel.contains(e.target) && !menuBtn.contains(e.target)) {
        isPanelOpen = false;
        sidePanel.style.transform = 'translateX(-100%)';
        menuBtn.style.left = '20px';
        menuBtn.querySelector('i').className = 'fas fa-bars';
    }
});

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
            if (window.innerWidth <= 768) {
                isPanelOpen = false;
                sidePanel.style.transform = 'translateX(-100%)';
                menuBtn.style.left = '20px';
                menuBtn.querySelector('i').className = 'fas fa-bars';
            }
        }
    });
});

// Header'daki navbar'ı düzenle (logo ve discord butonu kalabilir)
const navbar = document.querySelector('.navbar .nav-container');
if (navbar) {
    // mevcut nav-menu gizli, nav-actions'daki discord butonunu koru
    const navActions = document.querySelector('.nav-actions');
    if (navActions) {
        // hamburgeri gizle (artık sol panel butonu var)
        const hamburger = document.querySelector('.hamburger');
        if (hamburger) hamburger.style.display = 'none';
    }
}

// Responsive: mobilde header düzenlemesi
const styleResponsive = document.createElement('style');
styleResponsive.textContent = `
    @media (max-width: 768px) {
        #menu-toggle-btn {
            top: 15px;
            left: 15px;
            width: 40px;
            height: 40px;
        }
        #side-panel {
            width: 260px;
        }
        .navbar .nav-container {
            justify-content: flex-end;
            padding-right: 15px;
        }
        .nav-logo {
            margin-right: auto;
            margin-left: 60px;
        }
        .btn-nav span {
            display: none;
        }
        .btn-nav {
            padding: 10px 12px;
        }
    }
    @media (max-width: 480px) {
        .nav-logo {
            margin-left: 55px;
        }
        .btn-nav {
            padding: 8px 10px;
        }
    }
`;
document.head.appendChild(styleResponsive);

// Logo'ya tıklayınca ana sayfaya git (zaten öyle)
console.log('✅ Sol navigasyon paneli eklendi | Ana menü sol tarafa taşındı');