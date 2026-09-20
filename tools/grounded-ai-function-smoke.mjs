import { handler } from '../netlify/functions/grounded-ai.mjs';

function assert(v,m){if(!v)throw new Error(m)}
const oldKey=process.env.GEMINI_API_KEY,oldModel=process.env.GEMINI_MODEL,oldFetch=global.fetch;
let upstream=null;
try{
  process.env.GEMINI_API_KEY='test-secret-never-return';
  process.env.GEMINI_MODEL='gemini-flash-latest';
  global.fetch=async(url,opts)=>{
    upstream={url:String(url),headers:opts.headers,body:JSON.parse(opts.body)};
    return {ok:true,status:200,json:async()=>({model:'gemini-flash-latest',status:'completed',steps:[{type:'model_output',content:[{type:'text',text:'Chỉ dựa trên căn cứ [1].'}]}],usage:{total_input_tokens:10,total_output_tokens:6,total_tokens:16}})};
  };
  const res=await handler({httpMethod:'POST',body:JSON.stringify({
    question:'Nội dung nào cần kiểm tra?',
    sources:[{id:'1',document:'Văn bản QA',label:'Khoản 1 Điều 1',text:'Nội dung căn cứ QA.',source:'https://vbpl.vn/qa',note:'PRIVATE NOTE MUST NOT MATTER'}],
    complianceProfiles:[{name:'PRIVATE PROFILE'}]
  })});
  assert(res.statusCode===200,'Grounded AI function did not return success for a valid mocked provider response');
  const body=JSON.parse(res.body);
  assert(body.answer==='Chỉ dựa trên căn cứ [1].','Grounded AI function did not extract model_output text');
  assert(!res.body.includes('test-secret-never-return'),'Grounded AI response leaked the API key');
  assert(upstream?.url==='https://generativelanguage.googleapis.com/v1beta/interactions','Grounded AI did not use the Gemini Interactions endpoint');
  assert(upstream?.headers?.['x-goog-api-key']==='test-secret-never-return','Grounded AI did not keep auth server-side');
  assert(upstream.body.model==='gemini-flash-latest','Grounded AI did not honor the configured model');
  assert(String(upstream.body.system_instruction).includes('Chỉ trả lời từ CĂN CỨ ĐƯỢC CUNG CẤP'),'Grounded AI system instruction lost its source-only rule');
  assert(String(upstream.body.system_instruction).includes('Không dùng kiến thức ngoài'),'Grounded AI system instruction does not forbid outside knowledge');
  assert(String(upstream.body.input).includes('Khoản 1 Điều 1')&&String(upstream.body.input).includes('Nội dung căn cứ QA.'),'Grounded AI upstream prompt omitted citation evidence');
  assert(!String(upstream.body.input).includes('PRIVATE PROFILE')&&!String(upstream.body.input).includes('PRIVATE NOTE MUST NOT MATTER'),'Grounded AI upstream prompt leaked unrelated workspace/private fields');

  delete process.env.GEMINI_API_KEY;
  const off=await handler({httpMethod:'POST',body:JSON.stringify({question:'abc',sources:[{text:'def'}]})});
  assert(off.statusCode===503&&JSON.parse(off.body).error==='ai_not_configured','Grounded AI does not fail closed when the server key is absent');
  console.log('Grounded AI function boundary passed.');
}finally{
  if(oldKey===undefined)delete process.env.GEMINI_API_KEY;else process.env.GEMINI_API_KEY=oldKey;
  if(oldModel===undefined)delete process.env.GEMINI_MODEL;else process.env.GEMINI_MODEL=oldModel;
  global.fetch=oldFetch;
}
