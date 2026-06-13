import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

// Generates /llms.txt — a curated, Markdown-formatted index of the site aimed
// at LLMs / AI search tools (the proposed llms.txt convention).
// Auto-updates as blog posts are added, just like the sitemap.
//
// Honest note: as of 2026 no major AI crawler is confirmed to consume llms.txt,
// so treat this as cheap, low-risk future-proofing — not a ranking lever. The
// real AI-readability wins are the JSON-LD structured data and clean static HTML.
export const GET: APIRoute = async ({ site }) => {
  const base = (site?.href ?? 'https://surecareclinic.com/').replace(/\/$/, '');

  const posts = (await getCollection('blog', ({ data }) => !data.draft)).sort(
    (a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime()
  );

  const pages: Array<[string, string, string]> = [
    ['Home', '/', 'Multispeciality clinic, in-house pharmacy and diagnostic lab in Yelahanka, Bengaluru — complete care under one roof.'],
    ['About', '/about', 'About Surecare Clinic, Yelahanka and our approach to complete family healthcare.'],
    ['Services', '/services', 'Urology, Neurology, Nephrology and 9 more departments, in-house pharmacy, and lab diagnostics with home sample collection. Includes an FAQ.'],
    ['Blog', '/blog', 'Health tips, condition guides and clinic updates.'],
    ['Book an Appointment', '/appointment', 'Book a consultation; confirmed on WhatsApp.'],
    ['Contact', '/contact', 'Address, phone, WhatsApp, email and opening hours.'],
  ];

  const lines: string[] = [];
  lines.push('# Surecare Clinic, Yelahanka');
  lines.push('');
  lines.push(
    '> Multispeciality clinic in Yelahanka New Town, Bengaluru offering specialist consultations (Urology, Neurology, Nephrology and more), an in-house pharmacy, and on-site lab diagnostics with home sample collection. Open Mon-Sat 7:00 AM – 9:00 PM, Sunday 7:00 AM – 1:00 PM. Phone: +91 99889 96188.'
  );
  lines.push('');
  lines.push('## Pages');
  for (const [name, path, desc] of pages) {
    lines.push(`- [${name}](${base}${path}): ${desc}`);
  }

  if (posts.length) {
    lines.push('');
    lines.push('## Blog posts');
    for (const post of posts) {
      lines.push(`- [${post.data.title}](${base}/blog/${post.id}): ${post.data.description}`);
    }
  }
  lines.push('');

  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
