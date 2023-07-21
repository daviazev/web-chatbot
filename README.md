# Welcome!

This is a project created for the junior full-stack developer position application at [Lexart Labs](https://lexartlabs.com/). The goal was to build a chatbot capable of understanding words like "Hello," "Loan," and "Goodbye," and respond to gratitude with "Thanks."

## How the App Works

### Possible Backend Routes:

- `api/register`: Allows users to register by providing a username and password.
- `api/login`: Handles user login functionality.
- `api/chat`: Posts new conversations to the chat history.
- `api/[userId]`: A GET route to retrieve the user's conversations.

### Possible Frontend Routes:

- `/`: The main route containing the chatbot and its logic, located in the `src/app/components/chatbot.tsx` file.
- `/historic`: A route displaying the user's chatbot conversation history.
- `/register`: Allows users to register by providing a username and password.

## Technologies and Tools Used in the App

- Next.js
- MongoDB
- Mongoose
- Bcrypt.js
- Dotenv
- TypeScript
- clsx
- Axios
