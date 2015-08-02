Set up basic Elet Application
==============================

## Prerequisites
* Install Node.js
* Move the `examples` directory from `node_modules/elet` and keep this examples directory to root directory that is out of node_modules directory  or Extract `examples` directory from Elet [Download Master](https://github.com/justin-john/elet/archive/master.zip).
* Go to `examples` root directory in cmd.
* Install dependencies before starting the application using `npm install` in cmd.

```bash
$ npm install
```

## To run the application

```bash
$ node app.js
```

Go to http://localhost:3000

### FAQ:

1. `Error: Cannot find module 'swig'`. This error happens even after `npm install` or swig is installed.
    Please move the examples folder out of node_modules.

    ```
        └── node_modules/      To      └── node_modules
           └── examples                └── examples
    ```