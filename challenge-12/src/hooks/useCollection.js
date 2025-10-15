import { useState } from 'react';
import { db } from '../firebase/config';
import { collection, query, where, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';

const useCollection = (table) => {
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);

  const getAll = async (condition) => {
    setResults([]);
    let q = null;
    if (condition && condition.length === 3) {
      q = query(collection(db, table), where(condition[0], condition[1], condition[2]));
    } else {
      q = query(collection(db, table));
    }
    try {
      const resDoc = await getDocs(q);
      const list = [];
      resDoc.forEach((doc) => {
        list.push({ ...doc.data(), id: doc.id });
      });
      setResults(list);
    } catch (err) {
      setError(err.message);
    }
  };

  const add = async (newDoc) => {
    setIsPending(true);
    try {
      const resDoc = await addDoc(collection(db, table), newDoc);
      setIsPending(false);
      return resDoc;
    } catch (err) {
      setError(err.message);
      setIsPending(false);
      return null;
    }
  };

  const update = async (id, updates) => {
    setIsPending(true);
    try {
      await updateDoc(doc(db, table, id), updates);
      setIsPending(false);
      return true;
    } catch (err) {
      setError(err.message);
      setIsPending(false);
      return false;
    }
  };

 
  const remove = async (id) => {
    setIsPending(true);
    try {
      await deleteDoc(doc(db, table, id));
      setIsPending(false);
      return true;
    } catch (err) {
      setError(err.message);
      setIsPending(false);
      return false;
    }
  };

  return { error, isPending, results, add, getAll, update, remove };
};

export default useCollection;