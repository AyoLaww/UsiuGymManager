import { FC } from "react";
import AdminSessionCard from "./AdminSessionCard";

interface Session {
  id: string;
  location: string;
  date: string;
  start_time: string;
  end_time: string;
  max_capacity: number;
}

interface SessionListProps {
  sessions: Session[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const SessionList: FC<SessionListProps> = ({ sessions, onEdit, onDelete }) => (
  <section className="mt-2">
    <h2 className="text-lg font-semibold mb-4">Manage Gym Sessions</h2>
    <div className="flex flex-wrap gap-4">
      {sessions.map(session => (
        <AdminSessionCard
          key={session.id}
          location={session.location}
          date={session.date}
          start_time={session.start_time}
          end_time={session.end_time}
          max_capacity={session.max_capacity}
          onEdit={() => onEdit(session.id)}
          onDelete={() => onDelete(session.id)}
        />
      ))}
    </div>
  </section>
);

export default SessionList; 