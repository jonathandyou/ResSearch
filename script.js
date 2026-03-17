/**
 * ═══════════════════════════════════════════
 * AURA — Luxury Reservation Monitoring
 * Core Logic, Interactions & Mock Data
 * ═══════════════════════════════════════════
 */

document.addEventListener('DOMContentLoaded', () => {
    initHeader();
    initMobileNav();
    initRevealAnimations();
    initSearchForm();
    initSortControls();
    initChatbot();
});

/* ─────────────────────────────────────────
   1. HEADER — Scroll Glass Effect
   ───────────────────────────────────────── */
function initHeader() {
    const header = document.getElementById('header');
    const onScroll = () => {
        header.classList.toggle('scrolled', window.scrollY > 60);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
}

/* ─────────────────────────────────────────
   2. MOBILE NAVIGATION
   ───────────────────────────────────────── */
function initMobileNav() {
    const toggle = document.getElementById('mobile-toggle');
    const nav = document.getElementById('mobile-nav');
    const close = document.getElementById('mobile-close');
    const links = nav.querySelectorAll('a');

    const open = () => {
        nav.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    const shut = () => {
        nav.classList.remove('active');
        document.body.style.overflow = '';
    };

    toggle.addEventListener('click', open);
    close.addEventListener('click', shut);
    links.forEach(link => link.addEventListener('click', shut));
}

/* ─────────────────────────────────────────
   3. SCROLL REVEAL ANIMATIONS
   ───────────────────────────────────────── */
function initRevealAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.08,
        rootMargin: '0px 0px -40px 0px'
    });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

/* ─────────────────────────────────────────
   4. MOCK RESTAURANT DATA
   ───────────────────────────────────────── */
const MOCK_DATA = [
    {
        name: "Eleven Madison Park",
        location: "New York, USA",
        source: "Resy Platinum",
        date: "2026-04-12",
        time: "19:30",
        party: 2,
        status: "open"
    },
    {
        name: "Noma",
        location: "Copenhagen, Denmark",
        source: "Tock Bespoke",
        date: "2026-04-14",
        time: "20:00",
        party: 4,
        status: "limited"
    },
    {
        name: "Central",
        location: "Lima, Peru",
        source: "Direct Portal",
        date: "2026-04-15",
        time: "13:00",
        party: 2,
        status: "open"
    },
    {
        name: "Osteria Francescana",
        location: "Modena, Italy",
        source: "Global Concierge",
        date: "2026-04-20",
        time: "19:15",
        party: 2,
        status: "open"
    },
    {
        name: "The Ledbury",
        location: "London, UK",
        source: "SevenRooms",
        date: "2026-04-22",
        time: "20:30",
        party: 4,
        status: "limited"
    },
    {
        name: "Atelier Crenn",
        location: "San Francisco, USA",
        source: "Tock Bespoke",
        date: "2026-04-18",
        time: "18:30",
        party: 2,
        status: "unavailable"
    },
    {
        name: "Den",
        location: "Tokyo, Japan",
        source: "Direct Portal",
        date: "2026-04-25",
        time: "19:00",
        party: 2,
        status: "open"
    },
    {
        name: "Geranium",
        location: "Copenhagen, Denmark",
        source: "Resy Platinum",
        date: "2026-04-28",
        time: "18:00",
        party: 6,
        status: "limited"
    }
];

/* ─────────────────────────────────────────
   5. SEARCH FORM & RESULTS RENDERING
   ───────────────────────────────────────── */
let currentResults = [];

function initSearchForm() {
    const form = document.getElementById('search-form');
    const btn = document.getElementById('search-btn');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Loading state
        btn.classList.add('loading');
        btn.textContent = 'Scanning Platforms…';

        setTimeout(() => {
            const shuffled = [...MOCK_DATA].sort(() => 0.5 - Math.random());
            currentResults = shuffled.slice(0, Math.floor(Math.random() * 3) + 3);
            renderResults(currentResults);

            btn.classList.remove('loading');
            btn.textContent = 'Check Openings';

            const area = document.getElementById('results-area');
            area.style.display = 'block';

            setTimeout(() => {
                area.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
        }, 1800);
    });
}

function renderResults(data) {
    const grid = document.getElementById('results-grid');
    const count = document.getElementById('results-count');

    grid.innerHTML = '';
    count.textContent = `${data.length} opening${data.length !== 1 ? 's' : ''} found`;

    const statusLabels = {
        open: 'Newly Opened',
        limited: 'Limited Availability',
        unavailable: 'Currently Unavailable'
    };

    const statusClasses = {
        open: 'status-open',
        limited: 'status-limited',
        unavailable: 'status-unavailable'
    };

    data.forEach((item, i) => {
        const card = document.createElement('div');
        card.className = 'result-card';
        card.style.opacity = '0';
        card.style.transform = 'translateY(16px)';

        const formattedDate = new Date(item.date).toLocaleDateString('en-GB', {
            day: 'numeric', month: 'long', year: 'numeric'
        });

        card.innerHTML = `
            <span class="result-source">${item.source}</span>
            <h3 class="result-name">${item.name}</h3>
            <p class="result-location">${item.location}</p>
            <div class="result-details">
                <div class="result-detail">
                    <span class="label">Date</span>
                    <span class="value">${formattedDate}</span>
                </div>
                <div class="result-detail">
                    <span class="label">Time</span>
                    <span class="value">${item.time}</span>
                </div>
                <div class="result-detail">
                    <span class="label">Party</span>
                    <span class="value">${item.party} guests</span>
                </div>
            </div>
            <div class="result-footer">
                <span class="result-status ${statusClasses[item.status]}">${statusLabels[item.status]}</span>
                <button class="result-action" aria-label="Secure seat at ${item.name}">Secure Seat</button>
            </div>
        `;

        grid.appendChild(card);

        // Staggered entrance
        setTimeout(() => {
            card.style.transition = 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, i * 120);
    });
}

/* ─────────────────────────────────────────
   6. SORT CONTROLS
   ───────────────────────────────────────── */
function initSortControls() {
    const sortBtns = document.querySelectorAll('.sort-btn');

    sortBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            sortBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const sortKey = btn.dataset.sort;
            let sorted = [...currentResults];

            if (sortKey === 'date') {
                sorted.sort((a, b) => new Date(a.date) - new Date(b.date));
            } else if (sortKey === 'status') {
                const order = { open: 0, limited: 1, unavailable: 2 };
                sorted.sort((a, b) => order[a.status] - order[b.status]);
            }

            if (sorted.length > 0) renderResults(sorted);
        });
    });
}

/* ─────────────────────────────────────────
   7. CHATBOT — Powered by Gemini API
   ───────────────────────────────────────── */
// This placeholder is automatically replaced by GitHub Actions during deployment
const GEMINI_API_KEY = '__GEMINI_API_KEY_PLACEHOLDER__';
const GEMINI_MODELS = [
    'gemini-2.0-flash',
    'gemini-1.5-flash',
    'gemini-pro'
];

function getGeminiUrl(model) {
    return `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GEMINI_API_KEY}`;
}

const SYSTEM_PROMPT = `You are the Aura Concierge — a refined, knowledgeable assistant for a luxury fine-dining reservation monitoring platform called Aura.

Your personality:
- Speak with the elegance and discretion of a Michelin-starred maître d'
- Be warm yet professional, polished yet approachable
- Use sophisticated but never pretentious language
- Keep responses concise (2-4 sentences maximum) — brevity is elegance
- Never use emojis, bullet points, or markdown formatting — respond in flowing prose

About Aura:
- Aura monitors top reservation platforms (Resy, Tock, SevenRooms, OpenTable) and bespoke restaurant portals for cancellation openings
- Users set their restaurant and date preferences, and Aura scans for newly available tables caused by cancellations
- Cancellations typically surface 24–48 hours before the reservation date
- Aura covers Michelin-starred and world-renowned fine-dining establishments globally
- The platform offers a complimentary discovery tier and a premium membership (details coming soon)
- Aura does NOT make reservations directly — it surfaces availability so guests can act swiftly

If asked about things outside of dining, reservations, or the Aura platform, gently redirect the conversation back to how you can assist with their dining experience.`;

// Conversation history for context
let conversationHistory = [];

function initChatbot() {
    const launcher = document.getElementById('chat-launcher');
    const panel = document.getElementById('chat-panel');
    const messages = document.getElementById('chat-messages');
    const input = document.getElementById('chat-input');
    const sendBtn = document.getElementById('chat-send');
    const promptBtns = document.querySelectorAll('.prompt-btn');
    const promptsContainer = document.getElementById('chat-prompts');

    let isSending = false;

    // Toggle
    launcher.addEventListener('click', () => {
        const isOpen = panel.classList.toggle('active');
        launcher.classList.toggle('active', isOpen);
        if (isOpen) input.focus();
    });

    // Close on outside click
    document.addEventListener('mousedown', (e) => {
        if (panel.classList.contains('active') &&
            !panel.contains(e.target) &&
            !launcher.contains(e.target)) {
            panel.classList.remove('active');
            launcher.classList.remove('active');
        }
    });

    // Send message
    const send = async (text) => {
        if (!text.trim() || isSending) return;
        isSending = true;

        addMessage(text, true);
        input.value = '';

        // Hide prompts after first interaction
        promptsContainer.style.display = 'none';

        // Typing indicator
        const typing = addMessage('…', false);
        typing.style.opacity = '0.5';

        // Add user message to history
        conversationHistory.push({ role: 'user', parts: [{ text }] });

        try {
            const response = await callGemini(text);
            typing.remove();
            addMessage(response);

            // Add assistant response to history
            conversationHistory.push({ role: 'model', parts: [{ text: response }] });
        } catch (err) {
            console.error('Gemini API error:', err);
            typing.remove();
            addMessage('My apologies — I am momentarily unable to connect. Please try your inquiry again shortly.');
        }

        isSending = false;
    };

    sendBtn.addEventListener('click', () => send(input.value));
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') send(input.value);
    });

    promptBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            send(btn.dataset.prompt || btn.textContent);
        });
    });

    function addMessage(text, isUser = false) {
        const msg = document.createElement('div');
        msg.className = `message ${isUser ? 'message-user' : 'message-bot'}`;
        msg.textContent = text;
        messages.appendChild(msg);
        messages.scrollTop = messages.scrollHeight;
        return msg;
    }
}

async function callGemini(userMessage) {
    const requestBody = {
        system_instruction: {
            parts: [{ text: SYSTEM_PROMPT }]
        },
        contents: [
            ...conversationHistory
        ],
        generationConfig: {
            temperature: 0.7,
            topP: 0.9,
            maxOutputTokens: 200
        }
    };

    // Try each model in sequence
    for (const model of GEMINI_MODELS) {
        try {
            const result = await attemptGeminiCall(getGeminiUrl(model), requestBody);
            if (result) return result;
        } catch (err) {
            console.warn(`Model ${model} failed:`, err.message);
            // If rate limited, wait briefly before trying next model
            if (err.status === 429) {
                await new Promise(r => setTimeout(r, 1500));
            }
            continue;
        }
    }

    // All models failed — use local fallback
    return getLocalFallback(userMessage);
}

async function attemptGeminiCall(url, body) {
    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    });

    if (!response.ok) {
        const err = new Error(`API returned ${response.status}`);
        err.status = response.status;
        throw err;
    }

    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
        throw new Error('No text in response');
    }

    return text.trim();
}

// Elegant local fallback when API is unavailable
function getLocalFallback(query) {
    const q = query.toLowerCase();

    if (q.includes('monitor') || q.includes('how') || q.includes('work')) {
        return 'Aura continuously scans official booking platforms for real-time cancellation windows. Simply set your preferences and we shall notify you the moment a table becomes available.';
    }
    if (q.includes('platform') || q.includes('site') || q.includes('restaurant') || q.includes('which')) {
        return 'We currently monitor Resy, Tock, SevenRooms, OpenTable, and a growing network of bespoke Michelin-starred restaurant portals spanning over thirty countries.';
    }
    if (q.includes('cancel') || q.includes('appear') || q.includes('when') || q.includes('timing')) {
        return 'Cancellations most frequently surface twenty-four to forty-eight hours before the reservation date. Our system detects openings within moments of their release on any monitored platform.';
    }
    if (q.includes('price') || q.includes('cost') || q.includes('free') || q.includes('member')) {
        return 'Aura offers a complimentary discovery tier alongside a premium membership for unlimited monitoring and priority notifications. Detailed offerings will be announced shortly.';
    }
    if (q.includes('hello') || q.includes('hi') || q.includes('hey') || q.includes('good')) {
        return 'Good evening. It would be my pleasure to assist you with your dining arrangements. How may I be of service?';
    }
    if (q.includes('tokyo') || q.includes('japan')) {
        return 'Tokyo is home to some of the world\'s most revered establishments. We monitor platforms affiliated with Den, Narisawa, and several other exceptional destinations across the city.';
    }
    if (q.includes('paris') || q.includes('france')) {
        return 'Paris offers an unparalleled culinary landscape. Our monitoring covers platforms serving establishments such as Arpège, Le Cinq, and numerous other distinguished addresses throughout the city.';
    }
    if (q.includes('new york') || q.includes('nyc')) {
        return 'New York\'s dining scene remains among the most sought-after globally. We actively monitor availability for establishments including Eleven Madison Park, Le Bernardin, and Atomix.';
    }

    return 'Thank you for your inquiry. I would be delighted to assist you further — please feel free to ask about our monitoring process, supported platforms, or availability in any specific city.';
}

