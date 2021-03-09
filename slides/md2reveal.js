const fs = require('fs');
const md = new require('markdown-it')();

const markdownData = fs.readFileSync('SLIDES.md', { encoding: 'utf8' });

const slides = markdownData.match(/^##.+?(?=(##))+/gms);

function mdRender(mdContent) {
  let result = md.render(mdContent);
  result = result.replace(/\n+$/, '');
  result = result.replace(/<code>/g, '<code class="simple">');
  result = result.replace(/<a/g, '<a target="_blank"');
  result = result.replace(/<li>&amp;/g, '<li class="fragment">');
  return result;
}

const revealSlides = slides.map(slide => {
  return `<section${
    slide.includes('## Agenda') ||
    slide.includes('## Resources') ||
    slide.includes('## Thank') ||
    slide.includes('## Q & A')
      ? ' data-background-color="#fcf4c8"'
      : ''
  }>
  <div class="slide-logo">
  <img
    src="https://www.jsleague.ro/images/logo/logo-flat.png"
    alt="JSLeague Logo"
  />
  <div>Advanced Node.js | Fortech</div>
</div>
${mdRender(slide)}
</section>
`;
});

const template = fs.readFileSync('index.tpl.html', { encoding: 'utf8' });

fs.writeFileSync(
  'index.html',
  template.replace('${CONTENT}', revealSlides.join('\n'))
);
