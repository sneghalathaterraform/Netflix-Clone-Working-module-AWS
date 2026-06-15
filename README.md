# Netflix DevSecOps Project

A Netflix clone deployed through a full DevSecOps pipeline on AWS.
Built from scratch with Terraform, Jenkins, Docker, SonarQube, Trivy, Prometheus, Grafana, and Kubernetes.

## Tech Stack
- **App**: React 18 + TypeScript + Vite + TMDB API
- **Containerization**: Docker (multi-stage build) + Nginx
- **IaC**: Terraform (manages all AWS resources)
- **CI/CD**: Jenkins
- **Security**: SonarQube, Trivy, OWASP Dependency-Check
- **Monitoring**: Prometheus + Grafana + Node Exporter
- **Orchestration**: AWS EKS + ArgoCD

## Project Structure
```
netflix-devsecops/
├── app/                    # React + Vite source code
│   └── src/
│       ├── components/     # Banner, MovieRow, Navbar
│       ├── hooks/          # TMDB API calls
│       └── pages/
├── terraform/              # All AWS infrastructure as code
├── kubernetes/             # K8s manifests (Phase 6)
├── .github/workflows/      # GitHub Actions (optional)
├── Dockerfile              # Multi-stage build
├── nginx.conf              # SPA routing config
└── Jenkinsfile             # CI/CD pipeline (Phase 3)
```

## Phase 1 — Prerequisites

### 1. Create S3 + DynamoDB for Terraform state (one-time, manual)
```bash
aws s3api create-bucket \
  --bucket netflix-devsecops-tfstate \
  --region us-east-1

aws s3api put-bucket-versioning \
  --bucket netflix-devsecops-tfstate \
  --versioning-configuration Status=Enabled

aws dynamodb create-table \
  --table-name netflix-devsecops-tflock \
  --attribute-definitions AttributeName=LockID,AttributeType=S \
  --key-schema AttributeName=LockID,KeyType=HASH \
  --billing-mode PAY_PER_REQUEST \
  --region us-east-1
```

### 2. Get your TMDB API key
Sign up at https://www.themoviedb.org → Settings → API → Create key

### 3. Find your public IP
```bash
curl https://checkip.amazonaws.com
```

### 4. Fill in terraform/terraform.tfvars
```hcl
my_ip              = "YOUR_IP/32"
tmdb_api_key       = "YOUR_TMDB_KEY"
dockerhub_username = "YOUR_DOCKERHUB_USERNAME"
```

### 5. Deploy infrastructure
```bash
cd terraform
terraform init
terraform plan
terraform apply
```

### 6. Test the app locally first
```bash
cd app
cp .env.example .env
# Add your TMDB key to .env
npm install
npm run dev
```

### 7. Build and run with Docker
```bash
docker build \
  --build-arg VITE_TMDB_API_KEY=your_key \
  -t netflix-app .

docker run -d --name netflix -p 8081:80 netflix-app
# Visit http://localhost:8081
```

## Phases
- [x] Phase 1 — App + Terraform infra
- [ ] Phase 2 — Security (SonarQube + Trivy)
- [ ] Phase 3 — CI/CD (Jenkins)
- [ ] Phase 4 — Monitoring (Prometheus + Grafana)
- [ ] Phase 5 — Notifications
- [ ] Phase 6 — Kubernetes (EKS + ArgoCD)
- [ ] Phase 7 — Cleanup

## Cost Estimate (Phase 1 only)
| Resource | Cost |
|---|---|
| t2.large EC2 | ~$0.094/hr |
| Elastic IP | Free while attached |
| EBS 25GB gp3 | ~$2/month |
| S3 state bucket | <$0.01/month |

> **Tip**: Stop the EC2 instance when not working on it. EIP is free only when attached to a running instance.
