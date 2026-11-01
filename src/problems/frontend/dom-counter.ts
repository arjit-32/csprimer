import type { Problem } from "../../types/problem";

const domCounter: Problem = {
  id: "dom-counter",
  title: "Filter Product Results by Search Term",
  mode: "dom",

  starterCode: `const searchInput = document.getElementById('search');
const cards = [...document.querySelectorAll('[data-name]')];

searchInput.addEventListener('input', (event) => {
  const query = event.target.value.trim().toLowerCase();

  cards.forEach((card) => {
    const name = card.dataset.name.toLowerCase();
    const matches = name.includes(query);
    card.style.display = matches ? 'flex' : 'none';
  });
});`,

  html: `
    <div id="app" style="font-family: system-ui, sans-serif; max-width: 620px; margin: 0 auto; padding: 20px;">
      <div style="margin-bottom:16px;">
        <label for="search" style="display:block; margin-bottom:8px; font-weight:600;">Search products</label>
        <input id="search" type="text" placeholder="Search by product name" style="width:100%; padding:12px 14px; border:1px solid #d1d5db; border-radius:10px; font-size:14px;" />
      </div>

      <div style="display:grid; gap:12px;">
        <div data-name="Apple iPhone 15 Pro" style="display:flex; justify-content:space-between; align-items:center; border:1px solid #e5e7eb; border-radius:12px; padding:14px 16px; background:#fff;">
          <span>Apple iPhone 15 Pro</span>
          <strong>$999</strong>
        </div>
        <div data-name="Samsung Galaxy S24" style="display:flex; justify-content:space-between; align-items:center; border:1px solid #e5e7eb; border-radius:12px; padding:14px 16px; background:#fff;">
          <span>Samsung Galaxy S24</span>
          <strong>$899</strong>
        </div>
        <div data-name="Sony WH-1000XM5" style="display:flex; justify-content:space-between; align-items:center; border:1px solid #e5e7eb; border-radius:12px; padding:14px 16px; background:#fff;">
          <span>Sony WH-1000XM5</span>
          <strong>$349</strong>
        </div>
        <div data-name="Dell XPS 13 Laptop" style="display:flex; justify-content:space-between; align-items:center; border:1px solid #e5e7eb; border-radius:12px; padding:14px 16px; background:#fff;">
          <span>Dell XPS 13 Laptop</span>
          <strong>$1299</strong>
        </div>
      </div>
    </div>
  `,

  tests: [{ input: [], expected: null }],
};

export default domCounter;
