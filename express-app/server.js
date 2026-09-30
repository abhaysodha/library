import { createApp } from "./app.js";

const app = createApp();
const port = 3000;

app.listen(port, (error) => {
	if (error) {
		console.error(`Could not start server: ${error.message}`);
		process.exitCode = 1;
		return;
	}
	console.log(`server is running on: http://localhost:${port}`);
});
