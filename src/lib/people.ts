import type { Picture } from '@sveltejs/enhanced-img';
import alex from '$lib/assets/images/alex3.jpg?enhanced';
import will from '$lib/assets/images/will-grinning.jpg?enhanced';
import caitlin from '$lib/assets/images/caitlin.jpg?enhanced';

export type Person = {
  slug: string;
  name: string;
  title: string;
  image: Picture;
  linkedin: string;
  /** Path under static/, e.g. /cv/alex-leith.pdf. */
  cv: string;
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
    cv: '/cv/alex-leith.pdf',
    location: { name: 'Tasmania', bbox: [147.27, -42.92, 147.41, -42.81] },
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
    cv: '/cv/will-jones.pdf',
    location: { name: 'Victoria', bbox: [144.67, -38.06, 145.28, -37.56] },
    bio: [
      'Will is a Senior Software Engineer who is deeply passionate about geospatial tech. With over eight years of experience delivering spatial solutions globally, he specialises in building cloud-native workflows, automating spatial data pipelines, and developing full-stack applications across open-source stacks, with extensive expertise in Python, JavaScript and SQL.',
      "He's led projects from concept to deployment across environmental management, land administration, natural disaster recovery, retail site selection and Earth observation. Known for making technical complexity simpler for stakeholders, mentoring teams, and championing emerging geospatial tools, Will brings both depth and clarity to every project.",
      'Will is passionate about making spatial data and tools more accessible, actionable, and impactful so more people can use them to solve real-world problems such as climate change, and sustainable development.'
    ]
  },
  {
    slug: 'caitlin-adams',
    name: 'Caitlin Adams',
    title: 'Senior Data Scientist',
    image: caitlin,
    linkedin: 'https://www.linkedin.com/in/caitlinisabeladams/',
    cv: '/cv/caitlin-adams.pdf',
    location: { name: 'South Australia', bbox: [138.28, -35.16, 138.94, -34.63] },
    bio: [
      'Caitlin is a Senior Data Scientist specialising in machine learning and analytics for Earth observation, with a passion for helping people understand the planet we live on. Her background in physics makes her an excellent problem solver and she relishes the challenge of drawing out meaningful insights from complex data.',
      'During her career, Caitlin has built machine learning and data processing pipelines across Australia, Africa, and Antarctica, with a focus on environmental monitoring. She takes pride in her empathetic approach to understanding user needs, building tailored solutions that solve the challenges people are facing.',
      'Caitlin cares deeply about helping others develop their knowledge and skills, and she excels in designing and delivering hands-on training workshops that teach participants to apply Earth observation concepts and tools in their work.'
    ]
  }
];
