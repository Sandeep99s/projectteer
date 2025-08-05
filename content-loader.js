(function() {
    // This function will encode your HTML content
    function encodeHTML(html) {
        return btoa(unescape(encodeURIComponent(html)));
    }
    
    // Add cache-busting mechanism to your content-loader.js file:
    function addCacheBuster(url) {
        const cacheBuster = '?v=' + new Date().getTime();
        return url + cacheBuster;
    }
    
    // Configuration object for easy customization
    const siteConfig = {
        // Game links - change these URLs to point to whatever games you want
        gameLinks: {
            register: "https://teerwin09.com/#/register?invitationCode=78274115979",
            login: "https://teerwin09.com/#/register?invitationCode=78274115979",
            playNow: "https://teerwin09.com/#/register?invitationCode=78274115979",
            vipPrizes: "https://teerwin09.com/#/register?invitationCode=78274115979",
            livePrediction: "https://t.me/teerwinvips",
            telegram: "https://t.me/teerwinvips"
        },
        // Initialize gift code object
        giftCode: {
            code: "",
            validUids: []
        }
    };
    
    // Create a global variable to track loading status
    window.giftCodeLoaded = false;
    window.uidsLoaded = false;
    
    // Make siteConfig available globally
    window.siteConfig = siteConfig;
    
    // Load gift code using a simple approach with improved cache busting
    const giftCodeScript = document.createElement('script');
    // Add a timestamp AND a random number to completely prevent caching
    giftCodeScript.src = 'gift-code.js?v=' + new Date().getTime() + '&r=' + Math.random();
    giftCodeScript.onload = function() {
        console.log("Gift code script loaded successfully");
        window.giftCodeLoaded = true;
    };
    document.head.appendChild(giftCodeScript);
    
    // Load UIDs using a simple approach with cache busting
    const uidsScript = document.createElement('script');
    uidsScript.src = addCacheBuster('uid.js');
    uidsScript.onload = function() {
        console.log("UIDs script loaded successfully");
        window.uidsLoaded = true;
    };
    document.head.appendChild(uidsScript);
    
    // This is your original HTML content with SEO optimizations but hidden competitor names
    const originalContent = `
    // Add this to your style section
        <style>
            /* Remove underlines from all links */
            a {
                text-decoration: none;
            }
            
            /* Ensure buttons and navigation links have no underlines */
            .register-btn, .login-btn, .play-now, .register-now-btn, .prediction-btn, .social-icon {
                text-decoration: none;
            }
            
            /* Navigation links styling */
            .nav-links {
                display: flex;
                align-items: center;
                margin-right: auto;
                margin-left: 20px;
            }
            
            .nav-link {
                color: #fff;
                font-weight: 600;
                font-size: 16px;
                padding: 8px 15px;
                margin: 0 5px;
                border-radius: 4px;
                transition: all 0.3s ease;
            }
            
            .nav-link:hover {
                background: rgba(255, 215, 0, 0.2);
                color: #FFD700;
            }
            
            @media (max-width: 768px) {
                .nav-links {
                    margin-right: 0;
                    margin-left: 10px;
                }
                
                .nav-link {
                    padding: 6px 10px;
                    font-size: 14px;
                }
            }
            
            /* Footer links */
            .footer-section a {
                text-decoration: none;
            }
            
            /* Gift code styling - blurred but real */
            .gift-code-value {
                font-family: 'Courier New', monospace;
                font-size: 24px;
                letter-spacing: 2px;
                color: #FFD700;
                filter: blur(4px);
                transition: all 0.5s ease;
                text-shadow: 0 0 8px rgba(255, 215, 0, 0.7);
                user-select: none;
                padding: 10px;
                background: rgba(0,0,0,0.05);
                border-radius: 8px;
            }
            
            .gift-code-value.revealed {
                filter: blur(0);
                letter-spacing: 3px;
                text-shadow: 0 0 5px rgba(255, 215, 0, 0.5);
                background: rgba(255, 215, 0, 0.1);
            }
        </style>
    
    <header>
        <nav class="top-nav">
            <div class="logo">
                <img src="logo.png" alt="TeerWin Games - India's Premier Gaming Platform">
            </div>
            <!-- Blog link removed from navigation -->
            <div class="nav-buttons">
                <a href="${siteConfig.gameLinks.register}" class="register-btn">Register Now</a>
                <a href="${siteConfig.gameLinks.login}" class="login-btn">Log In Now</a>
                <a href="${siteConfig.gameLinks.telegram}" class="tg-link">
                    <img src="tglogo.png" alt="Teer Win Telegram - Join our community" class="tg-logo">
                </a>
            </div>
        </nav>

        <div class="hero">
            <div class="hero-content">
                <h1>Welcome To Teer Win:</h1>
                <h2>India's Premier Online<br>Gaming Destination</h2>
                <a href="${siteConfig.gameLinks.playNow}" class="play-now">Play Now</a>
            </div>
            <div class="hero-image">
                <img src="phones.png" alt="Teer Win Gaming App">
            </div>
        </div>
    </header>

    <section class="gift-code-section">
        <div class="gift-code-particles" id="particles-js"></div>
        <div class="gift-code-container">
            <h2 class="gift-code-title">Exclusive Bonus Gift Code</h2>
            <p class="gift-code-subtitle"><strong>Enter your User ID</strong> to reveal a special bonus code up to ₹500!</p>
            
            <div class="gift-code-display">
                <div class="gift-code-value" id="giftCodeValue">FA331D047C8FDF3E50C25378260885DA</div>
                <button class="gift-code-copy-btn" id="copyButton" style="display: none;">
                    <span class="copy-text">Copy Code</span>
                    <span class="copied-text">Copied!</span>
                </button>
            </div>
            
            <div class="gift-code-form">
                <input type="text" class="gift-code-input" id="uidInput" placeholder="Enter your User ID" autocomplete="off">
                <button class="gift-code-button" id="revealButton">Reveal Gift Code</button>
            </div>
            
            <div class="gift-code-message" id="giftCodeMessage"></div>
            
            <!-- Audio elements for feedback -->
            <audio id="correctSound" src="right.mp3" preload="auto"></audio>
            <audio id="wrongSound" src="wrong.mp3" preload="auto"></audio>
        </div>
    </section>

    <main>
        <section class="discover-section">
            <div class="logo-container">
                <img src="logo1.png" alt="Teer Win Logo">
            </div>
            <div class="content">
                <h2>Discover The Thrill - TeerWin Games</h2>
                <div class="underline"></div>
                <p>Welcome to Teer Win, your premier destination for exciting online gaming in India. Since 2013 we've been offering a trusted platform with real money games including Slots, Casino, and Sports Games. Our secure and reliable gaming experience has attracted over 510,000 players from across India. Join today and experience the thrill of winning big!</p>
                <a href="${siteConfig.gameLinks.register}" class="register-now-btn">Register Now</a>
            </div>
        </section>


        <section class="prediction-section">
            <h2>Teer Win VIP Live Prediction</h2>
            <div class="prediction-content">
                <p>Unlock the potential to earn more with our exclusive Teer Win VIP Live Prediction service. Available daily, our top-notch prediction tools and strategies are designed to help you make the most out of every game with higher success rates.</p>
                <a href="${siteConfig.gameLinks.vipPrizes}" class="prediction-btn">Check VIP Prizes</a>
                <a href="${siteConfig.gameLinks.livePrediction}" class="prediction-btn">Join Live Prediction</a>
            </div>
        </section>

        <section class="join-section">
            <div class="join-content">
                <h2>Become A Legend – Join Teer Win Today!</h2>
                <p>Ready to embark on your gaming adventure? Joining Teer Win is a breeze. If you're over 18 and in India, follow these simple steps to become part of our vibrant community:</p>
                <ul>
                    <li>Launch the Teer Win app or visit our website.</li>
                    <li>Tap the 'Register' button to get started.</li>
                    <li>Enter your mobile number with the prefix +91.</li>
                    <li>Create and confirm a strong password.</li>
                    <li>Input any referral code you have for extra rewards.</li>
                    <li>Agree to our privacy policy by checking the box.</li>
                    <li>Complete your registration and dive into the excitement!</li>
                </ul>
                <a href="${siteConfig.gameLinks.register}" class="register-now-btn">Register Now</a>
            </div>
            <div class="join-image">
                <img src="phones.png" alt="Teer Win App Preview">
            </div>
        </section>

        <section class="already-section">
            <div class="already-content">
                <h2>Teer Win Online Login And Play</h2>
                <div style="height: 1.5rem;"></div>
                <p>Already a member? Log in to access your Teer Win Online account and pick up where you left off. Enjoy real money games and big wins with just a click!</p>
                <a href="${siteConfig.gameLinks.login}" class="register-now-btn">Log In Now</a>
            </div>
            <div class="already-image">
                <img src="phone.png" alt="Teer Win App Preview">
            </div>
        </section>

        <section class="fund-section">
            <div class="fund-content">
                <div class="fund-description">
                    <div class="fund-description-image">
                        <img src="recharge.png" alt="Teer Win Recharge">
                    </div>
                    <div class="fund-description-content">
                        <h2>Fund Your Adventure <span class="fund-title-break">– Recharge And Withdraw With Ease</span></h2>
                        <div class="yellow-underline"></div>
                        <h3>Recharge Your Teer Win Account</h3>
                        <p>Fuel your gaming experience with our secure and convenient deposit methods. Recharging your account is quick and hassle-free:</p>
                        <ol>
                            <li><strong>Choose</strong> your preferred payment method.</li>
                            <li><strong>Enter</strong> the amount you wish to deposit.</li>
                            <li><strong>Confirm</strong> and get ready to play your favorite games.</li>
                        </ol>
                    </div>
                </div>
                
                <div class="withdraw-description">
                    <div class="withdraw-description-image">
                        <img src="withdraw.png" alt="Teer Win Withdrawals">
                    </div>
                    <div class="withdraw-description-content">
                        <h3>Withdraw Your Winnings</h3>
                        <p>Cashing out your hard-earned winnings is just as easy. Follow these steps to withdraw your money:</p>
                        <ol>
                            <li><strong>Go to 'Withdraw'</strong> and add your bank card.</li>
                            <li><strong>Fill in</strong> the required bank details.</li>
                            <li><strong>Submit</strong> your request and enjoy fast transactions.</li>
                        </ol>
                    </div>
                </div>
            </div>
        </section>

        <!-- Blog section removed from main page -->

        <section class="faq-section">
            <div class="faq-content">
                <h2>Teer Win Online FAQ Section</h2>
                <div class="yellow-underline"></div>
                
                <div class="faq-item">
                    <div class="faq-question">
                        <h3>What Makes Teer Win Special?</h3>
                        <span class="faq-toggle">+</span>
                    </div>
                    <div class="faq-answer">
                        <p>Teer Win offers better odds, faster withdrawals, and more secure transactions. Our platform has been trusted since 2013 with over 510,000 satisfied players across India.</p>
                    </div>
                </div>
                
                <div class="faq-item">
                    <div class="faq-question">
                        <h3>Where Can I Download The Teer Win Games App?</h3>
                        <span class="faq-toggle">+</span>
                    </div>
                    <div class="faq-answer">
                        <p>You can download the Teer Win app directly from our website. Visit the homepage and click on the "Download App" button for Android or iOS devices.</p>
                    </div>
                </div>
                
                <div class="faq-item">
                    <div class="faq-question">
                        <h3>Can I Play Teer Win Games Online?</h3>
                        <span class="faq-toggle">+</span>
                    </div>
                    <div class="faq-answer">
                        <p>Yes, you can play Teer Win games directly through our website without downloading the app. Our web platform is fully optimized for all devices. Simply visit our site, log in to your account, and enjoy all our games instantly.</p>
                    </div>
                </div>
                
                <div class="faq-item">
                    <div class="faq-question">
                        <h3>How Can I Contact Teer Win Customer Support?</h3>
                        <span class="faq-toggle">+</span>
                    </div>
                    <div class="faq-answer">
                        <p>Teer Win offers 24/7 customer support. Contact us through the in-app help section or email us at support@TeerWin.com for quick assistance with any questions.</p>
                    </div>
                </div>

                <a href="https://t.me/your_telegram_username" class="telegram-help-btn" title="Get Help on Telegram">
    <img src="tglogo.png" alt="Telegram Help">
</a>
                
                <div class="faq-item">
                    <div class="faq-question">
                        <h3>How Fast Are Withdrawals on Teer Win?</h3>
                        <span class="faq-toggle">+</span>
                    </div>
                    <div class="faq-answer">
                        <p>Teer Win processes withdrawals quickly and efficiently. Our withdrawals are typically processed within just a few hours, making us the preferred choice for serious players.</p>
                    </div>
                </div>
            </div>
        </section>
    </main>

    <footer>
        <div class="footer-bottom">
            <p>&copy; 2025 Teer Win Games. All rights reserved.</p>
        </div>
    </footer>
    `;
    
    // Encode the content
    const encodedContent = encodeHTML(originalContent);
    
    // Replace the placeholder with the encoded content
    document.getElementById('dynamic-content').innerHTML = decodeURIComponent(escape(atob(encodedContent)));
    
    // Add event listeners for interactive elements
    setTimeout(function() {
        // FAQ functionality
        const faqItems = document.querySelectorAll('.faq-item');
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            const answer = item.querySelector('.faq-answer');
            const toggle = item.querySelector('.faq-toggle');
            
            question.addEventListener('click', function() {
                // Close other open FAQs with smooth animation
                faqItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                        const otherAnswer = otherItem.querySelector('.faq-answer');
                        const otherToggle = otherItem.querySelector('.faq-toggle');
                        otherAnswer.style.maxHeight = otherAnswer.scrollHeight + 'px';
                        setTimeout(() => {
                            otherAnswer.style.maxHeight = '0';
                            otherToggle.style.transform = 'rotate(0deg)';
                        }, 10);
                    }
                });

                // Toggle current FAQ with enhanced animation
                item.classList.toggle('active');
                if (item.classList.contains('active')) {
                    answer.style.maxHeight = '0';
                    answer.style.display = 'block';
                    const height = answer.scrollHeight;
                    answer.style.maxHeight = height + 'px';
                    toggle.style.transform = 'rotate(135deg)';
                } else {
                    answer.style.maxHeight = answer.scrollHeight + 'px';
                    setTimeout(() => {
                        answer.style.maxHeight = '0';
                        toggle.style.transform = 'rotate(0deg)';
                    }, 10);
                }
            });
        });

        // Gift code functionality
        const giftCodeValue = document.getElementById('giftCodeValue');
        const uidInput = document.getElementById('uidInput');
        const revealButton = document.getElementById('revealButton');
        const giftCodeMessage = document.getElementById('giftCodeMessage');
        const copyButton = document.getElementById('copyButton');
        
        if (giftCodeValue && uidInput && revealButton && giftCodeMessage && copyButton) {
            // Set the gift code value as soon as it's loaded
            const checkGiftCode = setInterval(() => {
                if (window.siteConfig.giftCode.code) {
                    giftCodeValue.textContent = window.siteConfig.giftCode.code;
                    clearInterval(checkGiftCode);
                }
            }, 100);
            
            revealButton.addEventListener('click', function() {
                const uid = uidInput.value.trim();
                const correctSound = document.getElementById('correctSound');
                const wrongSound = document.getElementById('wrongSound');
                
                if (!uid) {
                    showMessage('Please enter your User ID', 'error');
                    return;
                }
                
                console.log("Checking UID:", uid);
                console.log("Valid UIDs:", window.siteConfig.giftCode.validUids);
                console.log("Current gift code:", window.siteConfig.giftCode.code);
                
                // Check if UID is valid - now using numeric comparison
                if (parseInt(uid) > 115979) {
                    // Play success sound
                    correctSound.play().catch(e => console.log("Audio playback error:", e));
                    
                    // Just remove the blur by adding the revealed class
                    giftCodeValue.classList.add('revealed');
                    showMessage('Gift code revealed! Use it after your deposit for a bonus up to ₹500.', 'success');
                    
                    // Show the copy button - make sure it's visible
                    copyButton.style.display = 'block';
                    copyButton.style.opacity = '1';
                    copyButton.style.visibility = 'visible';
                } else {
                    // Play error sound
                    wrongSound.play().catch(e => console.log("Audio playback error:", e));
                    
                    showMessage('User ID not found. Please register to get your exclusive gift code!', 'error');
                }
            });
            
            // Add copy button functionality
            copyButton.addEventListener('click', function() {
                // Get the gift code text
                const textToCopy = window.siteConfig.giftCode.code;
                
                // Use the modern Clipboard API with fallback for older browsers
                if (navigator.clipboard && navigator.clipboard.writeText) {
                    navigator.clipboard.writeText(textToCopy)
                        .then(() => {
                            // Success - show copied feedback
                            copyButton.classList.add('copied');
                            
                            // Reset after 2 seconds
                            setTimeout(() => {
                                copyButton.classList.remove('copied');
                            }, 2000);
                            
                            // Show a message that the code was copied
                            showMessage('Gift code copied to clipboard!', 'success');
                        })
                        .catch(err => {
                            // Fallback for secure contexts where clipboard permission is denied
                            fallbackCopyTextToClipboard(textToCopy);
                        });
                } else {
                    // Fallback for browsers that don't support clipboard API
                    fallbackCopyTextToClipboard(textToCopy);
                }
            });
            
            // Fallback copy function for mobile devices
            function fallbackCopyTextToClipboard(text) {
                // Create a temporary input element
                const textArea = document.createElement('textarea');
                textArea.value = text;
                
                // Make the textarea out of viewport
                textArea.style.position = 'fixed';
                textArea.style.left = '-999999px';
                textArea.style.top = '-999999px';
                document.body.appendChild(textArea);
                
                // Set and select the value
                textArea.focus();
                textArea.select();
                
                let successful = false;
                try {
                    // Execute the copy command
                    successful = document.execCommand('copy');
                } catch (err) {
                    console.error('Fallback: Oops, unable to copy', err);
                }
                
                // Remove the temporary element
                document.body.removeChild(textArea);
                
                if (successful) {
                    // Show copied feedback
                    copyButton.classList.add('copied');
                    
                    // Reset after 2 seconds
                    setTimeout(() => {
                        copyButton.classList.remove('copied');
                    }, 2000);
                    
                    // Show a message that the code was copied
                    showMessage('Gift code copied to clipboard!', 'success');
                } else {
                    // If all else fails, show a message with the code to manually copy
                    showMessage('Copy failed. Your gift code is: ' + text, 'error');
                }
            }
            
            function showMessage(text, type) {
                giftCodeMessage.textContent = text;
                giftCodeMessage.className = 'gift-code-message visible ' + type;
            }
        }
    }, 500); // Increased timeout to ensure scripts are loaded
})();