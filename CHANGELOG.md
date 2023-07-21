# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Add version property (`v`) to `sync` storage
- Add version, theme to backup data
- Migrate data on install/upload to current version (v1)
- Feedback link to settings page

### Changed

- Removed student ids, moved to string array for students in class
- Moved history from `sync` to `local` storage
- Migrated to Manifest V3

## [1.4.2] - 2022-08-22

### Fixes

- Bulk add students one per line (#32)

## [1.4.1] - 2021-08-16

### Fixes

- Included icon images in package

## [1.4] - 2021-08-14

### Added

- Pop out mode
- Remember history/state
- Version to settings page

### Changed

- Alphabetize classes, students

### Fixes

- #21

## [1.3] - 2020-09-26

### Added

- Changelog
- "Bulk add" page that supports two formats

### Changed

- Darkened the default input outline
- Build script to be more explicit

### Fix

- Labelled all back buttons