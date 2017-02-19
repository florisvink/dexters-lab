'use strict'

import LodashWrapper from './LodashWrapper'

export default function LodashLabService (iframe) {
  const lodashLab = iframe.contentWindow
  const runOnReady = (done) => {
    if (lodashLab.document.readyState === 'complete') {
      return done(lodashLab)
    }

    lodashLab.onload = () => done(lodashLab)
  }

  return {
    switchLib: (version, done = () => null) => {
      runOnReady(() => lodashLab.switchLib('lodash', version, done))
    },
    execute: (body, data) => lodashLab.execute(LodashWrapper, body, data),
    version: () => {
      return lodashLab._ ? lodashLab._.VERSION : null
    }
  }
}
