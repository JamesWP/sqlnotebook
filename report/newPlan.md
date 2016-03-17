# Abstract
  With a typical developer role there are many workflow problems to solve. Outlined in this document is one possible solution to the problem of organizing all the required pieces of information required.
  This is a problem for developers because they are often working on multiple projects concurrently and can be required to switch in an instant.

  I will deal with the development of Sql server applications specifically. For the world of a Sql server developer there are many things that need to be remembered in order to complete a task: tables names, relations, column names / types.

  This paper outlines a plan to design and implement a tool to aid the developer of a Sql server database project by helping to store, organize, and search all the documents and code related to the database project.

# Introduction

## set the scene

    AAAF testing commenting the report

  explain the problem with example of things that the end user might need

## Proposal

  so my proposal is ...

    bang bang bang statement here

  explain the project in more detail how exactly it will help the user overcome the problems that they are encountering

  what they can do with my project that they cant do with current solutions

  explain situation

## Document overview
  explain overview of the document

# Background

## Users and their problems
  identify problems and the workflow these people are dealing with day to day, some typical scenarios

  Developer has multiple ongoing projects, back burner project for excess time, personal project, main project.

  However disruptions can happen at any time, for example interruption from a support job on an older project. i.e. there is an issue with a report generating incorrect results. Must switch to project that hasn't been worked on in possibly months. Developer needs access to the high level overview of the system to narrow down the issue raised. Once the issue has been identified the solution needs to be tested and then the fix needs documenting for the next developer to pick up.

  This problem is not a new one and so there are many different ways to solve the problem. Below are some tools and a brief Introduction and explanation of how they help and fail to help a developer.

## Problems
  Identify current solutions on the market for this. **identify problems** with the current solutions and how they help the users to complete tasks.

    Problems will be identified here

## Problem 1
  Some of these problems will be identified with the help of real world solutions identified and evaluated here
## Problem 2
## Problem 3

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
  diagram of the use cases

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