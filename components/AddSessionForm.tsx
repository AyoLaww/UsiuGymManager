import { FC, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectItem,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";

interface AddSessionFormProps {
  onAddSession: (session: {
    location: string;
    date: string;
    start_time: string;
    end_time: string;
    max_capacity: number;
  }) => void;
}

const locations = ["USIU Gym 1", "USIU Gym 2"];

const AddSessionForm: FC<AddSessionFormProps> = ({ onAddSession }) => {
  const [location, setLocation] = useState("");
  const [date, setDate] = useState<Date | undefined>();
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [maxCapacity, setMaxCapacity] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!location || !date || !startTime || !endTime || !maxCapacity) return;
    onAddSession({
      location,
      date: format(date, "yyyy-MM-dd"),
      start_time: startTime,
      end_time: endTime,
      max_capacity: Number(maxCapacity),
    });
    setLocation("");
    setDate(undefined);
    setStartTime("");
    setEndTime("");
    setMaxCapacity("");
  };

  return (
    <Card className="p-6 mb-6 border-blue-200">
      <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
        Add New Gym Session
      </h2>
      <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleSubmit}>
        {/* Location */}
        <div>
          <Label htmlFor="location">Location</Label>
          <Select value={location} onValueChange={setLocation}>
            <SelectTrigger id="location">
              <SelectValue placeholder="Select location" />
            </SelectTrigger>
            <SelectContent>
              {locations.map((loc) => (
                <SelectItem key={loc} value={loc}>
                  {loc}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {/* Date */}
        <div>
          <Label htmlFor="date">Date</Label>
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
          <Label htmlFor="start_time">Start Time</Label>
          <Input
            id="start_time"
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
        </div>
        {/* End Time */}
        <div>
          <Label htmlFor="end_time">End Time</Label>
          <Input
            id="end_time"
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          />
        </div>
        {/* Max Capacity */}
        <div>
          <Label htmlFor="max_capacity">Maximum Capacity</Label>
          <Input
            id="max_capacity"
            type="number"
            placeholder="e.g. 30"
            value={maxCapacity}
            onChange={(e) => setMaxCapacity(e.target.value)}
          />
        </div>
        {/* Submit */}
        <div className="col-span-1 md:col-span-2 flex justify-start mt-2">
          <Button type="submit">Add Session</Button>
        </div>
      </form>
    </Card>
  );
};

export default AddSessionForm;
