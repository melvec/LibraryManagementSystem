import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import AuthPage from "./pages/AuthPage";
import AdminPrivateRoute from "./components/AdminPrivateRoute";
import AdminLayout from "./components/AdminLayout";
import BooksPage from "./pages/BooksPage";
import StudentLayout from "./components/StudentLayout";
import HomePage from "./pages/HomePage";
import BookDetailPage from "./pages/BookDetailPage";
import StudentPrivateRoute from "./components/StudentPrivateRoute";
import BorrowsPage from "./pages/BorrowsPage";
import ReviewsPage from "./pages/ReviewsPage";

function App() {
  return (
    <>
      <Routes>
        {/* Auth Routes - Public Route */}
        <Route path="/auth" element={<AuthPage />} />

        {/* Admin Routes - Private Routes */}
        <Route path="/admin" element={<AdminPrivateRoute><AdminLayout /></AdminPrivateRoute>}>
          <Route path="dashboard" element={<p>Dashboard Page</p>} />
          <Route path="books" element={<BooksPage />} />
          <Route path="reviews" element={<ReviewsPage />} />
          <Route path="users" element={<p>Users Page</p>} />
        </Route>

        {/* Client/Student Routes */}
        <Route path="/" element={<StudentLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="book/:_id" element={<BookDetailPage />} />

          <Route path="borrows" element={<StudentPrivateRoute><BorrowsPage /></StudentPrivateRoute>} />
        </Route>
      </Routes>
      <ToastContainer />
    </>
  )
}

export default App
