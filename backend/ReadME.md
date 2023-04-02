How to run the backend- (postgres db, nodejs required)
1- create a new database in postgres
2 - create a .env file in core follow .env.example
3- npm install ( to insall all the deps)
4 - npm run migrate ( run the migration)
5 - npm run dev (for development mode running)

Note: Based on NODE_ENV project takes which mode needs to enter in.
supported mode - NODE_ENV = development,test, production
CI* stands for test mode
PROD\_ stands for production

Routes - 
Example curls - 
Register a user - 

curl --location --request POST 'http://localhost:8000/user/register' \
--header 'Content-Type: application/json' \
--data-raw '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "sasdloof@adssf.co",
    "password": "password",
    "confirm_password": "password"
}'

_________________________________________________________________

login - 

curl --location --request POST 'http://localhost:8000/user/login' \
--header 'X-CSRF-TOKEN: KLFc6H6q-btypnC4cjsfOlq6-aOrdm3TVR-U' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email": "sasdloof@adsf.co",
    "password": "password"
}'

____________________________________________________________________

Save single task - 

curl --location --request POST 'http://localhost:8000/task/saveTask' \
--header 'X-CSRF-TOKEN: LDt9LIyJ-4luWpTJa4xL3wydQcvwXgYpDgsk' \
--header 'Authorization: Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjJkMjNmMzc0MDI1ZWQzNTNmOTg0YjUxMWE3Y2NlNDlhMzFkMzFiZDIiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vdGVqaW1hbmRpYmV0YSIsImF1ZCI6InRlamltYW5kaWJldGEiLCJhdXRoX3RpbWUiOjE2NjMwNTg1MDksInVzZXJfaWQiOiJMb0tSNmpTSEI1Y0xVaWdHYVUyWEFScVkyZW4yIiwic3ViIjoiTG9LUjZqU0hCNWNMVWlnR2FVMlhBUnFZMmVuMiIsImlhdCI6MTY2MzA1ODUwOSwiZXhwIjoxNjYzMDYyMTA5LCJwaG9uZV9udW1iZXIiOiIrOTE5OTk5OTg4ODg4IiwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJwaG9uZSI6WyIrOTE5OTk5OTg4ODg4Il19LCJzaWduX2luX3Byb3ZpZGVyIjoicGhvbmUifX0.YescNcLSk8abYbIeOcEnzfXB7StYLQOLDJv-2XjNn-nM3UtYpl3Qk3SPNPaJp4AKIb1UI6PxSU1fdaeO28T7-1uE2_0tNuzi9pGIdbE-ai-VLyE5T137wfpeDO6V94InYTigxFesE8brqiBYkJZeC_LDqGoKgvZVJ19L2dShsJEraPEiyU0wgYXdNPd6KvfUPqQBUxDLhtQbnXne95ywNq8jID3NG_l7y2qX4cago_H6eqHVIax1KL3GyuXwnUaCc991kvcX3PFTemUrw4ny1M3YN23NQ73ErUY6Pvi7NKJdO38Qfa_TkyQXs1o8dW3TOabdpUXh4IWLpOLBb_ZAjw' \
--header 'Content-Type: application/json' \
--header 'Cookie: Authorization=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNhc2Rsb29mQGFkc2YuY28iLCJpZCI6MTEsImlhdCI6MTY4MDQyOTAzMywiZXhwIjoxNjgwNDI5MDQ4fQ.lFOlNT9LgEPONwLapQhMNXqcRNcaWzPoq2oSxLn6bYk; refreshToken=4fb9d214-16f3-4e43-a9d7-b7f51ae692ca; token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNhc2Rsb29mQGFkc2YuY28iLCJpZCI6MTEsImlhdCI6MTY4MDQzODk2OSwiZXhwIjoxNjgwNDM4OTg0fQ.6NunBLnlBdOTXuO2gtLJG8uJEpuE1YzOSRKEPSZmGRE' \
--data-raw '{
   "title":"asdfa",
   "description":"dasfas"
}'
___________________________________________________________________________

Complete a single task 

curl --location --request GET 'http://localhost:8000/task/makeComplete?id=3' \
--header 'X-CSRF-TOKEN: KLFc6H6q-btypnC4cjsfOlq6-aOrdm3TVR-U' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNhc2Rsb29mQGFkc2YuY28iLCJpZCI6MTEsImFzc2lnblRvIjoiSm9obiBEb2UiLCJpYXQiOjE2ODAyNTEwNDMsImV4cCI6MTY4MDI1MTA1OH0.0KxhmtfT7-inksdWqj0wVj_AenoWSuUOP8U645JE-0A' \
--header 'Cookie: Authorization=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNhc2Rsb29mQGFkc2YuY28iLCJpZCI6MTEsImlhdCI6MTY4MDQyOTAzMywiZXhwIjoxNjgwNDI5MDQ4fQ.lFOlNT9LgEPONwLapQhMNXqcRNcaWzPoq2oSxLn6bYk; refreshToken=4fb9d214-16f3-4e43-a9d7-b7f51ae692ca; token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNhc2Rsb29mQGFkc2YuY28iLCJpZCI6MTEsImlhdCI6MTY4MDQzODk2OSwiZXhwIjoxNjgwNDM4OTg0fQ.6NunBLnlBdOTXuO2gtLJG8uJEpuE1YzOSRKEPSZmGRE' \
--data-raw ''

_______________________________________________________________________________

Delete a task 

curl --location --request GET 'http://localhost:8000/task/delete?id=3' \
--header 'X-CSRF-TOKEN: KLFc6H6q-btypnC4cjsfOlq6-aOrdm3TVR-U' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNhc2Rsb29mQGFkc2YuY28iLCJpZCI6MTEsImFzc2lnblRvIjoiSm9obiBEb2UiLCJpYXQiOjE2ODAyNTEwNDMsImV4cCI6MTY4MDI1MTA1OH0.0KxhmtfT7-inksdWqj0wVj_AenoWSuUOP8U645JE-0A' \
--header 'Cookie: Authorization=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNhc2Rsb29mQGFkc2YuY28iLCJpZCI6MTEsImlhdCI6MTY4MDQyOTAzMywiZXhwIjoxNjgwNDI5MDQ4fQ.lFOlNT9LgEPONwLapQhMNXqcRNcaWzPoq2oSxLn6bYk; refreshToken=6bcf26ae-ab72-4cb8-964f-d79de1e1e87b; token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNhc2Rsb29mQGFkc2YuY28iLCJpZCI6MTEsImlhdCI6MTY4MDQzOTAxNSwiZXhwIjoxNjgwNDM5MDMwfQ.kIyeB3ogYpaTpKxcvi0vClKxfpxqvO1obZuLCc7lTBk' \
--data-raw ''

_________________________________________________________________________________

Get all task 

curl --location --request GET 'http://localhost:8000/task/getTask' \
--header 'X-CSRF-TOKEN: KLFc6H6q-btypnC4cjsfOlq6-aOrdm3TVR-U' \
--header 'Cookie: Authorization=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNhc2Rsb29mQGFkc2YuY28iLCJpZCI6MTEsImlhdCI6MTY4MDQyOTAzMywiZXhwIjoxNjgwNDI5MDQ4fQ.lFOlNT9LgEPONwLapQhMNXqcRNcaWzPoq2oSxLn6bYk; refreshToken=3288c662-5997-438d-b2fd-b20363f75a1f; token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNhc2Rsb29mQGFkc2YuY28iLCJpZCI6MTEsImlhdCI6MTY4MDQzOTA2MCwiZXhwIjoxNjgwNDM5MDc1fQ.BGDJeTGOmS18IjhkBD9eym3rGGy-dZS5HXA6ZA3v6j8' \
--data-raw ''

_______________________________________________________________________________________

logout user 

curl --location --request POST 'http://localhost:8000/user/logout' \
--header 'X-CSRF-TOKEN: KLFc6H6q-btypnC4cjsfOlq6-aOrdm3TVR-U' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNhc2Rsb29mQGFkc2YuY28iLCJpZCI6MTEsImFzc2lnblRvIjoiSm9obiBEb2UiLCJpYXQiOjE2ODAyNTEwNDMsImV4cCI6MTY4MDI1MTA1OH0.0KxhmtfT7-inksdWqj0wVj_AenoWSuUOP8U645JE-0A' \
--header 'Cookie: Authorization=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNhc2Rsb29mQGFkc2YuY28iLCJpZCI6MTEsImlhdCI6MTY4MDQyOTAzMywiZXhwIjoxNjgwNDI5MDQ4fQ.lFOlNT9LgEPONwLapQhMNXqcRNcaWzPoq2oSxLn6bYk' \
--data-raw ''


 * Change the url with running location 
 Auth system completely relies on cookies for security purpose. 
 Frontend doesnt have to save tokens or anything 
 server directly access the cookies and provide result based on that
