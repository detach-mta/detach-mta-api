# detach-mta-api

API of the Detach MTA project

## Installation

You can install the server with

```sh
git clone https://github.com/nkirchhoffer/detach-api
cd detach-api
npm install
```

After creating an `.env` file from the `.env.example` file, you can launch the server with

```sh
npm start
```

## Documentation

After launching the server you can read available endpoints at the following swagger documentation page : [http://localhost:3000/docs/](http://localhost:3000/docs/)

### `GET /mails`

#### Success Response - Code: 200

Returns a JSON object with the following schema:

```json
{
  "totalInbound": "number",
  "totalOutbound": "number",
  "totalCount": "number",
  "totalAttachments": "number"
}
```

### `POST /mails`

#### Success Response - Code: 200

Returns a JSON object with the following schema:

```json
{
  "metrics": {
    "totalInbound": "number",
    "totalOutbound": "number",
    "totalCount": "number",
    "totalAttachments": "number"
  },
  "mails": [
    {
      "date": "string",
      "inboundSize": "number",
      "outboundSize": "number",
      "recipientsCount": "number",
      "hasAttachments": "boolean"
    }
  ]
}
```
