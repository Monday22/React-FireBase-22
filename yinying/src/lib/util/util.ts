<<<<<<< HEAD
import { Timestamp } from "firebase/firestore";
import { toast } from "react-toastify";
=======
>>>>>>> de7542c0fb3298521bac62c709b896e39257d0f7
export function debounce<T extends unknown[], U>(
  callback: (...args: T) => PromiseLike<U> | U,
  wait: number
) {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: T): Promise<U> => {
    clearTimeout(timer);
    return new Promise((resolve) => {
      timer = setTimeout(() => resolve(callback(...args)), wait);
    });
  };
<<<<<<< HEAD
}
export const convertTimestamps = (data: unknown): unknown => {
  if (Array.isArray(data)) {
    return data.map(convertTimestamps);
  } else if (data instanceof Timestamp) {
    return data.toDate().toISOString();
  } else if (data && typeof data === 'object') {
    return Object.fromEntries(
      Object.entries(data).map(([keyframes, value]) => [keyframes, convertTimestamps(value)])
    )
  }
  return data;
}
export function handleError(error: unknown) {
  if (error instanceof Error) {
    toast.error(error.message)
  } else if (typeof error === 'string') {
    toast.error(error)
  } else {
    toast.error('Something went wrong')
  }
=======
>>>>>>> de7542c0fb3298521bac62c709b896e39257d0f7
}