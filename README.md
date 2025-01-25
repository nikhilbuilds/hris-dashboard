# HRIS Dashboard

A modern, responsive, and scalable Human Resource Information System (HRIS) dashboard built with Next.js, GraphQL, and Material-UI.

---

## **Table of Contents**

1. [Overview](#overview)
2. [Live Demo](#live-demo)
3. [Screenshots](#screenshots)
4. [Features](#features)
5. [Assumptions](#Assumptions)
6. [Tech Stack](#tech-stack)
7. [Setup](#setup)
8. [Usage](#usage)
9. [Project Structure](#project-structure)
10. [GraphQL Schema](#graphql-schema)
11. [Future Enhancements](#future-enhancements)

---

## **Overview**

The HRIS Dashboard provides key HR data in an intuitive interface. It includes features like employees on leave, birthdays this week, and team overview statistics.

---

## **Live Demo**

The application is live on Vercel:

[**View HRIS Dashboard**](https://hris-dashboard-theta.vercel.app/)

---

## **Screenshots**

### Team Overview

![Team Overview](https://hris-dashboard-theta.vercel.app/team-overview.png)

### Employees on Leave

![Employees on Leave](https://hris-dashboard-theta.vercel.app/employee-on-leave.png)

### Birthdays This Week

![Birthdays This Week](https://hris-dashboard-theta.vercel.app/birthday.png)

---

## **Features**

- **Team Overview**:

  - Total employees
  - Active employees
  - Employees on leave
  - Department breakdown

- **Employees on Leave Today**:

  - Displays a list of employees currently on leave with filters and export functionality.
  - Pagination with 10 items per page
  - Department filtering
  - CSV export functionality
  - Responsive table layout

- **Birthdays This Week**:

  - Shows upcoming birthdays for next 7 days
  - CSV export functionality

- **Responsive Design**: Optimized for desktop and mobile.
- **Export to CSV**: Export data with a single click.

---

## **Assumptions**

1. **Birthdays This Week**:

   - Birthdays are calculated from **today** to **7 days from today**.
   - This ensures the list focuses on upcoming birthdays rather than fixed week boundaries.

2. **Pagination for Birthdays**:

   - Pagination was not added to the "Birthdays This Week" table as the expected number of records is typically low and manageable in a single view.

3. **Employees on Leave**:

   - The "Employees on Leave Today" list includes employees whose leave dates include the current date.
   - Pagination was implemented here as the number of records can grow significantly.

4. **Mock Data**:
   - Mock data is used for employees, departments, and leave records for demonstration purposes.
   - Relational data between employees and departments was simulated for better realism.

---

## **Tech Stack**

- **Frontend**: Next.js (React)
- **GraphQL**: Apollo Server & Client
- **UI Framework**: Material-UI
- **Utility Libraries**: moment.js

---

## **Setup**

### **Prerequisites**

- Node.js (v16 or higher)
- npm or yarn

### **Installation**

1. Clone the repository:

   ```bash
   git clone https://github.com/nikhilbuilds/hris-dashboard/
   cd hris-dashboard
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables, create

   ```bash
    .env
   ```

   Add the following variables

   ```bash
   GRAPHQL_URI = http://localhost:3000
   ```

4. Run the development server:

   ```bash
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:3000` to view the dashboard.

---

### **Usage**

1. Team Overview: View aggregated statistics on the homepage.

2. Employees on Leave: Navigate to /employees-on-leave to view and filter employees on leave today.

3. Birthdays: Go to /birthdays to see upcoming birthdays.

4. Export Data: Use the export button on each page to download data in CSV format.

---

### **Project Structure**

```bash
src/
├── components/     # Reusable components
├── context/        # Context API
├── lib/            # Utility functions and GraphQL setup
├── pages/          # Page components, NextJS page routing
├── types/          # TypeScript types
├── .env            # Environment variables
```

---

### **GraphQL Schema**

Queries

- employeesOnLeave(page: Int, limit: Int, department: String)
- birthdaysThisWeek
- teamOverview

Sample Schema

```bash

    type Query {
        employeesOnLeave(page: Int, limit: Int, department: String): EmployeesOnLeaveResult
        birthdaysThisWeek: [Employee!]!
        teamOverview: TeamStats!
        getDepartmentList: [Departments!]!
    }


    type Employee {
        id: ID!
        name: String!
        department: String!
        leaveType: String
        leaveStart: String
        leaveEnd: String
        dob: String
    }


    type Departments {
        id: ID!
        name: String!
    }


    type TeamStats {
        totalEmployees: Int!
        activeEmployees: Int!
        employeesOnLeave: Int!
        departmentBreakdown: [DepartmentStats!]!
    }


    type DepartmentStats {
        department: String!
        count: Int!
    }


    type EmployeesOnLeaveResult {
        employees: [Employee!]!
        totalCount: Int!
    }

```

---

### **Future Enhancements**

1. Add additional visualizations (e.g., charts for team stats).
2. Test coverage (unit and integration tests).
3. Implement authentication and user profiles.
4. Add more filtering options (date ranges, leave types).
5. Add search functionality.
6. Implement data caching.
7. Add more detailed employee profiles
