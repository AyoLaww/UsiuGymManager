import { supabase } from './supabaseClient';

export type Session = {
  id: string;
  location: string;
  date: string;
  start_time: string;
  end_time: string;
  max_capacity: number;
};

export type SessionInput = Omit<Session, 'id'>;

export async function addSession(session: SessionInput) {
  const { data, error } = await supabase
    .from('sessions')
    .insert(session)
    .select()
    .single();
  if (error) throw error;
  return data as Session;
}

export async function updateSession(id: string, updates: Partial<SessionInput>) {
  const { data, error } = await supabase
    .from('sessions')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data as Session;
}

export async function deleteSession(id: string) {
  const { error } = await supabase
    .from('sessions')
    .delete()
    .eq('id', id);
  if (error) throw error;
  return true;
} 