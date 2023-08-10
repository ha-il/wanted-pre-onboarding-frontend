import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const TodoPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      navigate('/signin');
    }
  }, [navigate]);

  return <h1>투 두 페이지</h1>;
};

export default TodoPage;
