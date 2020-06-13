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

This is a hybrid environment using WordPress to manage content, and Next.js to serve a front-end application.

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
$ cd edc/data

# Make a wordpress dir
$ mkdir wordpress

# Clone WP in wordpress dir
$ cd wordpress
$ git clone https://github.com/WordPress/WordPress .

# Create a working branch from the right release
$ git checkout tags/5.4.2
$ git checkout -b stable-5.4.2

# NTS: You also need vars in the cms
$ edc/data/custom/themes/edc/includes/functions/endpoints/endpoint_vars.php
```

#### Installed Plugins

- [Meta Box](https://en-ca.wordpress.org/plugins/meta-box/)
- [Meta Box - CPT](https://metabox.io/plugins/custom-post-type/)
- [Meta Box Group](https://metabox.io/plugins/meta-box-group/)
- [Meta Box REST API](https://metabox.io/plugins/mb-rest-api/)
- [Meta Box Blocks](https://metabox.io/plugins/mb-blocks/)
- [Meta Box Revisions](https://metabox.io/plugins/mb-revision/)
- [Meta Box Settings Page](https://metabox.io/plugins/mb-settings-page/)
- [Meta Box Include Exclude](https://metabox.io/plugins/meta-box-include-exclude/)
- [Advanced Rich Text Tools for Gutenberg](https://wordpress.org/plugins/advanced-rich-text-tools/)
- [TinyMCE Advanced](https://en-ca.wordpress.org/plugins/tinymce-advanced/)
  - Because sometimes the paragraph tags get stripped in WYSIWYGs

### Next.js

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

## Server Setup

Coming in a few.

## Credits

Badges in this README.md provided by [shields.io](https://shields.io/#your-badge).
