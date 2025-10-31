import type { Skill, Language, ArticleSection, ContactInfo } from '@/types'

/**
 * Skills data
 */
export const skills: Skill[] = [
  { name: 'Vue', level: 90 },
  { name: 'Tailwind CSS', level: 75 },
  { name: 'CSS', level: 95 },
  { name: 'JavaScript', level: 85 },
  { name: 'TypeScript', level: 50 },
  { name: 'HTML', level: 95 },
  { name: 'Sass', level: 98 },
  { name: 'Nuxt', level: 50 },
]

/**
 * Languages data
 */
export const languages: Language[] = [
  { name: 'Spanish', level: 'Native' },
  { name: 'French', level: 'Fluent' },
  { name: 'English', level: 'Fluent' },
  { name: 'Portuguese', level: 'Professional' },
  { name: 'Italian', level: 'Conversational' },
]

/**
 * Article sections data (Profile, Employment, Certifications, Recommendations)
 */
export const articleSections: ArticleSection[] = [
  {
    title: 'Profile',
    body: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deserunt earum, repudiandae modi dolor veniam temporibus tenetur harum mollitia dolores nisi sunt similique repellat explicabo eveniet, veritatis odit, non sint delectus!',
  },
  {
    title: 'Employment history',
    companyHistory: [
      {
        company: 'Fairlyne',
        positions: [
          {
            position: 'Senior UI Frontend Developer',
            startDate: '2020-06-01',
            description: [
              'Led frontend architecture and migrated legacy codebase to Vue 3 and TypeScript.',
              'Implemented a design system with Tailwind CSS and component library to increase reusability.',
              'Improved performance and accessibility across core products, reducing bundle size by 30%.',
            ],
          },
          {
            position: 'Frontend Architect',
            startDate: '2016-02-01',
            endDate: '2020-05-31',
            description: [
              'Defined component patterns and coding standards across teams.',
              'Guided lifts to component-driven development and improved DX for new engineers.',
            ],
          },
        ],
      },
      {
        company: 'Freelance / Contract',
        positions: [
          {
            position: 'Frontend Engineer',
            startDate: '2018-01-01',
            endDate: '2019-09-30',
            description: [
              'Delivered multiple SPA projects using Nuxt and Vue.',
              'Advised clients on accessibility and responsive design best practices.',
            ],
          },
        ],
      },
    ],
  },
  {
    title: 'Licenses & certifications',
    certifications: [
      {
        title: 'Vue.js 3 Certification',
        issuedBy: 'Vue School',
        issuedDate: '2023-08-15',
        certificateImage: '/certificates/vue-js-3-certificate.jpg',
        certificateLink: 'https://vueschool.io/certificates/chechucastro-vue-js-3',
      },
      {
        title: 'TypeScript Fundamentals',
        issuedBy: 'Microsoft Learn',
        issuedDate: '2023-03-10',
        certificateImage: '/certificates/typescript-fundamentals.jpg',
        certificateLink: 'https://learn.microsoft.com/certificates/chechucastro-typescript',
      },
      {
        title: 'Tailwind CSS Mastery',
        issuedBy: 'Tailwind Labs',
        issuedDate: '2023-01-12',
        certificateImage: '/certificates/tailwind-css-mastery.jpg',
        certificateLink: 'https://tailwindcss.com/certificates/chechucastro-mastery',
      },
    ],
  },
  {
    title: 'Recommendations',
    recommendations: [
      {
        name: 'Sarah',
        surname: 'Johnson',
        jobPosition: 'Product Manager',
        postDate: '2023-10-15',
        hierarchyMode: 'client',
        postComment:
          'Chechu was an exceptional frontend developer who consistently delivered high-quality work. His attention to detail and ability to translate complex requirements into beautiful, accessible user interfaces was outstanding. He was always proactive in suggesting improvements and went above and beyond to ensure our product met the highest standards.',
      },
      {
        name: 'Michael',
        surname: 'Chen',
        jobPosition: 'Senior Full Stack Developer',
        postDate: '2023-09-22',
        hierarchyMode: 'colleague',
        postComment:
          "Working with Chechu on the same team was a fantastic experience. His expertise in Vue.js and TypeScript helped elevate our entire codebase. He's not only technically skilled but also a great team player who always helps others learn and grow. I highly recommend him for any frontend development role.",
      },
      {
        name: 'Elena',
        surname: 'Rodriguez',
        jobPosition: 'Engineering Director',
        postDate: '2023-11-08',
        hierarchyMode: 'manager',
        postComment:
          "I had the pleasure of managing Chechu directly for over two years. He consistently exceeded expectations and was instrumental in our frontend architecture decisions. His leadership in implementing our design system and mentoring junior developers made a significant impact on our team's success. Chechu is a true professional and would be an asset to any organization.",
      },
      {
        name: 'David',
        surname: 'Kim',
        jobPosition: 'Junior Frontend Developer',
        postDate: '2023-08-30',
        hierarchyMode: 'reports_to',
        postComment:
          'Chechu was an amazing mentor and technical lead. He took the time to explain complex concepts and always made himself available for questions. Under his guidance, I grew significantly as a developer. His code reviews were thorough and educational, and he created a supportive environment that encouraged learning and experimentation.',
      },
      {
        name: 'Anna',
        surname: 'Petrov',
        jobPosition: 'UX Designer',
        postDate: '2023-12-01',
        hierarchyMode: 'colleague',
        postComment:
          'Collaborating with Chechu on design-to-development handoffs was seamless. He has an excellent understanding of design principles and always implemented our designs with pixel-perfect accuracy. His suggestions for improving usability and accessibility were invaluable. Chechu truly understands the intersection of design and development.',
      },
    ],
  },
]

/**
 * Contact information
 */
export const contactInfo: ContactInfo = {
  name: 'Chechu Castro',
  jobTitle: 'UI Frontend Web Developer',
  techStack: 'VueJS • Quasar • Nuxt • TailwindCSS',
  profileImage: '/chechuLinkedInOpentoWork.jpeg',
  linkedin: {
    url: 'https://www.linkedin.com/in/chechucastro',
    handle: 'linkedin.com/in/chechucastro',
  },
  github: {
    url: 'https://github.com/chechucastro',
    handle: 'github.com/chechucastro',
  },
  email: 'chechu@digitatis.com',
  address: 'Tercera Transversal Solanas N°3, 36780 A Guarda',
  country: 'Spain',
  nationality: 'Spanish',
}

