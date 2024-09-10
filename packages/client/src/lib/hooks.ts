import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../store/store';
import { useEffect } from 'react';
import generalAPI from '../api/fetchTransport/generalApi';
import { useNavigate } from 'react-router-dom';
import { setUserData } from '../store/slices/user';

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

export function checkAuth() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    generalAPI
      .userInfo()
      .then(response => {
        if ('reason' in response) {
          throw new Error(response.reason);
        }
        dispatch(setUserData(response));
      })
      .catch(() => {
        navigate('/login');
      });
  }, []);
}
