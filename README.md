# Total Golf [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Links
- [GitHub](https://github.com/seanscott95/total-golf)
- [Tough Tracking](https://total-golf.herokuapp.com/)
<p>Please allow site to load for 10-15 seconds</p>

## Description
<p>This application creates a golf scorecard that keeps track of you and your mates scores.
</p>
<p>Setup a site password during installation so only you and your mates can sign up
</p>
<p>Create a scorecard that includes the date, course played at and all the players names and scores saved in your database
</p>
<p>Compete with your friends to see who is better by checking out the Leaderboard page where you'll be able to see the top three highest scores depending on the number of holes on the scorecard
</p>
<p>Check out your own scores where you can see your own average best and worst for all the games played broken down by number of holes played and below that all of the games you've played
</p>

<p>This application was created with JavaScript and included the following technologies:</p>

- [React.js](https://reactjs.org/)

- [Node.js](https://nodejs.org/en/)

- [Redux-Toolkit](https://redux-toolkit.js.org/)

- [Express](https://www.npmjs.com/package/express)

- [React-Router](https://reactrouter.com/en/main)

- [bcrypt](https://www.npmjs.com/package/bcrypt)

- [Json-Web-Token](https://www.npmjs.com/package/jsonwebtoken)

- [Mongoose](https://www.npmjs.com/package/mongoose)

- [Dotenv](https://www.npmjs.com/package/dotenv)

    
## Table of Contents 
- [Screenshots](#Screenshots)
- [Installation](#Installation)
- [Usage](#Usage)
- [License](#License)
- [Questions](#Questions)

## Screenshots

<p>Leaderboard Page</p>

- ![Leaderboard-Page](./client/src/assets/screenshots/leaderboard.PNG)
- ![Leaderboard-Page2](./client/src/assets/screenshots/leaderboard2.PNG)

<p>Personal Page</p>

- ![Personal-Page](./client/src/assets/screenshots/personal-page.PNG)
- ![Personal-Page2](./client/src/assets/screenshots/personal-page2.PNG)

<p>Scorecard Form</p>

- ![Scorecard-Form](./client/src/assets/screenshots/create-scorecard-user-added.PNG)

<p>Single Scorecard</p>

- ![Single-Scorecard](./client/src/assets/screenshots/view-single.PNG)

<p>Edit Scorecard</p>

- ![Edit-Scorecard](./client/src/assets/screenshots/edit-scorecard.PNG)

<p>Scores Page</p>

- ![Scores-Page](./client/src/assets/screenshots/scores-page.PNG)

<p>Signin Page</p>

- ![Signin-Page](./client/src/assets/screenshots/signin-page.PNG)

<p>Site Password</p>

- ![Site-Password](./client/src/assets/screenshots/signup-page-site-password.PNG)

<p>Signup Page</p>

- ![Signup-Page](./client/src/assets/screenshots/signup-page.PNG)

<p>Leaderboard Page Phone Screen</p>

- ![Leaderboard-Page-Mobile](./client/src/assets/screenshots/leaderboard-small-screen.PNG)

<p>Scores Page Small Screen</p>

- ![Scores-Page-Small-Screen](./client/src/assets/screenshots/scores-page-small-screen.PNG)

<p>Create Scorecard Phone Screen</p>

- ![Create-Scorecard-Phone-Screen](./client/src/assets/screenshots/create-scorecard-small-screen.PNG)

## Installation
<p>If you would like to download the application please follow these instructions:
</p>

- Please have Node.js, npm, git and mongodb installed and/or setup.

- To start, clone this repository by using the following command:

 ```
  git clone git@github.com:seanscott95/Total-Golf.git
 ```

- Environmental Variables:
    - For this application to work you must set up the env files that are needed
    - There are two files that require env variables, please find the env.EXAMPLE files to see an example of how they are structured in the root file and the client file
    - The env file in the root folder needs four env variables. If user is unsure on how to set up the env variables they can search for the env variables NODE_ENV, PORT, MONGO_URI and JWT_SECRET online as for their meaning. The only really important and confusing variable is the MONGO_URI so please do your research for setup
    - The other env file is the site password which is set by the user so that random visitors can not sign up
    - Remember there are no quotations necessary

- In your terminal navigate to the cloned repository and run ```npm run install``` to install the node modules needed for this application.

- Then enter ```npm run develop``` to start the application.

- If your browser doesn't open straight away you can search for it using the url ```http//:localhost:3000```

## Usage
- When creating a scorecard fill in the form for the users and their names and click add. This will add a score to your golf scorecard. You can add as many as you want.
- Make sure to have filled in the date and the course name if not already. When you're done click create and the scorecard will be created for you.
- You can edit and delete the scorecard by clicking on a scorecard which will view just the scorecard and where you can click the edit button to edit or delete the scorecard.

## License 
<p> This application is covered under the:</p>

- [MIT-License](https://opensource.org/licenses/MIT)

## Questions 
<p> To reach me with additional questions please contact me via one of the following methods: </p>

- [GitHub](https://github.com/seanscott95)
- [Email](mailto:seanms418@gmail.com)
- [LinkedIn](https://www.linkedin.com/in/sean-scott-18ba07225/)