document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const messageDiv = document.getElementById('message');

    try {
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        const result = await response.json();

        if (response.ok) {
            messageDiv.innerHTML = `<p class="success">${result.message}</p>`;
            // 1.5 saniye sonra dashboard'a yönlendir
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1500);
        } else {
            messageDiv.innerHTML = `<p class="error">${result.message}</p>`;
        }
    } catch (error) {
        messageDiv.innerHTML = `<p class="error">Sunucuya bağlanılamadı!</p>`;
    }
});
let currentAction = '';



// Form Gönderimi (Giriş)
document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    });
    const result = await response.json();
    if (response.ok) {
        window.location.href = 'index.html';
    } else {
        alert(result.message);
    }
});

// Panel Gösterimi
function showAction(action) {
    currentAction = action;
    document.getElementById('actionPanel').style.display = 'block';
    document.getElementById('actionTitle').innerText = action === 'register' ? 'Yeni Hesap' : 'Hesabı Sil';
    document.getElementById('actionPass').style.display = action === 'register' ? 'block' : 'none';
}

// Kayıt ve Silme İşlemi
async function processAuthAction() {
    const username = document.getElementById('actionUser').value;
    const password = document.getElementById('actionPass').value;
    const url = currentAction === 'register' ? '/api/auth/register' : '/api/auth/delete';

    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    });
    const result = await response.json();
    alert(result.message);
    if(response.ok) location.reload();
}