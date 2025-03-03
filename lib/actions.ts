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
import { v4 as uuidv4 } from 'uuid';

export async function createGroup(groupData: Group) {
  try {
    const createdAt = new Date();
    const expiredAt = new Date();
    expiredAt.setMonth(expiredAt.getMonth() + 1);

    const existingCodes = await getAllGroupCodes();
    const code = await generateUniqueCode(existingCodes);

    const newGroupData = {
      ...groupData,
      code,
      createdAt,
      expiredAt,
      members: [],
      adminMemberIds: [],
    };

    const docRef = await addDoc(collection(fireStore, 'groups'), newGroupData);

    return {
      data: { id: docRef.id, ...newGroupData },
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

    const groupData = groupDoc.data();
    const existingMemberIds = groupData.members.map(
      (member: { id: string }) => member.id
    );

    console.log(groupData);

    const memberId = await generateUniqueMemberId(existingMemberIds);
    const memberWithId = { ...memberData, id: memberId };

    if (groupDoc.data().adminMemberIds.length === 0) {
      await updateDoc(groupRef, {
        members: arrayUnion(memberWithId),
        adminMemberIds: arrayUnion(memberWithId.id),
      });
    } else {
      await updateDoc(groupRef, {
        members: arrayUnion(memberWithId),
      });
    }

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

async function generateUniqueMemberId(
  existingMemberIds: string[]
): Promise<string> {
  let memberId;
  do {
    memberId = uuidv4();
  } while (existingMemberIds.includes(memberId));
  return memberId;
}
