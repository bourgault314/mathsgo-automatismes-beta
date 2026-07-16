(function registerDivisibilityRenderer(global){
  function renderQuestion({instance,correction,mode,renderGenericQuestion}){
    return renderGenericQuestion(instance,correction,mode);
  }

  if(!global.MATHSGO_MODULE_RUNTIME) throw new Error('Le registre fonctionnel doit être chargé avant le rendu dnb_08.');
  global.MATHSGO_MODULE_RUNTIME.register('dnb_08',{
    renderer:{version:'1.0.0',renderQuestion}
  });
})(globalThis);
