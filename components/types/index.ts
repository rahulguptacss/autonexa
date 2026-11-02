import data from '../data/data.json';

export interface NavItem {
  name: string;
  href: string;
  children?: NavItem[];
}

export type LinkType = NavItem;

export interface HeaderData {
  logo: string;
  favicon: string;
  logo_text: string;
  logo_subtext: string;
  links: LinkType[];
  button_text?: string;
  button_link?: string;
  menu_aria_label: string;
  close_aria_label: string;
}

export interface FooterSocialItem {
  name: string;
  href: string;
  icon: string;
  aria_label: string;
}

export interface FooterContactItem {
  icon: string;
  label: string;
  text: string;
  href?: string;
}

export interface FooterData {
  logo: string;
  logo_text: string;
  description?: string;
  socials: FooterSocialItem[];
  menu_title?: string;
  menu_links: LinkType[];
  connect_title?: string;
  contact_title?: string;
  contact_items?: FooterContactItem[];
  copyright: string;
  legal_links?: LinkType[];
}

export interface BackToTopData {
  aria_label: string;
}

/** Heading made of heavy line(s) + light uppercase follow-up lines (e.g. "ENGINEERED / SOLUTIONS / FOR EVERY / JOURNEY.") */
export interface SplitTitle {
  title_bold: string | string[];
  title_light: string[];
}

export interface HeroSectionData extends SplitTitle {
  eyebrow: string;
  description: string;
  cta_text: string;
  cta_link: string;
  scroll_text: string;
  image: string;
  image_alt: string;
}

export interface BreadcrumbItem {
  name: string;
  href: string;
}

export interface BreadcrumbSectionData {
  background_image: string;
  background_alt: string;
  items: BreadcrumbItem[];
}
export type BreadcrumbData = BreadcrumbSectionData;

export interface AboutSectionData extends SplitTitle {
  eyebrow: string;
  lead: string;
  description: string;
  button_text: string;
  button_link: string;
  image: string;
  image_alt: string;
}

export interface ProjectItem {
  id: string;
  slug?: string;
  title: string;
  category: string;
  subtext?: string;
  image: string;
  alt: string;
}

export interface ProjectsSectionData extends SplitTitle {
  eyebrow: string;
  description: string;
  button_text: string;
  button_link: string;
  /** Cards shown on the homepage mosaic */
  homepage_count: number;
  items: ProjectItem[];
}

export interface ClientItem {
  id: string;
  name: string;
  logo: string;
  category?: string;
  subtitle?: string;
  badge?: string;
}

export interface ClientHighlight {
  title: string;
  description: string;
}

export interface ClientStat {
  value: string;
  label: string;
}

export interface ClientsSectionData {
  eyebrow: string;
  title_bold: string;
  title_light: string[];
  description: string;
  badge_text?: string;
  items: ClientItem[];
  highlights?: ClientHighlight[];
  stats?: ClientStat[];
}

export interface ClientsProps {
  data: ClientsSectionData;
}

export type ManufacturingCapabilitiesData = ProjectsSectionData;

export interface ProcessStep {
  number: string;
  title: string;
  icon?: string;
  description?: string;
}

export interface CapabilityMidImage {
  image: string;
  alt: string;
}

export interface CapabilityWhyChoose {
  title: string;
  description: string;
  points: string[];
}

export interface CapabilityProcess {
  title_black: string;
  title_orange: string;
  subtitle: string;
  steps: ProcessStep[];
}

export interface CapabilityGuarantee {
  title: string;
  description: string;
  points: string[];
}

export interface ManufacturingCapabilityDetailData {
  slug: string;
  eyebrow: string;
  title_black: string;
  title_orange: string;
  hero_image: string;
  hero_alt: string;
  intro: string;
  mid_images: CapabilityMidImage[];
  why_choose: CapabilityWhyChoose;
  process: CapabilityProcess;
  guarantee: CapabilityGuarantee;
}

export interface CapabilitySidebarItem {
  name: string;
  slug: string;
}

export interface ManufacturingCapabilitiesDetailLabels {
  sidebar_title: string;
  capabilities_list: CapabilitySidebarItem[];
  items?: Record<string, ManufacturingCapabilityDetailData>;
}

export interface SolutionItem {
  id: string;
  number: string;
  title: string;
  description: string;
  image: string;
  alt: string;
}

export interface SolutionsSectionData extends SplitTitle {
  eyebrow: string;
  description: string;
  button_text: string;
  button_link: string;
  /** Cards shown next to the heading on the homepage */
  homepage_count: number;
  items: SolutionItem[];
}

export interface PaginationLabels {
  label: string;
  prev_aria_label: string;
  next_aria_label: string;
  page_aria_label: string;
  /** Supports {from}, {to} and {total} placeholders */
  showing_text?: string;
}

export interface BlogPostItem {
  id: string;
  slug: string;
  title: string;
  category: string;
  date: string;
  image: string;
  alt: string;
  excerpt: string;
  href?: string;
}

export interface BlogSectionData {
  eyebrow: string;
  title_regular: string;
  title_highlight: string;
  title_suffix: string;
  description: string;
  read_more_text: string;
  /** Posts on the homepage (1 featured + list) */
  homepage_count: number;
  /** Posts per page on the full blog grid */
  per_page: number;
  pagination: PaginationLabels;
  posts: BlogPostItem[];
}

export interface BlogDetailSectionItem {
  title?: string;
  title_black?: string;
  title_orange?: string;
  paragraph: string;
  image?: string;
  image_alt?: string;
}

export interface BlogDetailSectionData {
  category: string;
  date: string;
  author: string;
  read_time: string;
  title: string;
  title_black?: string;
  title_orange?: string;
  hero_image: string;
  hero_alt: string;
  intro: string | string[];
  quote?: string;
  sections: BlogDetailSectionItem[];
}

export interface BlogDetailLabels {
  author_prefix: string;
  recent_posts_title: string;
  recent_posts_count: number;
  back_text: string;
  back_link: string;
  posts?: Record<string, BlogDetailSectionData>;
}

export interface RecentPostItem {
  slug: string;
  title: string;
  image: string;
  alt: string;
  date: string;
}

export interface ContactHelpBadge {
  label: string;
  phone: string;
  phone_href?: string;
}

export interface ContactInfoCard {
  id: string;
  icon: string;
  label?: string;
  title?: string;
  lines: string[];
  href?: string;
}

export interface ContactFormFields {
  eyebrow?: string;
  title?: string;
  title_black?: string;
  title_orange?: string;
  subtitle?: string;
  name_label?: string;
  name_placeholder: string;
  company_placeholder?: string;
  email_label?: string;
  email_placeholder: string;
  phone_label?: string;
  phone_placeholder: string;
  subject_label?: string;
  subject_placeholder?: string;
  interest_placeholder?: string;
  interest_options?: string[];
  message_label?: string;
  message_placeholder: string;
  submit_text: string;
  submitting_text: string;
  success_message: string;
}

export interface ContactMapCardData {
  title: string;
  address: string;
  directions_text: string;
  directions_url: string;
  rating_text: string;
  view_larger_text: string;
}

export interface ContactMapData {
  title: string;
  embed_url: string;
  card?: ContactMapCardData;
}

export interface ContactSectionData {
  eyebrow: string;
  title_bold?: string;
  title_light?: string[];
  title_black?: string;
  title_orange?: string;
  description: string;
  image: string;
  image_alt: string;
  help_badge?: ContactHelpBadge;
  info_cards: ContactInfoCard[];
  follow_title?: string;
  socials?: FooterSocialItem[];
  form: ContactFormFields;
  map?: ContactMapData;
}

export interface EnquireNowStep {
  step: string;
  title: string;
  description: string;
}

export interface EnquireNowWhyData {
  eyebrow: string;
  title_black: string;
  title_prefix?: string;
  title_orange: string;
  description: string;
  steps: EnquireNowStep[];
}

export interface EnquireNowSectionData {
  eyebrow: string;
  title_black: string;
  title_orange: string;
  description: string;
  form: ContactFormFields;
  why_enquire: EnquireNowWhyData;
}

export interface PageComponent {
  key: string;
  component: string;
}

export interface PageMeta {
  title: string;
  pageName: string;
  metadata: {
    title: string;
    description: string;
  };
  components: PageComponent[];
}

export interface NotFoundData {
  code: string;
  badge: string;
  title: string;
  description: string;
  back_home: {
    text: string;
    href: string;
  };
}

export interface PurposeItem {
  id: string;
  number: string;
  title: string;
  description: string;
}

export interface PurposeSectionData {
  eyebrow: string;
  title_black_1: string;
  title_black_2: string;
  title_orange_1: string;
  title_orange_2: string;
  description: string;
  image: string;
  image_alt: string;
  items: PurposeItem[];
}

export interface WhyChooseItem {
  id: string;
  number?: string;
  title: string;
  description: string;
  icon?: string;
}

export interface WhyChooseStat {
  value: string;
  label: string;
}

export interface WhyChooseUsSectionData {
  eyebrow: string;
  title?: string;
  title_line_1?: string;
  title_line_2?: string;
  title_bold?: string | string[];
  title_light?: string[];
  description: string;
  image?: string;
  image_alt?: string;
  badge?: {
    value: string;
    label: string;
    sublabel?: string;
  };
  items: WhyChooseItem[];
  stats?: WhyChooseStat[];
}

export interface WhyChooseUsProps {
  data: WhyChooseUsSectionData;
}

export interface QualitySectionData {
  eyebrow: string;
  title?: string;
  title_line_1?: string;
  title_line_2?: string;
  title_bold?: string | string[];
  title_light?: string[];
  description: string;
  checklist: string[];
  image: string;
  image_alt: string;
}

export interface QualityProps {
  data: QualitySectionData;
}

export interface TemplateSections {
  hero: HeroSectionData;
  breadcrumb?: BreadcrumbSectionData;
  about: AboutSectionData;
  purpose?: PurposeSectionData;
  manufacturing_capabilities?: ProjectsSectionData;
  projects?: ProjectsSectionData;
  manufacturing_capabilities_detail?: ManufacturingCapabilitiesDetailLabels;
  products_solutions?: SolutionsSectionData;
  solutions?: SolutionsSectionData;
  blog?: BlogSectionData;
  blog_detail?: BlogDetailLabels;
  contact: ContactSectionData;
  why_choose_us?: WhyChooseUsSectionData;
  quality?: QualitySectionData;
  clients?: ClientsSectionData;
  partners?: ClientsSectionData;
  enquire_now?: EnquireNowSectionData;
  'enquire-now'?: EnquireNowSectionData;
}

export interface TemplatePages {
  home: PageMeta;
  not_found?: NotFoundData;
  about?: PageMeta;
  manufacturing_capabilities?: PageMeta;
  capabilities?: PageMeta;
  'manufacturing-capabilities'?: PageMeta;
  manufacturing_capabilities_detail?: PageMeta;
  products_solutions?: PageMeta;
  'products-solutions'?: PageMeta;
  solutions?: PageMeta;
  blog?: PageMeta;
  blog_detail?: PageMeta;
  contact?: PageMeta;
  enquire_now?: PageMeta;
  'enquire-now'?: PageMeta;
}

export interface SiteSections {
  hero: HeroSectionData;
  breadcrumb?: BreadcrumbSectionData;
  about: AboutSectionData;
  purpose?: PurposeSectionData;
  manufacturing_capabilities?: ProjectsSectionData;
  projects: ProjectsSectionData;
  manufacturing_capabilities_detail?: ManufacturingCapabilitiesDetailLabels;
  manufacturing_capabilities_details?: Record<string, ManufacturingCapabilityDetailData>;
  products_solutions: SolutionsSectionData;
  solutions?: SolutionsSectionData;
  blog?: BlogSectionData;
  blog_detail?: BlogDetailLabels;
  blog_details?: Record<string, BlogDetailSectionData>;
  contact: ContactSectionData;
  why_choose_us?: WhyChooseUsSectionData;
  quality?: QualitySectionData;
  clients?: ClientsSectionData;
  partners?: ClientsSectionData;
  enquire_now?: EnquireNowSectionData;
  'enquire-now'?: EnquireNowSectionData;
}

export interface SitePages {
  home: PageMeta;
  not_found?: NotFoundData;
  about?: PageMeta;
  manufacturing_capabilities?: PageMeta;
  capabilities?: PageMeta;
  'manufacturing-capabilities'?: PageMeta;
  manufacturing_capabilities_detail?: PageMeta;
  products_solutions?: PageMeta;
  'products-solutions'?: PageMeta;
  solutions?: PageMeta;
  blog?: PageMeta;
  blog_detail?: PageMeta;
  contact?: PageMeta;
  enquire_now?: PageMeta;
  'enquire-now'?: PageMeta;
}

export interface TemplateComponents {
  pages: TemplatePages;
  sections: TemplateSections;
}

export interface SiteData {
  common: {
    Header: HeaderData;
    Footer: FooterData;
    BackToTop: BackToTopData;
  };
  categories: {
    Automotive: {
      templateComponents: {
        'template-1': TemplateComponents;
      };
    };
  };
}

export const siteJson: SiteData = data;
export const common = siteJson.common;
export const template = siteJson.categories.Automotive.templateComponents['template-1'];
export const pages: SitePages = new Proxy((template.pages || {}) as any, {
  get(target, prop: string) {
    if (prop === 'capabilities' || prop === 'manufacturing-capabilities') {
      return target.manufacturing_capabilities || target.capabilities || target['manufacturing-capabilities'];
    }
    if (prop === 'solutions' || prop === 'products_solutions' || prop === 'products-solutions') {
      return target.products_solutions || target.solutions || target['products-solutions'];
    }
    if (prop === 'why_choose_us' || prop === 'why-choose-us' || prop === 'whyChooseUs') {
      return target.why_choose_us || target['why-choose-us'];
    }
    if (prop === 'quality' || prop === 'quality-innovation' || prop === 'quality_innovation') {
      return target.quality || target['quality-innovation'] || target.quality_innovation;
    }
    if (prop === 'enquire_now' || prop === 'enquire-now') {
      return target.enquire_now || target['enquire-now'];
    }
    return target[prop];
  },
});
export const sections: SiteSections = new Proxy((template.sections || {}) as any, {
  get(target, prop: string) {
    if (prop === 'projects' || prop === 'manufacturing_capabilities') {
      return target.manufacturing_capabilities || target.projects;
    }
    if (prop === 'solutions' || prop === 'products_solutions' || prop === 'products-solutions') {
      return target.products_solutions || target.solutions || target['products-solutions'];
    }
    if (prop === 'why_choose_us' || prop === 'why-choose-us' || prop === 'whyChooseUs') {
      return target.why_choose_us || target['why-choose-us'];
    }
    if (prop === 'quality' || prop === 'quality-innovation' || prop === 'quality_innovation') {
      return target.quality || target['quality-innovation'] || target.quality_innovation;
    }
    if (prop === 'enquire_now' || prop === 'enquire-now') {
      return target.enquire_now || target['enquire-now'];
    }
    if (prop === 'blog_details') {
      return target.blog_detail?.posts || target.blog_details;
    }
    if (prop === 'manufacturing_capabilities_details') {
      return target.manufacturing_capabilities_detail?.items || target.manufacturing_capabilities_details;
    }
    return target[prop];
  },
});

export function toSlug(title: string): string {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

/* ========================================================
   SECTION & COMPONENT PROPS (Centralized in types/index.ts)
   ======================================================== */

export interface HeaderProps {
  data: HeaderData;
}

export interface FooterProps {
  data: FooterData;
}

export interface HeroProps {
  data: HeroSectionData;
}

export interface AboutProps {
  data: AboutSectionData;
  showButton?: boolean;
}

export interface PurposeProps {
  data: PurposeSectionData;
}

export interface BreadcrumbProps {
  data: BreadcrumbData;
  currentPage: string;
  items?: BreadcrumbItem[];
}

export interface BlogProps {
  data: BlogSectionData;
  variant?: 'featured' | 'grid';
}

export interface BlogDetailProps {
  data: BlogDetailSectionData;
  labels: BlogDetailLabels;
  recentPosts: RecentPostItem[];
}

export interface ContactProps {
  data: ContactSectionData;
}

export interface EnquireNowProps {
  data: EnquireNowSectionData;
}

export interface ManufacturingCapabilitiesProps {
  data: ProjectsSectionData;
  variant?: 'grid' | 'mosaic';
  showButton?: boolean;
}

export interface ManufacturingCapabilitiesDetailProps {
  data: ManufacturingCapabilityDetailData;
  labels: ManufacturingCapabilitiesDetailLabels;
  currentSlug: string;
}

export interface ProductsSolutionsProps {
  data: SolutionsSectionData;
  variant?: 'split' | 'grid';
  showButton?: boolean;
}

export interface ProjectsProps {
  data: ProjectsSectionData;
  variant?: 'mosaic' | 'grid';
  showButton?: boolean;
}

export interface SolutionsProps {
  data: SolutionsSectionData;
  variant?: 'split' | 'grid';
  showButton?: boolean;
}

export interface PaginationProps {
  page: number;
  totalPages: number;
  totalItems: number;
  pageStart: number;
  pageCount: number;
  onChange: (page: number) => void;
  labels: PaginationLabels;
  layoutId?: string;
}

export interface BackToTopProps {
  data: BackToTopData;
}

export interface DisplayTitleProps {
  bold: string | string[];
  light: string[];
  as?: 'h1' | 'h2';
  size?: 'hero' | 'section';
  className?: string;
}

export interface LineEyebrowProps {
  text: string;
  tone?: 'primary' | 'muted';
  className?: string;
}

export interface PrimaryButtonProps {
  href?: string;
  text: string;
  variant?: 'solid' | 'dark' | 'outline';
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  'aria-label'?: string;
}

export interface TextLinkProps {
  href: string;
  text: string;
  className?: string;
}

export type SlugParams = Promise<{ slug: string }>;


