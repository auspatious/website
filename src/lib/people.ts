import type { Picture } from '@sveltejs/enhanced-img';
import alex from '$lib/assets/images/alex3.jpg?enhanced';
import will from '$lib/assets/images/will.jpg?enhanced';

export type Person = {
  slug: string;
  name: string;
  title: string;
  image: Picture;
  linkedin: string;
  bio: string[];
  /** Home state, as a [west, south, east, north] bbox for the STAC catalog. */
  location: { name: string; bbox: [number, number, number, number] };
};

export const people: Person[] = [
  {
    slug: 'alex-leith',
    name: 'Alex Leith',
    title: 'Founder',
    image: alex,
    linkedin: 'https://linkedin.com/in/alex-leith',
    location: { name: 'Tasmania', bbox: [143.8, -43.7, 148.5, -39.6] },
    bio: [
      'Alex is an open geospatial technologist with deep expertise in software development, cloud infrastructure, and program governance, all focused on making Earth observation data more accessible, actionable, and aligned with sustainable development.',
      'Outside of running Auspatious, he volunteers his purpose, principles, and time on the Spatio-Temporal Asset Catalog Project Steering Committee, as a Non-Executive Board Director at OSGeo Oceania and oversees financial stewardship as Treasurer at Earth Observation Australia.',
      "In his carved out personal time, you'll find him exploring wilderness trails with his children and in the quiet joy of discovering a well-crafted beer."
    ]
  },
  {
    slug: 'will-jones',
    name: 'Will Jones',
    title: 'Senior Software Engineer',
    image: will,
    linkedin: 'https://linkedin.com/in/william-jones-spatial/',
    location: { name: 'Victoria', bbox: [140.96, -39.2, 150.0, -33.98] },
    bio: [
      'Will is a Senior Software Engineer who is deeply passionate about geospatial tech. With over eight years of experience delivering spatial solutions globally, he specialises in building cloud-native workflows, automating spatial data pipelines, and developing full-stack applications across open-source stacks, with extensive expertise in Python, JavaScript and SQL.',
      "He's led projects from concept to deployment across environmental management, land administration, natural disaster recovery, retail site selection and Earth observation. Known for making technical complexity simpler for stakeholders, mentoring teams, and championing emerging geospatial tools, Will brings both depth and clarity to every project.",
      'Will is passionate about making spatial data and tools more accessible, actionable, and impactful so more people can use them to solve real-world problems such as climate change, and sustainable development.'
    ]
  }
];
