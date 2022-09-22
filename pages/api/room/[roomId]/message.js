import { readDB, writeDB } from "../../../../backendLibs/dbLib";
import { v4 as uuidv4 } from "uuid";

export default function roomIdMessageRoute(req, res) {
  if (req.method === "GET") {
    const rooms = readDB();
    const result = rooms.map((x) => {
        messages = x.messages;
    })

    return res.json({ ok: true , message: result });

  } else if (req.method === "POST") {
    const rooms = readDB();

    //read request body
    const text = req.body.text;

    //create new id
    const newId = uuidv4();
  }
}
