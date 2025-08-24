// Interactive Landing Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all interactive features
    initAnimations();
    initFormHandling();
    initTypoEffects();
    initScrollAnimations();
    initFloatingElements();
    initDelayedChat();
    initChatEmailSubmission();
});

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
            e.preventDefault();
            
            const email = this.querySelector('input[type="email"]').value;
            const newsletter = this.querySelector('input[type="checkbox"]').checked;
            
            // Simulate form submission
            showSuccessMessage(email, newsletter);
            
            // Reset form
            this.reset();
            this.querySelector('input[type="checkbox"]').checked = true;
        });
    }
}

// Show success message after form submission
function showSuccessMessage(email, newsletter) {
    // Create success message element
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.innerHTML = `
        <div class="success-content">
            <div class="success-icon">✨</div>
            <h3>Welcome to the future!</h3>
            <p>Thanks for joining our beta, ${email.split('@')[0]}!</p>
            ${newsletter ? '<p>You\'ll receive updates about our launch.</p>' : ''}
        </div>
    `;
    
    // Add styles
    successDiv.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: white;
        padding: 2rem;
        border-radius: 1rem;
        box-shadow: 0 20px 60px rgba(0,0,0,0.2);
        z-index: 1000;
        text-align: center;
        max-width: 400px;
        animation: slideIn 0.3s ease;
    `;
    
    // Add to page
    document.body.appendChild(successDiv);
    
    // Remove after 4 seconds
    setTimeout(() => {
        successDiv.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(successDiv);
        }, 300);
    }, 4000);
}

// Initialize typo effects
function initTypoEffects() {
    const typos = document.querySelectorAll('.typo');
    
    typos.forEach(typo => {
        typo.addEventListener('click', function() {
            // Add click animation
            this.style.transform = 'scale(1.1) rotate(2deg)';
            this.style.color = '#8b5cf6';
            
            // Reset after animation
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

// Add focus styles for accessibility
document.querySelectorAll('button, input, .typo').forEach(element => {
    element.addEventListener('focus', function() {
        this.style.outline = '2px solid #8b5cf6';
        this.style.outlineOffset = '2px';
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
