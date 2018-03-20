# Contributing

## Overview

This file provides a high level overview of the tech stack, style guide, and helpful tips to keep in mind when developing.

## Stack

Knowledge of one or more of the technologies is needed to operate on different parts of the codebase. It's best to try to get a sense of how each one of these technologies work before working on the project.

### Language

[Typescript](http://www.typescriptlang.org/) is used as the main programming language of Cyclops. It's a typed superset of Javascript that compiles to Javascript.

Typescript was chosen over Javascript because of it's strong type system. It allows the codebase to be easily refactored and respond quicker to any potential API or UI changes. It's type support also creates easier documentation for complex data types passed around the system.

This codebase is written using [ECMAScript 6](http://es6-features.org/#Constants) compliant Javascript as it's core, so knowledge of that is also required to make modifications or add new features.

### View Library

[React](https://reactjs.org/) is used as the view library.

React was chosen over [Angular](https://angular.io/) or [Vue](https://vuejs.org/) because of it's ease of use, large ecosystem, and declarative programming style. These components allow for complex UI's to be more predictable, easier to debug, and easier to test.

### State Management

[Redux](https://redux.js.org/) and [Redux-Saga](https://redux-saga.js.org/) are used as the state management libraries.

Redux was chosen over mobx because of it's simple architecture, developer tools, and large ecosystem. It allows for easier testing, debugging, and makes the state more predictable. Redux Saga was added to help manage complex side effects that are easy to test.

### Module Bundler

[Webpack](https://webpack.js.org/) is the bundler used to create the compiled static assets.

Webpack was chosen over grunt, gulp, or browserify because of it's ease of use, package tools, and large ecosystem. Instead of having to run gulp with browserify to run the minification and 

### Package Management

[NPM](https://www.npmjs.com/) is the package manager for project.

NPM was chosen over [Yarn](https://yarnpkg.com/en/) because it comes packaged with node and both do the same task after the `npm@5.0.0` update.

### Testing

[Jest](https://facebook.github.io/jest/) is used as the test runner and framework.

Jest was chosen over tools like [Mocha](https://mochajs.org/), [Karma](http://karma-runner.github.io/2.0/index.html), and the ecosystem associated with those tools because it requires minimal configuration with no extensions to get unit tests, code coverage, and transpilation setup. It also runs the tests in parallel which is much faster.

## Tools

### [React Developer Tools](https://github.com/facebook/react-devtools)

This browser extension allows inspection of the component hierarchy, component props, and component state.

### [Redux Developer Tools](https://github.com/gaearon/redux-devtools)

The redux devtools extension allows users to monitor, trace, and rewind activity across the state management system both in development and production.

## Style



### Guidelines

[Airbnb Javascript Style Guide](https://github.com/airbnb/javascript) is the main style guide for the application.

[Typescript Coding Guidelines](https://github.com/Microsoft/TypeScript/wiki/Coding-guidelines) should be used for any Typescript related code.

### Linter

[TSLint](https://github.com/palantir/tslint) is the linting tool for the application.

TSLint is configured with the [tslint-config-airbnb](https://www.npmjs.com/package/tslint-config-airbnb) and [tslint-react](https://github.com/palantir/tslint-react) packages as the root ruleset, along with some custom rules specified in `tslint.json`. It should run on every compilation and it should integrate with most IDE's and text editor's. If it doesn't, you can run `npm run lint` to get linting on the current project.

### Folder Structure

```
├── CHANGELOG.md
├── CONTRIBUTING.md
├── Dockerfile
├── LICENSE.txt            // Cyclops licensing information
├── README.md
├── coverage               // Test coverage
├── dist                   // Compiled production ready bundle
│   ├── cyclops.css        // Compiled production ready stylesheet
│   ├── cyclops.css.map    // Compiled production ready stylesheet sourcemap
│   ├── cyclops.js         // Compiled production ready javascript bundle
│   └── cyclops.js.map     // Compiled production ready javascript bundle sourcemap
├── node_modules           // Third party dependencies
├── package-lock.json
├── package.json           // Project configuration, tasks, dependency list, and jest configuration
├── src
│   ├── [module]           // Code module containing logically related components (alerts, users, etc.)
│   │   ├── actions        // Module redux actions
│   │   ├── components     // Module react components
│   │   ├── reducers       // Module redux reducers
│   │   ├── sagas          // Module redux saga's
│   │   ├── services       // Module helper utilities, shared constants, etc.
│   │   └── types          // Module Typescript interfaces, types, enums, etc.
│   ├── app                // Core module containing components central to the application
│   │   └── services
│   │       └── store.ts   // Redux store
│   ├── common             // Shared module containing common components used across modules
│   └── index.tsx          // Webpack entry point into the application
├── test
│   ├── scssMock.js        // Jest SCSS file mock
│   └── setup.js           // Jest test setup
├── tsconfig.json          // Typescript configuration file
├── tslint.json            // TSLint configuration file
└── webpack.config.js      // Webpack configuration file
```

### React & Typescript

Components should specify both props and state interfaces and export them for testing purposes. Containers related to the component can be placed in the same component file, but exported as default to help differentiate from the actual component without having to name it 'ComponentContainer'. If a component is used for two or more containers, consider placing them in a `containers` folder in the module.

```
// Vendor
import * as React from 'react';
import { connect } from '

// Local
import { MapStateToProps } from '../../common/types/MapStateToProps';
import { MapDispatchToProps } from '../../common/types/MapDispatchToProps';
import { countApples } from '../actions/appleActions';

// Types
// --------------------------------------------------------------------------

// Component properties.
export interface Props {
  name: string;
  count: number;
  onClick(count: number): any;
}

// Component state.
export interface State {
  isActive: boolean;
}

// Component
// --------------------------------------------------------------------------

export class AppleCount extends React.Component<Props, State> {
  // State initialization.
  state = { isActive: false };
  
  // Always use arrow functions when creating functions that use 'this'. This prevents
  // you from having to write 'this.handleClick = this.handleClick.bind(this);' in the constructor.
  // Use the EventHandler to specify the function type this 
  handleClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    this.props.onClick(this.props.count);
  };
  
  render() {
    return (
      <section>
        <h1>{this.props.name}</h1>
        <span>{this.props.count}</span>
        <button onClick={this.handleClick}>Click</button>
      </section>
    );
  }
}

// Container (optional)
// --------------------------------------------------------------------------

// Parent container properties.
export interface Container {
  name: string;
}

// Map the store state to component properties.
const mapStateToProps: MapStateToProps<Props, Container> = (state, props) => ({
  name: props.name,
  count: state.count,
});

// Map dispatch actions to component properties.
const mapDispatchToProps: MapDispatchToProps<Props, Container> = (dispatch, props)  => ({
  onClick: (count: number) => dispatch(countApples(count, props.name),
});

// Container component for the application.
// Includes 'as React.ComponentClass' in order to force correct type inference.
export default connect(mapStateToProps, mapDispatchToProps)(AppleCount) as React.ComponentClass<Container>;
```


### Redux & Typescript

There is no standard best practice when it comes to using Typescript with redux, and most solutions result in a lot more boilerplate and cause more mental overhead when adding new actions or reducer cases. This is the best setup I've found that keeps actions and reducers easily extensible while providing type safety.

#### Actions

```
// Local
import { Action } from '../../common/types/Redux';

// ACTION_NAME
// --------------------------------------------------------------------------
// Description of the action.

// Action name should include a prefix to differentiate it from other similarly named actions.
export const ACTION_NAME = 'ACTION_PREFIX:ACTION_NAME';

// Use the custom Action type defined in ../../common/types/ to prevent code duplication.
// End each action type name with 'Action'.
export type ActionNameAction = Action<typeof ACTION_NAME, boolean>;

// Name the function after the action.
export const actionName = (flag: boolean): ActionNameAction => ({
  type: ACTION_NAME,
  payload: flag,
});
```

#### Reducers

Always use the [spread operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax) when returning state from a reducer `{ ... }` or `[ ... ]`. State should be immutable to prevent the view from updating because of a incorrect equality `===` check.

```
// Local
import * as actions from '../actions/actions';

// State shape of the reducer.
export interface AppleState {
  // Total number of apples.
  total: number;
}

// Initial state of the reducer.
export const INITIAL_STATE: ExampleState = {
  total: 0,
};

// Action types handled by this reducer.
type Actions =
  actions.GrabAppleAction |
  actions.EatAppleAction;

// Typescript's type inference picks up on the action type and infers the payload.
// Name the reducer with 'Reducer' suffixed.
export function appleReducer(state: AppleState = INITIAL_STATE, action: Actions): AppleState {
  switch (action.type) {
    case actions.GRAB_APPLE:
      return { ...state, total: total + 1 };

    case actions.EAT_APPLE:
      return { ...state, total: total - 1 };
    
    // Base case of the reducer. Should return the initial state on startup.  
    default:
      return state;
  }
}

```

#### Sagas

Sagas should each be prefixed with 'Saga' to differentiate it from actions affiliated with them in Intellisense. Every sagas file should have a root saga that starts all other sagas in that file so it can be easily attached to the root store.

```
// Vendor
import { SagaIterator } from 'redux-saga';
import { all, takeEvery, put, call } from 'redux-saga/effects';

// Local
import * as actions from '../actions/appleActions';
import { fetchApple } from '../services/appleApi';

// Saga that will accept a FETCH_APPLE action and try to fetch an apple.
export function * fetchAppleSaga(action: actions.FetchAppleAction): SagaIterator {
  try {
    const apple = yield call(fetchApple, action.payload);
    yield put(actions.fetchAppleSuccess(apple));
  } catch (error) {
    yield put(actions.fetchAppleFailure());
  }
}

// Root saga that starts all the other sagas in this file.
export function * appleSagas(): SagaIterator {
  yield all([
    // Take every FETCH_APPLE action and start the fetchAppleSaga.
    takeEvery(actions.FETCH_APPLE, fetchAppleSaga),
  ]);
}
```

#### Store

The central store is located in `src/app/services/store.ts`. All reducers, saga, and state shapes must be tied into that store. The root reducer shape should remain as flat as possible, meaning that there should be no reducers nested in reducers except for the root reducer. This adds unneccessary complexity when creating a new reducer and adds to much mental overhead of how the data should be structured. If there is a new set of data that pertains to a seperate part of the application, just add the reducer to the root reducer.

```
// store.ts

// Vendor
import { combineReducers, Store } from 'redux';
import { SagaIterator } from 'redux-saga';
import { all, fork } from 'redux-saga/effects';
import { composeWithDevTools } from 'redux-devtools-extension';

// Local
import { AppleState, appleReducer } from '../../apples/reducers/appleReducer';
import { appleSagas } from '../../apples/sagas/appleSagas';

// Redux store state.
export interface StoreState {
  apples: AppleState; // Attach state to root store state.
}

const reducer = combineReducers<StoreState>({
  // Create reducer to match StoreState.
  apples: appleReducer,
});

// Collect all the sagas here.
function * sagas(): SagaIterator {
  yield all([
    // Fork the saga so that it operates on it's own.
    fork(appleSagas),
  ]);
}

// Central redux store for the application.
export const store: Store<StoreState> = (() => {
  // Add saga middlware.
  const sagaMiddlware = reduxSaga();
  const middleware = applyMiddleware(sagaMiddlware);
  
  // Wrap dev tools around middleware.
  const middlewareWithDevTools = composeWithDevTools(middleware);
  const instance = createStore<StoreState>(reducer, middlewareWithDevTools);

  // Start sagas.
  sagaMiddlware.run(sagas);

  return instance;
})();

```

## NPM Tasks

These can be run at project root to perform common tasks for the project.

* `npm test`: Runs the all the tests and outputs coverage to the `coverage` directory.
* `npm run test:watch`: Runs the tests in watch mode to rerun tests when there are changes to the source files.
* `npm run travis`: Task created for the Travis CI build. Runs all tests with limited test runner workers and outputs coverage information to coveralls.
* `npm run build`: Compiles a production ready bundle to the `dist` directory.
* `npm start`: Starts webpack dev server which watches for changes in the source files, compiles them, and then serves them at `http://localhost:8080/`.
* `npm run lint`: Runs `tslint` on the source directory.
