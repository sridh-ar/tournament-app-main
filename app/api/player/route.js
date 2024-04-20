import {db, pgpHelpers} from "../../../lib/database/postgres";

//Query player
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  let result = [];
  try {
    result = await db.query(searchParams.get("query"));
  } catch (err) {
    console.log(`Error in the select query - ${err.message}`);
  }
  return new Response(JSON.stringify(result));
}

//Register player
export async function POST(request) {
  const req = await request.json();
  let result = null;

  try{
    result = await db.oneOrNone(pgpHelpers.insert(req,null,{table:'player'}) + ' returning id')
  }
  catch (err) {
    console.log(`Error in the select query - ${err.message}`);
  }
  return new Response(JSON.stringify(result));
}
