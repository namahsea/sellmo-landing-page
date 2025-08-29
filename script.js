// Interactive Landing Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all interactive features
    initAnimations();
    initFormHandling();
    initHeaderCTA();
    initTypoEffects();
    initScrollAnimations();
    initFloatingElements();
    initDelayedChat();
    initChatEmailSubmission();
    
    // Add test button for modal debugging (commented out for production)
    // addTestButton();
});

// Add test button for debugging modal (commented out for production)
/*
function addTestButton() {
    const testButton = document.createElement('button');
    testButton.textContent = 'Test Modal';
    testButton.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 10000;
        padding: 10px 20px;
        background: #6366f1;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
    `;
    testButton.onclick = function() {
        showSuccessMessage('test@example.com', true);
    };
    document.body.appendChild(testButton);
}
*/

// Initialize delayed chat animation
function initDelayedChat() {
    startChatCycle();
}

// Start a complete chat cycle
function startChatCycle() {
    // Reset all messages to hidden state
    resetChatMessages();
    
    // Show chat input field first (immediate pop)
    showChatInput();
    
    // Show first message after 1 second delay
    setTimeout(() => {
        showChatMessage('chat1', 0);
    }, 1000);
    
    // Show second message after 2 seconds from first message (3 seconds total)
    setTimeout(() => {
        showChatMessage('chat2', 0);
    }, 3000);
    
    // Show third message after 2 seconds from second message (5 seconds total)
    setTimeout(() => {
        showChatMessage('chat3', 0);
        
        // Show input field after last message appears
        setTimeout(() => {
            showChatInput();
        }, 500);
    }, 5000);
}

// Reset all chat messages to hidden state
function resetChatMessages() {
    const chatMessages = ['chat1', 'chat2', 'chat3'];
    chatMessages.forEach(chatId => {
        const chatElement = document.getElementById(chatId);
        if (chatElement) {
            chatElement.style.opacity = '0';
            chatElement.style.transform = 'translateY(20px) scale(0.95)';
        }
    });
    
    // Reset chat input container
    const chatInputContainer = document.getElementById('chatInputContainer');
    if (chatInputContainer) {
        chatInputContainer.style.opacity = '0';
        chatInputContainer.style.transform = 'translateY(20px)';
    }
}

// Hide all messages with animation
function hideAllMessages() {
    const chatMessages = ['chat1', 'chat2', 'chat3'];
    chatMessages.forEach(chatId => {
        const chatElement = document.getElementById(chatId);
        if (chatElement) {
            chatElement.style.opacity = '0';
            chatElement.style.transform = 'translateY(20px) scale(0.95)';
            chatElement.style.transition = 'all 0.4s ease';
        }
    });
    
    // Hide chat input container
    const chatInputContainer = document.getElementById('chatInputContainer');
    if (chatInputContainer) {
        chatInputContainer.style.opacity = '0';
        chatInputContainer.style.transform = 'translateY(20px)';
        chatInputContainer.style.transition = 'all 0.4s ease';
    }
}

// Show individual chat message with WhatsApp-style animation
function showChatMessage(chatId, delay = 0) {
    setTimeout(() => {
        const chatElement = document.getElementById(chatId);
        if (chatElement) {
            chatElement.style.opacity = '1';
            chatElement.style.transform = 'translateY(0) scale(1)';
            chatElement.style.transition = 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            
            // Push previous messages upward smoothly
            pushMessagesUp();
            
            // Ensure messages stack from bottom with smooth upward movement
            const chatBubbles = document.getElementById('chatBubbles');
            if (chatBubbles) {
                chatBubbles.style.justifyContent = 'flex-end';
                chatBubbles.style.alignItems = 'stretch';
            }
        }
    }, delay);
}

// Push existing messages upward smoothly
function pushMessagesUp() {
    const existingMessages = document.querySelectorAll('.chat-bubble:not([style*="opacity: 0"])');
    existingMessages.forEach((message, index) => {
        if (index < existingMessages.length - 1) { // Don't animate the newest message
            message.classList.add('animate-up');
        }
    });
}

// Show chat input field with animation
function showChatInput() {
    const chatInputContainer = document.getElementById('chatInputContainer');
    if (chatInputContainer) {
        chatInputContainer.style.opacity = '1';
        chatInputContainer.style.transform = 'translateY(0)';
        chatInputContainer.style.transition = 'all 0.6s ease';
    }
}

/* Enable chat input function removed - no longer needed */

// Initialize smooth animations and interactions
function initAnimations() {
    // Add intersection observer for scroll animations
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

    // Observe all sections for animation (excluding hero for chat timing)
    document.querySelectorAll('section:not(.hero)').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'all 0.8s ease';
        observer.observe(section);
    });
}

// Initialize form handling
function initFormHandling() {
    const signupForm = document.getElementById('signupForm');
    
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            // Don't prevent default - let Netlify handle the submission
            const email = this.querySelector('input[type="email"]').value;
            const newsletter = this.querySelector('input[type="checkbox"]').checked;
            
            // Show success message after a brief delay to allow Netlify submission
            setTimeout(() => {
                showSuccessMessage(email, newsletter);
                
                // Reset form
                this.reset();
                this.querySelector('input[type="checkbox"]').checked = true;
            }, 100);
        });
    }
}

// Initialize header CTA navigation
function initHeaderCTA() {
    const headerCTA = document.querySelector('.nav-cta');
    
    if (headerCTA) {
        headerCTA.addEventListener('click', function() {
            // Find the beta signup section
            const betaSection = document.querySelector('.beta-signup');
            
            if (betaSection) {
                // Smooth scroll to the beta signup section
                betaSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
}

// Show success message after form submission
function showSuccessMessage(email, newsletter) {
    console.log('showSuccessMessage called'); // Debug log
    
    // Create modal overlay
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'modal-overlay';
    
    // Create modal content
    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content';
    modalContent.innerHTML = `
        <div class="modal-header">
            <button class="modal-close" onclick="closeModal()">×</button>
        </div>
        <div class="modal-body">
            <div class="modal-icon">🎉</div>
            <h2 class="modal-title">Welcome aboard!</h2>
            <p class="modal-text">You've successfully signed up for early access. As part of our beta community, you'll get a first look at upcoming features and help shape the future of our marketplace.</p>
        </div>
    `;
    
    // Add modal to overlay
    modalOverlay.appendChild(modalContent);
    
    // Add to page
    document.body.appendChild(modalOverlay);
    
    console.log('Modal added to DOM'); // Debug log
    
    // Add modal styles
    addModalStyles();
    
    // Show modal with animation
    setTimeout(() => {
        modalOverlay.classList.add('show');
        console.log('Show class added'); // Debug log
    }, 50);
}

// Close modal function - make it globally accessible
window.closeModal = function() {
    const modalOverlay = document.querySelector('.modal-overlay');
    if (modalOverlay) {
        modalOverlay.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(modalOverlay);
        }, 300);
    }
}

// Add modal styles
function addModalStyles() {
    if (document.getElementById('modal-styles')) return;
    
    const style = document.createElement('style');
    style.id = 'modal-styles';
    style.textContent = `
        .modal-overlay {
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            width: 100% !important;
            height: 100% !important;
            background: rgba(0, 0, 0, 0.5) !important;
            backdrop-filter: blur(8px) !important;
            z-index: 9999 !important;
            display: flex !important;
            align-items: flex-start !important;
            justify-content: center !important;
            padding-top: 25vh !important;
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        
        .modal-overlay.show {
            opacity: 1 !important;
        }
        
        .modal-content {
            background: white !important;
            border-radius: 1.5rem !important;
            box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25) !important;
            max-width: 500px !important;
            width: 90% !important;
            transform: translateY(-20px);
            transition: transform 0.3s ease;
            position: relative !important;
        }
        
        .modal-overlay.show .modal-content {
            transform: translateY(0) !important;
        }
        
        .modal-header {
            position: relative !important;
            padding: 1.5rem 1.5rem 0 1.5rem !important;
        }
        
        .modal-close {
            position: absolute !important;
            top: 0 !important;
            right: 0 !important;
            background: #f3f4f6 !important;
            border: none !important;
            width: 32px !important;
            height: 32px !important;
            border-radius: 50% !important;
            font-size: 1.25rem !important;
            font-weight: bold !important;
            color: #6b7280 !important;
            cursor: pointer !important;
            transition: all 0.2s ease;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
        }
        
        .modal-close:hover {
            background: #e5e7eb !important;
            color: #374151 !important;
            transform: scale(1.1) !important;
        }
        
        .modal-body {
            padding: 0 1.5rem 2rem 1.5rem !important;
            text-align: center !important;
        }
        
        .modal-icon {
            font-size: 3rem !important;
            margin-bottom: 1.5rem !important;
            animation: bounce 0.6s ease;
        }
        
        .modal-title {
            font-size: 1.75rem !important;
            font-weight: 700 !important;
            color: #1f2937 !important;
            margin-bottom: 1rem !important;
            line-height: 1.3 !important;
        }
        
        .modal-text {
            font-size: 1.1rem !important;
            color: #6b7280 !important;
            line-height: 1.6 !important;
            margin: 0 !important;
        }
        
        @keyframes bounce {
            0%, 20%, 50%, 80%, 100% {
                transform: translateY(0);
            }
            40% {
                transform: translateY(-10px);
            }
            60% {
                transform: translateY(-5px);
            }
        }
        
        @media (max-width: 768px) {
            .modal-content {
                max-width: 90% !important;
                margin: 0 1rem !important;
            }
            
            .modal-title {
                font-size: 1.5rem !important;
            }
            
            .modal-text {
                font-size: 1rem !important;
            }
        }
    `;
    
    document.head.appendChild(style);
}

// Initialize typo effects
function initTypoEffects() {
    const typos = document.querySelectorAll('.typo');
    
    typos.forEach(typo => {
        // Add a custom attribute to track the state
        typo.setAttribute('data-gradient', 'false');
        
        typo.addEventListener('click', function() {
            // Add click animation
            this.style.transform = 'scale(1.1) rotate(2deg)';
            
            // Toggle between dark and gradient using custom attribute
            if (this.getAttribute('data-gradient') === 'true') {
                // Currently gradient, switch back to dark
                this.style.background = 'none';
                this.style.color = '#22223b';
                this.style.webkitBackgroundClip = 'unset';
                this.style.webkitTextFillColor = 'unset';
                this.style.backgroundClip = 'unset';
                this.setAttribute('data-gradient', 'false');
            } else {
                // Currently dark, switch to gradient
                this.style.background = 'linear-gradient(135deg, #6366f1, #06b6d4, #8b5cf6)';
                this.style.webkitBackgroundClip = 'text';
                this.style.webkitTextFillColor = 'transparent';
                this.style.backgroundClip = 'text';
                this.style.color = 'transparent';
                this.setAttribute('data-gradient', 'true');
            }
            
            // Reset transform after animation
            setTimeout(() => {
                this.style.transform = 'scale(1) rotate(0deg)';
            }, 200);
            
            // Add sparkle effect
            createSparkle(this);
        });
    });
}

// Create sparkle effect
function createSparkle(element) {
    const sparkle = document.createElement('div');
    sparkle.innerHTML = '✨';
    sparkle.style.cssText = `
        position: absolute;
        font-size: 1.5rem;
        pointer-events: none;
        z-index: 10;
        animation: sparkleFloat 1s ease-out forwards;
    `;
    
    // Position sparkle
    const rect = element.getBoundingClientRect();
    sparkle.style.left = rect.left + rect.width / 2 + 'px';
    sparkle.style.top = rect.top + rect.height / 2 + 'px';
    
    document.body.appendChild(sparkle);
    
    // Remove after animation
    setTimeout(() => {
        document.body.removeChild(sparkle);
    }, 1000);
}

// Initialize scroll animations
function initScrollAnimations() {
    let ticking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.floating-icon');
        
        parallaxElements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.1);
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px) rotate(${scrolled * 0.1}deg)`;
        });
        
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick);
}

// Initialize floating elements
function initFloatingElements() {
    const floatingIcons = document.querySelectorAll('.floating-icon');
    
    floatingIcons.forEach((icon, index) => {
        // Add random movement
        setInterval(() => {
            const randomX = Math.random() * 20 - 10;
            const randomY = Math.random() * 20 - 10;
            const randomRotate = Math.random() * 360;
            
            icon.style.transform = `translate(${randomX}px, ${randomY}px) rotate(${randomRotate}deg)`;
        }, 3000 + (index * 1000));
    });
}

// Rewrite text function (called from HTML)
function rewriteText() {
    const originalText = document.querySelector('.text-area.original p');
    const rewrittenText = document.querySelector('.text-area.rewritten p');
    const button = document.querySelector('.rewrite-button');
    
    if (originalText && rewrittenText && button) {
        // Disable button during animation
        button.disabled = true;
        button.textContent = 'Rewriting...';
        
        // Simulate AI processing
        setTimeout(() => {
            // Add typing effect
            typeText(rewrittenText, rewrittenText.textContent);
            
            // Re-enable button
            button.disabled = false;
            button.textContent = 'Rewrite';
            
            // Add success animation
            rewrittenText.style.borderColor = '#10b981';
            rewrittenText.style.background = '#ecfdf5';
            
            setTimeout(() => {
                rewrittenText.style.borderColor = '#8b5cf6';
                rewrittenText.style.background = '#faf5ff';
            }, 2000);
        }, 1500);
    }
}

// Type text effect
function typeText(element, text) {
    element.textContent = '';
    let i = 0;
    
    function typeChar() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(typeChar, 30);
        }
    }
    
    typeChar();
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideOut {
        to {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.9);
        }
    }
    
    @keyframes sparkleFloat {
        0% {
            opacity: 1;
            transform: scale(1) translateY(0);
        }
        100% {
            opacity: 0;
            transform: scale(0.5) translateY(-50px);
        }
    }
    
    .success-message {
        animation: slideIn 0.3s ease;
    }
    
    .success-icon {
        font-size: 3rem;
        margin-bottom: 1rem;
        animation: sparkle 2s ease-in-out infinite;
    }
    
    .success-content h3 {
        color: #8b5cf6;
        margin-bottom: 1rem;
    }
    
    .success-content p {
        color: #6b7280;
        margin-bottom: 0.5rem;
    }
`;
document.head.appendChild(style);

// Add smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add hover effects for interactive elements
document.querySelectorAll('.comparison-card, .style-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', function() {
    document.body.classList.remove('keyboard-navigation');
});

// Add focus styles for accessibility (excluding .typo elements)
document.querySelectorAll('button, input').forEach(element => {
    element.addEventListener('focus', function() {
        // Remove purple outline - keep clean focus state
        this.style.outline = 'none';
    });
    
    element.addEventListener('blur', function() {
        this.style.outline = 'none';
    });
});

// Scroll-triggered animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe all sections with scroll-animate class
document.querySelectorAll('.scroll-animate').forEach(section => {
    observer.observe(section);
});

// Initialize chat email submission
function initChatEmailSubmission() {
    const chatSubmit = document.querySelector('.chat-submit');
    const emailInput = document.querySelector('.email-input');
    
    if (chatSubmit && emailInput) {
        chatSubmit.addEventListener('click', function() {
            const email = emailInput.value.trim();
            if (email && isValidEmail(email)) {
                // Submit the form to Netlify
                const chatForm = document.querySelector('form[name="chat-signup"]');
                if (chatForm) {
                    // Create a hidden input for the email if it doesn't exist
                    let hiddenInput = chatForm.querySelector('input[type="hidden"]');
                    if (!hiddenInput) {
                        hiddenInput = document.createElement('input');
                        hiddenInput.type = 'hidden';
                        hiddenInput.name = 'email';
                        chatForm.appendChild(hiddenInput);
                    }
                    hiddenInput.value = email;
                    
                    // Submit the form
                    chatForm.submit();
                }
                
                // Show success message
                showChatSuccess();
                emailInput.value = '';
            } else {
                // Show error state
                emailInput.style.borderColor = '#ef4444';
                setTimeout(() => {
                    emailInput.style.borderColor = '#e5e7eb';
                }, 2000);
            }
        });
        
        // Handle Enter key
        emailInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                chatSubmit.click();
            }
        });
    }
}

// Simple email validation
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Show success message in chat
function showChatSuccess() {
    // Show the same modal for chat submissions
    showSuccessMessage('', false);
    
    // Also update the input placeholder briefly
    const emailInput = document.querySelector('.email-input');
    if (emailInput) {
        emailInput.placeholder = 'Thanks! We\'ll be in touch soon! 🎉';
        emailInput.style.borderColor = '#10b981';
        setTimeout(() => {
            emailInput.placeholder = 'I want to try.. (Enter email address)';
            emailInput.style.borderColor = '#e5e7eb';
        }, 3000);
    }
}
