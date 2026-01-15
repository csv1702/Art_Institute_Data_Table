# Art Institute of Chicago – Artwork Data Table

## Project Overview

This project is a React + TypeScript application that displays artwork data from the Art Institute of Chicago public API in a tabular format.

The application uses PrimeReact DataTable to implement:

- Server-side pagination
- Checkbox-based row selection
- Persistent row selection across pages
- A custom overlay panel for selecting a specific number of rows

Efficient pagination and row selection are implemented without prefetching or storing unnecessary data from other pages.

---

## Live Demo & Repository

**Deployment Link :**https://art-institute-data-table.netlify.app/

---

## Tech Stack

- React (with Hooks)
- TypeScript
- Vite (project setup & build tool)
- PrimeReact (DataTable, OverlayPanel, UI components)
- PrimeIcons
- PrimeFlex
- Netlify (deployment)

---

## API Used

- **Art Institute of Chicago API**: https://api.artic.edu/api/v1/artworks
- Data is fetched page-by-page using server-side pagination.

---

## Features Implemented

### Server-Side Pagination

- Data is fetched only for the current page
- API is called whenever the user changes the page
- No prefetching of future or previous pages

### Artwork Data Displayed

The following fields are shown in the table:

- Title
- Place of Origin
- Artist Display
- Inscriptions
- Start Date
- End Date

### Row Selection (Checkboxes)

- Individual row selection
- Select / deselect all rows on the current page
- Selection works seamlessly with pagination

### Persistent Row Selection (Key Requirement)

- Selected rows remain selected when navigating between pages
- No artwork objects from other pages are stored
- No additional API calls are made to maintain selection state

**Strategy used:**

- Only artwork IDs are stored using a Set
- When a page loads, selected rows are derived by matching IDs with current page data
- This approach ensures correctness, performance, and compliance with the assignment constraints.

### Custom Row Selection Overlay

- An overlay panel allows the user to enter a number (N)
- Selects up to N rows from the current page only
- If N exceeds available rows, only visible rows are selected
- No API calls or page prefetching are triggered

---

## Core Logic Summary

- The application separates selection intent from data
- Only row IDs are persisted across pages
- Selected rows are derived dynamically per page
- This avoids memory issues, unnecessary API calls, and rejected patterns

---

## Getting Started (Local Setup)

### 1️- Clone the Repository

```bash
git clone https://github.com/csv1702/Art_Institute_Data_Table.git
cd Art_Institute_Data_Table
```

### 2️- Install Dependencies

```bash
npm install
```

### 3️- Run Development Server

```bash
npm run dev
```

### 4️- Build for Production

```bash
npm run build
```

---

## Author

Chaitanya
