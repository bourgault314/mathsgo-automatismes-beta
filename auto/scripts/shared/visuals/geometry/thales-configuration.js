(function registerThalesConfiguration(global){
  const colors={navy:'#0b3570',blue:'#11468c',teal:'#1daeae',orange:'#ff9114',softTeal:'#effcfc'};
  const defaults={A:'A',M:'M',N:'N',B:'B',C:'C'};
  const point=(x,y,color)=>`<circle cx="${x}" cy="${y}" r="3.2" fill="${color}"/>`;
  const label=(x,y,value,color,anchor='middle')=>`<text x="${x}" y="${y}" text-anchor="${anchor}" font-family="Arial,Helvetica,sans-serif" font-size="17" font-style="italic" font-weight="800" fill="${color}">${value}</text>`;

  function nested(labels){
    return `<polygon points="50,145 347,211 308.5,24" fill="${colors.softTeal}"/>`
      +`<path d="M50 145L347 211M50 145L308.5 24" fill="none" stroke="${colors.navy}" stroke-width="3" stroke-linecap="butt" stroke-linejoin="miter"/>`
      +`<path d="M347 211L308.5 24" fill="none" stroke="${colors.teal}" stroke-width="3.3" stroke-linecap="butt"/>`
      +`<path d="M192.45 176.9L174.3 86.7" fill="none" stroke="${colors.blue}" stroke-width="3" stroke-dasharray="7 6" stroke-linecap="butt"/>`
      +point(50,145,colors.orange)+point(192.45,176.9,colors.blue)+point(174.3,86.7,colors.blue)+point(347,211,colors.teal)+point(308.5,24,colors.teal)
      +label(34,139,labels.A,colors.orange,'end')+label(194,202,labels.M,colors.blue)+label(158,80,labels.N,colors.blue,'end')+label(362,216,labels.B,colors.teal,'start')+label(314,18,labels.C,colors.teal,'start')
      +label(211,127,'('+labels.M+labels.N+')',colors.blue)+label(356,111,'('+labels.B+labels.C+')',colors.teal);
  }

  function butterfly(labels){
    return `<path d="M78.45 82.1L200 125L387 191M107.05 193.2L200 125L343 20.5" fill="none" stroke="${colors.navy}" stroke-width="3" stroke-linecap="butt" stroke-linejoin="miter"/>`
      +`<path d="M78.45 82.1L107.05 193.2" fill="none" stroke="${colors.blue}" stroke-width="3" stroke-dasharray="7 6" stroke-linecap="butt"/>`
      +`<path d="M387 191L343 20.5" fill="none" stroke="${colors.teal}" stroke-width="3.3" stroke-linecap="butt"/>`
      +point(200,125,colors.orange)+point(78.45,82.1,colors.blue)+point(107.05,193.2,colors.blue)+point(387,191,colors.teal)+point(343,20.5,colors.teal)
      +label(200,113,labels.A,colors.orange)+label(63,77,labels.M,colors.blue,'end')+label(91,213,labels.N,colors.blue,'end')+label(402,197,labels.B,colors.teal,'start')+label(349,17,labels.C,colors.teal,'start')
      +label(62,142,'('+labels.M+labels.N+')',colors.blue)+label(396,106,'('+labels.B+labels.C+')',colors.teal);
  }

  function render(data={}){
    const configuration=data.configuration==='butterfly'?'butterfly':'nested';
    const labels=Object.assign({},defaults,data.labels||{});
    const viewBox=configuration==='butterfly'?'0 0 430 230':'0 0 400 240';
    const body=configuration==='butterfly'?butterfly(labels):nested(labels);
    const description=configuration==='butterfly'?'Configuration de Thalès en papillon':'Configuration de Thalès avec triangles emboîtés';
    return `<svg class="thales-configuration-svg" viewBox="${viewBox}" role="img" aria-label="${description}">${body}</svg>`;
  }

  const presets=Object.freeze([
    Object.freeze({id:'emboitee',label:'Triangles emboîtés',data:Object.freeze({configuration:'nested'})}),
    Object.freeze({id:'papillon',label:'Configuration papillon',data:Object.freeze({configuration:'butterfly'})})
  ]);
  global.MATHSGO_VISUALS.register('geometry.thales-configuration',{
    version:'0.1.0',label:'Configurations de Thalès',family:'Géométrie',
    description:'Reprend la géométrie validée de la fiche méthode maths&go v9.',
    presets,render
  });
})(globalThis);
