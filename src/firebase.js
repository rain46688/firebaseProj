import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";

import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
} from "firebase/firestore";
const firebaseConfig = {
    apiKey: "AIzaSyA8Qkcyzo-N6GPr1MBe1F9FFDTwqaftZCo",
    authDomain: "gongsacok-af16a.firebaseapp.com",
    projectId: "gongsacok-af16a",
    storageBucket: "gongsacok-af16a.appspot.com",
    messagingSenderId: "1084444599713",
    appId: "1:1084444599713:web:848411cc047e55078b17e0",
    measurementId: "G-8NE73C5LQ3"
  };
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

// 구글 로그인
const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });
    }
  } catch (err) {
    console.log(err.code)
    throw new Error(err);
  }
};

// 알반 이메일 로그인
const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    console.log(err.code);
    switch (err.code) {
      case 'auth/wrong-password':
        throw new Error('이메일 혹은 비밀번호가 일치하지 않습니다.');
      default:
        throw new Error('이메일 혹은 비밀번호를 제대로 입력해주세요.');
    }
  }
};

// 일반 회원가입
const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
    alert("회원 가입이 완료 되었습니다.");
  } catch (err) {
    console.log(err.code)
    switch (err.code) {
      case 'auth/internal-error':
        throw new Error('이메일 혹은 비밀번호를 제대로 입력해주세요.');
      case 'auth/invalid-email':
        throw new Error('이메일 양식을 제대로 입력해주세요.');
      case 'auth/weak-password':
        throw new Error('비밀번호를 제대로 입력해주세요.');
      case 'auth/email-already-in-use':
        throw new Error('이미 가입된 회원입니다.');
      default:
        throw new Error('회원가입 중 오류가 발생하였습니다.');
    }
    
  }
};

// 비밀번호 리셋
const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("이메일이 발송 되었습니다. 비밀번호 변경을 진행해주세요.");
  } catch (err) {
    console.log(err.code)
    throw new Error(err);
  }
};
const logout = async () => {
    await signOut(auth).then(() => {
        console.log("successful : ",auth);
        alert("로그아웃이 완료 되었습니다.");
      }).catch((err) => {
        console.log(err.code)
        throw new Error(err);
      });
};

const getUserDocument = async uid => {
  if (!uid) return null;
  try {
    const userDocument = await getFirestore.doc(`users/${uid}`).get();

    return {
      uid,
      ...userDocument.data()
    };
  } catch (err) {
    console.log(err.code)
  }
};

export {
  auth,
  db,
  signInWithGoogle,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout,
  getUserDocument,
};