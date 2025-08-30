import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let posts = []; // In-memory store for posts

// Home - show all posts
app.get("/", (req, res) => {
  const blogPosts = posts.filter(post => post.content);
  res.render("index.ejs", { posts: blogPosts });
});


app.get('/about', (req,res) => {
  res.render('about.ejs')
})

app.get('/contact', (req,res) => {
  res.render('contact.ejs')
})

// Name input form (optional step)
app.get("/name", (req, res) => {
  res.render("name.ejs");
});

// Create blog post page with name from previous form
app.post('/blog', (req, res) => {
  const name = req.body.name;
  res.render('blog.ejs', { name });
});

// Submit new post
app.post('/submit', (req, res) => {
  const { name, content } = req.body;
  const id = Date.now().toString(); // simple unique id
  posts.push({ id, name, content });
  res.redirect('/');
});

// Edit post form page
app.get('/edit/:id', (req, res) => {
  const post = posts.find(p => p.id === req.params.id);
  if (!post) return res.status(404).send('Post not found');
  res.render('edit.ejs', { post });
});

// Update post submission
app.post('/edit/:id', (req, res) => {
  const { name, content } = req.body;
  const post = posts.find(p => p.id === req.params.id);
  if (!post) return res.status(404).send('Post not found');
  post.name = name;
  post.content = content;
  res.redirect('/');
});

app.post('/contact', (req, res) => {

  const {name,email,message} = req.body;
  const id = Date.now().toString();
  posts.push({ id, name,email, message });
  console.log(posts);

  res.redirect('/');
});


// Delete a post
app.post('/delete/:id', (req, res) => {
  posts = posts.filter(p => p.id !== req.params.id);
  res.redirect('/');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
