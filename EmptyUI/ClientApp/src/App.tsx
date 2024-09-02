import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import { store } from './store';
import { UserPage } from './user/UserPage';
import "./App.module.scss"


export const App = () => {
    return <>
        <Provider store={store}>
        <UserPage/>
        </Provider>
        
    </>;
};

