import { TitleMenu } from "@/components/titleMenu";
import { CardExperience } from "../../components/cardExp";
import { motion } from "framer-motion";
import { containerVariants, itemVariants, itemProfile } from "@/lib/functions";
import { Tabs } from "../../components/tabs";

type company = {
  name: string;
  charge: string;
  period: string;
  description: string;
  technologies: string;
};

export default function Experience() {
  const companies: company[] = [
    {
      name: "Consorcio Master",
      charge: "Full Stack Developer",
      period: "Sep 2024 - Present",
      description:
        "Working as a Full Stack Developer, focusing on building scalable web applications and improving user experience. Responsible for both front-end and back-end development tasks.",
      technologies: "Vue.js, Laravel, Node.js, TypeScript, PHP y SQL",
    },
    {
      name: "Tecnologías y Soluciones Inteligentes",
      charge: "Full Stack Developer",
      period: "Apr 2021 - Apr 2023",
      description:
        "Developed and maintained web applications using Vue.js and Django, ensuring responsive design and optimal performance. Collaborated with cross-functional teams to deliver projects on time and within budget.",
      technologies: "Vue.js, Django, JavaScript, Python y PostgreSQL",
    },
    {
      name: "Freelancer Jobs",
      charge: "Full Stack Developer",
      period: "Jan 2020 - Mar 2021",
      description:
        "Provided freelance web development services to various clients, creating custom websites and applications tailored to their needs. Managed all aspects of the development process from concept to deployment.",
      technologies: "Vue.js, Node.js, JavaScript y PostgreSQL",
    },
    {
      name: "Instituto San Lucas",
      charge: "Junior Developer",
      period: "Ago 2019 - Dec 2019",
      description:
        "Contributed to web app and internal tool development, working across front-end and back-end. Improved workflows, enhanced UX, and upheld best practices in collaboration.",
      technologies: "HTML, CSS, JavaScript, PHP y SQL",
    },
    {
      name: "ADV Informatica",
      charge: "Junior Developer",
      period: "Mar 2019 - Jun 2019",
      description:
        "Assisted in the development of web applications and internal tools. Gained experience in coding, testing, and debugging under the guidance of senior developers.",
      technologies: "HTML, CSS, JavaScript, PHP y MySQL",
    },
  ];

  const tabs = [
    {
      title: "Consorcio Master",
      value: "master",
      content: <CardExperience company={companies[0]} />,
    },
    {
      title: "Tecnologías y Soluciones In.",
      value: "tech",
      content: <CardExperience company={companies[1]} />,
    },
    {
      title: "Freelancer Jobs",
      value: "freelance",
      content: <CardExperience company={companies[2]} />,
    },
    {
      title: "Instituto San Lucas",
      value: "institution",
      content: <CardExperience company={companies[3]} />,
    },
    {
      title: "ADV Informatica",
      value: "adv",
      content: <CardExperience company={companies[4]} />,
    },
  ];

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
        <TitleMenu title="Experience" description="My professional journey">
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
