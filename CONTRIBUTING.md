# Hack Reactor Contribution Guidelines

These guidelines are a living document and are intended to make contributing to
Hack Reactor projects a more pleasant experience for everyone. As such, it's
expected to change over time. If there's anything that would help make your work easier or more efficient, please submit a pull request.

## Specific Workflow

Files should encaspulate a single conceptual idea. Files should be named following the same format as commit messages.

<!-- ### Overview

- Fork the repo
- Create a feature branch, namespaced by.
  - bug/...
  - feat/...
  - test/...
  - doc/...
  - refactor/...
- Make commits to your feature branch. Prefix each commit like so:
  - (feat) Added a new feature
  - (fix) Fixed inconsistent tests [Fixes #0]
  - (refactor) ...
  - (cleanup) ...
  - (test) ...
  - (doc) ...
- Make a pull request with your changes directly to master. Include a
  description of your changes.
- Wait for one of the reviewers to look at your code and either merge it or
  give feedback which you should adapt to. -->


## General Workflow

<!-- 1. Follow Hack Reactor's [git workflow][]. -->
1. Fork the repo
1. Create a feature branch, namespaced by.
  - bug/...
  - feat/...
  - test/...
  - doc/...
  - refactor/...
1. Make commits to your feature branch. Prefix each commit like so:
  - (feat) Added a new feature
  - (fix) Fixed inconsistent tests [Fixes #0]
  - (refactor) ...
  - (cleanup) ...
  - (test) ...
  - (doc) ...
1. When you've finished with your fix or feature, submit a [pull request][]
   directly to master. Include a description of your changes.
1. Your pull request's build status will appear on the pull request page. If
   your build fails, click 'Details' to find out why and fix the issue.
1. Assign a task to your code reviewer in Asana. Include a link to the pull
   request.
1. Your pull request will be reviewed by another maintainer. The point of code
   reviews is to help keep the codebase clean and of high quality and, equally
   as important, to help you grow as a programmer. If your code reviewer
   requests you make a change you don't understand, ask them why.
1. Fix any issues raised by your code reviwer, and push your fixes as a single
   new commit.
1. Once the pull request has passed CI and review, it can be merged.


## Pull Requests

1. Uphold the current code standard:
    - Keep your code [DRY][].
    - Apply the [boy scout rule][].
    - Follow Hack Reactor's [style guide][].
1. Run the [tests][] before submitting a pull request.
1. Tests are very, very important. Submit tests if your pull request contains
   new, testable behavior.
1. Your pull request is comprised of a single ([squashed][]) commit.


<!-- Links -->
[git workflow]: https://github.com/hackreactor/instructor-wiki/wiki/Git-Workflow#hack-reactor-internal-git-workflow
[pull request]: https://help.github.com/articles/using-pull-requests
[DRY]: http://programmer.97things.oreilly.com/wiki/index.php/Don%27t_Repeat_Yourself
[boy scout rule]: http://programmer.97things.oreilly.com/wiki/index.php/The_Boy_Scout_Rule
[style guide]: https://github.com/hackreactor/style-guide#hack-reactor-style-guide
[tests]: https://github.com/hackreactor/bookstrap#tasks
[squashed]: http://gitready.com/advanced/2009/02/10/squashing-commits-with-rebase.html
<!-- End links -->
