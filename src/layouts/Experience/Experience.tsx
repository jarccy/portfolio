import { TitleMenu } from "@/components/titleMenu";
import { CardExperience } from "../../components/cardExp";
import { motion } from "framer-motion";
import { containerVariants, itemVariants } from "@/lib/functions";
import { Tabs } from "../../components/tabs";
import { i18next } from "@/i18n/config";

type Company = {
  name: { en: string; es: string };
  charge: { en: string; es: string };
  period: { en: string; es: string };
  description: { en: string; es: string };
  technologies: string;
};

export const companies: Company[] = [
  {
    name: { en: "Consorcio Master", es: "Consorcio Master" },
    charge: { en: "Full Stack Developer", es: "Full Stack Developer" },
    period: { en: "Sep 2024 - Present", es: "Sep 2024 - Presente" },
    description: {
      en: "Working as a Full Stack Developer, focusing on building scalable web applications and improving user experience. Responsible for both front-end and back-end development tasks.",
      es: "Trabajando como Full Stack Developer, enfocado en la creación de aplicaciones web escalables y mejorar la experiencia del usuario. Responsable de las tareas de desarrollo tanto del front-end como del back-end.",
    },
    technologies: "Vue.js, Laravel, Node.js, TypeScript, PHP y SQL",
  },
  {
    name: { en: "Intelligent Technologies and Solutions", es: "Tecnologías y Soluciones Inteligentes" },
    charge: { en: "Full Stack Developer", es: "Full Stack Developer" },
    period: { en: "Apr 2021 - Apr 2023", es: "Abr 2021 - Abr 2023" },
    description: {
      en: "Developed and maintained web applications using Vue.js and Django, ensuring responsive design and optimal performance. Collaborated with cross-functional teams to deliver projects on time and within budget.",
      es: "Desarrollé y mantuve aplicaciones web utilizando Vue.js y Django, asegurando un diseño responsive y rendimiento óptimo. Colaboré con equipos funcionales para entregar proyectos en plazo y dentro del presupuesto.",
    },
    technologies: "Vue.js, Django, JavaScript, Python y PostgreSQL",
  },
  {
    name: { en: "Freelancer Jobs", es: "Freelancer Jobs" },
    charge: { en: "Full Stack Developer", es: "Full Stack Developer" },
    period: { en: "Jan 2020 - Mar 2021", es: "Ene 2020 - Mar 2021" },
    description: {
      en: "Provided freelance web development services to various clients, creating custom websites and applications tailored to their needs. Managed all aspects of the development process from concept to deployment.",
      es: "Proporcioné servicios de desarrollo web freelance a diversos clientes, creando sitios web y aplicaciones personalizadas según sus necesidades. Gestioné todo el proceso de desarrollo desde el concepto hasta la implementación.",
    },
    technologies: "Vue.js, Node.js, JavaScript y PostgreSQL",
  },
  {
    name: { en: "Institute San Lucas", es: "Instituto San Lucas" },
    charge: { en: "Junior Developer", es: "Junior Developer" },
    period: { en: "Aug 2019 - Dec 2019", es: "Ago 2019 - Dic 2019" },
    description: {
      en: "Contributed to web app and internal tool development, working across front-end and back-end. Improved workflows, enhanced UX, and upheld best practices in collaboration.",
      es: "Contribuí al desarrollo de aplicaciones web y herramientas internas, trabajando en el front-end y back-end. Mejoré los flujos de trabajo, mejoré la experiencia del usuario y mantuve las mejores prácticas en colaboración.",
    },
    technologies: "HTML, CSS, JavaScript, PHP y SQL",
  },
  {
    name: { en: "ADV Computing", es: "ADV Informatica" },
    charge: { en: "Junior Developer", es: "Junior Developer" },
    period: { en: "Mar 2019 - Jun 2019", es: "Mar 2019 - Jun 2019" },
    description: {
      en: "Assisted in the development of web applications and internal tools. Gained experience in coding, testing, and debugging under the guidance of senior developers.",
      es: "Ayudé en el desarrollo de aplicaciones web y herramientas internas. Adquirí experiencia en codificación, pruebas y depuración bajo la dirección de desarrolladores senior.",
    },
    technologies: "HTML, CSS, JavaScript, PHP y MySQL",
  },
];



export default function Experience({ lang }: { lang: string }) {
  const localT = i18next.getFixedT(lang || "en");

  const tabs = companies.map((company, index) => ({
    title: company.name[lang as "en" | "es"],
    value: `company-${index}`,
    content: (
      <CardExperience
        company={{
          name: company.name[lang as "en" | "es"],
          charge: company.charge[lang as "en" | "es"],
          period: company.period[lang as "en" | "es"],
          description: company.description[lang as "en" | "es"],
          technologies: company.technologies,
        }}
      />
    ),
  }));

  return (
    <motion.section
      id="experience"
      variants={containerVariants}
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: 0.2 }}
      className="w-full max-w-2xl mx-auto pt-40 mb-10 px-4"
    >
      <motion.div variants={itemVariants}>
        <TitleMenu title={localT("experience.title")} description={localT("experience.description")}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="size-6 transition-transform duration-300 group-hover:scale-110"
          >
            <path
              fill="currentColor"
              d="M4.616 20q-.691 0-1.153-.462T3 18.384V8.616q0-.691.463-1.153T4.615 7H9V5.615q0-.69.463-1.153T10.616 4h2.769q.69 0 1.153.462T15 5.615V7h4.385q.69 0 1.152.463T21 8.616v9.769q0 .69-.463 1.153T19.385 20zm0-1h14.769q.23 0 .423-.192t.192-.424V8.616q0-.231-.192-.424T19.385 8H4.615q-.23 0-.423.192T4 8.616v9.769q0 .23.192.423t.423.192M10 7h4V5.615q0-.23-.192-.423T13.385 5h-2.77q-.23 0-.423.192T10 5.615zM4 19V8z"
            ></path>
          </svg>
        </TitleMenu>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Tabs tabs={tabs} />
      </motion.div>
    </motion.section>
  );
}
