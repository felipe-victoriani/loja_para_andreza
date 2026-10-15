/* ========================================
   MÓDULO PALETA DE CORES IDEAL
   Tom de pele + formato de rosto -> paleta de maquiagem sugerida

   Estrutura:
   1. Dados (tons de pele, formatos de rosto)
   2. Controller (seleção + render do resultado)
   3. Inicialização
======================================== */

// ========================================
// 1. DADOS
// ========================================

// Cada tom de pele tem uma paleta de maquiagem (base, blush, lábios, olhos)
const SKIN_TONES = [
  {
    id: "clara",
    label: "Pele Clara",
    swatch: "#f3d9c4",
    palette: {
      Base: ["#f7e6d7", "#f0d5bf"],
      Blush: ["#f7b7c5", "#f29fb3"],
      Lábios: ["#e8899c", "#d46a82"],
      Olhos: ["#d9b3ba", "#b98fa0", "#9b7e8f"],
    },
  },
  {
    id: "media",
    label: "Pele Média",
    swatch: "#d9ad85",
    palette: {
      Base: ["#e3bd94", "#d4a67c"],
      Blush: ["#e8899c", "#c96f84"],
      Lábios: ["#c96f84", "#a85570"],
      Olhos: ["#b98fa0", "#9b7e8f", "#7b636a"],
    },
  },
  {
    id: "morena",
    label: "Pele Morena",
    swatch: "#b97a52",
    palette: {
      Base: ["#c48a60", "#a9713f"],
      Blush: ["#c96f84", "#a85570"],
      Lábios: ["#a85570", "#8c3f58"],
      Olhos: ["#9b7e8f", "#7b636a", "#c4a882"],
    },
  },
  {
    id: "negra",
    label: "Pele Negra",
    swatch: "#6b4327",
    palette: {
      Base: ["#7a4f30", "#5e3a21"],
      Blush: ["#a85570", "#8c3f58"],
      Lábios: ["#8c3f58", "#6e2d44"],
      Olhos: ["#c4a882", "#7b636a", "#2a1c20"],
    },
  },
];

// Cada formato de rosto tem uma dica de aplicação (não muda a cor, muda a técnica)
const FACE_SHAPES = [
  {
    id: "oval",
    label: "Oval",
    icon: "circle",
    tip: "Rosto equilibrado: quase toda técnica funciona. Aplique blush nas maçãs do rosto, em movimento circular, para manter a proporção natural.",
  },
  {
    id: "redondo",
    label: "Redondo",
    icon: "circle-dot",
    tip: "Contorno levemente diagonal nas laterais da testa e maxilar para alongar. Blush em linha diagonal, puxando para a têmpora.",
  },
  {
    id: "quadrado",
    label: "Quadrado",
    icon: "square",
    tip: "Suavize o maxilar com contorno nas laterais. Blush arredondado nas maçãs ajuda a abrandar os ângulos do rosto.",
  },
  {
    id: "coracao",
    label: "Coração",
    icon: "heart",
    tip: "Contorno leve na testa e queixo pontudo. Blush horizontal nas maçãs equilibra a largura da testa.",
  },
  {
    id: "longo",
    label: "Longo",
    icon: "rectangle-horizontal",
    tip: "Blush horizontal nas maçãs do rosto (não diagonal) para reduzir a sensação de alongamento. Evite contorno pesado na testa e queixo.",
  },
];

// ========================================
// 2. CONTROLLER
// ========================================

const PaletaController = {
  selectedTone: null,
  selectedShape: null,

  init() {
    this.renderToneCards();
    this.renderShapeCards();
    this.bindEvents();
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
      if (swatch) return this.copyHex(swatch.dataset.hex);

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
    if (type === "shape") this.selectedShape = id;

    this.renderResult();
  },

  // Copia o hex e avisa na tela (clipboard só existe em HTTPS/localhost)
  copyHex(hex) {
    if (!navigator.clipboard) {
      this.showToast(`Cor ${hex}. Copie manualmente.`);
      return;
    }
    navigator.clipboard
      .writeText(hex)
      .then(() => this.showToast(`Cor ${hex} copiada!`))
      .catch(() => this.showToast(`Não foi possível copiar ${hex}.`));
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

    if (!this.selectedTone || !this.selectedShape) {
      resultSection.classList.remove("visible");
      return;
    }

    const tone = SKIN_TONES.find((t) => t.id === this.selectedTone);
    const shape = FACE_SHAPES.find((s) => s.id === this.selectedShape);

    const paletteHtml = Object.entries(tone.palette)
      .map(
        ([category, colors]) => `
          <div class="palette-category">
            <h4>${category}</h4>
            <div class="palette-swatches">
              ${colors
                .map(
                  (hex) =>
                    `<button type="button" class="palette-swatch" style="background:${hex}" data-hex="${hex}" title="${hex}" aria-label="Copiar cor ${hex} (${category})"></button>`,
                )
                .join("")}
            </div>
          </div>
        `,
      )
      .join("");

    resultContainer.innerHTML = `
      <h3><i data-lucide="sparkles"></i> Sua Paleta Ideal</h3>
      <p class="result-subtitle">${tone.label} + Rosto ${shape.label}</p>
      <div class="palette-grid">${paletteHtml}</div>
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
