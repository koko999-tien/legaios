import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const expectedScripts = [
  'assets/js/legal-data.js',
  'assets/js/knowledge-base.js',
  'assets/js/state.js',
  'assets/js/import.js',
  'assets/js/idb-resilience.js',
  'assets/js/search-utils.js',
  'assets/js/search-data.js',
  'assets/js/search-runtime.js',
  'assets/js/search-fuzzy.js',
  'assets/js/ui-shell.js',
  'assets/js/ui-utils.js',
  'assets/js/activity-workspace.js',
  'assets/js/project-tools.js',
  'assets/js/library.js',
  'assets/js/procedures.js',
  'assets/js/compliance-core.js',
  'assets/js/permits.js',
  'assets/js/compliance.js',
  'assets/js/workspace.js',
  'assets/js/legal-hub.js',
  'assets/js/expert.js',
  'assets/js/navigation.js',
  'assets/js/oss-upgrades.js',
  'assets/js/library-search.js',
  'assets/js/classifier.js',
  'assets/js/boot.js'
];

const expectedLazyScripts = ['assets/lazy/workspace-data.js','assets/lazy/search-engine.js'];

const expectedStyles = [
  'assets/css/app.css',
  'assets/css/v14-product.css',
  'assets/css/compliance.css',
  'assets/css/oss-upgrades.css'
];

const html = fs.readFileSync('index.html', 'utf8');
const actualScripts = [...html.matchAll(/<script\b[^>]*\bsrc=["']([^"']+)["'][^>]*><\/script>/gi)]
  .map(m => m[1])
  .filter(src => src.startsWith('assets/js/'));

function fail(message) {
  console.error(`ERROR: ${message}`);
  process.exitCode = 1;
}

if (JSON.stringify(actualScripts) !== JSON.stringify(expectedScripts)) {
  fail(`JavaScript load order changed.\nExpected: ${expectedScripts.join(' -> ')}\nActual:   ${actualScripts.join(' -> ')}`);
}

for (const file of [...expectedStyles, ...expectedScripts, ...expectedLazyScripts]) {
  if (!fs.existsSync(file)) {
    fail(`Missing required asset: ${file}`);
    continue;
  }
  if (!fs.statSync(file).isFile() || fs.statSync(file).size === 0) fail(`Required asset is empty: ${file}`);
}

if (fs.existsSync('assets/js/app.js')) fail('Legacy assets/js/app.js must not return after Stage 2g.');
for(const file of expectedLazyScripts){
  const code=fs.readFileSync(file,'utf8');
  try{new vm.Script(code,{filename:file})}catch(error){fail(`${file} syntax error: ${error.message}`)}
  if(/\beval\s*\(|\bnew\s+Function\s*\(|document\.write\s*\(|javascript\s*:|set(?:Timeout|Interval)\s*\(\s*["']/i.test(code))fail(`${file} contains a blocked execution pattern.`);
  if((code.match(/\.innerHTML\s*=/g)||[]).length)fail(`${file} must not add innerHTML assignment sinks.`);
}

const requiredMarkers = [
  ['assets/js/boot.js', 'DOMContentLoaded'],
  ['assets/js/classifier.js', 'function analyze()'],
  ['assets/js/library-search.js', 'function docs('],
  ['assets/js/navigation.js', 'function go('],
  ['assets/js/expert.js', 'function analyzeExpert('],
  ['assets/js/legal-hub.js', 'function renderLawHubTab('],
  ['assets/js/workspace.js', 'function renderWorkspace('],
  ['assets/js/compliance-core.js', 'function normalizeComplianceProfile('],
  ['assets/js/permits.js', 'function permitRegisterHtml('],
  ['assets/js/compliance.js', 'function renderComplianceWorkspace('],
  ['assets/js/idb-resilience.js', 'window.LEGALOS_IDB_RESILIENCE'],
  ['assets/js/search-fuzzy.js', 'window.LEGALOS_SEARCH_LOADER'],
  ['assets/js/oss-upgrades.js', 'window.CCPLMT_DIAGNOSTICS']
];
for (const [file, marker] of requiredMarkers) {
  const text = fs.readFileSync(file, 'utf8');
  if (!text.includes(marker)) fail(`${file} is missing expected marker: ${marker}`);
}

const workflowDir = '.github/workflows';
if (fs.existsSync(workflowDir)) {
  const temporary = fs.readdirSync(workflowDir).filter(name => /^apply-stage/i.test(name));
  if (temporary.length) fail(`Temporary write-enabled extraction workflow(s) still present: ${temporary.join(', ')}`);
}

const actualStyles = [...html.matchAll(/<link\b[^>]*\brel=["']stylesheet["'][^>]*\bhref=["']([^"']+)["'][^>]*>/gi)].map(m => m[1]);
if (JSON.stringify(actualStyles) !== JSON.stringify(expectedStyles)) {
  fail(`Stylesheet load order changed.\nExpected: ${expectedStyles.join(' -> ')}\nActual:   ${actualStyles.join(' -> ')}`);
}

if (!process.exitCode) {
  const totalBytes = expectedScripts.reduce((sum, file) => sum + fs.statSync(file).size, 0);
  console.log('V14 structure check passed.');
  console.log(`  ${expectedScripts.length} ordered JavaScript modules`);
  console.log(`  ${expectedStyles.length} ordered stylesheets`);
  console.log(`  ${expectedLazyScripts.length} lazy JavaScript chunk(s)`);
  console.log(`  ${totalBytes.toLocaleString('en-US')} JavaScript bytes`);
  console.log('  no legacy app.js');
  console.log('  no temporary apply-stage workflows');
}
