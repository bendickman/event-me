# event-me

client app

```console
npm create vite@latest event-me-client-app react-ts
```

db migration commands

```console
dotnet ef migrations add InitialCreate -p Persistence -s Api
```

```console
dotnet ef migrations remove -p Persistence -s Api
```

```console
dotnet ef database update -p Persistence -s Api
```

```console
dotnet ef database drop -p Persistence -s Api
```

```console
dotnet ef migrations script -o eventme.sql -p Persistence -s Api
```