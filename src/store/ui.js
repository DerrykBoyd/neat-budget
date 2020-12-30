import { writable } from "svelte/store";

export const setAlert = ({ message, color, icon, canDismiss = true }) => {
  alertMessage.set(message);
  alertColor.set(color);
  alertLeftIcon.set(icon);
  alertCanDismiss.set(canDismiss);
  showAlert.set(true);
};

export const dismissAlert = () => {
  showAlert.set(null);
  alertMessage.set("");
  alertLeftIcon.set(null);
};

export const dismissBanner = () => {
  showBanner.set(null);
  bannerMessage.set("");
  bannerLeftIcon.set(null);
};

export const showAlert = writable(null);
export const alertMessage = writable("");
export const alertColor = writable("green");
export const alertLeftIcon = writable(null);
export const alertCanDismiss = writable(true);

export const showBanner = writable(null);
export const bannerMessage = writable(null);
export const bannerColor = writable("green");
export const bannerLeftIcon = writable(null);
export const bannerCanDismiss = writable(true);
