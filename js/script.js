document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const mobileNav = document.getElementById('mobile-nav');

    if (mobileBtn && mobileNav) {
        mobileBtn.addEventListener('click', () => {
            mobileNav.classList.toggle('active');
        });
    }

    // Modal Functionality
    const modalOverlay = document.getElementById('deal-modal');
    const closeBtn = document.getElementById('modal-close');
    const getDealBtns = document.querySelectorAll('.get-deal-btn');
    
    // Modal Elements
    const modalStore = document.getElementById('modal-store');
    const modalTitle = document.getElementById('modal-title');
    const modalCode = document.getElementById('modal-code');
    const copyCodeBtn = document.getElementById('copy-code-btn');
    
    if (modalOverlay) {
        // Open Modal
        getDealBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const card = btn.closest('.deal-card');
                const storeName = card.querySelector('.store-name').textContent;
                const dealTitle = card.querySelector('.deal-title').textContent;
                
                // Get deal type to decide if showing a code or just a deal
                const dealType = card.dataset.type || 'deal';
                
                modalStore.textContent = storeName;
                modalTitle.textContent = dealTitle;
                
                if (dealType === 'code' || dealTitle.toLowerCase().includes('code')) {
                    modalCode.textContent = generateDemoCode(storeName);
                    modalCode.style.display = 'block';
                    copyCodeBtn.style.display = 'block';
                } else {
                    modalCode.textContent = 'DEAL ACTIVATED';
                    modalCode.style.display = 'block';
                    copyCodeBtn.style.display = 'none';
                }
                
                modalOverlay.classList.add('active');
            });
        });

        // Close Modal
        const closeModal = () => {
            modalOverlay.classList.remove('active');
            setTimeout(() => {
                copyCodeBtn.textContent = 'Copy Code';
            }, 300); // reset after animation
        };

        closeBtn.addEventListener('click', closeModal);
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) closeModal();
        });
    }

    // Copy to Clipboard
    if (copyCodeBtn) {
        copyCodeBtn.addEventListener('click', () => {
            const codeToCopy = modalCode.textContent;
            navigator.clipboard.writeText(codeToCopy).then(() => {
                copyCodeBtn.textContent = 'Copied!';
                setTimeout(() => {
                    copyCodeBtn.textContent = 'Copy Code';
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy text: ', err);
            });
        });
    }

    // Helper: Generate Demo Code
    function generateDemoCode(storeName) {
        const prefix = storeName.substring(0, 3).toUpperCase();
        const num = Math.floor(Math.random() * 50) + 10;
        return `${prefix}SAVE${num}`;
    }

    // Deals Filtering (Deals Page)
    const dealFilters = document.querySelectorAll('.filter-btn[data-filter]');
    const dealCards = document.querySelectorAll('.deals-grid .deal-card');
    
    if (dealFilters.length > 0 && dealCards.length > 0) {
        dealFilters.forEach(filter => {
            filter.addEventListener('click', () => {
                // Update active state
                dealFilters.forEach(btn => btn.classList.remove('active'));
                filter.classList.add('active');
                
                const filterValue = filter.dataset.filter;
                
                dealCards.forEach(card => {
                    if (filterValue === 'all' || card.dataset.category === filterValue) {
                        card.style.display = 'flex';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    // Deals Search (Deals Page)
    const dealsSearchInput = document.getElementById('deals-search');
    if (dealsSearchInput && dealCards.length > 0) {
        dealsSearchInput.addEventListener('input', (e) => {
            const term = e.target.value.toLowerCase();
            dealCards.forEach(card => {
                const text = card.textContent.toLowerCase();
                if (text.includes(term)) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }

    // Store Alphabet Filtering (Stores Page)
    const alphaBtns = document.querySelectorAll('.alpha-btn');
    const storeCards = document.querySelectorAll('.stores-grid .store-card');
    
    if (alphaBtns.length > 0 && storeCards.length > 0) {
        alphaBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                alphaBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                const letter = btn.dataset.letter;
                
                storeCards.forEach(card => {
                    const storeName = card.querySelector('h3').textContent.trim();
                    if (letter === 'all' || storeName.toUpperCase().startsWith(letter)) {
                        card.style.display = 'flex';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    // Store Search (Stores Page)
    const storeSearchInput = document.getElementById('store-search');
    if (storeSearchInput && storeCards.length > 0) {
        storeSearchInput.addEventListener('input', (e) => {
            const term = e.target.value.toLowerCase();
            storeCards.forEach(card => {
                const text = card.textContent.toLowerCase();
                if (text.includes(term)) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }

    // Newsletter Validation
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const input = newsletterForm.querySelector('input[type="email"]');
            if (input.value && input.validity.valid) {
                alert('Thank you for subscribing! (This is a frontend demo)');
                input.value = '';
            } else {
                alert('Please enter a valid email address.');
            }
        });
    }

    // Back to Top Button
    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});
