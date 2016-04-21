
# Introduction

  Developers use documentation to aid their understanding of code, however the documentation is often constructed and viewed on paper or in a web browser [for example, (cite javadoc here)](http://www.oracle.com/technetwork/articles/java/index-jsp-135444.html) While the use of documentation tools provides a good overview of the code, it is not the be all and end all of the notes surrounding the code. Developers can't rely on the documentation alone, they must also have an understanding of the other components of the system and their interaction.

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
