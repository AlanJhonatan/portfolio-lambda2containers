resource "aws_iam_openid_connect_provider" "github_actions_oidc" {
  url = "https://token.actions.githubusercontent.com"

  client_id_list = ["sts.amazonaws.com"]
}

data "aws_iam_policy_document" "github_actions_assume_role" {
  statement {
    effect = "Allow"

    principals {
      type        = "Federated"
      identifiers = [aws_iam_openid_connect_provider.github_actions_oidc.arn]
    }

    actions = ["sts:AssumeRoleWithWebIdentity"]

    condition {
      test     = "StringLike"
      variable = "token.actions.githubusercontent.com:sub"
      values = [
        "repo:AlanJhonatan/portfolio-lambda2containers:*",
        "repo:AlanJhonatan@41169099/portfolio-lambda2containers@1324652805:*"
      ]
    }

    condition {
      test     = "StringEquals"
      variable = "token.actions.githubusercontent.com:aud"
      values   = ["sts.amazonaws.com"]
    }
  }
}

resource "aws_iam_role" "github_actions_role" {
  name               = "github-actions-terraform"
  assume_role_policy = data.aws_iam_policy_document.github_actions_assume_role.json
}

data "aws_iam_policy_document" "github_actions_policy_document" {
  statement {
    sid    = "LambdaAccess"
    effect = "Allow"
    actions = [
      "lambda:CreateFunction", "lambda:UpdateFunctionCode",
      "lambda:UpdateFunctionConfiguration", "lambda:GetFunction",
      "lambda:DeleteFunction", "lambda:AddPermission", "lambda:RemovePermission",
      "lambda:GetPolicy", "lambda:ListVersionsByFunction", "lambda:TagResource",
    ]

    resources = ["*"]
  }

  statement {
    sid       = "ApiGatewayAccess"
    effect    = "Allow"
    actions   = ["apigateway:*"]
    resources = ["*"]
  }

  statement {
    sid    = "IamForLambdaRole"
    effect = "Allow"
    actions = [
      "iam:CreateRole", "iam:DeleteRole", "iam:GetRole",
      "iam:PassRole", "iam:AttachRolePolicy", "iam:DetachRolePolicy",
      "iam:TagRole", "iam:PutRolePolicy", "iam:DeleteRolePolicy",
    ]
    resources = ["*"]
  }

  statement {
    sid       = "TerraformStateAccess"
    effect    = "Allow"
    actions   = ["s3:GetObject", "s3:PutObject", "s3:ListBucket"]
    resources = ["arn:aws:s3:::franca-portfolio-lambda2container-tfstate", "arn:aws:s3:::franca-portfolio-lambda2container-tfstate/*"]
  }

  statement {
    sid       = "DynamoDBTerraformLockAccess"
    effect    = "Allow"
    actions   = ["dynamodb:GetItem", "dynamodb:PutItem", "dynamodb:DeleteItem", "dynamodb:DescribeTable"]
    resources = ["arn:aws:dynamodb:us-east-1:*:table/tfstate-table"]
  }
}

resource "aws_iam_policy" "github_actions_policy" {
  name   = "github-actions-terraform-permissions"
  policy = data.aws_iam_policy_document.github_actions_policy_document.json
}

resource "aws_iam_role_policy_attachment" "github_actions_attach" {
  role       = aws_iam_role.github_actions_role.name
  policy_arn = aws_iam_policy.github_actions_policy.arn
}

output "github_actions_role_arn" {
  value = aws_iam_role.github_actions_role.arn
}
