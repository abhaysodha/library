import { createApp } from "./app.js";

const app = createApp();
const port = 3000;

app.listen(port, () => {
	console.log(`server is running on: http://localhost:${port}`);
});
