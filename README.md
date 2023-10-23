MERN 7

Hello 👋🏽 This project invites you to explore a complete API focused on the exciting world of furniture and interior design. You will discover iconic designers and pieces of furniture that have left an indelible mark on the history of decoration and interior design.

Within the models are the basics for designers and designs:

Pilot:

const document = {
    _id: "mongoDB_id",
    name: "pilot_first_name",
    surname: "surname_of_pilot",
    nationality: "nationality_of_pilot",
    image: "pilot_photography",
    car: "cars_associated_with_the_pilot",
}

Cars:

const document = {
    _id: "mongoDB_id",
    name: "car_name",
    images: "car_images",
    year: "car_year",
    pilot: "pilot",
    category: "points_to_one_of_the_default_features",
}

There is also a model of users, who will be in charge of creating modifications to the database:

const document = {
    id: "id_of_mongoDB",
    name: "user_name",
    email: "unique_email",
    password: "password",
    avatar: "user_image",
}

Endpoints:

https://localhost:4001/api
MODEL PILOTS:

https://localhost:4001/api/designer
HTTP Request Endpoint Description
GET / All pilots.
GET /:id Pilot data by id.
POST / Register a new pilot.
PUT /:id Update pilot data.
DELETE /:id Delete information of a pilot.

Legend *Protected routes.
MODEL CARS:

https://localhost:4001/api/design
HTTP Request Endpoint Description
GET / All cars.
GET /:id Car data by id.
POST / Register a new layout.
PUT /:id Update any data in the layout.* PUT /images/:id Update images in the layout.* PUT /images/:id Update images in the layout.
PUT /images/:id Update images in the layout.(*)(**)
DELETE /:id Delete information from a layout.* DELETE /:id Delete information from a layout.* DELETE /:id Delete information from a layout.

Legend *Protected paths. **Update images of layouts, when used with this endpoint, previous pictures will be deleted.
MODEL USERS:

https://localhost:4001/api/user
HTTP Request Endpoint Description
GET / All users.
POST /auth/register Register a new user.
POST /auth/login Login to the user.*
POST /auth/avatar/:id Update user's avatar.* POST /auth/avatar/:id Update user's avatar.* DELETE /:id
DELETE /:id Delete user.*

Legend:

*Protected routes.
Important information:
1.- 50 requests can be made every 3 minutes. 2.- The JWT has an expiration time of one hour. 3.- In the "getById" endpoints of both drivers and cars, you will find all the related data. This allows you to access and read all relevant information comprehensively. 4.- All images are stored in Cloudinary. It is important to mention that if any data is updated or deleted in the API, it will be automatically removed from Cloudinary. This approach ensures consistency and integrity of visual resources, keeping the system perfectly synchronised and up-to-date at all times.
