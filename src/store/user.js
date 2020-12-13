import {writable} from 'svelte/store'

export const user = writable(null, () => {
  console.log(' Subscribed to user');
  return () => console.log('no more subscribers');
});

export const loadingUser = writable(false);