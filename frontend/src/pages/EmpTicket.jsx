/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Modal from "react-modal";
import { FaPlus } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { getEmpTicket,closeEmpTicket,openEmpTicket } from "../features/tickets/ticketSlice";
import {
  createEmpNote,
  getEmpNotes,
  reset as notesReset,
} from "../features/notes/noteSlice";
import { useParams, useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import NoteItem from "../components/NoteItem";

// openEmpTicket

const customStyles = {
  content: {
    width: "600px",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    position: "relative",
  },
};

Modal.setAppElement("#root");

function EmpTicket() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [noteText, setNoteText] = useState("");
  // const [stat,setStat] = useState("new");
  const { ticket, isLoading, isError, message,status } = useSelector(
    (state) => state.tickets
  );

  const { notes, isLoading: notesIsLoading } = useSelector(
    (state) => state.notes
  );

  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { ticketId } = params;

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    dispatch(getEmpTicket(ticketId));
    dispatch(getEmpNotes(ticketId));
  }, [isError, message, ticketId, dispatch,status]);

  const onTicketClose = () => {
    dispatch(closeEmpTicket(ticketId,"closed"));
    toast.success("Ticket Closed");
    navigate("/emp/tickets");
  };
  const openTicket = () => {
    dispatch(openEmpTicket(ticketId,"open"));
    toast.success("Ticket opened");
  };

  // Create note submit
  const onNoteSubmit = (e) => {
    e.preventDefault();
    dispatch(createEmpNote({ noteText, ticketId }));
    closeModal();
  };

  // Open/Close modal
  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  if (isLoading || notesIsLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h3>Something Went Wrong!</h3>;
  }

  let productType = null; 

  for (const key in ticket.product) {
    if (key === "TV" || key === "phone" || key==="Laptop") {
      productType = key;
      break; 
    }
  }
  console.log(notes);


  return (
    <div className="ticket-page">
      <header className="ticket-header">
        <BackButton url="/emp/tickets" />
        <h2>
           Ticket ID: {ticket._id}
          <span className={`status status-${ticket.status}`}>
            {ticket.status}
          </span>
        </h2>
        {ticket.status !== "closed" && (
        <button onClick={openTicket} className="btn">
          Open the ticket
        </button>
      )}

        <h3>
          Date Submitted: {new Date(ticket.createdAt).toLocaleString("en-US")}
        </h3>
        <h2>{productType}</h2>
          {productType ==="phone"  && <h3>Product: { ticket.product.phone}</h3>}
          {productType ==="Laptop" && <h3>Product: { ticket.product.Laptop}</h3>}
          {productType ==="TV" && <h3>Product: { ticket.product.TV}</h3>}
        <hr />
        <div className="ticket-desc">
          <h3>Description of Issue</h3>
          <p>{ticket.description}</p>
        </div>
        <h2>Notes</h2>
      </header>

      {ticket.status !== "closed" && (
        <button onClick={openModal} className="btn">
          <FaPlus /> Add Note
        </button>
      )}

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Add Note"
      >
        <h2>Add Note</h2>
        <button className="btn-close" onClick={closeModal}>
          X
        </button>
        <form onSubmit={onNoteSubmit}>
          <div className="form-group">
            <textarea
              name="noteText"
              id="noteText"
              className="form-control"
              placeholder="Note text"
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
            ></textarea>
          </div>
          <div className="form-group">
            <button className="btn" type="submit">
              Submit
            </button>
          </div>
        </form>
      </Modal>

      {notes.map((note) => (
        <NoteItem key={note._id} note={note} />
      ))}

      {ticket.status !== "closed" && (
        <button onClick={onTicketClose} className="btn btn-block btn-danger">
          Close Ticket
        </button>
      )}
    </div>
  );
}

export default EmpTicket;
