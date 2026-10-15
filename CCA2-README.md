# CCA2: CI/CD Pipeline for Smart Placement Backend

**Course:** Cloud Computing and DevOps (TYCSE)
**Repository branch:** `ccd-pipeline`

## 1. Project chosen
Smart Placement is an AI-powered internship and placement management system (React frontend, Node/Express backend, Supabase database). For this assignment the **backend** (`backend/`, Node + Express) is built, tested and deployed through the pipeline.

## 2. Tools used
GitHub, AWS EC2, Jenkins, Docker, Docker Hub, Minikube, kubectl.

## 3. Pipeline stages (Jenkinsfile)
| Stage | What it does |
|---|---|
| Checkout | Jenkins pulls the latest code from GitHub |
| Build and Test | Runs `npm install` and `npm test` (8 unit tests) in `backend/` |
| Docker Build | Builds the image from `backend/Dockerfile`, tagged with the build number and `latest` |
| Push Image | Logs in to Docker Hub using credentials stored in Jenkins and pushes both tags |
| Minikube Deployment | Applies the manifests in `k8s/`, sets the new image tag and waits for the rollout |
| Verification | Prints the pods, deployment and service |

## 4. Jenkins setup on AWS
- An EC2 instance (Amazon Linux 2023, c7i-flex.large, Mumbai region) runs everything.
- Installed on it: Docker, Java 21, Jenkins, Node.js, kubectl and Minikube.
- The `jenkins` user was added to the `docker` group, and Minikube was started as that user so the pipeline can use it.
- Port 8080 is open in the security group so Jenkins is reachable in the browser.
- A Pipeline job (`smart-placement-pipeline`) uses "Pipeline script from SCM" with this repository, branch `ccd-pipeline` and the `Jenkinsfile` at the root.
- Docker Hub access token is stored as a Jenkins credential with the ID `dockerhub-creds`. No secrets are in the repository.

## 5. How the image is pushed
The pipeline builds `anshu226/smart-backend:<build-number>` and `anshu226/smart-backend:latest` and pushes them to Docker Hub with `docker push`.

## 6. How it is deployed and accessed
- `k8s/deployment.yaml` runs the backend as a Deployment and pulls the image from Docker Hub.
- `k8s/service.yaml` exposes it with a NodePort service on port 30080.
- The backend needs Supabase keys, which are kept out of the image and the repository. They are stored as a Kubernetes Secret (`backend-env`) and loaded into the pod as environment variables.
- Access check from the server: `curl $(minikube ip):30080/api/health`

## 7. Second run (code change)
In `backend/server.js` the health message was changed to `Backend server is running - version 2`. After pushing the commit and running the pipeline again, the new image was built, pushed and rolled out, and the health endpoint returned the new message.

## 8. Issues solved
- Jenkins needed Java 21 (Java 17 failed to start it).
- The container crashed without Supabase keys, so a Kubernetes Secret was added.
- The Supabase library needed Node 22, so the Dockerfile uses `node:22-alpine`.