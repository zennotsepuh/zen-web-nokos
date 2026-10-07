# NOKOS Order Center

Production-oriented Next.js starter for a NOKOS storefront using Ditznesia API as a server-side proxy.

## Setup
1. `cp .env.example .env.local`
2. Create a Supabase project and paste URL + anon key.
3. Run `supabase/schema.sql` in Supabase SQL Editor.
4. Put a NEW Ditznesia API key in `DITZNESIA_API_KEY`.
5. `npm install && npm run dev`
6. Deploy to Vercel/Node hosting.

## Security
The Ditznesia key is only read by server route code. Never put it in `NEXT_PUBLIC_*` variables.

## Important
Provider response shapes can vary. The UI uses common `data/name/code/id/provider` fields; adjust mappings in the pages after checking the exact provider JSON responses.
