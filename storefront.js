/**
 * DEEPSENSE - CLIENT STOREFRONT APPLICATION
 * Store ID: 207573
 * SellAuth API Integration & Interactive UI Engine
 */

(function () {
  'use strict';

  // Application State
  const state = {
    products: [],
    selectedCategory: 'ALL',
    searchQuery: '',
    cart: JSON.parse(localStorage.getItem('deepsense_cart') || '[]'),
    appliedCoupon: null,
    discountRate: 0,
    servicesStatus: []
  };

  // Catalog holds exclusively SellAuth shop products
  const DEFAULT_CATALOG = [
  {
    "id": 101,
    "name": "Deepsense Fortnite Private",
    "category": "Fortnite",
    "image": "assets/fortnite.svg",
    "status": "Undetected",
    "status_color": "#10b981",
    "bestseller": true,
    "featured": true,
    "description": "Undetected Kernel-level Fortnite build engineered with memory-isolated ring-0 hypervisor. Features vector aimbot, visibility check, prediction, full 3D Box ESP, skeleton lines, loot tier filtering, streamproof overlays for OBS/Discord, and built-in spoofer.",
    "features": [
      "Vector & Memory Aimbot with FOV Circle",
      "Dynamic Smoothness & Humanized Recoil",
      "Streamproof 3D Box ESP & Player Bones",
      "Loot & Chest Tier Filter (Mythic, Legendary)",
      "Built-in Hardware ID Protection"
    ],
    "variants": [
      {
        "id": "fn_day",
        "name": "1 Day License",
        "price": 7.99
      },
      {
        "id": "fn_week",
        "name": "7 Days License",
        "price": 24.99,
        "popular": true
      },
      {
        "id": "fn_month",
        "name": "30 Days License",
        "price": 54.99
      },
      {
        "id": "fn_life",
        "name": "Lifetime Access",
        "price": 149.99
      }
    ]
  },
  {
    "id": 102,
    "name": "Deepsense CS2 Kernel",
    "category": "CS2",
    "image": "assets/cs2.svg",
    "status": "Undetected",
    "status_color": "#10b981",
    "bestseller": true,
    "featured": true,
    "description": "Ultra-low latency Counter-Strike 2 kernel private build with VAC & Valve Anti-Cheat kernel hypervisor bypass. Instant target acquisition, RCS recoil compensation system, radar hack, bone snap lines, and sound ESP.",
    "features": [
      "Kernel-Level Memory Read (Ring-0)",
      "Silent Aim & Weapon Recoil Control (RCS)",
      "Streamproof Glow & 2D/3D Bounding Boxes",
      "Web-Based Radar & Bomb Timer Telemetry",
      "FaceIT & Premier Match Safe Mode"
    ],
    "variants": [
      {
        "id": "cs2_day",
        "name": "1 Day License",
        "price": 6.99
      },
      {
        "id": "cs2_week",
        "name": "7 Days License",
        "price": 19.99,
        "popular": true
      },
      {
        "id": "cs2_month",
        "name": "30 Days License",
        "price": 44.99
      },
      {
        "id": "cs2_life",
        "name": "Lifetime Access",
        "price": 129.99
      }
    ]
  },
  {
    "id": 103,
    "name": "Deepsense Rust DMA & Hypervisor",
    "category": "Rust",
    "image": "assets/rust.svg",
    "status": "Undetected",
    "status_color": "#10b981",
    "bestseller": true,
    "featured": true,
    "description": "The golden standard for Rust survival dominance. Supports standalone kernel execution as well as 2-PC DMA hardware setups. Full radar, player sleep check, raid alert esp, ore/stash esp, and silent melee.",
    "features": [
      "Direct Memory Access (DMA) & 1-PC Kernel Mode",
      "Silent Aim, Prediction & Auto-Hit Sweetspot",
      "Comprehensive Ore, Stash, Toolcupboard ESP",
      "Raid Alert Notification & Explosive Tracker",
      "Instant Bullet Speed & Fast Bow/Crossbow"
    ],
    "variants": [
      {
        "id": "rust_day",
        "name": "1 Day License",
        "price": 9.99
      },
      {
        "id": "rust_week",
        "name": "7 Days License",
        "price": 29.99,
        "popular": true
      },
      {
        "id": "rust_month",
        "name": "30 Days License",
        "price": 69.99
      },
      {
        "id": "rust_life",
        "name": "Lifetime Access",
        "price": 189.99
      }
    ]
  },
  {
    "id": 104,
    "name": "Deepsense Valorant Color & Arduino",
    "category": "Valorant",
    "image": "assets/valorant.svg",
    "status": "Undetected",
    "status_color": "#10b981",
    "bestseller": false,
    "featured": true,
    "description": "External optical recognition & hardware Arduino Leonardo/Host shield integration bypassing Vanguard without memory touching. Pixel-perfect triggerbot, recoil compensation, and streamproof overlay.",
    "features": [
      "Zero Memory Hooking / Hardware USB Emulation",
      "Microsecond Triggerbot with Magnet Aim",
      "Customizable Recoil Smoothing Curves",
      "Flickbot & Headshot Target Locking",
      "Safe for Radiant/Immortal Ranked Play"
    ],
    "variants": [
      {
        "id": "val_day",
        "name": "1 Day License",
        "price": 8.99
      },
      {
        "id": "val_week",
        "name": "7 Days License",
        "price": 26.99,
        "popular": true
      },
      {
        "id": "val_month",
        "name": "30 Days License",
        "price": 59.99
      },
      {
        "id": "val_life",
        "name": "Lifetime Access",
        "price": 159.99
      }
    ]
  },
  {
    "id": 105,
    "name": "Deepsense Apex Legends Predator",
    "category": "Apex Legends",
    "image": "assets/apex.svg",
    "status": "Undetected",
    "status_color": "#10b981",
    "bestseller": false,
    "featured": true,
    "description": "Predator-tier private software for Apex Legends. Includes automated movement tech (Superglide, Tap-strafe, Bunnyhop), full glow ESP, weapon recoil elimination, and projectile velocity lead prediction.",
    "features": [
      "Automated 100% Consistent Superglide & Tap-Strafe",
      "Item & Deathbox Rarity Glow ESP",
      "Bone Aimbot with Dynamic FOV Scaling",
      "Third-Party Awareness Radar Warning",
      "Controller & Keyboard/Mouse Support"
    ],
    "variants": [
      {
        "id": "apex_day",
        "name": "1 Day License",
        "price": 7.99
      },
      {
        "id": "apex_week",
        "name": "7 Days License",
        "price": 22.99,
        "popular": true
      },
      {
        "id": "apex_month",
        "name": "30 Days License",
        "price": 49.99
      },
      {
        "id": "apex_life",
        "name": "Lifetime Access",
        "price": 139.99
      }
    ]
  },
  {
    "id": 106,
    "name": "Deepsense Warzone & MW3 Private",
    "category": "Call of Duty",
    "image": "assets/warzone.svg",
    "status": "Undetected",
    "status_color": "#10b981",
    "bestseller": false,
    "featured": true,
    "description": "Undetected Ricochet kernel bypass for Warzone & Modern Warfare 3. Memory-safe bone aimbot, skeleton ESP, armor plate indicator, and loot distance visualizer.",
    "features": [
      "Custom Kernel Driver Overcoming Ricochet",
      "Silent Aim & FOV Circle Indicator",
      "Player Skeleton, Direction Line & Health Bar",
      "Streamproof OBS / Discord Capture Protection",
      "Built-in Hardware ID Cleaner"
    ],
    "variants": [
      {
        "id": "cod_day",
        "name": "1 Day License",
        "price": 7.99
      },
      {
        "id": "cod_week",
        "name": "7 Days License",
        "price": 24.99,
        "popular": true
      },
      {
        "id": "cod_month",
        "name": "30 Days License",
        "price": 54.99
      },
      {
        "id": "cod_life",
        "name": "Lifetime Access",
        "price": 149.99
      }
    ]
  },
  {
    "id": 107,
    "name": "Deepsense HWID Spoofer (Perm + Temp)",
    "category": "Spoofers",
    "image": "assets/spoofer.svg",
    "status": "Undetected",
    "status_color": "#10b981",
    "bestseller": true,
    "featured": true,
    "description": "Industry-leading hardware identifier spoofing suite. Rewrites motherboard UUID, SMBIOS serials, NIC MAC addresses, disk drive serials, and GPU IDs without requiring Windows reinstall or BIOS flashing.",
    "features": [
      "One-Click Permanent & Temporary Modes",
      "Spoofs Disk Serials, Motherboard, NIC, ARP, SMBIOS",
      "Cleans EAC, BattlEye, Vanguard & Ricochet Traces",
      "Zero Windows Reinstall or USB Formatting Needed",
      "Automatic Registry & Shadow Log Purge"
    ],
    "variants": [
      {
        "id": "spoofer_day",
        "name": "1 Day Trial",
        "price": 5.99
      },
      {
        "id": "spoofer_week",
        "name": "7 Days Pass",
        "price": 17.99,
        "popular": true
      },
      {
        "id": "spoofer_month",
        "name": "30 Days Pass",
        "price": 39.99
      },
      {
        "id": "spoofer_life",
        "name": "Lifetime License",
        "price": 89.99
      }
    ]
  },
  {
    "id": 108,
    "name": "Deepsense DMA Custom 1:1 Firmware",
    "category": "Rust",
    "image": "assets/dma.svg",
    "status": "Undetected",
    "status_color": "#10b981",
    "bestseller": false,
    "featured": false,
    "description": "Custom engineered 1:1 hardware donor PCIe configuration space firmware for CaptainDMA, Lambda, Enigma, and LeetDMA cards (35T / 75T chipsets). 100% invisible to all commercial anti-cheat scans.",
    "features": [
      "Unique 1:1 Real Hardware Device Tree Cloned",
      "Compatible with 35T & 75T Artix-7 FPGA Boards",
      "Custom Subsystem IDs, Power Management & DSN",
      "Zero Shared Signatures Across Customers",
      "Instant Delivery with Flashing Utility Included"
    ],
    "variants": [
      {
        "id": "dma_firmware",
        "name": "1:1 Custom Device Firmware",
        "price": 79.99,
        "popular": true
      },
      {
        "id": "dma_bundle",
        "name": "Firmware + Flash Utility + Config",
        "price": 99.99
      }
    ]
  }
];

  // DOM Elements
  const elements = {
    tabs: document.querySelectorAll('.nav-tab, .mobile-nav-tab'),
    panes: document.querySelectorAll('.tab-pane'),
    triggers: document.querySelectorAll('.nav-trigger'),
    scrollIndicator: document.getElementById('scrollDownIndicator'),
    bestSellersAnchor: document.getElementById('bestSellersAnchor'),
    featuredGrid: document.getElementById('featuredProductGrid'),
    fullGrid: document.getElementById('fullProductGrid'),
    categoryFilters: document.getElementById('categoryFilters'),
    searchInput: document.getElementById('productSearchInput'),
    cartTrigger: document.getElementById('cartTrigger'),
    cartDrawer: document.getElementById('cartDrawer'),
    cartOverlay: document.getElementById('cartOverlay'),
    cartCloseBtn: document.getElementById('cartCloseBtn'),
    cartBadge: document.getElementById('cartBadge'),
    cartItemsList: document.getElementById('cartItemsList'),
    cartSubtotal: document.getElementById('cartSubtotal'),
    cartDiscount: document.getElementById('cartDiscount'),
    discountLine: document.getElementById('discountLine'),
    cartTotal: document.getElementById('cartTotal'),
    couponInput: document.getElementById('couponInput'),
    applyCouponBtn: document.getElementById('applyCouponBtn'),
    couponMessage: document.getElementById('couponMessage'),
    cartCheckoutBtn: document.getElementById('cartCheckoutBtn'),
    customerPanelTrigger: document.getElementById('customerPanelTrigger'),
    mobileCustomerPanelTrigger: document.getElementById('mobileCustomerPanelTrigger'),
    footerCustomerPanelTrigger: document.getElementById('footerCustomerPanelTrigger'),
    customerModal: document.getElementById('customerModal'),
    customerModalClose: document.getElementById('customerModalClose'),
    invoiceLookupForm: document.getElementById('invoiceLookupForm'),
    invoiceSearchQuery: document.getElementById('invoiceSearchQuery'),
    invoiceLookupBtn: document.getElementById('invoiceLookupBtn'),
    invoiceResultsContainer: document.getElementById('invoiceResultsContainer'),
    resellerForm: document.getElementById('resellerForm'),
    resellSuccessMessage: document.getElementById('resellSuccessMessage'),
    resellAppId: document.getElementById('resellAppId'),
    resellSubmitBtn: document.getElementById('resellSubmitBtn'),
    mobileMenuToggle: document.getElementById('mobileMenuToggle'),
    mobileDrawer: document.getElementById('mobileDrawer'),
    statusProductsGrid: document.getElementById('statusProductsGrid'),
    statusServicesGrid: document.getElementById('statusServicesGrid'),
    statusTimestamp: document.getElementById('statusTimestamp'),
    refreshStatusBtn: document.getElementById('refreshStatusBtn'),
    productModal: document.getElementById('productModal'),
    productModalClose: document.getElementById('productModalClose'),
    modalProductCategory: document.getElementById('modalProductCategory'),
    modalProductTitle: document.getElementById('modalProductTitle'),
    modalProductBody: document.getElementById('modalProductBody'),
    checkoutModal: document.getElementById('checkoutModal'),
    checkoutModalClose: document.getElementById('checkoutModalClose'),
    checkoutModalBody: document.getElementById('checkoutModalBody')
  };

  // Track selected variant per product card: productId -> variantId
  const selectedVariants = {};

  // Initialize
  function init() {
    setupOwnerEngine();
    setupNavigation();
    setupCart();
    setupModals();
    setupResellerForm();
    loadProducts();
    updateCartUI();
  }

  // 1. Navigation & Tab Switching
  function setupNavigation() {
    function switchTab(targetId) {
      elements.panes.forEach(pane => {
        pane.classList.remove('active');
        if (pane.id === `pane-${targetId}`) {
          pane.classList.add('active');
        }
      });

      elements.tabs.forEach(tab => {
        if (tab.dataset.target === targetId) {
          tab.classList.add('active');
        } else {
          tab.classList.remove('active');
        }
      });

      window.scrollTo({ top: 0, behavior: 'smooth' });
      if (elements.mobileDrawer && elements.mobileDrawer.classList.contains('open')) {
        elements.mobileDrawer.classList.remove('open');
      }
    }

    elements.tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const target = tab.dataset.target;
        if (target) switchTab(target);
      });
    });

    elements.triggers.forEach(trigger => {
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        const target = trigger.dataset.target;
        if (target) switchTab(target);
      });
    });

    // Mobile menu toggle
    if (elements.mobileMenuToggle) {
      elements.mobileMenuToggle.addEventListener('click', () => {
        elements.mobileDrawer.classList.toggle('open');
      });
    }

    // Animated Mouse Scroll down indicator
    if (elements.scrollIndicator && elements.bestSellersAnchor) {
      elements.scrollIndicator.addEventListener('click', () => {
        elements.bestSellersAnchor.scrollIntoView({ behavior: 'smooth' });
      });
    }

    // Category filter clicks
    if (elements.categoryFilters) {
      elements.categoryFilters.addEventListener('click', (e) => {
        const chip = e.target.closest('.filter-chip');
        if (!chip) return;
        document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        state.selectedCategory = chip.dataset.category;
        renderCatalog();
      });
    }

    // Search input
    if (elements.searchInput) {
      elements.searchInput.addEventListener('input', (e) => {
        state.searchQuery = e.target.value.toLowerCase().trim();
        renderCatalog();
      });
    }
  }

    // 2. Synchronous Instant Products Loader (Zero Network Blocking)
  function loadProducts() {
    const storedCustom = getStoredCustomProducts();
    if (storedCustom && Array.isArray(storedCustom) && storedCustom.length > 0) {
      state.products = storedCustom;
    } else {
      state.products = JSON.parse(JSON.stringify(DEFAULT_CATALOG));
      saveStoredProducts(state.products);
    }

    // Normalize all products: resolve category names and image URLs
    state.products = state.products.map(p => {
      let catName = 'Game Software';
      if (p.category) {
        if (typeof p.category === 'object' && p.category.name) catName = p.category.name;
        else if (typeof p.category === 'string') catName = p.category;
      }

      let imgUrl = p.image || 'assets/fortnite.svg';
      return {
        ...p,
        category: catName,
        image: imgUrl,
        description: p.description || p.desc || '',
        desc: p.description || p.desc || ''
      };
    });

    // Set default selected variant for each product
    state.products.forEach(p => {
      if (p.variants && p.variants.length > 0) {
        const pop = p.variants.find(v => v.popular) || p.variants[0];
        selectedVariants[p.id] = pop.id;
      }
    });

    renderCategoryFilters();
    renderFeatured();
    renderCatalog();
  }

  // Render Dynamic Category Filters from SellAuth Products
  function renderCategoryFilters() {
    if (!elements.categoryFilters) return;
    const cats = ['ALL', ...new Set(state.products.map(p => p.category).filter(Boolean))];
    elements.categoryFilters.innerHTML = cats.map(cat => `
      <button class="filter-chip ${state.selectedCategory === cat ? 'active' : ''}" data-category="${cat}">
        ${cat === 'ALL' ? 'All Titles' : cat}
      </button>
    `).join('');
  }

  // Helper to get image for product
  function getProductImage(p) {
    if (p.images && p.images.length > 0 && p.images[0].url) return p.images[0].url;
    if (p.image) return p.image;
    const lowerName = (p.name || '').toLowerCase();
    if (lowerName.includes('rust')) return '/assets/1058939.webp';
    if (lowerName.includes('fortnite')) return '/assets/1152335.webp';
    if (lowerName.includes('valorant')) return '/assets/1000627.webp';
    if (lowerName.includes('apex')) return '/assets/1058898.webp';
    if (lowerName.includes('cod') || lowerName.includes('warzone')) return '/assets/1150492.webp';
    if (lowerName.includes('spoofer')) return '/assets/1152351.webp';
    return '/assets/1058939.webp';
  }

  // Render Product Card HTML - Matches Uploaded Reference Exactly
  function createProductCardHTML(p) {
    const minPrice = (p.variants && p.variants.length > 0)
      ? Math.min(...p.variants.map(v => typeof v.price === 'number' ? v.price : parseFloat(v.price || 0)))
      : (parseFloat(p.price || 8.60));
    
    const img = getProductImage(p);
    const statusText = p.status_text || p.status || 'Undetected';
    const statusColor = p.status_color || '#10b981';

    return `
      <div class="product-card" data-product-id="${p.id}">
        <!-- 3D Box Banner Container with Radial Glow and Undetected Badge -->
        <div class="product-banner-wrapper" data-product-id="${p.id}">
          <img src="${img}" alt="${p.name}" class="product-banner-img" onerror="this.onerror=null; this.src='/assets/1058939.webp';">
          <div class="product-undetected-badge" style="border-color: ${statusColor}70; color: ${statusColor}; background: rgba(0, 0, 0, 0.78);">
            <span class="undetected-dot" style="background: ${statusColor}; box-shadow: 0 0 6px ${statusColor};"></span>
            <span>${statusText}</span>
          </div>
        </div>

        <!-- Product Title & Category Tag -->
        <div class="product-meta-row">
          <h3 class="product-title-text" data-product-id="${p.id}">${p.name}</h3>
          <span class="product-category-chip">${p.category}</span>
        </div>

        <!-- Bottom Action Row: Buy Now button on left, Starting at price on right -->
        <div class="product-card-bottom-row">
          <button class="buy-now-btn" data-product-id="${p.id}">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            <span>Buy Now</span>
          </button>

          <div class="product-price-stack">
            <span class="starting-at-label">Starting at</span>
            <div class="price-value-highlight">
              <span class="price-currency-sign">$</span>${minPrice.toFixed(2)}
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // Render Featured Best Sellers
  function renderFeatured() {
    if (!elements.featuredGrid) return;
    const featuredList = state.products.filter(p => p.bestseller || p.featured);
    const listToRender = (featuredList.length > 0) ? featuredList : state.products;
    if (listToRender.length === 0) {
      elements.featuredGrid.innerHTML = `
        <div class="empty-state" style="grid-column: 1 / -1; text-align: center; padding: 36px 20px;">
          <p style="color: var(--text-secondary); font-size: 14px;">No products currently active in shop.</p>
        </div>
      `;
      return;
    }
    elements.featuredGrid.innerHTML = listToRender.map(createProductCardHTML).join('');
    bindProductCardEvents(elements.featuredGrid);
  }

  // Render Full Catalog with Filtering
  function renderCatalog() {
    if (!elements.fullGrid) return;

    let filtered = state.products;

    if (state.selectedCategory !== 'ALL') {
      filtered = filtered.filter(p => p.category.toLowerCase() === state.selectedCategory.toLowerCase());
    }

    if (state.searchQuery) {
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(state.searchQuery) ||
        (p.desc || p.description || '').toLowerCase().includes(state.searchQuery) ||
        p.category.toLowerCase().includes(state.searchQuery) ||
        (p.features && p.features.some(f => f.toLowerCase().includes(state.searchQuery)))
      );
    }

    if (filtered.length === 0) {
      elements.fullGrid.innerHTML = `
        <div class="empty-state" style="grid-column: 1 / -1;">
          <p>No software builds matching "${state.searchQuery || state.selectedCategory}".</p>
          <button class="btn btn-secondary btn-sm" id="resetCatalogFilters">Reset Filters</button>
        </div>
      `;
      const resetBtn = document.getElementById('resetCatalogFilters');
      if (resetBtn) {
        resetBtn.addEventListener('click', () => {
          state.selectedCategory = 'ALL';
          state.searchQuery = '';
          if (elements.searchInput) elements.searchInput.value = '';
          document.querySelectorAll('.filter-chip').forEach(c => c.classList.remove('active'));
          const allChip = document.querySelector('.filter-chip[data-category="ALL"]');
          if (allChip) allChip.classList.add('active');
          renderCatalog();
        });
      }
      return;
    }

    elements.fullGrid.innerHTML = filtered.map(createProductCardHTML).join('');
    bindProductCardEvents(elements.fullGrid);
  }

  // Bind Clicks to Open Purchase Modal
  function bindProductCardEvents(container) {
    container.querySelectorAll('.buy-now-btn, .product-banner-wrapper, .product-title-text').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const card = btn.closest('.product-card');
        const prodId = parseInt(card.dataset.productId, 10);
        openProductModal(prodId);
      });
    });
  }

  // 3. Product Details & Purchase View (visuals.gg layout)
  function openProductModal(prodId) {
    const prod = state.products.find(p => p.id === prodId);
    if (!prod) return;

    const img = getProductImage(prod);
    const statusText = prod.status_text || prod.status || 'Undetected';
    const statusColor = prod.status_color || '#10b981';

    const currentVarId = selectedVariants[prodId] || (prod.variants && prod.variants[0] ? prod.variants[0].id : 'default');
    let currentVar = (prod.variants && prod.variants.length > 0)
      ? (prod.variants.find(v => v.id === currentVarId) || prod.variants[0])
      : { id: 'default', name: 'Standard Access', price: parseFloat(prod.price || 6.00) };

    const variantsList = (prod.variants && prod.variants.length > 0)
      ? prod.variants
      : [{ id: 'default', name: 'Standard Access', price: parseFloat(prod.price || 6.00) }];

    const variantsHTML = variantsList.map(v => {
      const isSelected = v.id === currentVar.id;
      const priceNum = typeof v.price === 'number' ? v.price : parseFloat(v.price || 0);
      return `
        <div class="v-variant-card ${isSelected ? 'selected' : ''}" data-variant-id="${v.id}">
          <span class="v-variant-name">${v.name}</span>
          <span class="v-variant-price-tag">$${priceNum.toFixed(2)}</span>
        </div>
      `;
    }).join('');

    elements.modalProductBody.innerHTML = `
      <!-- Breadcrumb -->
      <div class="v-breadcrumb">
        <span class="v-crumb-link" id="vBreadcrumbHome">Home</span>
        <span class="v-crumb-separator">/</span>
        <span class="v-crumb-link" id="vBreadcrumbProducts">Products</span>
        <span class="v-crumb-separator">/</span>
        <span class="v-crumb-current">${prod.name}</span>
      </div>

      <!-- Two-Column Product Hero -->
      <div class="v-product-hero">
        <!-- Left Column: Media Box & Showcase Toggle -->
        <div class="v-media-column">
          <div class="v-media-box" id="vMediaBox">
            <div class="v-media-image-view" id="vMediaImageView">
              <img src="${img}" alt="${prod.name}" class="v-box-render" onerror="this.onerror=null; this.src='/assets/1058939.webp';">
              <div class="v-radial-glow"></div>
            </div>
            <div class="v-media-video-view hidden" id="vMediaVideoView">
              <iframe id="vVideoFrame" src="" title="Software Showcase" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen class="v-video-frame"></iframe>
            </div>
          </div>
          <button class="v-showcase-btn" id="vShowcaseToggle" type="button">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="23 7 16 12 23 17 23 7"></polygon><rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect></svg>
            <span id="vShowcaseBtnLabel">Show Showcase</span>
          </button>
        </div>

        <!-- Right Column: Details, Variants & Actions -->
        <div class="v-details-column">
          <div class="v-title-header">
            <div class="v-title-row">
              <h1 class="v-product-title">${prod.name}</h1>
              <div class="v-status-badge" style="border-color: ${statusColor}70; color: ${statusColor}; background: ${statusColor}18;">
                <span class="undetected-dot" style="background: ${statusColor}; box-shadow: 0 0 8px ${statusColor};"></span>
                <span>${statusText}</span>
              </div>
            </div>
            <span class="v-category-tag">${prod.category || 'Software'} &bull; Windows 10 & 11 All Builds</span>
          </div>

          <!-- Variants Stack -->
          <div class="v-variants-wrapper">
            <div class="v-section-label">Variants:</div>
            <div class="v-variants-stack">
              ${variantsHTML}
            </div>
          </div>

          <!-- Actions Row -->
          <div class="v-actions-row">
            <button class="v-buy-now-btn" id="vModalBuyNow" type="button">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg>
              <span>Buy Now</span>
            </button>
            <button class="v-add-cart-btn" id="vModalAddToCart" type="button">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
              <span>Add To Cart</span>
            </button>
          </div>

          <!-- Specs Badges -->
          <div class="v-specs-badges">
            <div class="v-spec-item">
              <span class="v-spec-icon">⚡</span>
              <span>Instant Automated Key & Loader Delivery</span>
            </div>
            <div class="v-spec-item">
              <span class="v-spec-icon">🛡️</span>
              <span>Ring-0 Kernel Hypervisor Integrity</span>
            </div>
            <div class="v-spec-item">
              <span class="v-spec-icon">💬</span>
              <span>24/7 Discord Ticket & Customer Support</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Section: Requirements -->
      <div class="v-section-block">
        <div class="v-watermark-header">
          <span class="v-watermark-text">REQUIREMENTS</span>
          <h2 class="v-section-title">System Requirements & Compatibility</h2>
        </div>

        <div class="v-requirements-grid">
          <div class="v-req-card">
            <span class="v-req-label">OPERATING SYSTEM</span>
            <span class="v-req-val">Windows 10 & 11 (All Versions)</span>
          </div>
          <div class="v-req-card">
            <span class="v-req-label">PROCESSORS</span>
            <span class="v-req-val">Intel & AMD Processors</span>
          </div>
          <div class="v-req-card">
            <span class="v-req-label">ANTI-CHEAT STATUS</span>
            <span class="v-req-val" style="color: ${statusColor};">${statusText} (Ring-0)</span>
          </div>
          <div class="v-req-card">
            <span class="v-req-label">DISPLAY MODE</span>
            <span class="v-req-val">Borderless & Windowed</span>
          </div>
          <div class="v-req-card">
            <span class="v-req-label">HWID SPOOFER</span>
            <span class="v-req-val">Built-in Kernel Virtualization</span>
          </div>
          <div class="v-req-card">
            <span class="v-req-label">PLATFORM / LAUNCHER</span>
            <span class="v-req-val">Steam, Epic, Battlenet & Riot</span>
          </div>
        </div>
      </div>

      <!-- Section: Official Build Description & Features (from SellAuth) -->
      <div class="v-section-block">
        <div class="v-watermark-header">
          <span class="v-watermark-text">SPECS</span>
          <h2 class="v-section-title">Product Description & Included Features</h2>
        </div>

        <div class="v-sellauth-desc-card">
          <div class="v-desc-badge-row">
            <span class="v-live-sync-pill"><span class="pulse-dot"></span> Live SellAuth Specification</span>
            <span class="v-desc-sku">Build #${prod.id} &bull; ${prod.category || 'Software'}</span>
          </div>
          <div class="v-sellauth-html-content">
            ${(prod.description || prod.desc) ? (prod.description || prod.desc) : '<div class="empty-desc">No additional documentation provided for this build in SellAuth.</div>'}
          </div>
        </div>
      </div>
    `;

    // 1. Variant card click handlers
    elements.modalProductBody.querySelectorAll('.v-variant-card').forEach(card => {
      card.addEventListener('click', () => {
        const vId = card.dataset.variantId;
        selectedVariants[prodId] = vId;
        currentVar = variantsList.find(v => String(v.id) === String(vId)) || currentVar;

        elements.modalProductBody.querySelectorAll('.v-variant-card').forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
      });
    });

    // 2. Showcase Toggle Button
    const showcaseToggle = document.getElementById('vShowcaseToggle');
    const mediaImgView = document.getElementById('vMediaImageView');
    const mediaVidView = document.getElementById('vMediaVideoView');
    const showcaseLabel = document.getElementById('vShowcaseBtnLabel');
    const videoFrame = document.getElementById('vVideoFrame');
    let showingVideo = false;

    if (showcaseToggle) {
      showcaseToggle.addEventListener('click', () => {
        showingVideo = !showingVideo;
        if (showingVideo) {
          mediaImgView.classList.add('hidden');
          mediaVidView.classList.remove('hidden');
          showcaseLabel.textContent = 'Show Product';
          if (videoFrame && !videoFrame.src) {
            videoFrame.src = 'https://www.youtube-nocookie.com/embed/fD3lE5Hw8YQ?autoplay=1';
          }
        } else {
          mediaVidView.classList.add('hidden');
          mediaImgView.classList.remove('hidden');
          showcaseLabel.textContent = 'Show Showcase';
          if (videoFrame) videoFrame.src = '';
        }
      });
    }

    // 3. Breadcrumb navigation
    const bHome = document.getElementById('vBreadcrumbHome');
    const bProducts = document.getElementById('vBreadcrumbProducts');
    if (bHome) {
      bHome.addEventListener('click', () => {
        elements.productModal.classList.remove('open');
        const homeTab = document.querySelector('.nav-tab[data-target="home"]');
        if (homeTab) homeTab.click();
      });
    }
    if (bProducts) {
      bProducts.addEventListener('click', () => {
        elements.productModal.classList.remove('open');
        const prodTab = document.querySelector('.nav-tab[data-target="products"]');
        if (prodTab) prodTab.click();
      });
    }

    // 4. Action Buttons
    const buyBtn = document.getElementById('vModalBuyNow');
    if (buyBtn) {
      buyBtn.addEventListener('click', () => {
        elements.productModal.classList.remove('open');
        openCustomCheckout([{
          productId: prod.id,
          productName: prod.name,
          category: prod.category,
          variantId: currentVar.id,
          variantName: currentVar.name,
          price: currentVar.price,
          quantity: 1,
          image: img
        }]);
      });
    }

    const addBtn = document.getElementById('vModalAddToCart');
    if (addBtn) {
      addBtn.addEventListener('click', () => {
        addToCart(prod, currentVar);
        elements.productModal.classList.remove('open');
        openCartDrawer();
      });
    }

    elements.productModal.classList.add('open');
  }

  // 4. Shopping Cart Management
  function setupCart() {
    function openCart() {
      elements.cartOverlay.classList.add('open');
    }
    function closeCart() {
      elements.cartOverlay.classList.remove('open');
    }

    window.openCartDrawer = openCart;

    elements.cartTrigger.addEventListener('click', openCart);
    elements.cartCloseBtn.addEventListener('click', closeCart);
    elements.cartOverlay.addEventListener('click', (e) => {
      if (e.target === elements.cartOverlay) closeCart();
    });

    // Apply Coupon Code
    if (elements.applyCouponBtn) {
      elements.applyCouponBtn.addEventListener('click', () => {
        const code = (elements.couponInput.value || '').trim().toLowerCase();
        if (!code) return;

        // Verify coupon
        if (code === 'deepsense10' || code === 'ud2025' || code === 'deepsense5' || code === 'polofn16' || code === 'claude5') {
          state.appliedCoupon = code.toUpperCase();
          state.discountRate = (code === 'ud2025') ? 0.15 : ((code === 'deepsense10') ? 0.10 : 0.05);
          elements.couponMessage.textContent = `Promo code "${state.appliedCoupon}" applied: ${(state.discountRate * 100).toFixed(0)}% discount!`;
          elements.couponMessage.className = 'coupon-msg success';
          if (typeof showToast === 'function') showToast(`Promo code applied: ${(state.discountRate * 100).toFixed(0)}% off!`);
        } else {
          elements.couponMessage.textContent = `Promo code "${code.toUpperCase()}" is invalid or expired.`;
          elements.couponMessage.className = 'coupon-msg error';
        }
        updateCartUI();
      });
    }

    // Checkout Button
    if (elements.cartCheckoutBtn) {
      elements.cartCheckoutBtn.addEventListener('click', () => {
        if (state.cart.length === 0) return;
        closeCart();
        openCustomCheckout(state.cart);
      });
    }
  }

  function addToCart(product, variant) {
    const existingIndex = state.cart.findIndex(
      item => item.productId === product.id && item.variantId === variant.id
    );

    if (existingIndex > -1) {
      state.cart[existingIndex].quantity += 1;
    } else {
      if (typeof showToast === 'function') showToast(`Added ${item.productName} to cart!`);
      state.cart.push({
        productId: product.id,
        productName: product.name,
        category: product.category,
        variantId: variant.id,
        variantName: variant.name,
        price: variant.price,
        quantity: 1
      });
    }

    saveCart();
    updateCartUI();
  }

  function saveCart() {
    localStorage.setItem('deepsense_cart', JSON.stringify(state.cart));
  }

  function updateCartUI() {
    const totalCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);
    elements.cartBadge.textContent = totalCount;

    if (state.cart.length === 0) {
      elements.cartItemsList.innerHTML = `
        <div class="empty-cart-state">
          <p>Your shopping cart is currently empty.</p>
          <button class="btn btn-secondary btn-sm nav-trigger" data-target="products">Browse Products</button>
        </div>
      `;
      elements.cartSubtotal.textContent = '$0.00';
      elements.cartTotal.textContent = '$0.00';
      elements.discountLine.classList.add('hidden');
      return;
    }

    let subtotal = 0;
    elements.cartItemsList.innerHTML = state.cart.map((item, idx) => {
      const itemSubtotal = item.price * item.quantity;
      subtotal += itemSubtotal;

      return `
        <div class="cart-item-row">
          <div class="cart-item-header">
            <div>
              <h4 class="cart-item-title">${item.productName}</h4>
              <span class="cart-item-variant">${item.variantName}</span>
            </div>
            <button class="cart-item-remove" data-cart-index="${idx}" title="Remove item">&times;</button>
          </div>
          <div class="cart-item-footer">
            <div class="qty-control">
              <button class="qty-btn" data-action="dec" data-cart-index="${idx}">-</button>
              <span class="qty-number">${item.quantity}</span>
              <button class="qty-btn" data-action="inc" data-cart-index="${idx}">+</button>
            </div>
            <span class="cart-item-price">$${itemSubtotal.toFixed(2)}</span>
          </div>
        </div>
      `;
    }).join('');

    // Bind quantity and remove buttons
    elements.cartItemsList.querySelectorAll('.cart-item-remove').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.dataset.cartIndex, 10);
        state.cart.splice(idx, 1);
        saveCart();
        updateCartUI();
      });
    });

    elements.cartItemsList.querySelectorAll('.qty-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.dataset.cartIndex, 10);
        const action = btn.dataset.action;
        if (action === 'inc') {
          state.cart[idx].quantity += 1;
        } else if (action === 'dec') {
          state.cart[idx].quantity -= 1;
          if (state.cart[idx].quantity <= 0) {
            state.cart.splice(idx, 1);
          }
        }
        saveCart();
        updateCartUI();
      });
    });

    // Summary math
    const discountAmount = subtotal * state.discountRate;
    const finalTotal = Math.max(0, subtotal - discountAmount);

    elements.cartSubtotal.textContent = `$${subtotal.toFixed(2)}`;
    if (state.discountRate > 0) {
      elements.discountLine.classList.remove('hidden');
      elements.cartDiscount.textContent = `-$${discountAmount.toFixed(2)}`;
    } else {
      elements.discountLine.classList.add('hidden');
    }
    elements.cartTotal.textContent = `$${finalTotal.toFixed(2)}`;
  }

  // ========================================================
  // BESPOKE CUSTOM CHECKOUT ENGINE (SellAuth API Integration)
  // ========================================================
  function openCustomCheckout(items) {
    if (!items || !Array.isArray(items) || items.length === 0) {
      if (state.cart.length > 0) {
        items = state.cart;
      } else {
        alert('Please select a product variant to proceed with checkout.');
        return;
      }
    }

    let checkoutItems = items.map(item => ({
      productId: item.productId,
      productName: item.productName || item.name || 'Game Software',
      category: item.category || 'Software',
      variantId: item.variantId,
      variantName: item.variantName || 'Access Key',
      price: typeof item.price === 'number' ? item.price : parseFloat(item.price || 0),
      quantity: item.quantity || 1,
      image: item.image || '/assets/1058939.webp'
    }));

    let currentDiscountRate = state.discountRate || 0;
    let appliedCouponCode = state.appliedCoupon || '';
    let selectedPaymentGateway = 'CASHAPP';

    function renderCheckoutView() {
      const subtotal = checkoutItems.reduce((acc, it) => acc + (it.price * it.quantity), 0);
      const discount = subtotal * currentDiscountRate;
      const total = Math.max(0, subtotal - discount);

      const itemsHTML = checkoutItems.map(item => `
        <div class="checkout-item-row">
          <img src="${item.image}" alt="${item.productName}" class="checkout-item-thumb" onerror="this.onerror=null; this.src='/assets/1058939.webp';">
          <div class="checkout-item-meta">
            <div class="checkout-item-name">${item.productName}</div>
            <span class="checkout-item-variant-pill">${item.variantName} &bull; Qty ${item.quantity}</span>
          </div>
          <div class="checkout-item-price-tag">$${(item.price * item.quantity).toFixed(2)}</div>
        </div>
      `).join('');

      elements.checkoutModalBody.innerHTML = `
        <div class="checkout-bento-grid">
          <!-- Left Column: Order Summary -->
          <div class="checkout-summary-pane">
            <div class="checkout-items-card">
              <div style="font-size: 12px; font-weight: 700; color: #a1a1aa; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 4px;">
                Order Summary (${checkoutItems.length} item${checkoutItems.length > 1 ? 's' : ''})
              </div>
              ${itemsHTML}
            </div>

            <!-- Coupon Code Input -->
            <div class="checkout-coupon-row">
              <input type="text" class="checkout-coupon-input" id="checkoutCouponInput" placeholder="Promo code..." value="${appliedCouponCode}">
              <button class="checkout-coupon-btn" id="checkoutApplyCouponBtn" type="button">Apply</button>
            </div>
            <div id="checkoutCouponFeedback" style="font-size: 11px; margin-top: -12px; min-height: 14px;"></div>

            <!-- Price Breakdown Table -->
            <div class="checkout-breakdown-card">
              <div class="checkout-calc-line">
                <span>Subtotal</span>
                <span id="coSubtotal">$${subtotal.toFixed(2)} USD</span>
              </div>
              ${discount > 0 ? `
                <div class="checkout-calc-line" style="color: #10b981;">
                  <span>Promo Discount (${(currentDiscountRate * 100).toFixed(0)}%)</span>
                  <span>-$${discount.toFixed(2)} USD</span>
                </div>
              ` : ''}
              <div class="checkout-calc-line">
                <span>Instant License Provisioning</span>
                <span style="color: #10b981; font-weight: 700;">FREE ($0.00)</span>
              </div>
              <div class="checkout-calc-line total">
                <span>Total Amount Due</span>
                <span class="checkout-total-val" id="coTotal">$${total.toFixed(2)} USD</span>
              </div>
            </div>

            <!-- Trust Perks -->
            <div class="checkout-perks-row">
              <div class="checkout-perk-item">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
                <span>Automated SellAuth key & loader dispatch to delivery email</span>
              </div>
              <div class="checkout-perk-item">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
                <span>Ring-0 signature randomized on every injection</span>
              </div>
              <div class="checkout-perk-item">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
                <span>Official Discord ticket support at discord.gg/deepsense</span>
              </div>
            </div>
          </div>

          <!-- Right Column: Delivery Email & Payment Selector -->
          <div class="checkout-details-pane">
            <form id="customCheckoutForm" style="display: flex; flex-direction: column; gap: 18px;">
              <div class="checkout-field">
                <label class="checkout-label" for="coEmail">
                  <span>Delivery Email Address</span>
                  <span class="req">* Required</span>
                </label>
                <input type="email" id="coEmail" class="checkout-input" placeholder="e.g. your-email@gmail.com" required autocomplete="email">
                <span class="checkout-hint">Your private license key, loader download link, and setup guide will be dispatched here.</span>
              </div>

              <div class="checkout-field">
                <label class="checkout-label" for="coDiscord">
                  <span>Discord Tag / Handle</span>
                  <span style="color: var(--text-muted); font-size: 10px; font-weight: 500;">Optional</span>
                </label>
                <input type="text" id="coDiscord" class="checkout-input" placeholder="e.g. username#0000 or @handle">
                <span class="checkout-hint">Used for automated customer VIP role assignment in discord.gg/deepsense.</span>
              </div>

                            <!-- Payment Method Grid (Dynamic Owner Gateways) -->
              <div class="checkout-field">
                <label class="checkout-label">
                  <span>Select Payment Gateway</span>
                  <span style="color: #10b981; font-size: 10px; font-weight: 700;">0% Fee</span>
                </label>
                <div class="checkout-methods-grid">
                  ${(() => {
                    const gws = getStoredPayments().filter(g => g.enabled);
                    if (gws.length === 0) {
                      return '<div style="color: #ef4444; font-size: 12px; padding: 10px;">No payment gateways currently enabled.</div>';
                    }
                    if (!gws.some(g => g.id === selectedPaymentGateway)) {
                      selectedPaymentGateway = gws[0].id;
                    }
                    return gws.map(g => `
                      <div class="payment-card ${selectedPaymentGateway === g.id ? 'active' : ''}" data-gateway="${g.id}">
                        <div class="payment-card-top">
                          <span class="payment-card-name">${g.name}</span>
                          <span class="payment-card-indicator"></span>
                        </div>
                        <span class="payment-card-sub">${g.sub}</span>
                      </div>
                    `).join('');
                  })()}
                </div>
              </div>

              <!-- Agreement -->
              <div style="display: flex; align-items: flex-start; gap: 8px; font-size: 12px; color: #a1a1aa; line-height: 1.4;">
                <input type="checkbox" id="coTerms" checked required style="margin-top: 2px; accent-color: var(--color-orange);">
                <label for="coTerms" style="cursor: pointer;">
                  I agree that digital keys are delivered immediately upon payment confirmation and non-refundable once activated.
                </label>
              </div>

              <!-- CTA Submit -->
              <button type="submit" class="checkout-cta-btn" id="coSubmitBtn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                <span>Complete Order &bull; Pay $${total.toFixed(2)} USD</span>
              </button>
            </form>
          </div>
        </div>
      `;

      // Gateway selection
      elements.checkoutModalBody.querySelectorAll('.payment-card').forEach(card => {
        card.addEventListener('click', () => {
          selectedPaymentGateway = card.dataset.gateway;
          elements.checkoutModalBody.querySelectorAll('.payment-card').forEach(c => c.classList.remove('active'));
          card.classList.add('active');
        });
      });

      // Coupon application
      const couponInput = document.getElementById('checkoutCouponInput');
      const couponBtn = document.getElementById('checkoutApplyCouponBtn');
      const couponFeedback = document.getElementById('checkoutCouponFeedback');

      if (couponBtn && couponInput) {
        couponBtn.addEventListener('click', () => {
          const code = couponInput.value.trim().toLowerCase();
          if (!code) return;

          if (code === 'deepsense10' || code === 'ud2025' || code === 'deepsense5' || code === 'polofn16' || code === 'claude5' || code === 'claude10') {
            appliedCouponCode = code.toUpperCase();
            currentDiscountRate = (code === 'ud2025') ? 0.15 : ((code === 'deepsense10' || code === 'claude10') ? 0.10 : 0.05);
            state.appliedCoupon = appliedCouponCode;
            state.discountRate = currentDiscountRate;
            couponFeedback.style.color = '#10b981';
            couponFeedback.textContent = `Promo code "${appliedCouponCode}" applied (${(currentDiscountRate * 100).toFixed(0)}% off)!`;
            if (typeof showToast === 'function') showToast(`Promo code applied: ${(currentDiscountRate * 100).toFixed(0)}% off!`);
            renderCheckoutView();
          } else {
            couponFeedback.style.color = '#ef4444';
            couponFeedback.textContent = `Invalid or expired promotional code.`;
          }
        });
      }

      // Handle Checkout Form Submission
      const form = document.getElementById('customCheckoutForm');
      if (form) {
        form.addEventListener('submit', async (e) => {
          e.preventDefault();
          const email = document.getElementById('coEmail').value.trim();
          const discord = document.getElementById('coDiscord').value.trim();
          const submitBtn = document.getElementById('coSubmitBtn');

          if (!email) {
            alert('Please provide a valid delivery email.');
            return;
          }

          submitBtn.disabled = true;
          submitBtn.innerHTML = `
            <svg class="animate-spin" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle><path d="M12 2a10 10 0 0 1 10 10"></path></svg>
            <span>Generating Official SellAuth Invoice...</span>
          `;


          // Deepsense Owner Payment Routing & In-Stock Key Dispatch
          try {
            const allKeys = getStoredKeys();
            const activePayments = getStoredPayments();
            const currentGw = activePayments.find(g => g.id === selectedPaymentGateway) || activePayments[0] || { name: 'Direct Gateway', address: '$DeepsenseUD' };

            // Dispatch keys for ordered items
            const dispatchedKeys = [];
            checkoutItems.forEach(it => {
              const slot = `${it.productId}_${it.variantId}`;
              if (allKeys[slot] && allKeys[slot].length > 0) {
                for (let q = 0; q < it.quantity; q++) {
                  if (allKeys[slot].length > 0) {
                    dispatchedKeys.push({
                      productName: it.productName,
                      variantName: it.variantName,
                      key: allKeys[slot].shift()
                    });
                  }
                }
              }
            });
            saveStoredKeys(allKeys);

            const invId = 'DS-' + Math.floor(100000 + Math.random() * 900000);
            
            let keysHTML = '';
            if (dispatchedKeys.length > 0) {
              keysHTML = `
                <div style="background: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.4); border-radius: 10px; padding: 14px; margin: 16px 0;">
                  <div style="display: flex; align-items: center; gap: 8px; font-weight: 700; color: #10b981; font-size: 13px; margin-bottom: 8px;">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    <span>Instant License Key Dispatch (In-Stock Automated Fulfillment)</span>
                  </div>
                  ${dispatchedKeys.map(k => `
                    <div style="display: flex; justify-content: space-between; align-items: center; background: #0c0c10; padding: 8px 12px; border-radius: 6px; margin-top: 6px; border: 1px solid rgba(255, 255, 255, 0.08);">
                      <span style="font-size: 12px; color: #a1a1aa;">${k.productName} (${k.variantName})</span>
                      <code style="color: #ff3850; font-weight: 800; font-family: var(--font-mono); font-size: 13px;">${k.key}</code>
                    </div>
                  `).join('')}
                </div>
              `;
            } else {
              keysHTML = `
                <div style="background: rgba(245, 158, 11, 0.1); border: 1px solid rgba(245, 158, 11, 0.4); border-radius: 10px; padding: 14px; margin: 16px 0;">
                  <div style="font-weight: 700; color: #f59e0b; font-size: 13px;">Key Allocation in Progress</div>
                  <p style="font-size: 12px; color: #a1a1aa; margin-top: 4px;">License serial is being generated by the Deepsense kernel daemon and will be dispatched to <strong>${email}</strong> upon payment settlement.</p>
                </div>
              `;
            }

            elements.checkoutModalBody.innerHTML = `
              <div class="checkout-invoice-view" style="padding: 24px; animation: modalScale 0.25s ease forwards;">
                <div class="invoice-halo-icon" style="width: 50px; height: 50px; border-radius: 50%; background: rgba(255, 31, 56, 0.15); border: 1px solid #ff1f38; display: flex; align-items: center; justify-content: center; margin: 0 auto 16px;">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ff1f38" stroke-width="2.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                </div>

                <div style="text-align: center; margin-bottom: 20px;">
                  <h3 style="font-size: 20px; font-weight: 800; color: #ffffff;">Order Initiated: ${invId}</h3>
                  <p style="font-size: 13px; color: #a1a1aa;">Delivery Email: <strong style="color: #ffffff;">${email}</strong></p>
                </div>

                <div style="background: #111116; border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 12px; padding: 16px; margin-bottom: 16px;">
                  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                    <span style="font-size: 13px; color: #a1a1aa;">Payment Method:</span>
                    <span style="font-weight: 700; color: #ffffff;">${currentGw.name}</span>
                  </div>
                  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
                    <span style="font-size: 13px; color: #a1a1aa;">Total Due:</span>
                    <span style="font-size: 18px; font-weight: 800; color: #ff3850;">$${total.toFixed(2)} USD</span>
                  </div>

                  <div style="background: #09090c; border: 1px dashed rgba(255, 31, 56, 0.4); border-radius: 8px; padding: 12px; margin-top: 10px;">
                    <div style="font-size: 11px; text-transform: uppercase; color: var(--text-muted); font-weight: 700; margin-bottom: 4px;">Destination Account / Wallet:</div>
                    <div style="display: flex; justify-content: space-between; align-items: center; gap: 8px;">
                      <code style="font-size: 13px; color: #ffffff; word-break: break-all; font-family: var(--font-mono);">${currentGw.address}</code>
                      <button class="btn btn-secondary btn-sm" id="copyDestAddrBtn" style="white-space: nowrap;">Copy</button>
                    </div>
                  </div>
                </div>

                ${keysHTML}

                <div style="display: flex; flex-direction: column; gap: 10px; margin-top: 20px;">
                  <button class="btn btn-primary w-full btn-lg" id="confirmPaymentBtn">
                    Confirm &amp; Download Private Loader
                  </button>
                  <p style="text-align: center; font-size: 12px; color: var(--text-muted);">
                    Need support? Open a ticket in <a href="https://discord.gg/deepsense" target="_blank" style="color: #ff3850; text-decoration: underline;">discord.gg/deepsense</a>.
                  </p>
                </div>
              </div>
            `;

            // Copy Destination Address
            const copyBtn = document.getElementById('copyDestAddrBtn');
            if (copyBtn) {
              copyBtn.addEventListener('click', () => {
                navigator.clipboard.writeText(currentGw.address).then(() => {
                  copyBtn.textContent = 'Copied!';
                  showToast('Destination address copied to clipboard.');
                  setTimeout(() => copyBtn.textContent = 'Copy', 2000);
                });
              });
            }

            const confirmBtn = document.getElementById('confirmPaymentBtn');
            if (confirmBtn) {
              confirmBtn.addEventListener('click', () => {
                showToast('Private loader download package initiated.', '⬇️');
                elements.checkoutModal.classList.remove('open');
              });
            }

            // Clear Cart
            state.cart = [];
            saveCart();
            updateCartUI();
            if (isOwnerAuthenticated()) renderOwnerDashboard();
            return;
          } catch (e) {
            console.error('Order dispatch error:', e);
          }

          try {
            const checkoutPayload = {
              email: email,
              coupon: appliedCouponCode || undefined,
              discord: discord || undefined,
              cart: checkoutItems.map(it => ({
                productId: it.productId,
                variantId: it.variantId,
                quantity: it.quantity
              }))
            };

            let invoiceData = null;

            // 1. Try local/Vercel serverless /api/checkout
            try {
              const res = await fetch('/api/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(checkoutPayload)
              });
              if (res.ok) {
                invoiceData = await res.json();
              }
            } catch (err) {}

            // 2. Client fallback direct to SellAuth Checkout API
            if (!invoiceData || !invoiceData.invoice_url) {
              try {
                const directRes = await fetch('https://api.sellauth.com/v1/shops/207573/checkout', {
                  method: 'POST',
                  headers: {
                    'Authorization': 'Bearer 6342749|MFAy03lhFM6tAVnk4qGBQ4UqlC8IiDAZNWRZLixh29eab68c',
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                    email: email,
                    coupon: appliedCouponCode || undefined,
                    cart: checkoutPayload.cart
                  })
                });
                if (directRes.ok) {
                  invoiceData = await directRes.json();
                }
              } catch (directErr) {
                console.warn('Direct SellAuth checkout error:', directErr);
              }
            }

            if (invoiceData && (invoiceData.invoice_url || invoiceData.url)) {
              const invUrl = invoiceData.invoice_url || invoiceData.url;
              const invId = invoiceData.invoice_id || Math.floor(10000000 + Math.random() * 9000000);

              // Render Success & Payment screen
              elements.checkoutModalBody.innerHTML = `
                <div class="checkout-invoice-view">
                  <div class="invoice-halo-icon">
                    <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                  </div>

                  <h3 class="invoice-view-title">Invoice #${invId} Created</h3>
                  <p class="invoice-view-desc">
                    Your order invoice is generated on SellAuth. Complete payment through the official gateway below to trigger instant automated license dispatch to <strong>${email}</strong>.
                  </p>

                  <div class="invoice-badge-box">
                    <div class="invoice-badge-row">
                      <span>Invoice Status</span>
                      <span style="color: #f59e0b; display: inline-flex; align-items: center; gap: 6px;">
                        <span class="pulse-dot" style="background: #f59e0b;"></span> Awaiting Payment
                      </span>
                    </div>
                    <div class="invoice-badge-row">
                      <span>Selected Items</span>
                      <span>${checkoutItems.map(i => `${i.quantity}x ${i.productName} (${i.variantName})`).join(', ')}</span>
                    </div>
                    <div class="invoice-badge-row">
                      <span>Total Due</span>
                      <span style="color: var(--color-orange); font-size: 16px;">$${total.toFixed(2)} USD</span>
                    </div>
                    <div class="invoice-badge-row">
                      <span>Delivery Target</span>
                      <span style="font-family: var(--font-mono); font-size: 12px;">${email}</span>
                    </div>
                  </div>

                  <div class="invoice-actions-group">
                    <a href="${invUrl}" target="_blank" rel="noopener noreferrer" class="invoice-pay-btn">
                      <span>Pay Now via Secure Gateway</span>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                    </a>

                    <button class="invoice-secondary-btn" id="checkPaymentStatusBtn" type="button">
                      Verify Payment & Status
                    </button>
                    <div id="paymentStatusFeedback" style="font-size: 12px; color: var(--text-muted); min-height: 16px;"></div>
                  </div>

                  <div style="font-size: 12px; color: var(--text-muted); margin-top: 10px;">
                    Need help with your invoice? Join <a href="https://discord.gg/deepsense" target="_blank" style="color: var(--color-orange); text-decoration: underline;">discord.gg/deepsense</a> for 24/7 ticket support.
                  </div>
                </div>
              `;

              // Clear cart if items matched cart
              state.cart = [];
              saveCart();
              updateCartUI();

              // Status Checker button
              const statusBtn = document.getElementById('checkPaymentStatusBtn');
              const statusFeedback = document.getElementById('paymentStatusFeedback');
              if (statusBtn) {
                statusBtn.addEventListener('click', async () => {
                  statusBtn.disabled = true;
                  statusFeedback.style.color = 'var(--text-muted)';
                  statusFeedback.textContent = 'Querying SellAuth blockchain & gateway status...';

                  try {
                    const invCheck = await fetch('/api/invoices/lookup', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ query: String(invId) })
                    });
                    const invJson = await invCheck.json();
                    const found = (invJson.invoices && invJson.invoices[0]) ? invJson.invoices[0] : null;

                    if (found && found.status === 'completed') {
                      statusFeedback.style.color = '#10b981';
                      statusFeedback.textContent = 'Payment CONFIRMED! Your key has been dispatched to your email.';
                    } else {
                      statusFeedback.style.color = '#f59e0b';
                      statusFeedback.textContent = 'Payment still pending gateway confirmation. Click "Pay Now" to complete payment.';
                    }
                  } catch (e) {
                    statusFeedback.textContent = 'Checking SellAuth... If you just sent payment, please allow 1-2 minutes for confirmations.';
                  }
                  statusBtn.disabled = false;
                });
              }
            } else {
              throw new Error((invoiceData && (invoiceData.error || invoiceData.message)) || 'Unable to initialize SellAuth invoice');
            }
          } catch (checkoutErr) {
            alert('Checkout initialization error: ' + checkoutErr.message);
            submitBtn.disabled = false;
            submitBtn.innerHTML = `
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
              <span>Complete Order &bull; Pay $${total.toFixed(2)} USD</span>
            `;
          }
        });
      }
    }

    renderCheckoutView();
    elements.checkoutModal.classList.add('open');
  }

  // 5. Customer Panel & Invoices Lookup
  function setupModals() {
    function openCustomerModal() {
      elements.customerModal.classList.add('open');
      elements.invoiceSearchQuery.focus();
    }
    function closeCustomerModal() {
      elements.customerModal.classList.remove('open');
    }

    if (elements.customerPanelTrigger) elements.customerPanelTrigger.addEventListener('click', openCustomerModal);
    if (elements.mobileCustomerPanelTrigger) elements.mobileCustomerPanelTrigger.addEventListener('click', openCustomerModal);
    if (elements.footerCustomerPanelTrigger) elements.footerCustomerPanelTrigger.addEventListener('click', openCustomerModal);

    if (elements.customerModalClose) elements.customerModalClose.addEventListener('click', closeCustomerModal);
    if (elements.productModalClose) elements.productModalClose.addEventListener('click', () => {
      elements.productModal.classList.remove('open');
    });
    if (elements.checkoutModalClose) elements.checkoutModalClose.addEventListener('click', () => {
      elements.checkoutModal.classList.remove('open');
    });

    elements.customerModal.addEventListener('click', (e) => {
      if (e.target === elements.customerModal) closeCustomerModal();
    });
    elements.productModal.addEventListener('click', (e) => {
      if (e.target === elements.productModal) elements.productModal.classList.remove('open');
    });
    if (elements.checkoutModal) {
      elements.checkoutModal.addEventListener('click', (e) => {
        if (e.target === elements.checkoutModal) elements.checkoutModal.classList.remove('open');
      });
    }

    // Invoice Search Form Submit
    if (elements.invoiceLookupForm) {
      elements.invoiceLookupForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const query = elements.invoiceSearchQuery.value.trim();
        if (!query) return;

        elements.invoiceLookupBtn.disabled = true;
        elements.invoiceLookupBtn.textContent = 'Querying...';
        elements.invoiceResultsContainer.innerHTML = `
          <div class="empty-state">
            <p>Searching SellAuth invoices for "${query}"...</p>
          </div>
        `;

        let data = null;
        try {
          const res = await fetch('/api/invoices/lookup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query })
          });
          if (res.ok) data = await res.json();
        } catch (e) {}

        if (!data || !data.invoices) {
          try {
            const directRes = await fetch('https://api.sellauth.com/v1/shops/207573/invoices?per_page=100', {
              headers: {
                'Authorization': 'Bearer 6342749|MFAy03lhFM6tAVnk4qGBQ4UqlC8IiDAZNWRZLixh29eab68c',
                'Accept': 'application/json'
              }
            });
            if (directRes.ok) {
              const invoicesJson = await directRes.json();
              const allInvoices = (invoicesJson.data && Array.isArray(invoicesJson.data)) ? invoicesJson.data : [];
              const qLower = query.toLowerCase();
              const matched = allInvoices.filter(inv => {
                const emailMatch = inv.email && inv.email.toLowerCase().includes(qLower);
                const idMatch = String(inv.id).includes(qLower) || (inv.unique_id && inv.unique_id.toLowerCase().includes(qLower));
                return emailMatch || idMatch;
              });
              data = {
                count: matched.length,
                invoices: matched.slice(0, 10).map(inv => ({
                  id: inv.id,
                  unique_id: inv.unique_id,
                  status: inv.status,
                  price: inv.price,
                  currency: inv.currency,
                  gateway: (inv.payment_method && inv.payment_method.name) || inv.gateway,
                  created_at: inv.created_at,
                  completed_at: inv.completed_at,
                  email: inv.email ? inv.email.replace(/(.{2})(.*)(?=@)/, (gp1, gp2, gp3) => gp2 + '*'.repeat(gp3.length)) : 'N/A'
                }))
              };
            }
          } catch (err) {}
        }

        try {
          elements.invoiceLookupBtn.disabled = false;
          elements.invoiceLookupBtn.textContent = 'Search';

          if (data && data.invoices && data.invoices.length > 0) {
            elements.invoiceResultsContainer.innerHTML = data.invoices.map(inv => `
              <div class="invoice-card">
                <div class="invoice-card-top">
                  <span class="invoice-id-tag">INVOICE #${inv.id}</span>
                  <span class="invoice-status-pill ${inv.status}">${inv.status}</span>
                </div>
                <div class="invoice-card-mid">
                  <span>Price: <strong>$${inv.price} ${inv.currency}</strong></span>
                  <span>Gateway: <strong>${inv.gateway}</strong></span>
                </div>
                <div class="invoice-card-mid">
                  <span>Customer: ${inv.email}</span>
                  <span>Date: ${new Date(inv.created_at).toLocaleDateString()}</span>
                </div>
                <div class="invoice-card-bottom">
                  <span style="font-size: 12px; color: var(--text-muted);">SellAuth Ref: ${inv.unique_id || 'N/A'}</span>
                  <a href="https://deepsense.sellauth.com" target="_blank" class="btn btn-outline btn-sm">
                    View Receipt &rarr;
                  </a>
                </div>
              </div>
            `).join('');
          } else {
            elements.invoiceResultsContainer.innerHTML = `
              <div class="empty-state">
                <p>No invoices found matching "${query}".</p>
                <span class="input-hint">Ensure you typed the exact email entered on SellAuth.</span>
              </div>
            `;
          }
        } catch (err) {
          elements.invoiceLookupBtn.disabled = false;
          elements.invoiceLookupBtn.textContent = 'Search';
          elements.invoiceResultsContainer.innerHTML = `
            <div class="empty-state">
              <p style="color: var(--color-red);">Error connecting to SellAuth backend.</p>
              <span class="input-hint">${err.message}</span>
            </div>
          `;
        }
      });
    }
  }

  // 6. Reseller Application Form
  function setupResellerForm() {
    if (!elements.resellerForm) return;

    elements.resellerForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const payload = {
        discord: document.getElementById('resellDiscord').value.trim(),
        storeUrl: document.getElementById('resellStoreUrl').value.trim(),
        volume: document.getElementById('resellVolume').value,
        titles: document.getElementById('resellTitles').value.trim(),
        notes: document.getElementById('resellNotes').value.trim()
      };

      elements.resellSubmitBtn.disabled = true;
      elements.resellSubmitBtn.textContent = 'Registering Profile...';

      let data = null;
      try {
        const res = await fetch('/api/reseller/apply', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        if (res.ok) data = await res.json();
      } catch (e) {}

      // Direct Discord Webhook fallback
      if (!data || !data.success) {
        try {
          const appId = 'RES-' + Math.random().toString(36).substring(2, 8).toUpperCase();
          const discordRes = await fetch('https://discord.com/api/webhooks/1571572812400038170/r3s_xg4dzCpicQqfiBUHIyp93srknslnhCgIVmjCTMW1cuBMkp2jwhfxyrlATHpzSVwx', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              username: 'Deepsense Reseller Bot',
              avatar_url: 'https://api.sellauth.com/storage/images/1271087.webp',
              embeds: [{
                title: '🚀 New Wholesale Reseller Application',
                color: 0xff6b00,
                description: 'A new reseller partnership application was submitted via the storefront.',
                fields: [
                  { name: 'Application ID', value: `\`${appId}\``, inline: true },
                  { name: 'Discord Username', value: payload.discord ? `\`${payload.discord}\`` : 'Not provided', inline: true },
                  { name: 'Storefront / Channel URL', value: payload.storeUrl || 'None', inline: false },
                  { name: 'Expected Monthly Volume', value: payload.volume || 'Not specified', inline: true },
                  { name: 'Target Software Titles', value: payload.titles || 'All Software', inline: true },
                  { name: 'Notes & Experience', value: payload.notes || 'None provided', inline: false }
                ],
                footer: { text: 'Deepsense · Automated Reseller System' },
                timestamp: new Date().toISOString()
              }]
            })
          });
          if (discordRes.ok || discordRes.status === 204) {
            data = {
              success: true,
              applicationId: appId
            };
          }
        } catch (err) {}
      }

      elements.resellSubmitBtn.disabled = false;
      elements.resellSubmitBtn.textContent = 'Submit Reseller Application';

      if (data && data.success) {
        elements.resellAppId.textContent = data.applicationId;
        elements.resellSuccessMessage.classList.remove('hidden');
        elements.resellerForm.reset();
      } else {
        alert('Application registered. Please join discord.gg/deepsense to finalize your partnership.');
      }
    });
  }

  // Status telemetry removed

  // Start application on DOM Ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();



  // Toast Notification Engine
  function showToast(message, icon = '&#10003;') {
    const container = document.getElementById('toastContainer');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<span style="color: #ff1f38; font-weight: 800;">${icon}</span><span>${message}</span>`;
    container.appendChild(toast);
    setTimeout(() => {
      toast.style.animation = 'toastOut 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards';
      setTimeout(() => toast.remove(), 300);
    }, 3200);
  }
  window.showToast = showToast;


  // ==========================================================================
  // DEEPSENSE OWNER ENGINE (rezinestudio@gmail.com)
  // Products Governance, Key Inventory Provisioning, Payment Gateway Routing
  // ==========================================================================
  const OWNER_EMAIL = 'rezinestudio@gmail.com';
  const DEFAULT_OWNER_PWD = 'DeepsenseOwner2025!';

  const DEFAULT_PAYMENT_METHODS = [
    { id: 'CASHAPP', name: 'Cash App', sub: '$cashtag & QR Direct', enabled: true, address: '$DeepsenseUD', fieldLabel: '$Cashtag' },
    { id: 'CRYPTO_BTC', name: 'Bitcoin (BTC)', sub: 'Native SegWit Network', enabled: true, address: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh', fieldLabel: 'BTC Wallet Address' },
    { id: 'CRYPTO_LTC', name: 'Litecoin (LTC)', sub: 'Instant & Low Fee (<$0.01)', enabled: true, address: 'ltc1q32v46p322s8k6m70z9h7y6z4g4s3f5k4v2w1e', fieldLabel: 'LTC Wallet Address' },
    { id: 'CRYPTO_USDT', name: 'Tether (USDT TRC20)', sub: 'TRON Network USDT', enabled: true, address: 'TYDzsYUEpvnYmQk4zGP9sWWcTEd36dAtWv', fieldLabel: 'USDT Address (TRC20)' },
    { id: 'STRIPE', name: 'Credit / Debit Card', sub: 'Stripe & Apple Pay Instant', enabled: true, address: 'Deepsense Automated Card Processing', fieldLabel: 'Gateway Descriptor' },
    { id: 'PAYPAL', name: 'PayPal', sub: 'Friends & Family Direct', enabled: true, address: 'payments@deepsense.gg', fieldLabel: 'PayPal Email / Me' }
  ];

  function getStoredOwnerPassword() {
    return localStorage.getItem('deepsense_owner_pwd') || DEFAULT_OWNER_PWD;
  }

  let isOwnerSessionActive = false;
  function isOwnerAuthenticated() {
    return isOwnerSessionActive;
  }

  function getStoredPayments() {
    try {
      const stored = localStorage.getItem('deepsense_payment_methods');
      if (stored) return JSON.parse(stored);
    } catch (e) {}
    return JSON.parse(JSON.stringify(DEFAULT_PAYMENT_METHODS));
  }

  function saveStoredPayments(methods) {
    localStorage.setItem('deepsense_payment_methods', JSON.stringify(methods));
  }

  function getStoredKeys() {
    try {
      const stored = localStorage.getItem('deepsense_product_keys');
      if (stored) return JSON.parse(stored);
    } catch (e) {}
    // Seed initial sample keys
    const initialKeys = {};
    state.products.forEach(p => {
      (p.variants || []).forEach(v => {
        const k = `${p.id}_${v.id}`;
        initialKeys[k] = [
          `DS-${p.name.replace(/[^a-zA-Z]/g, '').slice(0, 4).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}-${Math.random().toString(36).substring(2, 6).toUpperCase()}-KEY1`,
          `DS-${p.name.replace(/[^a-zA-Z]/g, '').slice(0, 4).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}-${Math.random().toString(36).substring(2, 6).toUpperCase()}-KEY2`,
          `DS-${p.name.replace(/[^a-zA-Z]/g, '').slice(0, 4).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}-${Math.random().toString(36).substring(2, 6).toUpperCase()}-KEY3`
        ];
      });
    });
    localStorage.setItem('deepsense_product_keys', JSON.stringify(initialKeys));
    return initialKeys;
  }

  function saveStoredKeys(keysObj) {
    localStorage.setItem('deepsense_product_keys', JSON.stringify(keysObj));
  }

  function getStoredCustomProducts() {
    try {
      const stored = localStorage.getItem('deepsense_custom_products');
      if (stored) return JSON.parse(stored);
    } catch (e) {}
    return null;
  }

  function saveStoredProducts(prods) {
    localStorage.setItem('deepsense_custom_products', JSON.stringify(prods));
  }

  // Owner Elements
  const ownerElements = {
    triggerBtn: document.getElementById('ownerPanelTrigger'),
    mobileTriggerBtn: document.getElementById('mobileOwnerPanelTrigger'),
    footerTriggerBtn: document.getElementById('footerOwnerPanelTrigger'),
    triggerText: document.getElementById('ownerTriggerText'),
    loginModal: document.getElementById('ownerLoginModal'),
    loginModalClose: document.getElementById('ownerLoginModalClose'),
    loginForm: document.getElementById('ownerLoginForm'),
    loginEmail: document.getElementById('ownerLoginEmail'),
    loginPassword: document.getElementById('ownerLoginPassword'),
    loginError: document.getElementById('ownerLoginError'),
    togglePwdVisibility: document.getElementById('togglePasswordVisibility'),
    panelModal: document.getElementById('ownerPanelModal'),
    panelModalClose: document.getElementById('ownerPanelModalClose'),
    logoutBtn: document.getElementById('ownerLogoutBtn'),
    tabBtns: document.querySelectorAll('.owner-tab-btn'),
    tabPanes: document.querySelectorAll('.owner-tab-pane'),
    statProducts: document.getElementById('ownerStatProductsCount'),
    statKeys: document.getElementById('ownerStatKeysCount'),
    statGateways: document.getElementById('ownerStatGatewaysCount'),
    toggleAddProductBtn: document.getElementById('toggleAddProductFormBtn'),
    addProductBox: document.getElementById('addProductFormWrapper'),
    cancelAddProductBtn: document.getElementById('cancelAddProductBtn'),
    addProductForm: document.getElementById('ownerAddProductForm'),
    newProdPreset: document.getElementById('newProdImagePreset'),
    newProdCustomImg: document.getElementById('newProdImageCustom'),
    productsList: document.getElementById('ownerProductsList'),
    stockProductSelect: document.getElementById('stockProductSelect'),
    stockVariantSelect: document.getElementById('stockVariantSelect'),
    stockTextarea: document.getElementById('stockKeysTextarea'),
    stockInputCount: document.getElementById('stockKeysInputCount'),
    addKeysForm: document.getElementById('ownerAddKeysForm'),
    stockLedgerList: document.getElementById('ownerStockLedgerList'),
    refreshStockBtn: document.getElementById('ownerRefreshStockBtn'),
    gatewaysContainer: document.getElementById('ownerGatewaysContainer'),
    paymentsForm: document.getElementById('ownerPaymentsForm'),
    resetPaymentsBtn: document.getElementById('resetPaymentsDefaultBtn'),
    changePwdForm: document.getElementById('ownerChangePasswordForm'),
    changePwdFeedback: document.getElementById('changePwdFeedback'),
    resetStoreBtn: document.getElementById('ownerResetStoreBtn')
  };

  function updateOwnerButtonState() {
    const isAuth = isOwnerAuthenticated();
    if (ownerElements.triggerBtn) {
      if (isAuth) {
        ownerElements.triggerBtn.classList.add('authenticated');
        if (ownerElements.triggerText) ownerElements.triggerText.textContent = 'Owner Active ⚡';
      } else {
        ownerElements.triggerBtn.classList.remove('authenticated');
        if (ownerElements.triggerText) ownerElements.triggerText.textContent = 'Owner Panel';
      }
    }
  }

      // Expose openOwnerPortal globally and bind F5 hotkey
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


  function openOwnerPortal() {
    if (isOwnerAuthenticated()) {
      openOwnerDashboard();
    } else {
      if (ownerElements.loginModal) {
        if (ownerElements.loginError) {
          ownerElements.loginError.style.display = 'none';
          ownerElements.loginError.textContent = '';
        }
        if (ownerElements.loginEmail) ownerElements.loginEmail.value = OWNER_EMAIL;
        if (ownerElements.loginPassword) ownerElements.loginPassword.value = '';
        ownerElements.loginModal.classList.add('open');
        setTimeout(() => ownerElements.loginPassword && ownerElements.loginPassword.focus(), 150);
      }
    }
  }

  function closeOwnerLogin() {
    if (ownerElements.loginModal) ownerElements.loginModal.classList.remove('open');
  }

  function openOwnerDashboard() {
    closeOwnerLogin();
    if (ownerElements.panelModal) {
      ownerElements.panelModal.classList.add('open');
      renderOwnerDashboard();
    }
  }

  function closeOwnerDashboard() {
    isOwnerSessionActive = false;
    if (ownerElements.panelModal) ownerElements.panelModal.classList.remove('open');
  }

  function setupOwnerEngine() {
    updateOwnerButtonState();

    // Triggers
    if (ownerElements.triggerBtn) ownerElements.triggerBtn.addEventListener('click', openOwnerPortal);
    if (ownerElements.mobileTriggerBtn) ownerElements.mobileTriggerBtn.addEventListener('click', () => {
      if (elements.mobileDrawer) elements.mobileDrawer.classList.remove('open');
      openOwnerPortal();
    });
    if (ownerElements.footerTriggerBtn) ownerElements.footerTriggerBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openOwnerPortal();
    });

    if (ownerElements.loginModalClose) ownerElements.loginModalClose.addEventListener('click', closeOwnerLogin);
    if (ownerElements.panelModalClose) ownerElements.panelModalClose.addEventListener('click', closeOwnerDashboard);

    // Password visibility toggle
    if (ownerElements.togglePwdVisibility) {
      ownerElements.togglePwdVisibility.addEventListener('click', () => {
        if (ownerElements.loginPassword.type === 'password') {
          ownerElements.loginPassword.type = 'text';
          ownerElements.togglePwdVisibility.textContent = 'Hide Password';
        } else {
          ownerElements.loginPassword.type = 'password';
          ownerElements.togglePwdVisibility.textContent = 'Show Password';
        }
      });
    }

    // Login Form Submit
    if (ownerElements.loginForm) {
      ownerElements.loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = (ownerElements.loginEmail.value || '').trim().toLowerCase();
        const pwd = (ownerElements.loginPassword.value || '').trim();

        if (email !== OWNER_EMAIL.toLowerCase()) {
          showLoginError(`Access denied. ${email} is not the registered owner account.`);
          return;
        }

        const validPwd = getStoredOwnerPassword();
        if (pwd !== validPwd) {
          showLoginError('Incorrect password. Please verify master password and try again.');
          return;
        }

        // Authentication Successful
        isOwnerSessionActive = true;
        updateOwnerButtonState();
        showToast('Authenticated as Owner (rezinestudio@gmail.com)', '⚡');
        openOwnerDashboard();
      });
    }

    // Logout
    if (ownerElements.logoutBtn) {
      ownerElements.logoutBtn.addEventListener('click', () => {
        isOwnerSessionActive = false;
        updateOwnerButtonState();
        closeOwnerDashboard();
        showToast('Logged out of owner console.');
      });
    }

    // Tab Switching inside Owner Panel
    ownerElements.tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const tab = btn.dataset.tab;
        ownerElements.tabBtns.forEach(b => b.classList.toggle('active', b === btn));
        ownerElements.tabPanes.forEach(pane => {
          pane.classList.toggle('active', pane.id === `ownerPane-${tab}`);
        });
        if (tab === 'stock') populateStockSelectors();
        if (tab === 'payments') renderOwnerPayments();
        if (tab === 'products') renderOwnerProducts();
      });
    });

    // Image preset toggle
    if (ownerElements.newProdPreset) {
      ownerElements.newProdPreset.addEventListener('change', () => {
        if (ownerElements.newProdPreset.value === 'custom') {
          ownerElements.newProdCustomImg.style.display = 'block';
          ownerElements.newProdCustomImg.required = true;
        } else {
          ownerElements.newProdCustomImg.style.display = 'none';
          ownerElements.newProdCustomImg.required = false;
        }
      });
    }

    // Toggle Add Product Form
    if (ownerElements.toggleAddProductBtn) {
      ownerElements.toggleAddProductBtn.addEventListener('click', () => {
        const isHidden = ownerElements.addProductBox.style.display === 'none';
        ownerElements.addProductBox.style.display = isHidden ? 'block' : 'none';
      });
    }
    if (ownerElements.cancelAddProductBtn) {
      ownerElements.cancelAddProductBtn.addEventListener('click', () => {
        ownerElements.addProductBox.style.display = 'none';
      });
    }

    // Add Product Submit
    if (ownerElements.addProductForm) {
      ownerElements.addProductForm.addEventListener('submit', handleOwnerAddProduct);
    }

    // Key Count input helper
    if (ownerElements.stockTextarea) {
      ownerElements.stockTextarea.addEventListener('input', () => {
        const lines = ownerElements.stockTextarea.value.split('\n').map(l => l.trim()).filter(Boolean);
        ownerElements.stockInputCount.textContent = `${lines.length} key${lines.length === 1 ? '' : 's'} detected`;
      });
    }

    // Add Keys Submit
    if (ownerElements.addKeysForm) {
      ownerElements.addKeysForm.addEventListener('submit', handleOwnerAddKeys);
    }
    if (ownerElements.refreshStockBtn) {
      ownerElements.refreshStockBtn.addEventListener('click', renderStockLedger);
    }

    // Payment Form Submit
    if (ownerElements.paymentsForm) {
      ownerElements.paymentsForm.addEventListener('submit', handleOwnerSavePayments);
    }
    if (ownerElements.resetPaymentsBtn) {
      ownerElements.resetPaymentsBtn.addEventListener('click', () => {
        if (confirm('Restore default payment gateway addresses?')) {
          saveStoredPayments(DEFAULT_PAYMENT_METHODS);
          renderOwnerPayments();
          showToast('Payment gateways restored to defaults.');
        }
      });
    }

    // Change Password Submit
    if (ownerElements.changePwdForm) {
      ownerElements.changePwdForm.addEventListener('submit', handleOwnerChangePassword);
    }

    // Store Reset
    if (ownerElements.resetStoreBtn) {
      ownerElements.resetStoreBtn.addEventListener('click', handleOwnerResetStore);
    }

    // Change stock variant on product change
    if (ownerElements.stockProductSelect) {
      ownerElements.stockProductSelect.addEventListener('change', updateStockVariantDropdown);
    }
  }

  function showLoginError(msg) {
    if (ownerElements.loginError) {
      ownerElements.loginError.textContent = msg;
      ownerElements.loginError.style.display = 'block';
    }
  }

  // Render Owner Dashboard
  function renderOwnerDashboard() {
    renderOwnerStats();
    renderOwnerProducts();
    populateStockSelectors();
    renderStockLedger();
    renderOwnerPayments();
  }

  function renderOwnerStats() {
    if (ownerElements.statProducts) {
      ownerElements.statProducts.textContent = state.products.length;
    }
    const allKeys = getStoredKeys();
    let totalKeys = 0;
    Object.values(allKeys).forEach(kList => {
      if (Array.isArray(kList)) totalKeys += kList.length;
    });
    if (ownerElements.statKeys) {
      ownerElements.statKeys.textContent = totalKeys;
    }
    const payments = getStoredPayments();
    const activeCount = payments.filter(p => p.enabled).length;
    if (ownerElements.statGateways) {
      ownerElements.statGateways.textContent = `${activeCount} Active`;
    }
  }

  // 1. Products Management
  function renderOwnerProducts() {
    if (!ownerElements.productsList) return;
    if (state.products.length === 0) {
      ownerElements.productsList.innerHTML = `
        <div style="padding: 30px; text-align: center; color: var(--text-muted);">
          No products currently listed in store. Click "Add New Product" above to create one.
        </div>
      `;
      return;
    }

    const allKeys = getStoredKeys();

    ownerElements.productsList.innerHTML = state.products.map(p => {
      const minPrice = (p.variants && p.variants.length > 0)
        ? Math.min(...p.variants.map(v => typeof v.price === 'number' ? v.price : parseFloat(v.price || 0)))
        : (parseFloat(p.price || 7.99));
      
      const img = getProductImage(p);
      const statusColor = p.status_color || '#10b981';
      const statusText = p.status || 'Undetected';

      // Count keys for this product
      let prodKeysCount = 0;
      (p.variants || []).forEach(v => {
        const k = `${p.id}_${v.id}`;
        if (allKeys[k]) prodKeysCount += allKeys[k].length;
      });

      return `
        <div class="owner-product-row" data-product-id="${p.id}">
          <div class="owner-prod-left">
            <img src="${img}" alt="${p.name}" class="owner-prod-thumb" onerror="this.onerror=null; this.src='assets/fortnite.svg';">
            <div class="owner-prod-meta">
              <span class="owner-prod-title">${p.name}</span>
              <span class="owner-prod-category">
                <span>Category: <strong style="color: #ffffff;">${p.category}</strong></span>
                <span>&bull;</span>
                <span>Starting at <strong style="color: #ff3850;">$${minPrice.toFixed(2)}</strong></span>
                <span>&bull;</span>
                <span>Keys in Stock: <strong style="color: ${prodKeysCount > 0 ? '#10b981' : '#ef4444'};">${prodKeysCount}</strong></span>
              </span>
            </div>
          </div>
          <div class="owner-prod-right">
            <span class="owner-prod-status-pill" style="border: 1px solid ${statusColor}60; color: ${statusColor}; background: ${statusColor}15;">
              <span class="undetected-dot" style="background: ${statusColor}; width: 6px; height: 6px; box-shadow: 0 0 6px ${statusColor};"></span>
              ${statusText}
            </span>
            <button class="btn-delete-prod" data-product-id="${p.id}" title="Remove this product from catalog">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
              <span>Delete</span>
            </button>
          </div>
        </div>
      `;
    }).join('');

    // Bind delete events
    ownerElements.productsList.querySelectorAll('.btn-delete-prod').forEach(btn => {
      btn.addEventListener('click', () => {
        const prodId = parseInt(btn.dataset.productId, 10);
        const prod = state.products.find(p => p.id === prodId);
        if (!prod) return;
        if (confirm(`Are you sure you want to permanently delete "${prod.name}" from the store catalog?`)) {
          state.products = state.products.filter(p => p.id !== prodId);
          saveStoredProducts(state.products);
          renderCategoryFilters();
          renderFeatured();
          renderCatalog();
          renderOwnerDashboard();
          showToast(`Deleted "${prod.name}" from store.`);
        }
      });
    });
  }

  function handleOwnerAddProduct(e) {
    e.preventDefault();
    const name = document.getElementById('newProdName').value.trim();
    const category = document.getElementById('newProdCategory').value.trim();
    const preset = document.getElementById('newProdImagePreset').value;
    const customImg = document.getElementById('newProdImageCustom').value.trim();
    const status = document.getElementById('newProdStatus').value;
    const desc = document.getElementById('newProdDesc').value.trim();
    const isFeatured = document.getElementById('newProdFeatured').checked;

    const pDay = parseFloat(document.getElementById('vPriceDay').value) || 7.99;
    const pWeek = parseFloat(document.getElementById('vPriceWeek').value) || 24.99;
    const pMonth = parseFloat(document.getElementById('vPriceMonth').value) || 54.99;
    const pLife = parseFloat(document.getElementById('vPriceLife').value) || 149.99;

    const imgUrl = (preset === 'custom' && customImg) ? customImg : preset;
    const newId = Date.now();

    const newProduct = {
      id: newId,
      name: name,
      category: category,
      image: imgUrl,
      status: status,
      status_text: status,
      status_color: status === 'Undetected' ? '#10b981' : (status === 'Testing' ? '#f59e0b' : '#ef4444'),
      bestseller: isFeatured,
      featured: isFeatured,
      description: desc,
      desc: desc,
      features: [
        'Kernel Ring-0 Hypervisor Isolated Execution',
        'Streamproof Overlays for OBS & Discord Capture',
        'Built-in Hardware ID Protection & Clean Dispatch',
        'Automated Key Delivery & Setup Instructions Included'
      ],
      variants: [
        { id: `var_${newId}_day`, name: '1 Day License', price: pDay },
        { id: `var_${newId}_week`, name: '7 Days License', price: pWeek, popular: true },
        { id: `var_${newId}_month`, name: '30 Days License', price: pMonth },
        { id: `var_${newId}_life`, name: 'Lifetime Access', price: pLife }
      ]
    };

    state.products.unshift(newProduct);
    saveStoredProducts(state.products);

    // Seed empty keys list
    const allKeys = getStoredKeys();
    newProduct.variants.forEach(v => {
      allKeys[`${newProduct.id}_${v.id}`] = [];
    });
    saveStoredKeys(allKeys);

    ownerElements.addProductForm.reset();
    ownerElements.addProductBox.style.display = 'none';

    renderCategoryFilters();
    renderFeatured();
    renderCatalog();
    renderOwnerDashboard();
    showToast(`Published "${name}" to store catalog!`, '🔥');
  }

  // 2. Stock & Keys Provisioning
  function populateStockSelectors() {
    if (!ownerElements.stockProductSelect) return;
    ownerElements.stockProductSelect.innerHTML = state.products.map(p => `
      <option value="${p.id}">${p.name} (${p.category})</option>
    `).join('');
    updateStockVariantDropdown();
  }

  function updateStockVariantDropdown() {
    if (!ownerElements.stockProductSelect || !ownerElements.stockVariantSelect) return;
    const prodId = parseInt(ownerElements.stockProductSelect.value, 10);
    const prod = state.products.find(p => p.id === prodId);
    if (!prod || !prod.variants) {
      ownerElements.stockVariantSelect.innerHTML = '<option value="default">Standard License</option>';
      return;
    }
    ownerElements.stockVariantSelect.innerHTML = prod.variants.map(v => `
      <option value="${v.id}">${v.name} ($${v.price})</option>
    `).join('');
  }

  function handleOwnerAddKeys(e) {
    e.preventDefault();
    const prodId = parseInt(ownerElements.stockProductSelect.value, 10);
    const varId = ownerElements.stockVariantSelect.value;
    const rawText = ownerElements.stockTextarea.value;
    const keys = rawText.split('\n').map(k => k.trim()).filter(Boolean);

    if (keys.length === 0) {
      alert('Please enter at least one license key to deposit.');
      return;
    }

    const prod = state.products.find(p => p.id === prodId);
    const varObj = (prod && prod.variants) ? prod.variants.find(v => v.id === varId) : null;
    const varName = varObj ? varObj.name : 'License';

    const allKeys = getStoredKeys();
    const keySlot = `${prodId}_${varId}`;
    if (!allKeys[keySlot]) allKeys[keySlot] = [];
    allKeys[keySlot].push(...keys);
    saveStoredKeys(allKeys);

    ownerElements.stockTextarea.value = '';
    ownerElements.stockInputCount.textContent = '0 keys detected';

    renderStockLedger();
    renderOwnerStats();
    renderOwnerProducts();
    showToast(`Deposited ${keys.length} keys into ${prod ? prod.name : 'product'} (${varName})!`, '🔑');
  }

  function renderStockLedger() {
    if (!ownerElements.stockLedgerList) return;
    const allKeys = getStoredKeys();

    const itemsHTML = state.products.map(p => {
      const variants = p.variants || [{ id: 'default', name: 'Standard Access' }];
      const variantsLedger = variants.map(v => {
        const slot = `${p.id}_${v.id}`;
        const keyList = allKeys[slot] || [];
        const count = keyList.length;
        return `
          <div style="display: flex; justify-content: space-between; align-items: center; padding: 4px 0; font-size: 12px; border-bottom: 1px solid rgba(255, 255, 255, 0.04);">
            <span style="color: #a1a1aa;">${v.name}:</span>
            <span style="font-weight: 700; color: ${count > 0 ? '#10b981' : '#ef4444'};">
              ${count} available
            </span>
          </div>
        `;
      }).join('');

      return `
        <div class="owner-stock-item">
          <div style="flex: 1;">
            <div class="owner-stock-item-title">${p.name}</div>
            <div class="owner-stock-item-sub" style="margin-top: 6px;">
              ${variantsLedger}
            </div>
          </div>
        </div>
      `;
    }).join('');

    ownerElements.stockLedgerList.innerHTML = itemsHTML || '<div style="color: #a1a1aa; padding: 15px;">No products found.</div>';
  }

  // 3. Payment Methods Routing
  function renderOwnerPayments() {
    if (!ownerElements.gatewaysContainer) return;
    const payments = getStoredPayments();

    ownerElements.gatewaysContainer.innerHTML = payments.map((gw, idx) => `
      <div class="owner-gateway-card">
        <div class="owner-gw-header">
          <span class="owner-gw-title">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ff1f38" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 14 14"></polyline></svg>
            <span>${gw.name}</span>
          </span>
          <label class="switch-toggle" title="Toggle gateway on/off">
            <input type="checkbox" class="gw-enable-toggle" data-idx="${idx}" ${gw.enabled ? 'checked' : ''}>
            <span class="slider-round"></span>
          </label>
        </div>
        <div style="font-size: 11px; color: var(--text-muted);">${gw.sub}</div>
        <div style="display: flex; flex-direction: column; gap: 4px;">
          <label style="font-size: 11px; font-weight: 700; color: #a1a1aa;">${gw.fieldLabel}:</label>
          <input type="text" class="owner-gw-input gw-addr-input" data-idx="${idx}" value="${gw.address}" placeholder="Enter ${gw.name} destination address/id">
        </div>
      </div>
    `).join('');
  }

  function handleOwnerSavePayments(e) {
    e.preventDefault();
    const payments = getStoredPayments();
    const toggles = ownerElements.gatewaysContainer.querySelectorAll('.gw-enable-toggle');
    const inputs = ownerElements.gatewaysContainer.querySelectorAll('.gw-addr-input');

    toggles.forEach(toggle => {
      const idx = parseInt(toggle.dataset.idx, 10);
      if (payments[idx]) payments[idx].enabled = toggle.checked;
    });

    inputs.forEach(input => {
      const idx = parseInt(input.dataset.idx, 10);
      if (payments[idx]) payments[idx].address = input.value.trim();
    });

    saveStoredPayments(payments);
    renderOwnerStats();
    showToast('Payment gateway routing saved successfully!', '💳');
  }

  // 4. Security & Reset
  function handleOwnerChangePassword(e) {
    e.preventDefault();
    const curr = document.getElementById('currOwnerPwd').value.trim();
    const newPwd = document.getElementById('newOwnerPwd').value.trim();
    const confirmPwd = document.getElementById('confirmOwnerPwd').value.trim();
    const feedback = ownerElements.changePwdFeedback;

    if (curr !== getStoredOwnerPassword()) {
      feedback.className = 'owner-alert error';
      feedback.textContent = 'Current master password does not match.';
      feedback.style.display = 'block';
      return;
    }

    if (newPwd.length < 6) {
      feedback.className = 'owner-alert error';
      feedback.textContent = 'New password must be at least 6 characters long.';
      feedback.style.display = 'block';
      return;
    }

    if (newPwd !== confirmPwd) {
      feedback.className = 'owner-alert error';
      feedback.textContent = 'New passwords do not match.';
      feedback.style.display = 'block';
      return;
    }

    localStorage.setItem('deepsense_owner_pwd', newPwd);
    ownerElements.changePwdForm.reset();
    feedback.className = 'owner-alert success';
    feedback.textContent = 'Master password updated successfully!';
    feedback.style.display = 'block';
    showToast('Master password updated!', '🔒');
  }

  function handleOwnerResetStore() {
    if (confirm('CRITICAL ACTION: Reset store catalog to factory defaults? All custom products and keys will be re-initialized.')) {
      localStorage.removeItem('deepsense_custom_products');
      localStorage.removeItem('deepsense_product_keys');
      localStorage.removeItem('deepsense_payment_methods');
      state.products = [...DEFAULT_CATALOG];
      saveStoredProducts(state.products);
      getStoredKeys(); // seed default keys
      saveStoredPayments(DEFAULT_PAYMENT_METHODS);

      renderCategoryFilters();
      renderFeatured();
      renderCatalog();
      renderOwnerDashboard();
      showToast('Store reset to verified defaults.', '🔄');
    }
  }
