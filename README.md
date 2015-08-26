# Easy email validation using the Mailgun API

## How to use
1. Create an account at https://mailgun.com
2. Retrieve your Public API key from https://mailgun.com/app/dashboard
3. Install the node modules by running `npm install` from the project root
4. Create a new file `.env` and place your Mailgun Public Key inside in the form of:        
    `KEY=pubkey-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`
5. Create a new file `input.txt` and place inside all the emails you want to check in the form of:
`email@email.email`  
`email@email.email`  
`email@email.email`  
`email@email.email`  
`email@email.email`  
`...`
6. run `npm start`
