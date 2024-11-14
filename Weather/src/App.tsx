import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import { ThemeProvider } from './components/theme-provider';
import Weatherdashboard from './pages/weather-dashboard';
import City from './pages/city-page';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
const App = () => {
  const queryClient = new QueryClient({
    defaultOptions:{
      queries:{
        staleTime:5*60*1000,
        gcTime:10*60*1000,
        refetchOnWindowFocus:false,
        retry:false
      }
    }
  });
  return (
    <QueryClientProvider client={queryClient}>

    <BrowserRouter>
    <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
    <Layout>
      <div className="flex items-center">
                <Routes>
                  <Route path='/' element={<Weatherdashboard/>}/>
                  <Route path='/city/:cityName' element={<City/>}/>
                  </Routes>     
      </div>
      </Layout>
    </ThemeProvider>
      
    </BrowserRouter>
    <ReactQueryDevtools initialIsOpen={false} />

    </QueryClientProvider>
  );
};

export default App;
