import { NewRelease } from '../../features/newRelease/NewRelease';
import './HomePage.css';

export function HomePage(props) {
    return (<div className="HomePage">
                <NewRelease setCurrentUri={props.setCurrentUri}/>
            </div>);
}