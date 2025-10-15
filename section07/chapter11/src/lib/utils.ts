import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const adjectives = [
  "행복한",
  "용감한",
  "똑똑한",
  "친절한",
  "차분한",
  "현명한",
  "빠른",
  "밝은",
  "상냥한",
  "대담한",
  "귀여운",
  "멋진",
  "유쾌한",
  "활발한",
  "조용한",
  "열정적인",
  "창의적인",
  "재미있는",
  "진지한",
  "낙천적인",
];

const nouns = [
  "판다",
  "호랑이",
  "독수리",
  "돌고래",
  "여우",
  "늑대",
  "곰",
  "사자",
  "매",
  "고래",
  "토끼",
  "코끼리",
  "기린",
  "원숭이",
  "펭귄",
  "고슴도치",
  "다람쥐",
  "공룡",
  "앵무새",
  "햄스터",
];

export const getRandomNickname = () => {
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  const number = Math.floor(Math.random() * 100);

  return `${adjective}${noun}${number}`;
};
