import firebaseDB from './firebasedb';
import { getFirestore } from 'firebase/firestore';

const fireStore = getFirestore(firebaseDB);

export default fireStore;
