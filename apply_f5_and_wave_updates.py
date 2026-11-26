import os
import re

dir_path = r'C:\Users\rezin\.gemini\antigravity\scratch\deepsense'
index_path = os.path.join(dir_path, 'index.html')
style_path = os.path.join(dir_path, 'style.css')
storefront_path = os.path.join(dir_path, 'storefront.js')

# ==============================================================================
# 1. UPDATE index.html
# ==============================================================================
with open(index_path, 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Remove visible Owner Panel button from header navigation
header_owner_btn = """        <!-- Owner Portal Button -->
        <button class="btn btn-owner btn-sm" id="ownerPanelTrigger" onclick="openOwnerPortal()" title="Owner Administration Console">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
          </svg>
          <span id="ownerTriggerText">Owner Panel</span>
        </button>"""

html = html.replace(header_owner_btn, '')

# 2. In mobile drawer, make owner button discrete
mobile_owner_btn = """<button class="btn btn-owner w-full" id="mobileOwnerPanelTrigger" onclick="openOwnerPortal()">⚡ Owner Panel (rezinestudio@gmail.com)</button>"""
mobile_owner_discrete = """<button class="btn btn-secondary w-full" id="mobileOwnerPanelTrigger" onclick="openOwnerPortal()" style="border: 1px dashed rgba(255, 31, 56, 0.4); color: #ff475b;">Owner Console [F5]</button>"""
html = html.replace(mobile_owner_btn, mobile_owner_discrete)

# 3. In footer, replace owner panel link with discrete F5 trigger
footer_owner_link = """<li><a href="#" id="footerOwnerPanelTrigger" onclick="openOwnerPortal()" style="color: #ff3850; font-weight: 700; cursor: pointer;">⚡ Owner Panel</a></li>"""
footer_owner_discrete = """<li><a href="javascript:void(0)" id="footerOwnerPanelTrigger" onclick="openOwnerPortal()" style="color: #71717a; font-size: 12px; cursor: pointer;">Owner Access (Press F5)</a></li>"""
html = html.replace(footer_owner_link, footer_owner_discrete)

# 4. In Owner Login Modal, REMOVE visible email & password hints and prefilled value
old_login_form_fields = """          <div class="form-group">
            <label for="ownerLoginEmail">Owner Email Address *</label>
            <input type="email" id="ownerLoginEmail" required placeholder="rezinestudio@gmail.com" value="rezinestudio@gmail.com" autocomplete="email">
            <span class="input-hint">Authorized administrator email: <code>rezinestudio@gmail.com</code></span>
          </div>

          <div class="form-group">
            <div style="display: flex; justify-content: space-between; align-items: baseline;">
              <label for="ownerLoginPassword">Master Password *</label>
              <span id="togglePasswordVisibility" style="font-size: 11px; color: #ff3850; cursor: pointer; user-select: none;">Show Password</span>
            </div>
            <input type="password" id="ownerLoginPassword" required placeholder="Enter master password" autocomplete="current-password">
            <span class="input-hint">Default password: <code>DeepsenseOwner2025!</code></span>
          </div>"""

new_login_form_fields = """          <div class="form-group">
            <label for="ownerLoginEmail">Owner Email Address *</label>
            <input type="email" id="ownerLoginEmail" required placeholder="Enter administrator email" autocomplete="off">
          </div>

          <div class="form-group">
            <div style="display: flex; justify-content: space-between; align-items: baseline;">
              <label for="ownerLoginPassword">Master Password *</label>
              <span id="togglePasswordVisibility" style="font-size: 11px; color: #ff3850; cursor: pointer; user-select: none;">Show Password</span>
            </div>
            <input type="password" id="ownerLoginPassword" required placeholder="Enter master password" autocomplete="off">
          </div>"""

html = html.replace(old_login_form_fields, new_login_form_fields)

# 5. In Hero Character Stage, add wave ripples and hover wave title
old_stage = """            <!-- Right: Character Stage (Placed perfectly so header and character are both prominent) -->
            <div class="hero-showcase-column">
              <div class="hero-character-stage">
                <div class="hero-stage-backdrop">
                  <div class="hero-radar-ring outer"></div>
                  <div class="hero-radar-ring inner"></div>
                  <div class="hero-stage-glow"></div>
                </div>

                <div class="hero-floating-badge top">
                  <span class="status-indicator-dot online"></span>
                  <span>UNDETECTED SINCE 2025</span>
                </div>

                <img src="character_hero.png" alt="Deepsense Operative" class="hero-character-img">

                <div class="hero-floating-badge bottom">
                  <span style="color: #ff3850;">🛡️</span>
                  <span>RING-0 HYPERVISOR BYPASS</span>
                </div>
              </div>
            </div>"""

new_stage = """            <!-- Right: Character Stage with Waving Skin and Wave Ripples -->
            <div class="hero-showcase-column">
              <div class="hero-character-stage">
                <div class="hero-stage-backdrop">
                  <div class="character-wave-ripple"></div>
                  <div class="character-wave-ripple"></div>
                  <div class="hero-radar-ring outer"></div>
                  <div class="hero-radar-ring inner"></div>
                  <div class="hero-stage-glow"></div>
                </div>

                <div class="hero-floating-badge top">
                  <span class="status-indicator-dot online"></span>
                  <span>UNDETECTED SINCE 2025</span>
                </div>

                <img src="character_hero.png" alt="Deepsense Operative" class="hero-character-img" id="heroCharacterSkin" title="Hover or click to wave!">

                <div class="hero-floating-badge bottom">
                  <span style="color: #ff3850;">🛡️</span>
                  <span>RING-0 HYPERVISOR BYPASS</span>
                </div>
              </div>
            </div>"""

html = html.replace(old_stage, new_stage)

with open(index_path, 'w', encoding='utf-8') as f:
    f.write(html)

print('Updated index.html: credentials removed from login UI, F5 discrete triggers added, waving ripples added.')

# ==============================================================================
# 2. UPDATE style.css WITH WAVING ANIMATION & WAVE RIPPLES
# ==============================================================================
with open(style_path, 'r', encoding='utf-8') as f:
    css = f.read()

wave_css = """
/* ==========================================================================
   WAVING CHARACTER ANIMATION & EXPANDING WAVE RIPPLES
   ========================================================================== */
.hero-character-img {
  position: relative;
  z-index: 2;
  max-height: 480px;
  width: auto;
  object-fit: contain;
  filter: drop-shadow(0 15px 35px rgba(0, 0, 0, 0.95)) drop-shadow(0 0 35px rgba(255, 31, 56, 0.65));
  animation: characterWave 4.5s ease-in-out infinite !important;
  transform-origin: bottom center !important;
  user-select: none;
  cursor: pointer;
  transition: filter 0.3s ease;
}

.hero-character-img:hover {
  animation: characterWaveFast 1s ease-in-out infinite !important;
  filter: drop-shadow(0 15px 40px rgba(0, 0, 0, 0.98)) drop-shadow(0 0 50px rgba(255, 31, 56, 0.9)) !important;
}

@keyframes characterWave {
  0% {
    transform: rotate(0deg) translateY(0px) scale(1);
  }
  20% {
    transform: rotate(-5deg) translateY(-8px) scale(1.02);
  }
  40% {
    transform: rotate(6deg) translateY(-14px) scale(1.03);
  }
  60% {
    transform: rotate(-4deg) translateY(-10px) scale(1.02);
  }
  80% {
    transform: rotate(5deg) translateY(-6px) scale(1.01);
  }
  100% {
    transform: rotate(0deg) translateY(0px) scale(1);
  }
}

@keyframes characterWaveFast {
  0%, 100% {
    transform: rotate(0deg) translateY(0px) scale(1.04);
  }
  25% {
    transform: rotate(-8deg) translateY(-12px) scale(1.06);
  }
  50% {
    transform: rotate(8deg) translateY(-18px) scale(1.07);
  }
  75% {
    transform: rotate(-6deg) translateY(-12px) scale(1.05);
  }
}

/* Pulsing Wave Ripples */
.character-wave-ripple {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  border: 2px solid rgba(255, 31, 56, 0.6);
  animation: waveRipplePulse 3.5s cubic-bezier(0.2, 0.8, 0.2, 1) infinite;
  pointer-events: none;
  z-index: 1;
}

.character-wave-ripple:nth-child(2) {
  animation-delay: 1.75s;
}

@keyframes waveRipplePulse {
  0% {
    width: 60px;
    height: 60px;
    opacity: 0.95;
    border-color: #ff1f38;
    box-shadow: 0 0 15px #ff1f38;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    width: 480px;
    height: 480px;
    opacity: 0;
    border-color: rgba(255, 31, 56, 0);
    box-shadow: 0 0 45px rgba(255, 31, 56, 0);
  }
}
"""

with open(style_path, 'a', encoding='utf-8') as f:
    f.write(wave_css)

print('Updated style.css with character waving and wave ripples.')

# ==============================================================================
# 3. UPDATE storefront.js: F5 SHORTCUT & REQUIRE LOGIN EVERY TIME
# ==============================================================================
with open(storefront_path, 'r', encoding='utf-8') as f:
    js = f.read()

# Replace session persistence with in-memory auth that requires login every time!
js = js.replace(
    "function isOwnerAuthenticated() {\n    return localStorage.getItem('deepsense_owner_logged_in') === 'true';\n  }",
    "let isOwnerSessionActive = false;\n  function isOwnerAuthenticated() {\n    return isOwnerSessionActive;\n  }"
)

# In handleOwnerLogin, set isOwnerSessionActive = true and do NOT save to localStorage
js = js.replace(
    "localStorage.setItem('deepsense_owner_logged_in', 'true');",
    "isOwnerSessionActive = true;"
)

# In handleOwnerLogout, set isOwnerSessionActive = false
js = js.replace(
    "localStorage.removeItem('deepsense_owner_logged_in');",
    "isOwnerSessionActive = false;"
)

# When closing the dashboard modal, reset session so sign in is required every time!
js = js.replace(
    "function closeOwnerDashboard() {\n    if (ownerElements.panelModal) ownerElements.panelModal.classList.remove('open');\n  }",
    "function closeOwnerDashboard() {\n    isOwnerSessionActive = false;\n    if (ownerElements.panelModal) ownerElements.panelModal.classList.remove('open');\n  }"
)

# Open portal always clears email/pwd and prompts for sign in every time
portal_fresh_open = """  // Expose openOwnerPortal globally and bind F5 hotkey
  window.openOwnerPortal = function() {
    const loginModal = document.getElementById('ownerLoginModal');
    const loginError = document.getElementById('ownerLoginError');
    const loginEmail = document.getElementById('ownerLoginEmail');
    const loginPassword = document.getElementById('ownerLoginPassword');

    if (loginError) loginError.style.display = 'none';
    if (loginEmail) loginEmail.value = '';
    if (loginPassword) loginPassword.value = '';
    if (loginModal) {
      loginModal.classList.add('open');
      setTimeout(() => loginEmail && loginEmail.focus(), 120);
    }
  };

  // F5 Key Shortcut to open Owner Panel
  window.addEventListener('keydown', function(e) {
    if (e.key === 'F5' || e.code === 'F5' || e.keyCode === 116) {
      e.preventDefault();
      window.openOwnerPortal();
    }
  });
"""

# Replace window.openOwnerPortal definition
js = re.sub(r'// Expose openOwnerPortal globally immediately\s*window\.openOwnerPortal = function\(\) \{.*?\}\s*\};', portal_fresh_open, js, flags=re.DOTALL)

with open(storefront_path, 'w', encoding='utf-8') as f:
    f.write(js)

print('Updated storefront.js: F5 key shortcut added, session requires sign in every time, credentials not leaked.')
