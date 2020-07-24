import tailwindcss from "tailwindcss";
import fs from "fs";
import path from "path";

tailwindcss({
  // optional tailwind config
})
  .process(
    `
@tailwind base;
@tailwind components;
@tailwind utilities;

`
  )
  .then(async (res) => {
    await fs.promises.writeFile(path.resolve("./src/client/static/css/tailwind.css"), res.css);
  });
