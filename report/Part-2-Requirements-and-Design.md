# Requirements

  The existing solutions have provided a basis for identifying the potential problems the system must overcome. Along with other sources and other base requirements a set of more formal requirements are listed below.

### Requirement 1
  The application must store notes about the application in various separate "files" within the system

  brief reason for why this is a requirement
### Requirement 2
  The "files" stored within the system must be able to store code and also notes in a format more easily read by humans.
### Requirement 3
  The application should be easily accessible from multiple operating systems not necessarily Microsoft Windows.
### Requirement 4
  The application should have the ability to view the results of queries executed on the system in table form.

  (Optional)
  The ability to detect the type of result and view it in a more suitable form. The more suitable form could be anything from a graph to folder structure to a specific viewer for xml documents.

### Requirement 5
  The application should have a mechanism for organizing related files in a hierarchy. Files that are about a part of the system should be stored in the same place in the system.
### Requirement 6
  The application should save the previous versions of the files stored within. These versions should allow editing and saving over newer versions if needed.
### Requirement 7
  The application should allow for multiple files to be open at once and viewed at the same time. This can be done in a free sized window mode or windows listed vertically or horizontally.
### Requirement 8
  The application should allow for searching for strings in files.

  (Optional)
  The ability to view in each of the search results, where the matched text is. And the ability to open the file from the search results.
### Requirement 9
  The application should allow for the easy comparison of the results of the queries. Historic results of the queries should be shown as a diff or side by side with newly executed

## Use cases of the system

  The use cases of the system will detail how the system is to be used by its users. The primary users of the system as discussed is the developers of the projects themselves. This restriction of the users of the system and their  interaction with it makes the system more simple to design as there are less interaction to model in the system.

### Use case 1
  Developer wants to document information about a development.

### Use case 2
  Developer needs to view all documents regarding a project stored in the system.

### Use case 3
  Developer needs to find reference to a particular item within the system but is unfamiliar with the specific location or other detail

### Use case 4
  Developer has to find specific details of a system previously worked on in order to maintain it.

### Use case 5
  Developer wants to view and compare previous versions of some code within the database

### Use case 6
  Developer want to view the history of the notebook. There is a particular entity of the system e.g. table that they want to view the history. i.e. how the entity has evolved in the past.

### Use case 7
  The developer wants to find the places a particular entity is used within the system to better understand how the changes planned could effect the system as a whole. AKA (impact analysis)[https://en.wikipedia.org/wiki/Change_impact_analysis].
  * cite impact analysis*
## Development priority of requirements
  Discussion of importance of requirements identified above, put into order and possibly identify partial fulfillment ideas

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

  Another method of searching is by only indexing a select few words per note. This limited idea of words is then searched instead of a full index.
  Either a list of keywords is created and left static or machine learning algorithms learn the important words within the page and only those words are indexed.

  This is however only applicable when the users search terms can be limited as such. In the case of a note taking application there is limited use of a search process that only finds some words of the documents stored.

### Pros and cons of above options

### Reasons for selecting simple text search
  and how the other options might come into play later.

## Type of user interface
### Native solution for operating system
### Mobile solution for Android / OSX
### Browser based solution
### Command line solution
### Pros and cons of the above options
### Reason for selecting

## Choice of platform
  arguments on the different choices for the medium of the application. native application for OSX / Windows / Web application

  for each there will be a positive / negatives

  Ending with a reason for selecting Web

## System diagram and data flow diagrams
  the diagrams will show the layout of the different components of the system and their interface. Sequence diagrams might be introduced for clarity here.

## Choice of the notebook metaphor

  explanation of the notebook metaphor and how it relates to user experience.

## Detachment of the SQL interface through custom web API

  any alternative will be listed here and why i chose to implement my own
