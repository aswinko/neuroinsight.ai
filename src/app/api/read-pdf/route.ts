// import fs from 'fs';
// import path from 'path';
import { NextResponse } from 'next/server';


export async function GET(req: Request) {
    return NextResponse.json({ message: "API is working!" });

  
}
