// import React, { useContext } from "react";
// import RoomImageSlider from "./RoomImageSlider";
// import RoomInfo from "./RoomInfo";
// import "./RoomDetails.css";
// import { UserContext } from "../UserContext";
// import { useNavigate } from "react-router-dom";

// const RoomCard = ({ room, selectedDateRange, onBookingSuccess }) => {
//   const { user } = useContext(UserContext);
//   const navigate = useNavigate();

//   const handleBooking = async (roomId, userId, selectedDateRange) => {
//     if (!user) return navigate("/auth");

//     const baseURL = "http://127.0.0.1:8000"; // local backend

//     if (selectedDateRange.startDate && !selectedDateRange.endDate) {
//       selectedDateRange.endDate = selectedDateRange.startDate;
//     }

//     for (
//       let currentDate = new Date(selectedDateRange.startDate);
//       currentDate <= new Date(selectedDateRange.endDate);
//       currentDate.setDate(currentDate.getDate() + 1)
//     ) {
//       try {
//         const response = await fetch("http://127.0.0.1:8000/occupied-dates/", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           room: roomId,
//           date: selectedDate,
//           user: userId
//         })
//       });
//         if (!response.ok) throw new Error("Booking failed");

//         const data = await response.json();
//         onBookingSuccess();
//         console.log("Booking successful:", data);
//       } catch (error) {
//         console.error("Error during booking:", error);
//       }
//     }
//   };

//   return (
//     <div className="room-card">
//       <RoomImageSlider images={room.images} />
//       <RoomInfo room={room} />
//       {selectedDateRange ? (
//         <button
//           className="book-room-button"
//           onClick={() =>
//             handleBooking(room.id, user.user.id, selectedDateRange)
//           }
//           disabled={!selectedDateRange.startDate}
//         >
//           Book Room
//         </button>
//       ) : null}
//     </div>
//   );
// };

// export default RoomCard;
import React, { useContext } from "react";
import RoomImageSlider from "./RoomImageSlider";
import RoomInfo from "./RoomInfo";
import "./RoomDetails.css";
import { UserContext } from "../UserContext";
import { useNavigate } from "react-router-dom";

const RoomCard = ({ room, selectedDateRange, onBookingSuccess }) => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const handleBooking = async (roomId, userId, selectedDateRange) => {
    if (!user) return navigate("/auth");

    const baseURL = "http://127.0.0.1:8000";

    const startDate = selectedDateRange.startDate;
    const endDate = selectedDateRange.endDate || startDate;

    for (
      let currentDate = new Date(startDate);
      currentDate <= new Date(endDate);
      currentDate.setDate(currentDate.getDate() + 1)
    ) {
      try {
        const response = await fetch(`${baseURL}/occupied-dates/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${user.token}` // if using token auth
          },
          body: JSON.stringify({
            room: roomId,
            // date: currentDate.toISOString().split("T")[0] // ✅ correct date format
            date: currentDate.toLocaleDateString("en-CA") // gives YYYY-MM-DD in local time

          })
        });

        if (!response.ok) throw new Error("Booking failed");

        const data = await response.json();
        onBookingSuccess();
        console.log("Booking successful:", data);
      } catch (error) {
        console.error("Error during booking:", error);
      }
    }
  };

  return (
    <div className="room-card">
      <RoomImageSlider images={room.images} />
      <RoomInfo room={room} />
      {selectedDateRange ? (
        <button
          className="book-room-button"
          onClick={() =>
            handleBooking(room.id, user.user.id, selectedDateRange)
          }
          disabled={!selectedDateRange.startDate}
        >
          Book Room
        </button>
      ) : null}
    </div>
  );
};

export default RoomCard;
