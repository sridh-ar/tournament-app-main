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
  let insertQuery = `INSERT INTO player (name, dob, age, contact_number, team_name, jersey_name, jersey_size, jersey_no, area, player_photo, player_role,
      batting_style, bowling_style, approved)
      VALUES ('${req[0]}','${req[1]}','${req[2]}','${req[3]}','${req[4]}','${req[5]}','${req[6]}','${req[7]}','${req[8]}','${req[9]}','${req[10]}','${req[11]}',
      '${req[12]}',${req[13]})`;
  let result;
  try {
    result = await query(insertQuery);
  } catch (err) {
    console.log(`Error in the select query - ${err.message}`);
  }
  return new Response(JSON.stringify(result));
}
