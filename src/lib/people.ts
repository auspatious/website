import type { Picture } from 'vite-imagetools';
import alex from '$lib/assets/images/alex.jpg?enhanced';
import will from '$lib/assets/images/will.jpg?enhanced';

export type Person = {
  name: string;
  title: string;
  image: Picture;
  linkedin: string;
};

export const people: Person[] = [
  {
    name: 'Alex Leith',
    title: 'Founder',
    image: alex,
    linkedin: 'https://linkedin.com/in/alexleith'
  },
  {
    name: 'Will Jones',
    title: 'Senior Software Engineer',
    image: will,
    linkedin: 'https://linkedin.com/in/william-jones-spatial/'
  }
];
