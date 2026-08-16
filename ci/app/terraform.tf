terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 6.58.0"
    }
  }

  backend "s3" {
    bucket         = "franca-portfolio-lambda2container-tfstate"
    key            = "app/terraform.tfstate"
    region         = "us-east-1"
    dynamodb_table = "tfstate-table"
  }

  required_version = ">= 1.15"
}