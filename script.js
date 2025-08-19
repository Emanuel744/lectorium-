/**
 *  Lectorium - Main JavaScript
 */

class Lectorium {
  constructor() {
    this.currentTheme = localStorage.getItem('theme') || 'light';
    this.currentTab = 'dashboard';
    this.init();
  }

  init() {
    console.log('🚀 Iniciando CRAI Lectorium...');
    
    this.setupTheme();
    this.setupEventListeners();
    this.showWelcomeMessage();
    
    console.log('✅ CRAI Lectorium cargado correctamente');
  }

  setupTheme() {
    document.documentElement.setAttribute('data-theme', this.currentTheme);
    this.updateThemeIcon();
  }

  setupEventListeners() {
    // Theme toggle
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
      themeToggle.addEventListener('click', () => this.toggleTheme());
    }

    // Tab navigation
    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const tabName = btn.getAttribute('data-tab');
        this.switchTab(tabName);
      });
    });

    // Quick access cards
    const quickAccessCards = document.querySelectorAll('.quick-access-card');
    quickAccessCards.forEach(card => {
      card.addEventListener('click', () => {
        const tabName = card.getAttribute('data-tab');
        if (tabName) {
          this.switchTab(tabName);
        }
      });
    });

    // Buttons
    this.setupButtons();
  }

  setupButtons() {
    // Quick search
    const quickSearchBtn = document.getElementById('quickSearchBtn');
    if (quickSearchBtn) {
      quickSearchBtn.addEventListener('click', () => 
        this.showNotification('🔍 Búsqueda rápida próximamente', 'info')
      );
    }

    // Notifications
    const notificationBtn = document.getElementById('notificationBtn');
    if (notificationBtn) {
      notificationBtn.addEventListener('click', () => 
        this.showNotification('🔔 No tienes notificaciones nuevas', 'info')
      );
    }

    // Login
    const loginBtn = document.getElementById('loginBtn');
    if (loginBtn) {
      loginBtn.addEventListener('click', () => 
        this.showNotification('🔐 Sistema de login próximamente', 'info')
      );
    }

    // Chat
    const chatToggle = document.getElementById('chatToggle');
    if (chatToggle) {
      chatToggle.addEventListener('click', () => 
        this.showNotification('💬 Chat de soporte próximamente', 'info')
      );
    }
  }

  toggleTheme() {
    this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', this.currentTheme);
    localStorage.setItem('theme', this.currentTheme);
    this.updateThemeIcon();
    
    const message = this.currentTheme === 'dark' ? '🌙 Modo oscuro activado' : '☀️ Modo claro activado';
    this.showNotification(message, 'success');
  }

  updateThemeIcon() {
    const themeIcon = document.getElementById('themeIcon');
    if (themeIcon) {
      themeIcon.className = this.currentTheme === 'light' 
        ? 'fas fa-moon text-gray-800 dark:text-yellow-300' 
        : 'fas fa-sun text-yellow-300';
    }
  }

  switchTab(tabName) {
    // Remove active from all tabs
    document.querySelectorAll('.tab-btn').forEach(btn => 
      btn.classList.remove('tab-active')
    );
    document.querySelectorAll('.tab-content').forEach(content => {
      content.classList.add('hidden');
      content.style.display = 'none';
    });

    // Activate selected tab
    const activeTabBtn = document.querySelector(`[data-tab="${tabName}"]`);
    const activeTabContent = document.getElementById(`${tabName}-tab`);
    
    if (activeTabBtn) {
      activeTabBtn.classList.add('tab-active');
    }
    
    if (activeTabContent) {
      activeTabContent.classList.remove('hidden');
      activeTabContent.style.display = 'block';
    }

    this.currentTab = tabName;
    this.showNotification(`📂 Navegando a: ${this.getTabTitle(tabName)}`, 'info');
  }

  getTabTitle(tabName) {
    const titles = {
      dashboard: 'Inicio',
      catalog: 'Catálogo',
      loans: 'Préstamos',
      repository: 'Repositorio',
      databases: 'Bases de Datos'
    };
    return titles[tabName] || tabName;
  }

  showNotification(message, type = 'info') {
    const toast = document.createElement('div');
    const colors = {
      success: 'bg-green-500',
      error: 'bg-red-500',
      warning: 'bg-yellow-500',
      info: 'bg-blue-500'
    };

    toast.className = `${colors[type]} text-white px-6 py-3 rounded-lg shadow-lg transform translate-x-full transition-all duration-300 max-w-sm`;
    toast.innerHTML = `
      <div class="flex items-center space-x-2">
        <span class="text-sm font-medium">${message}</span>
        <button onclick="this.parentElement.parentElement.remove()" class="ml-4 text-white/80 hover:text-white">
          <i class="fas fa-times"></i>
        </button>
      </div>
    `;

    const container = document.getElementById('toast-container');
    if (container) {
      container.appendChild(toast);
      
      // Animate in
      setTimeout(() => {
        toast.style.transform = 'translateX(0)';
      }, 100);
      
      // Auto remove
      setTimeout(() => {
        toast.style.transform = 'translateX(100%)';
        setTimeout(() => toast.remove(), 300);
      }, 4000);
    }
  }

  showWelcomeMessage() {
    setTimeout(() => {
      this.showNotification('🎉 ¡Bienvenido al CRAI Lectorium!', 'success');
    }, 1000);
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.CRAI = new CRAILectorium();
});

// Add some demo functionality
document.addEventListener('DOMContentLoaded', () => {
  // Add click effects to all buttons
  document.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', function(e) {
      // Create ripple effect
      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      
      ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s ease-out;
        pointer-events: none;
      `;
      
      this.style.position = 'relative';
      this.style.overflow = 'hidden';
      this.appendChild(ripple);
      
      setTimeout(() => ripple.remove(), 600);
    });
  });
  
  // Add CSS for ripple animation
  const style = document.createElement('style');
  style.textContent = `
    @keyframes ripple {
      to {
        transform: scale(2);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);
});
