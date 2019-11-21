# FLL-Scoring #
A live FIRST Lego League scoring website. Features a direct connection between referees and users so that scores can be displayed in real time.

## Development Installation (Linux) ##
I would recommend Ubuntu to ensure installation instructions are the same as what I've written below.
First, create a new python virtual environment (dependencies can get a bit messy if you don't) in the directory of your choice. Then install the required packages using pip and the requirements.txt file located in the top level project directory using the following command:
`$ python3 -m pip install -r requirements.txt`

Next install and set up redis. [This](https://www.digitalocean.com/community/tutorials/how-to-install-and-secure-redis-on-ubuntu-18-04 "How to install and secure redis on Ubuntu") guide makes it pretty straight forward.

Finally, cd into the site_resources directory and run the following command to run the server specifically on your machine:
`$ python3 manage.py runserver`

If you want to run it on your local network use this command:
`$ python3 manage.py runserver 0.0.0.0:8000`

To access the site use `localhost:8000` on the host machine or `host-local-ip:8000` on any other system.

## Additional Details ##
Any field values for django models (such as team names, match point values, etc.) can be modified through the admin page. On the host machine this can be accessed with the following URL `localhost:8000/admin`
The temporary superuser username is `ethan` and password is `kevinasu`
