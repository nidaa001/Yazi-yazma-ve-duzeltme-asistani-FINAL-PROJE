// ─── Çok Dilli Destek (TR / EN) ───────────────────────────────────────────

const i18n = (() => {
  const LANG_KEY = 'wa_lang';
  let lang = localStorage.getItem(LANG_KEY) || 'tr';

  const tr = {
    appName: 'Yazı Asistanı',
    welcome: 'Hoş geldin',
    dashboard: 'Ana Sayfa',
    archive: 'Yazılarım',
    settings: 'Ayarlar',
    logout: 'Çıkış Yap',
    newWriting: 'Yeni Yazı',
    totalWritings: 'Toplam Yazı',
    lastWriting: 'Son Yazı',
    login: 'Giriş Yap',
    register: 'Kayıt Ol',
    email: 'E-posta',
    password: 'Şifre',
    name: 'Ad Soyad',
  };

  const en = {
    appName: 'Writing Assistant',
    welcome: 'Welcome',
    dashboard: 'Dashboard',
    archive: 'My Writings',
    settings: 'Settings',
    logout: 'Logout',
    newWriting: 'New Writing',
    totalWritings: 'Total Writings',
    lastWriting: 'Last Writing',
    login: 'Login',
    register: 'Register',
    email: 'Email',
    password: 'Password',
    name: 'Full Name',
  };

  const dict = { tr, en };

  function t(key) { return dict[lang]?.[key] || dict['tr'][key] || key; }
  function getLang() { return lang; }
  function setLang(l) { lang = l; localStorage.setItem(LANG_KEY, l); }

  return { t, getLang, setLang };
})();