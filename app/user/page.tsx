"use client";

import Header from "@/components/Header";
import SessionCard from "@/components/SessionCard";
import { useState } from "react";

const mockSessions = [
  {
    id: 1,
    gymName: "USIU Gym one",
    instructor: "John Doe",
    time: "8:00 AM - 9:00 AM",
    day: "Monday",
    participants: 10,
    maxParticipants: 30,
  },
  {
    id: 2,
    gymName: "USIU Gym two",
    instructor: "John Doe",
    time: "10:00 AM - 11:00 AM",
    day: "Monday",
    participants: 10,
    maxParticipants: 30,
  },
  {
    id: 3,
    gymName: "USIU Gym one",
    instructor: "John Doe",
    time: "11:00 AM - 1:00 PM",
    day: "Monday",
    participants: 10,
    maxParticipants: 30,
  },
  {
    id: 4,
    gymName: "USIU Gym two",
    instructor: "John Doe",
    time: "6:00 AM - 7:00 AM",
    day: "Monday",
    participants: 10,
    maxParticipants: 30,
  },
  {
    id: 5,
    gymName: "USIU Gym two",
    instructor: "John Doe",
    time: "12:00 PM - 1:00 PM",
    day: "Monday",
    participants: 10,
    maxParticipants: 30,
  },
  {
    id: 6,
    gymName: "USIU Gym one",
    instructor: "John Doe",
    time: "4:00 PM - 5:00 PM",
    day: "Monday",
    participants: 10,
    maxParticipants: 30,
  },
];

export default function UserPage() {
  const [joinedId, setJoinedId] = useState<number | null>(5); // Example: joined session with id 5

  return (
    <div className="min-h-screen bg-slate-50">
      <Header userName="Jane Doe" />
      <main className="max-w-7xl mx-auto px-6 py-8">
        <h2 className="text-2xl font-bold mb-6 text-blue-900">Available Gym Sessions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockSessions.map((session) => (
            <SessionCard
              key={session.id}
              gymName={session.gymName}
              instructor={session.instructor}
              time={session.time}
              day={session.day}
              participants={session.participants}
              maxParticipants={session.maxParticipants}
              joined={joinedId === session.id}
              onJoin={() => setJoinedId(session.id)}
            />
          ))}
        </div>
      </main>
    </div>
  );
}