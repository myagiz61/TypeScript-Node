// custom hook
// react hooklarına benzer görev yapan
// ama kendi oluştuduğumuz hooklar
// veri ve veriyi değiştrecek fonksiyon dönderler

import { useEffect, useState } from 'react';

export function useLocaleStorage<T>(
  key: string,
  initialValue: T | (() => T)
) {
  // state'i tanımlarız ve ilk değerini local'storage'dan alırı
  const [value, setValue] = useState<T>(() => {
    // local'den saklanan değerleri al
    const jsonValue = localStorage.getItem(key);

    if (jsonValue === null) {
      // lokalde eleman yoksa başlangıç değerini belirleriz
      if (typeof initialValue === 'function') {
        // eğer başlangıç değeri fonksiyonsa bu fonksiyonun sonucunu kullanırız
        return (initialValue as () => T)();
      } else {
        // eğer fonksiyon değilse değeri direkt kulanırız
        return initialValue;
      }
    } else {
      // local'de bulunursa bu değeri geri dödürme
      return JSON.parse(jsonValue);
    }
  });

  // useEffect kullanarak value her değiştiğinde local'e kaydederiz
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  // bileşenelerde döndürülecek değer ve fonksiyon belirleme
  return [value, setValue] as [T, typeof setValue];
}
