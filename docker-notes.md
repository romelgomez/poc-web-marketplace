# To list and delete all Docker images, you can use the following Docker commands:

### List all Docker images
To list all Docker images on your system, use the following command:
```bash
docker images
```
This will display a table of all images, including the repository, tag, image ID, creation date, and size.

### Delete all Docker images
To delete all Docker images, you can combine Docker commands to stop and remove all containers first, and then remove all images. Here's a step-by-step guide:

1. **Stop all running containers:**
   ```bash
   docker stop $(docker ps -aq)
   ```
   This command stops all running containers.

2. **Remove all containers:**
   ```bash
   docker rm $(docker ps -aq)
   ```
   This command removes all containers, whether they are running or stopped.

3. **Remove all Docker images:**
   ```bash
   docker rmi $(docker images -q)
   ```
   This command removes all Docker images.

### Combined Command
You can combine these steps into a single command to stop and remove all containers, then remove all images:
```bash
docker stop $(docker ps -aq) && docker rm $(docker ps -aq) && docker rmi $(docker images -q)
```

### Force Removal
If you encounter errors because some images are in use, you can use the `-f` (force) flag to force the removal:
```bash
docker rmi -f $(docker images -q)
```

### Clean up Unused Data
Additionally, you can use Docker's built-in clean-up command to remove unused data:
```bash
docker system prune -a
```
This command will remove all stopped containers, all unused networks, all dangling images, and optionally, all unused volumes.

By following these commands, you can list and delete all Docker images on your system effectively.