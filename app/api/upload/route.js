import { writeFile } from "fs/promises";
import path from "path";
import { promises as fs } from 'fs';

export async function POST(request) {
  const data = await request.formData();
  const file = data.get("file");

  if (!file) {
    return new Response(JSON.stringify("File Not Found"));
  }
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  console.log(file);
  console.log("Current directory:",path.join("public", "uploads", file.name));
  console.log("Path:",path.join(__dirname,"public", "uploads", file.name));
  // const path1 = path.join("public", "uploads", file.name);
  // const filePath = path.join("public", file.name);
  // await writeFile(filePath, buffer)
  await fs.writeFile(`public/uploads/${file.name}`, buffer);

  return new Response(JSON.stringify('File Upload Success'));
}
