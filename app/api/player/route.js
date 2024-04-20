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

  console.log(`[Player_API] Request - `,req)

  try {
    result = await db.oneOrNone(pgpHelpers.insert(req,null,{table:'player'}) + ' returning id');
    
    if (!result) {
      return new Response(JSON.stringify({ error: 'Failed to insert player data' }), { status: 500 });
    }
  } catch (err) {
    console.log(`[Player_API] Error in the POST Method - ${err.stack}`);
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 }); // Return failure response with status code 500
  }

  return new Response(JSON.stringify(result));
}
