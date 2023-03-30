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

//Register payment
export async function POST(request) {
  const req = await request.json();
  let insertQuery = `INSERT INTO payment_details (gpay_name, gpay_no, transaction_id, player_no)
      VALUES ('${req[0]}','${req[1]}','${req[2]}','${req[3]}')`;
  let result;
  try {
    result = await query(insertQuery);
  } catch (err) {
    console.log(`Error in the select query - ${err.message}`);
  }
  return new Response(JSON.stringify(result));
}
