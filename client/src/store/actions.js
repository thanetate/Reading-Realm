import { posts, store } from "./store";

export function fetchPosts() {
    store.set(posts, [
        {
            title: 'My Title',
            description: 'My Description'
        },
        {
            title: 'My Title',
            description: 'My Description'
        },
        {
            title: 'My Title',
            description: 'My Description'
        },
        {
            title: 'My Title',
            description: 'My Description'
        }
    ])
}

export function login() {
    // make a call to post /login
    // get the response, and set it in the "user" atom in the store

    // store.set(user, {
    //     ...
    // })
}