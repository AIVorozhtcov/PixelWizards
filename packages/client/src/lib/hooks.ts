import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../store/store';
import { useEffect } from 'react';
import generalAPI from '../api/fetchTransport/generalApi';
import { useNavigate } from 'react-router-dom';
import { setUserData } from '../store/slices/user';
import LINKS from '../constants/links';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

export function checkAuth() {
  const accessTokenRegex = /code=([^&]+)/;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const loginAfterRedirect = async (authCode: string) => {
    await generalAPI.oauthSignin({
      code: authCode,
      redirect_uri: LINKS.selfRedirect,
    });
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
  };

  useEffect(() => {
    const isMatch = window.location.href.match(accessTokenRegex);
    if (isMatch) {
      loginAfterRedirect(isMatch[1]);
    } else {
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
    }
  }, []);
}
