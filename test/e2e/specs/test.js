// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

module.exports = {
  'default e2e tests': function (browser) {
    // automatically uses dev Server port from /config.index.js
    // default: http://localhost:8080
    // see nightwatch.conf.js
    const devServer = browser.globals.devServerURL

    browser
      .url(devServer)
      .waitForElementVisible('#app', 5000)
      .assert.elementPresent('.brand')
      .assert.containsText('h1', 'NYT News Aggregator')
      .assert.elementCount('.row', 3)
      .pause(1000)
      .setValue('input[type=text]', '"A Reborn Uber Faces Its First Big Reckoning"')
      .waitForElementPresent('.image', 3000)
      .pause(4000)
      .assert.elementCount('.card', 1)
      .assert.containsText('.date', '2018-06-25')
      .end()
  }
}
