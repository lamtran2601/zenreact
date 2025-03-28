import { FiSun, FiMoon, FiMonitor } from 'react-icons/fi';
import useTheme from '../../hooks/useTheme';

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  
  return (
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn btn-ghost btn-circle">
        {theme === 'light' && <FiSun size={20} />}
        {theme === 'dark' && <FiMoon size={20} />}
        {theme === 'system' && <FiMonitor size={20} />}
      </label>
      <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-200 rounded-box w-52">
        <li>
          <button 
            className={theme === 'light' ? 'active' : ''} 
            onClick={() => setTheme('light')}
          >
            <FiSun /> Light
          </button>
        </li>
        <li>
          <button 
            className={theme === 'dark' ? 'active' : ''} 
            onClick={() => setTheme('dark')}
          >
            <FiMoon /> Dark
          </button>
        </li>
        <li>
          <button 
            className={theme === 'system' ? 'active' : ''} 
            onClick={() => setTheme('system')}
          >
            <FiMonitor /> System
          </button>
        </li>
      </ul>
    </div>
  );
};

export default ThemeToggle; 