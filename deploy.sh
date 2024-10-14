#!/bin/bash

# Build the Next.js application
npm run build

# Export the static files
npm run export

# Apply Terraform changes
terraform init
terraform apply -auto-approve

# Sync the static files to S3
aws s3 sync out/ s3://$(terraform output -raw s3_bucket_name)

echo "Deployment complete. Your application is available at: $(terraform output -raw cloudfront_domain_name)"