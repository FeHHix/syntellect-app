import './App.css';
import {TextControlExample1} from './example/TextControlExample1';
import {TextControlExample2} from './example/TextControlExample2';

function App() {
    return (
        <div>
            <div className="m w2">
                <TextControlExample1 />
            </div>
            <div className="m w3">
                <TextControlExample2 />
            </div>
        </div>
    );
}

export default App;
