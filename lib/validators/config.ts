import { z } from 'zod';

export const homeConfigSchema = z.object({
  heroHeading: z.string().min(1),
  heroDescription: z.string().min(1),
  heroLinkLabel: z.string().min(1),
  heroLinkHref: z.string().min(1),

  aboutHeading: z.string().min(1),
  aboutSubHeading: z.string().min(1),
  aboutDescriptionHeading: z.string().min(1),
  aboutDescription: z.string().min(1),
  aboutLinkLabel: z.string().min(1),
  aboutLinkHref: z.string().min(1),
  aboutSkillsHeading: z.string().min(1),

  projectsHeading: z.string().min(1),
  projectsSubHeading: z.string().min(1),
  projects1ImageSource: z.string().min(1),
  projects1Heading: z.string().min(1),
  projects1Description: z.string().min(1),
  projects1CSLink: z.string().min(1),
  projects1CSLabel: z.string().min(1),

  contactHeading: z.string().min(1),
  contactSubHeading: z.string().min(1),
  contactFormField1Label: z.string().min(1),
  contactFormField1Placeholder: z.string().min(1),
  contactFormField2Label: z.string().min(1),
  contactFormField2Placeholder: z.string().min(1),
  contactFormField3Label: z.string().min(1),
  contactFormField3Placeholder: z.string().min(1),
  contactFormSubmitButtonLabel: z.string().min(1),
});
