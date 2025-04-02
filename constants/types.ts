export type HeroSectionProps = {
  subHeading?: string;
  animatedText?: string;
  heading?: string;
  description?: string;
  primaryBtnText?: string;
  primaryBtnLink?: string;
  secondaryBtnText?: string;
  secondaryBtnLink?: string;
};

export type ProjectsProps = {
  title?: string;
  description?: string;
  image?: string;
  link?: string;
};

export type WorkExperienceProps = {
  companyName?: string;
  logoUrl?: string;
  jobTitle?: string;
  desc?: string;
};

export type Data = {
  heroSection: HeroSectionProps;
  projects: ProjectsProps[];
  workExperience: WorkExperienceProps[];
};

export type ButtonProps = {
  text: string;
  variant?: "primary" | "secondary";
  onClick?: () => void;
  href?: string;
};
