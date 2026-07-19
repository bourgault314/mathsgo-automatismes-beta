import assert from 'node:assert/strict';
import fs from 'node:fs';
import test from 'node:test';
import vm from 'node:vm';

const engineSource=fs.readFileSync('auto/scripts/02-question-engine.js','utf8');
const engineCore=engineSource.slice(0,engineSource.indexOf('function subVars'));
const volumeModule=fs.readFileSync('auto/scripts/modules/geometry/dnb_23.js','utf8');
const relationsModule=fs.readFileSync('auto/scripts/modules/numbers/dnb_09.js','utf8');
const engineContext=vm.createContext({console});

vm.runInContext(`${engineCore}\n${volumeModule}\n${relationsModule}\n
globalThis.__answer=(module,number,scope)=>parseAnswer(module.questions.find(question=>question.n===number),scope);
globalThis.__volumeModule=MODULE_DNB_23;
globalThis.__relationsModule=MODULE_DNB_09;`,engineContext);

test('les puissances des volumes et le carré utilisent la puissance mathématique',()=>{
  assert.deepEqual([...engineContext.__answer(engineContext.__volumeModule,1,{c:3})],['27']);
  assert.deepEqual([...engineContext.__answer(engineContext.__volumeModule,1,{c:8})],['512']);
  assert.deepEqual([...engineContext.__answer(engineContext.__volumeModule,5,{a:8})],['512']);
  assert.deepEqual([...engineContext.__answer(engineContext.__volumeModule,10,{a:3})],['54']);
  assert.equal(engineContext.__answer(engineContext.__relationsModule,1,{n:6})[5],'36');
});

test('le prisme 71 × 14 produit et accepte 994',()=>{
  assert.deepEqual([...engineContext.__answer(engineContext.__volumeModule,7,{a:71,h:14})],['994']);

  const slideshowSource=fs.readFileSync('auto/scripts/03-slideshow.js','utf8');
  const slideshowContext=vm.createContext({
    setupPlaceValueTools:()=>{},
    placeValueToolHtml:()=>'',
    equationBuildResolution:()=>({}),
    equationDetailHtml:()=>'',
    equationSplatSvg:()=>''
  });
  vm.runInContext(`${slideshowSource}\nglobalThis.__makeDiapoWindowHtml=makeDiapoWindowHtml;`,slideshowContext);
  const html=slideshowContext.__makeDiapoWindowHtml([],'interactive');
  const validationCode=html.slice(
    html.indexOf('function normalizeInteractiveAnswer'),
    html.indexOf('function rawInteractiveResponse')
  );
  const feedbackCode=html.slice(
    html.indexOf('function incorrectInteractiveFeedbackDetail'),
    html.indexOf('function setInteractiveFeedback')
  );
  const interactionContext=vm.createContext({});
  vm.runInContext(`let interactiveValues=['994'];\n${validationCode}\n${feedbackCode}\n
globalThis.__isCorrect=interactiveAnswerIsCorrect;
globalThis.__feedback=incorrectInteractiveFeedbackDetail;`,interactionContext);

  const spec={kind:'slots',acceptedCombinations:[['994']],expectedDisplay:'réponse : 994'};
  assert.equal(interactionContext.__isCorrect(spec),true);
  assert.equal(
    interactionContext.__feedback({rawResponse:['994']},spec),
    'Ta réponse : 994 · Réponse attendue : 994'
  );
});

test('la réduction littérale conserve toutes les cases jusqu’au degré initial',()=>{
  const slideshowSource=fs.readFileSync('auto/scripts/03-slideshow.js','utf8');
  const helperCode=slideshowSource.slice(
    slideshowSource.indexOf('function parseInteractivePolynomial'),
    slideshowSource.indexOf('function interactiveKeysFor')
  );
  const interactionContext=vm.createContext({});
  vm.runInContext(`${helperCode}\nglobalThis.__parse=parseInteractivePolynomial;\nglobalThis.__indices=reductionResponseTermIndices;`,interactionContext);

  const cancelledSquare=interactionContext.__parse('4x²-4x²+3');
  assert.deepEqual([...cancelledSquare],['0','0','3']);
  assert.deepEqual(
    [...interactionContext.__indices({reduction:{groups:[{type:'x2',coeff:4},{type:'x2',coeff:-4},{type:'u',coeff:3}]}},[cancelledSquare])],
    [0,1,2]
  );

  const cancelledLinear=interactionContext.__parse('5x-5x+3');
  assert.deepEqual(
    [...interactionContext.__indices({reduction:{groups:[{type:'x',coeff:5},{type:'x',coeff:-5},{type:'u',coeff:3}]}},[cancelledLinear])],
    [1,2]
  );

  const constant=interactionContext.__parse('7');
  assert.deepEqual(
    [...interactionContext.__indices({reduction:{readCoeffs:{x2:0,x:0,u:7}}},[constant])],
    [2]
  );

  const specCode=slideshowSource.slice(
    slideshowSource.indexOf('function interactiveAnswerCombinations'),
    slideshowSource.indexOf('function courseKindForModule')
  );
  const specContext=vm.createContext({
    document:{createElement:()=>({set innerHTML(value){this.html=value;},querySelectorAll:()=>[]})}
  });
  vm.runInContext(`${specCode}\nglobalThis.__spec=interactiveSpecForInstance;`,specContext);

  const squareSpec=specContext.__spec({
    module:{id:'dnb_10'},q:{},answers:['3'],
    reduction:{groups:[{type:'x2',coeff:4},{type:'x2',coeff:-4},{type:'u',coeff:3}]}
  },'');
  assert.deepEqual([...squareSpec.slots.map(slot=>slot.term)],['x2','x','u']);
  assert.deepEqual([...squareSpec.acceptedCombinations[0]],['0','0','3']);

  const linearSpec=specContext.__spec({
    module:{id:'dnb_10'},q:{},answers:['3'],
    reduction:{groups:[{type:'x',coeff:5},{type:'x',coeff:-5},{type:'u',coeff:3}]}
  },'');
  assert.deepEqual([...linearSpec.slots.map(slot=>slot.term)],['x','u']);
  assert.deepEqual([...linearSpec.acceptedCombinations[0]],['0','3']);

  const reductionEngineSource=engineSource.slice(0,engineSource.indexOf('const SOLID_NAMES'));
  const reductionModuleSource=fs.readFileSync('auto/scripts/modules/numbers/dnb_10.js','utf8');
  const reductionContext=vm.createContext({console});
  vm.runInContext(`${reductionEngineSource}\n${reductionModuleSource}\nglobalThis.__generate=(seed,number)=>{setSeed(seed);const question=MODULE_DNB_10.questions.find(item=>item.n===number);return makeReductionInstance(MODULE_DNB_10,question);};`,reductionContext);

  for(let seed=1;seed<=200;seed++){
    for(let number=1;number<=6;number++){
      const instance=JSON.parse(JSON.stringify(reductionContext.__generate(seed*10+number,number)));
      const spec=specContext.__spec(instance,'');
      const sourceTypes=new Set((instance.reduction.groups||[]).map(group=>group.type));
      const readCoeffs=instance.reduction.readCoeffs||{};
      for(const type of ['x2','x','u']) if(Number.isFinite(Number(readCoeffs[type]))&&Number(readCoeffs[type])!==0) sourceTypes.add(type);
      const expectedTerms=sourceTypes.has('x2')?['x2','x','u']:(sourceTypes.has('x')?['x','u']:['u']);
      assert.deepEqual([...spec.slots.map(slot=>slot.term)],expectedTerms,`graine ${seed}, question ${number}, ${JSON.stringify(instance.reduction)}`);
      const fullAnswer=interactionContext.__parse(instance.answers[0]);
      const termIndices={x2:0,x:1,u:2};
      assert.deepEqual(
        [...spec.acceptedCombinations[0]],
        expectedTerms.map(term=>fullAnswer[termIndices[term]]),
        `coefficients de la graine ${seed}, question ${number}`
      );
    }
  }
});
