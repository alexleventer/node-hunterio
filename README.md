# Node Hunter.io
Hunter.io lets you find email addresses in seconds and connect with the people that matter for your business. View the [full documentation here](https://hunter.io/api/docs).

## Installation:
Use npm to install the package:
```shell
$ npm install node-hunterio
```

## Examples:

### Domain Search
Get every email address found on the internet using a given domain name, with sources.

```javascript
const API_KEY = 'YOUR_API_KEY';
const hunterio = new Hunterio(API_KEY);
hunterio.searchDomain('hunter.io')
  .then((res) => {
    console.log('Domain Information: ' + res);
  });
````

### Email Finder
Get every email address found on the internet using a given domain name, with sources.

```javascript
const API_KEY = 'YOUR_API_KEY';
const hunterio = new Hunterio(API_KEY);

const findEmailRequest = {
  domain: 'jimmyjohns.com',
  company: 'Jimmy Johns',
  first_name: 'Alex',
  last_name: 'Leventer',
  full_name: 'Alex Leventer',
};

hunterio.findEmail(firstEmailRequest)
  .then((res) => {
    console.log('Email Information: ' + res);
  });
```

### Email Verification
Check if a given email address is deliverable and has been found on the internet.

```javascript
const API_KEY = 'YOUR_API_KEY';
const hunterio = new Hunterio(API_KEY);

const emailVerificationRequest = {
  email: 'alex@gmail.com'
};

hunterio.findEmail(emailVerificationRequest)
  .then((res) => {
    console.log('Email Verification Information: ' + res);
  });
```
