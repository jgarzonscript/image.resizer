# Image Resizing API Utility

This project functions to resize any image currently available in the system to any size. You are able to select from a list of available images, key-in the width and height in the appropriate boxes, and click on resize. The api will resize the image if the thumbnail does not already exist in the system.

This project provides a simple front-end page to expedite functionality, which avoids entering in the parameters manually to the api.
The endpoint being consumed is: 'http://localhost:3000/api'
the endpoint with parameters: http://localhost:3000/api?image=santamonica.jpg&width=200&height=300

Once you installed all the needed modules,
launched the server,
you can point your browser to the front end: http://localhost:3000/

## Getting started

Step 1: Install Dependencies

```bash
npm install
```

Step 2: Running the server

```bash
npm run start
```

Step 3: Point your browser to:

```bash
http://localhost:3000/
```

Step 4: See a list of images available to resize

```bash
 encenadaport.jpg
 fjord.jpg
 icelandwaterfall.jpg
...
```

Step 5: Select one of the images by click on it

Step 6: Enter in a width and height in the corresponding boxes

Step 7: Click the resize button

Step 8: The front-end will provide you with a generated api below the controls.
