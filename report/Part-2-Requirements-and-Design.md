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

##  Folder structure, i.e. Explorer / Finder
  There are already existing methods for storing files into folders or directories. Most mainstream operating systems use a hearty of folders to contain files and more folders. This acts like a tree, each leaf is a file and each subtree is a folder.

  This approach still offers the users free reign over the organization and naming of each file in the system however it also provides the ability to focus on single parts of the tree at once.

  *images of folder trees*

  This organization into folders can take time to do and can be done in many ways. Each project might have its own collection of top level folders and in each project (unless managed correctly) there could exist a different way of creating / naming the folders. This problem of uniformity crops up in many places within organization and in general the more uniform the structure the less the user has to remember for each case and the less brain power needs to be spent understanding it.

  There is another problem with a simple tree folder structure, each file in the folder tree can only be in one place at once. Some files could be ambiguously belong in multiple places at once. This can make finding these files take twice as much time. Each ambiguously located file that needs to be found needs to be searched for in (worst case) all the locations it could be in.

  Both the two above problems are lessened by putting sensible limits on the depth of the folder structure. The below approach discusses such a solution.

##  Simplified folder structure

  - Simplified folder structure, limited number of levels
  - Graph of files

  Pros and cons for each approach

  Reason for selecting the Simplified folder structure and how this became the notebook

Search capability in the system:
  - Simple text search
  - Full text index
  - Extraction of terms

  Pros and cons of above options

  Reasons for selecting simple text search, and how the other options might come into play later.

Type of user interface
  - Native solution for operating system
  - Mobile solution for Android / OSX
  - Browser based solution
  - Command line solution

  Pros and cons of the above options

  Reason for selecting


## Choice of medium
  arguments on the different choices for the medium of the application. native application for OSX / Windows / Web application

  for each there will be a positive / negatives

  Ending with a reason for selecting Web

## System diagram and data flow diagrams
  the diagrams will show the layout of the different components of the system and their interface. Sequence diagrams might be introduced for clarity here.

## Choice of the notebook metaphor

  explanation of the notebook metaphor and how it relates to user experience.

## Detachment of the SQL interface through custom web API

  any alternative will be listed here and why i chose to implement my own
