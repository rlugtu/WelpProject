# Welp

## Heroku Deployment

[Welp](https://ohwelp.herokuapp.com/)

## Business Directory App

Welp is a business directory app that allows users to find, bookmark, and review different businesses. Businesses will be accessed through the yelp fusion api.

## Wireframes

[wireframes](https://imgur.com/a/xB59vAM)

## Schema Diagram

[Schema Diagram](https://imgur.com/YnbpJhm)

## User Story

- User creates profile with name, email, password, username, birthday. about, and location.
- User can still edit profile info that is displayed in their profile page
- User will be able to search for as service from the landing page and be presented with a list of possible businesses
- User can save a business pages to their personal bookmark page
- User can edit their bookmark page
- User can write a review on a business

## Specs

- Technologies
  - ReactJS
  - Ruby on Rails
  - Postgres-SQL
  - Heroku-postgres

## Modules/Libraries

- yelp fusion
- material UI
- react-slideshow-image
- rails
- pg
- bcrypt
- foreman
- puma
- react-slideshow-image

## Installation

- Download this repo
- cd into welp
- run yarn add or npm install to install all package dependencies
- register for a free yelp fusion API key
  - create a .env file and within this .env file set REACT_APP_YELP_KEY=(YOUR_API_KEY) without parenthesis
- run migrations with rails db:migrate
- to run locally use bundle exec foreman start

## Future improvements

- Allow users to create custom folders to organize bookmarks
- Implement user profile picture uploads
- Allow users to view other profiles
