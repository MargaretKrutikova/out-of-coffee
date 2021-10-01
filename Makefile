up:
	docker-compose -f docker/docker-compose.yml up -d
    
build: 
	docker-compose -f docker/docker-compose.yml up -d --build
	
start:
	...

down: 
    docker-compose down
