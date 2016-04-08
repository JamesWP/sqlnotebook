
    Abstract

  Developers deal with many project and these are often vary intricate and can vary greatly in design and function. The details of these projects have to be understood by the developers in order to complete their job.
  This project's aim is to create a tool that will help SQL developers to organize the information for their projects in a way that is integrated tightly with the development.

  This document is a report that aims to identify the existing solutions and their problems and then offer solutions in a new project. If successful the project should result in a useful, easy to use, intuitive way to organize the code and information for SQL application developers.

# Introduction

  Developers use documentation to aid there understanding of code, however the documentation is often constructed and viewed on paper or in a web browser [(cite javadoc here)](http://www.oracle.com/technetwork/articles/java/index-jsp-135444.html) While the use of documentation tools provides a good overview of the code, it is not the be all and end all of the notes surrounding the code. Developers can't rely on the documentation alone, they must also have an understanding of the other components of the system and their interaction.

  This is also true of database applications. The database applications are often the store for the information in the system and provide a center for the business logic for the application. They often are at the center of large applications and as a result they can be complicated.

  It is therefore important that the developers that develop and manage these applications know exactly the effects of the code and what there changes mean in terms of the system as a whole.

## Project goal
  This project's goal is to create an application that will help database developers to document and code in a more consistent and interactive manner.

  The project will cover methods used for identifying problems with existing applications and workflows and then formalize these problems and aim to provide an evaluation of the different approaches to solving them along with reasons for selecting the final approach.

## The users
  In order to understand the application we first need to understand the users of the application. These users are developers.
  The developer's days could consist of many different types of tasks, from developing new applications, new features, and maintaining old applications and services. These are just a few of the most common tasks required.

  This poses problems when creating software for these developers to use; while they require places to document code and other items, they don't do so in the same way every time or indeed do so with a regimented structure.
  The tools they use must support their individual ways of working.
  However they do still need ways of helping them to manage the information.

  Creating an application for this purpose will require considering the many problems that existing applications in the market-place have attempted to tackle and how successful their attempt was.

  One example of the type of problems an organization application would look to solve is this: A developer might be working on more than one application and also be responsible for supporting older applications.
  When the developer receives notice that there is a problem with another project the current work needs to be parked in a suitable place and the developer goes in search of details about the system newly in question. Making this process of switching projects and finding the required information quickly is one that this project attempts to tackle.

  The problem above that has been identified is just one problem and there are many more that would need to be identified. This report details how these have been found and their solutions designed and built.

## Overview of the report

  This report explains how the final solution was developed from an idea into the final product. It does so with some guidance from standard software development techniques. First some problems are identified then a formal set of requirements is derived. These requirements guide the design of the application and after the application is built the requirements are again used to verify that the end product does indeed solve the original problems identified.

  The problems that the application hopes to address will be a collection of things that occur in every day life as a developer and other problems identified with existing tools available. This is done so that the developers can see the main problems with the existing tools can indeed be fixed and alternatives can be used.

# Background

  What is the need for documentation and notes?

  There are many different ways to document code they range from completely offline to completely digital and many different methods for integrating code. The most simple offline approaches consist of simple notepad pages with notes and diagrams. This offers a totally freeform approach to note taking as with pen and paper there is no limit to what you can make notes about. Tables diagrams and hand written pseudo code can be good for some circumstances but for others we have digital documents that need to form part of the notes along with written comments, This leads to problems of printing and loosing loose pages.

  There are also many solutions for electronic or digital notes, those taken on a computer. *cite Evernote* [Evernote](https://evernote.com) is a popular choice for notes and offers a wide range of platforms for note creation however it is not designed with code documentation in mind specifically. While it is a very good solution for taking notes as is evident in the number of users *cite Evernote success*. the lack of specific features aimed at developers eg version control etc makes it difficult to use in this way.

> JP how to cite this?

  The above solutions are not tailored to suit the specific task of making notes for sql developers. The existing tools used by developers can be used in some capacity to both develop new code and help document it for future readers. Commenting code is often the closest notes get to the code they are detailing. Well commented code can help developers get to know and remember the code they were writing in the past or to pass on details from programmer to programmer. Comments on code can often not last the test of time *cite example of out of date comments* as they don't force you to update your note when the code they refer to changes. For example over time the commented function might offer more options and change from its original purpose. This is the reason comments are not always taken to be the truth and can lead to confusion and bugs in the worst case. *find example of out of date comment*

## Analysis of existing solutions

  The different applications on offer vary from exact programming language and operating system. They have useful features and also each have there own downsides.

  Analyst different solutions for SQL IDE's and also note taking applications. drawing positives and negatives from each.

### Microsoft SQL Server Management Studio

  *citation needed*

  *screenshots needed*

  An official offering for the Microsoft SQL Server Database server.
  Has the ability to have multiple connections to servers and many open files in an IDE powered with the Microsoft Visual Studio Shell.
  Offers little to no management of files other than the ability to open files from the filesystem. As with many database servers the functions and procedures are stored within the databases and so any files on the local system might not be in sync with the ones on the server.
  The application is a native windows application and offers no alternatives for other operating systems. The connections offered are the same as for the database itself via TCP, Shared memory, named pipes etc. This poses many problems for working when not on the same network and forces the users to be using Microsofts own operating system.


### MySQL Workbench

  *citation needed*

  *screenshots needed*

  The MySQL Workbench offers a multi-platform solution for accessing a MySql database. Also on offer is a model management tool for mapping out a logical model of the database and relations this provides a way to easily view a high level overview and make useful annotations that go above and beyond simple comments written separately.

  The Workbench also is the first example of a tool to offer multi-platform capability. Providing more ways for the users of an application helps integrate a tool into the workflow of the developer, having to switch between operating systems because your database management software is not offered on the same work machine as your front end development environment

### phpMyAdmin

  *citation needed*

  *screenshots needed*

  The alternative to the official MySqlWorkbench is an open source web based solution for easy access to the database from anywhere you have an internet connection. The tool is a PHP application and such needs a hosting environment in order to be used. The application, once running has a secure login system with the ability to view and edit data in the system.

  However the tool offers little in the way of editing for scripts and database code. Bulk manipulation of data is not offered in the application but instead through the export of multiple different file types.

  Other unique features are automatic linking of data through the interpretation of foreign keys within the existing database.

  Unlike the MySql Workbench there is no designer for models and all changes are done to the database "live" there is no design and publish as offered in other solutions.


### IPython / Jupyter

  *citation needed*

  *screenshots needed*

  This application differs from the others above as it is not a SQL IDE and such it doesn't show any specific features for SQL code in particular however the integration between the code and the text in the editor is done in a very easy to use way.

  The IPython notebook is split into sections or cells. each cell has a type, either a code cell or title or markdown cell. Markdown is a simple written markup language for textual documents. Markdown provides simple ways to create headings and lists paragraphs while balancing this with simple easy to read minimal formatting.

    # Heading level 1
    Paragraph content here

    ### Heading level 3

    Below is a list
    * lists are created
    * like this
    * or numerically

    ### new list
    1 like
    2 this

  The mix of executable code within the text notes provides a unique experience of the ability to see and tweak code and have a well formatted explanation of the code.

  Interactive code and results as done in an IPython notebook provide a quick way to see the results of the code. This allows and promotes the testing and exploration of the code and can help the developer to understand exactly what effects each part of the code has on the end result.

  The notebooks reside on files on the local disk of the system, much like any other file. As such the organization of the files is left up to you the creator to file them in folders etc.

  The flexibility comes at a cost however, because while you can file the notebooks anywhere you want, where to file them is done by you in your file manager.

## Problems

### Problem #1 Keeping notes of important things
  As developers work on their projects and as these projects evolve there become an increasing number of things that need to be understood in order to develop / maintain the project.
  The problem is to provide an easy flexible way to make notes on different topics and allow access to the notes in an organized way.

### Problem #2 Notes are only useful when they are read
  The notes / code stored need to be accessible for developers or this defeats the purpose of storing the information in the first place.

  The notes as discussed don't have an implicit structure and so a helpful search is difficult to create. Most solutions just offer full text search of the data.

  The notes might have had several revisions over time and might need the information accessible from the past.

### Problem #3 Notes that include code are often not updated
  The notes that store code are often not in an executable format. so when the dependancies of the stored code are changed the code becomes outdated and of limited use to future developers.

  This is a problem because the code is only useful in a note when it is up to date and bug free, often at the time of writing it is correct but as the system changes the code can become out of date.

  The problem is how to ensure or help the user to keep this code up to date within the note.

### Problem #4 Database systems: data always changing
  The data in database systems is always changing, when the system was written the data might have looked significantly different to what it is now. This
  makes things hard to compare as time goes on.

  The problem is how to ensure that even if the underlying data is changed, the note and code within is still useful for other developers in the future.

### Problem #5 System access
  The developers need easy access to the information and the database from anywhere.
  Current solutions for IDE's are often system specific and don't offer good cross platform compatibility.

  The problem is providing access to the data and system from whatever system, and wherever the developer is in a secure way.

### Problem #6 Cross referencing
  The document writers are writing multiple notes for each part of the project and as such there will be links within the document by way of referring to something written elsewhere. The ability to refer to other sections in other documents is key in order to provide the reader all the information in order to understand the page.

## Summary of identified problems
  The problems identified above fall into different categories:

  * organization of notes
  * sql specific problems
  * finding relevant notes

  Each of the above categories of problems could be tackled in many different ways. The next stage in the development of a complete solution is to identify some concrete requirements and use cases for the application and discuss the different approaches available to us in order to solve them. Each different approach will have its own downsides and these need to be properly analyses and evaluated if a useful solution is to be created.
