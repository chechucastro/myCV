import type { Skill, Language, ArticleSection, ContactInfo } from '@/types'

/**
 * Skills data
 */
export const skills: Skill[] = [
  { name: 'Vue', level: 90 },
  { name: 'Tailwind CSS', level: 75 },
  { name: 'Sass/Less/Stylus', level: 98 },
  { name: 'JavaScript', level: 85 },
  { name: 'TypeScript', level: 50 },
  { name: 'HTML', level: 95 },
  { name: 'Nuxt', level: 50 },
  { name: 'Bootstrap', level: 80 },
  { name: 'Vuetify', level: 75 },
  { name: 'Responsive Web Design (RWD)', level: 92 },
  { name: 'UI Implementation', level: 90 },
  { name: 'Component Libraries', level: 85 },
  { name: 'Atomic Design', level: 82 },
  { name: 'SOLID principles', level: 88 },
  { name: 'Agile Methodologies', level: 85 },
  { name: 'RESTful APIs', level: 83 },
  { name: 'Figma', level: 70 },
  { name: 'Git', level: 90 },
  { name: 'Unit Testing', level: 75 },
  { name: 'Cypress', level: 68 },
  { name: 'Vitest', level: 72 },
  { name: 'Playwright', level: 65 },
  { name: 'Vite', level: 85 },
  { name: 'Axios', level: 82 },
  { name: 'Mjml', level: 78 },
  { name: 'Email templates', level: 75 },
  { name: 'Twig', level: 72 },
  { name: 'Swagger', level: 70 },
  { name: 'Jira', level: 88 },
  { name: 'Jquery', level: 90 },
  { name: 'Scrum and agile methodologies', level: 85 },
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
    body: 'Front-End Web developer with 15+ years of experience building scalable, high-performance, and responsive web applications. Specialized in Vue 3, Quasar framework, Nuxt 4 and Tailwind CSS/ Bootstrap to develop modern UI systems for enterprise, e-commerce, and SaaS platforms. Skilled in modular front-end architecture, atomic design systems, and cross-functional collaboration with design and backend teams.\n\nDemonstrated success in improving web performance, reducing technical debt, and optimizing developer workflows using modern frameworks, reusable components, and CI/CD pipelines.',
  },
  {
    title: 'Core Competencies',
    body: 'Front-End Development • Vue.js 2/3 • Nuxt 3/4 • Tailwind CSS • Tailwind variants • Bootstrap • Vuetify • TypeScript • JavaScript (ES6+) • Responsive Web Design (RWD) • UI Implementation • Component Libraries • Atomic Design • SOLID principles • Agile Methodologies • RESTful APIs • Figma • Git • Unit Testing • Cypress • Vitest • Playwright • Vite • Vue Query • Axios • Sass • Less • Stylus • Html • Mjml • Email templates • Twig • AWS/S3 • Lighthouse • Swagger • Jira • Scrum and agile methodologies',
  },
  {
    title: 'Employment history',
    companyHistory: [
      {
        companyKey: 'fairlyne',
        companyLogo: '/company-logos/fairlyne.webp',
        positions: [
          {
            startDate: '2023-10-01',
            endDate: '2025-10-31',
          },
        ],
      },
      {
        companyKey: 'prada-group',
        companyLogo: '/company-logos/prada.webp',
        positions: [
          {
            startDate: '2023-03-01',
            endDate: '2023-07-31',
          },
        ],
      },
      {
        companyKey: 'der-gruene-punkt',
        companyLogo: '/company-logos/der-gruene-punkt.webp',
        positions: [
          {
            startDate: '2022-04-01',
            endDate: '2023-02-28',
          },
        ],
      },
      {
        companyKey: 'infopro-digital',
        companyLogo: '/company-logos/infopro-digital.webp',
        positions: [
          {
            startDate: '2019-01-01',
            endDate: '2021-12-31',
          },
        ],
      },
      {
        companyKey: 'saint-gobain',
        companyLogo: '/company-logos/saint-gobain.webp',
        positions: [
          {
            startDate: '2016-11-01',
            endDate: '2018-12-31',
          },
        ],
      },
      {
        companyKey: 'donkeycode',
        companyLogo: '/company-logos/donkeycode.webp',
        positions: [
          {
            startDate: '2016-11-01',
            endDate: '2016-12-31',
          },
        ],
      },
      {
        companyKey: 'pixmania-group',
        companyLogo: '/company-logos/pixmania.webp',
        positions: [
          {
            startDate: '2015-09-01',
            endDate: '2016-10-31',
          },
        ],
      },
      {
        companyKey: 'e-merchant',
        companyLogo: '/company-logos/e-merchant.webp',
        positions: [
          {
            startDate: '2014-03-01',
            endDate: '2015-08-31',
          },
        ],
      },
      {
        companyKey: 'mazarine-digital',
        companyLogo: '/company-logos/mazarine.webp',
        positions: [
          {
            startDate: '2013-12-01',
            endDate: '2014-01-31',
          },
        ],
      },
      {
        companyKey: 'loreal',
        companyLogo: '/company-logos/loreal.webp',
        positions: [
          {
            startDate: '2012-10-01',
            endDate: '2013-10-31',
          },
        ],
      },
      {
        companyKey: 'accor-hotels',
        companyLogo: '/company-logos/accor.webp',
        positions: [
          {
            startDate: '2009-01-01',
            endDate: '2012-05-31',
          },
        ],
      },
      {
        companyKey: 'wolters-kluwer-france',
        companyLogo: '/company-logos/wolters-kluwer.webp',
        positions: [
          {
            startDate: '2008-10-01',
            endDate: '2009-01-31',
          },
        ],
      },
      {
        companyKey: 'bouygues-immobilier',
        companyLogo: '/company-logos/bouygues.webp',
        positions: [
          {
            startDate: '2007-10-01',
            endDate: '2008-10-31',
          },
        ],
      },
    ],
  },
  {
    title: 'Education',
    education: [
      {
        educationKey: 0,
        startDate: '2005-09-01',
        endDate: '2008-06-30',
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
    title: 'Personal projects',
    personalProjects: [
      {
        projectKey: 0,
        projectUrl: 'https://example.com/project1',
        githubUrl: 'https://github.com/chechucastro/project1',
        startDate: '2023-01-01',
        endDate: '2023-06-30',
      },
      {
        projectKey: 1,
        projectUrl: 'https://example.com/project2',
        githubUrl: 'https://github.com/chechucastro/project2',
        startDate: '2022-05-01',
      },
    ],
  },
  {
    title: 'Recommendations',
    recommendations: [
      {
        name: 'Divya',
        surname: 'E',
        postDate: '2023-02-28',
        hierarchyMode: 'client',
        linkedInUrl: 'https://www.linkedin.com/in/divya-e-talent-acquisition',
      },
      {
        name: 'Vasil',
        surname: 'Yovchev',
        postDate: '2023-02-28',
        hierarchyMode: 'colleague',
        linkedInUrl: 'https://www.linkedin.com/in/vasil-yovchev-data-engineer',
      },
      {
        name: 'Ante',
        surname: 'Rukavina',
        postDate: '2023-02-28',
        hierarchyMode: 'colleague',
        linkedInUrl: 'https://www.linkedin.com/in/ante-rukavina-backend',
      },
      {
        name: 'Juliana',
        surname: 'RALAIVAO',
        postDate: '2018-10-23',
        hierarchyMode: 'manager',
        linkedInUrl: 'https://www.linkedin.com/in/juliana-ralaivao-saint-gobain',
      },
      {
        name: 'Antoine',
        surname: 'Martin',
        postDate: '2018-10-11',
        hierarchyMode: 'colleague',
        linkedInUrl: 'https://www.linkedin.com/in/antoine-martin-java-developer',
      },
      {
        name: 'Alexis',
        surname: 'Estrade',
        postDate: '2018-10-11',
        hierarchyMode: 'manager',
        linkedInUrl: 'https://www.linkedin.com/in/alexis-estrade-frontend-lead',
      },
      {
        name: 'Frédéric',
        surname: 'Rodas',
        postDate: '2015-11-06',
        hierarchyMode: 'manager',
        linkedInUrl: 'https://www.linkedin.com/in/frederic-rodas-development',
      },
      {
        name: 'Nicolas',
        surname: 'Escoffier',
        postDate: '2015-07-20',
        hierarchyMode: 'reports_to',
        linkedInUrl: 'https://www.linkedin.com/in/nicolas-escoffier-software-engineer',
      },
      {
        name: 'Sylvia',
        surname: 'Moreno',
        postDate: '2015-05-21',
        hierarchyMode: 'reports_to',
        linkedInUrl: 'https://www.linkedin.com/in/sylvia-moreno-frontend-consultant',
      },
      {
        name: 'Bruno',
        surname: 'Haouli',
        postDate: '2015-05-21',
        hierarchyMode: 'reports_to',
        linkedInUrl: 'https://www.linkedin.com/in/bruno-haouli-web-integrator',
      },
      {
        name: 'Nicolas',
        surname: 'Delfour',
        postDate: '2014-11-22',
        hierarchyMode: 'colleague',
        linkedInUrl: 'https://www.linkedin.com/in/nicolas-delfour-product-owner',
      },
      {
        name: 'François',
        surname: 'JULIENNE',
        postDate: '2014-07-24',
        hierarchyMode: 'reports_to',
        linkedInUrl: 'https://www.linkedin.com/in/francois-julienne-frontend-dev',
      },
      {
        name: 'Rudy',
        surname: 'THIMOTHÉE',
        postDate: '2012-10-24',
        hierarchyMode: 'colleague',
        linkedInUrl: 'https://www.linkedin.com/in/rudy-thimothee-tech-lead',
      },
      {
        name: 'Rudy',
        surname: 'THIMOTHÉE',
        postDate: '2012-09-11',
        hierarchyMode: 'colleague',
        linkedInUrl: 'https://www.linkedin.com/in/rudy-thimothee-tech-lead',
      },
      {
        name: 'Moez',
        surname: 'Kacem',
        postDate: '2012-01-12',
        hierarchyMode: 'colleague',
        linkedInUrl: 'https://www.linkedin.com/in/moez-kacem-frontend-lead',
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
  profileImage: '/chechuLinkedInOpentoWork.webp',
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
