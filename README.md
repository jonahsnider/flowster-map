# flowster-map

A map of Flowsters.

# TODOs

- Implement DB
- Marker animations
  See: <https://developers.google.com/maps/documentation/javascript/examples/marker-animations#maps_marker_animations-css>
- SEO & icons
- Realtime updates integration

## Design plan

### View map path

1. User visits landing page at `/`
2. If user is signed in =>

   1. User clicks "View map" button

   Else =>

   1. User clicks "Sign in to view map" button
   2. If account doesn't exist =>
      1. Firebase function triggers on account create
      2. A request is sent to `/api/events/auth/user/on-create`
         If account email does not end in `@voiceflow.com` the account is deleted

3. User is redirected to `/map`
4. Firestore realtime is used to

### Update settings path

1. User visits landing page at `/`
2. User is signed in
3. User clicks "Update settings" button
4. User is redirected to `/settings`
5. User enters their city into a text box and clicks "Submit"
6. The city is sent to `/api/locate-city`
   The backend returns the city's latitude and longitude but slightly randomized to prevent overlapping markers
7. The city is saved to Firestore
   I don't think any other settings need to be saved
   Profile picture and name can be configured on your Google account and are given to us with Firebase Auth

#### Account deletion

1. User visits `/settings`
2. User clicks "Delete account"
3. User data is deleted from Firestore in the browser
4. User account in Firebase Auth is deleted
