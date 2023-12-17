const trendingOnReddit = async () => {
  const response = await axios.get(
    'https://www.reddit.com/r/wallstreetbets.json'
  );
  const posts = response.data.data.children;
  const titles = posts.map((post) => post.data.title);
  return titles;
};
