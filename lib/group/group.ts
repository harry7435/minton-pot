import { supabase } from '../supabaseClient';

export interface Group {
  meetingName: string;
  stadiumName: string;
  location: string;
  exerciseTime: Date;
  maxPeople: number;
  totalCourts: number;
  password: number;
}

export const createGroup = async (submitData: Group, groupCode: number) => {
  const {
    location,
    maxPeople,
    meetingName,
    password,
    totalCourts,
    stadiumName,
  } = submitData;

  const { error } = await supabase.from('group').insert([
    {
      location,
      maxPeople,
      name: meetingName,
      password,
      totalCourts,
      stadiumName,
      groupCode,
    },
  ]);

  if (error) console.error(error);
  return { error };
};
