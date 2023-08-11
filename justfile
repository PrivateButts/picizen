setup:
    pdm sync --dev
    pdm run pre-commit install
    cp -n ./.env.example ./.env
    pdm run python manage.py collectstatic --noinput
    pdm run python manage.py migrate

test:
    pdm run pytest

run:
    pdm run python manage.py runserver

format:
    pdm run pre-commit run --all-files

format-fix:
    pdm run pre-commit run black --all-files
    pdm run ruff check --fix .

codegen:
    just npm run codegen

codegen-watch:
    just npm run codegen-watch


npm *COMMAND:
    cd webui && npm {{COMMAND}}

manage *COMMAND:
    pdm run python manage.py {{COMMAND}}

docker *COMMAND:
    docker compose -f docker-compose.yml {{COMMAND}}

docker-dev *COMMAND:
    docker compose -f docker-compose-dev.yaml {{COMMAND}}

docker-dev-manage *COMMAND:
    just docker-dev run web python manage.py {{COMMAND}}
