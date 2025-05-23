# What is Supabase?

Supabase is an open source Firebase alternative, based on Postgres.

## Getting Started

To install the supabase locally, follow https://supabase.com/docs/guides/local-development/cli/getting-started?queryGroups=platform&platform=windows
Installing as a dev dependency doesn't always work well, so it is recommended to install for your OS.

Install Docker Desktop.
Make sure you have the docker app open.

Run `supabase start` (Ensure you run it on the project folder root.)
Run `supabase status`
Create a .env.local file at the project root (same level as .env) and fill in the keys with values from the command above:
SUPABASE_API_URL={API URL}
SUPABASE_KEY={anon key}
SUPABASE_SERVICE_ROLE_KEY={service_role key}

Run `yarn db:seed` to run the DB migration scripts and update your local database schema. You will have to run this again whenever there are DB schema changes.

Now you can start the project with `yarn start`.
To sign-up locally, you can get the email confirmation link at http://localhost:54324/monitor

## Migrations

After making schema changes, use the this command to create a migration file:
`supabase db diff --file [migration_name]`

## Running Cypress Tests

Create a .env.local file at the packages/cypress folder
SUPABASE_API_URL=your_api_key (probably http://127.0.0.1:54321)
SUPABASE_KEY=your_key
SUPABASE_SERVICE_ROLE_KEY=your service key

All done! Tests will use your local database. More info about how it works below.

## Supabase Edge Functions

Currently used for customizing Auth Emails.
Supabase Auth Hooks have a timeout of 5 seconds which can easily be exceeded. To reduce the risk, the `resend` call is not awaited.
If it is exceeded, the user gets an error on the UI, but still receives the email and can continue his flow.
Haven't managed to run the functions locally yet (contributions welcome!).

### Cypress with Supabase

Running cypress tests locally will use the local database, while running on CI will use the QA database.
For each test run, a new tenant_id is generated, which has a few benefits:

- ensures no conflicts between parallel test runs
- easier to cleanup
- if the data isn't cleaned for some reason, it won't affect other runs
  For each test file, there should be a `before` and `after` block to, respectively, seed and clean the database.

### Local firebase sync testing/debugging

_This is temporary until we fully migrate to supabase!_
We can create and deploy the sync function to the firebase dev environment.
Then, using ngrok, expose our local supabase url to the internet, and point the firebase function to it.
(ngrok http http://127.0.0.1:54321)

To authenticate, we need to create these 3 secrets, for each firebase project:
firebase functions:secrets:set SUPABASE_API_URL
firebase functions:secrets:set SUPABASE_API_KEY
firebase functions:secrets:set TENANT_ID
(Check values with firebase functions:secrets:access SECRET_NAME)
