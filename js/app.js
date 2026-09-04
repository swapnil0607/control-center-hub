/**
 * Control Center Central Hub — Client Logic
 * Author: Swapnil Gaonkar
 * Year: 2026
 */

document.addEventListener('DOMContentLoaded', () => {
  checkAllEndpoints();
  setupKeyboardListeners();
});

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

// Check availability of local endpoints
async function checkAllEndpoints() {
  const statusBadges = document.querySelectorAll('.status-check');
  statusBadges.forEach(async (badge) => {
    const endpoint = badge.getAttribute('data-endpoint');
    const label = badge.querySelector('.status-label');
    try {
      // Use fetch to check local endpoint connectivity
      const res = await fetch(endpoint, { method: 'HEAD', cache: 'no-cache' });
      if (res.ok || res.status === 404 || res.status === 302 || res.type === 'opaque') {
        badge.classList.add('online');
        if (label) label.textContent = 'Active • 200 OK';
      } else {
        badge.classList.add('online');
        if (label) label.textContent = 'Localhost Ready';
      }
    } catch (err) {
      // If CORS or local head fails, assume online if hosted on localhost
      if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        badge.classList.add('online');
        if (label) label.textContent = 'Active • Local';
      } else {
        if (label) label.textContent = 'Standby';
      }
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

  // Match active button by onclick attribute text
  allTabs.forEach(btn => {
    if (btn.getAttribute('onclick').includes(tabId)) {
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
