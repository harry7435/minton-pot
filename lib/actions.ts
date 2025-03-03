'use server';

import fireStore from '@/firebase/firestore';
import { Group } from '@/types/group';
import { addDoc, collection } from 'firebase/firestore';

export async function createGroup(groupData: Group, code: number) {
  try {
    const expiredAt = new Date();
    expiredAt.setMonth(expiredAt.getMonth() + 1);
    const docRef = await addDoc(collection(fireStore, 'groups'), {
      ...groupData,
      code,
      createdAt: new Date(),
      expiredAt,
    });

    return {
      data: { id: docRef.id, ...groupData, code, createdAt: new Date() },
    };
  } catch (error) {
    console.error('Error createGroup:', error);
    return { error };
  }
}
