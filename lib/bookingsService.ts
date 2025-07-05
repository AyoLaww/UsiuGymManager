import { supabase } from './supabaseClient';

export async function getUserBooking(user_id: string) {
  const { data, error } = await supabase
    .from('bookings')
    .select('*')
    .eq('user_id', user_id)
    .single();
  if (error && error.code !== 'PGRST116') throw error; // PGRST116: No rows found
  return data;
}

export async function joinSession(user_id: string, session_id: string) {
  // Remove any existing booking for this user
  await supabase.from('bookings').delete().eq('user_id', user_id);
  // Add new booking
  const { data, error } = await supabase
    .from('bookings')
    .insert({ user_id, session_id })
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function leaveSession(booking_id: string) {
  const { error } = await supabase
    .from('bookings')
    .delete()
    .eq('id', booking_id);
  if (error) throw error;
  return true;
} 