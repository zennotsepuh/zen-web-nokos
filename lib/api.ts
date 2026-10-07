import { NextResponse } from "next/server";

export function ok<T>(data: T) {
  return NextResponse.json({ ok: true, data });
}

export function fail(error: unknown) {
  const message = error instanceof Error ? error.message : "Request gagal";
  return NextResponse.json({ ok: false, error: message }, { status: 400 });
}
