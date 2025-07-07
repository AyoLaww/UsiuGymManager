import { supabase } from "@/lib/supabaseClient";

export interface SessionProps {
  id: string;
  location: string;
  date: string;
  start_time: string;
  end_time: string;
  max_capacity: number;
}

export class Session {
  id: string;
  location: string;
  date: string;
  start_time: string;
  end_time: string;
  max_capacity: number;

  constructor(props: SessionProps) {
    this.id = props.id;
    this.location = props.location;
    this.date = props.date;
    this.start_time = props.start_time;
    this.end_time = props.end_time;
    this.max_capacity = props.max_capacity;
  }

  static fromRaw(raw: any): Session {
    return new Session({
      id: raw.id,
      location: raw.location,
      date: raw.date,
      start_time: raw.start_time,
      end_time: raw.end_time,
      max_capacity: raw.max_capacity,
    });
  }

  static async fetchAll(): Promise<Session[]> {
    const { data, error } = await supabase.from("sessions").select("*");
    if (error) throw new Error(error.message);
    return (data || []).map((raw: any) => Session.fromRaw(raw));
  }

  static async create(data: Omit<SessionProps, 'id'>): Promise<Session> {
    const { supabase } = await import("@/lib/supabaseClient");
    const { data: sessionData, error } = await supabase
      .from("sessions")
      .insert(data)
      .select()
      .single();
    if (error) throw new Error(error.message);
    return Session.fromRaw(sessionData);
  }

  async update(updates: Partial<Omit<SessionProps, 'id'>>): Promise<Session> {
    const { supabase } = await import("@/lib/supabaseClient");
    const { data, error } = await supabase
      .from("sessions")
      .update(updates)
      .eq("id", this.id)
      .select()
      .single();
    if (error) throw new Error(error.message);
    Object.assign(this, updates);
    return Session.fromRaw(data);
  }

  async delete(): Promise<boolean> {
    const { supabase } = await import("@/lib/supabaseClient");
    const { error } = await supabase
      .from("sessions")
      .delete()
      .eq("id", this.id);
    if (error) throw new Error(error.message);
    return true;
  }

  
} 