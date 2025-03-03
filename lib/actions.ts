'use server';

import fireStore from '@/firebase/firestore';
import { Group } from '@/types/group';
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';

export async function createGroup(groupData: Group, code: number) {
  try {
    const createdAt = new Date();
    const expiredAt = new Date();
    expiredAt.setMonth(expiredAt.getMonth() + 1);
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

export async function getGroup(code: number) {
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
