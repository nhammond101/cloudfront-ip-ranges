# Cloudfront IP ranges

[![npm](https://img.shields.io/npm/v/cloudfront-ip-ranges.svg?style=flat-square)](https://www.npmjs.com/package/cloudfront-ip-ranges)
![npm](https://img.shields.io/npm/dm/cloudfront-ip-ranges.svg?style=flat-square)
![Dependents (via libraries.io)](https://img.shields.io/librariesio/dependents/npm/cloudfront-ip-ranges.svg?style=flat-square)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

Get Cloudfront IPs for use in trust proxy configurations.

This package will be updated if Cloudfront ever decides to change the endpoints for retrieving current IPs. We will most likely never see a breaking change for this package.

<br>
<p align="center">
  <img width="460" src="https://github.com/nhammond101/cloudfront-ip-ranges/raw/main/README-image.png?raw=true">
</p>

## Install

Requires node `8` or newer.

    npm install --save cloudfront-ip-ranges

## Usage

For use in an Express environment please see [Express documentation on trust proxies](https://expressjs.com/en/guide/behind-proxies.html).

It is recommended to use `setInterval` for updating the IP list periodically.

#### Directly update trust proxies for an Express app

    const cfIPranges = require('cloudfront-ip-ranges')

    cfIPranges.updateTrustProxy(app)
    
    setInterval(() => {
      cfIPranges.updateTrustProxy(app)
    }, 1000*60*60*12)

#### Getting a list of IPs and updating trust proxies manually

Useful if you need to list other proxies alongside the Cloudfront ones.

    const cfIPranges = require('cloudfront-ip-ranges')
    
    cfIPranges.updateIPs()
      .then((ips) => {
        app.set('trust proxy', ['loopback', ...ips])
      })

## API

Method | Info
------------ | -------------
getIpRange | By default returns `Promise<string[]>`.
updateTrustProxy | Takes an Express app instance as an argument. Returns `Promise<void>`.

## Changelog

Version | Release notes
------------ | -------------
0.1.2 | Dependency updates
0.1.1 | Added local IP to trust proxy
0.1.0 | Initial release.
