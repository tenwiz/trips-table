# Tripgrid Travel Test

## Objectives
Create UI/UX to accomplish the following:
1. Display the list of trips from the API (`/trips`)
2. Provide some level of search and/or filter capabilities with those trips

## Getting Started
If you've gotten far enough to read this file, then all you should need to get things going is to run the following from within this directory:

```bash
npm install
npm run dev
```

You should now be able to access the site at http://localhost:3001

Hot reloading is implemented for the UI via `parcel` and the server will automatically reload with `nodemon`.

### Key Files
- `/app/main.js` - bare bones React implementation
- - `/server/index.js` - simple server exposing the UI and other endpoints

### Endpoints
- `/` - renders the built `index.html` file
- `/trips` - returns a list of 1000 dynamically generated trips using `faker`

### Data Schema

#### Trip
- confirmationNumber: String
- fromDateTime: String (ISO Format)
- fromLocation: String
- id: UUID
- price: Decimal
- toDateTime: String (ISO Format)
- toLocation: String
- travelers: [Traveler Object]
- tripType: String
- vendorName: String

#### Traveler
- avatar: String
- name: String
