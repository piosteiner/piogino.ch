// Theme switch (system → light → dark), same behaviour and storage key as converter.piogino.ch.

(function theme() {
  const order = ['system', 'light', 'dark'];
  const read = () => { try { return localStorage.getItem('preferred-theme') || 'system'; } catch { return 'system'; } };
  const apply = (t) => {
    if (t === 'system') delete document.documentElement.dataset.theme;
    else document.documentElement.dataset.theme = t;
  };
  const sync = (btn, t) => { btn.textContent = t; btn.title = `Theme: ${t} (click to change)`; };

  document.addEventListener('DOMContentLoaded', () => {
    const btn = document.querySelector('.theme-btn');
    if (!btn) return;
    let t = read();
    if (!order.includes(t)) t = 'system';
    sync(btn, t);
    btn.addEventListener('click', () => {
      t = order[(order.indexOf(t) + 1) % order.length];
      try { localStorage.setItem('preferred-theme', t); } catch { /* private mode */ }
      apply(t);
      sync(btn, t);
    });
  });
})();
