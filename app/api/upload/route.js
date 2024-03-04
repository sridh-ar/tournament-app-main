import { writeFile } from "fs/promises";
import path from "path";

export async function POST(request) {
  const data = await request.formData();
  const file = data.get("file");

  if (!file) {
    return new Response(JSON.stringify("File Not Found"));
  }
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  let filePath = path.join("public", file.name);
  if(data.get("path")){
    filePath = path.join("public", data.get("path"), file.name);
  }
  console.log("Current directory:",filePath);

  await writeFile(filePath, buffer)

  return new Response(JSON.stringify('File Upload Success'));
}