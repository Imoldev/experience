up:
	docker-compose up --build

dev:
	docker-compose run --rm dev-server npm run start:dev

debug:
	docker exec server npm run start:debug
