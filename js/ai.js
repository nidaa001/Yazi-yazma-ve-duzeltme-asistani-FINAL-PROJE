piconst AI = (() => {
  const API_KEY_STORAGE = 'wa_gemini_key';
  const MODELS = [
    'gemini-2.5-flash',
    'gemini-2.0-flash-lite',
    'gemini-2.0-flash',
  ];
  let activeModel = localStorage.getItem('wa_gemini_model') || MODELS[0];

  function getBaseUrl(model) {
    return `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;
  }

  function getApiKey() {
    return localStorage.getItem(API_KEY_STORAGE) || '';
  }

  function setApiKey(key) {
    localStorage.setItem(API_KEY_STORAGE, key);
  }

  async function callGemini(prompt) {
    const key = getApiKey();
    if (!key) throw new Error('NO_API_KEY');

    // Try models in order until one works
    const modelsToTry = [activeModel, ...MODELS.filter(m => m !== activeModel)];
    let lastErr;

    for (const model of modelsToTry) {
      try {
        const response = await fetch(`${getBaseUrl(model)}?key=${key}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: { temperature: 0.7, maxOutputTokens: 4096 }
          })
        });

        if (!response.ok) {
          const err = await response.json().catch(() => ({}));
          lastErr = new Error(err?.error?.message || 'API_ERROR');
          continue; // try next model
        }

        const data = await response.json();
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
        // Save working model for next time
        activeModel = model;
        localStorage.setItem('wa_gemini_model', model);
        return text;
      } catch (e) {
        lastErr = e;
        // network error — no point trying others
        throw e;
      }
    }

    throw lastErr;
  }

  async function testConnection() {
    try {
      const result = await callGemini('Say only the word OK.');
      if (result && result.trim().length > 0) return { ok: true };
      return { ok: false, err: 'Geçersiz API yanıtı.' };
    } catch (e) {
      return { ok: false, err: e.message };
    }
  }

  async function fixSpelling(text, lang) {
    const instruction = lang === 'en'
      ? `You are a professional Turkish and English text editor. Fix ONLY spelling, punctuation, and grammar errors in the following text. Do not change the meaning, style, or add any new content. Return ONLY the corrected text, no explanations.`
      : `Sen profesyonel bir Türkçe metin editörüsün. Aşağıdaki metindeki YALNIZCA yazım, noktalama ve imla hatalarını düzelt. Metnin anlamını, stilini değiştirme ve yeni içerik ekleme. YALNIZCA düzeltilmiş metni döndür, açıklama yapma.`;

    const prompt = `${instruction}\n\nMetin:\n${text}`;
    return await callGemini(prompt);
  }

  async function professionalize(text, category, lang) {
    const categoryNames = {
      tr: {
        petition: 'Dilekçe',
        letter: 'Resmi Mektup',
        minutes: 'Tutanak',
        report: 'Rapor',
        contract: 'Sözleşme',
        jobapp: 'İş Başvurusu / Niyet Mektubu',
        email: 'Profesyonel E-posta',
      },
      en: {
        petition: 'Petition',
        letter: 'Official Letter',
        minutes: 'Meeting Minutes',
        report: 'Report',
        contract: 'Contract',
        jobapp: 'Job Application / Cover Letter',
        email: 'Professional Email',
      }
    };

    const catName = (categoryNames[lang] || categoryNames['tr'])[category] || category;

    const instruction = lang === 'en'
      ? `You are a professional Turkish document writer. Rewrite the following text as a formal, professional "${catName}" document. Make it comprehensive, properly structured, formal in tone, and appropriate for official use. Keep the core meaning and information intact but significantly enhance the language, structure, and professionalism. Return ONLY the rewritten text.`
      : `Sen profesyonel bir Türkçe belge yazarısın. Aşağıdaki metni resmi, profesyonel bir "${catName}" belgesi olarak yeniden yaz. Metni kapsamlı, düzgün yapılandırılmış, resmi tonlu ve resmi kullanıma uygun hale getir. Temel anlam ve bilgileri koru ancak dil, yapı ve profesyonelliği önemli ölçüde iyileştir. YALNIZCA yeniden yazılmış metni döndür.`;

    const prompt = `${instruction}\n\nMetin:\n${text}`;
    return await callGemini(prompt);
  }

  // AI Category Advisor — multi-turn conversation
  const advisorHistory = [];

  function resetAdvisor() {
    advisorHistory.length = 0;
  }

  async function advisorChat(userMessage, lang) {
    advisorHistory.push({ role: 'user', text: userMessage });

    const systemPrompt = lang === 'en'
      ? `You are a document classification assistant. Your job is to ask 1-2 short questions to determine what type of document the user wants to write from this list: Petition, Official Letter, Minutes, Report, Contract, Job Application, Email Draft.

Ask questions ONE AT A TIME. When you have enough information, respond with:
CATEGORY: [category_key]
REASON: [brief explanation]

Category keys: petition, letter, minutes, report, contract, jobapp, email

If you need more info, just ask your next question naturally. Keep responses short and friendly.`
      : `Sen bir belge sınıflandırma asistanısın. Görevin, kullanıcının şu listeden hangi tür belge yazmak istediğini belirlemek için 1-2 kısa soru sormak: Dilekçe, Resmi Mektup, Tutanak, Rapor, Sözleşme, İş Başvurusu, E-posta Taslağı.

Soruları BİR BİR sor. Yeterli bilgiye sahip olduğunda şu formatla yanıtla:
KATEGORİ: [kategori_anahtarı]
SEBEP: [kısa açıklama]

Kategori anahtarları: petition, letter, minutes, report, contract, jobapp, email

Daha fazla bilgiye ihtiyaç duyarsan sadece bir sonraki soruyu sor. Yanıtları kısa ve samimi tut.`;

    const historyText = advisorHistory.map(h => `${h.role === 'user' ? 'Kullanıcı' : 'Asistan'}: ${h.text}`).join('\n');
    const prompt = `${systemPrompt}\n\nKonuşma geçmişi:\n${historyText}`;

    const response = await callGemini(prompt);
    advisorHistory.push({ role: 'assistant', text: response });

    // Parse if category determined
    const catMatch = response.match(/KATEGORİ:\s*(\w+)|CATEGORY:\s*(\w+)/i);
    const reasonMatch = response.match(/SEBEP:\s*(.+)|REASON:\s*(.+)/i);

    if (catMatch) {
      return {
        type: 'result',
        category: (catMatch[1] || catMatch[2]).toLowerCase(),
        reason: reasonMatch ? (reasonMatch[1] || reasonMatch[2]) : '',
        text: response
      };
    }
    return { type: 'question', text: response };
  }

  return { getApiKey, setApiKey, testConnection, fixSpelling, professionalize, advisorChat, resetAdvisor };
})();
