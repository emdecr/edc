<h1 align="center">
    <a href="https://emilydelacruz.com" target="_blank"><img src="https://emilydelacruz.com/files/connection.png" alt="atom graphic" width="150"></a>
    <br>
    emilydelacruz.com
</h1>

<p align="center"><em>Personal site.</em></p>

<p align="center">
    <a href="https://github.com/emdecr/edc/releases">
        <img src="https://img.shields.io/badge/release-v1.0-blue.svg" alt="release badge version 1.0">
    </a>
    <a href="https://github.com/nuxt/nuxt.js">
        <img src="https://img.shields.io/badge/nuxt.js-2.9.2-blue.svg" alt="nuxt.js badge version 2.9.2">
    </a>
    <a href="https://github.com/WordPress/WordPress">
        <img src="https://img.shields.io/badge/WP-5.2.3-blue.svg" alt="WordPress badge version 5.2.3">
    </a>
    <a href="https://emilydelacruz.com">
        <img src="https://img.shields.io/badge/%3C%2F%3E%20with%20%E2%99%A5%EF%B8%8E%20by-emdecr-red.svg" alt="emdecr badge">
    </a>
    
</p>

<p align="center">
    <a href="#intro">Intro</a> |
    <a href="#installation">Installation</a> |
    <a href="#local-setup">Local Setup</a> |
    <a href="#server-setup">Server Setup</a> |
    <a href="#credits">Credits</a> 
</p>

## Intro

This is a hybrid environment using WordPress to manage content, and Nuxt.js to serve a front-end application.

## Installation

To clone and run this application, you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer.

## Local Setup

```bash
# Clone this repository
## You can use the repo name as the dir name
$ git clone https://github.com/emdecr/edc

## OR Use whatever dir name
$ mkdir [insert dir name here]
$ cd [insert dir name here]
$ git clone https://github.com/emdecr/edc .
```

### WordPress

```bash
# Go into the repository and the cms dir
$ cd edc/cms

# Make a wordpress dir
$ mkdir wordpress

# Clone WP in wordpress dir
$ cd wordpress
$ git clone https://github.com/WordPress/WordPress .

# Create a working branch from the right release
$ git checkout tags/5.2.3
$ git checkout -b stable-5.2.3

# NTS: You also need vars for the Pinterest API
$ edc/cms/custom/themes/edc/includes/functions/endpoints/endpoint_vars.php
```

#### Installed Plugins

- [Meta Box](https://en-ca.wordpress.org/plugins/meta-box/)
- [Meta Box - CPT](https://metabox.io/plugins/custom-post-type/)
- [Meta Box Group](https://metabox.io/plugins/meta-box-group/)
- [Meta Box REST API](https://metabox.io/plugins/mb-rest-api/)
- [TinyMCE Advanced](https://en-ca.wordpress.org/plugins/tinymce-advanced/)
  - Because sometimes the paragraph tags get stripped in WYSIWYGs

### Nuxt

```bash
# Go into the repository and the app dir
$ cd edc/app

# Install dependencies
$ npm install

# create an .env file
$ touch .env

# Run the app
$ npm run dev
```

#### Extra NPM Packages

- [cross-env](https://www.npmjs.com/package/cross-env)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [Google Analytics module for Nuxt.js](https://nuxtjs.org/faq/google-analytics/)

#### Installed Plugins

- [Animate on Scroll](https://github.com/michalsnik/aos/tree/v2)

#### Default head entries and modules in nuxt.config.js

_Note_: Change the keys or project IDs

- n/a

#### Pre-processors

Need to SASS? Check the [official Nuxt.js docs](https://nuxtjs.org/faq/pre-processors/). There's a base SASS setup in the assets dir, but just delete it if you don't need it.

## Server Setup

Link to docs coming soon.

## Credits

Badges in this README.md provided by [shields.io](https://shields.io/#your-badge).
