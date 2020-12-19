import { writable } from "svelte/store";

export const cropSrc = writable("");
export const cropImg = writable(null);
export const cropImgLoaded = writable(false);
