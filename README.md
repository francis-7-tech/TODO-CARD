# Stage 0 - TODO-CARD

A simple todo list app built with HTML, CSS, and JavaScript.

## Features
- Add tasks
- Delete tasks
- Mark tasks as complete

## Tech Stack
- HTML
- CSS
- JavaScript

## Stage 1a — Advanced Todo Card Update
What changed from Stage 0
Added edit mode for updating todo content
Added status control dropdown (Pending, In Progress, Done)
Added priority indicator with dynamic visual styles (Low, Medium, High)
Implemented expand/collapse for long descriptions
Added overdue detection with visual indicator
Improved time logic with live updates (minutes, hours, days)
Added save and cancel behavior in edit mode
Synced checkbox and status logic
Added responsive layout improvements
Added required data-testid attributes for testing

## New Design Decisions
Used edit mode container instead of inline editing for better control
Used select dropdown for status and priority for consistency
Implemented collapsible description to prevent long card overflow
Used visual priority indicator (color/icon/border) instead of plain text
Used live time updates with interval timer
Used semantic HTML elements for accessibility
Used flexbox layout for responsive alignment

## Known Limitations
Data is not persisted after page refresh
Only supports a single todo card (not full app)
Time updates depend on browser running (no background sync)
Edit form focus trapping not fully implemented (optional requirement)


## Accessibility Notes
All edit inputs use <label for=""> associations
Status dropdown includes accessible name
Expand/collapse toggle uses aria-expanded
Collapsible section linked using aria-controls
Time updates use aria-live="polite"
Keyboard navigation follows required tab order
Buttons use semantic <button> elements
Form controls are keyboard accessible