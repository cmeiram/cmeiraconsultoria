/**
 * Planos de investimento.
 *
 * Fonte única dos preços. Para alterar valores, adicionar ou remover um plano,
 * mexa apenas neste array — o markup se ajusta sozinho (Open/Closed).
 */
export const PLANS = [
  { name: "Plano mensal", price: "R$ 200,00", note: "renovação a cada mês" },
  { name: "Plano bimestral", price: "R$ 350,00", note: "dois meses de acompanhamento" },
  { name: "Plano semestral", price: "R$ 960,00", note: "seis meses de acompanhamento" },
  { name: "Plano anual", price: "R$ 1.680,00", note: "doze meses de acompanhamento", featured: true },
];

/**
 * Monta o card de um plano.
 *
 * @param {{name: string, price: string, note: string, featured?: boolean}} plan
 * @param {Document} doc
 * @returns {HTMLElement}
 */
function buildPlanCard(plan, doc) {
  const card = doc.createElement("div");
  card.className = plan.featured ? "plan plan-hi" : "plan";

  const parts = [
    ["span", "plan-name", plan.name],
    ["strong", "plan-price", plan.price],
    ["span", "plan-note", plan.note],
  ];

  for (const [tag, className, text] of parts) {
    const el = doc.createElement(tag);
    el.className = className;
    el.textContent = text;
    card.append(el);
  }

  return card;
}

/**
 * Renderiza a lista de planos dentro do container informado.
 *
 * @param {HTMLElement} container
 * @param {Array} plans
 */
export function renderPlans(container, plans = PLANS) {
  if (!container) return;

  const doc = container.ownerDocument;
  const fragment = doc.createDocumentFragment();

  for (const plan of plans) {
    fragment.append(buildPlanCard(plan, doc));
  }

  container.replaceChildren(fragment);
}
