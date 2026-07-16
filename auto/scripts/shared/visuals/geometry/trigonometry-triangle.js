(function registerTrigonometryTriangle(global){
  const registry=global.MATHSGO_VISUALS;
  if(!registry) throw new Error('Le registre visuel doit être chargé avant geometry.trigonometry-triangle.');

  const escape=value=>String(value??'').replace(/[&<>"']/g,character=>({
    '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
  }[character]));

  function trigSvgPoint(point){ return point.x.toFixed(1)+' '+point.y.toFixed(1); }
  function trigUnitVector(from,to){
    const dx=to.x-from.x,dy=to.y-from.y,length=Math.hypot(dx,dy)||1;
    return {x:dx/length,y:dy/length};
  }
  function trigOffset(point,vector,distance){ return {x:point.x+vector.x*distance,y:point.y+vector.y*distance}; }
  function trigReadableAngle(from,to){
    let angle=Math.atan2(to.y-from.y,to.x-from.x)*180/Math.PI;
    if(angle>90) angle-=180;
    if(angle<-90) angle+=180;
    return angle;
  }
  function trigLabelPosition(from,to,centroid,distance=19){
    const midpoint={x:(from.x+to.x)/2,y:(from.y+to.y)/2},direction=trigUnitVector(from,to);
    const normal={x:-direction.y,y:direction.x};
    const first=trigOffset(midpoint,normal,distance),second=trigOffset(midpoint,normal,-distance);
    const firstDistance=Math.hypot(first.x-centroid.x,first.y-centroid.y);
    const secondDistance=Math.hypot(second.x-centroid.x,second.y-centroid.y);
    return firstDistance>=secondDistance?first:second;
  }
  function trigTransformPoint(point,index){
    const orientation=Math.abs(Number(index)||0)%8,x=point.x,y=point.y;
    return [
      {x,y},{x:-x,y},{x,y:-y},{x:-x,y:-y},
      {x:y,y:x},{x:-y,y:x},{x:y,y:-x},{x:-y,y:-x}
    ][orientation];
  }
  function trigFitLayout(points,{left=48,right=332,top=38,bottom=200}={}){
    const minX=Math.min(...points.map(point=>point.x)),maxX=Math.max(...points.map(point=>point.x));
    const minY=Math.min(...points.map(point=>point.y)),maxY=Math.max(...points.map(point=>point.y));
    const sourceWidth=Math.max(1,maxX-minX),sourceHeight=Math.max(1,maxY-minY);
    const scale=Math.min((right-left)/sourceWidth,(bottom-top)/sourceHeight);
    const width=sourceWidth*scale,height=sourceHeight*scale;
    const offsetX=left+(right-left-width)/2-minX*scale;
    const offsetY=top+(bottom-top-height)/2-minY*scale;
    return points.map(point=>({x:point.x*scale+offsetX,y:point.y*scale+offsetY}));
  }
  function trigTriangleLayout(index,shape=0,shapeRatio=null){
    const ratios=[0.48,0.68,0.92,1.28,1.72];
    const requested=Number(shapeRatio);
    const ratio=Number.isFinite(requested)&&requested>0?Math.max(.26,Math.min(2.25,requested)):ratios[Math.abs(Number(shape)||0)%ratios.length];
    const base=[{x:0,y:0},{x:1,y:0},{x:1,y:-ratio}];
    return trigFitLayout(base.map(point=>trigTransformPoint(point,index)));
  }
  function trigTriangleSvg(triangle,sideLabels={}){
    const label=(key,fallback)=>escape(String(sideLabels[key]??fallback));
    const [anglePoint,rightPoint,otherPoint]=trigTriangleLayout(triangle.orientation,triangle.shape,triangle.shapeRatio);
    const centroid={x:(anglePoint.x+rightPoint.x+otherPoint.x)/3,y:(anglePoint.y+rightPoint.y+otherPoint.y)/3};
    const rightToAngle=trigUnitVector(rightPoint,anglePoint),rightToOther=trigUnitVector(rightPoint,otherPoint),rightSize=18;
    const rightOne=trigOffset(rightPoint,rightToAngle,rightSize);
    const rightTwo=trigOffset(rightOne,rightToOther,rightSize);
    const rightThree=trigOffset(rightPoint,rightToOther,rightSize);
    const angleToRight=trigUnitVector(anglePoint,rightPoint),angleToOther=trigUnitVector(anglePoint,otherPoint),angleRadius=34;
    const angleStart=trigOffset(anglePoint,angleToRight,angleRadius),angleEnd=trigOffset(anglePoint,angleToOther,angleRadius);
    const angleSweep=angleToRight.x*angleToOther.y-angleToRight.y*angleToOther.x>0?1:0;
    const angleBisector=trigUnitVector({x:0,y:0},{x:angleToRight.x+angleToOther.x,y:angleToRight.y+angleToOther.y});
    const angleMark=trigOffset(anglePoint,angleBisector,48);
    const vertexLabel=(point,name)=>{
      const outward=trigUnitVector(centroid,point),position=trigOffset(point,outward,20);
      return '<text x="'+position.x.toFixed(1)+'" y="'+position.y.toFixed(1)+'" dominant-baseline="middle" text-anchor="middle" font-family="serif" font-style="italic" font-size="23" fill="#17384d">'+name+'</text>';
    };
    const sideLabel=(from,to,text,color)=>{
      const position=trigLabelPosition(from,to,centroid),rotation=trigReadableAngle(from,to);
      return '<text x="'+position.x.toFixed(1)+'" y="'+position.y.toFixed(1)+'" dominant-baseline="middle" text-anchor="middle" font-size="18" font-weight="850" fill="'+color+'" transform="rotate('+rotation.toFixed(1)+' '+position.x.toFixed(1)+' '+position.y.toFixed(1)+')">'+text+'</text>';
    };
    return '<svg class="trig-question-svg" viewBox="0 0 380 235" role="img" aria-label="Triangle '+triangle.angle+triangle.right+triangle.other+' rectangle en '+triangle.right+'">'
      +'<polygon points="'+trigSvgPoint(anglePoint)+' '+trigSvgPoint(rightPoint)+' '+trigSvgPoint(otherPoint)+'" fill="#eef6ff" stroke="#17384d" stroke-width="3" stroke-linejoin="round"/>'
      +'<path d="M'+trigSvgPoint(rightOne)+' L'+trigSvgPoint(rightTwo)+' L'+trigSvgPoint(rightThree)+'" fill="none" stroke="#e86100" stroke-width="4"/>'
      +'<path d="M'+trigSvgPoint(angleStart)+' A'+angleRadius+' '+angleRadius+' 0 0 '+angleSweep+' '+trigSvgPoint(angleEnd)+'" fill="none" stroke="#e86100" stroke-width="4"/>'
      +vertexLabel(anglePoint,triangle.angle)+vertexLabel(rightPoint,triangle.right)+vertexLabel(otherPoint,triangle.other)
      +sideLabel(anglePoint,rightPoint,label('adjacent',triangle.adjacent),'#0879d0')
      +sideLabel(rightPoint,otherPoint,label('opposite',triangle.opposite),'#b23a48')
      +sideLabel(anglePoint,otherPoint,label('hypotenuse',triangle.hypotenuse),'#7651b5')
      +'<text x="'+angleMark.x.toFixed(1)+'" y="'+angleMark.y.toFixed(1)+'" dominant-baseline="middle" text-anchor="middle" font-size="16" font-weight="900" fill="#e86100">'+triangle.angle+'̂</text></svg>';
  }

  function trigGeneralTriangleSvg(triangle,sideLabels={}){
    const shapes=[
      [{x:0,y:1},{x:.45,y:0},{x:1.2,y:.92}],
      [{x:0,y:.85},{x:.78,y:0},{x:1.25,y:1}],
      [{x:0,y:1},{x:.28,y:.08},{x:1.35,y:.78}],
      [{x:0,y:.72},{x:.9,y:0},{x:1.25,y:1.02}],
      [{x:0,y:.95},{x:.62,y:0},{x:1.4,y:.66}]
    ];
    const base=shapes[Math.abs(Number(triangle.shape)||0)%shapes.length];
    const points=trigFitLayout(base.map(point=>trigTransformPoint(point,triangle.orientation)),{left:55,right:325,top:35,bottom:198});
    const centroid={x:points.reduce((sum,point)=>sum+point.x,0)/3,y:points.reduce((sum,point)=>sum+point.y,0)/3};
    const names=[triangle.angle,triangle.right,triangle.other];
    const edges=[
      [points[0],points[1],sideLabels.left??triangle.adjacent,'#0879d0'],
      [points[1],points[2],sideLabels.right??triangle.opposite,'#b23a48'],
      [points[0],points[2],sideLabels.base??triangle.hypotenuse,'#7651b5']
    ];
    const vertexLabels=points.map((point,index)=>{
      const outward=trigUnitVector(centroid,point),position=trigOffset(point,outward,20);
      return '<text x="'+position.x.toFixed(1)+'" y="'+position.y.toFixed(1)+'" dominant-baseline="middle" text-anchor="middle" font-family="serif" font-style="italic" font-size="23" fill="#17384d">'+names[index]+'</text>';
    }).join('');
    const edgeLabels=edges.map(([from,to,value,color])=>{
      const position=trigLabelPosition(from,to,centroid),rotation=trigReadableAngle(from,to);
      return '<text x="'+position.x.toFixed(1)+'" y="'+position.y.toFixed(1)+'" dominant-baseline="middle" text-anchor="middle" font-size="18" font-weight="850" fill="'+color+'" transform="rotate('+rotation.toFixed(1)+' '+position.x.toFixed(1)+' '+position.y.toFixed(1)+')">'+escape(String(value))+'</text>';
    }).join('');
    return '<svg class="trig-question-svg" viewBox="0 0 380 235" role="img" aria-label="Triangle '+triangle.angle+triangle.right+triangle.other+' sans angle droit indiqué">'
      +'<polygon points="'+points.map(trigSvgPoint).join(' ')+'" fill="#fff8e8" stroke="#17384d" stroke-width="3" stroke-linejoin="round"/>'
      +vertexLabels+edgeLabels+'</svg>';
  }

  function trigSimilaritySvg(scale=2){
    const first={x:25,y:185},firstRight={x:145,y:185},firstTop={x:145,y:95};
    const second={x:260,y:185},secondRight={x:490,y:185},secondTop={x:490,y:25};
    const triangle=(a,b,c,adj,opp,hyp)=>'<polygon points="'+[a,b,c].map(trigSvgPoint).join(' ')+'" fill="#eef6ff" stroke="#17384d" stroke-width="3"/>'
      +'<path d="M'+(b.x-16)+' '+b.y+' L'+(b.x-16)+' '+(b.y-16)+' L'+b.x+' '+(b.y-16)+'" fill="none" stroke="#e86100" stroke-width="4"/>'
      +'<text x="'+((a.x+b.x)/2)+'" y="210" text-anchor="middle" font-size="17" font-weight="850" fill="#0879d0">'+adj+'</text>'
      +'<text x="'+(b.x+18)+'" y="'+((b.y+c.y)/2)+'" text-anchor="middle" font-size="17" font-weight="850" fill="#b23a48">'+opp+'</text>'
      +'<text x="'+((a.x+c.x)/2-8)+'" y="'+((a.y+c.y)/2-8)+'" text-anchor="middle" font-size="17" font-weight="850" fill="#7651b5">'+hyp+'</text>'
      +'<text x="'+(a.x+30)+'" y="'+(a.y-10)+'" font-size="17" font-weight="900" fill="#e86100">α</text>';
    return '<svg class="trig-question-svg" viewBox="0 0 520 225" role="img" aria-label="Deux triangles rectangles semblables ayant le même angle alpha">'
      +triangle(first,firstRight,firstTop,4,3,5)
      +triangle(second,secondRight,secondTop,4*scale,3*scale,5*scale)
      +'</svg>';
  }

  function render(data={}){
    let svg;
    if(data.variant==='general') svg=trigGeneralTriangleSvg(data.triangle||{},data.sideLabels||{});
    else if(data.variant==='similarity') svg=trigSimilaritySvg(data.scale);
    else svg=trigTriangleSvg(data.triangle||{},data.sideLabels||{});
    return data.className?svg.replace('class="trig-question-svg"','class="'+escape(data.className)+'"'):svg;
  }

  const base={angle:'A',right:'B',other:'C',adjacent:'AB',opposite:'BC',hypotenuse:'AC'};
  const presets=Array.from({length:8},(_,orientation)=>({
    id:'orientation-'+orientation,
    label:'Triangle rectangle · orientation '+(orientation+1),
    supports:['phone','computer','projection','print'],
    data:{triangle:{...base,orientation,shape:orientation%5}}
  }));
  presets.push(
    {id:'longueurs',label:'Longueurs connues et côté cherché',supports:['phone','computer','projection','print'],data:{triangle:{...base,orientation:5,shapeRatio:.75},sideLabels:{adjacent:'8 cm',opposite:'6 cm',hypotenuse:'?'}}},
    {id:'triangle-general',label:'Choix de méthode sans angle droit codé',supports:['phone','computer','projection','print'],data:{variant:'general',triangle:{...base,orientation:2,shape:3},sideLabels:{left:'7 cm',right:'9 cm',base:'11 cm'}}},
    {id:'triangles-semblables',label:'Deux triangles semblables',supports:['computer','projection','print'],data:{variant:'similarity',scale:2}}
  );

  registry.register('geometry.trigonometry-triangle',{
    label:'Triangle de trigonométrie orientable',
    version:'1.0.0',
    supports:['phone','computer','projection','print'],
    parameters:['variant','triangle.angle','triangle.right','triangle.other','triangle.orientation','triangle.shape','triangle.shapeRatio','sideLabels','scale'],
    presets,
    render
  });

  global.trigTriangleSvg=trigTriangleSvg;
  global.trigGeneralTriangleSvg=trigGeneralTriangleSvg;
  global.trigSimilaritySvg=trigSimilaritySvg;
})(globalThis);
