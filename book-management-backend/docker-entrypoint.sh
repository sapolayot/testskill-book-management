echo "Running migrations..."
npx prisma migrate dev --name init

echo "Starting app..."
node dist/main