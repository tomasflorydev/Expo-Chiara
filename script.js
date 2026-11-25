// Game engine, inline SVG character renderer, office backdrop, and keyboard controls.
// Reads content from window.GAME_DATA (loaded from data.js).

(function () {
  "use strict";

  const DATA = window.GAME_DATA;

  // Application state
  const state = {
    view: "intro", // "intro" | "phase" | "success" | "gameover" | "victory"
    phaseIndex: 0, // 0..6
    selectedOption: null
  };

  const stageContainer = document.getElementById("stageContainer");
  const progressTrack = document.getElementById("progressTrack");
  const fullscreenBtn = document.getElementById("fullscreenBtn");
  const restartTopBtn = document.getElementById("restartTopBtn");

  // ---------- Utility: HTML escaping ----------
  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  // ---------- Inline SVG Office Backdrop ----------
  function renderOfficeBackdrop(theme) {
    const isChaos = theme === "gameover";
    const isInbox = theme === "office-inbox";

    return `
      <svg class="office-backdrop" viewBox="0 0 1100 240" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
        <!-- Cubicle partition lines -->
        <rect x="0" y="0" width="1100" height="164" fill="transparent" />
        <line x1="340" y1="0" x2="340" y2="164" stroke="#cbd5e1" stroke-width="3" />
        <line x1="760" y1="0" x2="760" y2="164" stroke="#cbd5e1" stroke-width="3" />

        <!-- Wall Whiteboard with Post-its -->
        <rect x="375" y="18" width="230" height="104" rx="8" fill="#ffffff" stroke="#233b67" stroke-width="4" />
        <rect x="392" y="34" width="38" height="34" rx="3" fill="#ffd166" transform="rotate(-4 411 51)" />
        <rect x="442" y="32" width="38" height="34" rx="3" fill="#f4a261" transform="rotate(3 461 49)" />
        <rect x="492" y="36" width="38" height="34" rx="3" fill="#90e0ef" transform="rotate(-2 511 53)" />
        <rect x="544" y="34" width="38" height="34" rx="3" fill="#ffd166" transform="rotate(5 563 51)" />
        <line x1="395" y1="88" x2="575" y2="88" stroke="#94a3b8" stroke-width="4" stroke-linecap="round" />
        <line x1="395" y1="103" x2="520" y2="103" stroke="#cbd5e1" stroke-width="4" stroke-linecap="round" />

        <!-- Wall Clock -->
        <circle cx="675" cy="54" r="28" fill="#ffffff" stroke="#13223f" stroke-width="4" />
        <line x1="675" y1="54" x2="675" y2="36" stroke="#13223f" stroke-width="3.5" stroke-linecap="round" />
        <line x1="675" y1="54" x2="690" y2="54" stroke="#e76f51" stroke-width="3" stroke-linecap="round" />
        <circle cx="675" cy="54" r="3" fill="#13223f" />

        <!-- Left Desk Monitor -->
        <rect x="64" y="80" width="118" height="74" rx="8" fill="#1e293b" stroke="#13223f" stroke-width="4" />
        <rect x="74" y="90" width="98" height="54" rx="4" fill="${isChaos ? "#ff6b6b" : "#38bdf8"}" opacity="0.88" />
        <rect x="112" y="154" width="22" height="14" fill="#475569" />
        <rect x="94" y="166" width="58" height="7" rx="3" fill="#334155" />
        ${
          isChaos
            ? `<text x="123" y="125" text-anchor="middle" font-size="24" font-weight="900" fill="#ffffff">ERROR!</text>`
            : `<line x1="84" y1="105" x2="145" y2="105" stroke="#ffffff" stroke-width="4" stroke-linecap="round" />
               <line x1="84" y1="120" x2="128" y2="120" stroke="#e0f2fe" stroke-width="4" stroke-linecap="round" />
               <line x1="84" y1="134" x2="155" y2="134" stroke="#bae6fd" stroke-width="4" stroke-linecap="round" />`
        }

        <!-- Coffee Mug on Left Desk -->
        <rect x="215" y="138" width="28" height="32" rx="5" fill="#ffffff" stroke="#13223f" stroke-width="3" />
        <path d="M243 145 C254 145, 254 162, 243 162" fill="none" stroke="#13223f" stroke-width="3" />
        <path d="M224 132 Q221 122 226 116" fill="none" stroke="#94a3b8" stroke-width="2.5" stroke-linecap="round" />
        <path d="M234 132 Q231 122 236 116" fill="none" stroke="#94a3b8" stroke-width="2.5" stroke-linecap="round" />

        <!-- Right Office Plant -->
        <rect x="962" y="122" width="44" height="46" rx="6" fill="#d97757" stroke="#13223f" stroke-width="3.5" />
        <path d="M984 122 C966 94, 950 92, 956 72 C974 78, 982 98, 984 122 Z" fill="#2a9d8f" stroke="#13223f" stroke-width="3" />
        <path d="M984 122 C998 92, 1020 92, 1014 70 C996 78, 988 98, 984 122 Z" fill="#38b29b" stroke="#13223f" stroke-width="3" />
        <path d="M984 122 C982 88, 976 68, 986 56 C996 68, 990 88, 984 122 Z" fill="#1f8a70" stroke="#13223f" stroke-width="3" />

        <!-- Right Desk Monitor & Stack of Papers -->
        <rect x="815" y="88" width="110" height="68" rx="8" fill="#1e293b" stroke="#13223f" stroke-width="4" />
        <rect x="824" y="97" width="92" height="50" rx="4" fill="${isInbox ? "#fde68a" : "#a5f3fc"}" />
        <rect x="858" y="156" width="22" height="12" fill="#475569" />
        <rect x="842" y="166" width="54" height="7" rx="3" fill="#334155" />

        ${
          isInbox
            ? `<!-- Floating CV papers for inbox overflow -->
               <g opacity="0.9">
                 <rect x="260" y="34" width="38" height="46" rx="4" fill="#ffffff" stroke="#13223f" stroke-width="2.5" transform="rotate(-12 279 57)" />
                 <rect x="742" y="28" width="38" height="46" rx="4" fill="#ffffff" stroke="#13223f" stroke-width="2.5" transform="rotate(14 761 51)" />
                 <rect x="786" y="42" width="38" height="46" rx="4" fill="#fffbeb" stroke="#13223f" stroke-width="2.5" transform="rotate(-8 805 65)" />
                 <text x="870" y="129" text-anchor="middle" font-size="18" font-weight="900" fill="#13223f">342 CVs</text>
               </g>`
            : ""
        }
      </svg>
    `;
  }

  // ---------- Inline SVG Cartoon Characters ----------
  function renderFace(expression) {
    switch (expression) {
      case "happy":
        return `
          <!-- Happy curved eyes & wide smile -->
          <path d="M58 66 Q64 59 70 66" fill="none" stroke="#13223f" stroke-width="3.2" stroke-linecap="round" />
          <path d="M90 66 Q96 59 102 66" fill="none" stroke="#13223f" stroke-width="3.2" stroke-linecap="round" />
          <circle cx="54" cy="74" r="5" fill="#f4a261" opacity="0.45" />
          <circle cx="106" cy="74" r="5" fill="#f4a261" opacity="0.45" />
          <path d="M68 80 Q80 93 92 80" fill="none" stroke="#13223f" stroke-width="3.2" stroke-linecap="round" />
        `;
      case "surprised":
        return `
          <!-- Wide eyes & O mouth -->
          <path d="M56 54 Q64 49 71 54" fill="none" stroke="#13223f" stroke-width="2.8" stroke-linecap="round" />
          <path d="M89 54 Q96 49 104 54" fill="none" stroke="#13223f" stroke-width="2.8" stroke-linecap="round" />
          <circle cx="64" cy="66" r="6" fill="#ffffff" stroke="#13223f" stroke-width="2.8" />
          <circle cx="64" cy="66" r="2.6" fill="#13223f" />
          <circle cx="96" cy="66" r="6" fill="#ffffff" stroke="#13223f" stroke-width="2.8" />
          <circle cx="96" cy="66" r="2.6" fill="#13223f" />
          <ellipse cx="80" cy="84" rx="6.5" ry="8" fill="#13223f" />
        `;
      case "angry":
        return `
          <!-- Furrowed brows & frown -->
          <line x1="55" y1="55" x2="72" y2="61" stroke="#13223f" stroke-width="3.4" stroke-linecap="round" />
          <line x1="105" y1="55" x2="88" y2="61" stroke="#13223f" stroke-width="3.4" stroke-linecap="round" />
          <circle cx="64" cy="67" r="3.6" fill="#13223f" />
          <circle cx="96" cy="67" r="3.6" fill="#13223f" />
          <path d="M69 87 Q80 78 91 87" fill="none" stroke="#13223f" stroke-width="3.2" stroke-linecap="round" />
        `;
      case "worried":
        return `
          <!-- Raised inner brows, sweat drop, wavy mouth -->
          <line x1="56" y1="60" x2="71" y2="55" stroke="#13223f" stroke-width="3" stroke-linecap="round" />
          <line x1="104" y1="60" x2="89" y2="55" stroke="#13223f" stroke-width="3" stroke-linecap="round" />
          <circle cx="64" cy="67" r="3.6" fill="#13223f" />
          <circle cx="96" cy="67" r="3.6" fill="#13223f" />
          <path d="M68 84 Q74 80 80 84 T92 84" fill="none" stroke="#13223f" stroke-width="3" stroke-linecap="round" />
          <path d="M114 48 Q120 57 114 62 Q108 57 114 48 Z" fill="#38bdf8" stroke="#13223f" stroke-width="2" />
        `;
      case "disaster":
        return `
          <!-- X eyes, big sweat drops, zigzag panic mouth -->
          <line x1="58" y1="60" x2="70" y2="72" stroke="#13223f" stroke-width="3.4" stroke-linecap="round" />
          <line x1="70" y1="60" x2="58" y2="72" stroke="#13223f" stroke-width="3.4" stroke-linecap="round" />
          <line x1="90" y1="60" x2="102" y2="72" stroke="#13223f" stroke-width="3.4" stroke-linecap="round" />
          <line x1="102" y1="60" x2="90" y2="72" stroke="#13223f" stroke-width="3.4" stroke-linecap="round" />
          <path d="M65 86 L72 80 L80 87 L88 80 L95 86" fill="none" stroke="#13223f" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M116 44 Q123 54 116 60 Q109 54 116 44 Z" fill="#38bdf8" stroke="#13223f" stroke-width="2" />
          <path d="M42 46 Q48 54 42 59 Q36 54 42 46 Z" fill="#38bdf8" stroke="#13223f" stroke-width="2" />
        `;
      case "normal":
      default:
        return `
          <circle cx="64" cy="66" r="3.8" fill="#13223f" />
          <circle cx="96" cy="66" r="3.8" fill="#13223f" />
          <path d="M70 81 Q80 88 90 81" fill="none" stroke="#13223f" stroke-width="3.2" stroke-linecap="round" />
        `;
    }
  }

  function renderCharacterSvg(actor) {
    const { id, expression = "normal", hasBox = false } = actor;
    const face = renderFace(expression);

    // Character-specific designs
    if (id === "matias") {
      // Matías: navy suit, white shirt, red tie (crooked in disaster), slicked hair, coffee/hurried vibe
      const tieTransform = expression === "disaster" ? 'transform="rotate(14 80 120)"' : "";
      return `
        <svg viewBox="0 0 160 190" role="img" aria-label="Matías">
          <!-- Torso: Suit -->
          <path d="M32 186 C32 132, 46 112, 80 112 C114 112, 128 132, 128 186 Z" fill="#1e3a5f" stroke="#13223f" stroke-width="4" />
          <!-- White Shirt V -->
          <polygon points="65,112 95,112 80,152" fill="#ffffff" stroke="#13223f" stroke-width="3" />
          <!-- Red Tie -->
          <g ${tieTransform}>
            <polygon points="75,118 85,118 88,162 80,172 72,162" fill="#e63946" stroke="#13223f" stroke-width="2.8" />
          </g>
          <!-- Neck & Head -->
          <rect x="70" y="96" width="20" height="20" rx="6" fill="#f6c7a1" stroke="#13223f" stroke-width="3" />
          <circle cx="80" cy="68" r="35" fill="#f6c7a1" stroke="#13223f" stroke-width="4" />
          <!-- Slick Boss Hair -->
          <path d="M44 64 C44 30, 116 26, 116 62 C104 46, 62 42, 44 64 Z" fill="#3b2f2f" stroke="#13223f" stroke-width="3.5" />
          <!-- Stubble hint -->
          <path d="M54 84 Q80 104 106 84" fill="none" stroke="#c59472" stroke-width="4" opacity="0.4" stroke-linecap="round" />
          ${face}
          <!-- Watch/Coffee hand detail -->
          <circle cx="128" cy="158" r="10" fill="#f6c7a1" stroke="#13223f" stroke-width="3" />
          <rect x="130" y="138" width="20" height="24" rx="4" fill="#ffffff" stroke="#13223f" stroke-width="3" />
          <rect x="128" y="135" width="24" height="6" rx="2" fill="#6f4e37" stroke="#13223f" stroke-width="2.5" />
        </svg>
      `;
    }

    if (id === "camila") {
      // Camila: purple dev hoodie, ponytail, headphones, optional cardboard box in Phase 1
      const boxSvg = hasBox
        ? `
          <!-- Cardboard box with office stuff -->
          <g transform="translate(22, 128)">
            <!-- Mini cactus -->
            <ellipse cx="26" cy="4" rx="8" ry="13" fill="#2a9d8f" stroke="#13223f" stroke-width="2.5" />
            <!-- Mug peeking out -->
            <rect x="72" y="-6" width="22" height="22" rx="4" fill="#ffd166" stroke="#13223f" stroke-width="2.5" />
            <!-- Yellow post-it -->
            <rect x="46" y="-2" width="18" height="16" fill="#fff3b0" stroke="#13223f" stroke-width="2" transform="rotate(-8 55 6)" />
            <!-- Box body -->
            <rect x="0" y="10" width="116" height="48" rx="5" fill="#d9a066" stroke="#13223f" stroke-width="3.5" />
            <line x1="0" y1="22" x2="116" y2="22" stroke="#b67d43" stroke-width="3" />
            <text x="58" y="45" text-anchor="middle" font-size="14" font-weight="900" fill="#4a2e16">MIS COSAS</text>
          </g>
        `
        : "";

      return `
        <svg viewBox="0 0 160 190" role="img" aria-label="Camila">
          <!-- Ponytail -->
          <path d="M108 46 C132 48, 134 86, 114 96 C106 84, 110 64, 106 54 Z" fill="#2b213a" stroke="#13223f" stroke-width="3.5" />
          <!-- Hoodie Torso -->
          <path d="M34 186 C34 134, 48 112, 80 112 C112 112, 126 134, 126 186 Z" fill="#7c4dff" stroke="#13223f" stroke-width="4" />
          <!-- Hoodie Strings -->
          <line x1="70" y1="120" x2="70" y2="148" stroke="#ffffff" stroke-width="3" stroke-linecap="round" />
          <line x1="90" y1="120" x2="90" y2="148" stroke="#ffffff" stroke-width="3" stroke-linecap="round" />
          <!-- Headphones around neck -->
          <path d="M58 114 Q80 128 102 114" fill="none" stroke="#13223f" stroke-width="5" stroke-linecap="round" />
          <rect x="52" y="108" width="12" height="18" rx="5" fill="#ffd166" stroke="#13223f" stroke-width="2.5" />
          <rect x="96" y="108" width="12" height="18" rx="5" fill="#ffd166" stroke="#13223f" stroke-width="2.5" />
          <!-- Neck & Head -->
          <rect x="70" y="96" width="20" height="18" rx="6" fill="#f7cfb0" stroke="#13223f" stroke-width="3" />
          <circle cx="80" cy="68" r="35" fill="#f7cfb0" stroke="#13223f" stroke-width="4" />
          <!-- Hair bangs -->
          <path d="M44 66 C44 26, 116 26, 116 66 C102 48, 62 46, 44 66 Z" fill="#2b213a" stroke="#13223f" stroke-width="3.5" />
          ${face}
          ${boxSvg}
        </svg>
      `;
    }

    if (id === "gonzalo") {
      // Gonzalo: friendly green sweater over collared shirt, smart-casual dev
      return `
        <svg viewBox="0 0 160 190" role="img" aria-label="Gonzalo">
          <!-- Sweater Torso -->
          <path d="M34 186 C34 134, 48 112, 80 112 C112 112, 126 134, 126 186 Z" fill="#2b8a3e" stroke="#13223f" stroke-width="4" />
          <!-- Shirt Collar -->
          <polygon points="66,112 80,128 94,112" fill="#ffffff" stroke="#13223f" stroke-width="3" />
          <!-- Neck & Head -->
          <rect x="70" y="96" width="20" height="18" rx="6" fill="#f2c094" stroke="#13223f" stroke-width="3" />
          <circle cx="80" cy="68" r="35" fill="#f2c094" stroke="#13223f" stroke-width="4" />
          <!-- Fluffy Dev Hair -->
          <path d="M44 62 C42 32, 62 24, 80 28 C98 22, 118 34, 116 64 C104 46, 58 46, 44 62 Z" fill="#4a3728" stroke="#13223f" stroke-width="3.5" />
          ${face}
          <!-- Notebook / Laptop under arm -->
          <rect x="96" y="142" width="42" height="32" rx="5" fill="#e2e8f0" stroke="#13223f" stroke-width="3" />
          <circle cx="117" cy="158" r="4" fill="#13223f" />
        </svg>
      `;
    }

    // Default: Recruiter (Player / Psicólogo/a RRHH) — teal blazer, glasses, lanyard badge
    return `
      <svg viewBox="0 0 160 190" role="img" aria-label="Vos (RRHH)">
        <!-- Blazer Torso -->
        <path d="M34 186 C34 134, 48 112, 80 112 C112 112, 126 134, 126 186 Z" fill="#1d8a8a" stroke="#13223f" stroke-width="4" />
        <!-- Inner Cream Top -->
        <polygon points="66,112 94,112 88,186 72,186" fill="#fff8eb" stroke="#13223f" stroke-width="2.5" />
        <!-- RRHH Lanyard Badge -->
        <line x1="72" y1="112" x2="80" y2="146" stroke="#ffd166" stroke-width="3" />
        <line x1="88" y1="112" x2="80" y2="146" stroke="#ffd166" stroke-width="3" />
        <rect x="68" y="144" width="24" height="28" rx="4" fill="#ffffff" stroke="#13223f" stroke-width="2.5" />
        <rect x="73" y="150" width="14" height="5" rx="2" fill="#1d8a8a" />
        <rect x="73" y="159" width="10" height="4" rx="2" fill="#94a3b8" />
        <!-- Neck & Head -->
        <rect x="70" y="96" width="20" height="18" rx="6" fill="#f5c9a6" stroke="#13223f" stroke-width="3" />
        <circle cx="80" cy="68" r="35" fill="#f5c9a6" stroke="#13223f" stroke-width="4" />
        <!-- Hair -->
        <path d="M44 68 C42 28, 118 28, 116 68 C105 46, 56 46, 44 68 Z" fill="#5c3d2e" stroke="#13223f" stroke-width="3.5" />
        ${face}
        <!-- Glasses -->
        <rect x="52" y="57" width="24" height="17" rx="6" fill="rgba(255,255,255,0.28)" stroke="#13223f" stroke-width="2.8" />
        <rect x="84" y="57" width="24" height="17" rx="6" fill="rgba(255,255,255,0.28)" stroke="#13223f" stroke-width="2.8" />
        <line x1="76" y1="65" x2="84" y2="65" stroke="#13223f" stroke-width="2.8" />
      </svg>
    `;
  }

  function renderOfficeStage(actors, theme) {
    const actorsMarkup = actors
      .map((actor) => {
        const charMeta = DATA.characters[actor.id] || { name: actor.id };
        const animClass = `anim-${actor.animation || "none"}`;
        return `
          <div class="actor-slot">
            <div class="actor-svg-wrap ${animClass}">
              ${renderCharacterSvg(actor)}
            </div>
            <span class="actor-tag is-${escapeHtml(actor.id)}">${escapeHtml(charMeta.name)}</span>
          </div>
        `;
      })
      .join("");

    return `
      <section class="office-stage theme-${escapeHtml(theme)}" aria-label="Escena en la oficina">
        ${renderOfficeBackdrop(theme)}
        <div class="actors-row">
          ${actorsMarkup}
        </div>
      </section>
    `;
  }

  function renderDialogues(dialogues) {
    if (!dialogues || !dialogues.length) return "";
    return `
      <div class="dialogue-stack">
        ${dialogues
          .map((d) => {
            const meta = DATA.characters[d.speaker] || { name: d.speaker };
            return `
              <div class="speech-bubble speaker-${escapeHtml(d.speaker)}">
                <span class="speaker-name">${escapeHtml(meta.name)}</span>
                <p class="speech-text">${escapeHtml(d.text)}</p>
              </div>
            `;
          })
          .join("")}
      </div>
    `;
  }

  function renderSpecialCard(card) {
    if (!card) return "";

    if (card.type === "funny-cv") {
      return `
        <aside class="special-card" aria-label="CV destacado">
          <span class="special-badge">${escapeHtml(card.badge)}</span>
          <h2 class="funny-cv-title">${escapeHtml(card.title)}</h2>
          <ul class="funny-cv-list">
            ${card.lines.map((line) => `<li>${escapeHtml(line)}</li>`).join("")}
          </ul>
        </aside>
      `;
    }

    if (card.type === "techniques") {
      return `
        <aside class="special-card" aria-label="Técnicas aplicadas">
          <span class="special-badge">${escapeHtml(card.badge)}</span>
          <div class="techniques-grid">
            ${card.items
              .map(
                (item) => `
                <div class="technique-item">
                  <h3>${escapeHtml(item.name)}</h3>
                  <p>${escapeHtml(item.desc)}</p>
                </div>
              `
              )
              .join("")}
          </div>
        </aside>
      `;
    }

    if (card.type === "competencies") {
      return `
        <aside class="special-card" aria-label="Análisis por competencias">
          <span class="special-badge">${escapeHtml(card.badge)}</span>
          <div class="competencies-grid">
            ${card.candidates
              .map(
                (cand) => `
                <div class="candidate-card ${cand.winner ? "is-winner" : ""}">
                  <div class="candidate-header">
                    <span class="candidate-name">${escapeHtml(cand.name)}</span>
                    ${cand.winner ? `<span class="winner-tag">★ Mejor en conjunto</span>` : ""}
                  </div>
                  ${card.competencies
                    .map(
                      (comp, idx) => `
                      <div class="metric-row">
                        <div class="metric-labels">
                          <span>${escapeHtml(comp)}</span>
                          <span>${cand.scores[idx]}%</span>
                        </div>
                        <div class="metric-bar-track">
                          <div class="metric-bar-fill" style="width: ${cand.scores[idx]}%"></div>
                        </div>
                      </div>
                    `
                    )
                    .join("")}
                </div>
              `
              )
              .join("")}
          </div>
        </aside>
      `;
    }

    return "";
  }

  // ---------- Progress Bar Renderer ----------
  function renderProgressBar() {
    const activePhaseNum =
      state.view === "intro"
        ? 0
        : state.view === "victory"
          ? DATA.phases.length + 1
          : state.phaseIndex + 1;

    progressTrack.innerHTML = DATA.phases
      .map((phase) => {
        let statusClass = "";
        if (phase.id < activePhaseNum) statusClass = "is-done";
        else if (phase.id === activePhaseNum) statusClass = "is-active";

        return `
          <div class="progress-step ${statusClass}" title="Fase ${phase.id}: ${escapeHtml(phase.shortTitle)}">
            <span class="step-num">${phase.id < activePhaseNum ? "✓" : phase.id}</span>
            <span class="step-label">${escapeHtml(phase.shortTitle)}</span>
          </div>
        `;
      })
      .join("");

    restartTopBtn.hidden = state.view === "intro";
  }

  // ---------- Screen Renderers ----------
  function renderIntro() {
    const cast = [
      { id: "recruiter", expression: "happy", animation: "none" },
      { id: "camila", expression: "happy", animation: "wave", hasBox: true },
      { id: "matias", expression: "worried", animation: "shake" }
    ];

    stageContainer.innerHTML = `
      <article class="screen-card">
        <div class="screen-banner">
          <h1 class="screen-title">${escapeHtml(DATA.title)} · ${escapeHtml(DATA.subtitle)}</h1>
          <span class="phase-pill">7 fases</span>
        </div>

        ${renderOfficeStage(cast, "office-desk")}

        <div class="screen-body">
          <div class="intro-content">
            <span class="intro-badge">${escapeHtml(DATA.intro.badge)}</span>
            <h2 class="intro-headline">${escapeHtml(DATA.intro.headline)}</h2>
            <p class="intro-desc">${escapeHtml(DATA.intro.description)}</p>
            <p class="intro-hint">${escapeHtml(DATA.intro.hint)}</p>
          </div>

          <div class="actions-area">
            <button type="button" class="primary-btn" id="startBtn">
              <span>${escapeHtml(DATA.intro.startButton)}</span>
              <span class="btn-kbd-hint">Enter</span>
            </button>
          </div>
        </div>
      </article>
    `;

    document.getElementById("startBtn").addEventListener("click", startGame);
  }

  function renderPhase() {
    const phase = DATA.phases[state.phaseIndex];
    const isTransition = Boolean(phase.isTransition);

    const actionsMarkup = isTransition
      ? `
        <div class="actions-area">
          <button type="button" class="primary-btn" id="continueBtn">
            <span>${escapeHtml(phase.continueLabel || "Continuar")}</span>
            <span class="btn-kbd-hint">Enter</span>
          </button>
        </div>
      `
      : `
        <div class="actions-area">
          <p class="prompt-label">${escapeHtml(phase.prompt)}</p>
          <div class="options-grid">
            ${phase.options
              .map(
                (opt, idx) => `
                <button type="button" class="option-btn" data-option-index="${idx}">
                  <span class="option-key">${idx + 1}</span>
                  <span>${escapeHtml(opt.label)}</span>
                </button>
              `
              )
              .join("")}
          </div>
        </div>
      `;

    stageContainer.innerHTML = `
      <article class="screen-card">
        <div class="screen-banner">
          <h1 class="screen-title">${escapeHtml(phase.title)}</h1>
          <span class="phase-pill">Fase ${phase.id} de ${DATA.phases.length}</span>
        </div>

        ${renderOfficeStage(phase.actors, phase.sceneTheme)}

        <div class="screen-body">
          ${renderDialogues(phase.dialogues)}
          ${renderSpecialCard(phase.specialCard)}
          ${actionsMarkup}
        </div>
      </article>
    `;

    if (isTransition) {
      document.getElementById("continueBtn").addEventListener("click", goToNextPhase);
    } else {
      stageContainer.querySelectorAll(".option-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
          const idx = Number(btn.getAttribute("data-option-index"));
          chooseOption(idx);
        });
      });
    }
  }

  function renderSuccess() {
    const phase = DATA.phases[state.phaseIndex];
    const success = state.selectedOption.success;

    stageContainer.innerHTML = `
      <article class="screen-card">
        <div class="screen-banner is-success">
          <h1 class="screen-title">✓ ${escapeHtml(success.title)}</h1>
          <span class="phase-pill">Fase ${phase.id} superada</span>
        </div>

        ${renderOfficeStage(success.actors, phase.sceneTheme)}

        <div class="screen-body">
          ${renderDialogues(success.dialogues)}
          ${success.note ? `<div class="info-box">💡 ${escapeHtml(success.note)}</div>` : ""}
          ${renderSpecialCard(success.specialCard)}

          <div class="actions-area">
            <button type="button" class="primary-btn" id="nextPhaseBtn">
              <span>Continuar a la Fase ${phase.id + 1}</span>
              <span class="btn-kbd-hint">Enter</span>
            </button>
          </div>
        </div>
      </article>
    `;

    document.getElementById("nextPhaseBtn").addEventListener("click", goToNextPhase);
  }

  function renderGameOver() {
    const phase = DATA.phases[state.phaseIndex];
    const gameOver = state.selectedOption.gameOver;

    stageContainer.innerHTML = `
      <article class="screen-card is-gameover">
        <div class="screen-banner is-gameover">
          <h1 class="screen-title">💥 ${escapeHtml(gameOver.title)}</h1>
          <span class="phase-pill">Fase ${phase.id}</span>
        </div>

        ${renderOfficeStage(gameOver.actors, "gameover")}

        <div class="screen-body">
          <p class="gameover-story">${escapeHtml(gameOver.story)}</p>
          <p class="gameover-explanation">💡 ${escapeHtml(gameOver.explanation)}</p>

          <div class="actions-area">
            <button type="button" class="retry-btn" id="retryBtn">
              <span>↺ Reintentar esta fase (Fase ${phase.id})</span>
              <span class="btn-kbd-hint">Enter</span>
            </button>
          </div>
        </div>
      </article>
    `;

    document.getElementById("retryBtn").addEventListener("click", retryCurrentPhase);
  }

  function renderVictory() {
    const v = DATA.victory;

    stageContainer.innerHTML = `
      <article class="screen-card is-victory">
        <div class="screen-banner is-victory">
          <h1 class="screen-title">🎉 ${escapeHtml(v.title)}</h1>
          <span class="phase-pill">${escapeHtml(v.badge)}</span>
        </div>

        ${renderOfficeStage(v.actors, "victory")}

        <div class="screen-body">
          ${renderDialogues(v.dialogues)}

          <section class="summary-section" aria-label="Resumen del proceso">
            <h2>${escapeHtml(v.summaryTitle)}</h2>
            <div class="summary-grid">
              ${v.summarySteps
                .map(
                  (step) => `
                  <div class="summary-step">
                    <span class="summary-num">${step.num}</span>
                    <div class="summary-text">
                      <strong>${escapeHtml(step.title)}</strong>
                      <span>${escapeHtml(step.desc)}</span>
                    </div>
                  </div>
                `
                )
                .join("")}
            </div>
          </section>

          <div class="actions-area">
            <button type="button" class="primary-btn" id="replayBtn">
              <span>↺ ${escapeHtml(v.replayButton)}</span>
              <span class="btn-kbd-hint">Enter</span>
            </button>
          </div>
        </div>
      </article>
    `;

    document.getElementById("replayBtn").addEventListener("click", resetToIntro);
  }

  // ---------- Main Render Dispatcher ----------
  function render() {
    renderProgressBar();

    if (state.view === "intro") {
      renderIntro();
    } else if (state.view === "phase") {
      renderPhase();
    } else if (state.view === "success") {
      renderSuccess();
    } else if (state.view === "gameover") {
      renderGameOver();
    } else if (state.view === "victory") {
      renderVictory();
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // ---------- State Transitions ----------
  function startGame() {
    state.phaseIndex = 0;
    state.selectedOption = null;
    state.view = "phase";
    render();
  }

  function resetToIntro() {
    state.phaseIndex = 0;
    state.selectedOption = null;
    state.view = "intro";
    render();
  }

  function chooseOption(optionIndex) {
    const phase = DATA.phases[state.phaseIndex];
    const option = phase.options && phase.options[optionIndex];
    if (!option) return;

    state.selectedOption = option;

    if (!option.correct) {
      state.view = "gameover";
      render();
      return;
    }

    if (option.isVictory) {
      state.view = "victory";
      render();
      return;
    }

    state.view = "success";
    render();
  }

  function goToNextPhase() {
    if (state.phaseIndex + 1 < DATA.phases.length) {
      state.phaseIndex += 1;
      state.selectedOption = null;
      state.view = "phase";
    } else {
      state.view = "victory";
    }
    render();
  }

  function retryCurrentPhase() {
    // Restart strictly from the current phase, never from phase 1
    state.selectedOption = null;
    state.view = "phase";
    render();
  }

  // ---------- Fullscreen Helper ----------
  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen?.().catch(() => {});
    } else {
      document.exitFullscreen?.().catch(() => {});
    }
  }

  fullscreenBtn.addEventListener("click", toggleFullscreen);
  restartTopBtn.addEventListener("click", resetToIntro);

  document.addEventListener("fullscreenchange", () => {
    fullscreenBtn.textContent = document.fullscreenElement
      ? "✕ Salir pantalla completa"
      : "⛶ Pantalla completa";
  });

  // ---------- Keyboard Shortcuts (Classroom Presenter Mode) ----------
  document.addEventListener("keydown", (event) => {
    if (event.metaKey || event.ctrlKey || event.altKey) return;

    const key = event.key.toLowerCase();

    if (key === "f") {
      event.preventDefault();
      toggleFullscreen();
      return;
    }

    if (state.view === "intro") {
      if (key === "enter" || key === " ") {
        event.preventDefault();
        startGame();
      }
      return;
    }

    if (state.view === "phase") {
      const phase = DATA.phases[state.phaseIndex];
      if (phase.isTransition) {
        if (key === "enter" || key === " " || key === "1") {
          event.preventDefault();
          goToNextPhase();
        }
      } else {
        if (key === "1") {
          event.preventDefault();
          chooseOption(0);
        } else if (key === "2") {
          event.preventDefault();
          chooseOption(1);
        }
      }
      return;
    }

    if (state.view === "success") {
      if (key === "enter" || key === " ") {
        event.preventDefault();
        goToNextPhase();
      }
      return;
    }

    if (state.view === "gameover") {
      if (key === "enter" || key === " " || key === "r") {
        event.preventDefault();
        retryCurrentPhase();
      }
      return;
    }

    if (state.view === "victory") {
      if (key === "enter" || key === " ") {
        event.preventDefault();
        resetToIntro();
      }
    }
  });

  // Initial render
  render();
})();
