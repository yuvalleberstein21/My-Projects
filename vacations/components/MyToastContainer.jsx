import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MyToastContainer = () => {
    return (
        <ToastContainer position="top-left"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light" />
    );
};

export default MyToastContainer;