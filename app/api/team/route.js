import { query } from "../../../lib/database/service";

//Query player
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  let result = [];
  try {
    result = await query(searchParams.get("query"));
  } catch (err) {
    console.log(`Error in the select query - ${err.message}`);
  }
  return new Response(JSON.stringify(result));
}

//Register player
export async function POST(request) {
  const req = await request.json();
  let insertQuery = `INSERT INTO team (team_name, captain, owner, slots, remaining_slots, total_points_available, remaining_points_available,team_photo,owner_photo)
      VALUES ('${req[0]}','${req[1]}','${req[2]}','${req[3]}','${req[4]}','${req[5]}','${req[6]}','${req[7]}','${req[8]}')`;
  let result;
  try {
    result = await query(insertQuery);
  } catch (err) {
    console.log(`Error in the select query - ${err.message}`);
  }
  return new Response(JSON.stringify(result));
}
