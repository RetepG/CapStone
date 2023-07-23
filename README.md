# PawCo

## Index

[MVP Feature List](https://github.com/RetepG/CapStone/wiki/Features) |
[Database Schema](https://github.com/RetepG/CapStone/wiki/Database-Schema) |
[User Stories](https://github.com/RetepG/CapStone/wiki/User) |
[Wireframe](https://github.com/RetepG/CapStone/wiki/Wireframe)

## Technologies Used
<img src="https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E" />  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" />  <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" />  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" />  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" />  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />  <img src="https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white" />  <img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" />  <img src="https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white" />  <img src="https://img.shields.io/badge/Amazon_AWS-FF9900?style=for-the-badge&logo=amazonaws&logoColor=whit" /> <img src="https://camo.githubusercontent.com/35f2e05c7eea775c5fbcb068d30e6e69bbbc4205044608e3a4d1b1c648bbd438/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f466c61736b2d2532333030302e7376673f7374796c653d666f722d7468652d6261646765266c6f676f3d666c61736b266c6f676f436f6c6f723d7768697465" />

## Landing Page
<img src="https://gyazo.com/468709ae6477f68d8cb529cd60cb036a">

## Item Page
<img src="https://gyazo.com/6af58265e3a062e3755de4bfc104dc0e">

## Create Item Page
<img src="https://gyazo.com/1af4fedc0abc1258ccac1e836f97564e">

## Cart Page
<img src="https://gyazo.com/af52ea313014e5f4387accccfa527261">

## Getting started
1. Clone this repository (only this branch)

2. Install dependencies

      ```bash
      pipenv install -r requirements.txt
      pipenv install boto3
      ```

3. Create a **.env** file based on the example with proper settings for your
   development environment

4. Make sure the SQLite3 database connection URL is in the **.env** file

5. This starter organizes all tables inside the `flask_schema` schema, defined
   by the `SCHEMA` environment variable.  Replace the value for
   `SCHEMA` with a unique name, **making sure you use the snake_case
   convention**.

6. Get into your pipenv, migrate your database, seed your database, and run your Flask app

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```

7. To run the React App in development, checkout the [README](./react-app/README.md) inside the `react-app` directory.

## Amazon Web Services S3
* Setting up your AWS refer to this [guide](https://github.com/jdrichardsappacad/aws-s3-pern-demo)

## Features
0. Account Management
Signup: Users can create a new account
Login: Users can access their account
Logout: Users can logout to secure their data
1. Items/Products
Users that are logged in can create, update, delete listings made by the user
2. Reviews
Logged in users can create, update, delete their review on products they don't own
3. Cart/Checkout
Users that are logged in can add items that they don't own to their shopping cart and make purchases
4. Bonus Feats AWS
Users can upload images on their create listing.
