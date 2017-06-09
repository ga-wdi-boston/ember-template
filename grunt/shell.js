'use strict'

const ghPagesList = ['dist/']

module.exports = {
  'git-is-clean': {
    // `$(git status --porcelain)` will evaluate to the empty string if the
    // working directory is clean.
    // `test -z` will exit 0 (true) if its argument is an empty string.
    // If it doesn't exit true, `(git status && false)` will show why the
    // repository isn't clean and exit false causing the grunt tasks to end.
    command: 'test -z "$(git status --porcelain)"  || (git status && false)'
  },
  'git-push-master': {
    command: 'git push origin master'
  },
  'git-checkout-master': {
    command: 'git checkout master'
  },
  'deploy-prepare': {
    command: [
      'git branch -D gh-pages || echo "so not removed"',
      'git checkout --orphan gh-pages',
      'git rm --cached \'*\'',
      'ember build --environment=production'
    ].join(' && ')
  },
  'deploy-dist': {
    command: [
    'git add --force dist/',
    'git commit -m "deploy task"'
  ].join(' && ')
  },
  'deploy-publish': {
    command: [
     'git push origin :gh-pages || echo "so not removed"',
     'git subtree push --prefix dist origin gh-pages',
     'git clean -x -d --force --exclude=node_modules --exclude=bower_components',
     'git checkout master'
   ].join(' && ')
   }
}
