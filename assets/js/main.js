/**
 * Ponto de entrada: liga os módulos aos elementos da página.
 */
import { initCarousel } from "./carousel.js";
import { initLightbox } from "./lightbox.js";
import { renderPlans } from "./plans.js";

const strip = document.querySelector("[data-strip]");

renderPlans(document.querySelector("[data-plans]"));

initCarousel({
  strip,
  prev: document.querySelector("[data-carousel-prev]"),
  next: document.querySelector("[data-carousel-next]"),
});

initLightbox({
  strip,
  dialog: document.querySelector("[data-lightbox]"),
  image: document.querySelector("[data-lightbox-image]"),
});
