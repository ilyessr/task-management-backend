# MongoDB Docker Management

CONTAINER_NAME := mongodb
BACKUP_FILE := backup-$(shell date +"%Y%m%d-%H%M%S").gz
MONGODB_USER := admin
MONGODB_PASSWORD := admin

## Usage

# To start the MongoDB container in detached mode:
start:
	docker-compose up -d

# To restart the MongoDB container (stop and recreate):
restart:
	docker-compose restart mongodb

# To enter the MongoDB container's terminal:
shell:
	docker exec -it $(CONTAINER_NAME) bash

# To connect to MongoDB terminal:
connect:
	docker exec -it $(CONTAINER_NAME) mongosh -u $(MONGODB_USER) -p $(MONGODB_PASSWORD) --authenticationDatabase admin $(MONGO_DATABASE)
	
# To stop the MongoDB container:
stop:
	docker-compose stop

# To remove the MongoDB container:
remove:
	docker-compose down

# To create a backup of MongoDB data:
backup:
	docker exec $(CONTAINER_NAME) mongodump --gzip --archive=/backup/$(BACKUP_FILE)

# To restore MongoDB data from a backup:
restore:
	docker exec -i $(CONTAINER_NAME) mongorestore --gzip --archive=/backup/$(BACKUP_FILE)

# To clean up local MongoDB data (remove all data files):
clean:
	rm -rf data/*
