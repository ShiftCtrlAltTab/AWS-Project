# AWS-Project

The deployment code was first developed locally and then deployed on AWS cloud.

In order to run the application online visit the URL: https://d2gaanskxb6i54.cloudfront.net/
You can register and create a new user.
The user login should be able to see Dashboard highlighting all the available blood units, Request form to either request blood or request to make a blood donation, History page to track all the requests made, and profile page to edit their details.

# For admin login,

you can use the following credentials:
username: admin@gmail.com
password: Admin@123!!

The admin page will display dashboard with total user requests and availabale blood units, a Donors List page to approve or reject the donations request created by user, a Blood Request List page to approve or deny blood request created by users, a Ledger page which will display all the requests that are either approved or denied, and a Users page that will list all the users.

In terms of local deployemnt, let us walk you through the entire process and technologies used.

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

# Getting Started

First, run the development server in your terminal:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can modifycontents of `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

# Blood Bank Management System Deployment

## AWS Automated Deployment with Terraform

This repository contains the Terraform configurations for deploying the Blood Bank Management System to AWS. Follow the steps below to set up your environment and deploy the application.

### Prerequisites

1. Install [Terraform](https://www.terraform.io/downloads.html).
2. Install the [AWS CLI](https://aws.amazon.com/cli/) and configure it with your AWS credentials.
3. Ensure you have Node.js and npm installed on your local machine.

### Deployment Steps

1. **Clone the repository**:

   ```bash
   git clone https://github.com/ShiftCtrlAltTab/AWS-Project.git
   cd AWS-Project

   ```

2. Create the main.tf file: The Terraform configuration file is already provided in the repository.
3. Create the deploy.sh script: The deployment script is included in the repository.

4. Run the deployment script:
   bash
   chmod +x deploy.sh
   ./deploy.sh

5. Access your application: After deployment, your application will be available at the CloudFront distribution URL displayed in the terminal.
