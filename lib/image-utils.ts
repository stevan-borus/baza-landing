/**
 * Blur data URL placeholder for Next.js Image component
 * A small 10x10 gray image that Next.js will blur automatically
 * This provides a smooth loading experience while images load
 *
 * According to Next.js docs: https://nextjs.org/docs/app/api-reference/components/image#blurdataurl
 * The image should be 10px or less and will be automatically enlarged and blurred
 */
export const BLUR_DATA_URL =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iI2U1ZTdlYiIvPjwvc3ZnPg==';

/**
 * Helper function to get blur data URL (for consistency)
 */
export function getBlurDataURL(): string {
  return BLUR_DATA_URL;
}
