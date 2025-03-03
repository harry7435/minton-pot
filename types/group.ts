import { DocumentData } from 'firebase/firestore';

export interface Group {
  meetingName: string;
  stadiumName: string;
  location: string;
  exerciseTime: Date;
  maxPeople: number;
  totalCourts: number;
  password: number;
}

export interface GroupResponse extends Group {
  createdAt: Date;
  expiredAt: Date;
}

export function isGroup(data: DocumentData): data is Group {
  return (
    data &&
    typeof data === 'object' &&
    'totalCourts' in data &&
    'code' in data &&
    'password' in data &&
    'exerciseTime' in data &&
    'maxPeople' in data &&
    'expiredAt' in data &&
    'location' in data &&
    'meetingName' in data &&
    'createdAt' in data &&
    'stadiumName' in data
  );
}
