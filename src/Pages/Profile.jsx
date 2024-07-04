import DashboardProfile from "../Components/DashboardProfile";
import DashboardSidebar from "../Components/DashboardSidebar";

const Profile = () => {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="md:w-58">
        <DashboardSidebar />
      </div>
      <DashboardProfile />
    </div>
  );
};

export default Profile;
