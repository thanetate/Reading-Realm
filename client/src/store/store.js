import { atom, createStore, } from 'jotai';

export const posts = atom([]);
export const user = atom({}); // TODO: actually use this
export const books = atom([]); // TODO

//make sure this writes to local storage and refreshes like in userContext
//atom with storage -> !!! use this instead of writing it to local storage

export const store = createStore();
store.set(posts, []);
store.set(user, {});
store.set(books, []);

