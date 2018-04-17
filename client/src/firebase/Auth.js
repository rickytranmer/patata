import { auth } from './Firebase';

// Sign Up
export const createUserWithEmail = (email, password)=>
	auth.createUserWithEmailAndPassword(email, password);

// Sign In
export const signInWithEmail = (email, password)=>
	auth.signInWithEmailAndPassword(email, password);

// Sign out
export const userSignOut = ()=>
	auth.signOut();