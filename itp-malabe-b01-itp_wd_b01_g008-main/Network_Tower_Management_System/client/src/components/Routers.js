import { Navigate, Route } from 'react-router-dom';

// import views

// main views
import Dashboard from 'View/dashboard';
import Layout from 'View/layout';
import RouteProtector from 'components/RouteProtector';
import SignIn from 'View/signin';

//NTInfoSystem views
import NTInfoDashboard from 'View/ntiDashboard/nti_dashboard';
import DisplayTi from 'View/display_site_info_ti';
import DisplaySiteInfoCivil from 'View/display_site_info_civil';
import NewSiteAdd from 'View/ntiDashboard/add_new_site';
import CivilCheck from 'View/civil_completion_check';
import EditSite from 'View/ntiDashboard/updateSite';
import EditSiteCivil from 'View/edit_site_details_civil';

// finance views
import FinanceDashboard from 'View/finance/';
import AddFinance from 'View/finance/addFinance';
import UpdateFinance from 'View/finance/updateFinance';

// Contractor views
import ConDashboard from 'View/contractor/index';
import ReadAll from 'View/contractor/read';
import Update from 'View/contractor/updateContractor';
import InsertContractor from 'View/contractor/insert';

//staff views
import StaffDashboard from 'View/staff';
import AddStaff from 'View/staff/addStaff';
import UpdateStaff from 'View/staff/updateStaff';
import Profile from 'View/profile';

//safety views
import Safety from 'View/safety';
import AddSafety from 'View/safety/addSafety';
import UpdateSafety from 'View/safety/updateSafety';
import SafetyStatus from 'View/safety/safetyStatus';

//transport views
import TransportDashboard from 'View/transport';
import AddAllocation from 'View/transport/addallocation';
import AddVehicle from 'View/transport/addVehicle';
import AddDriver from 'View/transport/addDriver';
import UpdateVehicle from 'View/transport/updateVehicle';
import UpdateDriver from 'View/transport/updateDriver';
import UpdateAllocation from 'View/transport/updateallocation';

//contact views
import ContactDashboard from 'View/contact_info/';
import AddStaffContact from 'View/contact_info/addStaff';
import AddClientContact from 'View/contact_info/addClient';
import AddContractorContact from 'View/contact_info/addContractor';
import UpdateStaffContact from 'View/contact_info/updateStaff';
import UpdateClientContact from 'View/contact_info/updateClient';
import UpdateContractorContact from 'View/contact_info/updateContractor';

//documents
import Document from 'View/document';
import AddDocument from 'View/document/addDoc';
import UpdateDocument from 'View/document/updateDoc';

const routesConfig = [
  {
    path: '/',
    element: <Layout />,
    children: [

      {
        path: '/',
        element: <Navigate to="/dashboard" replace />
      },
      {
        path: '/dashboard',
        element: <RouteProtector><Dashboard /></RouteProtector>
      },
      {
        path: '/signin',
        element: <SignIn />
      },

      {
        path: '/profile',
        element: <Profile />
      },
      // NTI System set path
      {
        path: '/ntInfoDash',
        element: <RouteProtector><NTInfoDashboard /></RouteProtector>
      },
      {
        path: '/tiDisplay',
        element: <RouteProtector><DisplayTi/></RouteProtector>
      },
      {
        path: '/civilDisplay',
        element: <RouteProtector><DisplaySiteInfoCivil/></RouteProtector>
      },
      {
        path: '/addSite',
        element: <RouteProtector><NewSiteAdd/></RouteProtector>
      },
      {
        path: '/checkCivil',
        element: <RouteProtector><CivilCheck/></RouteProtector>
      },
      {
        path: '/editSite',
        element: <RouteProtector><EditSite/></RouteProtector>
      },
      {
        path: '/editCivil',
        element: <RouteProtector><EditSiteCivil/></RouteProtector>
      },
     

      {
        path: '/financial',
        element: <RouteProtector><FinanceDashboard/></RouteProtector>
      },
      {
        path: '/addFinancial',
        element: <RouteProtector><AddFinance /></RouteProtector>
      },
      {
        path: '/updateFinancial',
        element: <RouteProtector><UpdateFinance /></RouteProtector>
      },


      {
        path: '/Contractors',
        element: <RouteProtector><ConDashboard /></RouteProtector>
      },
      {
        path: '/addContractor',
        element: <RouteProtector><InsertContractor /></RouteProtector>
      },
      {
        path: '/read',
        element: <RouteProtector><ReadAll /></RouteProtector>
      },
      {
        path: '/updateContractor',
        element: <RouteProtector><Update /></RouteProtector>
      },



      {
        path: '/staff',
        element: <RouteProtector><StaffDashboard /></RouteProtector>
      },
      {
        path: '/addStaff',
        element: <RouteProtector><AddStaff /></RouteProtector>
      },
      {
        path: '/updateStaff',
        element: <RouteProtector><UpdateStaff /></RouteProtector>
      },
      {
        path: '/safety',
        element: <RouteProtector><Safety /></RouteProtector>
      },
      {
        path: '/addSafety',
        element: <RouteProtector><AddSafety /></RouteProtector>
      },
      {
        path: '/updateSafety',
        element: <RouteProtector><UpdateSafety /></RouteProtector>
      },
      {
        path: '/viewSiteSafety',
        element: <RouteProtector><Safety /></RouteProtector>
      },
      {
        path: '/transports',
        element: <RouteProtector><TransportDashboard /></RouteProtector>
      },
      {
        path: '/addAllocation',
        element: <RouteProtector><AddAllocation /></RouteProtector>
      },
      {
        path: '/addVehicle',
        element: <RouteProtector><AddVehicle /></RouteProtector>
      },
      {
        path: '/addDriver',
        element: <RouteProtector><AddDriver /></RouteProtector>
      },
      {
        path: '/updateAllocation',
        element: <RouteProtector><UpdateAllocation /></RouteProtector>
      },
      {
        path: '/updateVehicle',
        element: <RouteProtector><UpdateVehicle /></RouteProtector>
      },
      {
        path: '/updateDriver',
        element: <RouteProtector><UpdateDriver /></RouteProtector>
      },
      {
        path: '/contact',
        element: <RouteProtector><ContactDashboard /></RouteProtector>
      },
      {
        path: '/addStaffContact',
        element: <RouteProtector><AddStaffContact /></RouteProtector>
      },
      {
        path: '/addClientContact',
        element: <RouteProtector><AddClientContact /></RouteProtector>
      },
      {
        path: '/addContractorContact',
        element: <RouteProtector><AddContractorContact /></RouteProtector>
      },
      {
        path: '/updateStaffContact',
        element: <RouteProtector><UpdateStaffContact /></RouteProtector>
      },
      {
        path: '/updateClientContact',
        element: <RouteProtector><UpdateClientContact /></RouteProtector>
      },
      {
        path: '/updateContractorContact',
        element: <RouteProtector><UpdateContractorContact/></RouteProtector>
      },
      {
        path: '/documentation',
        element: <RouteProtector><Document/></RouteProtector>
      },
      {
        path: '/addDoc',
        element: <RouteProtector><AddDocument/></RouteProtector>
      },
      {
        path: '/updateDoc',
        element: <RouteProtector><UpdateDocument/></RouteProtector>
      }       
    ]
  },
];

export default routesConfig;
