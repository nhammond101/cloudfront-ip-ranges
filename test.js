const main = require('./src')

main
  .updateIPs()
  .then((ips) => {
    if (ips.length > 0) {
      console.log(`Success for non-versioned: Got ${ips.length} IPs`)
    } else {
      throw 'Fail for non-versioned: No IPs received'
    }
  })
  .then(() => {
    return main.updateIPs({ versioned: true })
  })
  .then((versionedIPs) => {
    if (versionedIPs.V4.length > 0 && versionedIPs.V6.length > 0) {
      console.log(`Success for versioned: Got ${versionedIPs.V4.length} V4 and ${versionedIPs.V6.length} V6 IPs`)
    } else {
      throw 'Fail for versioned: No IPs received '
    }
  })
  .then(() => {
    const mockExpressApp = {
      set: (parameter, values) => {
        mockExpressApp[parameter] = values
      }
    }

    return main.updateTrustProxy(mockExpressApp)
      .then(() => {
        if (mockExpressApp['trust proxy'].length > 0) {
          console.log(`Success for direct trust proxy update: ${mockExpressApp['trust proxy'].length} proxies were set`)
          return
        } else {
          throw 'Fail for direct trust proxy update: no Express app parameters were set'
        }
      })
  })
  .then(() => {
    process.exit(0)
  })
  .catch((error) => {
    console.log(error)
    process.exit(1)
  })

setTimeout(() => {
  console.log('Fail: A request timeouted')
  process.exit(1)
}, 20000)
