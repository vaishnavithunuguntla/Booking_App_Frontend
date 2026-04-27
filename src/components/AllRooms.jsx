import React, { useEffect, useState } from "react";
import RoomCard from "./RoomDetails/RoomCard";

const AllRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/rooms/");
        if (!response.ok) {
          throw new Error("Failed to fetch rooms");
        }
        const data = await response.json();
        setRooms(data);
      } catch (err) {
        console.error("Error fetching rooms:", err);
        setError(err.message);
      }
    };
    fetchRooms();
  }, []);

  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      {rooms.map((room) => (
        <RoomCard key={room.id} room={room} />
      ))}
    </div>
  );
};

export default AllRooms;
