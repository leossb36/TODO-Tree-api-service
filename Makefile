run:
	docker-compose up api-service mysql

build:
	docker-compose build api-service mysql

run-debug:
	docker-compose up --build api-debug mysql