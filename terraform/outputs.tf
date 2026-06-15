output "ec2_public_ip" {
  description = "Elastic IP of the EC2 instance"
  value       = aws_eip.main.public_ip
}

output "ec2_instance_id" {
  description = "EC2 instance ID"
  value       = aws_instance.main.id
}

output "jenkins_url" {
  description = "Jenkins web UI URL"
  value       = "http://${aws_eip.main.public_ip}:8080"
}

output "sonarqube_url" {
  description = "SonarQube web UI URL"
  value       = "http://${aws_eip.main.public_ip}:9000"
}

output "netflix_app_url" {
  description = "Netflix app URL (available after Docker build)"
  value       = "http://${aws_eip.main.public_ip}:8081"
}

output "grafana_url" {
  description = "Grafana URL (available after Phase 4)"
  value       = "http://${aws_eip.main.public_ip}:3000"
}

output "ssh_command" {
  description = "SSH command to connect to the EC2 instance"
  value       = "ssh -i terraform/${var.key_pair_name}.pem ubuntu@${aws_eip.main.public_ip}"
}

output "vpc_id" {
  description = "VPC ID"
  value       = aws_vpc.main.id
}

output "private_key_path" {
  description = "Path to the generated SSH private key"
  value       = "${path.module}/${var.key_pair_name}.pem"
  sensitive   = true
}
