![Image](https://cdn.discordapp.com/attachments/1007859633400053863/1009092719349604423/MultiGuildReportCMD.jpg)

# djs-report-system
Use this command to report member that act up or to report self ads! You can use this guild wide so any server works with this command.

## Dependencies:
> mongoose => `npm i mongoose`
> chalk => `npm i chalk@4.1.2`
> dotenv => `npm i dotenv`

# Instructions:
> 1. Place the commands into your commands folder.
> 2. Place the events in your events folder.
> 3. Create a new folder in the bot root direcatory and name it "schemas", and than place the schema in there.
> 4. Change all the paths to the right ones if needed.

# MongoDB Connection:
> be sure to add this to your ready.js file.
```
    // Add this to the top of the file
    const { connect } = require('mongoose')
    const chalk = require("chalk")
    
    // Add this to your ready.js file
    await connect(MONGO_URI)
      .then(() => {
        console.log(chalk.yellow(`✅ >>> Successfully connected to MongoDB!`));
      })
      .catch((err) => {
        console.log(err);
      });
```

# Contributing:
> if you want to contribute create a fork of this project and when you are done editing it update the fork and create a pull request.
