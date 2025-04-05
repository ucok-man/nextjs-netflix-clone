/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";

export function responseOK(code: number, body: any) {
  return NextResponse.json(body, {
    status: code,
  });
}

export function responseErr(code: number, body: any) {
  return NextResponse.json(
    { error: body },
    {
      status: code,
    }
  );
}
