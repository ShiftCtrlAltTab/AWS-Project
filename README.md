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

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
