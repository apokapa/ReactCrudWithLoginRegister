# MyFirstReactApp
MyFirstReactApp

## With React / Redux Technologies


## Azure Deployment 
(if it wasnt used recently may take a while for first load since it is deployed on a free azure app plan)

http://reactcrud.azurewebsites.net

#### Default user credentials to login
{
username : pink,
password : floyd
}

## What you will find here

This is a React SPA crud with basic login/logout flow. Applications uses Redux  to implement unidirectional data flow pattern. The application uses a fake js api (mockApi.js) for its operations. Manipulated Data and login status are not persistant after full page refresh. Application's entry point is index.js Where the initial store configuration,data, and routing setup takes place. Check for protected routes is done on index.js via checkLoginStatus that checks loggedIn status before leting access to those routes and redirects user to /login if needed. App.js is the parent component and consists of header component, children component (via prop from router) and lastly footer component.

On dist folder you can find a prebuilt version of the app ready for deployment.


## Get Started
1. **Install [Node 6](https://nodejs.org)
2. **Clone repository
3. **Open console on repository folder
4. **Install Node Packages. - `npm install`
5. **Run the app on dev enviroment - `npm start`
6. **Or Build the app. for deploy - `npm run build`
7. **Or use the build already in the /dist folder.

### App Dependencies
| **Dependency** | **Use** |
|----------|-------|
|babel-polyfill | Polyfill for Babel features that cannot be transpiled |
|bootstrap|CSS Framework|
|jquery|Only used to support toastr|
|react|React library |
|react-dom|React library for DOM rendering |
|react-redux|Redux library for connecting React components to Redux |
|react-router|React library for routing |
|react-router-redux|Keep React Router in sync with Redux application state|
|redux|Library for unidirectional data flows |
|redux-thunk|Async redux library|
|toastr|Display messages to the user|

### Deploying on Azure ?

Dont forget to add Web.config file for deep linking to work properly. My Deployment was done by geting dist folder files into an empty visual studio website project and then adding the web config configuration below. Project was publish via web deploy.

```
<?xml version=”1.0"?>
<configuration>
 <system.webServer>
 <rewrite>
 <rules>
 <rule name=”React Routes” stopProcessing=”true”>
 <match url=”.*” />
 <conditions logicalGrouping=”MatchAll”>
 <add input=”{REQUEST_FILENAME}” matchType=”IsFile” negate=”true” />
 <add input=”{REQUEST_FILENAME}” matchType=”IsDirectory” negate=”true” />
 <add input=”{REQUEST_URI}” pattern=”^/(api)” negate=”true” />
 </conditions>
 <action type=”Rewrite” url=”/” />
 </rule>
 </rules>
 </rewrite>
 </system.webServer>
</configuration>
```

### Trouble with Npm/Node ?

The current dev enivroment is from boilerplate react/redux dev starter kit and is only tested on pc with Windows10 and Node 6. Make sure to run console with administrator rights and try to delete node_modules and rerun npm install if something seems to fail. Lastly dont forget to close any open console before starting a build.




