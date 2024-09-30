#   ingress {
#     from_port   = 80
#     to_port     = 80
#     protocol    = "tcp"
#     cidr_blocks = ["0.0.0.0/0"]
#   }

#   egress {
#     from_port   = 0
#     to_port     = 0
#     protocol    = "-1"
#     cidr_blocks = ["0.0.0.0/0"]
#   }
# }

# # Launch Template (replaces Launch Configuration)
# resource "aws_launch_template" "app" {
#   name_prefix   = "app-launch-template"
#   image_id      = "ami-0062355a529d6089c" # Your AMI ID
#   instance_type = "t2.micro"

#   vpc_security_group_ids = [aws_security_group.allow_http.id]

#   user_data = <<-EOF
#     #!/bin/bash
#     sudo yum update -y
#     sudo amazon-linux-extras install docker -y
#     sudo service docker start
#     sudo usermod -aG docker ec2-user
#     docker run -p 80:80 hunainarif30/cloud-project
#   EOF
# }

# # Auto Scaling Group
# resource "aws_autoscaling_group" "app_asg" {
#   launch_template {
#     id      = aws_launch_template.app.id
#     version = "$Latest"
#   }
#   min_size            = 1
#   max_size            = 3
#   desired_capacity    = 1
#   vpc_zone_identifier = data.aws_subnets.default.ids # Reference to the subnets

#   tag {
#     key                 = "Name"
#     value               = "app-instance"
#     propagate_at_launch = true
#   }
# }

# # Auto Scaling Policies
# resource "aws_autoscaling_policy" "scale_up" {
#   name                   = "scale_up"
#   scaling_adjustment     = 1
#   adjustment_type        = "ChangeInCapacity"
#   autoscaling_group_name = aws_autoscaling_group.app_asg.name
# }

# resource "aws_autoscaling_policy" "scale_down" {
#   name                   = "scale_down"
#   scaling_adjustment     = -1
#   adjustment_type        = "ChangeInCapacity"
#   autoscaling_group_name = aws_autoscaling_group.app_asg.name
# }
terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.16"
    }
  }

  required_version = ">= 1.2.0"
}

provider "aws" {
  region = "us-east-1"
}
resource "aws_launch_template" "app" {
  name_prefix   = "app-launch-template"
  image_id      = "ami-0062355a529d6089c" # Your AMI ID
  instance_type = "t2.micro"

  #   vpc_security_group_ids = [aws_security_group.allow_http.id]

  user_data = <<-EOF
    #!/bin/bash
    sudo yum update -y
    sudo amazon-linux-extras install docker -y
    sudo service docker start
    sudo usermod -aG docker ec2-user
    docker run -p 80:80 hunainarif30/cloud-project
  EOF
}
# resource "aws_instance" "app_server" {
#   ami           = "ami-0062355a529d6089c"
#   instance_type = "t2.micro"

#   tags = {
#     Name = "CloudProject"
#   }
# }
