const base = {
  require: ['steps/**/*.js', 'support/**/*.js'],
  format: ['progress', 'json:reports/cucumber-report.json'],
  paths: ['features/**/*.feature']
};

const profile = (tags) => ({ ...base, tags });

module.exports = {
  default:   base,
  account:   profile('@account'),
  bookstore: profile('@bookstore')
};