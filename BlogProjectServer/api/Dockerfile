FROM mcr.microsoft.com/dotnet/sdk:8.0
WORKDIR /api
EXPOSE 8080
EXPOSE 8081

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /BlogProjectServer

COPY . .
RUN dotnet restore
WORKDIR /BlogProjectServer/api
RUN dotnet publish -c Release -o out

FROM mcr.microsoft.com/dotnet/aspnet:8.0

WORKDIR /api
COPY --from=build /BlogProjectServer/api/out .

ENTRYPOINT ["dotnet", "api.dll"]