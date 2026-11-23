import React, { useLayoutEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import markup from './legacy-markup';
import logic from './legacy-logic';
import './legacy.css';
import './bosque.css';
import './relief.css';
import { enhanceTable } from './table-ui';
import { copy, english, localize } from './language';

const sections = [
  { id: 'catalog-panel', name: copy('Cartas', 'Cards') },
  { id: 'forest-title', name: copy('Floresta', 'Forest') },
  { id: 'score-panel', name: copy('Pontuação', 'Score') },
];

function LegacyBoard() {
  const board = useRef(null);
  useLayoutEffect(() => {
    const script = document.createElement('script');
    script.textContent = localize(logic);
    document.body.appendChild(script);
    const cleanup = enhanceTable(board.current);
    return () => {
      cleanup();
      script.remove();
    };
  }, []);

  return <div className="legacy-app" ref={board} dangerouslySetInnerHTML={{ __html: localize(markup) }} />;
}

function Navigation({ compact = false }) {
  return (
    <nav className={compact ? 'quick-nav' : 'desktop-nav'} aria-label={compact ? copy('Atalhos da mesa', 'Table shortcuts') : copy('Navegação da mesa', 'Table navigation')}>
      {sections.map(({ id, name }) => <a key={id} href={'#' + id}>{name}</a>)}
    </nav>
  );
}

function LanguageNavigation() {
  function retainSection(event) {
    event.currentTarget.hash = window.location.hash;
  }

  return (
    <nav className="language-nav" aria-label={copy('Idioma', 'Language')}>
      <a href="/" hrefLang="pt-BR" lang="pt-BR" aria-current={!english ? 'page' : undefined} onClick={retainSection}>
        <span className="language-flag flag-br" aria-hidden="true" /> Português
      </a>
      <a href="/en/" hrefLang="en" lang="en" aria-current={english ? 'page' : undefined} onClick={retainSection}>
        <span className="language-flag flag-us" aria-hidden="true" /> English
      </a>
    </nav>
  );
}

function Masthead() {
  return (
    <header className="app-masthead">
      <div className="masthead-inner">
        <div className="brand">
          <span className="brand-mark" aria-hidden="true"><span /></span>
          <div>
            <h1>Bosque</h1>
            <span className="brand-subtitle">{copy('Calculadora para Forest Shuffle', 'Forest Shuffle score calculator')}</span>
          </div>
        </div>
        <Navigation />
        <div className="masthead-actions">
          <LanguageNavigation />
          <button type="button" onClick={() => document.getElementById('help').click()}>{copy('Como usar', 'How to use')}</button>
          <button type="button" className="start-game" onClick={() => document.getElementById('reset').click()}>{copy('Nova partida', 'New game')}</button>
        </div>
      </div>
    </header>
  );
}

function App() {
  return (
    <>
      <Masthead />
      <LegacyBoard />
      <Navigation compact />
    </>
  );
}

createRoot(document.getElementById('root')).render(<App />);
