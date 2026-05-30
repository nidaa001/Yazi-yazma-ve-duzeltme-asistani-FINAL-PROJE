// ─── Arşiv Modülü ─────────────────────────────────────────────────────────

const Archive = (() => {
  const KEY = 'wa_archive';

  function getAll(userId) {
    const data = JSON.parse(localStorage.getItem(KEY) || '{}');
    return data[userId] || [];
  }

  function save(userId, entry) {
    const data = JSON.parse(localStorage.getItem(KEY) || '{}');
    if (!data[userId]) data[userId] = [];
    const record = {
      id: Date.now().toString(),
      date: new Date().toLocaleDateString('tr-TR'),
      category: entry.category,
      original: entry.original,
      corrected: entry.corrected,
      professional: entry.professional,
    };
    data[userId].unshift(record);
    localStorage.setItem(KEY, JSON.stringify(data));
    return record;
  }

  function remove(userId, id) {
    const data = JSON.parse(localStorage.getItem(KEY) || '{}');
    if (!data[userId]) return;
    data[userId] = data[userId].filter(e => e.id !== id);
    localStorage.setItem(KEY, JSON.stringify(data));
  }

  function getById(userId, id) {
    return getAll(userId).find(e => e.id === id) || null;
  }

  return { getAll, save, remove, getById };
})();