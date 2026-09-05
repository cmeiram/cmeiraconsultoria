/**
 * Ponto de entrada: liga os módulos aos elementos da página.
 */
import { initCarousel } from "./carousel.js";
import { renderPlans } from "./plans.js";

renderPlans(document.querySelector("[data-plans]"));

initCarousel({
  strip: document.querySelector("[data-strip]"),
  prev: document.querySelector("[data-carousel-prev]"),
  next: document.querySelector("[data-carousel-next]"),
});
