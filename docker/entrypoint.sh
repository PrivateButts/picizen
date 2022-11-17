#!/bin/sh

# Hey, if you're using windows and autoCRLF conversion, you'll run into weird issues with this script even under WSL or docker. Convert it back to LF or use LF only.

echo "Waiting for postgres..."

while ! nc -z db 5432; do
    sleep 0.1
done

echo "PostgreSQL started"

python manage.py migrate
python manage.py collectstatic --noinput

exec "$@"