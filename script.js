// Add event listeners to FAQ items
document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        item.addEventListener('click', function() {
            const answer = this.querySelector('.faq-answer');
            const toggle = this.querySelector('.faq-toggle');
            
            // Close all other open FAQs
            faqItems.forEach(otherItem => {
                if (otherItem !== this && otherItem.classList.contains('open')) {
                    otherItem.classList.remove('open');
                    otherItem.querySelector('.faq-toggle').textContent = '+';
                    otherItem.querySelector('.faq-answer').style.maxHeight = '0';
                }
            });
            
            if (this.classList.contains('open')) {
                this.classList.remove('open');
                toggle.textContent = '+';
                answer.style.maxHeight = '0';
            } else {
                this.classList.add('open');
                toggle.textContent = '-';
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    });
});

// Add particles.js library to the page
function loadParticlesJS() {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js';
    script.onload = function() {
        particlesJS('particles-js', {
            particles: {
                number: { value: 80, density: { enable: true, value_area: 800 } },
                color: { value: "#ffffff" },
                shape: { type: "circle" },
                opacity: { value: 0.5, random: true },
                size: { value: 3, random: true },
                line_linked: { enable: true, distance: 150, color: "#ffffff", opacity: 0.4, width: 1 },
                move: { enable: true, speed: 2, direction: "none", random: true, straight: false, out_mode: "out" }
            },
            interactivity: {
                detect_on: "canvas",
                events: { onhover: { enable: true, mode: "repulse" }, onclick: { enable: true, mode: "push" } },
                modes: { repulse: { distance: 100, duration: 0.4 }, push: { particles_nb: 4 } }
            }
        });
    };
    document.head.appendChild(script);
}

// Initialize gift code functionality
function initGiftCode() {
    const giftCodeValue = document.getElementById('giftCodeValue');
    const uidInput = document.getElementById('uidInput');
    const revealButton = document.getElementById('revealButton');
    const giftCodeMessage = document.getElementById('giftCodeMessage');
    const copyButton = document.getElementById('copyButton');
    
    if (!giftCodeValue || !uidInput || !revealButton || !giftCodeMessage) return;
    
    // Ensure siteConfig is available
    if (!window.siteConfig) {
        console.error("siteConfig not found, creating a new one");
        window.siteConfig = {
            giftCode: {
                code: "",
                validUids: []
            }
        };
        
        // Load the gift code and UIDs scripts
        const giftCodeScript = document.createElement('script');
        giftCodeScript.src = 'gift-code.js';
        document.head.appendChild(giftCodeScript);
        
        const uidsScript = document.createElement('script');
        uidsScript.src = 'uid.js';
        document.head.appendChild(uidsScript);
    }
    
    revealButton.addEventListener('click', function() {
        const uid = uidInput.value.trim();
        
        if (!uid) {
            showMessage('Please enter your User ID', 'error');
            return;
        }
        
        console.log("Checking UID:", uid);
        console.log("Valid UIDs:", window.siteConfig.giftCode.validUids);
        
        // Check if UID is valid
        if (window.siteConfig.giftCode.validUids.includes(uid)) {
            // Update the gift code text content
            giftCodeValue.textContent = window.siteConfig.giftCode.code;
            
            // Reveal the gift code with animation
            giftCodeValue.classList.add('revealed');
            showMessage('Gift code revealed! Use it during your next deposit for a ₹500 bonus.', 'success');
            
            // Show copy button if it exists
            if (copyButton) {
                copyButton.style.display = 'block';
            }
            
            // Add celebration animation
            celebrateReveal();
        } else {
            showMessage('User ID not found. Please register to get your exclusive gift code!', 'error');
            
            // Redirect to register after a delay
            setTimeout(() => {
                const registerBtn = document.querySelector('.register-btn');
                if (registerBtn) {
                    registerBtn.classList.add('highlight-btn');
                    registerBtn.scrollIntoView({ behavior: 'smooth' });
                }
            }, 2000);
        }
    });
    
    // Rest of the function remains the same
    function showMessage(text, type) {
        giftCodeMessage.textContent = text;
        giftCodeMessage.className = 'gift-code-message visible ' + type;
    }
    
    function celebrateReveal() {
        // Add confetti or other celebration effects
        const confettiColors = ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#8675A9'];
        
        // Simple confetti effect
        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.backgroundColor = confettiColors[Math.floor(Math.random() * confettiColors.length)];
            confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
            document.querySelector('.gift-code-section').appendChild(confetti);
            
            // Remove confetti after animation
            setTimeout(() => {
                confetti.remove();
            }, 5000);
        }
    }
}

// Load particles and initialize gift code functionality with a longer delay
loadParticlesJS();
setTimeout(initGiftCode, 1500); // Increased delay to ensure files are loaded

// Add this CSS for confetti animation
document.head.insertAdjacentHTML('beforeend', `
<style>
.confetti {
    position: absolute;
    width: 10px;
    height: 10px;
    opacity: 0;
    transform: translateY(0) rotate(0);
    pointer-events: none;
    animation: confetti-fall 3s ease-in-out forwards;
    z-index: 3;
}

@keyframes confetti-fall {
    0% {
        opacity: 1;
        transform: translateY(-50px) rotate(0);
    }
    100% {
        opacity: 0;
        transform: translateY(100vh) rotate(720deg);
    }
}

.highlight-btn {
    animation: highlight-pulse 1s infinite;
}

@keyframes highlight-pulse {
    0%, 100% {
        transform: scale(1);
        box-shadow: 0 0 0 rgba(255, 215, 0, 0.7);
    }
    50% {
        transform: scale(1.05);
        box-shadow: 0 0 20px rgba(255, 215, 0, 0.7);
    }
}
</style>
`);

// Use window.siteConfig instead of siteConfig directly
console.log("Current gift code:", window.siteConfig ? window.siteConfig.giftCode.code : "Not loaded yet");
console.log("Valid UIDs:", window.siteConfig ? window.siteConfig.giftCode.validUids : "Not loaded yet");

// Additional protection and SEO enhancement for Jai Win website
(function() {
    // Detect DevTools
    const devtools = {
        isOpen: false,
        orientation: undefined
    };
    
    const threshold = 160;
    
    const emitEvent = (isOpen, orientation) => {
        window.dispatchEvent(new CustomEvent('devtoolschange', {
            detail: {
                isOpen,
                orientation
            }
        }));
    };
    
    setInterval(() => {
        const widthThreshold = window.outerWidth - window.innerWidth > threshold;
        const heightThreshold = window.outerHeight - window.innerHeight > threshold;
        const orientation = widthThreshold ? 'vertical' : 'horizontal';
        
        if (
            !(heightThreshold && widthThreshold) &&
            ((window.Firebug && window.Firebug.chrome && window.Firebug.chrome.isInitialized) || widthThreshold || heightThreshold)
        ) {
            if (!devtools.isOpen || devtools.orientation !== orientation) {
                emitEvent(true, orientation);
            }
            
            devtools.isOpen = true;
            devtools.orientation = orientation;
        } else {
            if (devtools.isOpen) {
                emitEvent(false, undefined);
            }
            
            devtools.isOpen = false;
            devtools.orientation = undefined;
        }
    }, 500);
    
    window.addEventListener('devtoolschange', function(e) {
        if (e.detail.isOpen) {
            // Redirect or show a blank page when DevTools is opened
            document.body.innerHTML = '';
            document.head.innerHTML = '';
            window.location.href = 'about:blank';
        }
    });
    
    // SEO enhancement - add structured data dynamically
    function addStructuredData() {
        const script = document.createElement('script');
        script.type = 'application/ld+json';
        script.text = JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "url": "https://jaiwin.com/",
            "name": "Jai Win Games - Better than Daman Games & 91 Club",
            "description": "India's premier online gaming destination offering better alternatives to Daman Games, 91 Club, Tiranga Games, and BDG WIN.",
            "potentialAction": {
                "@type": "SearchAction",
                "target": "https://jaiwin.com/search?q={search_term_string}",
                "query-input": "required name=search_term_string"
            }
        });
        document.head.appendChild(script);
        
        // Add comparison structured data
        const comparisonScript = document.createElement('script');
        comparisonScript.type = 'application/ld+json';
        comparisonScript.text = JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "mainEntity": {
                "@type": "ItemList",
                "itemListElement": [
                    {
                        "@type": "ListItem",
                        "position": 1,
                        "name": "Jai Win vs Daman Games Comparison",
                        "description": "Jai Win offers better odds, faster withdrawals, and more secure gaming than Daman Games."
                    },
                    {
                        "@type": "ListItem",
                        "position": 2,
                        "name": "Jai Win vs 91 Club Comparison",
                        "description": "Jai Win provides a more reliable platform with higher payouts than 91 Club."
                    },
                    {
                        "@type": "ListItem",
                        "position": 3,
                        "name": "Jai Win vs Tiranga Games Comparison",
                        "description": "Jai Win features better security and more game options than Tiranga Games."
                    },
                    {
                        "@type": "ListItem",
                        "position": 4,
                        "name": "Jai Win vs BDG WIN Comparison",
                        "description": "Jai Win delivers a superior user experience and faster transactions than BDG WIN."
                    }
                ]
            }
        });
        document.head.appendChild(comparisonScript);
    }
    
    // Add meta tags dynamically for better SEO
    function addMetaTags() {
        const keywords = [
            "Jai Win", "Daman Games", "Daman Lottery", "BDG WIN", 
            "Big Daddy Game", "Goa Game", "Goa Games", "91 club", 
            "91club", "Tiranga", "Tiranga Lottery", "Tiranga Games", 
            "Tiranga Game", "66 Lottery", "TC Lottery"
        ];
        
        // Add meta keywords
        const metaKeywords = document.createElement('meta');
        metaKeywords.name = 'keywords';
        metaKeywords.content = keywords.join(', ') + ', online gaming India';
        document.head.appendChild(metaKeywords);
        
        // Add meta description
        const metaDesc = document.createElement('meta');
        metaDesc.name = 'description';
        metaDesc.content = 'Experience Jai Win - India\'s top online gaming platform. Better than Daman Games, 91 Club, Tiranga Games, and BDG WIN. Play slots, casino games & sports betting.';
        document.head.appendChild(metaDesc);
    }
    
    // Add canonical link
    function addCanonicalLink() {
        const link = document.createElement('link');
        link.rel = 'canonical';
        link.href = 'https://jaiwin.com/';
        document.head.appendChild(link);
    }
    
    // Initialize all SEO enhancements
    function initSEO() {
        addStructuredData();
        addMetaTags();
        addCanonicalLink();
    }
    
    // Initialize when DOM is fully loaded
    document.addEventListener('DOMContentLoaded', function() {
        initSEO();
        
        // Handle FAQ toggles
        const faqItems = document.querySelectorAll('.faq-item');
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            const answer = item.querySelector('.faq-answer');
            
            if (question && answer) {
                question.addEventListener('click', function() {
                    answer.style.display = answer.style.display === 'block' ? 'none' : 'block';
                    const toggle = this.querySelector('.faq-toggle');
                    if (toggle) {
                        toggle.textContent = toggle.textContent === '+' ? '-' : '+';
                    }
                });
            }
        });
        
        // Add alt text to images that might be missing it
        const images = document.querySelectorAll('img:not([alt])');
        images.forEach(img => {
            img.alt = 'Jai Win - Better than Daman Games, 91 Club, and Tiranga Games';
        });
        
        // Add title attributes to links for better SEO
        const links = document.querySelectorAll('a:not([title])');
        links.forEach(link => {
            link.title = 'Jai Win - India\'s Premier Gaming Platform';
        });
    });
})();