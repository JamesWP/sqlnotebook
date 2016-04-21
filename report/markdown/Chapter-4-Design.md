
# Design

  The design of the application will draw from the above requirement and the associated use cases to form a final application. There are many decisions that impact the delivery of the final project they are details in this chapter and the respective different options are detailed and evaluated.

## Structure of the information in the solution

  The application will store the notes and code of the developers, however there are many different ways to store these files. Here is a few of the different ways to store this information with pros and cons for each:

### List of files
  The application could store the notes as simple files in the system in a list. Similar to a flat single folder structure. Each file would have a name and other attributes like last edited. This method is the most simple of the below however it requires the user to name the files with discipline if they want it to remain organized. For example the following is an idea of how this may look.
```
    - Project A - Overview - Project summary
    - Project A - Overview - Change log
    - Project A - Users - User login module
    - Project A - Users - User login module version 2
    - Project B - Overview - Project summary
    - ...
```
  This is not an ideal way to view files for a single section of a system. Typically you are working with a single project at once and within that usually not all parts but a limited subset.
  This problem could also be viewed as a positive because in the times that you do need to access files across multiple projects at once, i.e. in the use case when the developer needs to switch to another project quickly, the developer can already see the entire list of files.

###  Folder structure, i.e. Explorer / Finder
  There are already existing methods for storing files into folders or directories. Most mainstream operating systems use a hearty of folders to contain files and more folders. This acts like a tree, each leaf is a file and each subtree is a folder.

  This approach still offers the users free reign over the organization and naming of each file in the system however it also provides the ability to focus on single parts of the tree at once.

    - Project A/
      - Overview/
        - Project summary
        - Change log
      - Users/
        - User login module
        - User login module version 2
    - Project B/
      - Overview/
        - Project summary

  This organization into folders can take time to do and can be done in many ways. Each project might have its own collection of top level folders and in each project (unless managed correctly) there could exist a different way of creating / naming the folders. This problem of uniformity crops up in many places within organization and in general the more uniform the structure the less the user has to remember for each case and the less brain power needs to be spent understanding it.

  There is another problem with a simple tree folder structure, each file in the folder tree can only be in one place at once. Some files could be ambiguously belong in multiple places at once. This can make finding these files take twice as much time. Each ambiguously located file that needs to be found needs to be searched for in (worst case) all the locations it could be in.

  Both the two above problems are lessened by putting sensible limits on the depth of the folder structure. The reason for this is discussed below.

###  Simplified folder structure

  In a simplified folder structure there is a limited number of levels that can exist. If viewed as a tree it is a tree that contains a limited depth and contains leaf nodes (here notes) at the bottom level of the tree.

  This simplified structure can help make the choice of folders at each level more apparent for the user. They have a more limited choice of where to place folder and files and as such the impact problems of a full folder structure as discussed above are lessened.

  This technique also implicitly limits the user to a set number of levels. This (although simplifying) imposes that some files that might have been better suited to live together inside a folder have to be placed within the parent folder.

### Tagged files

  In a tagged file organizational system, files are not placed in folders but instead have each an associated set of "tags" each of these tags has a name and can be applied to many files.

  For an example you might have the following set of files and their tags:

    - Project summary {Project A, overview}
    - User login module {Project A, Users}
    - Overview {Project A, overview}
    - Project summary {Project B, overview}

  The user can then find the subset of files they are interested in by filtering for the items that have all the tags they specify:

    Filter: file has all {Project A, overview}
    Result:
    - Project summary {Project A, overview}
    - Overview {Project A, overview}

    Filter: file has overview
    Result:
    - Project summary {Project A, overview}
    - Overview {Project A, overview}
    - Project summary {Project B, overview}

  Note that this can be viewed as a more general version of the folder structure discussed in section *insert folder structure section ref here* by adding a single tag to each file with the path of the folder that contains it. However this is not an ideal tagging for files



  Citation:

    @article {ASI:ASI22906,
      author = {Bergman, Ofer and Gradovitch, Noa and Bar-Ilan, Judit and Beyth-Marom, Ruth},
      title = {Folder versus tag preference in personal information management},
      journal = {Journal of the American Society for Information Science and Technology},
      volume = {64},
      number = {10},
      issn = {1532-2890},
      url = {http://dx.doi.org/10.1002/asi.22906},
      doi = {10.1002/asi.22906},
      pages = {1995--2012},
      keywords = {personal information systems},
      year = {2013},
    }



### Choice of file organization

  The simplified folder structure was picked because of the balance between the flexible organization of the tagging system and the simplistic file list.
  The simplified folder structure proved to be simple to implement and use within the system

  *images of the final version*

## Search capability in the system

  The requirements gathering process clearly identified in multiple places the need for the system to provide a quick and simple search function in order for developers to find the files that they need.

  There are multiple ways to provide search functionality within a document management system some of which are suitable for the application and some that are not. The below is a summary of a few of the options and an evaluation of each.

  Ideally the functionality required is that a user can submit a query for some content, the files in the system is searched for the specified items and the results are shown. This part of the searching experience will be the same for all the discussed methods. However the parts that differ in the compared methods are:
    * the format of the users query (plain text or other).
    * the searching procedures
    * the performance
    * the presentation of results

### Simple text search / serial scanning

  The simplest method for searching is taking a simple section of text from the user, the search term, and then searching for the occurrences of the term in each file and for each result displaying the name of the file, and the position within the document.

  Example:

      search: "test"
      results:
      - File A, line 13, chars 34-38
        - ... the users will then report on *test* ing ...
      - File A, line 13, chars 10-13
        - Chapter 2: *Test* ing ...

  This technique is simple and for small amounts of files and content is quick to compute. However due to the fact that the algorithm is loosely linear in the number of files to search through, this would be impractical for large amounts of files.

  *cite wikipedia: https://en.wikipedia.org/wiki/Full_text_search#Indexing*
  When dealing with a small number of documents, it is possible for the full-text-search engine to directly scan the contents of the documents with each query, a strategy called "serial scanning."

### Full text index

  When a simple method for searching through all the files becomes too slow, an alternative is to create a concordance *cite https://en.wikipedia.org/wiki/Concordance_(publishing)* this is a table of words in a publication (here note) and where the words appear within the document. by using this concordance instead of searching the text directly, the application is able to search a smaller amount of data and hence speed up the search process.

  This requires that there is a pre-processing step before a search can be completed. This needs to be recalculated for each time a user changes a document so that all subsequent queries can find the new content.

  This is the tradeoff with the more complex methods for searching.

### Extraction of keywords

  Another method of searching is by analysis of keywords only. Indexing a select few words per note means smaller indexes and faster searches.
  Either a list of keywords is created and left static or machine learning algorithms learn the important words within the page and only those words are indexed.

  This is however only applicable when the user's search terms can be limited as such. For example if the user searches for a table name that is contained within a file in the application, it will only be found if the table name is in the keywords list.
  In the case of a note taking application there is limited use of a search process that only finds some words of the documents stored. However such indexes can help to find preliminary results for a query, or even to provide caches of common queries.

### Edit distance

> JP maybe discuss fuzzy search

### Reasons for selecting simple text search
  The numerous ways to search the text within a collection of documents each provide there own ways to provide the results. While many of the different search methods are concerned with the performance of a search and their accuracy in terms of the results, the most basic search discussed the Simple text search *link above section* as discussed can offer the features needed by most users of the application.

  There are many other features that can be added to the functionality provided by the Simple text search *link* however these can be added as an extension to the program after the initial release.

## Type of user interface
  The different types of user interface that designers can choose from when designing applications can be categorized into a few main categories:

    - Command line
    - GUI / WIMPS

   For visualizing text, popular command line applications for editing text like Vim or Emacs do exist however, the richer environment of a GUI application is predominately preferred with its ability to customize fonts and other such attributes of the layout and style. They also provide a better experience for users with the use of menus etc. These can provide a more simple to use application than an alternate command line program with many shortcuts to memorize.

   There are many different types of GUI application that can be built and an important decision that needs to be made before selecting the layout of the application is what platform to build the application on.

### Native solution for operating system
  The first platform option is developing a desktop first application native in a selected operating system. This would require selecting one of the native windowing API's for the operating system. Some of these API's are cross platform enabled for example see [qt](http://www.qt.io/) for a popular choice. Some more polished and more integrated with the selected operating system for example Apple's own windowing API is [Cocoa](https://en.wikipedia.org/wiki/Cocoa_(API))

  The advantages of using the operating system's manufacturer built API is one of support from the company and choice of open source vs proprietary. As one of the requirements is that the system should be accessible the proprietary method is not an option for a time constrained development like this. In order to complete a cross platform version using operating system specific (non cross platform) API's would mean a rewrite of the GUI code for each operating system that was to be supported.
  The advantages of using the operating system's manufacturer built API is one of support from the company and choice of open source vs proprietary. As one of the requirements is that the system should be accessible the proprietary method is not an option for a time constrained development like this. In order to complete a cross platform version using operating system specific (non cross platform) API's would mean a rewrite of the GUI code for each operating system that was to be supported.

### Mobile solution for Android / IOS
  The production of a mobile application for either the Android or IOS markets would be done with either two versions of the application as discussed with the desktop versions above, or there are tools like [Xamarin](https://www.xamarin.com/platform)

    "Deliver native Android, iOS, and Windows apps, using existing skills,
    teams, and code."
    *cite xamerin*

  This allows for applications to be built for a variety of mobile platforms with a single code base in C#. The ability to "write once run anywhere" is a big selling point for Xamarin and others like it. However it would still restrict users into using mobile only.

### Browser based solution
  With modern advances in browser technology it has become more feasible to create full desktop replacement applications as website-applications. These websites are truly cross platform, they can be viewed on any platform with access to a web browser. Desktop OS or mobile OS alike can all use one of a multitude of recent browsers from many vendors.
    - Chrome  (Windows, Mac OSX, IOS, Android)
    - Safari  (Mac OSX, IOS, Windows)
    - Opera   (Windows, Mac OSX, IOS {opera-mini}, Android {opera-mini})
    - Firefox (Windows, Mac OSX, IOS, Android)

  There are many different libraries on offer to help develop applications with javascript. However it is still possible to create more traditional client-server applications and have just a simple lightweight javascript free front end. These applications tend to be slower and more cumbersome to use because of there need to communicate every action with a server over http.

  An alternative to the more traditional client-server architecture is the now more popular single page javascript application. This merges the lines between the user perceived differences of the desktop and browser experience.

  A single page javascript application is a single web page that functions like a normal application. The application have all the features of a desktop application, they can make use of windows, buttons, and animations etc...

  External data is gathered in background http calls (called Ajax requests) and does not necessitate a full page reload. The absence of these full reloads and the flash of white as the page loads give the user a much better experience.

  *cite*

  Single Page Web Applications
  By Michael S. Mikowski and Josh C. Powell

### Reason for selecting browser

  For the application being built the choice of platform is between a cross platform library for a native desktop application and a web based solution. For reasons of experience with technology and programming languages developing for the browser was selected as the platform.

  The browser application will be accessible from any platform and device and provides an easy way to update the application in the future.

  There are many different libraries that can help when building a javascript application in the browser. The libraries have some things in common and other unique points that set them apart from each other. Most of the libraries cover the standard principles of MVC "Model View Controller" or some similar variant thereof. See [here](https://en.wikipedia.org/wiki/List_of_JavaScript_libraries#Web-application_related_.28MVC.2C_MVVM.29) for a community populated list on wikipedia.

### Javascript MVC library - React.js
  React.js is a fairly new open source library from facebook.

    A JAVASCRIPT LIBRARY FOR BUILDING USER INTERFACES

    *cite React.js website*
    https://facebook.github.io/react/

  React.js brings the notions of pure functions to the problem of creating and updating views. In React.js the headache of updating the view when something happens in the application is handled automatically. This is accomplished by having the view hierarchy be a result of applying a pure function of the application state. This has the important consequence of removing the need for the developer to tell the application how an action should update the UI. The developer only needs to update the state and React.js will work out what needs to change by calculating the difference in the old and new view hierarchies.

### Future React Native
  React.js has a new related project created by the same team called React Native. React Native takes the principles of React.js and with slight tweaks to the code the same code can run as a native application on both IOS and Android.

  This would provide a way to get the application onto mobile devices in a native environment the users wouldn't even know that the application was even running in the browser.

## Choice of interface - Notebook metaphor
  The interface of any application need to be simple and easy to understand. the more complicated the interface the more brainpower needs to be dedicated to using it. The most successful user interfaces provide simple intuitive ways for uses to do the actions they require.

    Metaphors are the fundamental concepts, terms, and images
    by which information is easily recognized, understood, and
    remembered.
    - Metaphor Design for User Interfaces, Marcus, Aaron
  *cite*
    @inproceedings{Marcus:1998:MDU:286498.286577,
      author = {Marcus, Aaron},
      title = {Metaphor Design for User Interfaces},
      booktitle = {CHI 98 Cconference Summary on Human Factors in Computing Systems},
      series = {CHI '98},
      year = {1998},
      isbn = {1-58113-028-7},
      location = {Los Angeles, California, USA},
      pages = {129--130},
      numpages = {2},
      url = {http://doi.acm.org/10.1145/286498.286577},
      doi = {10.1145/286498.286577},
      acmid = {286577},
      publisher = {ACM},
      address = {New York, NY, USA},
      keywords = {Web, consumers, culture, diversity, graphic design, icons, information design, metaphors, multi-media, productivity tools, rhetoric, semantics, semi-otics, symbols, user interfaces, visible language},
    }

  The metaphor chosen for the application is the notebook. A physical notebook has pages, tabs etc... These are easily understood by anyone who knows what a notebook is. We can extend the notion of a notebook with concepts from the wider world of books with indexes and contents pages.

  The application will take from this notion of the "notebook metaphor" and from there the application interface will be designed.

  *notebook image mapped to uml diagram of application*

## Detachment of the SQL interface through custom web API
  Selecting the browser poses some specific problems for a SQL IDE. A SQL IDE needs to have access to the SQL server in order to execute queries and retrieve results. There is no support in any of the mainstream browsers for direct integration with a SQL server database, although they do have limited support *cite web sql* for in browser databases.

  This therefore requires the production of some middleware to connect the database to the application. The commonly used method for transferring data in the browser is via a JSON web API. There are many methods for connecting to a SQL server database however, the Microsoft documentation *cite* https://msdn.microsoft.com/en-us/library/ms162132.aspx contains C#, VB, C++ documentation and libraries for querying the database. I have experience using the C# conneciton methods before and with this in mind the middleware was chosen to be a C# website providing a mapping from JSON to the database.

  *diagram of connection*
