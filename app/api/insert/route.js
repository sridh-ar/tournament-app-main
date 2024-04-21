import {db, pgpHelpers} from "../../../lib/database/postgres";

export async function POST(request) {
  const req = await request.json();

  // Accessing headers
  const headers = request.headers;
  const tableName = headers.get('table_name');

  let result = null;

  console.log(`[Insert_API] Request - `,req)
  console.log(`[Insert_API] tableName - `,tableName)
  console.log(pgpHelpers.insert(req,null,{table:tableName}) + ' returning id')

  try {
    result = await db.oneOrNone(pgpHelpers.insert(req,null,{table:tableName}) + ' returning id');
    
    if (!result) {
      return new Response(JSON.stringify({ error: 'Failed to insert data' }), { status: 500 });
    }
  } catch (err) {
    console.log(`[Insert_API] Error in the POST Method - ${err.stack}`);
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 }); // Return failure response with status code 500
  }

  return new Response(JSON.stringify(result));
}
