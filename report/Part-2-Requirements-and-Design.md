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
