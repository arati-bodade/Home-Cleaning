// Navigation Toggle
let navToggle, navMenu, navbar;

// Navbar Scroll Effect
let lastScroll = 0;
window.addEventListener('scroll', () => {
    if (!navbar) return;
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Scroll to Top Function
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Search Functionality
let searchBtn, searchBox, searchInput, searchClose;

// Notification Panel
let notificationBadge, notificationPanel, notificationClose;

// Nav Book Button
let navBookBtn;

// Scroll to Service Function
function scrollToService(serviceName) {
    // First scroll to services section
    const servicesSection = document.getElementById('services');
    if (servicesSection) {
        servicesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        
        // Then activate the corresponding tab after a short delay
        setTimeout(() => {
            const tabBtn = document.querySelector(`[data-service="${serviceName}"]`);
            if (tabBtn) {
                tabBtn.click();
            }
        }, 500);
    }
    
    // Close mobile menu if open
    if (navMenu) navMenu.classList.remove('active');
    if (navToggle) navToggle.classList.remove('active');
}

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href.length > 1) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const offset = 80; // Account for fixed navbar
                const targetPosition = target.offsetTop - offset;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        }
    });
});

// Active Navigation Link
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function updateActiveNav() {
    let current = '';
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            current = sectionId;
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNav);

// Service Tabs
const tabButtons = document.querySelectorAll('.tab-btn');
const servicePanels = document.querySelectorAll('.service-panel');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        const targetService = button.getAttribute('data-service');

        // Remove active class from all buttons and panels
        tabButtons.forEach(btn => btn.classList.remove('active'));
        servicePanels.forEach(panel => panel.classList.remove('active'));

        // Add active class to clicked button
        button.classList.add('active');

        // Show corresponding panel
        const targetPanel = document.getElementById(`${targetService}-panel`);
        if (targetPanel) {
            targetPanel.classList.add('active');
        }
    });
});

// Booking Modal
let bookingModal, modalClose, bookNowBtn, bookingForm;

function openBookingModal(serviceName = '') {
    if (!bookingModal) return;
    if (serviceName) {
        const bookingServiceInput = document.getElementById('bookingService');
        if (bookingServiceInput) {
            bookingServiceInput.value = serviceName;
        }
    }
    bookingModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeBookingModal() {
    if (!bookingModal) return;
    bookingModal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && bookingModal && bookingModal.classList.contains('active')) {
        closeBookingModal();
    }
});

// Booking Form Submission
if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = {
        service: document.getElementById('bookingService').value,
        name: document.getElementById('bookingName').value,
        email: document.getElementById('bookingEmail').value,
        phone: document.getElementById('bookingPhone').value,
        date: document.getElementById('bookingDate').value,
        time: document.getElementById('bookingTime').value,
        notes: document.getElementById('bookingNotes').value
    };

    // Simulate form submission
    const submitBtn = bookingForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Booking...';
    submitBtn.disabled = true;

    // Simulate API call
    setTimeout(() => {
        console.log('Booking submitted:', formData);
        alert(`Thank you, ${formData.name}! Your booking for ${formData.service} on ${formData.date} at ${formData.time} has been received. We'll contact you soon to confirm.`);
        
        bookingForm.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        closeBookingModal();
    }, 1500);
    });
}

// Contact Form Submission
let contactForm;

// Scroll Animations
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

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.service-card, .feature-card, .stat-item, .contact-item');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Navbar scroll effect is now handled in the Navigation Toggle section above

// Form validation
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^[\d\s\(\)\-]+$/;
    return re.test(phone) && phone.replace(/\D/g, '').length >= 10;
}

// Background Image Rotation
const heroSection = document.querySelector('.hero');
const backgroundImages = [
    'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=1920&h=1080&fit=crop',
    'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1920&h=1080&fit=crop',
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&h=1080&fit=crop',
    'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=1920&h=1080&fit=crop',
    'https://images.unsplash.com/photo-1563453392212-326f5e854473?w=1920&h=1080&fit=crop',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&h=1080&fit=crop'
];

let currentImageIndex = 0;
let backgroundLayers = [];

function initializeBackgroundLayers() {
    if (!heroSection) return;
    
    // Create background layers for smooth transitions
    backgroundImages.forEach((imageUrl, index) => {
        const layer = document.createElement('div');
        layer.className = 'hero-bg-layer';
        layer.style.backgroundImage = `url('${imageUrl}')`;
        if (index === 0) {
            layer.classList.add('active');
        }
        heroSection.insertBefore(layer, heroSection.firstChild);
        backgroundLayers.push(layer);
    });
}

function changeBackgroundImage() {
    if (backgroundLayers.length === 0) return;
    
    // Find current active layer
    const currentLayer = backgroundLayers.find(layer => layer.classList.contains('active'));
    const currentIndex = backgroundLayers.indexOf(currentLayer);
    
    // Calculate next index
    const nextIndex = (currentIndex + 1) % backgroundLayers.length;
    const nextLayer = backgroundLayers[nextIndex];
    
    // Preload next image
    const nextImage = new Image();
    nextImage.src = backgroundImages[nextIndex];
    
    nextImage.onload = () => {
        // Fade out current layer
        if (currentLayer) {
            currentLayer.classList.remove('active');
        }
        
        // Fade in next layer
        setTimeout(() => {
            nextLayer.classList.add('active');
        }, 50);
    };
}

// Initialize background image rotation
let backgroundInterval;

function startBackgroundRotation() {
    // Change background every 2 seconds (2000ms)
    if (backgroundInterval) {
        clearInterval(backgroundInterval);
    }
    backgroundInterval = setInterval(changeBackgroundImage, 2000);
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Initialize DOM elements
    navToggle = document.getElementById('navToggle');
    navMenu = document.querySelector('.nav-menu');
    navbar = document.getElementById('navbar');
    searchBtn = document.getElementById('searchBtn');
    searchBox = document.getElementById('searchBox');
    searchInput = document.getElementById('searchInput');
    searchClose = document.getElementById('searchClose');
    notificationBadge = document.getElementById('notificationBadge');
    notificationPanel = document.getElementById('notificationPanel');
    notificationClose = document.getElementById('notificationClose');
    navBookBtn = document.getElementById('navBookBtn');
    bookingModal = document.getElementById('bookingModal');
    modalClose = document.getElementById('modalClose');
    bookNowBtn = document.getElementById('bookNowBtn');
    bookingForm = document.getElementById('bookingForm');
    contactForm = document.getElementById('contactForm');
    
    // Navigation Toggle
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }
    
    // Search Functionality
    if (searchBtn && searchBox && searchInput) {
        searchBtn.addEventListener('click', () => {
            searchBox.classList.toggle('active');
            if (searchBox.classList.contains('active')) {
                searchInput.focus();
            }
        });
    }
    
    if (searchClose && searchBox && searchInput) {
        searchClose.addEventListener('click', () => {
            searchBox.classList.remove('active');
            searchInput.value = '';
        });
    }
    
    // Close search when clicking outside
    if (searchBox && searchBtn) {
        document.addEventListener('click', (e) => {
            if (!searchBox.contains(e.target) && !searchBtn.contains(e.target)) {
                searchBox.classList.remove('active');
            }
        });
    }
    
    // Search functionality
    if (searchInput && searchBox) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            if (searchTerm.length > 0) {
                // Filter services based on search term
                const services = ['sofa', 'kitchen', 'hall', 'window'];
                const matchingServices = services.filter(service => {
                    const serviceElement = document.querySelector(`[data-service="${service}"] span`);
                    return service.includes(searchTerm) || 
                        (serviceElement && serviceElement.textContent.toLowerCase().includes(searchTerm));
                });
                
                if (matchingServices.length > 0 && searchTerm.length > 2) {
                    // Highlight matching services
                    console.log('Found services:', matchingServices);
                }
            }
        });
        
        // Close search on Escape key
        searchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                searchBox.classList.remove('active');
                searchInput.value = '';
            }
            if (e.key === 'Enter') {
                e.preventDefault();
                const searchTerm = searchInput.value.toLowerCase();
                if (searchTerm.includes('sofa')) {
                    scrollToService('sofa');
                } else if (searchTerm.includes('kitchen')) {
                    scrollToService('kitchen');
                } else if (searchTerm.includes('hall') || searchTerm.includes('living')) {
                    scrollToService('hall');
                } else if (searchTerm.includes('window')) {
                    scrollToService('window');
                }
                searchBox.classList.remove('active');
            }
        });
    }
    
    // Notification Panel
    if (notificationBadge && notificationPanel) {
        notificationBadge.addEventListener('click', () => {
            notificationPanel.classList.toggle('active');
            // Mark notifications as read
            const badgeCount = notificationBadge.querySelector('.badge-count');
            if (badgeCount) {
                badgeCount.style.display = 'none';
            }
        });
        
        // Close notification panel when clicking outside
        document.addEventListener('click', (e) => {
            if (!notificationPanel.contains(e.target) && !notificationBadge.contains(e.target)) {
                notificationPanel.classList.remove('active');
            }
        });
    }
    
    if (notificationClose && notificationPanel) {
        notificationClose.addEventListener('click', () => {
            notificationPanel.classList.remove('active');
        });
    }
    
    // Nav Book Button
    if (navBookBtn) {
        navBookBtn.addEventListener('click', () => {
            openBookingModal('General Cleaning');
            // Close mobile menu if open
            if (navMenu) navMenu.classList.remove('active');
            if (navToggle) navToggle.classList.remove('active');
        });
    }
    
    // Booking Modal
    if (modalClose) {
        modalClose.addEventListener('click', closeBookingModal);
    }
    
    if (bookNowBtn) {
        bookNowBtn.addEventListener('click', () => openBookingModal('General Cleaning'));
    }
    
    // Close modal when clicking outside
    if (bookingModal) {
        bookingModal.addEventListener('click', (e) => {
            if (e.target === bookingModal) {
                closeBookingModal();
            }
        });
    }
    
    // Set minimum date to today for booking date
    const bookingDateInput = document.getElementById('bookingDate');
    if (bookingDateInput) {
        const today = new Date().toISOString().split('T')[0];
        bookingDateInput.setAttribute('min', today);
    }
    
    // Contact Form Submission
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const contactData = {
                name: document.getElementById('contactName').value,
                email: document.getElementById('contactEmail').value,
                message: document.getElementById('contactMessage').value
            };

            // Simulate form submission
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            if (submitBtn) {
                const originalText = submitBtn.textContent;
                submitBtn.textContent = 'Sending...';
                submitBtn.disabled = true;

                setTimeout(() => {
                    console.log('Contact form submitted:', contactData);
                    alert(`Thank you, ${contactData.name}! Your message has been sent. We'll get back to you at ${contactData.email} soon.`);
                    
                    contactForm.reset();
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                }, 1500);
            }
        });
    }
    
    // Add real-time validation
    const emailInputs = document.querySelectorAll('input[type="email"]');
    emailInputs.forEach(input => {
        input.addEventListener('blur', () => {
            if (input.value && !validateEmail(input.value)) {
                input.style.borderColor = '#e74c3c';
            } else {
                input.style.borderColor = '#e0e0e0';
            }
        });
    });

    const phoneInput = document.getElementById('bookingPhone');
    if (phoneInput) {
        phoneInput.addEventListener('blur', () => {
            if (phoneInput.value && !validatePhone(phoneInput.value)) {
                phoneInput.style.borderColor = '#e74c3c';
            } else {
                phoneInput.style.borderColor = '#e0e0e0';
            }
        });
    }
    
    // Add hover effects to service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px)';
            card.style.transition = 'transform 0.3s ease';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });

    // Feature cards animation on scroll
    const featureCards = document.querySelectorAll('.feature-card');
    const featureObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }, { threshold: 0.2 });

    featureCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        featureObserver.observe(card);
    });
    
    updateActiveNav();
    
    // Initialize and start background image rotation
    initializeBackgroundLayers();
    startBackgroundRotation();
});

// Pause background rotation when page is not visible (to save resources)
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        if (backgroundInterval) {
            clearInterval(backgroundInterval);
        }
    } else {
        startBackgroundRotation();
    }
});

