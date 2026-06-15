variable "aws_region" {
  description = "AWS region to deploy resources"
  type        = string
  default     = "us-east-1"
}

variable "project_name" {
  description = "Project name used for naming all resources"
  type        = string
  default     = "netflix-devsecops"
}

variable "environment" {
  description = "Environment name"
  type        = string
  default     = "dev"
}

variable "vpc_cidr" {
  description = "CIDR block for the VPC"
  type        = string
  default     = "10.0.0.0/16"
}

variable "public_subnet_cidr" {
  description = "CIDR block for the public subnet"
  type        = string
  default     = "10.0.1.0/24"
}

variable "availability_zone" {
  description = "Availability zone for subnet"
  type        = string
  default     = "us-east-1"
}

variable "instance_type" {
  description = "EC2 instance type - t2.large minimum for Jenkins + SonarQube"
  type        = string
  default     = "t2.large"
}

variable "key_pair_name" {
  description = "Name of the AWS key pair to SSH into EC2"
  type        = string
  default     = "netflix-devsecops-key"
}

variable "volume_size" {
  description = "Root EBS volume size in GB"
  type        = number
  default     = 25
}

variable "tmdb_api_key" {
  description = "TMDB API key for the Netflix clone app"
  type        = string
  sensitive   = true
}

variable "dockerhub_username" {
  description = "DockerHub username for pushing images"
  type        = string
}

variable "my_ip" {
  description = "Your local IP for SSH access (e.g. 1.2.3.4/32)"
  type        = string
}
