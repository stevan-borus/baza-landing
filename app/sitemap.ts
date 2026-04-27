import { MetadataRoute } from 'next';
import { getBlogPostIds } from '@/domain/blog/blog';
import { getGalleryImageIds } from '@/domain/gallery/gallery';
import { getNewsArticleIds } from '@/domain/news/news';
import { getProgrammeIds } from '@/domain/programmes/programmes';
import { getTeamMemberIds } from '@/domain/team/team';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://bazapilates.com';
  const lastModified = new Date();
  const [
    programmeIds,
    teamMemberIds,
    galleryImageIds,
    newsArticleIds,
    blogPostIds,
  ] = await Promise.all([
    getProgrammeIds(),
    getTeamMemberIds(),
    getGalleryImageIds(),
    getNewsArticleIds(),
    getBlogPostIds(),
  ]);

  return [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/programi`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/nas-tim`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/galerija`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/novosti`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/vasa-pitanja`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/kontakt`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    ...programmeIds.map(id => ({
      url: `${baseUrl}/programi/${id}`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.75,
    })),
    ...teamMemberIds.map(id => ({
      url: `${baseUrl}/nas-tim/${id}`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
    ...newsArticleIds.map(id => ({
      url: `${baseUrl}/novosti/${id}`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.65,
    })),
    ...blogPostIds.map(id => ({
      url: `${baseUrl}/blog/${id}`,
      lastModified,
      changeFrequency: 'monthly' as const,
      priority: 0.65,
    })),
    ...galleryImageIds.map(id => ({
      url: `${baseUrl}/galerija/${id}`,
      lastModified,
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    })),
  ];
}

