#

# Project 3 - Codex

This project is a react application that competes with the likes of Stack Overflow and DIEM. The application in question is called Codex and it is an online based freelancing platforming that mimics the usability of Stack Overflow. Codex will enable users to post a question and set a bounty for the question to be solved by the community of developers on the platform.

### **The Wireframes**

This is the main page of the website where a developer can see and select a posted code to be build. Someone can navigate through this page by customizing their search by various parameters (languages shown as a sample parameter).

![Main Page](client/public/image/wireframeQpage.png?raw=true "Main Page")

This is the wiredrame for login. There are multiple options to login, for example using google logins and facebook logins as shown.

![Login Page](client/public/image/login.png?raw=true "Title")

The profile page as shown below, consists of the user dashboard which has their user settings, user score, user info, user history (questions answered and questions posted), user trophies and etc. The user will also be able to access the payments through this page to get tokens and redeem tokens.

![Profile Page](client/public/image/profile.png?raw=true "Profile Page")

The payments page will allow you to make payments to buy tokens on the website, which will be used as a trading system and exchange between the questioner and answerer. The tokens can be bought using paypal and a variety of credit/debit cards. The information on this page will be used securely using encryption methods.

![Payments Page](client/public/image/payment.png?raw=true "Title")

In the questions page, the user is capable of adding their question. This page will be able to add code snippets, upload files and add an amount for the question to be solved.

![Question Page](client/public/image/image.png?raw=true "Title")

After the question has been posted, this page will appear with an answer textbox under the qurestion and the ability to select the question to be solved by another user/developer

![Questions Page 2](client/public/image/balsmiq1.png?raw=true "Title")

This is a schema of the workflow on the app and how the app is supposed to work.

![Schema](client/public/image/schema.jpg?raw=true "Title")

#

## **Getting Started**

#

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### **Prerequisites**

What things you need to install the software and how to install them

Give examples

### **Installing**

This setup allows for a Node/Express/React app which can be easily deployed to Heroku.

The front-end React app will auto-reload as it&#39;s updated via webpack dev server, and the backend Express app will auto-reload independently with nodemon.

#

## **Starting the app locally**

#

Start by installing front and backend dependencies. While in this directory, run the following command:

    npm install

This should install node modules within the server and the client folder.

After both installations complete, run the following command in your terminal:

    npm start

Your app should now be running on [http://localhost:3000](http://localhost:3000/). The Express server should intercept any AJAX requests from the client.

#

## **Deployment (Heroku)**

#

To deploy, simply add and commit your changes, and push to Heroku. As is, the NPM scripts should take care of the rest.

#

## **Running the tests**

#

Explain how to run the automated tests for this system

### **Break down into end to end tests**

Explain what these tests test and why

Give an example

### **And coding style tests**

Explain what these tests test and why

Give an example

#

## **Built With**

#

- JavaScript
  - AXIOS – The HTTP requesting library for asynchronous operations
  - MERN – The Web Stack of the project
    - MongoDB
    - Express
    - REACT
      - Material UI – User-Interface for the application
      - Hooks
    - js
  - Router – API routing
  - jSON
    - JWT – Used to secure API&#39;s and logins with digital certificates
  - Context
- CSS

## **Contributing**

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## **Versioning**

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags).

#

## **Authors**

#

- **Sarneet Longia** – _Project Manager_ – [SarneetGit](https://github.com/SarneetGit)
- **Andrew Faria** – _Lead Developer_ – [afwebdev](https://github.com/afwebdev)
- **Manjyot Thandi** – _Lead Developer_ – [ManjyotThandi](https://github.com/ManjyotThandi)
- **Nick Forma** – _Junior Developer_ – [NickForma](https://github.com/NickForma)
- **Jatinder Khaira** – _Junior Developer_ – [jatinkhaira](https://github.com/jatinkhaira)

See also the list of [contributors](https://github.com/afwebdev/project3/graphs/contributors) who participated in this project.

#

## **License**

#

This project is licensed under the MIT License - see the [LICENSE.md](https://gist.github.com/PurpleBooth/LICENSE.md) file for details

#

## **Acknowledgments**

#

- Hat tip to anyone whose code was used
- Inspiration
- etc
