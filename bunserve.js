const BASE_PATH = "./public";
console.log(
  "Server is running on http://localhost:3000, serving files from " + BASE_PATH,
);
Bun.serve({
  port: 3000,
  async fetch(req)
  {
    let filePath;
    if (new URL(req.url).pathname === "/")
    {
      filePath = BASE_PATH + "/index.html";
    } else
    {
      filePath = BASE_PATH + new URL(req.url).pathname;
    }
    console.log("Requesting file", filePath);
    const file = Bun.file(filePath);
    return new Response(file);
  },
  error()
  {
    return new Response(null, { status: 404 });
  },
});
