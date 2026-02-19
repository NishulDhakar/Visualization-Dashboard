import 'dotenv/config';
import app from './app';
import connectDB from './config/db';

const PORT = process.env['PORT'] ?? 5000;

const start = async (): Promise<void> => {
    await connectDB();
    app.listen(PORT, () => {
        process.stdout.write(`Server running on port ${PORT}\n`);
    });
};

start().catch((err: Error) => {
    process.stderr.write(`Failed to start server: ${err.message}\n`);
    process.exit(1);
});
