/**
 * Ampliação de foto em modal.
 *
 * Usa o <dialog> nativo, que já entrega fechar com Esc, prender o foco dentro do
 * modal e inertizar o resto da página — nada disso precisa ser reimplementado.
 *
 * Como o carrossel tem 19 fotos, o clique é capturado por delegação: um listener
 * na faixa, não um por imagem.
 */

/**
 * Mostra a foto no modal, herdando o texto alternativo da miniatura.
 *
 * @param {HTMLDialogElement} dialog
 * @param {HTMLImageElement} target imagem dentro do modal
 * @param {HTMLImageElement} source miniatura clicada
 */
function open(dialog, target, source) {
  target.src = source.src;
  target.alt = source.alt;
  target.width = source.width;
  target.height = source.height;
  dialog.showModal();
}

/**
 * Liga as miniaturas da faixa ao modal.
 *
 * @param {{strip: HTMLElement, dialog: HTMLDialogElement, image: HTMLImageElement}} elements
 */
export function initLightbox({ strip, dialog, image }) {
  if (!strip || !dialog || !image) return;

  strip.addEventListener("click", (event) => {
    const trigger = event.target.closest("[data-zoom]");
    if (!trigger) return;

    const source = trigger.querySelector("img");
    if (source) open(dialog, image, source);
  });

  // Com showModal(), um clique no ::backdrop tem o próprio <dialog> como alvo.
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });

  dialog.querySelector("[data-lightbox-close]")?.addEventListener("click", () => {
    dialog.close();
  });
}
