import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "./config";

export const uploadFile = async (file: File, path: string) => {
  const storageRef = ref(storage, path);
  const snapshot = await uploadBytes(storageRef, file);
  return getDownloadURL(snapshot.ref);
};

export const uploadImage = async (file: File, folder: string) => {
  const timestamp = Date.now();
  const path = `${folder}/${timestamp}_${file.name}`;
  return uploadFile(file, path);
};

export const uploadVideo = async (file: File, folder: string) => {
  const timestamp = Date.now();
  const path = `${folder}/${timestamp}_${file.name}`;
  return uploadFile(file, path);
};
