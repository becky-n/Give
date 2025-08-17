const { db } = require('../firebase/firebase');
import {
  collection, addDoc, serverTimestamp, query, where, orderBy, limit, getDocs
} from 'firebase/firestore';

export async function createPost({ currentUser, content, mediaUrls = [], tags = [] }) {
  if (!currentUser) throw new Error('Must be signed in');

  const post = {
    authorId: currentUser.uid,
    authorDisplayName: currentUser.displayName ?? null,
    authorPhotoURL: currentUser.photoURL ?? null,
    content,
    mediaUrls,
    tags,
    polls: [],
    // visibility: 'public',
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    // stats: { likeCount: 0, commentCount: 0, viewCount: 0 },
  };

  return await addDoc(collection(db, 'posts'), post);
}


export async function getPosts({ limitCount = 10, orderByField = 'createdAt', orderDirection = 'desc' } = {}) {
  const postsRef = collection(db, 'posts');
  const q = query(
    postsRef,
    orderBy(orderByField, orderDirection),
    limit(limitCount)
  );

  const querySnapshot = await getDocs(q);
  const posts = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  return posts;
}