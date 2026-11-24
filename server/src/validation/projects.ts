import { z } from 'zod';

const baseUrlMessage = 'Enter the API address with http:// or https://, without a path or query. Example: https://api.example.com.';
const baseUrlPattern = /^https?:\/\/[^\s/?#@\\]+\/?$/i;

export const projectInput = z.strictObject({
  name: z.string().trim()
    .min(1, 'Project name is required.')
    .max(100, 'Use at most 100 characters for the project name.'),
  baseUrl: z.string().trim()
    .max(2048, 'Use at most 2048 characters for the API address.')
    .regex(baseUrlPattern, baseUrlMessage)
    .transform((value, ctx) => {
      const url = URL.parse(value);
      if (url) return url.origin;

      ctx.addIssue({ code: 'custom', message: baseUrlMessage });
      return z.NEVER;
    }),
});
