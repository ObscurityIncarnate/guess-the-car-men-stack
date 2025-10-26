# Guess the Car
A website that stores and displays a collection of cars information, such as: 
* their model, 
* brand(manufacturer or constructor), 
* year of release, 
* and a general description of the car(this could feature trivia, popular appearances in media, top speeds and or history).



## All cars
![alt text](/public/images/all_cars_display.png)</br>
Users are able to see a view of all cars in the database and some information on them at a glance. Users are also able to click on the inidividual car spaces to get more information on them.
## Specific car
![alt text](/public/images/individual_car_display.png)</br>
Users are able to update the details of the specific car. or delete the car entirely</br>
Additionally there is a form page to add a new car into the database</br>
![alt text](/public/images/add_car.png)</br>
## Quiz

![alt text](/public/images/quiz.png)</br>
![alt text](/public/images/correct_quiz.png)</br>
Additionally the website has a quiz feature. Where a random car from the database, and the user is prompted to answer what they think is the car model, based off of the image of the random car.  </br>

If the user guesses the car correctly. They are given a message saying that they guessed correctly.</br>
If the user guesses incorrectly. They are given a message saying they guessed incorrecrtly, and then the correct model of the car is displayed.

The submit button changes to a Try again button, which allows the user to reset for another random car.


## Database Schema
```
    name: {type: String, required: true},
    description: {type: String},
    image: {type: String, required: true},
    manufacture_date: {type: Number},
    manufacturer: {type: String, required: true},  
```

The manufacture date of type number has a minimum of 1900 and a maximum of the 2025.</br>
The description makes use of a text area for them to input whatever description users want. </br>
An image link is to be provided which is passed into the image src in other pages. </br>

