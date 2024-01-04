import { useState, useEffect, useCallback } from "react";

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

 const setBothValues = useCallback((newValue) => {
   setValue(newValue);
   localStorage.setItem(key, JSON.stringify(newValue));
   sessionStorage.setItem(key, JSON.stringify(newValue));
 }, [key]);

 useEffect(() => {
   setBothValues(value);
 }, [value, key, setBothValues]);

 return [value, setBothValues];
}