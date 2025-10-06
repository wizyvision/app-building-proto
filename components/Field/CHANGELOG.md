# Changelog

All notable changes to the Field component will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Version 1: Basic field layout with drag handle and content section
- Version 2: Compact design with 6-dot vertical drag icon
- Version 5: Advanced design with hover-activated drag handle and filled text field variant

### Changed
- Version 5: Updated text field to use filled variant with white background
- Version 5: Hover state shows #f0f0f0 background on label field
- Version 5: Focus state shows 2px primary color border bottom
- Version 5: Action icons (edit, menu) use theme.palette.text.secondary color (#595959)
- Version 5: Fixed height to 40px for text field consistency
- Version 5: Font size remains 16px in both default and editing states

### Fixed
- Version 5: Container maintains 64px height when drag icon appears on hover
- Version 5: Drag handle visibility uses opacity transitions to prevent layout shift
