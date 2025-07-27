import { data } from "autoprefixer";
import { v4 as uuidv4 } from "uuid"; // Add this at the top

const employees = [
  {
    id: 1,
    firstname: "Ahmad",
    email: "employee1@example.com",
    password: "123",
    taskNumbers: {
      active: 1,
      newTask: 1,
      completed: 1,
      failed: 1
    },
    tasks: [
      {
        active: true,
        newTask: true,
        completed: false,
        failed: false,
        title: "Prepare Monthly Report",
        description: "Compile and analyze sales data for the last month.",
        date: "2025-07-01",
        category: "Reporting"
      },
      {
        active: false,
        newTask: false,
        completed: true,
        failed: false,
        title: "Team Meeting",
        description: "Attend the quarterly team sync-up meeting.",
        date: "2025-06-25",
        category: "Meetings"
      },
      {
        active: false,
        newTask: false,
        completed: false,
        failed: true,
        title: "Client Follow-up",
        description: "Follow up with client regarding the proposal sent last week.",
        date: "2025-06-28",
        category: "Communication"
      }
    ]
  },
  {
    id: 2,
    firstname: "Fatimah",
    email: "employee2@example.com",
    password: "123",
    taskNumbers: {
      active: 2,
      newTask: 2,
      completed: 1,
      failed: 1
    },
    tasks: [
      {
        active: true,
        newTask: true,
        completed: false,
        failed: false,
        title: "Design Landing Page",
        description: "Create initial mockups for the new product landing page.",
        date: "2025-07-02",
        category: "Design"
      },
      {
        active: false,
        newTask: false,
        completed: true,
        failed: false,
        title: "Submit Timesheet",
        description: "Submit timesheet for June 2025.",
        date: "2025-06-30",
        category: "HR"
      },
      {
        active: false,
        newTask: false,
        completed: false,
        failed: true,
        title: "QA Testing",
        description: "Test the latest build and report bugs.",
        date: "2025-06-29",
        category: "Testing"
      },
      {
        active: true,
        newTask: true,
        completed: false,
        failed: false,
        title: "Update Style Guide",
        description: "Review and update the brand style guide.",
        date: "2025-07-05",
        category: "Documentation"
      }
    ]
  },
  {
    id: 3,
    firstname: "Bilal",
    email: "employee3@example.com",
    password: "123",
    taskNumbers: {
      active: 1,
      newTask: 1,
      completed: 1,
      failed: 1
    }, 
    tasks: [
      {
        active: true,
        newTask: true,
        completed: false,
        failed: false,
        title: "Inventory Check",
        description: "Perform monthly inventory audit.",
        date: "2025-07-03",
        category: "Operations"
      },
      {
        active: false,
        newTask: false,
        completed: true,
        failed: false,
        title: "Schedule Maintenance",
        description: "Book preventive maintenance for office equipment.",
        date: "2025-06-27",
        category: "Maintenance"
      },
      {
        active: false,
        newTask: false,
        completed: false,
        failed: true,
        title: "Vendor Meeting",
        description: "Meet with vendor to discuss contract renewal.",
        date: "2025-06-26",
        category: "Meetings"
      }
    ]
  },
  {
    id: 4,
    firstname: "Ayesha",
    email: "employee4@example.com",
    password: "123",
    taskNumbers: {
      active: 1,
      newTask: 1,
      completed: 1,
      failed: 1
    },
    tasks: [
      {
        active: true,
        newTask: false,
        completed: false,
        failed: false,
        title: "Onboarding New Hires",
        description: "Conduct onboarding sessions for new team members.",
        date: "2025-07-04",
        category: "HR"
      },
      {
        active: false,
        newTask: false,
        completed: true,
        failed: false,
        title: "Update Internal Docs",
        description: "Revise outdated policies in the employee handbook.",
        date: "2025-06-30",
        category: "Documentation"
      },
      {
        active: false,
        newTask: true,
        completed: false,
        failed: false,
        title: "Payroll Processing",
        description: "Process payroll for the month of June.",
        date: "2025-07-01",
        category: "Finance"
      },
      {
        active: false,
        newTask: false,
        completed: false,
        failed: true,
        title: "Security Training",
        description: "Attend mandatory cybersecurity awareness training.",
        date: "2025-06-24",
        category: "Training"
      }
    ]
  },
  {
    id: 5,
    firstname: "Zayd",
    email: "employee5@example.com",
    password: "123",
    taskNumbers: {
      active: 2,
      newTask: 2,
      completed: 1,
      failed: 1
    },
    tasks: [
      {
        active: true,
        newTask: true,
        completed: false,
        failed: false,
        title: "Market Research",
        description: "Research competitors in the emerging markets.",
        date: "2025-07-06",
        category: "Research"
      },
      {
        active: false,
        newTask: false,
        completed: true,
        failed: false,
        title: "Product Feedback Review",
        description: "Analyze customer feedback on the beta release.",
        date: "2025-06-29",
        category: "Product"
      },
      {
        active: false,
        newTask: false,
        completed: false,
        failed: true,
        title: "Proposal Draft",
        description: "Create draft for new client proposal.",
        date: "2025-06-30",
        category: "Sales"
      },
      {
        active: true,
        newTask: true,
        completed: false,
        failed: false,
        title: "Social Media Campaign",
        description: "Plan July’s social media content calendar.",
        date: "2025-07-07",
        category: "Marketing"
      }
    ]
  }
];

const admin = [
  {
    id: 1,
    firstname: "Amir",
    email: "admin@example.com",
    password: "123"
  }
];

// Auto-generate IDs for tasks if missing
employees.forEach(emp => {
  emp.tasks = emp.tasks.map(task => ({
    ...task,
    id: task.id || uuidv4()
  }))
})



// Only set localStorage if not already set
export const setLocalStorage = (customEmployees) => {
  if (customEmployees) {
    localStorage.setItem("employees", JSON.stringify(customEmployees));
  } else if (!localStorage.getItem("employees")) {
    localStorage.setItem("employees", JSON.stringify(employees));
  }

  if (!localStorage.getItem("admin")) {
    localStorage.setItem("admin", JSON.stringify(admin));
  }
};


// Safe getter
export const getLocalStorage = () => {
  const storedEmployees = JSON.parse(localStorage.getItem("employees"));
  const storedAdmin = JSON.parse(localStorage.getItem("admin"));
  return {
    employees: storedEmployees || [],
    admin: storedAdmin || []
  };
};

