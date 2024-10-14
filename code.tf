provider "aws" {
  region = "us-east-1"
}

# VPC
resource "aws_vpc" "main" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_hostnames = true
  enable_dns_support   = true

  tags = {
    Name = "blood-bank-vpc"
  }
}

# Public Subnets
resource "aws_subnet" "public" {
  count                   = 2
  vpc_id                  = aws_vpc.main.id
  cidr_block              = "10.0.${count.index + 1}.0/24"
  availability_zone       = data.aws_availability_zones.available.names[count.index]
  map_public_ip_on_launch = true

  tags = {
    Name = "Public Subnet ${count.index + 1}"
  }
}

# Private Subnets
resource "aws_subnet" "private" {
  count             = 2
  vpc_id            = aws_vpc.main.id
  cidr_block        = "10.0.${count.index + 10}.0/24"
  availability_zone = data.aws_availability_zones.available.names[count.index]

  tags = {
    Name = "Private Subnet ${count.index + 1}"
  }
}

# Internet Gateway
resource "aws_internet_gateway" "main" {
  vpc_id = aws_vpc.main.id

  tags = {
    Name = "Main IGW"
  }
}

# Elastic IP for NAT Gateway
resource "aws_eip" "nat" {
  vpc   = true
  count = 2

  tags = {
    Name = "NAT Gateway EIP ${count.index + 1}"
  }
}

# NAT Gateway
resource "aws_nat_gateway" "main" {
  count         = 2
  allocation_id = aws_eip.nat[count.index].id
  subnet_id     = aws_subnet.public[count.index].id

  tags = {
    Name = "NAT Gateway ${count.index + 1}"
  }
}

# Route Table for Public Subnets
resource "aws_route_table" "public" {
  vpc_id = aws_vpc.main.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.main.id
  }

  tags = {
    Name = "Public Route Table"
  }
}

# Route Table for Private Subnets
resource "aws_route_table" "private" {
  count  = 2
  vpc_id = aws_vpc.main.id

  route {
    cidr_block     = "0.0.0.0/0"
    nat_gateway_id = aws_nat_gateway.main[count.index].id
  }

  tags = {
    Name = "Private Route Table ${count.index + 1}"
  }
}

# Route Table Association for Public Subnets
resource "aws_route_table_association" "public" {
  count          = 2
  subnet_id      = aws_subnet.public[count.index].id
  route_table_id = aws_route_table.public.id
}

# Route Table Association for Private Subnets
resource "aws_route_table_association" "private" {
  count          = 2
  subnet_id      = aws_subnet.private[count.index].id
  route_table_id = aws_route_table.private[count.index].id
}

# Security Group for ELB
resource "aws_security_group" "elb" {
  name        = "elb-sg"
  description = "Security group for ELB"
  vpc_id      = aws_vpc.main.id

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# Security Group for EC2 Instances
resource "aws_security_group" "ec2" {
  name        = "ec2-sg"
  description = "Security group for EC2 instances"
  vpc_id      = aws_vpc.main.id

  ingress {
    from_port       = 80
    to_port         = 80
    protocol        = "tcp"
    security_groups = [aws_security_group.elb.id]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# ELB
resource "aws_elb" "main" {
  name            = "blood-bank-elb"
  subnets         = aws_subnet.public[*].id
  security_groups = [aws_security_group.elb.id]

  listener {
    instance_port     = 80
    instance_protocol = "http"
    lb_port           = 80
    lb_protocol       = "http"
  }

  health_check {
    healthy_threshold   = 2
    unhealthy_threshold = 2
    timeout             = 3
    target              = "HTTP:80/"
    interval            = 30
  }

  tags = {
    Name = "Blood Bank ELB"
  }
}

# EC2 Instances
resource "aws_instance" "app" {
  count                  = 2
  ami                    = "ami-0c55b159cbfafe1f0"  # Amazon Linux 2 AMI (adjust as needed)
  instance_type          = "t2.micro"
  subnet_id              = aws_subnet.private[count.index].id
  vpc_security_group_ids = [aws_security_group.ec2.id]

  tags = {
    Name = "Blood Bank App Server ${count.index + 1}"
  }
}

# ELB Attachment
resource "aws_elb_attachment" "main" {
  count    = 2
  elb      = aws_elb.main.id
  instance = aws_instance.app[count.index].id
}

# DynamoDB Tables
resource "aws_dynamodb_table" "users" {
  name           = "Users"
  billing_mode   = "PAY_PER_REQUEST"
  hash_key       = "user_id"

  attribute {
    name = "user_id"
    type = "S"
  }

  attribute {
    name = "email"
    type = "S"
  }

  global_secondary_index {
    name               = "EmailIndex"
    hash_key           = "email"
    projection_type    = "ALL"
  }

  tags = {
    Name = "Blood Bank Users Table"
  }
}

resource "aws_dynamodb_table" "blood_groups" {
  name           = "BloodGroups"
  billing_mode   = "PAY_PER_REQUEST"
  hash_key       = "blood_group"

  attribute {
    name = "blood_group"
    type = "S"
  }

  tags = {
    Name = "Blood Bank Blood Groups Table"
  }
}

resource "aws_dynamodb_table" "blood_requests" {
  name           = "BloodRequests"
  billing_mode   = "PAY_PER_REQUEST"
  hash_key       = "request_id"

  attribute {
    name = "request_id"
    type = "S"
  }

  attribute {
    name = "requester_id"
    type = "S"
  }

  attribute {
    name = "blood_group"
    type = "S"
  }

  attribute {
    name = "request_date"
    type = "S"
  }

  global_secondary_index {
    name               = "RequesterIndex"
    hash_key           = "requester_id"
    range_key          = "request_date"
    projection_type    = "ALL"
  }

  global_secondary_index {
    name               = "BloodGroupIndex"
    hash_key           = "blood_group"
    range_key          = "request_date"
    projection_type    = "ALL"
  }

  tags = {
    Name = "Blood Bank Blood Requests Table"
  }
}

# Data source for availability zones
data "aws_availability_zones" "available" {
  state = "available"
}

# Outputs
output "elb_dns_name" {
  value = aws_elb.main.dns_name
}

output "dynamodb_users_table_name" {
  value = aws_dynamodb_table.users.name
}

output "dynamodb_blood_groups_table_name" {
  value = aws_dynamodb_table.blood_groups.name
}

output "dynamodb_blood_requests_table_name" {
  value = aws_dynamodb_table.blood_requests.name
}
