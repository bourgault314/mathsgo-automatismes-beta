(() => {
  'use strict';

  const icon = document.querySelector('.theme-icon-truchet svg');
  if (!icon) return;

  const svgNs = 'http://www.w3.org/2000/svg';
  const baseLayer = icon.querySelector('[data-truchet-base]');
  const routeLayer = icon.querySelector('[data-truchet-route]');
  if (!baseLayer || !routeLayer) return;

  const now = new Date();
  const dayKey = [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('-');
  let seed = 2166136261;
  for (const char of `mathsgo-truchet-${dayKey}`) {
    seed ^= char.charCodeAt(0);
    seed = Math.imul(seed, 16777619);
  }
  seed >>>= 0;

  const random = () => {
    seed += 0x6D2B79F5;
    let value = seed;
    value = Math.imul(value ^ (value >>> 15), value | 1);
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
    return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
  };

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
    const paths = orientation === 'a'
      ? {
          T: `M${x + radius} ${y}A${radius} ${radius} 0 0 1 ${x} ${y + radius}`,
          L: `M${x + radius} ${y}A${radius} ${radius} 0 0 1 ${x} ${y + radius}`,
          R: `M${x + cell} ${y + radius}A${radius} ${radius} 0 0 0 ${x + radius} ${y + cell}`,
          B: `M${x + cell} ${y + radius}A${radius} ${radius} 0 0 0 ${x + radius} ${y + cell}`
        }
      : {
          T: `M${x + radius} ${y}A${radius} ${radius} 0 0 0 ${x + cell} ${y + radius}`,
          R: `M${x + radius} ${y}A${radius} ${radius} 0 0 0 ${x + cell} ${y + radius}`,
          L: `M${x} ${y + radius}A${radius} ${radius} 0 0 1 ${x + radius} ${y + cell}`,
          B: `M${x} ${y + radius}A${radius} ${radius} 0 0 1 ${x + radius} ${y + cell}`
        };
    return paths[edge];
  };

  const appendPath = (layer, d) => {
    const path = document.createElementNS(svgNs, 'path');
    path.setAttribute('d', d);
    layer.append(path);
  };

  orientations.forEach((row, rowIndex) => row.forEach((orientation, columnIndex) => {
    appendPath(baseLayer, pathFor(rowIndex, columnIndex, orientation, 'T'));
    appendPath(baseLayer, pathFor(rowIndex, columnIndex, orientation, orientation === 'a' ? 'R' : 'L'));
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
  const highlightedRoute = orderedStarts
    .map(follow)
    .reduce((longest, route) => route.length > longest.length ? route : longest, []);
  highlightedRoute.forEach(d => appendPath(routeLayer, d));
})();
