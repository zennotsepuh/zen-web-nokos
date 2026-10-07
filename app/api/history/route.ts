import {ditz} from '../../../lib/ditznesia';import {ok,fail} from '../../../lib/api';import {NextRequest} from 'next/server';
export async function GET(req:NextRequest){try{const q=req.nextUrl.searchParams;const params:any={};q.forEach((v,k)=>params[k]=v);return ok(await ditz('history',params))}catch(e){return fail(e)}}
