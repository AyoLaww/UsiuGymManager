"use client";

import Header from "@/components/Header";
import SessionCard from "@/components/SessionCard";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useAuth } from "@/lib/useAuth";
import { getUserBooking, joinSession, leaveSession } from "@/lib/bookingsService";
import { toast } from "sonner";
import { Session } from "@/lib/models/Session";

export default function UserPage() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [participantCounts, setParticipantCounts] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const [booking, setBooking] = useState<any>(null);
  const { getCurrentUser } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const userObj = await getCurrentUser();
      setUser(userObj);
      if (!userObj) {
        setError("User not found");
        setLoading(false);
        return;
      }
      try {
        const sessionObjs = await Session.fetchAll();
        setSessions(sessionObjs);
      } catch (sessionError: any) {
        setError("Error fetching sessions: " + sessionError.message);
        setLoading(false);
        return;
      }
      try {
        const bookingData = await getUserBooking(userObj.id);
        setBooking(bookingData);
      } catch (e) {
        setBooking(null);
      }
      // Fetch participant counts
      const { data: countsData, error: countsError } = await supabase.from("session_participants").select("*");
      if (!countsError && countsData) {
        const countsMap: Record<string, number> = {};
        countsData.forEach((row: any) => {
          countsMap[row.session_id] = row.participant_count;
        });
        setParticipantCounts(countsMap);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleJoin = async (sessionId: string, maxCapacity: number, currentParticipants: number) => {
    if (!user) return;
    if (currentParticipants >= maxCapacity) {
      setError("This session is full. You can't join a full session.");
      return;
    }
    try {
      const bookingData = await joinSession(user.id, sessionId);
      setBooking(bookingData);
      // Refetch participant counts after joining
      const { data: countsData } = await supabase.from("session_participants").select("*");
      if (countsData) {
        const countsMap: Record<string, number> = {};
        countsData.forEach((row: any) => {
          countsMap[row.session_id] = row.participant_count;
        });
        setParticipantCounts(countsMap);
      }
      setError(null); 
    } catch (e: any) {
      setError(e.message);
    }
  };

  const handleLeave = async () => {
    if (!booking) return;
    try {
      await leaveSession(booking.id);
      setBooking(null);
      // Refetch participant counts after leaving
      const { data: countsData } = await supabase.from("session_participants").select("*");
      if (countsData) {
        const countsMap: Record<string, number> = {};
        countsData.forEach((row: any) => {
          countsMap[row.session_id] = row.participant_count;
        });
        setParticipantCounts(countsMap);
      }
    } catch (e: any) {
      setError(e.message);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Header userName="" />
      <main className="max-w-7xl mx-auto px-6 py-8">
        <h2 className="text-2xl font-bold mb-6 text-blue-900">Available Gym Sessions</h2>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        {loading ? (
          <p>Loading sessions...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {sessions.map((session) => {
              const joined = booking && booking.session_id === session.id;
              const current_participants = participantCounts[session.id] || 0;
              return (
                <SessionCard
                  key={session.id}
                  location={session.location}
                  date={session.date}
                  start_time={session.start_time}
                  end_time={session.end_time}
                  max_capacity={session.max_capacity}
                  current_participants={current_participants}
                  onJoin={joined ? handleLeave : () => handleJoin(session.id, session.max_capacity, current_participants)}
                  joined={joined}
                />
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}