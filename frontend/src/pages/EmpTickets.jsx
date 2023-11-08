import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getEmpTickets, reset } from "../features/tickets/ticketSlice";
import Spinner from "../components/Spinner";
import BackButton from "../components/BackButton";
import {EmpTicketItem} from '../components/TicketItem'

function EmpTickets() {
  const { tickets, isLoading, isSuccess } = useSelector(
    (state) => state.tickets
  );

  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      if (isSuccess) {
        dispatch(reset());
      }
    };
  }, [dispatch, isSuccess]);

  useEffect(() => {
    dispatch(getEmpTickets());// getting all the tickets of the employee
  }, [dispatch,isSuccess]);

  if (isLoading) {
    return <Spinner />;
  }
// console.log(tickets);
  return (
    <>
    <BackButton url='/' />
      <h1>Tickets</h1>
      <div className="tickets">
        <div className="ticket-headings">
            <div>Date</div>
            <div>Product</div>
            <div>Status</div>
            <div></div>
        </div>
        {tickets.map((ticket) => (
            <EmpTicketItem key={ticket._id} ticket={ticket} />
        ))}
      </div>
    </>
  );
}

export default EmpTickets;
