import { FC } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Users, Calendar, Clock } from "lucide-react";

interface AdminSessionCardProps {
  location: string;
  date: string;
  start_time: string;
  end_time: string;
  max_capacity: number;
  onEdit: () => void;
  onDelete: () => void;
}

const AdminSessionCard: FC<AdminSessionCardProps> = ({ location, date, start_time, end_time, max_capacity, onEdit, onDelete }) => (
  <Card className="p-5 w-full max-w-xs flex flex-col gap-4 border">
    <div className="flex items-center gap-2 text-blue-600 font-semibold text-base">
      <MapPin size={18} />
      <span className="underline cursor-pointer">{location}</span>
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
    <div className="flex gap-2 mt-2">
      <Button variant="outline" className="border-blue-500 text-blue-600" onClick={onEdit}>Edit</Button>
      <Button variant="destructive" onClick={onDelete}>Delete</Button>
    </div>
  </Card>
);

export default AdminSessionCard; 