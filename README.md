# NomNom Notes

NomNom Notes is an application carefully designed for food lovers in mind to keep track of all the restaurants you want to try in one place. Search and add restaurants to a personal must-try checklist so that when it comes time to eat out, you never forget which restaurants you want to visit again. After experiencing a restaurant, simply check it off your list and decide whether it's worthy to become a favourite or is a pass.

Elevate your dining experiences with NomNom Notes, your ultimate restaurant companion, as remembering where to dine should be as enjoyable as the meal itself.

Note: To use NomNom Notes, you'll need to set up and connect it to the [client repository](https://github.com/ckatieng/katie-ng-nomnomnotes-client.git), MySQL database, and the Google Maps API. Instructions on how to set this up are provided below.


## Features

**Discover & Add:** 

Did you just hear about an amazing restaurant from a friend? Or did you discover a new restaurant on social media? On NomNom Notes, you can explore the most updated database of restaurants and easily add them to your personal "Must-Try" checklist. If you're unsure, view more details about the restaurant and decide for yourself whether it should make your list. Haven't heard of any restaurants recently? Take a look at the "Top 10" list that are rated right within the app for new discoveries. 

**Organize & Track:** 

Keep all your restaurant options in one place and never forget a great dining spot again. The favourite list ensures you have access to the ones you will want to visit again or may be worthy enough to share with others.

**Review & Rate:** 

After visiting a restaurant, simply check it off your list and decide whether it's worthy to become a favourite or is a pass. Even if it's a pass, you'll still have access to the restaurants that you have visited but feel free to delete and remove it altogether. You also have the option to provide a rating after your dining experience and influence the "Top 10" list.

## How to Use

Clone the server repository:

```bash
git clone git@github.com:ckatieng/katie-ng-nomnomnotes-server.git
```

Go to the server project directory:

```bash
cd katie-ng-nomnomnotes-server
```

Install server dependencies:

```bash
npm install
```

Create MySQL database:

```bash
CREATE DATABASE nomnomnotes;
```

Create an .env file within the main repository folder with the following:

```bash
# CORS_ORIGIN: This is the allowed origin for Cross-Origin Resource Sharing.
# It should match the URL where the client application is hosted during development.
CORS_ORIGIN=http://localhost:3000

# PORT: The port on which your server will listen.
PORT=5050

# GOOGLE_API_KEY: Your Google Maps API key.
# This is required for using Google Maps services in the application.
GOOGLE_API_KEY=

# DB_LOCAL_DBNAME: The name of the MySQL database.
DB_LOCAL_DBNAME=nomnomnotes

# DB_LOCAL_USER: The username for accessing the MySQL database.
DB_LOCAL_USER=

# DB_LOCAL_PASSWORD: The password for the MySQL user.
DB_LOCAL_PASSWORD=
```

Generate your own Google Maps API key. The link below gives detailed instructions on how to do this. You will need to sign up for an account on Google Cloud Platform, create a billing account, setup a new project, attach the billing account to the project, and then generate an API key. Google offers a free credit of $300 for all new users of Google Cloud Platform and will not autocharge after the free trial ends. Once you have an API key, enter it into the .env file.

[Getting Started with Google Maps Platform](https://developers.google.com/maps/get-started)

Run database migration:

```bash
npm run migrate
```

Seed database:

```bash
npm run seed
```

Start the server:

```bash
npm start
```

Note: To use NomNom Notes, it's essential to run both the server and client sides simultaneously. Make sure to run the server side before the client side.


## Tech Stack

**Client:** React, JavaScript, SCSS (BEM), Material UI, Axios, Google Maps API

**Server:** Node.js, Express, Knex.js, JavaScript, Axios, Google Maps API

**Database:** MySQL


## Credits

Graphics: 
- [https://elements.envato.com/food-icons-5FDDJXG](https://elements.envato.com/food-icons-5FDDJXG)


## Thank You

Thank you for taking the time to checkout NomNom Notes! Feel free to reach out if you have any questions or comments.


---


- LinkedIn [@katiecng](https://www.linkedin.com/in/katiecng/)
- GitHub [@ckatieng](https://github.com/ckatieng)