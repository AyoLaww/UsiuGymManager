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
  const [formError, setFormError] = useState<string | null>(null);

  const isPastDate = date ? date < new Date(new Date().setHours(0,0,0,0)) : false;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!location || !date || !startTime || !endTime || !maxCapacity) return;
    if (isPastDate) {
      setFormError("You cannot select a date in the past.");
      return;
    }
    setFormError(null);
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
    <Card className="p-6 mb-6 ">
      <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-blue-600">
        Add New Gym Session
      </h2>
      <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={handleSubmit}>
        {/* Location */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="location" className="text-blue-600">Location</Label>
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
        <div className="flex flex-col gap-2">
          <Label htmlFor="date" className="text-blue-600">Date</Label>
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
        <div className="flex flex-col gap-2">
          <Label htmlFor="start_time" className="text-blue-600">Start Time</Label>
          <Input
            id="start_time"
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
        </div>
        {/* End Time */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="end_time" className="text-blue-600">End Time</Label>
          <Input
            id="end_time"
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          />
        </div>
        {/* Max Capacity */}
        <div className="flex flex-col gap-2">
          <Label htmlFor="max_capacity" className="text-blue-600">Maximum Capacity</Label>
          <Input
            id="max_capacity"
            type="number"
            placeholder="e.g. 30"
            value={maxCapacity}
            onChange={(e) => setMaxCapacity(e.target.value)}
          />
        </div>
        {/* Submit */}
        <div className="col-span-1 md:col-span-2 flex flex-col justify-start mt-2">
          {formError && <span className="text-red-500 mb-2">{formError}</span>}
          <Button type="submit" className="bg-blue-500 text-white hover:bg-blue-600" disabled={isPastDate}>Add Session</Button>
        </div>
      </form>
    </Card>
  );
};

export default AddSessionForm;
