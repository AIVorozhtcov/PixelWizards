import { useEffect } from 'react';
import { THEMES } from '../../constants/themeConstants';
import { useTheme } from '../../templates/ThemeProvider/ThemeProvider';
import Button from '../atoms/Button';

const ThemeButton = ({ className }: { className?: string }) => {
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    if (theme === THEMES.dark) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const onClickHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    if (theme === THEMES.dark) {
      setTheme('light');
      document.documentElement.classList.remove('dark');
    } else {
      setTheme('dark');
      document.documentElement.classList.add('dark');
    }
  };

  return (
    <Button onClick={e => onClickHandler(e)} className={className ?? ''}>
      <svg
        fill="none"
        height="24"
        viewBox="0 0 24 24"
        width="24"
        xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0_339_5623)">
          <path
            clipRule="evenodd"
            d="M10.6338 0.90947C11.4028 0.189743 12.5981 0.189742 13.3671 0.90947L15.6927 3.0861L18.8763 3.19143C19.9289 3.22625 20.7742 4.07152 20.809 5.1242L20.9144 8.30774L23.091 10.6333C23.8107 11.4023 23.8107 12.5977 23.091 13.3667L20.9144 15.6923L20.809 18.8758C20.7742 19.9285 19.9289 20.7738 18.8763 20.8086L15.6927 20.9139L13.3671 23.0905C12.5981 23.8103 11.4028 23.8103 10.6338 23.0905L8.30819 20.9139L5.12464 20.8086C4.07197 20.7738 3.2267 19.9285 3.19187 18.8758L3.08654 15.6923L0.909913 13.3667C0.190186 12.5977 0.190185 11.4023 0.909912 10.6333L3.08654 8.30774L3.19187 5.1242C3.2267 4.07152 4.07196 3.22625 5.12464 3.19143L8.30819 3.0861L10.6338 0.90947ZM8.58287 5.6352C9.47214 5.22705 10.4609 5 11.5 5C15.366 5 18.5 8.13401 18.5 12C18.5 15.866 15.366 19 11.5 19C10.4609 19 9.47214 18.7729 8.58287 18.3648C8.22768 18.2018 8 17.8468 8 17.456C8 17.0651 8.22768 16.7101 8.58287 16.5471C10.3064 15.7561 11.5 14.0164 11.5 12C11.5 9.98362 10.3064 8.24392 8.58287 7.45289C8.22768 7.28987 8 6.93486 8 6.54404C8 6.15322 8.22768 5.79822 8.58287 5.6352Z"
            fill={theme === THEMES.dark ? 'white' : '#0c1b2a'}
            fillRule="evenodd"
          />
        </g>
        <defs>
          <clipPath id="clip0_339_5623">
            <rect fill="white" height="24" width="24" />
          </clipPath>
        </defs>
      </svg>
    </Button>
  );
};

export default ThemeButton;
