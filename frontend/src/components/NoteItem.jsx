import { useSelector } from "react-redux";

function NoteItem({ note }) {
  const { user } = useSelector((state) => state.auth);
  let name="";
  if(user){
    name = user.name;
  }
    
  return (
    <div
      className="note"
      style={{
        backgroundColor: note.isStaff ? "rgba(0,0,0,0.7)" : "#fff",
        color: note.isStaff ? "#fff" : "#000",
      }}
    >
      <h4>
        Note from {note.isStaff ? <span>Staff</span> : <span>{name}</span>}
      </h4>
      <p>{note.text}</p>
      <div className="note-date">
        {new Date(note.createdAt).toLocaleString("en-US")}
      </div>
    </div>
  );
}

// function NoteEmpItem({ note }) {
//   // const { emp } = useSelector((state) => state.employee);
//   // console.log(note.text);
//   return (
//     <div
//       className="note"
//       style={{
//         backgroundColor: "rgba(0,0,0,0.7)",
//         color:  "#fff" ,
//       }}
//     >
//       <h4>
//         Note from <span>Staff</span> 
//       </h4>
//       <p>{note.text}</p>
//       <div className="note-date">
//         {new Date(note.createdAt).toLocaleString("en-US")}
//       </div>
//     </div>
//   );
// }

export default NoteItem ;