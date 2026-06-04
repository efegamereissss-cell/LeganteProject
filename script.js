// ========== LOGIN/REGISTER SYSTEM ==========
let currentUser = null;

// Kullanıcı verilerini localStorage'dan yükle
function loadUsers() {
    const users = localStorage.getItem('legante_users');
    if (!users) {
        // Örnek kullanıcı oluştur
        const defaultUsers = [
            { id: 1, name: "Demo Kullanıcı", email: "demo@legante.com", password: "demo123", memberSince: "2024-01-15", orders: [], totalSpent: 0 }
        ];
        localStorage.setItem('legante_users', JSON.stringify(defaultUsers));
    }
    return JSON.parse(localStorage.getItem('legante_users') || '[]');
}

function saveUsers(users) {
    localStorage.setItem('legante_users', JSON.stringify(users));
}

// Giriş yapmış kullanıcıyı yükle
function loadCurrentUser() {
    const savedUser = localStorage.getItem('legante_current_user');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        updateUIForLoggedInUser();
    } else {
        updateUIForGuest();
    }
}

// Giriş yapmış kullanıcı için UI güncelle
function updateUIForLoggedInUser() {
    const guestButtons = document.getElementById('guest-header-buttons');
    const userProfile = document.getElementById('user-header-profile');
    
    if (guestButtons) guestButtons.style.display = 'none';
    if (userProfile) userProfile.style.display = 'block';
    
    if (currentUser) {
        const avatarUrl = `https://ui-avatars.com/api/?background=6c5ce7&color=fff&rounded=true&bold=true&name=${encodeURIComponent(currentUser.name)}`;
        document.getElementById('user-avatar-small')?.setAttribute('src', avatarUrl);
        document.getElementById('user-name-display').innerText = currentUser.name.split(' ')[0];
        document.getElementById('dropdown-name').innerText = currentUser.name;
        document.getElementById('dropdown-email').innerText = currentUser.email;
    }
}

// Misafir kullanıcı için UI güncelle
function updateUIForGuest() {
    const guestButtons = document.getElementById('guest-header-buttons');
    const userProfile = document.getElementById('user-header-profile');
    
    if (guestButtons) guestButtons.style.display = 'flex';
    if (userProfile) userProfile.style.display = 'none';
}

// Login Modal Aç
function openAuthModal(tab = 'login') {
    const modal = document.getElementById('auth-modal');
    if (modal) {
        modal.style.display = 'flex';
        
        // Tableri ayarla
        document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.auth-form').forEach(f => f.classList.remove('active'));
        
        if (tab === 'login') {
            document.querySelector('.auth-tab[data-tab="login"]').classList.add('active');
            document.getElementById('login-form').classList.add('active');
        } else {
            document.querySelector('.auth-tab[data-tab="register"]').classList.add('active');
            document.getElementById('register-form').classList.add('active');
        }
    }
}

function closeAuthModal() {
    document.getElementById('auth-modal').style.display = 'none';
    // Formları temizle
    document.getElementById('login-email').value = '';
    document.getElementById('login-password').value = '';
    document.getElementById('register-name').value = '';
    document.getElementById('register-email').value = '';
    document.getElementById('register-password').value = '';
    document.getElementById('register-confirm').value = '';
}

// Tab değiştirme
document.querySelectorAll('.auth-tab').forEach(tab => {
    tab.addEventListener('click', () => {
        const targetTab = tab.getAttribute('data-tab');
        document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        document.querySelectorAll('.auth-form').forEach(f => f.classList.remove('active'));
        document.getElementById(`${targetTab}-form`).classList.add('active');
    });
});

// Login İşlemi
function handleLogin() {
    const email = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value;
    
    if (!email || !password) {
        showNotification('Lütfen e-posta ve şifrenizi girin!', 'error');
        return;
    }
    
    const users = loadUsers();
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        currentUser = { ...user, password: undefined };
        localStorage.setItem('legante_current_user', JSON.stringify(currentUser));
        updateUIForLoggedInUser();
        closeAuthModal();
        showNotification(`Hoş geldiniz, ${user.name}!`, 'success');
        
        // Kullanıcı verilerini güncelle
        updateUserOrdersDisplay();
    } else {
        showNotification('E-posta veya şifre hatalı!', 'error');
    }
}

// Register İşlemi
function handleRegister() {
    const name = document.getElementById('register-name').value.trim();
    const email = document.getElementById('register-email').value.trim();
    const password = document.getElementById('register-password').value;
    const confirm = document.getElementById('register-confirm').value;
    
    if (!name || !email || !password) {
        showNotification('Lütfen tüm alanları doldurun!', 'error');
        return;
    }
    
    if (password !== confirm) {
        showNotification('Şifreler eşleşmiyor!', 'error');
        return;
    }
    
    if (password.length < 4) {
        showNotification('Şifre en az 4 karakter olmalıdır!', 'error');
        return;
    }
    
    const users = loadUsers();
    
    if (users.find(u => u.email === email)) {
        showNotification('Bu e-posta zaten kayıtlı!', 'error');
        return;
    }
    
    const newUser = {
        id: users.length + 1,
        name: name,
        email: email,
        password: password,
        memberSince: new Date().toISOString().split('T')[0],
        orders: [],
        totalSpent: 0
    };
    
    users.push(newUser);
    saveUsers(users);
    
    currentUser = { ...newUser, password: undefined };
    localStorage.setItem('legante_current_user', JSON.stringify(currentUser));
    updateUIForLoggedInUser();
    closeAuthModal();
    showNotification(`Başarıyla kayıt oldunuz! Hoş geldiniz, ${name}!`, 'success');
}

// Çıkış Yap
function logout() {
    localStorage.removeItem('legante_current_user');
    currentUser = null;
    updateUIForGuest();
    showNotification('Başarıyla çıkış yaptınız!', 'info');
    closeUserMenu();
}

// User Menu Dropdown
function toggleUserMenu() {
    const dropdown = document.getElementById('user-dropdown-menu');
    if (dropdown) {
        dropdown.classList.toggle('show');
    }
}

function closeUserMenu() {
    const dropdown = document.getElementById('user-dropdown-menu');
    if (dropdown) {
        dropdown.classList.remove('show');
    }
}

// Sayfa dışına tıklayınca kapat
document.addEventListener('click', function(e) {
    const trigger = document.querySelector('.user-profile-trigger');
    const dropdown = document.getElementById('user-dropdown-menu');
    if (trigger && dropdown && !trigger.contains(e.target) && !dropdown.contains(e.target)) {
        dropdown.classList.remove('show');
    }
});

// Sipariş İşleme
function handlePurchase(productName, price) {
    if (currentUser) {
        // Kullanıcı giriş yapmış - siparişi kaydet
        const order = {
            id: Date.now(),
            productName: productName,
            price: price,
            date: new Date().toISOString(),
            status: 'completed'
        };
        
        const users = loadUsers();
        const userIndex = users.findIndex(u => u.id === currentUser.id);
        
        if (userIndex !== -1) {
            if (!users[userIndex].orders) users[userIndex].orders = [];
            users[userIndex].orders.push(order);
            users[userIndex].totalSpent = (users[userIndex].totalSpent || 0) + price;
            saveUsers(users);
            
            // Current user'ı güncelle
            currentUser = { ...users[userIndex], password: undefined };
            localStorage.setItem('legante_current_user', JSON.stringify(currentUser));
            
            showNotification(`${productName} başarıyla satın alındı! 🎉`, 'success');
            updateUserOrdersDisplay();
        }
    } else {
        // Kullanıcı giriş yapmamış - önce giriş yapmasını iste
        showNotification('Satın almak için lütfen giriş yapın veya kayıt olun!', 'warning');
        setTimeout(() => openAuthModal('login'), 500);
    }
}

// Profil Modal
function showUserProfile() {
    closeUserMenu();
    updateProfileModal();
    document.getElementById('profile-modal').style.display = 'flex';
}

function closeProfileModal() {
    document.getElementById('profile-modal').style.display = 'none';
}

function updateProfileModal() {
    if (!currentUser) return;
    
    const avatarUrl = `https://ui-avatars.com/api/?background=6c5ce7&color=fff&rounded=true&bold=true&size=80&name=${encodeURIComponent(currentUser.name)}`;
    document.getElementById('profile-avatar').setAttribute('src', avatarUrl);
    document.getElementById('profile-name').innerText = currentUser.name;
    document.getElementById('profile-email').innerText = currentUser.email;
    document.getElementById('profile-member-since').innerHTML = `Üye: ${currentUser.memberSince || 'Bugün'}`;
    document.getElementById('profile-orders').innerText = (currentUser.orders?.length || 0);
    document.getElementById('profile-spent').innerText = `${currentUser.totalSpent || 0}₺`;
    document.getElementById('profile-status').innerHTML = currentUser.orders?.length > 0 ? '<span style="color:#22c55e;">Premium</span>' : 'Standart';
    
    // Siparişleri göster
    const ordersList = document.getElementById('profile-orders-list');
    if (currentUser.orders && currentUser.orders.length > 0) {
        ordersList.innerHTML = currentUser.orders.slice().reverse().map(order => `
            <div class="profile-order-item">
                <div>
                    <div class="profile-order-name">${order.productName}</div>
                    <div class="profile-order-date">${new Date(order.date).toLocaleDateString('tr-TR')}</div>
                </div>
                <div class="profile-order-price">${order.price}₺</div>
            </div>
        `).join('');
    } else {
        ordersList.innerHTML = '<div class="empty-orders">Henüz siparişiniz bulunmuyor.</div>';
    }
}

function showUserOrders() {
    closeUserMenu();
    updateProfileModal();
    document.getElementById('profile-modal').style.display = 'flex';
}

function showUserSettings() {
    closeUserMenu();
    showNotification('Ayarlar yakında eklenecektir!', 'info');
}

function updateUserOrdersDisplay() {
    if (currentUser) {
        const users = loadUsers();
        const updatedUser = users.find(u => u.id === currentUser.id);
        if (updatedUser) {
            currentUser = { ...updatedUser, password: undefined };
            localStorage.setItem('legante_current_user', JSON.stringify(currentUser));
        }
    }
}

// Bildirim Gösterme
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : type === 'warning' ? 'fa-exclamation-triangle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: linear-gradient(135deg, #0a0a14, #0f0f1e);
        border: 1px solid ${type === 'success' ? '#22c55e' : type === 'error' ? '#ef4444' : type === 'warning' ? '#f59e0b' : '#a855f7'};
        border-radius: 12px;
        padding: 12px 20px;
        z-index: 60000;
        animation: slideInRight 0.3s ease;
        box-shadow: 0 10px 30px rgba(0,0,0,0.5);
    `;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Animasyonları ekle
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(notificationStyles);

// Sayfa yüklendiğinde kullanıcıyı yükle
document.addEventListener('DOMContentLoaded', () => {
    loadCurrentUser();
});

// Modal dışına tıklayınca kapatma
document.getElementById('auth-modal')?.addEventListener('click', (e) => {
    if (e.target === document.getElementById('auth-modal')) closeAuthModal();
});

document.getElementById('profile-modal')?.addEventListener('click', (e) => {
    if (e.target === document.getElementById('profile-modal')) closeProfileModal();
});