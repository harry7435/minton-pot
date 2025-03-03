'use server';

import fireStore from '@/firebase/firestore';
import { Group } from '@/types/group';
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';

export async function createGroup(groupData: Group) {
  try {
    const createdAt = new Date();
    const expiredAt = new Date();
    expiredAt.setMonth(expiredAt.getMonth() + 1);

    const existingCodes = await getAllGroupCodes();
    const code = await generateUniqueCode(existingCodes);

    const docRef = await addDoc(collection(fireStore, 'groups'), {
      ...groupData,
      code,
      createdAt,
      expiredAt,
    });

    return {
      data: { id: docRef.id, ...groupData, code, createdAt, expiredAt },
    };
  } catch (error) {
    console.error('Error createGroup:', error);
    return { error };
  }
}

export async function addMemberToGroup(
  code: number,
  memberData: {
    name: string;
    level: string;
    ageGroup: string;
    gender: string;
    lastPhoneNumber: number;
  }
) {
  try {
    const q = query(collection(fireStore, 'groups'), where('code', '==', code));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return { success: false, error: 'No matching documents.' };
    }

    const groupDoc = querySnapshot.docs[0];
    const groupRef = doc(fireStore, 'groups', groupDoc.id);

    await updateDoc(groupRef, {
      members: arrayUnion(memberData),
    });

    return { success: true };
  } catch (error) {
    console.error('Error addMemberToGroup:', error);
    return { success: false, error };
  }
}

export async function getGroupByCode(code: number) {
  try {
    const q = query(collection(fireStore, 'groups'), where('code', '==', code));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return { data: null, error: 'No matching documents.' };
    }

    const groupData = querySnapshot.docs[0].data();

    return { ...groupData, exerciseTime: groupData.exerciseTime.toDate() };
  } catch (error) {
    console.error('Error getGroup:', error);
    return { data: null, error };
  }
}

export async function getAllGroupCodes(): Promise<number[]> {
  try {
    const querySnapshot = await getDocs(collection(fireStore, 'groups'));
    const codes: number[] = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      if (data.code) {
        codes.push(data.code);
      }
    });

    return codes;
  } catch (error) {
    console.error('Error getAllGroupCodes:', error);
    return [];
  }
}

async function generateUniqueCode(existingCodes: number[]): Promise<number> {
  let code;
  // 4~6자리 숫자 코드 생성
  const min = 1000;
  const max = 999999;
  do {
    code = Math.floor(Math.random() * (max - min + 1)) + min;
  } while (existingCodes.includes(code));
  return code;
}
