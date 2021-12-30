# HSP

## Dev Configuration

First you need to setup the environment with the following variables. We use AWS S3, Google reCAPTCHA v2, MySQL and Google OAuth2 ("social login").

Create a `.env` File inside `$PROJECT_DIR/` and specify environment variables:

```env
AWS_ACCESS_KEY=<AWS KEY>
AWS_ACCESS_SECRET=<AWS SECRET>
AWS_REGION=<AWS REGION>
AWS_S3_BUCKET_NAME=<S3 BUCKET NAME>

CAPTCHA_SITE_KEY=<CAPTCHA SITE KEY>
CAPTCHA_SITE_SECRET=<CAPTCHA SECRET>

DB_HOST=localhost
DB_NAME=<DB>
DB_USER=<U>
DB_PASSWORD=<P>

GOOGLE_OAUTH2_CLIENT_ID=<GOOGLE OAUTH2 ID>
GOOGLE_OAUTH2_CLIENT_SECRET=<GOOGLE OAUTH2 SECRET>
```

Now you can first start the backend

`./mvnw spring-boot:run`

And finally the frontend (uses in dev mode HMR)

`npm start`

Navigate to localhost:8080 and you are good to go!

## Prod Built (Heroku)

Search for `TODO: PROD` and follow all the instructions in the comments. Additionally also change your `DOMAIN_URL` variable to the deployed URL you get from heroku (or your Domain) AND your `DB` to the production database.
When done, save everything and push the repository to Heroku to deploy.

To trigger a local production built (after replacing every `TODO: PROD`) you can start the server as usual via `./mvnw spring-boot:run` and have a local production built.
Note that a local production built will be hostet on localhost:8081 (instead of 8080). To reflect that, replace the `DOMAIN_URL` variable inside your `.env` file with `DOMAIN_URL=http://localhost:8080`.
