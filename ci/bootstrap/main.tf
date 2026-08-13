terraform {
  backend "s3" {
    bucket = "franca-portfolio-lambda2container-tfstate"
    key    = "lambda2container/terraform.tfstate"
    region = "us-east-1"

    dynamodb_table = "tfstate-table"
  }
}

resource "aws_s3_bucket" "tfstate" {
  bucket = "franca-portfolio-lambda2container-tfstate"

  tags = {
    Name        = "bucket-tfstate"
    Environment = "development"
  }
}

resource "aws_s3_bucket_versioning" "tfstate-versioning" {
  bucket = aws_s3_bucket.tfstate.id

  versioning_configuration {
    status = "Enabled"
  }
}

resource "aws_dynamodb_table" "tfstate-table" {
  name           = "tfstate-table"
  billing_mode   = "PAY_PER_REQUEST"
  hash_key       = "LockID"

  attribute {
    name = "LockID"
    type = "S"
  }

  tags = {
    Name        = "dynamodb-table-tfstate"
    Environment = "development"
  }
}
