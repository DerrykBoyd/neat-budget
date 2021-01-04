import { writable } from "svelte/store";

export const modalLoaded = writable(false);
export const showModal = writable(false);
export const modalStatus = writable("");
