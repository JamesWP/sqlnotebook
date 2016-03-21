# Abstract
  Web based sql ide, for documentation and code. aggregate all information for the project.
  Notebook metaphor. easy access for all devices. keep up to date. easy to search for information and catalogue important things
  Aims to be an integration of electronic note taking app and ide.

# Introduction
  Users of the system, types of things they do typical scenarios

  Developer has multiple ongoing projects, back burner project for excess time, personal project, main project.

  However disruptions can happen at any time, for example interruption from a support job on an older project. i.e. there is an issue with a report generating incorrect results. Must switch to project that hasn't been worked on in possibly months. Developer needs access to the high level overview of the system to narrow down the issue raised. Once the issue has been identified the solution needs to be tested and then the fix needs documenting for the next developer to pick up.

  This problem is not a new one and so there are many different ways to solve the problem. Below are some tools and a brief Introduction and explanation of how they help and fail to help a developer.

## set the scene

  explain the problem with example of things that the end user might need
  example ideal situation for use of the application

## Approach  

  solution is "short description of solution"

  how problems are going to be identified
  how solutions might be found for problems
  how a comparison might be drawn for different approaches to ensure correct selection

## Report structure
  explain overview of the document
  Introduction
  background
  problem identification
  requirements from problems
  solutions for requirements
  evaluation of product

---

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


## Requirements organization and priority

# Design
  ideas on how to realize the requirements
  identify current solutions to some of the problems and how these will be used / not used in the project
  I-Python
  hard design ideas diagrams etc..


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