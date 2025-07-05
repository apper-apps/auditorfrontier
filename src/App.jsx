import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import AssessmentPage from '@/components/pages/AssessmentPage'

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Routes>
        <Route path="/" element={<AssessmentPage />} />
      </Routes>
      
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        className="toast-container"
        style={{ zIndex: 9999 }}
      />
    </div>
  )
}

export default App