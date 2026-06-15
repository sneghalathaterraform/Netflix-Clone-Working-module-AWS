#!/bin/bash
set -e
exec > /var/log/user_data.log 2>&1
echo "=== Bootstrap started: $(date) ==="

# System update
apt-get update -y
apt-get upgrade -y
apt-get install -y curl wget git unzip apt-transport-https ca-certificates gnupg lsb-release software-properties-common

# Docker
echo "=== Installing Docker ==="
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
echo "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null
apt-get update -y
apt-get install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin
systemctl enable docker
systemctl start docker
usermod -aG docker ubuntu
chmod 777 /var/run/docker.sock

# Java
echo "=== Installing Java 17 ==="
apt-get install -y fontconfig openjdk-17-jre

# Trivy
echo "=== Installing Trivy ==="
wget -qO - https://aquasecurity.github.io/trivy-repo/deb/public.key | gpg --dearmor | tee /usr/share/keyrings/trivy.gpg > /dev/null
echo "deb [signed-by=/usr/share/keyrings/trivy.gpg] https://aquasecurity.github.io/trivy-repo/deb $(lsb_release -sc) main" | tee /etc/apt/sources.list.d/trivy.list
apt-get update -y
apt-get install -y trivy

# Node.js
echo "=== Installing Node.js 18 ==="
curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
apt-get install -y nodejs

# Store env variables
echo "TMDB_V3_API_KEY=${tmdb_api_key}" >> /etc/environment
echo "DOCKERHUB_USERNAME=${dockerhub_username}" >> /etc/environment

systemctl restart docker

echo "=== Bootstrap complete: $(date) ==="
