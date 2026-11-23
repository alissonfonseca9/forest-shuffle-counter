import { copy, localize } from './language';

const placements = {
  [localize('acima')]: 'top',
  [localize('esquerda')]: 'left',
  [localize('direita')]: 'right',
  [localize('abaixo')]: 'bottom',
};

export function enhanceTable(board) {
  const forest = board.querySelector('#forest');
  const selection = board.querySelector('#chosen');
  const score = board.querySelector('#score');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let lastScore = score.textContent;

  function updateSlots() {
    for (const tree of forest.children) {
      const treeName = tree.querySelector('.tree-info strong')?.textContent;
      for (const slot of tree.querySelectorAll('.slot')) {
        const label = slot.firstElementChild;
        if (label.querySelector('button')) continue;

        const button = document.createElement('button');
        button.type = 'button';
        button.disabled = forest.dataset.finalized === 'true';
        button.className = 'slot-placement';
        button.textContent = label.textContent.replace(/\s*\+$/, '');
        button.setAttribute('aria-label', copy('Colocar carta: ', 'Place card: ') + button.textContent.toLowerCase() + ' · ' + treeName);
        label.replaceChildren(button);
      }
    }
  }

  function updatePlacement() {
    // A posição do exemplar já vem da seleção. A validação continua na mesa.
    const position = selection.textContent.split(' · ').at(-1);
    forest.dataset.placement = placements[position] ?? '';
    forest.classList.toggle('has-selection', selection.textContent.startsWith(copy('Selecionada:', 'Selected:')));
  }

  const observer = new MutationObserver(records => {
    if (records.some(record => record.target === forest)) updateSlots();
    updatePlacement();
    const newScore = score.textContent;
    if (newScore && newScore !== lastScore && !reducedMotion.matches) {
      score.animate?.([{ opacity: .68, transform: 'translateY(3px)' }, { opacity: 1, transform: 'translateY(0)' }], {
        duration: 220,
        easing: 'ease-out',
      });
    }
    lastScore = newScore;
  });

  observer.observe(forest, { childList: true });
  observer.observe(selection, { childList: true });
  observer.observe(score, { childList: true });
  updateSlots();
  updatePlacement();

  return () => observer.disconnect();
}
