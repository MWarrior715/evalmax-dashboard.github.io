import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { FiSettings } from 'react-icons/fi';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';

import { Navbar, Footer, Sidebar, ThemeSettings } from './components';
import { Area, Bar, Financial, Calificacion, ColorMapping, Line, Pie, Pyramid, Stacked, Calendar, ColorPicker, Editor, Estudiantes, Kanban, Competencias, Profesores, Tablero } from './pages';
import './App.css';

import { useStateContext } from './contexts/ContextProvider';

const App = () => {
  const { setCurrentColor, setCurrentMode, currentMode, activeMenu, currentColor, themeSettings, setThemeSettings } = useStateContext();

  useEffect(() => {
    const currentThemeColor = localStorage.getItem('colorMode');
    const currentThemeMode = localStorage.getItem('themeMode');
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, [setCurrentColor, setCurrentMode]);

  return (
    <div className={currentMode === 'Dark' ? 'dark' : ''}>
      <BrowserRouter>
        <div className="flex relative dark:bg-main-dark-bg">
          <div className="fixed right-4 bottom-4" style={{ zIndex: '1000' }}>
            <TooltipComponent 
              content="Ajustes" 
              position="Top"
            >
              <button 
                type="button"
                onClick={() => setThemeSettings(true)}
                style={{ background: currentColor, borderRadius: '50%' }}
                className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
              >
                <FiSettings />
              </button>
            </TooltipComponent>
          </div>
          {activeMenu ? (
            <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white ">
              <Sidebar />
            </div>
          ) : (
            <div className="w-0 dark:bg-secondary-dark-bg">
              <Sidebar />
            </div>
          )}
          <div
            className={
              activeMenu
                ? 'dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full  '
                : 'bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 '
            }
          >
            <div className='fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full'>
              <Navbar />
            </div>
            <div>
              {themeSettings && (<ThemeSettings />)}

              <Routes>
                {/* Tablero */}
                <Route path="/" element={<Tablero />} />
                <Route path="/tablero" element={<Tablero />} />

                {/* Paginas */}
                <Route path="/Competencias" element={<Competencias />} />
                <Route path="/Profesores" element={<Profesores />} />
                <Route path="/estudiantes" element={<Estudiantes />} />
                
                {/* Apps */}
                <Route path="/kanban" element={<Kanban />} />
                <Route path="/editor" element={<Editor />} />
                <Route path="/Calendar" element={<Calendar />} />
                <Route path="/color-picker" element={<ColorPicker />} />

                {/* Gráficos */}
                <Route path="/Finanza" element={<Financial />} />
                <Route path="/Calificacion" element={<Calificacion />} />
                <Route path="/area" element={<Area />} />
                <Route path="/line" element={<Line />} />
                <Route path="/bar" element={<Bar />} />
                <Route path="/pie" element={<Pie />} />
                <Route path="/color-mapping" element={<ColorMapping />} />
                <Route path="/pyramid" element={<Pyramid />} />
                <Route path="/stacked" element={<Stacked />} />
              </Routes>
            </div>
            <Footer />
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;