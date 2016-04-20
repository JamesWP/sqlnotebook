# Implementation
  This chapter in this report will detail how the application was implemented given the choices made in the Design chapter and the requirements. The application was developed in the agile methodologies. Quick and small iterations where a small part of the application will be planned, implemented and tested. By ensuring the parts are kept to a consistent small size, the development should be kept going at a methodical pace.

  As always with development projects involving code version control is an important part of the development process. For this project git has been used to keep track of the changes to the code. This provides many benefits as can be seen in [this book](https://books.google.co.uk/books?hl=en&lr=&id=aM7-Oxo3qdQC&oi=fnd&pg=PR3&dq=version+control+software&ots=38zcOCRfo9&sig=RrjwXCtjK_7I4AtQZiOWj5wSo5Q#v=onepage&q&f=false) published on git.

  Keeping the iterations small and using technologies like git will enable me to be agile when developing. Being agile means that I can react to complications with development and delays that occur due to new languages and technologies.

  With this in mind the application was broken down into smaller parts that fit together to form the application. The front end of the system is the part the users will directly be interacting with. This would form the bulk of the development however, the backend of the application is the middleware component that will enable the javascript front end to talk to the database.

## Middleware  
  The middleware was planned to be created first. It was a simple task and was well defined. The requirements for this part of the application were as follows:

  - Allow the caller to create a connection to a database.
    - This will require the caller to pass connection parameters and in return they will receive some connection token to represent the connection.
  - Allow the caller to execute queries against a connected db.
    - Given the connection token received in the above step and a query, the results of the query need to be sent back to the caller.
  - Allow the caller to receive context data regarding a query.
    - Similar to executing a query, the application might need to receive details about the objects mentioned in the query. Each object mentioned in the query, table, view, function etc... would be explained in the response.

### Design the API

  The communication to the database is provided by use of the SqlConnection and SqlCommand classes provided by C#. To execute a query you must first create a SqlConnection class with the connection string. A connection string is a textual detail of the parameters required to connect to the database. This can contain many different types of connection however the more usual address and username and password will be used to connect to the database in the api.

```
    public class ContextRequest
    {
        public string Database { get; set; }
        public string Server   { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
    }
```

  The ContextRequest class provides the definition for the parameters for the CreateExecutionContext when the /api/CreateExecutionContext method received a http post the parameters are extracted from the body of the post and a sql connection is created, opened and a token is returned to the user.

  From javascript there are many different ways in which you can do a HTTP post. The library that is used in the application is called superagent *cite superagent* this provides a set of functions that manage HTTP posts. Here is an example of how a HTTP post can be made to *url* with parameters *params*. When the post has completed the callback function is called with the response.

```
  request
    .post(url)
    .send(params)
    .type('application/json')
    .accept('application/json')
    .end(newCallback(callback));
```

  Here the response is the connection token. This token will be needed to execute all further requests to this connection.

## Javascript application

  The javascript application provides the user interface for the application. It is written in javascript and runs in the browser in a single web page. Requests to the SQL middleware API are made over HTTP with the superagent package.

  Applications built for browsers can have very large codebases, There are many different problems that arrive from having a large code base and there are tools available to help developers manage the applications. With standard javascript there is currently no module system (although this may change soon *cite ES6 modules*) and so if we want to split our application into multiple smaller components we must ensure that they are all correctly loaded in the browser before being required. This can become difficult with many interdependent modules.

  There are ways to automate this process and automatically find all dependancies and bundle them all into one file that the browser can load. [Browserify](http://browserify.org/) is one such program.

    Browserify lets you require('modules') in the browser by bundling up all of your dependencies.

  This enables developers to think in smaller files and have the dependancies and load order be solved by a tool.

  The Browserify process can also be extended to optimize our javascript code and also provide us with analysis to point out potential bugs and also best practices. These tools help to turn the javascript development process into something similar to ahead of time compiled code like C# and Java and C++. This is needed for larger applications to be built in the browser.

### React.js development

  With React.js the UI is defined by React components. Each component can be thought of as a new html element. They can have attributes defined:
```
  <NewElement attributeNo1="Ted" attributeNo2="123.4"/>
```
  And each component has a render function, this render function takes each components internal state and produces more html for the page.

```
  var HelloMessage = React.createClass({
  render: function() {
    return <div>Hello {this.props.name}</div>;
  }
  });

  ReactDOM.render(<HelloMessage name="John" />, mountNode);
```
  In the above example the HelloMessage component is created. In this simple component when it is used it outputs just a simple html Div element.

  The use of React.Js in the project forces structure in the use of components. The layout of the application is as follows:
    - controllers/
    - helpers/
    - stores/
    - ui/
    - app.js

  The application is created in the app.js and this then uses the components in the UI folder to create the interface. The app.js file completely separates the UI into the binder (the left hand side of the interface) and the workspace (where pages are opened).

### Storage of data

  The application will store the data for the open notebook in the browser until it is closed and saved to disk. The data in the browser will form the state of the react components and any changes to this state will cause React.js to re-draw the ui.

  The pages are stored in the PageStore module. The tabs are stored in the TabStore module and the workspace in the WorkspaceStore module. Each of the stores contains the current state of the objects and components that need to access data from them add listeners when created and receive events when things change. This way we can separate the code that stores the data and modifies it and the code that creates the ui. This separation of concerns simplifies the details the developers needs to be aware of when writing code.

### Data store interface
  The interface that the application uses to change the data in the store. It is important that this interface is as simple to use as possible in order to ensure that all the complicated logic to change the data is completely within the store.

  First the actions were planned out that the user might trigger.
    - Create new page
    - Save page
    - Delete page
    - Create new tab
    - Change search text
    - Connect / Execute query

  These actions form events on the data stores and update the internal state. The changes in the state then cascade down to the components that depend on them and update the UI.

### Components
  The application was split into small functional parts and a high level design for the application was drawn out.

  *diagram*

  The left side of the application was dedicated to the navigation interface with tabs and pages displayed with buttons to create new and remove old.

  The workspace is a container for the open pages in the application each page is a different component depending on what type the page is. For example a search page renders a Search component and an index page renders an Index component. This allows for easy addition of new window types to the system as each is implemented in a separate file.

  The initial design was implemented with the standard html entities li for list and button for actions. Later on in the design process these were replaced with components form a third party library of elements that provided sections of [material design](https://design.google.com/spec/) this proved the use of Browserify and React.js because the third party library [material ui](http://www.material-ui.com/#/) could be just referenced and the components used to replace the default html list elements and buttons etc and the application ui was improved.

# Evaluation and Future developments

## Testing the project
  Testing is an important part of developing an application. The application in order to achieve its goals must function correctly and testing and verification ensures that each part of the system operates and does so correctly.

  The system was designed to be easily tested. The data store's interface which provides the methods that the application uses was tested at the beginning of each run of the application. The application would initialize and then perform the testing procedure. The testing procedure contained a simulation of a user performing some tasks, creating pages and adding content etc..

  After the system had finished running the user's commands the resulting UI could be checked against the expected output and in this way regression could be detected early. The javascript console also provides an excellent way to monitor the application for errors at runtime and debug to find the cause of the error.

## Evaluation

  For the application to be successful the requirements and use cases need to be evaluated against the application. The application will be successful if each of the requirements are met and the use cases can be shown to be completed by the users.

  For my evaluation I showed the application to the users and asked them to complete some simple tasks. The users had not seen the application before and also had not seen any of the data stored before. This test would show me how easy the application was to learn and also provide feedback on how real users interacted with the UI to find the information stored in the system.

  The testers were only told a bare minimum of what the application was supposed to do. The application should allow for the organization of data and code for a sql application.

  Overall the testers were all able to find the various functionality of the application by navigating the familiar UI features like the burger menu, "x" for closing windows etc... finding the save options was similarly found by all users.

  The tools for executing and saving the results from queries were also quickly learned by the users. This feature requires the most "clicks" in the application and so could be viewed as the most complicated feature however, the users rarely got lost and the actions flowed naturally to the users.

  The testers also made some comments on what features they would like to see in the future for the application. These future features will be discussed below.

## Future developments
  The application as it is can be used for daily work by sql developers and meets the requirements set out initially. However there are some features that did not fit into the schedule of remaining time. These features were not essential to completing a functional working application however, they would make the application more useful.

### Multiple database engines
  Currently the application only supports Microsoft SQL Server however with the addition of more middleware and a configurable settings window the application could be made to talk to any database server.

  This would enable the users to work on multiple systems across multiple database providers. It would also open the application to the users that solely use one of those databases.

### Query explanation
  The middleware supports a method to explain the objects referenced in a query. This functionality could be used to provide code completions and also more data when the objects are hovered on.

  The metadata could also be saved in the file when the page is saved. This would then be available when the page was loaded. This could provide extra context when looking into old queries.

### Different result formats
  The results from the queries are shown in a table. The results of queries are just arrays of n-tuples but they could represent more complex items like pi charts or folder hierarchies.

  There could be some automatic classification of results to decide the best way to display the results. Or failing that fall back onto manual selection for the results presentation.

### Resizable windows

  The workspace shows the open pages and there controls. Currently the application sizes these to have all the same width however, this might not be optimal for some files. The developer has no control over how they are presented. It would be a valuable feature of the system to be able to reorder and resize the windows for each open page. This would make the system more customizable for each user.

# Conclusion

  The application meets all the mandatory goals set out in the use cases. Out of the other requirements ?/? were met by the application with the remaining
  ? not completed due to lack of remaining development time. The delays in the development of the features of the application is partially due to lack of experience with the workflow and the associated technologies.

  The build process especially was time consuming to pick up. This is partially due to the many options available. The lack of up to date information is only apparent after a new build step is required. These delays and set backs are those that only affect the momentum of the development at the beginning of the project and after the changes have been implemented development speeds up.

  The implementation of the application, after a change of method for storing the application data, was extensible and offers a good platform for new features to be developed on. The code is of good quality with good code separation. The separate modules have an average length of ? lines this is a sign of good quality code *cite code complexity*.

  The users who have seen the application have also offered thoughts on other uses of the application, most common is the view that the application could be used as an education tool for new programmers to teach the code and the concepts behind database design.

  The designing of the final solution was mostly influenced by personal issues identified from personal experience working on database projects. A more structured exploration into issues and solutions with other developers could have come up with some more diverse ideas. These same users could have been consulted at various stages of the development and provided feedback.

  Overall the project was a success and the final application has exceeded my expectations of what could be accomplished in a third year project.
