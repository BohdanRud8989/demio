# This is a SPA React application that allows users to register with GDPR.

Features:

- User registration form with data validation

Technologies Used:

- React
- Vite: Development server and build tool for modern web applications
- TypeScript
- Ant Design: React UI component library

## Initial setup

Go to your project root folder and launch terminal

```
nvm use
npm install
```

## Configuration of the app:

There is `.env` file, you can configure it.

- to use mocked API change this param to:

```
REACT_APP_MOCKED_API=true
```

- to emulate server error response use this combination:
```
VITE_REACT_APP_MOCKED_API=true
VITE_REACT_APP_EMULATE_SUCCESS_RESPONSE=false
```
## Run in Development mode:

- Install dependencies: `npm install`
- build and run: `npm run dev`

## Run in Production mode:

- execute `npm run preview`
