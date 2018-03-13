# Change log

## Unreleased

### Added

- Ability to add and remove tags from an alert detail. ([5626fd9](https://github.com/dunbarcyber/cyclops/commit/5626fd90ad8352ab6aab03808f3990a4ef9d6d72))

### Changed

- Test suite from Karma/Webpack/Mocha/Chai to Jest. ([24271f4](https://github.com/dunbarcyber/cyclops/commit/24271f4a50813b89d22369df0e00496eb5401067))
- Updated enzyme to version 3.3.0 ([cabcb5c](https://github.com/dunbarcyber/cyclops/commit/cabcb5c3dd5f8adbdd35f2a4a74f249329867ecf))

### Removed

- Removed test specs.ts file. ([03d5051](https://github.com/dunbarcyber/cyclops/commit/03d5051693fd47b47611a449ee0d0d454b965dfd))
- Removed unused dependencies. ([30ff3f0](https://github.com/dunbarcyber/cyclops/commit/30ff3f0eb012818f37906e22fad9f2bc488fe4d3))

### Fixed

- getUserFullName to render 'None' if there is no user object. ([3bc0bdd](https://github.com/dunbarcyber/cyclops/commit/3bc0bdd4fed4ffa67c47db87a941fd6795ae3c12))

## [0.5.4](https://github.com/dunbarcyber/cyclops/compare/0.5.2...0.5.3) (2018-01-09)

### Changed

- Hide Comments on alert detail and search page if user is not staff. ([1b8162d](https://github.com/dunbarcyber/cyclops/commit/ed04cfc))
- "Last Active" to "Last Updated" in monitor modal. ([ed04cfc](https://github.com/dunbarcyber/cyclops/commit/ed04cfc))

### Fixed

- Creation of extraneous comments when assigning a user, outcome, or level back to itself. ([eb321db](https://github.com/dunbarcyber/cyclops/commit/eb321dbb7aa15936694e5af95a0b374c9f55cb79))

## [0.5.3](https://github.com/dunbarcyber/cyclops/compare/0.5.2...0.5.3) (2018-01-09)

### Removed

- `src/app/services/distilleries/utils/distilleryUtils.ts`: shortenDistilleryName no longer necessary with new distillery name field.

### Changed

- `src/app/routes/Search/components/SearchQueryInstructions.tsx`: Changed distillery filter parameter instructions to include new filter syntax.

### Security

- Removed Typedoc dependency from `package-lock.json`. Package depended on insecure dependency `chjj/marked@0.3.6`.

## [0.5.2](https://github.com/dunbarcyber/cyclops/compare/0.5.1...0.5.2) (2017-12-13)

### Removed

- Source drop down items grouped by warehouse on the alerts page. Now it only displays the distillery names.

<a name="0.5.1"></a>
## [0.5.1](https://github.com/dunbarcyber/cyclops/compare/0.5.0...0.5.1) (2017-12-07)

### Added

- Ability to filter search results by time. Relative and absolute filter options are present.'
- Automatic deployment to S3 bucket from travis when a new tag is introduced.
- `FontAwesome` helper component for displaying font awesome icons.

### Removed

- Any mention of the `build` directory in configs and `.gitignore`.
- Sphinx documentation. Information will be transferred to the CONTRIBUTING.md file.
- **.gitattributes**: Removed `dist` binary diff. Directory is now ignored. Distribution files have been moved to https://s3.amazonaws.com/cyclops-public/.

### Moved

- Started migration process of SCSS classes to localized components. Current classes are in `styles` directory. Future destination will be in files located next to Component classes using those files.

### Fixed

<a name="0.5.0"></a>
## [0.5.0](https://github.com/dunbarcyber/cyclops/compare/0.4.4...0.5.0) (2017-11-03)

### Added

- Ability to search through alerts and distilled data using keywords and field comparisons.
- Ability to limit searches by collection using wildcard operators or specific names.
- Quick visibility of all collections and their associated fields for quick reference.
- Link to alert page when clicking alert search result.
- New data layout for the search page ([83390bf](https://github.com/dunbarcyber/cyclops/commit/83390bf5319835d7695ccaa52a9406a1ac5c1325)).
- Component styling in adjacent scss files with the same name.

### Fixed

- Duplicate monitors appearing in the monitors panel ([7287c13](https://github.com/dunbarcyber/cyclops/commit/7287c134bb5418ba98e416834b21d0377d96664c)).

<a name="0.4.4"></a>
## [0.4.4](https://github.com/dunbarcyber/cyclops/compare/0.4.3...0.4.4) (2017-09-20)

### Added

- **src.app.services.tags.types**: Tag information data type. ([31409e2](https://github.com/dunbarcyber/cyclops/commit/31409e281019d588b3cff86b2409bac5d3fa12be))
- **src.app.services.tags.components.TagLabel**: Component that displays tag information. ([138afe5](https://github.com/dunbarcyber/cyclops/commit/138afe55540d48b6108dd81b736fa1424d396976))
- **.travis.yml**: Added automated compilation and distribution of files to S3 bucket. ([e3ab211](https://github.com/dunbarcyber/cyclops/commit/e3ab2117dcbb551379b339843cc7812702d43bca))

### Fixed

- Errors in tests that complained about incorrect type definitions. ([aee3faf](https://github.com/dunbarcyber/cyclops/commit/aee3faf81f1db1e3946b7234b02155ba0ac9ac7c))
- Error popup that occurred when a geolocation address request returned empty. ([5062a3d](https://github.com/dunbarcyber/cyclops/commit/5062a3d62825f3a4c3fbeefe8cf9ff32c6360650))
- Empty user name display when user didn't set a name for themselves. Now defaults to the user email display. ([f56956f](https://github.com/dunbarcyber/cyclops/commit/f56956ff530ca0a975796b19a0fb293c4f4f96d8))


### Changed

- **src.app.routes.AlertDetail.components.AlertDetailOverview**: Tag information added to alert detail overview. ([1285a94](https://github.com/dunbarcyber/cyclops/commit/1285a94a67892a1fb9a427dab0919f85dcecbba2))
- **src.app.services.alert.types**: Tag information added to alert detail data type. ([1bc0a5e](https://github.com/dunbarcyber/cyclops/commit/1bc0a5e361fe06a6d7559f0c998623a71657cc9f))
- **package.json**: Changed development scripts to use webpack dev server instead of custom webpack development setup. ([5980231](https://github.com/dunbarcyber/cyclops/commit/5980231be057bf9b32119ab09fcbb2490983b61e))
- **.gitignore**: Added dist folder to ignored folders. Compiled assets for future versions and the development build will be stored at http://s3.amazonaws.com/cyclops-public/. ([2fbff5f](https://github.com/dunbarcyber/cyclops/commit/2fbff5f287416fa6dbbd5b3e63610617122ed478))

### Moved
- Data stores moved into folder named store and redux reducers have been limited to only be nested one level deep ([a46289e](https://github.com/dunbarcyber/cyclops/commit/a46289ed186266aaa554e777a580ef91eedf5195))
- Custom redux data types into the store directory ([8ace8cd](https://github.com/dunbarcyber/cyclops/commit/8ace8cda4bbc4f88c3c583e48b260623dfd8b1dc))

<a name="0.4.3"></a>
## [0.4.3](https://github.com/dunbarcyber/cyclops/compare/0.4.2...0.4.3) (2017-08-03)

### Changed

- **src.app.services.cyphon.utils.version**: Update VERSION_MATCHING constant with correct Cyphon versions.

<a name="0.4.2"></a>
## [0.4.2](https://github.com/dunbarcyber/cyclops/compare/0.4.1...0.4.2) (2017-08-01)

### WARNING

This version only works with Cyphon version 1.4. The alert.doc_id change for context search causes context search to break in any version below 1.4.

### Removed

- 0.3 documentation. Defaults to Cyphon implementation of Cyclops. ([9ba9eaa](https://github.com/dunbarcyber/cyclops/commit/9ba9eaa8ea30dd1e1c7c679f9272beeab5ec8635))

### Added

- Added version matching to notify the user when a Cyclops and Cyphon version don't work together. ([56fa68d](https://github.com/dunbarcyber/cyclops/commit/56fa68d5fea44fe9175bc2f0ea7e761772c9a86c))

### Changed

- Used alert.doc_id for context searching instead of alert.data._id since the latter is deprecated in
Cyphon 1.4. If the user is using 0.4.1 or below with Cyphon 1.4, or is using Cyclops 0.4.2 with Cyphon 1.3, the application will notify them. ([8209f29](https://github.com/dunbarcyber/cyclops/commit/8209f294da3c97ea7353004097742bf12c156f0a))


<a name="0.4.1"></a>
## [0.4.1](https://github.com/dunbarcyber/cyclops/compare/0.4.1...0.4.0) (2017-06-08)

### Added

- **package-lock.json:** added lock file for npm dependencies ([ac21817](https://github.com/dunbarcyber/cyclops/commit/ac21817))

### Fixed
- **alerts:** fixed alert metrics API endpoints from changing passed in days parameter ([03d4a5f](https://github.com/dunbarcyber/cyclops/commit/03d4a5f))
- **Dashboard:** fixed day search parameter to search for 0 days instead of 1 ([03d4a5f](https://github.com/dunbarcyber/cyclops/commit/03d4a5f))

<a name="0.4.0"></a>
## [0.4.0](https://github.com/dunbarcyber/cyclops/compare/0.4.0...0.3.0) (2017-06-02)

### Added

- Filtering by category on the alerts page.
- Grouping distillery by collection name on the alerts page.
- Alert endpoint tests.
- Redux store tests.
- Array utility tests.
- AlertParamsDateCalenders test.
- Map tests.
- Ability to open formatted JSON links in a new tab.
- MonitorStatusContainer.

### Removed

- Staff functionality for non staff users.
- ``server`` folder that contained the Express server code.
- **cyclops.config.ts:** Cyclops configuration. This is no longer necessary

### Changed

- Mapbox to a globally accessed variable injected into the application through the html template due to some issues integrating with webpack.
- Sphinx documentation highlighting
- **webpack.config.js:** Changed the webpack config back to js instead of ts.
- **karma.conf.js:** Change the karma config back to js instead of ts.

### Fixed

- Improperly styled files that didn't pass the tslint inspection.
- Monitors status only displaying the first 10 monitors. 

<a name="0.3.0"></a>
## [0.3.0](https://github.com/dunbarcyber/cyclops/compare/0.3.0...0.2.2) (2017-05-17)

### Added

- Better alert workflow. Status changing has been removed from the UI and is now changed based on assigned user and outcome. Outcomes must also now include an anaylsis before changing.
- Alert update errors. If there are any errors in changing alert fields, it shows them in the alert detail view.
- Alert sources sorted by warehouse name.
- More tests for the alert redux store.
- Link to the Cyphon Admin page. The environment variable ``CYPHON_EXTERNAL_URL`` must be set to activate this. This is because the value for ``CYPHON_URL``, which is what connects to the API, could possibly be for another network such as a Docker network, so an externally available URL that can be reached from a browser must be used instead.

### Fixed

- Infinite logout loop that occured when a user traveled from the logout page to the login page.
- Missing source maps from the production and development builds.
- Bug that didn't allow any changes to be made to the Alert object.
- Bug that didn't properly set the Authorization header for API requests.

### Changed

- Views folder to routes.
- ``index.ts`` for the root route and each route. This is explained more [here](http://cyphon-ui.readthedocs.io/en/latest/contributing.html).
- Names for route reducers and actions. They now correspond to the component they are used for.
- State shape of the redux store. It now corresponds to the folder structure for easier data retrieval.


### Removed

- ``api`` folder. All of these resources have been moved to ``services`` or ``types``.

<a name="0.2.2"></a>
## [0.2.2](https://github.com/dunbarcyber/cyclops/compare/0.2.2...0.2.1) (2017-04-28)
- Add endpoint tests for distilleries, users, contexts, and actions.
- Fix bug that caused alert id to be used when making Jira tickets instead of the action id.

<a name="0.2.1"></a>
## [0.2.1](https://github.com/dunbarcyber/cyclops/compare/0.2.1...0.2.0) (2017-04-28)

- Add push notification documentation.
- Open context search result JSON so nested structures don't have to be toggled.
- Simplify coverage generation so that it isn't necessary to run a seperate NPM task.

<a name="0.2.0"></a>
## [0.2.0](https://github.com/dunbarcyber/cyclops/compare/0.2.0...0.1.0) (2017-04-27)

### Added

- Client code coverage in HTML format by running `npm run coverage`.
- Client code coverage pushed to coveralls through travis ci.
- `nodemon.json` configuration file.
- npm coverage scripts outlined in the sphinx documentation.
- `CYPHON_API_VERSION` environment variable.
- Chrome push notifications. Configured by adding `GCM_SENDER_ID` to `cyclops.env` after registering an application on [Firebase](https://firebase.google.com/). More information can be found in the documentation.
- ES6 pollyfills to webpack entry points.
- Webpack entry point for tests.
- React application root file `src/app/index.tsx`.

### Changed

- Updated documentation to reflect new folder structure and npm scripts.
- Server source code is now compiled through ts-node and served in memory instead of outputing javascript source files into `build`.
- Webpack now outputs to `dist` instead of `build`.
- Server source files moved from `src/express` to `server`.
- React application source files moved from `src/react` to `src`.
- Scss source files moved from `src/scss` to `src/styles`.
- `constants.js` renamed to `cyclops.config.ts`.
- Environment configuration variables moved from `server/constants.ts` to `cyclops.config.ts`.
- npm scripts which are outlined in the documentation.
- Removed the build step from `Dockerfile`. It's now done automatically via `postinstall` in `package.json`.
- Webpack config rewritten in typescript.
- Karma config rewritten in typescript.
- Moved server `tsconfig.json` to root.
- Webpack entry point `src/main.ts`.
- Location of API docs moved to `api-docs`.

### Removed

- server code coverage removed in order to add coverage to coveralls and to possibly deprecate the express server and instead serve Cyclops through the Cyphon system to lessen code complexity.
- `CYPHON_API_PATH` environment variable.

<a name="0.1.0"></a>
## [0.1.0](https://github.com/dunbarcyber/cyclops/releases/tag/0.1.0) (2017-04-05)