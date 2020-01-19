dev-build:
	docker-compose -f docker-compose.yml -f .devcontainer/docker-compose.yml up -d --build
dev:
	docker-compose -f docker-compose.yml -f .devcontainer/docker-compose.yml up -d
down:
	docker-compose -f docker-compose.yml -f .devcontainer/docker-compose.yml down
test:
	docker-compose -f docker-compose.yml -f .devcontainer/docker-compose.yml run server npm test
	docker-compose -f docker-compose.yml -f .devcontainer/docker-compose.yml run client npm test