Alexa skill which allows users to save lists of their favourite dishes and then have them read back in a random order when in need of some menu inspiration. Deployed via AWS Lambda

Improvement TODOs:
- [ ] UNIT TESTS
- [ ] add a step to the save dish flow which checks that Alexa has interpreted the custom slot correctly
- [ ] add multiple strings for each phrase (such as `saveSuccess` and `stop`) and shuffle between them so that the experience feels less repetitive
- [ ] find a better way to save the suggestions to the DynamoDB than concatenating and stringifying

Useful resources:
- [Tutorial series by BigNerdRanch](https://www.bignerdranch.com/blog/developing-alexa-skills-locally-with-nodejs-setting-up-your-local-environment/)
- [Tutorial by Karl Sieburg](https://codeburst.io/how-to-create-an-alexa-skill-with-node-js-and-dynamodb-3c9d5e9661)
- [Amazon docs for setting up local instance of DynamoDB](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DynamoDBLocal.html)
- [Alexa Speech markup docs](https://developer.amazon.com/docs/custom-skills/speech-synthesis-markup-language-ssml-reference.html)