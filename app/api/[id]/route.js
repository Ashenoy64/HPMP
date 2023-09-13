import { NextResponse } from "next/server";
import fs from 'fs';
const { join } = require('path');




export async function GET(request)
{
    const path = join(process.cwd(),'/public/song.mp3')
    const audioData =fs.readFileSync('/')

    const blob = new Blob([audioData],{type:'audio/mpeg'})

    return NextResponse.send(blob)
}