1. Create Project Folder
mkdir 23071A05A0-Terraform
cd 23071A05A0-Terraform
code .


2. Initialize Terraform
terraform init


3. Validate Configuration
terraform validate


4. Create Execution Plan
terraform plan


5. Apply Configuration
terraform apply


6. Inspect Terraform State
terraform show


7. List Managed Resources
terraform state list


8. Destroy Resources
terraform destroy



=================

install Cmd 

winget install Hashicorp.Terraform

======

1. Terraform – Infrastructure Creation
Create folder
mkdir terraform-demo
cd terraform-demo


Create main.tf

terraform {
  required_providers {
    docker = {
      source  = "kreuzwerker/docker"
      version = "~> 3.0"
    }
  }
}

provider "docker" {}

resource "docker_image" "nginx" {
  name = "nginx:latest"
}

resource "docker_container" "nginx" {
  name  = "terraform-nginx"
  image = docker_image.nginx.image_id

  ports {
    internal = 80
    external = 8081
  }
}


Run commands
terraform init
terraform validate
terraform plan
terraform apply


Type yes.

Check output
http://localhost:8081


Delete container
terraform destroy



2. Terraform State Management
View State
terraform state list
terraform show


View State File
type terraform.tfstate


View Specific Resource
terraform state show docker_container.nginx


Remove Resource from State
terraform state rm docker_container.nginx




Other useful commands
terraform fmt
terraform validate
terraform plan
terraform refresh