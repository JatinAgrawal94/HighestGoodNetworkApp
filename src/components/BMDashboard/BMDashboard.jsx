import { Container } from 'reactstrap';
import ProjectsList from './Projects/ProjectsList';
import ProjectSelectForm from './Projects/ProjectSelectForm';
import './BMDashboard.css';
//TO DO: add error state, add loading state, update dummy projects to a more complex structure (see database and wireframe)
const dummyProjects = [
  {
    projectId: 1,
    projectName: 'Big project',
    tools: [
      {
        inventoryItemId: 1,
        title: 'forklift',
        image: 'https://www.theforkliftcenter.com/images/forklift-hero-left.png',
        rentedOnDate: '',
      },
      {
        inventoryItemId: 2,
        title: 'saw',
        image: 'https://www.theforkliftcenter.com/images/forklift-hero-left.png',
        rentedOnDate: '',
      },
    ],
    materials: [
      {
        inventoryItemId: 3,
        title: 'soil mix',
        image: 'https://www.theforkliftcenter.com/images/forklift-hero-left.png',
        amountTotal: '100lb',
        amountUsed: '80lb',
      },
      {
        inventoryItemId: 4,
        title: '1/2" pea gravel',
        image: 'https://www.theforkliftcenter.com/images/forklift-hero-left.png',
        amountTotal: '100lb',
        amountUsed: '95lb',
      },
    ],
    people: [
      {
        personId: 1,
        personName: 'Dora',
        personLastName: 'Kimberly',
        role: 'Carpenter',
        team: 'XYZ',
        currentTask: 'Stud wall construction',
        totalHrs: 169,
        todayHrs: 5.5,
      },
      {
        personId: 2,
        personName: 'Cailin',
        personLastName: 'Colby',
        role: 'Volunteer',
        team: 'ABC',
        currentTask: 'Foundation concreting',
        totalHrs: 15,
        todayHrs: 5,
      },
      {
        personId: 3,
        personName: 'John',
        personLastName: 'Smith',
        role: 'Role A',
        team: 'XYZ',
        currentTask: 'Task 1',
        totalHrs: 169,
        todayHrs: 5.5,
      },
    ],
  },
  {
    projectId: 2,
    projectName: 'Bigger project',
    tools: [
      {
        inventoryItemId: 1,
        title: 'forklift',
        image: 'https://www.theforkliftcenter.com/images/forklift-hero-left.png',
        rentedOnDate: '',
      },
      {
        inventoryItemId: 2,
        title: 'saw',
        image: 'https://www.theforkliftcenter.com/images/forklift-hero-left.png',
        rentedOnDate: '',
      },
    ],
    materials: [
      {
        inventoryItemId: 3,
        title: 'soil mix',
        image: 'https://www.theforkliftcenter.com/images/forklift-hero-left.png',
        amountTotal: '100lb',
        amountUsed: '80lb',
      },
      {
        inventoryItemId: 4,
        title: '1/2" pea gravel',
        image: 'https://www.theforkliftcenter.com/images/forklift-hero-left.png',
        amountTotal: '100lb',
        amountUsed: '95lb',
      },
    ],
    people: [
      {
        personId: 1,
        personName: 'Dora',
        personLastName: 'Kimberly',
        role: 'Carpenter',
        team: 'XYZ',
        currentTask: 'Stud wall construction',
        totalHrs: 169,
        todayHrs: 5.5,
      },
      {
        personId: 2,
        personName: 'Cailin',
        personLastName: 'Colby',
        role: 'Volunteer',
        team: 'ABC',
        currentTask: 'Foundation concreting',
        totalHrs: 15,
        todayHrs: 5,
      },
      {
        personId: 3,
        personName: 'John',
        personLastName: 'Smith',
        role: 'Role A',
        team: 'XYZ',
        currentTask: 'Task 1',
        totalHrs: 169,
        todayHrs: 5.5,
      },
    ],
  },
  {
    projectId: 3,
    projectName: 'Important project',
    tools: [
      {
        inventoryItemId: 1,
        title: 'forklift',
        image: 'https://www.theforkliftcenter.com/images/forklift-hero-left.png',
        rentedOnDate: '',
      },
      {
        inventoryItemId: 2,
        title: 'saw',
        image: 'https://www.theforkliftcenter.com/images/forklift-hero-left.png',
        rentedOnDate: '',
      },
    ],
    materials: [
      {
        inventoryItemId: 3,
        title: 'soil mix',
        image: 'https://www.theforkliftcenter.com/images/forklift-hero-left.png',
        amountTotal: '100lb',
        amountUsed: '80lb',
      },
      {
        inventoryItemId: 4,
        title: '1/2" pea gravel',
        image: 'https://www.theforkliftcenter.com/images/forklift-hero-left.png',
        amountTotal: '100lb',
        amountUsed: '95lb',
      },
    ],
    people: [
      {
        personId: 1,
        personName: 'Dora',
        personLastName: 'Kimberly',
        role: 'Carpenter',
        team: 'XYZ',
        currentTask: 'Stud wall construction',
        totalHrs: 169,
        todayHrs: 5.5,
      },
      {
        personId: 2,
        personName: 'Cailin',
        personLastName: 'Colby',
        role: 'Volunteer',
        team: 'ABC',
        currentTask: 'Foundation concreting',
        totalHrs: 15,
        todayHrs: 5,
      },
      {
        personId: 3,
        personName: 'John',
        personLastName: 'Smith',
        role: 'Role A',
        team: 'XYZ',
        currentTask: 'Task 1',
        totalHrs: 169,
        todayHrs: 5.5,
      },
    ],
  },
  {
    projectId: 4,
    projectName: 'Very important project',
    tools: [
      {
        inventoryItemId: 1,
        title: 'forklift',
        image: 'https://www.theforkliftcenter.com/images/forklift-hero-left.png',
        rentedOnDate: '',
      },
      {
        inventoryItemId: 2,
        title: 'saw',
        image: 'https://www.theforkliftcenter.com/images/forklift-hero-left.png',
        rentedOnDate: '',
      },
    ],
    materials: [
      {
        inventoryItemId: 3,
        title: 'soil mix',
        image: 'https://www.theforkliftcenter.com/images/forklift-hero-left.png',
        amountTotal: '100lb',
        amountUsed: '80lb',
      },
      {
        inventoryItemId: 4,
        title: '1/2" pea gravel',
        image: 'https://www.theforkliftcenter.com/images/forklift-hero-left.png',
        amountTotal: '100lb',
        amountUsed: '95lb',
      },
    ],
    people: [
      {
        personId: 1,
        personName: 'Dora',
        personLastName: 'Kimberly',
        role: 'Carpenter',
        team: 'XYZ',
        currentTask: 'Stud wall construction',
        totalHrs: 169,
        todayHrs: 5.5,
      },
      {
        personId: 2,
        personName: 'Cailin',
        personLastName: 'Colby',
        role: 'Volunteer',
        team: 'ABC',
        currentTask: 'Foundation concreting',
        totalHrs: 15,
        todayHrs: 5,
      },
      {
        personId: 3,
        personName: 'John',
        personLastName: 'Smith',
        role: 'Role A',
        team: 'XYZ',
        currentTask: 'Task 1',
        totalHrs: 169,
        todayHrs: 5.5,
      },
    ],
  },
];

export const BMDashboard = () => {
  return (
    <Container className="justify-content-center align-items-center mw-80 px-4">
      <header className="bm-dashboard__header">
        <h1>Building and Inventory Management Dashboard</h1>
      </header>
      <main>
        <ProjectSelectForm projects={dummyProjects} />
        <ProjectsList projects={dummyProjects} />
      </main>
    </Container>
  );
};

export default BMDashboard;
