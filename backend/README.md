# tophap-candidate-test

## Workflow
- Create a branch named "feature/your_name/start_date based on main branch
- Update Deploy & Testing section in Readme after finishing test
  1) deployed backend url
  2) document how to test the requirements below
      - e.g curl requests or setup a postman account and invite mischa@tophap.com

## Requirement
- Backend should use serverless framework. (https://www.serverless.com/)
- Deploy serverless to aws
- You can use Node or Python
- Typescript is prefer, but optional.
- Use firebase for authentication, all endpoints should have authorizer.
- Required Features
  1. user login/register,
  2. Properties list
     A list item should contain -- address(address.FullAddress), BedsCount, BathsDecimal, Price, PricePerSqft, LivingSqft, YearBuilt.
  4. Search (by address)
  5. filter (by bedroom, bathroom count)
  6. get details of a property features
     in addition to information in list item, PublicRemarks, Photos(only first photo)
- Use data.json as the source of mock data on backend.
- Need to finish in a day.

## Deploy & Testing
### Requirements
    Need to install NodeJS on your computer

### How to Test
- On the root folder, go to terminal and run `sh start.sh` command.
    This will install node packages required and will run the serverless on local
- Import `TopHap Test.postman_collection.json` file on PostMan.
    After imported, you can see the "Tophap Test" collection.
    There, all requests are defined.

### Reference
- All api endpoints (except `login`, `register`) use `Bearer` authorization token. Whenever calling the api, you need to confirm if the Bearer authorization token set correctly
- You can get the token when you call `login` or `register` endpoints
