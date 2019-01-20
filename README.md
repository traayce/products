.NET CORE 2.1 web api + react SPA.

To run api project, you will need .NET CORE 2.1 SDK.

Database connection string can be found in `api/Services/Registry.cs`

To apply migration to database run `dotnet ef database update` in `api/DataAccess`

For SPA you will need yarn and node.js.

in `frontend` folder run `yarn` or `npm install` when packages are ready run `yarn start-prod` or `npm run start-prod` server will launch at `http://localhost:3000/`

The React application proxies requests to `http://localhost:5000/`

Let me know if you'll have any problems.

justin.rackauskas@gmail.com
+37063894868