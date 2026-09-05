/**
 * Carrossel horizontal de fotos.
 *
 * Recebe os elementos por parâmetro e não consulta o documento — a lógica não
 * depende de nenhuma estrutura global e pode ser exercitada isoladamente.
 */

/** Tolerância em px para não considerar a posição atual como "próxima parada". */
const EPSILON = 2;

/**
 * Posição de scroll de cada item, em px, relativa ao início da faixa.
 *
 * @param {HTMLElement} strip
 * @returns {number[]}
 */
function getStops(strip) {
  const padding = parseFloat(getComputedStyle(strip).paddingLeft) || 0;
  const origin = strip.getBoundingClientRect().left - strip.scrollLeft + padding;

  return Array.from(strip.children, (child) =>
    Math.round(child.getBoundingClientRect().left - origin)
  );
}

/**
 * Próxima parada na direção pedida, ou a extremidade se não houver mais itens.
 *
 * @param {number[]} stops
 * @param {number} current posição de scroll atual
 * @param {number} direction 1 avança, -1 retrocede
 * @param {number} maxScroll limite direito da faixa
 * @returns {number}
 */
function findTarget(stops, current, direction, maxScroll) {
  const target =
    direction > 0
      ? stops.find((stop) => stop > current + EPSILON)
      : stops.filter((stop) => stop < current - EPSILON).pop();

  if (target != null) return target;
  return direction > 0 ? maxScroll : 0;
}

/**
 * Move a faixa em um item.
 *
 * @param {HTMLElement} strip
 * @param {number} direction 1 avança, -1 retrocede
 */
export function scrollByItem(strip, direction) {
  const target = findTarget(getStops(strip), strip.scrollLeft, direction, strip.scrollWidth);
  strip.scrollTo({ left: target, behavior: "smooth" });
}

/**
 * Liga os botões e o teclado à faixa.
 *
 * @param {{strip: HTMLElement, prev: HTMLElement, next: HTMLElement}} elements
 */
export function initCarousel({ strip, prev, next }) {
  if (!strip) return;

  prev?.addEventListener("click", () => scrollByItem(strip, -1));
  next?.addEventListener("click", () => scrollByItem(strip, 1));

  // A faixa é focável (tabindex no HTML); as setas do teclado navegam item a item.
  strip.addEventListener("keydown", (event) => {
    const direction = { ArrowRight: 1, ArrowLeft: -1 }[event.key];
    if (!direction) return;

    event.preventDefault();
    scrollByItem(strip, direction);
  });
}
