up:
	docker-compose -f docker/docker-compose.yml up -d

build:
	docker-compose -f docker/docker-compose.yml -f docker/docker-compose.dev.yml up --build

down: 
	docker-compose down

dev:
	docker-compose -f docker/docker-compose.yml -f docker/docker-compose.dev.yml up