run:
	docker-compose up api-service database

build:
	docker-compose build api-service database

run-debug:
	docker-compose up --build api-debug database