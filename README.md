# Cloudflare IP ranges

[![npm](https://img.shields.io/npm/v/cloudflare-ip-ranges.svg?style=flat-square)](https://www.npmjs.com/package/cloudflare-ip-ranges)
[![CircleCI (all branches)](https://img.shields.io/circleci/project/github/sampsakuronen/cloudflare-ip-ranges.svg?style=flat-square)](https://circleci.com/gh/sampsakuronen/cloudflare-ip-ranges)
![npm](https://img.shields.io/npm/dm/cloudflare-ip-ranges.svg?style=flat-square)
![Dependents (via libraries.io)](https://img.shields.io/librariesio/dependents/npm/cloudflare-ip-ranges.svg?style=flat-square)

Get Cloudflare IPs for use in trust proxy configurations. You might also be interested in [Cloudflare authenticated origin pulls](https://support.cloudflare.com/hc/en-us/articles/204899617-Authenticated-Origin-Pulls).

This package will be updated if Cloudflare ever decides to change the endpoints for retrieving current IPs. We will most likely never see a breaking change for this package.

<br>
<p align="center">
  <img width="460" src="https://github.com/sampsakuronen/cloudflare-ip-ranges/raw/master/README-image.png?raw=true">
</p>

## Install

Requires node `7` or newer.

    npm install --save cloudflare-ip-ranges

## Usage

For use in an Express environment please see [Express documentation on trust proxies](https://expressjs.com/en/guide/behind-proxies.html).

It is recommended to use `setInterval` for updating the IP list periodically.

#### Directly update trust proxies for an Express app

    const cfIPranges = require('cloudflare-ip-ranges')

    cfIPranges.updateTrustProxy(app)
    
    setInterval(() => {
      cfIPranges.updateTrustProxy(app)
    }, 1000*60*60*12)

#### Getting a list of IPs and updating trust proxies manually

Useful if you need to list other proxies alongside the Cloudflare ones.

    const cfIPranges = require('cloudflare-ip-ranges')
    
    cfIPranges.updateIPs()
      .then((ips) => {
        app.set('trust proxy', ['loopback', ...ips])
      })

## API

Method | Info
------------ | -------------
updateIPs | By default returns `Promise<string[]>`. By specifying `{ versioned: true }` as an argument you get an object that contains `V4` and `V6` separately (`Promise<{ V4: string[], V6: string[] }>`).
updateTrustProxy | Takes an Express app instance as an argument. Returns `Promise<void>`.

## Changelog

Version | Release notes
------------ | -------------
2.1.0 | Adds the possibility of directly updating trust proxies for an Express app using `updateTrustProxy`.
2.0.0 | Change default behavior of `updateIPs` into returning a flat list of IPs.
1.0.1 | Add info to documentation about using `setInterval` for keeping the IPs fresh.
1.0.0 | Initial release.
