# Abstract
  A new way to organize the code and documentation for a SQL database application.
  Having both the functionality of a digital note taking application, and the
  ability to function as an IDE for sql developers makes "SqlNotebook" a new way
  to help overcome the everyday problems for developers.

  The application aims to be an aggregate of all the information developers need and also offers ways of keeping this information up to date. Using the metaphor of a notebook, SqlNotebook does not only store the documentation and specification of a function but also the definition, previous results and versions. Also provided are ways to view indexes of files and search for items of interest.

# Introduction

  The application is intended to be used by database application developers. These developers are the primary users of the application and their days consist of many different types of tasks from developing new applications, new features, and maintaining old applications and services. These are just a few of the most common, however in general they could be asked to complete anything database related. This poses problems when creating software for these developers to use; while they require places to document code and other items they don't do so in the same way every time or indeed do so with a regimented structure so the tools they use must support there individual ways of working.
  However they do still need ways of helping them to manage the information.

  There are other problems to consider when trying to create such an application. For example, a developer might be working on several projects at the same time and can often need to switch between them at a moments notice. This requires a context switch from the developer to finish the current task or take it to a place when they can switch to the new task at hand. Making this process as simple as possible is a winning feature for an organizational system such as SqlNotebook.

  The above is just an introduction to the users and a little bit about the types of problems and use cases for the project. Throughout the rest of this report there will be some more details of the specific problems that the application will solve and the different approaches available to solve them.

## Approach  

  The problems that the application hopes to address will be a collection of things that occur in every day life as a developer and other problems identified with existing tools available. These problems that are identified will then be turned into concrete requirements for the project and then this will form the basis for the solution.

# Background

> AAAF I think you should start with the sequence no-notes, paper-notebook,electronic-notebook, comments-on-code and then say that an IDE embedded in a notebook is a candidate solution to the issues raised.

## Analysis of existing solutions

  Analyst different solutions for SQL IDE's and also note taking applications. drawing positives and negatives from each.

## Problems

> AAAF Among these, there is also cross-referencing and in particular cross-referencing that includes code

## Problem #1 Keeping notes of important things
  Problem is that each thing a developer works on has its own set of important details that need to be remembered when working on the solution

  There is no set list of things that we can enumerate for all projects. No unique solution

  Free form notes need to be used for notes.

## Problem #2 Notes are only useful when they are read
  The notes / code stored needs to be accessible for developers or this defeats the purpose of storing the information in the first place.

  The notes as discussed don't have a structure and so a helpful search is difficult to create. Most solutions just offer full text search of the data.

  The notes might have had several revisions over time and might need the information accessible from the past.

## Problem #3 Notes that include code are often not updated
  The notes that store code are often not in an executable format. so when the dependancies of the stored code are changed the code becomes outdated and of limited use to future developers.

  (Example)

## Problem #4 Database systems: data always changing
  The data in database systems is always changing, when the system was written the data might have looked significantly different to what it is now. This
  makes things hard to compare as time goes on.

## Problem #5 System access
  The developers need easy access to the information and the database from anywhere.
  Current solutions for IDE's are often system specific and don't offer good cross platform compatibility

## Summary of identified problems
  The common issue that makes this problem hard is that it is an unsupported (constantly changing) workflow within the tools they currently use. **identify problems**

# Requirements
  Formalize requirements based on the problems in background

  list requirements in formal form here

## Requirement 1
## Requirement 2
## Requirement 3

    explain requirement for solution, explain
    why this is important and how important
    it is to the problem

## Use cases of the system

> AAAF I think you should also have a use case where the developer needs to be aware of why things are as they are now, i.e., which events (presumably documented as notes and indexed) have led to the system being as it currently is. Also, a use case where the notes and code allow you to do impact analysis, i.e., if I change this, do I create havoc in the system or is this change punctual, local and self-contained?

### Use case #1
  Developer wants to document information about a development.

### Use case #2
  Developer needs to view all documents regarding a project stored in the system.

### Use case #3
  Developer needs to find reference to a particular item within the system but is unfamiliar with the specific location or other detail

### Use case #4
  Developer has to find specific details of a system previously worked on in order to maintain it.

### Use case #5
  Developer wants to view and compare previous versions of some code within the database

## Development priority of requirements
  Discussion of importance of requirements identified above, put into order and possibly identify partial fulfillment ideas

# Design

## Structure of the information in the solution
Ideas on how to organize the data stored in the system:
  - List of files
  - Folder structure, i.e. Explorer / Finder
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

# Implementation
  weigh up alternatives and evaluate different how to implement notebook
  ReactJS framework,

  mapping of requirements and high level design / logical design to code constructs

## Javascript Framework selection
  here will be an overview of the different frameworks and the pro's and cons of each and what i eventually chose

## Testing the project
  here i will be explaning my method for testing the resulting application and how i validated my requirements were filled out

# Evaluation and Future developments

## Evaluation
  here will be the place i evaluate all the decisions from an "after the fact" standpoint and how i would change things if done again. the difficulties i encountered.

## Future developments