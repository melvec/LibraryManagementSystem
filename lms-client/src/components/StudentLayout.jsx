import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Header from "./Header";

const StudentLayout = () => {
  return ( 
    <div className="vh-100 d-flex flex-column">
      <Header />

      <main className="flex-grow-1">
        <Outlet />
      </main>

      <Footer />
    </div>
   );
}
 
export default StudentLayout;