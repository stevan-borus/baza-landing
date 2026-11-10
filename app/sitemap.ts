import { MetadataRoute } from 'next';
import { getBlogPostIds } from '@/domain/blog/blog';
import { getNewsArticleIds } from '@/domain/news/news';
import { getProgrammeIds } from '@/domain/programmes/programmes';
import { getTeamMemberIds } from '@/domain/team/team';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://bazapilates.com';
  const [programmeIds, teamMemberIds, newsArticleIds, blogPostIds] =
    await Promise.all([
      getProgrammeIds(),
      getTeamMemberIds(),
      getNewsArticleIds(),
      getBlogPostIds(),
    ]);

  return [
    {
      url: baseUrl,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/programi`,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/nas-tim`,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/galerija`,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/novosti`,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/vasa-pitanja`,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/kontakt`,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    ...programmeIds.map(id => ({
      url: `${baseUrl}/programi/${id}`,
      changeFrequency: 'monthly' as const,
      priority: 0.75,
    })),
    ...teamMemberIds.map(id => ({
      url: `${baseUrl}/nas-tim/${id}`,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
    ...newsArticleIds.map(id => ({
      url: `${baseUrl}/novosti/${id}`,
      changeFrequency: 'monthly' as const,
      priority: 0.65,
    })),
    ...blogPostIds.map(id => ({
      url: `${baseUrl}/blog/${id}`,
      changeFrequency: 'monthly' as const,
      priority: 0.65,
    })),
  ];
}

