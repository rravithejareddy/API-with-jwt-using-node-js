Clone or Download the repository.

Step 1:  Open command prompt, move to project location
Example: Windows: cd C:\Users\Downloads\HackerBayTask

Step 2:  run npm install cmd to add packages in to project
Example: Windows: >C:\Users\Downloads\HackerBayTask npm install

Step 3:  run npm start cmd to start project localhost on port no 3000 (if you want to change port no. edit on server.js)
Example: Windows: >C:\Users\Downloads\HackerBayTask npm start

HackerBay NodeJS Task API Details
NOTE: Use Insomnia or another API call App’s to test. Below examples are given with default port no. 3000, use your port no., if modified.

Public Endpoints:

Login
URL:  http://localhost:3000/api/auth/login,
Method: POST,
Data Param’s: 
Required 
Username [string]
Required 
Password [string]
Sample Body: 
{
“username”:”test@test.com”,
“password”:”test”
}

Success Response:  code: 200, 
content: {
"auth": true,
"token": "--------------------JWT token -----------"
}
Error Response: 

If parameters are undefined – error code: 500 Internal server 
error message: Please send username and password.

Protected Endpoints:

Note: Send JWT token (received at public login endpoint) in header as ‘x-access-token’ to access protected endpoints. 

APPLY JSONPATCH

URL:  http://localhost:3000/api/auth/applyjsonpatch,
Method: POST,
Data Param’s: 
Required 
jsonObject [json object]
Required 
jsonPatch [json patch]
Note: please send correct json and jsonpatch formats.
Sample Body: 

{
jsonObject: { "baz": "qux", "foo": "bar" },
jsonPatch: { "op": "replace", "path": "/baz", "value": "boo" }
}

Success Response: 
code: 200, 
content: {“”} (modified jsonobject)
Error Response: If parameters are undefined – error code: 500 Internal server error message: Please send jsonObject, jsonPatch.
If values are not correct format – error code: 500 Internal server error message.

CREATE THUMBNAIL

URL:  http://localhost:3000/api/auth/createthumbnail,
Method: POST,
Data Param’s: 
Required 
imageUri [public image URL]
Note: please send public image url as imageUri.
Sample Body: 

{
  “imageUri”: “https://www.google.com/images/srpr/logo3w.png”
}
Success Response:  

code: 200,
Content: 

image 
Error Response: If parameters are undefined – error code: 500 Internal server error message: Please send imageUri
If error at image resize – error code: 500 Internal server error message.

HackerBay NodeTask API Testing
use npm test cmd to test the app using mocha and chai.
