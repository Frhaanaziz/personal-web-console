import { z } from 'zod';

const configSchema = z
  .string()
  .min(1, { message: 'Input must be at least 1 character long.' });

export const homeConfigSchema = z.object({
  heroHeading: configSchema,
  heroDescription: configSchema,
  heroLinkLabel: configSchema,
  heroLinkHref: configSchema,

  aboutHeading: configSchema,
  aboutSubHeading: configSchema,
  aboutDescriptionHeading: configSchema,
  aboutDescription: configSchema,
  aboutLinkLabel: configSchema,
  aboutLinkHref: configSchema,
  aboutSkillsHeading: configSchema,

  projectsHeading: configSchema,
  projectsSubHeading: configSchema,
  projects1ImageSource: configSchema,
  projects1Heading: configSchema,
  projects1Description: configSchema,
  projects1CSLink: configSchema,
  projects1CSLabel: configSchema,

  contactHeading: configSchema,
  contactSubHeading: configSchema,
  contactFormField1Label: configSchema,
  contactFormField1Placeholder: configSchema,
  contactFormField2Label: configSchema,
  contactFormField2Placeholder: configSchema,
  contactFormField3Label: configSchema,
  contactFormField3Placeholder: configSchema,
  contactFormSubmitButtonLabel: configSchema,
});

export const layoutConfigSchema = z.object({
  headingNav1Label: configSchema,
  headingNav1Href: configSchema,
  headingNav2Label: configSchema,
  headingNav2Href: configSchema,
  headingNav3Label: configSchema,
  headingNav3Href: configSchema,
  headingNav4Label: configSchema,
  headingNav4Href: configSchema,

  footerText: configSchema,
});
