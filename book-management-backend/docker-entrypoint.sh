echo "Running migrations..."
npx prisma generate
npx prisma migrate dev --name init

# USER node
echo "Starting app..."
node dist/main