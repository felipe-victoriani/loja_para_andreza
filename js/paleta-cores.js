/* ========================================
   MÓDULO PALETA DE CORES IDEAL
   Tom de pele + subtom + formato de rosto -> paleta de maquiagem sugerida

   Estrutura:
   1. Dados (tons de pele, subtons, formatos de rosto)
   2. Controller (seleção + render do resultado)
   3. Inicialização
======================================== */

// ========================================
// 1. DADOS
// ========================================

// Cada tom de pele tem uma paleta por subtom (base, blush, lábios, olhos)
// quente: dourado/pêssego/coral/terracota · frio: rosado/berry/ameixa/prata · neutro: equilíbrio entre os dois
const SKIN_TONES = [
  {
    id: "clara",
    label: "Pele Clara",
    swatch: "#f3d9c4",
    palettes: {
      quente: {
        Base: ["#f5dfc5", "#eccfae"],
        Blush: ["#f8b89a", "#f29c80"],
        Lábios: ["#e8836b", "#d0684f"],
        Olhos: ["#e3c08d", "#c99a6b", "#a8774f"],
      },
      frio: {
        Base: ["#f6e1db", "#efd0c8"],
        Blush: ["#f5b3c8", "#e897b3"],
        Lábios: ["#e07a9a", "#c45a7d"],
        Olhos: ["#d7c4d6", "#a99ab3", "#8a8a9e"],
      },
      neutro: {
        Base: ["#f7e6d7", "#f0d5bf"],
        Blush: ["#f7b7c5", "#f29fb3"],
        Lábios: ["#e8899c", "#d46a82"],
        Olhos: ["#d9b3ba", "#b98fa0", "#9b7e8f"],
      },
    },
  },
  {
    id: "media",
    label: "Pele Média",
    swatch: "#d9ad85",
    palettes: {
      quente: {
        Base: ["#e2b98a", "#d3a270"],
        Blush: ["#ea9474", "#d9785a"],
        Lábios: ["#c9634a", "#a84e3a"],
        Olhos: ["#d4a55c", "#b07a45", "#7d5a3c"],
      },
      frio: {
        Base: ["#e0b8a0", "#d0a28a"],
        Blush: ["#d9809e", "#c06688"],
        Lábios: ["#b24d74", "#93395e"],
        Olhos: ["#a88aa8", "#7e6a8a", "#5d5f78"],
      },
      neutro: {
        Base: ["#e3bd94", "#d4a67c"],
        Blush: ["#e8899c", "#c96f84"],
        Lábios: ["#c96f84", "#a85570"],
        Olhos: ["#b98fa0", "#9b7e8f", "#7b636a"],
      },
    },
  },
  {
    id: "morena",
    label: "Pele Morena",
    swatch: "#b97a52",
    palettes: {
      quente: {
        Base: ["#c58b58", "#a8713f"],
        Blush: ["#cc6f4e", "#b0573b"],
        Lábios: ["#a8452f", "#8a3524"],
        Olhos: ["#c9963f", "#9a6a35", "#5f6b3a"],
      },
      frio: {
        Base: ["#bf8a6c", "#a37158"],
        Blush: ["#b8577a", "#9c4466"],
        Lábios: ["#8f3657", "#732845"],
        Olhos: ["#8e6b8e", "#6b4f73", "#3f4a6b"],
      },
      neutro: {
        Base: ["#c48a60", "#a9713f"],
        Blush: ["#c96f84", "#a85570"],
        Lábios: ["#a85570", "#8c3f58"],
        Olhos: ["#9b7e8f", "#7b636a", "#c4a882"],
      },
    },
  },
  {
    id: "negra",
    label: "Pele Negra",
    swatch: "#6b4327",
    palettes: {
      quente: {
        Base: ["#7d4f2c", "#603b1f"],
        Blush: ["#b2532f", "#93401f"],
        Lábios: ["#8a2f1f", "#6b2416"],
        Olhos: ["#d4a23a", "#a8642a", "#3d2a17"],
      },
      frio: {
        Base: ["#76503e", "#5a3b2e"],
        Blush: ["#9c3f68", "#7e2f55"],
        Lábios: ["#6e2346", "#521a35"],
        Olhos: ["#a68fb0", "#5b3f6e", "#1f2440"],
      },
      neutro: {
        Base: ["#7a4f30", "#5e3a21"],
        Blush: ["#a85570", "#8c3f58"],
        Lábios: ["#8c3f58", "#6e2d44"],
        Olhos: ["#c4a882", "#7b636a", "#2a1c20"],
      },
    },
  },
];

// Subtom: define a "temperatura" da paleta. Neutro também serve para quem não sabe.
const UNDERTONES = [
  {
    id: "quente",
    label: "Quente",
    desc: "Veias esverdeadas, dourado valoriza",
    swatch: "#e0a96d",
    metal: "#d4a64a", // brinco do avatar
  },
  {
    id: "frio",
    label: "Frio",
    desc: "Veias azuladas ou roxas, prata valoriza",
    swatch: "#c9a0b8",
    metal: "#c4cad3",
  },
  {
    id: "neutro",
    label: "Neutro",
    desc: "Um pouco de cada, ou não sei",
    swatch: "#d4b5a0",
    metal: "#d9a59a", // rosé
  },
];

// Cada formato de rosto tem uma dica de aplicação (não muda a cor, muda a técnica)
// face/blush/mouthY/earX = geometria do avatar (viewBox 0 0 200 220). blush e earX
// descrevem o lado esquerdo; o direito é espelhado. rot > 0 = blush diagonal subindo p/ têmpora.
const FACE_SHAPES = [
  {
    id: "oval",
    label: "Oval",
    icon: "circle",
    tip: "Rosto equilibrado: quase toda técnica funciona. Aplique blush nas maçãs do rosto, em movimento circular, para manter a proporção natural.",
    face: "M100 41 C135 41 150 75 150 105 C150 140 128 169 100 169 C72 169 50 140 50 105 C50 75 65 41 100 41 Z",
    blush: { cx: 72, cy: 122, rx: 12, ry: 9, rot: 0 },
    mouthY: 142,
    earX: 52,
  },
  {
    id: "redondo",
    label: "Redondo",
    icon: "circle-dot",
    tip: "Contorno levemente diagonal nas laterais da testa e maxilar para alongar. Blush em linha diagonal, puxando para a têmpora.",
    face: "M100 46 C134 46 154 72 154 106 C154 142 130 166 100 166 C70 166 46 142 46 106 C46 72 66 46 100 46 Z",
    blush: { cx: 70, cy: 116, rx: 16, ry: 7, rot: 25 },
    mouthY: 140,
    earX: 48,
  },
  {
    id: "quadrado",
    label: "Quadrado",
    icon: "square",
    tip: "Suavize o maxilar com contorno nas laterais. Blush arredondado nas maçãs ajuda a abrandar os ângulos do rosto.",
    face: "M58 56 C66 44 134 44 142 56 C150 70 150 120 146 140 C142 158 124 166 100 166 C76 166 58 158 54 140 C50 120 50 70 58 56 Z",
    blush: { cx: 73, cy: 122, rx: 12, ry: 11, rot: 0 },
    mouthY: 142,
    earX: 51,
  },
  {
    id: "coracao",
    label: "Coração",
    icon: "heart",
    tip: "Contorno leve na testa e queixo pontudo. Blush horizontal nas maçãs equilibra a largura da testa.",
    face: "M100 42 C136 42 152 64 152 92 C152 122 128 152 100 170 C72 152 48 122 48 92 C48 64 64 42 100 42 Z",
    blush: { cx: 71, cy: 120, rx: 16, ry: 7, rot: 0 },
    mouthY: 140,
    earX: 54,
  },
  {
    id: "longo",
    label: "Longo",
    icon: "rectangle-horizontal",
    tip: "Blush horizontal nas maçãs do rosto (não diagonal) para reduzir a sensação de alongamento. Evite contorno pesado na testa e queixo.",
    face: "M100 34 C130 34 144 62 144 100 C144 146 126 176 100 176 C74 176 56 146 56 100 C56 62 70 34 100 34 Z",
    blush: { cx: 70, cy: 124, rx: 18, ry: 7, rot: 0 },
    mouthY: 148,
    earX: 57,
  },
];

// ========================================
// AVATAR (SVG gerado a partir das escolhas)
// ========================================

const AVATAR_COLORS = {
  placeholder: "#e9dfdc", // pele "em branco" antes do passo 1
  hair: "#2e201c",
  hairLight: "#6a4838",
  clothes: "#e8a8b7",
  clothesTrim: "#c96f84",
  backdrop: "#f7dfe6",
  eyeDark: "#1c1214",
  iris: "#5a3a2c",
};

// Contorno do olho esquerdo (usado no desenho e no recorte da íris)
const EYE_PATH = "M68 100 C73 93 87 92 93 99 C87 104 74 105 68 100 Z";

// Mistura um hex com outro (amt 0..1). Usado para sombras de pele.
function mixHex(hex, target, amt) {
  const a = hex.match(/\w\w/g).map((h) => parseInt(h, 16));
  const b = target.match(/\w\w/g).map((h) => parseInt(h, 16));
  return (
    "#" +
    a
      .map((v, i) => Math.round(v + (b[i] - v) * amt).toString(16).padStart(2, "0"))
      .join("")
  );
}

// Monta o SVG. colors = { skin, blush, lips, eyes, metal } (blush/eyes/metal podem ser null).
// uid evita conflito de ids (clipPath/gradientes) quando há 2 avatares na página.
// Peças simétricas (olho, sobrancelha, brinco...) são desenhadas do lado esquerdo e
// espelhadas com MIRROR.
function buildAvatarSvg({ shape, colors, label, uid }) {
  const { skin, blush, lips, eyes, metal } = colors;
  const C = AVATAR_COLORS;
  const skinShade = mixHex(skin, "#000000", 0.18);
  const neck = mixHex(skin, "#000000", 0.07);
  const lipLine = mixHex(lips, "#000000", 0.35);
  const lipLower = mixHex(lips, "#ffffff", 0.1);
  const b = shape.blush;
  const MIRROR = 'transform="translate(200 0) scale(-1 1)"';
  const both = (svg) => `${svg}<g ${MIRROR}>${svg}</g>`;

  // Blush esfumado (gradiente radial) na posição/ângulo da técnica do formato
  const blushEl = blush
    ? `<g clip-path="url(#face-clip-${uid})">${both(
        `<ellipse cx="${b.cx}" cy="${b.cy}" rx="${b.rx + 4}" ry="${b.ry + 3}" fill="url(#blush-${uid})" transform="rotate(${b.rot} ${b.cx} ${b.cy})"/>`,
      )}</g>`
    : "";

  // Iluminador: maçã do rosto + ponte do nariz
  const glowEl = `<g clip-path="url(#face-clip-${uid})">
      ${both(`<ellipse cx="${b.cx + 5}" cy="${b.cy - 9}" rx="9" ry="3.5" fill="url(#glow-${uid})"/>`)}
      <ellipse cx="100" cy="108" rx="2.6" ry="8" fill="url(#glow-${uid})"/>
    </g>`;

  // Sombra esfumada subindo da pálpebra
  const shadowEl = eyes
    ? both(`<path d="M62 101 C60 80 95 76 98 98 C90 90 72 90 62 101 Z" fill="url(#shadow-${uid})"/>`)
    : "";

  // Olho esquerdo completo (branco, íris, brilho, delineado com gatinho, cílios, côncavo)
  const eye = `
    <path d="M68 93 C74 87 88 86 94 93" fill="none" stroke="${skinShade}" stroke-opacity="0.45" stroke-width="1"/>
    <path d="${EYE_PATH}" fill="#ffffff"/>
    <g clip-path="url(#eye-clip-${uid})">
      <circle cx="80.5" cy="99" r="4.8" fill="${C.iris}"/>
      <circle cx="80.5" cy="99" r="2.3" fill="${C.eyeDark}"/>
      <circle cx="82.2" cy="97.4" r="1.2" fill="#ffffff"/>
    </g>
    <path d="M93 99 C87 91 73 91 68 99.5 L62.5 96 C70 89 88 88 93 99 Z" fill="${C.eyeDark}"/>
    <g stroke="${C.eyeDark}" stroke-width="1" stroke-linecap="round">
      <path d="M68 96.5 l-3.5 -3"/><path d="M71 94 l-2.5 -3.6"/><path d="M74.5 92.4 l-1.4 -3.8"/>
    </g>
    <path d="M70 101.5 C76 104.2 86 104 91 101" fill="none" stroke="${skinShade}" stroke-opacity="0.55" stroke-width="0.8"/>`;

  const brow = `<path d="M66 86 C71 79 84 76.5 93 79.5 C94.5 80.3 93.6 82 92 81.6 C84 80.4 74 81.6 67.5 87 Z" fill="${C.hair}"/>`;

  // Brinco: dourado/prata/rosé conforme o subtom (aparece depois do passo 2)
  const earring = metal
    ? `<g transform="translate(${shape.earX - 2} 0)">
         <circle cx="0" cy="122" r="2.4" fill="${metal}"/>
         <path d="M0 124 L0 130" stroke="${metal}" stroke-width="1"/>
         <circle cx="0" cy="134" r="4.2" fill="${metal}"/>
         <circle cx="-1.3" cy="132.6" r="1.2" fill="#ffffff" opacity="0.7"/>
       </g>`
    : "";

  // Mecha da frente que emoldura o rosto + reflexo
  const frontHair = `
    <path d="M100 22 C78 22 58 34 50 58 C44 78 46 106 42 134 C38 150 34 160 28 167 C44 161 50 147 52 128 C54 106 54 84 60 68 C68 48 84 36 100 30 Z" fill="url(#hair-${uid})"/>
    <path d="M78 34 C64 46 56 66 54 96" fill="none" stroke="${C.hairLight}" stroke-opacity="0.55" stroke-width="1.6" stroke-linecap="round"/>`;

  return `
    <svg viewBox="0 0 200 220" role="img" aria-label="${label}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <clipPath id="face-clip-${uid}"><path d="${shape.face}"/></clipPath>
        <!-- clip em userSpace: funciona também no olho espelhado -->
        <clipPath id="eye-clip-${uid}"><path d="${EYE_PATH}"/></clipPath>
        <radialGradient id="hair-${uid}" cx="50%" cy="20%" r="80%">
          <stop offset="0" stop-color="${C.hairLight}"/>
          <stop offset="0.55" stop-color="${C.hair}"/>
        </radialGradient>
        <radialGradient id="face-shade-${uid}" cx="50%" cy="42%" r="62%">
          <stop offset="0.6" stop-color="${skinShade}" stop-opacity="0"/>
          <stop offset="1" stop-color="${skinShade}" stop-opacity="0.55"/>
        </radialGradient>
        <radialGradient id="blush-${uid}">
          <stop offset="0" stop-color="${blush || skin}" stop-opacity="0.8"/>
          <stop offset="0.55" stop-color="${blush || skin}" stop-opacity="0.4"/>
          <stop offset="1" stop-color="${blush || skin}" stop-opacity="0"/>
        </radialGradient>
        <radialGradient id="glow-${uid}">
          <stop offset="0" stop-color="#ffffff" stop-opacity="0.5"/>
          <stop offset="1" stop-color="#ffffff" stop-opacity="0"/>
        </radialGradient>
        <linearGradient id="shadow-${uid}" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0.3" stop-color="${eyes || skin}" stop-opacity="1"/>
          <stop offset="1" stop-color="${eyes || skin}" stop-opacity="0"/>
        </linearGradient>
      </defs>

      <circle cx="100" cy="104" r="92" fill="${C.backdrop}"/>

      <!-- cabelo de trás, com pontas onduladas -->
      <path d="M100 16 C56 16 32 48 32 98 C32 132 26 160 20 186 C16 202 28 214 44 210 C52 216 64 214 70 208 L130 208 C136 214 148 216 156 210 C172 214 184 202 180 186 C174 160 168 132 168 98 C168 48 144 16 100 16 Z" fill="url(#hair-${uid})"/>

      <!-- pescoço, colo e blusa com decote V -->
      <path d="M83 146 L83 178 L70 182 L70 205 L130 205 L130 182 L117 178 L117 146 Z" fill="${neck}"/>
      <ellipse cx="100" cy="160" rx="19" ry="9" fill="${skinShade}" opacity="0.5"/>
      <path d="M85 188 C90 190 95 190 98 192 M115 188 C110 190 105 190 102 192" fill="none" stroke="${skinShade}" stroke-opacity="0.35" stroke-width="1" stroke-linecap="round"/>
      <path d="M14 220 C18 196 44 184 76 180 L100 206 L124 180 C156 184 182 196 186 220 Z" fill="${C.clothes}"/>
      <path d="M76 180 L100 206 L124 180" fill="none" stroke="${C.clothesTrim}" stroke-width="1.6" stroke-linejoin="round"/>

      <!-- rosto (formato muda) + sombreado nas bordas -->
      <path d="${shape.face}" fill="${skin}"/>
      <path d="${shape.face}" fill="url(#face-shade-${uid})"/>

      ${blushEl}
      ${glowEl}
      ${shadowEl}
      ${both(brow)}
      ${both(eye)}

      <!-- nariz -->
      <path d="M97 100 C97 110 95 115 94 119" fill="none" stroke="${skinShade}" stroke-opacity="0.35" stroke-width="1.4" stroke-linecap="round"/>
      <path d="M94 121 C96 124 98 123 100 123.6 C102 123 104 124 106 121" fill="none" stroke="${skinShade}" stroke-opacity="0.7" stroke-width="1.5" stroke-linecap="round"/>

      <!-- boca com arco do cupido + brilho -->
      <g transform="translate(0 ${shape.mouthY})">
        <path d="M85 0 C89 -2 94 -7 98 -6 C99 -5.5 100 -4.5 100 -4.5 C100 -4.5 101 -5.5 102 -6 C106 -7 111 -2 115 0 C108 1.5 92 1.5 85 0 Z" fill="${lips}"/>
        <path d="M85 0 C92 1.5 108 1.5 115 0 C112 8 106 11 100 11 C94 11 88 8 85 0 Z" fill="${lipLower}"/>
        <path d="M85 0 C92 1.6 108 1.6 115 0" fill="none" stroke="${lipLine}" stroke-width="0.9" stroke-linecap="round"/>
        <ellipse cx="97" cy="5.2" rx="4.2" ry="1.4" fill="#ffffff" opacity="0.45"/>
      </g>

      ${both(frontHair)}
      ${both(earring)}
    </svg>`;
}

// ========================================
// 2. CONTROLLER
// ========================================

const PaletaController = {
  selectedTone: null,
  selectedUndertone: null,
  selectedShape: null,
  // Cor escolhida pela cliente em cada categoria (Base/Blush/Lábios/Olhos) no resultado
  colorOverrides: {},

  init() {
    this.renderToneCards();
    this.renderUndertoneCards();
    this.renderShapeCards();
    this.bindEvents();
    this.renderAvatars();
    this.syncHeaderHeight();
  },

  // Expõe a altura do header sticky em --header-h para o avatar grudar logo abaixo
  syncHeaderHeight() {
    const header = document.querySelector(".header");
    if (!header) return;
    const update = () =>
      document.documentElement.style.setProperty("--header-h", `${header.offsetHeight}px`);
    update();
    window.addEventListener("resize", update);
  },

  // Paleta ativa (só existe com tom + subtom escolhidos)
  getPalette() {
    const tone = SKIN_TONES.find((t) => t.id === this.selectedTone);
    return tone && this.selectedUndertone ? tone.palettes[this.selectedUndertone] : null;
  },

  // Cores que o avatar deve usar agora: escolha da cliente > 1ª cor da paleta > padrão
  getAvatarColors() {
    const tone = SKIN_TONES.find((t) => t.id === this.selectedTone);
    const palette = this.getPalette();
    const pick = (cat) => this.colorOverrides[cat] || palette?.[cat][0] || null;
    const skin = pick("Base") || tone?.swatch || AVATAR_COLORS.placeholder;
    return {
      skin,
      blush: pick("Blush"),
      eyes: pick("Olhos"),
      // Sem paleta: boca "natural", um pouco mais escura que a pele
      lips: pick("Lábios") || mixHex(skin, "#b0606a", 0.35),
      metal: UNDERTONES.find((u) => u.id === this.selectedUndertone)?.metal || null,
    };
  },

  // Texto do status + aria-label do avatar, conforme o passo atual
  getAvatarText() {
    const tone = SKIN_TONES.find((t) => t.id === this.selectedTone);
    const ut = UNDERTONES.find((u) => u.id === this.selectedUndertone);
    const shape = FACE_SHAPES.find((s) => s.id === this.selectedShape);
    let status = "Pronto! Toque nas cores para testar no avatar";
    if (!tone) status = "Escolha seu tom de pele";
    else if (!ut) status = "Agora escolha o subtom";
    else if (!shape) status = "Por último, o formato do rosto";

    const parts = [tone?.label, ut && `subtom ${ut.label.toLowerCase()}`, shape && `rosto ${shape.label.toLowerCase()}`];
    const label = "Avatar" + (tone ? ": " + parts.filter(Boolean).join(", ") : " sem escolhas ainda");
    return { status, label };
  },

  // Redesenha o avatar ao vivo e, se existir, o do resultado
  renderAvatars() {
    const shape = FACE_SHAPES.find((s) => s.id === this.selectedShape) || FACE_SHAPES[0];
    const colors = this.getAvatarColors();
    const { status, label } = this.getAvatarText();

    const live = document.getElementById("avatar-live");
    if (live) live.innerHTML = buildAvatarSvg({ shape, colors, label, uid: "live" });
    const statusEl = document.getElementById("avatar-status");
    if (statusEl) statusEl.textContent = status;

    const result = document.getElementById("avatar-result");
    if (result) result.innerHTML = buildAvatarSvg({ shape, colors, label, uid: "result" });
  },

  renderToneCards() {
    const grid = document.getElementById("tone-grid");
    if (!grid) return;
    grid.innerHTML = SKIN_TONES.map(
      (tone) => `
        <button type="button" class="option-card" data-type="tone" data-id="${tone.id}" aria-pressed="false">
          <span class="swatch-circle" style="background:${tone.swatch}"></span>
          <span class="option-label">${tone.label}</span>
        </button>
      `,
    ).join("");
  },

  renderUndertoneCards() {
    const grid = document.getElementById("undertone-grid");
    if (!grid) return;
    grid.innerHTML = UNDERTONES.map(
      (ut) => `
        <button type="button" class="option-card" data-type="undertone" data-id="${ut.id}" aria-pressed="false">
          <span class="swatch-circle" style="background:${ut.swatch}"></span>
          <span class="option-label">${ut.label}</span>
          <span class="option-desc">${ut.desc}</span>
        </button>
      `,
    ).join("");
  },

  renderShapeCards() {
    const grid = document.getElementById("shape-grid");
    if (!grid) return;
    grid.innerHTML = FACE_SHAPES.map(
      (shape) => `
        <button type="button" class="option-card" data-type="shape" data-id="${shape.id}" aria-pressed="false">
          <i data-lucide="${shape.icon}"></i>
          <span class="option-label">${shape.label}</span>
        </button>
      `,
    ).join("");
    if (window.lucide) lucide.createIcons();
  },

  // Um único listener delegado: trata cards de opção e swatches do resultado
  bindEvents() {
    document.body.addEventListener("click", (e) => {
      const swatch = e.target.closest(".palette-swatch");
      if (swatch) return this.applySwatch(swatch);

      const card = e.target.closest(".option-card");
      if (card) this.selectOption(card);
    });
  },

  // Marca o card escolhido no seu grupo e atualiza o resultado
  selectOption(card) {
    const type = card.dataset.type;
    const id = card.dataset.id;
    const siblings = card.parentElement.querySelectorAll(".option-card");

    siblings.forEach((el) => {
      el.classList.remove("selected");
      el.setAttribute("aria-pressed", "false");
    });
    card.classList.add("selected");
    card.setAttribute("aria-pressed", "true");

    if (type === "tone") this.selectedTone = id;
    if (type === "undertone") this.selectedUndertone = id;
    if (type === "shape") this.selectedShape = id;

    // Paleta mudou: escolhas de cor antigas não valem mais
    if (type !== "shape") this.colorOverrides = {};

    // Resultado primeiro: ele cria o #avatar-result que renderAvatars preenche
    this.renderResult();
    this.renderAvatars();
  },

  // Aplica a cor no avatar, marca o swatch ativo da categoria e copia o hex
  applySwatch(swatch) {
    const { hex, category } = swatch.dataset;
    this.colorOverrides[category] = hex;

    swatch.parentElement.querySelectorAll(".palette-swatch").forEach((el) => {
      el.classList.toggle("active", el === swatch);
      el.setAttribute("aria-pressed", String(el === swatch));
    });

    this.renderAvatars();
    this.copyHex(hex, `Cor ${hex} aplicada no avatar e copiada!`);
  },

  // Copia o hex e avisa na tela (clipboard só existe em HTTPS/localhost)
  copyHex(hex, successMsg = `Cor ${hex} copiada!`) {
    if (!navigator.clipboard) {
      this.showToast(`Cor ${hex} aplicada no avatar.`);
      return;
    }
    navigator.clipboard
      .writeText(hex)
      .then(() => this.showToast(successMsg))
      .catch(() => this.showToast(`Cor ${hex} aplicada no avatar.`));
  },

  // Toast visível + anunciado por leitor de tela (região aria-live no HTML)
  showToast(message) {
    const toast = document.getElementById("palette-toast");
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("visible");
    clearTimeout(this.toastTimer);
    this.toastTimer = setTimeout(() => toast.classList.remove("visible"), 2000);
  },

  renderResult() {
    const resultSection = document.getElementById("resultado");
    // Renderiza dentro do .container para manter largura/gutter do layout
    const resultContainer = resultSection?.querySelector(".container");
    if (!resultContainer) return;

    // Só mostra o resultado com os 3 passos respondidos
    if (!this.selectedTone || !this.selectedUndertone || !this.selectedShape) {
      resultSection.classList.remove("visible");
      return;
    }

    const tone = SKIN_TONES.find((t) => t.id === this.selectedTone);
    const undertone = UNDERTONES.find((u) => u.id === this.selectedUndertone);
    const shape = FACE_SHAPES.find((s) => s.id === this.selectedShape);

    const paletteHtml = Object.entries(tone.palettes[undertone.id])
      .map(
        ([category, colors]) => `
          <div class="palette-category">
            <h4>${category}</h4>
            <div class="palette-swatches">
              ${colors
                .map((hex) => {
                  // Ativo = cor que está aplicada no avatar agora
                  const active = (this.colorOverrides[category] || colors[0]) === hex;
                  return `<button type="button" class="palette-swatch${active ? " active" : ""}" style="background:${hex}" data-hex="${hex}" data-category="${category}" title="${hex}" aria-pressed="${active}" aria-label="Aplicar cor ${hex} (${category}) no avatar e copiar"></button>`;
                })
                .join("")}
            </div>
          </div>
        `,
      )
      .join("");

    resultContainer.innerHTML = `
      <h3><i data-lucide="sparkles"></i> Sua Paleta Ideal</h3>
      <p class="result-subtitle">${tone.label} · Subtom ${undertone.label} · Rosto ${shape.label}</p>
      <div class="result-layout">
        <div class="avatar-frame avatar-result" id="avatar-result"></div>
        <div class="palette-grid">${paletteHtml}</div>
      </div>
      <div class="face-tip">
        <i data-lucide="lightbulb"></i>
        <p>${shape.tip}</p>
      </div>
      <a href="../index.html#maquiagens" class="btn btn-primary">Ver Maquiagens</a>
    `;
    resultSection.classList.add("visible");
    if (window.lucide) lucide.createIcons();
    // Respeita quem prefere menos movimento
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    resultSection.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
  },
};

// ========================================
// 3. INICIALIZAÇÃO
// ========================================

document.addEventListener("DOMContentLoaded", () => PaletaController.init());
