import { Button, Card, Col, Container, Row, Stack } from "react-bootstrap";
import { BsBook, BsBoxSeam, BsMenuUp, BsPerson, BsPersonCheck } from "react-icons/bs";
import {  useDispatch, useSelector } from "react-redux";
import SidebarItem from "./SidebarItem";
import { useState } from "react";
import { Outlet } from "react-router";
import { logoutUserAction } from "../redux/userActions";

const AdminLayout = () => {
  const [activeItem, setActiveItem] = useState("Dashboard")
  const { user } = useSelector(state => state.user)
  const { first_name, last_name } = user || {}

  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logoutUserAction())
  }

  return ( 
    <Container fluid>
      <Row>
        <Col
          xs={3}
          className="vh-100 bg-info-subtle p-2 shadow position-fixed top-0 left-0"
        >
          <Stack className="h-100">
            <Card className="text-center fw-bold">
              <Card.Header>
                <BsPersonCheck size={100} />
              </Card.Header>

              <Card.Body>
                {first_name + ' ' + last_name}
              </Card.Body>
            </Card>

            {/* Menu Items */}
            <Stack  className="my-4">
              <SidebarItem 
                icon={<BsBoxSeam />} 
                label="Dashboard" 
                path="/admin/dashboard"
                activeItem={activeItem}
                setActiveItem={setActiveItem}
              />
              <SidebarItem 
                icon={<BsBook />} 
                label="Books" 
                path="/admin/books" 
                activeItem={activeItem}
                setActiveItem={setActiveItem}
              />
              <SidebarItem 
                icon={<BsMenuUp />} 
                label="Reviews" 
                path="/admin/reviews"
                activeItem={activeItem}
                setActiveItem={setActiveItem}
              />
              <SidebarItem 
                icon={<BsPerson />} 
                label="Users" 
                path="/admin/users"
                activeItem={activeItem}
                setActiveItem={setActiveItem}
              />
            </Stack>

            <div className="mt-auto">
              <Button 
                variant="outline-danger" 
                className="w-100"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </div>
          </Stack>
        </Col>

        <Col style={{ marginLeft: "25%" }}>
          <div className="vh-100 vw-90 pt-4">
            <Outlet />
          </div>
        </Col>
      </Row>
    </Container>
   );
}
 
export default AdminLayout;