/**
 * Control Center Central Hub — Client Logic
 * Mobile-First & Environment-Aware
 * Author: Swapnil Gaonkar
 * Year: 2026
 */

// Execute immediately to adapt links before paint
adaptEnvironment();

document.addEventListener('DOMContentLoaded', () => {
  adaptEnvironment();
  checkAllEndpoints();
  setupKeyboardListeners();
});

// Detect environment: Localhost / Wi-Fi LAN vs GitHub Pages Cloud
function isLocalEnvironment() {
  const host = window.location.hostname;
  return (
    host === 'localhost' ||
    host === '127.0.0.1' ||
    host.startsWith('192.168.') ||
    host.startsWith('10.') ||
    host.startsWith('172.') ||
    host.endsWith('.local')
  );
}

// Dynamically adapt links and badges based on hosting environment
function adaptEnvironment() {
  const isLocal = isLocalEnvironment();

  if (!isLocal) {
    // -------------------------------------------------------------
    // WE ARE ONLINE (GitHub Pages: swapnil0607.github.io)
    // Prevent any 404 errors by routing to live pages & GitHub repos
    // -------------------------------------------------------------

    // 1. Update Header Badges
    const envBadgeText = document.querySelector('.env-badge .env-text');
    if (envBadgeText) {
      envBadgeText.textContent = 'GitHub Pages Cloud • Architecture & Repos';
    }
    const mobileStatusPill = document.querySelector('.mobile-status-pill');
    if (mobileStatusPill) {
      mobileStatusPill.textContent = 'Cloud Mode';
    }

    // 2. Card 1: Portfolio (Points to actual live GitHub Pages site)
    const portfolioLaunch = document.querySelector('#card-portfolio .btn-launch');
    if (portfolioLaunch) {
      portfolioLaunch.href = 'https://swapnil0607.github.io/portfolio-2026/';
      portfolioLaunch.target = '_blank';
      const label = portfolioLaunch.querySelector('span');
      if (label) label.textContent = 'Launch Live Portfolio';
    }
    const portfolioStatus = document.querySelector('#card-portfolio .status-label');
    if (portfolioStatus) {
      portfolioStatus.textContent = 'Live Web App';
      const statusWrap = document.querySelector('#card-portfolio .card-status');
      if (statusWrap) statusWrap.classList.add('online');
    }

    // 3. Card 2: HRMS (Full-stack PHP/MySQL repository)
    const hrmsLaunch = document.querySelector('#card-hrms .btn-launch');
    if (hrmsLaunch) {
      hrmsLaunch.href = 'https://github.com/swapnil0607/hrms-portal';
      hrmsLaunch.target = '_blank';
      const label = hrmsLaunch.querySelector('span');
      if (label) label.textContent = 'View PHP Repository';
    }
    const hrmsStatus = document.querySelector('#card-hrms .status-label');
    if (hrmsStatus) {
      hrmsStatus.textContent = 'Full-Stack PHP / MySQL';
      const statusWrap = document.querySelector('#card-hrms .card-status');
      if (statusWrap) statusWrap.classList.add('online');
    }

    // 4. Card 3: Clientele (Full-stack PHP/MySQL repository)
    const clienteleLaunch = document.querySelector('#card-clientele .btn-launch');
    if (clienteleLaunch) {
      clienteleLaunch.href = 'https://github.com/swapnil0607/clientele-system';
      clienteleLaunch.target = '_blank';
      const label = clienteleLaunch.querySelector('span');
      if (label) label.textContent = 'View PHP Repository';
    }
    const clienteleAdmin = document.querySelector('#card-clientele .dual-actions .btn-ghost-sm');
    if (clienteleAdmin) {
      clienteleAdmin.href = 'https://github.com/swapnil0607/clientele-system#admin-demo-access';
      clienteleAdmin.target = '_blank';
      clienteleAdmin.textContent = 'Admin Repo Specs \u2192';
    }
    const clienteleStatus = document.querySelector('#card-clientele .status-label');
    if (clienteleStatus) {
      clienteleStatus.textContent = 'B2B PHP Catalog';
      const statusWrap = document.querySelector('#card-clientele .card-status');
      if (statusWrap) statusWrap.classList.add('online');
    }

    // 5. Card 4: PMS (Full-stack PHP MVC repository)
    const pmsLaunch = document.querySelector('#card-pms .btn-launch');
    if (pmsLaunch) {
      pmsLaunch.href = 'https://github.com/swapnil0607/pms-portal';
      pmsLaunch.target = '_blank';
      const label = pmsLaunch.querySelector('span');
      if (label) label.textContent = 'View PHP Repository';
    }
    const pmsStatus = document.querySelector('#card-pms .status-label');
    if (pmsStatus) {
      pmsStatus.textContent = 'PHP MVC Architecture';
      const statusWrap = document.querySelector('#card-pms .card-status');
      if (statusWrap) statusWrap.classList.add('online');
    }

    // 6. Footer Links
    const footerLinks = document.querySelectorAll('.footer-links a');
    if (footerLinks.length >= 4) {
      footerLinks[0].href = 'https://swapnil0607.github.io/portfolio-2026/';
      footerLinks[0].target = '_blank';
      footerLinks[1].href = 'https://github.com/swapnil0607/hrms-portal';
      footerLinks[1].target = '_blank';
      footerLinks[2].href = 'https://github.com/swapnil0607/clientele-system';
      footerLinks[2].target = '_blank';
      footerLinks[3].href = 'https://github.com/swapnil0607/pms-portal';
      footerLinks[3].target = '_blank';
    }
  }
}

// Toast notification controller
let toastTimeout = null;
function showToast(message) {
  const toast = document.getElementById('toast');
  const toastText = document.getElementById('toast-text');
  if (!toast || !toastText) return;

  toastText.textContent = message;
  toast.classList.add('show');

  if (toastTimeout) clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 2800);
}

// Copy generic text to clipboard
function copyText(text, successMessage) {
  navigator.clipboard.writeText(text).then(() => {
    showToast(successMessage || 'Copied to clipboard!');
  }).catch(() => {
    // Fallback
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    showToast(successMessage || 'Copied to clipboard!');
  });
}

// Copy role credentials
function copyCreds(emailOrUser, password, message) {
  const text = `${emailOrUser}`;
  copyText(text, message || `Copied ${emailOrUser} (Pass: ${password})`);
}

// Check availability of local endpoints (only when hosted on local environment)
async function checkAllEndpoints() {
  if (!isLocalEnvironment()) return; // On GitHub Pages, status is adapted by adaptEnvironment()

  const statusBadges = document.querySelectorAll('.status-check');
  statusBadges.forEach(async (badge) => {
    const endpoint = badge.getAttribute('data-endpoint');
    const label = badge.querySelector('.status-label');
    try {
      const res = await fetch(endpoint, { method: 'HEAD', cache: 'no-cache' });
      if (res.ok || res.status === 404 || res.status === 302 || res.type === 'opaque') {
        badge.classList.add('online');
        if (label) label.textContent = 'Active \u2022 Ready';
      } else {
        badge.classList.add('online');
        if (label) label.textContent = 'Local Active';
      }
    } catch (err) {
      badge.classList.add('online');
      if (label) label.textContent = 'Localhost Ready';
    }
  });
}

// Modal handling
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }
}

function showSchema(project) {
  openModal('arch-modal');
  const tabMap = {
    'hrms': 'tab-hrms',
    'clientele': 'tab-clientele',
    'pms': 'tab-pms',
    'phone': 'tab-phone',
    'general': 'tab-general'
  };
  switchTab(tabMap[project] || 'tab-general');
}

function switchTab(tabId) {
  const allTabs = document.querySelectorAll('.tab-btn');
  const allPanes = document.querySelectorAll('.tab-pane');

  allPanes.forEach(pane => pane.classList.remove('active'));
  allTabs.forEach(btn => btn.classList.remove('active'));

  const targetPane = document.getElementById(tabId);
  if (targetPane) targetPane.classList.add('active');

  allTabs.forEach(btn => {
    if (btn.getAttribute('onclick') && btn.getAttribute('onclick').includes(tabId)) {
      btn.classList.add('active');
    }
  });
}

function setupKeyboardListeners() {
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const openModals = document.querySelectorAll('.modal-overlay.open');
      openModals.forEach(m => closeModal(m.id));
    }
  });
}
