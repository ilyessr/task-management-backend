ifneq (,$(wildcard ./.env))
    include .env
    export
endif

# Docker Compose Management

CONTAINER_NAME_MONGO := task_management_mongodb
CONTAINER_NAME_REDIS := task_management_redis
BACKUP_FILE := backup-$(shell date +"%Y%m%d-%H%M%S").gz
## Usage

# To install project dependencies:
install:
	npm install

# To start all containers in detached mode:
start:
	docker-compose up 

# To start all containers in detached mode and rebuild images:
start-build:
	docker-compose up --build 

# To restart all containers:
restart:
	docker-compose restart

# To enter the MongoDB container's terminal:
mongo-shell:
	docker exec -it $(CONTAINER_NAME_MONGO) bash

# To connect to MongoDB terminal:
mongo-connect:
	docker exec -it $(CONTAINER_NAME_MONGO) mongo -u $(MONGO_USERNAME) -p $(MONGO_PASSWORD) --authenticationDatabase admin task_management
# To enter the Redis container's terminal:
redis-shell:
	docker exec -it $(CONTAINER_NAME_REDIS) bash

# To stop all containers:
stop:
	docker-compose stop

# To remove all containers:
remove:
	docker-compose down -v

# To create a backup of MongoDB data:
backup:
	docker exec $(CONTAINER_NAME_MONGO) mongodump --gzip --archive=/backup/$(BACKUP_FILE)

# To restore MongoDB data from a backup:
restore:
	docker exec -i $(CONTAINER_NAME_MONGO) mongorestore --gzip --archive=/backup/$(BACKUP_FILE)

# To clean up local MongoDB data (remove all data files):
clean:
	rm -rf data/*