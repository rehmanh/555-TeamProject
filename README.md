# 555 Final Project

## Prerequisites
1. Install python 3.8+, check version using `python --version`
2. Instal pip, the python package manager, check version using `pip --version`
3. Install django using pip `pip install Django`
4. Verify django installed using `python -m django --version`. Should be at least 4.1
5. Clone this project, navigate to project directory
6. Install Django webpack loader: `pip install django-webpack-loader`
7. Install Django Rest Framework: `pip install django-rest-framework`
8. Install Django CORS Headers: `pip install django-cors-headers`
9. Install Knox: `pip install django-rest-knox`
10. Install react and react Dom `npm install react react-dom`
11. Install dependencies `npm install`



## Starting up
1. Inside the project directory, you should see the module `finalproject` (parent directory), `solar` (frontend/React directory) and `api` (backend services).
2. To Start the app on your local machine, just run `npm install`, `npm run dev` and then `python manage.py runserver`.
3. Navigate to `localhost:8000/` in your browser to view app.
4. To Stop the server, `CTRL-c` inside your terminal window.

## NOTE
- If your default `python` version is less than 3.9, then you might have to install a newer version of python. Alternatively you can try running `python3 manage.py runserver` and replace all instances of `python` with `python3`

## AWS Backend
Our AWS backend resources and code are currently not in sync with our Github repository. To allow the professor access to our AWS environment, we have shared the necessary credentials with them.
