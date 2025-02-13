import ContextProvider from 'app/AppContextProvider';
import Router from 'app/Router';


export default function App() {
    return (
        <ContextProvider>
            <Router />
        </ContextProvider>
    );
};
