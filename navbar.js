// navbar.js
async function loadNavbar(path = 'navbar.html', rootId = 'navbar-root') {
  try {
    const res = await fetch(path, { cache: 'no-store' });
    if (!res.ok) throw new Error('Không tải được navbar: ' + res.status);
    const html = await res.text();
    const root = document.getElementById(rootId);
    if (!root) return console.warn('Không tìm thấy container #' + rootId);
    root.innerHTML = html;
    initNavbar(root);
  } catch (err) {
    console.error(err);
  }
}

function initNavbar(root) {
  // mark active link by filename
  const links = Array.from(root.querySelectorAll('.nav-actions a'));
  const path = location.pathname.split('/').pop() || 'index.html';
  links.forEach(a => {
    const href = a.getAttribute('href')?.split('/').pop();
    if (href === path) a.classList.add('active');
    else a.classList.remove('active');
  });

  // open in new tab toggle for nav links
  const checkbox = root.querySelector('#openNewTab');
  function setTargets(newTab) {
    root.querySelectorAll('.nav-actions a').forEach(a=>{
      if(newTab) a.setAttribute('target','_blank');
      else a.removeAttribute('target');
    });
  }
  if (checkbox) {
    checkbox.addEventListener('change', (e)=> setTargets(e.target.checked));
    // preserve default (unchecked) — optionally you could save in localStorage
  }
}

// Auto load on DOM ready
document.addEventListener('DOMContentLoaded', ()=> loadNavbar());
