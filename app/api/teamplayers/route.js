import { query } from "@/lib/database/service";

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
  let insertQuery = `INSERT INTO team_players (team_name, player_no, player_name, points, team_id )
      VALUES ('${req[0]}','${req[1]}','${req[2]}','${req[3]}','${req[4]}')`;
  let updateQuery = `UPDATE team SET remaining_slots = remaining_slots - 1, remaining_points_available = remaining_points_available - ${parseInt(
    req[3]
  )} 
      WHERE id = ${req[4]}`;
  let result;
  try {
    result = await query(insertQuery);
    updateResult = await query(updateQuery);
  } catch (err) {
    console.log(`Error in the select query - ${err.message}`);
  }
  return new Response(JSON.stringify(result));
}
