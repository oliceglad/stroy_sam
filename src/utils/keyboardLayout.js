export const convertToCyrillic = (text) => {
  const layoutMap = {
    q: "й", w: "ц", e: "у", r: "к", t: "е", y: "н", u: "г", i: "ш", o: "щ", p: "з", "[": "х", "]": "ъ",
    a: "ф", s: "ы", d: "в", f: "а", g: "п", h: "р", j: "о", k: "л", l: "д", ";": "ж", "'": "э",
    z: "я", x: "ч", c: "с", v: "м", b: "и", n: "т", m: "ь",
  };

  return text
    .split("")
    .map((char) => {
      if (/[а-яё0-9]/i.test(char)) return char;
      const lower = char.toLowerCase();
      const mapped = layoutMap[lower];

      if (mapped) {
        return char === lower ? mapped : mapped.toUpperCase();
      }

      return char;
    })
    .join("");
};
