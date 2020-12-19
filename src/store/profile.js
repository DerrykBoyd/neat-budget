import { writable } from "svelte/store";

export const cropSrc = writable("/images/936-900x600.jpg");
export const cropImg = writable(null);
export const cropImgLoaded = writable(false);
