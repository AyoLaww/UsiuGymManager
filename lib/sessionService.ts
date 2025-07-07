import { supabase } from './supabaseClient';


export type SessionInput = {
  location: string;
  date: string;
  start_time: string;
  end_time: string;
  max_capacity: number;
};

