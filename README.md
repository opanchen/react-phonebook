# Phonebook App

## Description

Create and manage your personal contact list, save favorite ones, send them messages or just do everything you want.

**View [DEMO](https://opanchen.github.io/react-phonebook)**

**Backend [API](https://github.com/opanchen/goit-node-hw-rest-api)**

>
>  **_Attention!_**
>
>Unfortunately, the service for sending emails may work not 100% correctly due to certain **Nodemailer** issues related to some SMTP protocol peculiarities.
> _In that case_ you can use public testing account to view basic app's features except account verification or manual message sending.
>
> **Email:** senaven173@czilou.com
>
> **Password:** 123456

## Creating

The project was created with **[Create React App](https://github.com/facebook/create-react-app)**.

Added **`404.html`** file and the corresponding script in index.html to handle the 404 error when the page is reloaded.

App routing and navigation structure was inplemented with **[React Router Dom](https://www.npmjs.com/package/react-router-dom)** using code splitting with **`React.lazy`** & **`React.Suspense`**.

On the client's side the application stores and manages data with **[Redux Toolkit](https://redux-toolkit.js.org/)**. Auth operations were implemented using **[Redux Async Thunk](https://redux-toolkit.js.org/api/createAsyncThunk)** while other CRUD operations releted to contacts were implemented via **[RTK Query](https://redux-toolkit.js.org/rtk-query/overview)**.

---

Backend **Rest [API](https://github.com/opanchen/goit-node-hw-rest-api)** was created with **[Node.js](https://nodejs.org/en)**, **[Express.js](https://expressjs.com/)** and **[Mongo DB](https://www.mongodb.com/)**.
Sending of verification massages was implemented using **[Nodemailer](https://nodemailer.com/)**.

After creating a new account the user have to check out his mailbox and verify email to continue using the app.

![](https://media.giphy.com/media/I5nvvd508xGTzVQqyW/giphy.gif)

![](https://media.giphy.com/media/NUNVvYKEZ4HwZlr2EF/giphy.gif)

According to API email service also can be used for sending private messages to user's contacts.

![](https://media.giphy.com/media/QGa0OegcKHC0pokVJB/giphy.gif)

## Dependencies and technologies

- _React_
- _React Router Dom_
- _React Helmet_
- _React Redux_
- _Redux Toolkit_
- _Redux Persist_
- _React Icons_
- _React Toastify_
- _Axios_
- _Nanoid_

... and more. Full list of dependencies and additional information is available in **`package.json`** file.
