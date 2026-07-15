const modulesInDomain=(modules,domain)=>modules.map(module=>({...module,domain}));
const RAW_MODULES = [
  ...modulesInDomain(RAW_NUMBER_MODULES,'numbers'),
  ...modulesInDomain(RAW_GEOMETRY_MODULES,'geometry'),
  ...modulesInDomain(RAW_DATA_MODULES,'data'),
  ...modulesInDomain(RAW_ALGORITHM_MODULES,'algorithm')
];
