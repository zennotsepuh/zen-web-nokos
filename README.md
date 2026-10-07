# NOKOS Order Center - Fixed

Next.js 14 + Supabase + Ditznesia API proxy.

## Deploy
1. Upload all files to GitHub (do not upload .env.local).
2. Import repository into Vercel.
3. Add environment variables from `.env.example`.
4. Deploy.

This build fixes the malformed TypeScript in the previous archive. Provider response mapping and wallet billing still depend on the exact Ditznesia JSON responses.
