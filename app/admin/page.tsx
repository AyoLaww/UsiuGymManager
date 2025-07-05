"use client";

import Header from "@/components/Header";
import AddSessionForm from "@/components/AddSessionForm";
import SessionList from "@/components/SessionList";
import EditSessionToast from "@/components/EditSessionToast";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { addSession, updateSession, deleteSession, Session, SessionInput } from "@/lib/sessionService";

export default function AdminPage() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editOpen, setEditOpen] = useState(false);
  const [editSessionId, setEditSessionId] = useState<string | null>(null);
  const [editInitialData, setEditInitialData] = useState<SessionInput | null>(null);

  // Load sessions from Supabase
  useEffect(() => {
    const fetchSessions = async () => {
      const { data, error } = await supabase.from("sessions").select("*");
      if (error) {
        setError("Error fetching sessions: " + error.message);
        return;
      }
      setSessions(data as Session[]);
      setLoading(false);
    };
    fetchSessions();
  }, []);

  // Add new session using sessionService
  const handleAddSession = async (session: SessionInput) => {
    try {
      const newSession = await addSession(session);
      setSessions((prev) => [...prev, newSession]);
    } catch (err: any) {
      setError("Error adding session: " + err.message);
    }
  };

  // Delete session using sessionService
  const handleDeleteSession = async (id: string) => {
    try {
      await deleteSession(id);
      setSessions((prev) => prev.filter((s) => s.id !== id));
    } catch (err: any) {
      setError("Error deleting session: " + err.message);
    }
  };

  // Edit session: open toast with session data
  const handleEditSession = (id: string) => {
    const session = sessions.find((s) => s.id === id);
    if (!session) return;
    setEditSessionId(id);
    setEditInitialData({
      location: session.location,
      date: session.date,
      start_time: session.start_time,
      end_time: session.end_time,
      max_capacity: session.max_capacity,
    });
    setEditOpen(true);
  };

  // Save edit: update session in Supabase and UI
  const handleSaveEdit = async (data: SessionInput) => {
    if (!editSessionId) return;
    try {
      const updated = await updateSession(editSessionId, data);
      setSessions((prev) => prev.map((s) => (s.id === editSessionId ? updated : s)));
      setEditOpen(false);
      setEditSessionId(null);
      setEditInitialData(null);
    } catch (err: any) {
      setError("Error updating session: " + err.message);
    }
  };

  // Cancel edit
  const handleCancelEdit = () => {
    setEditOpen(false);
    setEditSessionId(null);
    setEditInitialData(null);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header userName="Admin" />
      <main className="max-w-6xl mx-auto p-6">
        <AddSessionForm onAddSession={handleAddSession} />
        {error && <p className="text-red-500 mb-2">{error}</p>}
        {loading ? (
          <p>Loading sessions...</p>
        ) : (
          <SessionList
            sessions={sessions}
            onEdit={handleEditSession}
            onDelete={handleDeleteSession}
          />
        )}
        <EditSessionToast
          open={editOpen}
          initialData={editInitialData || {
            location: "",
            date: "",
            start_time: "",
            end_time: "",
            max_capacity: 0,
          }}
          onSave={handleSaveEdit}
          onCancel={handleCancelEdit}
        />
      </main>
    </div>
  );
}
