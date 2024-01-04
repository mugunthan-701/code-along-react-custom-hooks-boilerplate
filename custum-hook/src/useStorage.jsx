import { useState, useEffect } from "react";

function getStoredValue(key, initialValue, storageType) {
 const storedValue = JSON.parse(storageType.getItem(key));
 if (storedValue !== null && storedValue !== undefined) {
   return storedValue;
 }

 if (initialValue instanceof Function) {
   return initialValue();
 }

 return initialValue;
}

export default function useStorage(key, initialValue) {
 const [value, setValue] = useState(() =>
   getStoredValue(key, initialValue, localStorage)
 );

 useEffect(() => {
   setValue((prevValue) => {
     localStorage.setItem(key, JSON.stringify(prevValue));
     sessionStorage.setItem(key, JSON.stringify(prevValue));
     return prevValue;
   });
 }, [value, key]);

 return [value, setValue];
}