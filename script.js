const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-links a');

burger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    burger.classList.toggle('toggle');
});

navLinksItems.forEach(item => {
    item.addEventListener('click', () => {
        navLinks.classList.remove('active');
        burger.classList.remove('toggle');
    });
});

const counters = document.querySelectorAll('.counter');
const speed = 100;

const startCounting = (counter) => {
    const target = +counter.getAttribute('data-target');
    const count = +counter.innerText;
    const increment = target / speed;
    
    if (count < target) {
        counter.innerText = Math.ceil(count + increment);
        setTimeout(() => startCounting(counter), 20);
    } else {
        counter.innerText = target;
    }
};

const observerOptions = { threshold: 0.5 };

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const countersInView = entry.target.querySelectorAll('.counter');
            countersInView.forEach(counter => startCounting(counter));
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

const statsSection = document.querySelector('.stats');
if (statsSection) { observer.observe(statsSection); }

const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(10, 10, 15, 0.95)';
        navbar.style.boxShadow = '0 5px 30px rgba(0, 0, 0, 0.5)';
    } else {
        navbar.style.background = 'rgba(10, 10, 15, 0.8)';
        navbar.style.boxShadow = 'none';
    }
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

const style = document.createElement('style');
style.textContent = 
    .burger.toggle .line1 { transform: rotate(-45deg) translate(-5px, 6px); }
    .burger.toggle .line2 { opacity: 0; }
    .burger.toggle .line3 { transform: rotate(45deg) translate(-5px, -6px); }
;
document.head.appendChild(style);

console.log('Legante Project - Website hazir!');
console.log('Discord: https://discord.gg/SDvC7nNYRp');
