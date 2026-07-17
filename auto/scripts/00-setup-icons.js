(() => {
  'use strict';

  const STATIC_ICONS = {
    numbers: '<svg viewBox="0 0 36 36" focusable="false"><rect x="3.5" y="5" width="29" height="26" rx="5" fill="#fffaf3" stroke="#173a5e" stroke-width="1.3"/><g fill="none" stroke="#aebfd1" stroke-width="1.2" stroke-linecap="round"><path d="M7.5 12h21M7.5 18h21M7.5 24h21"/></g><g stroke="#fffdf8" stroke-width=".72"><circle cx="10.5" cy="12" r="2.55" fill="#08aaa5"/><circle cx="16" cy="12" r="2.55" fill="#08aaa5"/><circle cx="25.5" cy="12" r="2.55" fill="#0b67b2"/><circle cx="12.5" cy="18" r="2.55" fill="#f58220"/><circle cx="21" cy="18" r="2.55" fill="#f58220"/><circle cx="26.5" cy="18" r="2.55" fill="#f58220"/><circle cx="9.5" cy="24" r="2.55" fill="#0b67b2"/><circle cx="18.5" cy="24" r="2.55" fill="#08aaa5"/><circle cx="24" cy="24" r="2.55" fill="#08aaa5"/></g></svg>',
    data: '<svg viewBox="0 0 36 36" focusable="false"><rect x="3.5" y="4.5" width="29" height="27" rx="4.5" fill="#fffaf5" stroke="#173a5e" stroke-width="1.3"/><path d="M8 27.5h20" fill="none" stroke="#9eb0c2" stroke-width="1.1" stroke-linecap="round"/><g stroke="#fffdf8" stroke-width=".55"><rect x="8.5" y="19" width="4.25" height="8.5" rx=".8" fill="#08aaa5"/><rect x="13.55" y="13" width="4.25" height="14.5" rx=".8" fill="#0b67b2"/><rect x="18.6" y="16.5" width="4.25" height="11" rx=".8" fill="#6553b8"/><rect x="23.65" y="8.5" width="4.25" height="19" rx=".8" fill="#f58220"/></g></svg>',
    algorithm: '<svg viewBox="0 0 36 36" focusable="false"><rect x="4" y="4.5" width="28" height="27" rx="4" fill="#f5f4ff" stroke="#4f5fb3" stroke-width="1.2"/><g fill="none" stroke="#c7ccee" stroke-width=".85"><path d="M13.3 5v26M22.7 5v26M4.5 13.5h27M4.5 22.5h27"/></g><circle cx="8.8" cy="27" r="2.4" fill="#08aaa5" stroke="#087f78" stroke-width=".8"/><path d="M9 27h9v-9h9V9" fill="none" stroke="#6553b8" stroke-width="2.35" stroke-linecap="round" stroke-linejoin="round"/><path d="M27 9V4.8" fill="none" stroke="#b95016" stroke-width="1.35" stroke-linecap="round"/><path d="M27 4.8h5.6L27 8.4Z" fill="#f58220" stroke="#b95016" stroke-width=".7" stroke-linejoin="round"/></svg>'
  };

  function pageSeed(){
    if (globalThis.crypto?.getRandomValues) {
      const values = new Uint32Array(1);
      globalThis.crypto.getRandomValues(values);
      return values[0];
    }
    return (Date.now() ^ Math.floor(Math.random() * 0xffffffff)) >>> 0;
  }

  // Une composition nouvelle à chaque chargement, mais immuable pendant la
  // séance : modifier un réglage ne doit pas changer l'identité du domaine.
  const GEOMETRY_SEED = pageSeed();

  function seededRandom(seed){
    let state = seed;
    return () => {
      state += 0x6D2B79F5;
      let value = state;
      value = Math.imul(value ^ (value >>> 15), value | 1);
      value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
      return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
    };
  }

  function geometryIcon(){
    const random = seededRandom(GEOMETRY_SEED);
    const size = 4;
    const cell = 7;
    const origin = 4;
    const radius = cell / 2;
    const orientations = Array.from({ length: size }, () =>
      Array.from({ length: size }, () => (random() < 0.5 ? 'a' : 'b'))
    );

    const pairFor = (orientation, edge) => {
      const pairs = orientation === 'a'
        ? { T: 'L', L: 'T', R: 'B', B: 'R' }
        : { T: 'R', R: 'T', L: 'B', B: 'L' };
      return pairs[edge];
    };

    const pathFor = (row, column, orientation, edge) => {
      const x = origin + column * cell;
      const y = origin + row * cell;
      return orientation === 'a'
        ? (edge === 'T' || edge === 'L'
          ? `M${x + radius} ${y}A${radius} ${radius} 0 0 1 ${x} ${y + radius}`
          : `M${x + cell} ${y + radius}A${radius} ${radius} 0 0 0 ${x + radius} ${y + cell}`)
        : (edge === 'T' || edge === 'R'
          ? `M${x + radius} ${y}A${radius} ${radius} 0 0 0 ${x + cell} ${y + radius}`
          : `M${x} ${y + radius}A${radius} ${radius} 0 0 1 ${x + radius} ${y + cell}`);
    };

    const basePaths = [];
    orientations.forEach((row, rowIndex) => row.forEach((orientation, columnIndex) => {
      basePaths.push(pathFor(rowIndex, columnIndex, orientation, 'T'));
      basePaths.push(pathFor(rowIndex, columnIndex, orientation, orientation === 'a' ? 'R' : 'L'));
    }));

    const boundaryStarts = [];
    for (let index = 0; index < size; index += 1) {
      boundaryStarts.push(
        { row: 0, column: index, edge: 'T' },
        { row: index, column: size - 1, edge: 'R' },
        { row: size - 1, column: index, edge: 'B' },
        { row: index, column: 0, edge: 'L' }
      );
    }

    const follow = start => {
      const route = [];
      const visited = new Set();
      let current = { ...start };
      while (current.row >= 0 && current.row < size && current.column >= 0 && current.column < size) {
        const orientation = orientations[current.row][current.column];
        const exit = pairFor(orientation, current.edge);
        const arcKey = `${current.row}:${current.column}:${[current.edge, exit].sort().join('')}`;
        if (visited.has(arcKey)) break;
        visited.add(arcKey);
        route.push(pathFor(current.row, current.column, orientation, current.edge));
        if (exit === 'T') current = { row: current.row - 1, column: current.column, edge: 'B' };
        if (exit === 'R') current = { row: current.row, column: current.column + 1, edge: 'L' };
        if (exit === 'B') current = { row: current.row + 1, column: current.column, edge: 'T' };
        if (exit === 'L') current = { row: current.row, column: current.column - 1, edge: 'R' };
      }
      return route;
    };

    const offset = Math.floor(random() * boundaryStarts.length);
    const orderedStarts = boundaryStarts.slice(offset).concat(boundaryStarts.slice(0, offset));
    const routePaths = orderedStarts
      .map(follow)
      .reduce((longest, route) => route.length > longest.length ? route : longest, []);
    const baseMarkup = basePaths.map(d => `<path d="${d}"/>`).join('');
    const routeMarkup = routePaths.map(d => `<path d="${d}"/>`).join('');
    return `<svg viewBox="0 0 36 36" focusable="false"><rect x="3.5" y="3.5" width="29" height="29" rx="4.5" fill="#f4fbfa" stroke="#167f7b" stroke-width="1.1"/><g fill="none" stroke="#167f7b" stroke-width="1.2" stroke-linecap="round">${baseMarkup}</g><g fill="none" stroke="#f58220" stroke-width="2" stroke-linecap="round">${routeMarkup}</g></svg>`;
  }

  function iconMarkup(theme){
    if (theme === 'geometry') return geometryIcon();
    return STATIC_ICONS[theme] || '';
  }

  function renderThemeIcons(root = document){
    const groups = [];
    if (root.matches && root.matches('.theme-group')) groups.push(root);
    if (root.querySelectorAll) groups.push(...root.querySelectorAll('.theme-group'));
    groups.forEach(group => {
      const target = group.querySelector('.theme-summary .theme-icon');
      if (!target) return;
      const theme = group.dataset.theme || '';
      if (target.dataset.iconRendered === theme && target.firstElementChild) return;
      target.classList.toggle('theme-icon-truchet', theme === 'geometry');
      target.innerHTML = iconMarkup(theme);
      target.dataset.iconRendered = theme;
    });
  }

  function installMenuObserver(){
    const box = document.getElementById('modules');
    if (!box || !globalThis.MutationObserver) return;
    let queued = false;
    const scheduleRender = () => {
      if (queued) return;
      queued = true;
      const run = () => {
        queued = false;
        renderThemeIcons(box);
      };
      if (typeof queueMicrotask === 'function') queueMicrotask(run);
      else setTimeout(run, 0);
    };
    new MutationObserver(scheduleRender).observe(box, { childList: true, subtree: true });
  }

  globalThis.MATHSGO_SETUP_ICONS = Object.freeze({
    render: renderThemeIcons,
    markup: iconMarkup
  });

  const start = () => {
    renderThemeIcons();
    installMenuObserver();
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start, { once: true });
  } else {
    start();
  }
})();
