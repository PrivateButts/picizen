setup:
    pipenv sync --dev
    pipenv run pre-commit install
    cp -n ./.env.example ./.env
    pipenv run python manage.py collectstatic --noinput
    pipenv run python manage.py migrate

test:
    pipenv run pytest

run:
    pipenv run python manage.py runserver

format:
    pipenv run pre-commit run --all-files

format-fix:
    pipenv run pre-commit run black --all-files
    pipenv run ruff check --fix .

codegen:
    just npm run codegen

codegen-watch:
    just npm run codegen-watch


npm *COMMAND:
    cd webui && npm {{COMMAND}}

manage *COMMAND:
    pipenv run python manage.py {{COMMAND}}

docker *COMMAND:
    docker compose -f docker-compose.yml {{COMMAND}}

docker-dev *COMMAND:
    docker compose -f docker-compose-dev.yaml {{COMMAND}}
