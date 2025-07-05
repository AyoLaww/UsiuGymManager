"use client";

import Header from "@/components/Header";
import SessionCard from "@/components/SessionCard";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function UserPage() {
  const [sessions, setSessions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSessions = async () => {
      const { data, error } = await supabase.from("sessions").select("*");
      if (error) {
        setError("Error fetching sessions: " + error.message);
        setLoading(false);
        return;
      }
      setSessions(data || []);
      setLoading(false);
    };
    fetchSessions();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      <Header userName="Jane Doe" />
      <main className="max-w-7xl mx-auto px-6 py-8">
        <h2 className="text-2xl font-bold mb-6 text-blue-900">Available Gym Sessions</h2>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        {loading ? (
          <p>Loading sessions...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {sessions.map((session) => (
              <SessionCard
                key={session.id}
                location={session.location}
                date={session.date}
                start_time={session.start_time}
                end_time={session.end_time}
                max_capacity={session.max_capacity}
                current_participants={0} // TODO: Replace with real participant count
                onJoin={() => {}}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}