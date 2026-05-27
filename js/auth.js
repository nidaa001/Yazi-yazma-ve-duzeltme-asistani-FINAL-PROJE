// ─── Kimlik Doğrulama Modülü ──────────────────────────────────────────────

const Auth = (() => {
  const USERS_KEY = 'wa_users';
  const SESSION_KEY = 'wa_session';

  function getUsers() {
    return JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
  }

  function currentUser() {
    const id = localStorage.getItem(SESSION_KEY);
    if (!id) return null;
    return getUsers().find(u => u.id === id) || null;
  }

  function register(name, email, password) {
    const users = getUsers();
    if (users.find(u => u.email === email)) return { ok: false, err: 'Bu e-posta zaten kayıtlı.' };
    const user = { id: Date.now().toString(), name, email, password };
    users.push(user);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
    localStorage.setItem(SESSION_KEY, user.id);
    return { ok: true, user };
  }

  function login(email, password) {
    const user = getUsers().find(u => u.email === email && u.password === password);
    if (!user) return { ok: false, err: 'E-posta veya şifre hatalı.' };
    localStorage.setItem(SESSION_KEY, user.id);
    return { ok: true, user };
  }

  function logout() {
    localStorage.removeItem(SESSION_KEY);
  }

  return { currentUser, register, login, logout };
})();