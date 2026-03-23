import type { Picture } from 'vite-imagetools';

export type Person = {
  name: string;
  title: string;
  image: Picture;
  linkedin: string;
};


export const people: Person[] = [
  {
    name: "Alex Leith",
    title: "Founder",
    image: import('$lib/assets/people/alex.jpg?enhanced'),
    linkedin: "https://linkedin.com/in/alexleith"
  },
  {
    name: "Will Jones",
    title: "Senior Software Engineer",
    image: import('$lib/assets/people/will.jpg?enhanced'),
    linkedin: "https://linkedin.com/in/william-jones-spatial/"
  }
];
