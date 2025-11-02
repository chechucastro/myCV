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
        title: 'Tailwind CSS 4 Essential Training',
        issuedBy: 'LinkedIn',
        issuedDate: '2025-10-04',
        certificateImage: '/linkedin-learning-logo.svg',
        certificateLink: 'https://www.linkedin.com/learning/certificates/90a8a80ac0516653c21fa6ad946aba9802f7fdc1224d483b2b6e31ae15a95682',
      },
      {
        title: 'TypeScript Essential Training',
        issuedBy: 'LinkedIn Learning Community',
        issuedDate: '2025-10-16',
        certificateImage: '/linkedin-learning-logo.svg',
        certificateLink: 'https://www.linkedin.com/learning/certificates/bedaa6d32d983da28513d82821c0a493708d52189c39aa36c715eddadd1c5eef',
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
        linkedInUrl: 'https://www.linkedin.com/in/divya-e-11463740/?locale=en_US',
      },
      {
        name: 'Vasil',
        surname: 'Yovchev',
        postDate: '2023-02-28',
        hierarchyMode: 'colleague',
        linkedInUrl: 'https://www.linkedin.com/in/vyovchev/?locale=en_US',
      },
      {
        name: 'Ante',
        surname: 'Rukavina',
        postDate: '2023-02-28',
        hierarchyMode: 'colleague',
        linkedInUrl: 'https://www.linkedin.com/in/ante-rukavina-9792271b0/?locale=en_US',
      },
      {
        name: 'Juliana',
        surname: 'RALAIVAO',
        postDate: '2018-10-23',
        hierarchyMode: 'manager',
        linkedInUrl: 'https://www.linkedin.com/in/juliana-ralaivao-a297a6a5/?locale=en_US',
      },
      {
        name: 'Antoine',
        surname: 'Martin',
        postDate: '2018-10-11',
        hierarchyMode: 'colleague',
        linkedInUrl: 'https://www.linkedin.com/in/antoine-martin-55712084/?locale=en_US',
      },
      {
        name: 'Alexis',
        surname: 'Estrade',
        postDate: '2018-10-11',
        hierarchyMode: 'manager',
        linkedInUrl: 'https://www.linkedin.com/in/alexis-estrade/?locale=en_US',
      },
      {
        name: 'Frédéric',
        surname: 'Rodas',
        postDate: '2015-11-06',
        hierarchyMode: 'manager',
        linkedInUrl: 'https://www.linkedin.com/in/fredericrodas/?locale=en_US',
      },
      {
        name: 'Nicolas',
        surname: 'Escoffier',
        postDate: '2015-07-20',
        hierarchyMode: 'reports_to',
        linkedInUrl: 'https://www.linkedin.com/in/nicolasescoffier?locale=en_US',
      },
      {
        name: 'Sylvia',
        surname: 'Moreno',
        postDate: '2015-05-21',
        hierarchyMode: 'reports_to',
        linkedInUrl: 'https://www.linkedin.com/in/sylvia-m-30161859?locale=en_US',
      },
      {
        name: 'Bruno',
        surname: 'Haouli',
        postDate: '2015-05-21',
        hierarchyMode: 'reports_to',
        linkedInUrl: 'https://www.linkedin.com/in/bruno-haouli-052a414?locale=en_US',
      },
      {
        name: 'Nicolas',
        surname: 'Delfour',
        postDate: '2014-11-22',
        hierarchyMode: 'colleague',
        linkedInUrl: 'https://www.linkedin.com/in/nicolasdelfour?locale=en_US',
      },
      {
        name: 'François',
        surname: 'JULIENNE',
        postDate: '2014-07-24',
        hierarchyMode: 'reports_to',
        linkedInUrl: 'https://www.linkedin.com/in/francoisjulienne?locale=en_US',
      },
      {
        name: 'Rudy',
        surname: 'THIMOTHÉE',
        postDate: '2012-10-24',
        hierarchyMode: 'colleague',
        linkedInUrl: 'https://www.linkedin.com/in/rudy-thimoth%C3%A9e-20a11716?locale=en_US',
      },
      {
        name: 'Rudy',
        surname: 'THIMOTHÉE',
        postDate: '2012-09-11',
        hierarchyMode: 'colleague',
        linkedInUrl: 'https://www.linkedin.com/in/rudy-thimoth%C3%A9e-20a11716?locale=en_US',
      },
      {
        name: 'Moez',
        surname: 'Kacem',
        postDate: '2012-01-12',
        hierarchyMode: 'colleague',
        linkedInUrl: 'https://www.linkedin.com/in/moez-kacem?locale=en_US',
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
