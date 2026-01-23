import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const blogposts = await getCollection('blogposts');
  const postsSorted = blogposts.sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
  );
  return rss({
    stylesheet: '/styles/rss.xsl',
    title: "Mikayil's Dev Blog",
    description:
      'Sharing learnings and all kinds of interesting things I come across.',
    site: context.site,
    items: blogposts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      categories: post.data.categories,
      link: `/blog/posts/${post.id}/`,
    })),
  });
}
