import {db} from "../../../lib/database/postgres";

export async function GET() {
  let result = [];
  try {
    result = await db.manyOrNone(`
      select config_name,config_value from config
      UNION 
      select 'totalRegisteredPlayers',count(*)::TEXT from player
    `);
  } catch (err) {
    console.log(`[Config_API] Error in the GET Method - ${err.stack}`);
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 }); // Return failure response with status code 500
  }
  return new Response(JSON.stringify(result));
}

export async function POST(request) {
  const body = await request.json();

  let result = [];
  try {
    result = await db.manyOrNone(`
      update config set config_value = $1 where config_name = $2 returning config_value
    `, [body.config_value, body.config_name]);
  } catch (err) {
    console.log(`[Config_API] Error in the POST Method - ${err.stack}`);
    return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 }); // Return failure response with status code 500
  }
  return new Response(JSON.stringify(result));
}
