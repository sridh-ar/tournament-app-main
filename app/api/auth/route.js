import { validateUser } from "../../../lib/auth/auth";
import { Result } from "postcss";

//Auth
export async function POST(request) {
  const req = await request.json();
  // let insertQuery = `select
  //     VALUES ('${req[0]}','${req[1]}','${req[2]}','${req[3]}','${req[4]}','${req[5]}','${req[6]}','${req[7]}','${req[8]}','${req[9]}','${req[10]}','${req[11]}',
  //     '${req[12]}','${req[13]}',${req[14]})`;
  // let result;
  // try {
  //   result = await query(insertQuery);
  // } catch (err) {
  //   console.log(`Error in the select query - ${err.message}`);
  // }
  // console.log(req);
  let result = await validateUser(req[0], req[1]);
  // console.log(result);
  return new Response(JSON.stringify(result));
}
