import { useContext, useEffect } from 'react';
import AuthContext from '../store/authContext';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const ctx = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (ctx.userData && ctx.userData.token) {
      navigate('/todo');
    }
    if (!ctx.userData.token) {
      navigate('/signin');
    }
  }, [ctx.userData, navigate]);
  return (
    <>
      <h1>홈 페이지</h1>
    </>
  );
};

export default HomePage;
