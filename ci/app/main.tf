resource "aws_apigatewayv2_api" "portfolio_lambda2container_api" {
  name          = "portfolio-lambda2container-api"
  protocol_type = "HTTP"
}

resource "aws_apigatewayv2_route" "get_all_products" {
  api_id    = aws_apigatewayv2_api.portfolio_lambda2container_api.id
  route_key = "GET /products"

  target = "integrations/${aws_apigatewayv2_integration.lambda_integration.id}"
}

resource "aws_apigatewayv2_route" "get_by_id_products" {
  api_id    = aws_apigatewayv2_api.portfolio_lambda2container_api.id
  route_key = "GET /products/{id}"

  target = "integrations/${aws_apigatewayv2_integration.lambda_integration.id}"
}

resource "aws_apigatewayv2_stage" "apig_portfolio_stage" {
  api_id = aws_apigatewayv2_api.portfolio_lambda2container_api.id
  name   = "$default"

  auto_deploy = true
}

# [LAMBDA FUNCTION]
data "aws_iam_policy_document" "assume_role" {
  statement {
    effect = "Allow"

    principals {
      type        = "Service"
      identifiers = ["lambda.amazonaws.com"]
    }

    actions = ["sts:AssumeRole"]
  }
}

resource "aws_iam_role" "example" {
  name               = "lambda_execution_role"
  assume_role_policy = data.aws_iam_policy_document.assume_role.json
}

resource "aws_iam_role_policy_attachment" "lambda_policy" {
  role = aws_iam_role.example.name
  policy_arn = "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"
}

data "archive_file" "example" {
  type        = "zip"
  source_file = "${path.module}/../../dist/lambda.mjs"
  output_path = "${path.module}/../../output/function.zip"
}

resource "aws_lambda_function" "example" {
  filename      = data.archive_file.example.output_path
  function_name = "example_lambda_function"
  role          = aws_iam_role.example.arn
  handler       = "lambda.handler"
  code_sha256   = data.archive_file.example.output_base64sha256

  runtime = "nodejs24.x"

  environment {
    variables = {
      ENVIRONMENT = "production"
      LOG_LEVEL   = "info"
    }
  }

  tags = {
    Environment = "production"
    Application = "example"
  }
}
# [LAMBDA FUNCTION]

resource "aws_apigatewayv2_integration" "lambda_integration" {
  api_id             = aws_apigatewayv2_api.portfolio_lambda2container_api.id
  integration_type   = "AWS_PROXY"
  integration_uri    = aws_lambda_function.example.invoke_arn
  integration_method = "POST"
}

resource "aws_lambda_permission" "lambda_permission" {
  statement_id  = "AllowPortfolioAPIInvoke"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.example.function_name
  principal     = "apigateway.amazonaws.com"

  # The /* part allows invocation from any stage, method and resource path
  # within API Gateway.
  source_arn = "${aws_apigatewayv2_api.portfolio_lambda2container_api.execution_arn}/*"
}