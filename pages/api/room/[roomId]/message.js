import { readDB, writeDB } from "../../../../backendLibs/dbLib";
import { v4 as uuidv4 } from "uuid";

export default function roomIdMessageRoute(req, res) {
  if (req.method === "GET") {
    const rooms = readDB();
    // const result = rooms.map((x) => {
    //     messages = x.messages;
    // })

    const id = req.query.roomId;
    const roomsIdx = rooms.findIndex((x) => x.roomId === id);

    if(roomsIdx === -1){
      res.status(404).json({ ok: false , message: "Invalid room id"});
    }else{
      res.status(200).json({ ok: true , message: rooms[roomsIdx].messages });
    }

  } else if (req.method === "POST") {
    const rooms = readDB();
    
    //read request body
    const text = req.body.text;

    //create new id
    const newId = uuidv4();
    const id = req.query.roomId;
    const roomsIdx = rooms.findIndex((x) => x.roomId === id);
    const newMessage = {
      messageId: newId,
      text: text
    };

    if(roomsIdx === -1){
      res.status(404).json({ ok: false , message: "Invalid room id "})
    }else{
      if(typeof text !== "string" || text === null){
        res.status(404).json({ ok: false , message: "Invalid input" })
      }else{
        rooms[roomsIdx].messages.push(newMessage);
        writeDB(rooms);
        res.status(200).json({ ok: true , message: newMessage })
      };
    }
  }
}
