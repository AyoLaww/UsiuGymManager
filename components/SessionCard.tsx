import { FC } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { MapPin, Calendar, Clock, Users } from "lucide-react";

interface SessionCardProps {
  location: string;
  date: string;
  start_time: string;
  end_time: string;
  max_capacity: number;
  current_participants: number;
  onJoin?: () => void;
  joined?: boolean;
}

const SessionCard: FC<SessionCardProps> = ({ location, date, start_time, end_time, max_capacity, current_participants, onJoin, joined }) => (
  <Card className="p-5 w-full max-w-xs flex flex-col gap-4 border border-blue-200">
    <div className="flex items-center gap-2 text-blue-600 font-semibold text-base">
      <MapPin size={18} />
      <span>{location}</span>
    </div>
    <div className="flex flex-col gap-1 text-gray-700 text-sm">
      <div className="flex items-center gap-2">
        <Calendar size={16} />
        <span>{date}</span>
      </div>
      <div className="flex items-center gap-2">
        <Clock size={16} />
        <span>{start_time} - {end_time}</span>
      </div>
      <div className="flex items-center gap-2">
        <Users size={16} />
        <span>Max Capacity: {max_capacity}</span>
      </div>
    </div>
    <div>
      <div className="flex justify-between text-xs font-semibold mb-1">
        <span>Participants</span>
        <span>{current_participants}/{max_capacity}</span>
      </div>
      <Progress value={max_capacity === 0 ? 0 : (current_participants / max_capacity) * 100} />
    </div>
    <Button
      className="mt-2"
      onClick={onJoin}
      variant={joined ? "destructive" : "default"}
      disabled={!onJoin}
    >
      {joined ? "Leave" : "Join"}
    </Button>
  </Card>
);

export default SessionCard; 