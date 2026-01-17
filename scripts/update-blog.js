const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

function readMarkdownFile(filePath) {
  try {
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      title: data.title || 'Untitled',
      date: data.date || new Date().toISOString().split('T')[0],
      category: data.category || 'Uncategorized',
      tags: data.tags || [],
      excerpt: data.excerpt || content.slice(0, 150) + '...',
      content: content,
      slug: path.basename(filePath, '.md'),
      bannerImage: data.bannerImage || '',
    };
  } catch (error) {
    console.error(`Error reading markdown file ${filePath}:`, error);
    return null;
  }
}

function updateBlogPosts() {
  const blogDirectory = path.join(process.cwd(), 'content', 'blog');

  try {
    const fileNames = fs.readdirSync(blogDirectory);
    const markdownFiles = fileNames.filter(fileName => fileName.endsWith('.md'));

    const posts = markdownFiles
      .map((fileName, index) => {
        const filePath = path.join(blogDirectory, fileName);
        const postData = readMarkdownFile(filePath);

        if (postData) {
          return {
            ...postData,
            id: (index + 1).toString(),
          };
        }
        return null;
      })
      .filter(post => post !== null)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    // Read the current blog.ts file
    const blogTsPath = path.join(process.cwd(), 'lib', 'blog.ts');
    let blogTsContent = fs.readFileSync(blogTsPath, 'utf8');

    // Replace the BLOG_POSTS array with the new data
    const postsString = JSON.stringify(posts, null, 2);
    const newContent = blogTsContent.replace(
      /export const BLOG_POSTS: BlogPost\[\] = \[[\s\S]*?\];/,
      `export const BLOG_POSTS: BlogPost[] = ${postsString};`
    );

    fs.writeFileSync(blogTsPath, newContent);
    console.log(`Updated ${posts.length} blog posts from markdown files`);
  } catch (error) {
    console.error('Error updating blog posts:', error);
  }
}

updateBlogPosts();