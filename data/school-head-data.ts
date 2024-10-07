export const schoolHeadData = {
  id: "9",
  firstName: "Kennedy",
  middleName: "Joe",
  lastName: "Jackson",
  email: "kennedy.joe.jackson@school.edu",
  emailVerified: true,
  image: "https://example.com/images/margaret.jpg",
  role: "schoolHead",
  yearsOfExperience: 20
};

export const listOfSchoolHeads = [
  {
    id: "9",
    firstName: "Kennedy",
    middleName: "Joe",
    lastName: "Jackson",
    email: "kennedy.joe.jackson@school.edu",
    emailVerified: true,
    image: "https://example.com/images/margaret.jpg",
    role: "schoolHead",
    yearsOfExperience: 20,
    isActive: true,
    startDate: "2022-01-01",
    endDate: null,
  },
  {
    id: "10",
    firstName: "Jane",
    middleName: "Doe",
    lastName: "Smith",
    email: "jane.doe.smith@school.edu",
    emailVerified: true,
    image: "https://example.com/images/jane.jpg",
    role: "schoolHead",
    yearsOfExperience: 15,
    isActive: false,
    startDate: "2021-01-01",
    endDate: "2022-01-01",
  },
  {
    id: "11",
    firstName: "John",
    middleName: "Reed",
    lastName: "Reeves",
    email: "john.reed.reeves@school.edu",
    emailVerified: true,
    image: "https://example.com/images/john.jpg",
    role: "schoolHead",
    yearsOfExperience: 10,
    isActive: false,
    startDate: "2020-01-01",
    endDate: "2021-01-01",
  },
]

export const schoolHeadColumns = [
  { accessorKey: "firstName", header: "First Name" },
  { accessorKey: "lastName", header: "Last Name" },
  { accessorKey: "email", header: "Email" },
  { accessorKey: "yearsOfExperience", header: "Years of Experience" },
  // add icon logo in active if is active check mark, if is not active x mark
  { accessorKey: "isActive", header: "Status" },
  { accessorKey: "startDate", header: "Start Date" },
  { accessorKey: "endDate", header: "End Date" },
]