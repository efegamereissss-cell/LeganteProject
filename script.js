// ========== PARTICLE SYSTEM ==========
const particlesContainer = document.querySelector('.particles');
const particleCount = 50;

for (let i = 0; i < particleCount; i++) {
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
    
    particlesContainer.appendChild(particle);
}

// Add particle animation
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

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    setTimeout(() => {
        cursorFollower.style.left = e.clientX + 'px';
        cursorFollower.style.top = e.clientY + 'px';
    }, 100);
});

document.addEventListener('mousedown', () => {
    cursor.style.transform = 'scale(0.7)';
    cursorFollower.style.transform = 'scale(0.7)';
});

document.addEventListener('mouseup', () => {
    cursor.style.transform = 'scale(1)';
    cursorFollower.style.transform = 'scale(1)');
});

const hoverElements = document.querySelectorAll('a, button, .btn, .feature-card, .pricing-card, .testimonial-card, .market-item');

hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursorFollower.style.width = '50px';
        cursorFollower.style.height = '50px';
        cursorFollower.style.borderColor = 'rgba(168, 85, 247, 0.7)';
        cursor.style.transform = 'scale(1.5)';
    });
    
    el.addEventListener('mouseleave', () => {
        cursorFollower.style.width = '35px';
        cursorFollower.style.height = '35px';
        cursorFollower.style.borderColor = 'rgba(168, 85, 247, 0.4)';
        cursor.style.transform = 'scale(1)';
    });
});

// ========== NAVBAR SCROLL EFFECT ==========
const header = document.querySelector('.header');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// ========== MOBILE MENU ==========
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    
    if (hamburger.classList.contains('active')) {
        hamburger.children[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        hamburger.children[1].style.opacity = '0';
        hamburger.children[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
        hamburger.children[0].style.transform = 'rotate(0) translate(0)';
        hamburger.children[1].style.opacity = '1';
        hamburger.children[2].style.transform = 'rotate(0) translate(0)';
    }
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        hamburger.children[0].style.transform = 'rotate(0) translate(0)';
        hamburger.children[1].style.opacity = '1';
        hamburger.children[2].style.transform = 'rotate(0) translate(0)';
    });
});

// ========== ACTIVE NAV LINK ON SCROLL ==========
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ========== MARKET FILTER ==========
const categoryButtons = document.querySelectorAll('.market-cat-btn');
const marketItems = document.querySelectorAll('.market-item');

categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
        categoryButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        const category = button.getAttribute('data-category');
        
        marketItems.forEach(item => {
            if (category === 'all') {
                item.classList.remove('hidden');
            } else {
                if (item.getAttribute('data-category') === category) {
                    item.classList.remove('hidden');
                } else {
                    item.classList.add('hidden');
                }
            }
        });
    });
});

// ========== SMOOTH SCROLL ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

console.log('🚀 Legante Project - Premium Website v2.4.1');
console.log('🔗 Discord: https://discord.gg/bM6SZcNmzW');
console.log('✨ Partikül efekti aktif | Market filtresi aktif');