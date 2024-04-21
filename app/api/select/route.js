import {db} from "../../../lib/database/postgres";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  let result = null;

  console.log(`[Select_API] Query - `, searchParams.get("query"))

  try {
    result = await db.manyOrNone(searchParams.get("query"));

    if (!result) {
      return new Response(JSON.stringify({ error: 'Failed to get data' }), { status: 500 });
    }
  }
  catch (err) {
    console.log(`[Select_API] Error in the GET Method - ${err.stack}`);
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 }); // Return failure response with status code 500
  }
  return new Response(JSON.stringify(result));
}