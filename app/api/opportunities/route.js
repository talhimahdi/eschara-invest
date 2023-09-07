import { writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request) {
  return NextResponse.json({ success: true });
}

export async function POST(response, request) {
  const data = await request.body;
  const image = data.file;
  if (!image) {
    return NextResponse.json({ ...request.body });
  }

  return NextResponse.json({ success: true });
  //   const data = await request.json();
  console.log(request);
  return;
  const file = data.get("file");

  if (!file) {
    return NextResponse.json({ success: false });
  }
  try {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // With the file data in the buffer, you can do whatever you want with it.
    // For this, we'll just write it to the filesystem in a new location
    const path = `/tmp/${file.name}`;
    await writeFile(path, buffer);
    console.log(`open ${path} to see the uploaded file`);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.log(error);
  }
}
