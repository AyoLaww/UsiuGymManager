import { FC, useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectItem, SelectContent, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format, parseISO } from "date-fns";
import { SessionInput } from "@/lib/sessionService";

interface EditSessionToastProps {
  open: boolean;
  initialData: SessionInput;
  onSave: (data: SessionInput) => void;
  onCancel: () => void;
}

const locations = ["USIU Gym 1", "USIU Gym 2"];

const EditSessionToast: FC<EditSessionToastProps> = ({ open, initialData, onSave, onCancel }) => {
  const [location, setLocation] = useState(initialData.location);
  const [date, setDate] = useState<Date | undefined>(initialData.date ? parseISO(initialData.date) : undefined);
  const [startTime, setStartTime] = useState(initialData.start_time);
  const [endTime, setEndTime] = useState(initialData.end_time);
  const [maxCapacity, setMaxCapacity] = useState(initialData.max_capacity.toString());

  useEffect(() => {
    setLocation(initialData.location);
    setDate(initialData.date ? parseISO(initialData.date) : undefined);
    setStartTime(initialData.start_time);
    setEndTime(initialData.end_time);
    setMaxCapacity(initialData.max_capacity.toString());
  }, [initialData, open]);

  const handleSave = () => {
    if (!location || !date || !startTime || !endTime || !maxCapacity) return;
    onSave({
      location,
      date: format(date, "yyyy-MM-dd"),
      start_time: startTime,
      end_time: endTime,
      max_capacity: Number(maxCapacity),
    });
  };

  if (!open) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-white border rounded-lg shadow-lg p-6 w-full max-w-md flex flex-col gap-4">
      <h3 className="text-lg font-semibold mb-2 text-blue-600">Edit Session</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Location */}
        <div>
          <label className="block mb-1 text-blue-600">Location</label>
          <Select value={location} onValueChange={setLocation}>
            <SelectTrigger id="edit-location">
              <SelectValue placeholder="Select location" />
            </SelectTrigger>
            <SelectContent>
              {locations.map((loc) => (
                <SelectItem key={loc} value={loc}>{loc}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {/* Date */}
        <div>
          <label className="block mb-1 text-blue-600">Date</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={"w-full justify-start text-left font-normal" + (!date ? " text-muted-foreground" : "")}
                type="button"
              >
                {date ? format(date, "PPP") : "Pick a date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        {/* Start Time */}
        <div>
          <label className="block mb-1 text-blue-600">Start Time</label>
          <Input
            id="edit-start_time"
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
        </div>
        {/* End Time */}
        <div>
          <label className="block mb-1 text-blue-600">End Time</label>
          <Input
            id="edit-end_time"
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          />
        </div>
        {/* Max Capacity */}
        <div>
          <label className="block mb-1 text-blue-600">Maximum Capacity</label>
          <Input
            id="edit-max_capacity"
            type="number"
            placeholder="e.g. 30"
            value={maxCapacity}
            onChange={(e) => setMaxCapacity(e.target.value)}
          />
        </div>
      </div>
      <div className="flex justify-end gap-2 mt-4">
        <Button variant="outline" onClick={onCancel}>Cancel</Button>
        <Button className="bg-blue-500 text-white hover:bg-blue-600" onClick={handleSave}>Save</Button>
      </div>
    </div>
  );
};

export default EditSessionToast; 