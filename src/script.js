// Configurações e variáveis globais
const CONFIG = {
    animationDuration: 300,
    loadingDelay: 1000,
    apiEndpoint: '/api/data'
};

// Elementos DOM
const elements = {
    primaryBtn: document.getElementById('primaryBtn'),
    secondaryBtn: document.getElementById('secondaryBtn'),
    refreshBtn: document.getElementById('refreshBtn'),
    loadingOverlay: document.getElementById('loadingOverlay'),
    navLinks: document.querySelectorAll('.nav-link'),
    featureCards: document.querySelectorAll('.feature-card'),
    statCards: document.querySelectorAll('.stat-card')
};

// Classe principal da aplicação
class App {
    constructor() {
        this.init();
    }

    init() {
        this.bindEvents();
        this.setupAnimations();
        this.loadInitialData();
        console.log('🚀 Aplicação inicializada com sucesso!');
    }

    bindEvents() {
        // Event listeners para botões
        elements.primaryBtn?.addEventListener('click', this.handlePrimaryAction.bind(this));
        elements.secondaryBtn?.addEventListener('click', this.handleSecondaryAction.bind(this));
        elements.refreshBtn?.addEventListener('click', this.handleRefresh.bind(this));

        // Event listeners para navegação
        elements.navLinks.forEach(link => {
            link.addEventListener('click', this.handleNavigation.bind(this));
        });

        // Event listeners para cards
        elements.featureCards.forEach(card => {
            card.addEventListener('mouseenter', this.handleCardHover.bind(this));
            card.addEventListener('mouseleave', this.handleCardLeave.bind(this));
        });

        // Event listener para scroll
        window.addEventListener('scroll', this.handleScroll.bind(this));

        // Event listener para resize
        window.addEventListener('resize', this.handleResize.bind(this));
    }

    setupAnimations() {
        // Configurar animações de entrada
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observar elementos para animação
        document.querySelectorAll('.feature-card, .stat-card').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }

    handlePrimaryAction(e) {
        e.preventDefault();
        this.showLoading();
        
        // Simular ação assíncrona
        setTimeout(() => {
            this.hideLoading();
            this.showNotification('Ação principal executada com sucesso!', 'success');
            this.updateStats();
        }, CONFIG.loadingDelay);
    }

    handleSecondaryAction(e) {
        e.preventDefault();
        this.showModal('Informações', 'Esta é uma aplicação moderna desenvolvida com as melhores práticas de UX/UI.');
    }

    handleRefresh(e) {
        e.preventDefault();
        this.showLoading();
        
        // Simular refresh de dados
        setTimeout(() => {
            this.hideLoading();
            this.updateStats();
            this.showNotification('Dados atualizados!', 'info');
        }, CONFIG.loadingDelay);
    }

    handleNavigation(e) {
        e.preventDefault();
        
        // Remover classe active de todos os links
        elements.navLinks.forEach(link => link.classList.remove('active'));
        
        // Adicionar classe active ao link clicado
        e.target.classList.add('active');
        
        // Simular navegação
        const section = e.target.textContent.toLowerCase();
        this.showNotification(`Navegando para: ${section}`, 'info');
    }

    handleCardHover(e) {
        const card = e.currentTarget;
        card.style.transform = 'translateY(-10px) scale(1.02)';
        card.style.boxShadow = '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)';
    }

    handleCardLeave(e) {
        const card = e.currentTarget;
        card.style.transform = 'translateY(0) scale(1)';
        card.style.boxShadow = '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)';
    }

    handleScroll() {
        const header = document.querySelector('.header');
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.background = 'var(--bg-card)';
            header.style.backdropFilter = 'none';
        }
    }

    handleResize() {
        // Reajustar layout em mudanças de tamanho
        console.log('Viewport redimensionado:', window.innerWidth, 'x', window.innerHeight);
    }

    showLoading() {
        elements.loadingOverlay?.classList.add('active');
    }

    hideLoading() {
        elements.loadingOverlay?.classList.remove('active');
    }

    showNotification(message, type = 'info') {
        // Criar elemento de notificação
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${this.getNotificationIcon(type)}"></i>
                <span>${message}</span>
            </div>
        `;

        // Adicionar estilos
        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            background: this.getNotificationColor(type),
            color: 'white',
            padding: '1rem 1.5rem',
            borderRadius: 'var(--border-radius)',
            boxShadow: 'var(--shadow-lg)',
            zIndex: '1001',
            transform: 'translateX(100%)',
            transition: 'transform 0.3s ease'
        });

        document.body.appendChild(notification);

        // Animar entrada
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Remover após 3 segundos
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    showModal(title, content) {
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal">
                <div class="modal-header">
                    <h3>${title}</h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-content">
                    <p>${content}</p>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-primary modal-ok">OK</button>
                </div>
            </div>
        `;

        // Adicionar estilos
        Object.assign(modal.style, {
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            background: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: '1002',
            backdropFilter: 'blur(5px)'
        });

        const modalContent = modal.querySelector('.modal');
        Object.assign(modalContent.style, {
            background: 'white',
            borderRadius: 'var(--border-radius)',
            padding: '2rem',
            maxWidth: '500px',
            width: '90%',
            boxShadow: 'var(--shadow-lg)'
        });

        document.body.appendChild(modal);

        // Event listeners para fechar modal
        modal.querySelector('.modal-close').addEventListener('click', () => {
            document.body.removeChild(modal);
        });

        modal.querySelector('.modal-ok').addEventListener('click', () => {
            document.body.removeChild(modal);
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                document.body.removeChild(modal);
            }
        });
    }

    updateStats() {
        const stats = [
            { value: Math.floor(Math.random() * 2000) + 1000, label: 'Usuários Ativos' },
            { value: (Math.random() * 2 + 98).toFixed(1) + '%', label: 'Uptime' },
            { value: (Math.random() * 3 + 1).toFixed(1) + 'GB', label: 'Dados Processados' }
        ];

        elements.statCards.forEach((card, index) => {
            const valueElement = card.querySelector('.stat-value');
            const currentValue = valueElement.textContent;
            
            // Animação de contagem
            this.animateValue(valueElement, currentValue, stats[index].value, 1000);
        });
    }

    animateValue(element, start, end, duration) {
        const startValue = parseInt(start) || 0;
        const endValue = parseInt(end) || 0;
        const range = endValue - startValue;
        const increment = range / (duration / 16);
        let current = startValue;

        const timer = setInterval(() => {
            current += increment;
            if ((increment > 0 && current >= endValue) || (increment < 0 && current <= endValue)) {
                current = endValue;
                clearInterval(timer);
            }
            element.textContent = typeof end === 'string' && end.includes('%') 
                ? current.toFixed(1) + '%' 
                : typeof end === 'string' && end.includes('GB')
                ? current.toFixed(1) + 'GB'
                : Math.floor(current).toLocaleString();
        }, 16);
    }

    getNotificationIcon(type) {
        const icons = {
            success: 'check-circle',
            error: 'exclamation-circle',
            warning: 'exclamation-triangle',
            info: 'info-circle'
        };
        return icons[type] || 'info-circle';
    }

    getNotificationColor(type) {
        const colors = {
            success: '#48bb78',
            error: '#f56565',
            warning: '#ed8936',
            info: '#4299e1'
        };
        return colors[type] || '#4299e1';
    }

    loadInitialData() {
        // Simular carregamento inicial de dados
        this.showLoading();
        
        setTimeout(() => {
            this.hideLoading();
            this.updateStats();
            console.log('✅ Dados iniciais carregados');
        }, 1000);
    }
}

// Utilitários
const Utils = {
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },

    formatNumber(num) {
        return new Intl.NumberFormat('pt-BR').format(num);
    },

    formatDate(date) {
        return new Intl.DateTimeFormat('pt-BR').format(new Date(date));
    }
};

// Inicializar aplicação quando DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    new App();
});

// Service Worker para PWA (opcional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registrado: ', registration);
            })
            .catch(registrationError => {
                console.log('SW falhou: ', registrationError);
            });
    });
}