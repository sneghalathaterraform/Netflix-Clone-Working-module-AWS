terraform {
  backend "s3" {
    bucket       = "netflix-devsecops-tfstate" # change to your unique bucket name
    key          = "phase1/terraform.tfstate"
    region       = "us-east-1"
    use_lockfile = true
  }
}